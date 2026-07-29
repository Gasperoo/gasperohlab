/**
 * Durable storage and rate limiting for the two form handlers.
 *
 * Both problems have the same root cause. A beta signup only existed as an
 * email: if Resend was down, or the message was filed wrong, the address was
 * gone and the person who typed it had already been told they were on the
 * list. And the rate limiter was a `Map` inside one serverless instance, so
 * the limit was really "five per instance per window" — a number nobody chose.
 *
 * Both are now backed by Redis over Upstash's REST API when it's configured,
 * and both degrade to the previous behaviour when it isn't. No SDK: this is
 * four `fetch` calls, and a dependency that only wraps `fetch` is a dependency
 * that only adds a version to keep track of.
 *
 * To enable, set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.
 */

const REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

/** Whether a durable store is configured. Callers adjust their promises. */
export const hasDurableStore = Boolean(REST_URL && REST_TOKEN);

type Command = (string | number)[];

/**
 * Run one or more Redis commands.
 *
 * Never throws — a store failure must not take down a form that can still send
 * an email. Returns null when there's no store configured or the call failed,
 * and lets the caller decide what that means.
 */
async function redis(commands: Command[]): Promise<unknown[] | null> {
  if (!hasDurableStore) return null;

  try {
    const res = await fetch(`${REST_URL}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REST_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commands),
      // These handlers are already dynamic; make sure the fetch cache doesn't
      // decide an INCR is worth reusing.
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });

    if (!res.ok) {
      console.error("Upstash responded", res.status, await res.text());
      return null;
    }

    const body = (await res.json()) as { result?: unknown; error?: string }[];
    return body.map((entry) => entry.result ?? null);
  } catch (err) {
    console.error("Upstash request failed:", err);
    return null;
  }
}

// --- Rate limiting -------------------------------------------------------

const memoryHits = new Map<string, number[]>();

/** Sliding window in this instance's memory. The pre-existing behaviour. */
function memoryLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (memoryHits.get(key) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  memoryHits.set(key, recent);

  // Opportunistic cleanup so the map can't grow unbounded.
  if (memoryHits.size > 5000) {
    for (const [k, times] of memoryHits) {
      if (times.every((t) => now - t >= windowMs)) memoryHits.delete(k);
    }
  }
  return recent.length > limit;
}

/**
 * Whether this key has exceeded `limit` requests in the window.
 *
 * The Redis path is a fixed window rather than a sliding one: INCR a key that
 * expires, and compare. It's less precise at the boundary than the in-memory
 * sliding window, and it's the right trade — a fixed window is two commands in
 * one round trip, where a sliding one needs a sorted set and three, on a path
 * that runs before we've decided the request is even legitimate.
 */
export async function isRateLimited(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<boolean> {
  const results = await redis([
    ["INCR", key],
    // NX so the window is set once at the start and doesn't slide forward with
    // every request — without it, a persistent flood would never let the key
    // expire and the caller would be locked out indefinitely.
    ["EXPIRE", key, windowSeconds, "NX"],
  ]);

  if (results === null) {
    return memoryLimited(key, limit, windowSeconds * 1000);
  }

  const count = Number(results[0]);
  return Number.isFinite(count) && count > limit;
}

// --- Durable records -----------------------------------------------------

/**
 * Append a submission to a list, so it survives a mail failure.
 *
 * Returns whether it was actually stored. The waitlist handler uses that to
 * decide whether a failed email is a failed signup: if the address is safely
 * on disk, the person genuinely is on the list and telling them otherwise
 * would make them submit again.
 */
export async function record(
  list: string,
  payload: Record<string, unknown>
): Promise<boolean> {
  const entry = JSON.stringify({ ...payload, at: new Date().toISOString() });
  const results = await redis([["RPUSH", `gohl:${list}`, entry]]);
  return results !== null;
}
