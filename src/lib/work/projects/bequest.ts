import type { Project } from "../types";

export const bequest: Project = {
  slug: "bequest",
  name: "Bequest",
  discipline: "Program",
  status: "Coming Soon",
  blurb:
    "A dead man's switch that still works after we're gone. Encrypted material released to the people you name, with the key split between them — nothing on the server can be opened, and the recovery procedure needs none of our software.",
  year: "2026",
  cover: "/work/bequest/cover.png",
  caseStudy: {
    tagline: "It has to work when the company doesn't.",
    role: "Cryptographic design, threat model, reference implementation",
    timeframe: "2026 — in design",
    overview: [
      "Bequest holds the things your family will need and can't get at: where the accounts are, the recovery key to the password vault, the letter. It releases them to people you name, when you're gone. It's built around the two facts the category won't face — that these services hold keys they could read with, and that a three-year-old company is being trusted with a forty-year job.",
      "So the design starts from the far end. What would still work if the lab shut down tomorrow, if its servers were seized, or if its entire ciphertext archive were published in full?",
    ],
    metrics: [
      { value: "k-of-n", label: "No single recipient can open it" },
      { value: "0", label: "Keys the server can see" },
      { value: "Spec", label: "Recovery works without our software" },
    ],
    sections: [
      {
        heading: "The company is a dependency, so remove it",
        body: [
          "Everything is encrypted on your device. The content key is split with Shamir's scheme into shares held by the people you name, k of n required to reconstruct it — so one recipient acting alone opens nothing, and one recipient lost to a house fire or a falling-out doesn't destroy the estate. What the server holds is ciphertext, a heartbeat and a schedule. There is nothing in it to steal that opens anything.",
          "The archive exports as a single file, and the recovery procedure is a written specification with a reference implementation: given k shares and that file, a competent developer decrypts it with standard tools and no Bequest software, indefinitely. We would rather be replaceable than trusted.",
        ],
      },
      {
        heading: "The expensive failure is the false positive",
        body: [
          "A missed check-in is not a death. People go hiking, lose phones, spend three weeks in a hospital without a charger. The whole hard part of a dead man's switch is that firing early is far worse than firing late — a will read out to a family while its author is alive is not a defect you apologise for and patch.",
          "Release therefore requires two independent things: a timelock that has fully elapsed, and a threshold of named verifiers each signing an assertion. Every assertion is visible to the other verifiers and to you, escalation is a ladder rather than a cliff — a quiet nudge, then the verifiers, then a long final window — and any signed-in device of yours cancels the whole sequence instantly at any point before release.",
          "The ladder is measured in weeks by default, not days, and shortening it is deliberately made annoying.",
        ],
      },
      {
        heading: "No password reset, and no support flow that could open it",
        body: [
          "There is no key escrow, no account recovery, no \"contact us and we'll sort it out\". Each of those is a door, and a door our staff can open under a convincing story is a door an attacker can open under a convincing story. The cost is stated up front instead of being discovered later: lose both your device and your recovery material and the archive is gone, exactly as it would be under any encryption that means anything.",
          "Recipients are told they hold a share long before they need it. The failure we expect most isn't cryptographic — it's four people who never knew they were named, receiving an email they don't recognise on the worst week of their lives.",
        ],
      },
      {
        heading: "What it will not hold",
        body: [
          "Not a vault, not a password manager, not somewhere to park a wallet seed you use on Tuesdays. Bequest is written rarely and read once, and that constraint is what lets it be built this way: material that changes weekly cannot be re-sealed to n recipients weekly without quietly turning the shares into a synchronisation problem, and a synchronisation problem is where a service starts wanting a key of its own.",
        ],
      },
      {
        heading: "Where it is",
        body: [
          "This one is honest about being early. The threat model, the key hierarchy, the escalation ladder and the recovery specification are written. The build hasn't started, and it won't until the design has been read by people who break this sort of thing for a living. Publishing a cryptographic design and inviting attack before shipping it is slower, and it's the only defensible order to do it in.",
          "The open questions are the ones that are always open: how a share reaches a non-technical recipient without that delivery becoming a channel an attacker can impersonate, and what the product does when a verifier dies before you do.",
        ],
      },
    ],
    stack: [
      "Rust",
      "X25519",
      "Ed25519",
      "Shamir secret sharing",
      "SQLite",
      "CLI",
    ],
    waitlist: {
      blurb:
        "Bequest is in design, and the specification goes out for review before a line of it is built. Leave your email if you want to read it — or to break it.",
    },
  },
};
