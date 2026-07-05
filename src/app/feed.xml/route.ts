import { notes, type NoteBlock } from "@/lib/notes";

const siteUrl = "https://gasperohlab.com";

// Statically generated at build time; no per-request work.
export const dynamic = "force-static";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Render a note's blocks to lightweight HTML for the feed's full content. */
function blockToHtml(block: NoteBlock): string {
  switch (block.type) {
    case "h2":
      return `<h2>${esc(block.text)}</h2>`;
    case "quote":
      return `<blockquote><p>${esc(block.text)}</p></blockquote>`;
    case "list":
      return `<ul>${block.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
    default:
      return `<p>${esc(block.text)}</p>`;
  }
}

export function GET() {
  const updated = notes[0]?.date ?? new Date().toISOString().slice(0, 10);

  const items = notes
    .map((note) => {
      const url = `${siteUrl}/lab/${note.slug}`;
      const content = note.body.map(blockToHtml).join("");
      return `    <item>
      <title>${esc(note.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(note.date + "T00:00:00Z").toUTCString()}</pubDate>
      <category>${esc(note.kind)}</category>
      <description>${esc(note.excerpt)}</description>
      <content:encoded><![CDATA[${content}]]></content:encoded>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>GASPEROHLAB — The Lab</title>
    <link>${siteUrl}/lab</link>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Devlogs, engineering write-ups and the thinking behind what GASPEROHLAB builds — and what it cuts.</description>
    <language>en</language>
    <lastBuildDate>${new Date(updated + "T00:00:00Z").toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
