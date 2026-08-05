import type { Project } from "../types";

export const omnivault: Project = {
  slug: "omnivault",
  name: "OmniVault",
  discipline: "App",
  status: "In Production",
  blurb:
    "A native financial terminal for collectibles, on iOS and Android. Cards, sneakers, watches, art, spirits, sealed games, LEGO, vinyl, coins and crypto in one portfolio — priced off completed sales, net of the fees you'd actually pay.",
  progress: 55,
  year: "2026",
  cover: "/work/omnivault/cover.png",
  caseStudy: {
    tagline: "Sixteen markets, one portfolio, priced honestly.",
    role: "Product design, pricing engine, native iOS + Android build",
    timeframe: "2026 — in production",
    // No heroImage: the cover is the hero, so the card morphs into it exactly
    // rather than cross-fading between two near-identical compositions.
    overview: [
      "OmniVault is a cross-asset terminal for the things collectors actually own — trading cards, sneakers, watches, vintage apparel, fine art, spirits, tech, sealed video games, comics, LEGO, board games, vinyl, coins, figures and crypto — held in one live portfolio. It's built native on iOS and Android, with the pricing engine sitting in a package that holds no platform types at all — no UI, no persistence schema — so one tested set of market arithmetic runs under both apps.",
      "The interesting problem was never the app. It was working out what a collectible is worth without lying about it: sixteen markets with different sale mechanics, different fee schedules, different grading scales, and — for most of them — no price API at all.",
    ],
    metrics: [
      { value: "16", label: "Asset categories, physical and digital" },
      { value: "28", label: "Pricing sources with real fee schedules" },
      { value: "370", label: "Engine tests, offline and deterministic" },
    ],
    sections: [
      {
        heading: "A price is a claim, so it has to be derivable",
        body: [
          "The number on the dashboard is not an average of listings. Only completed sales can reach the comp set, and that rule is held by the type system rather than by a filter someone has to remember: a completed sale and an active listing are separate types, so an unsold listing or an unfilled reserve auction structurally cannot influence a valuation.",
          "From there each comp is restated before it counts. A $1,000 Goldin hammer cost the winner $1,200 after the buyer's premium, so everything is normalised to what the buyer actually paid. Off-condition comps are scaled by the ratio of quality factors and weighted down for the size of the gap. Weighting is exponential recency decay on a seven-day half-life, times venue reliability, times sale-kind comparability. Outliers go to a median absolute deviation test with a percentage floor, so a tight market doesn't discard its own normal variance.",
          "Every step is a pure function of its inputs, which is what makes the history honest: the 24h, 7d and 30d changes are produced by re-running the entire algorithm at each past date using only the sales known by then. They agree with the headline figure because they are the headline figure, replayed — not a second calculation that can drift.",
        ],
      },
      {
        heading: "Fees are first-class, because net is the only number you can spend",
        body: [
          "Every venue carries its real fee schedule — commission, processing, flat fee, buyer's premium, shipping, settlement days — and that drives three things headline value can't. Net liquidation value is cash in hand. Exit routes rank every venue by net proceeds, which is why eBay's higher gross bid frequently loses to StockX once 13.35% and shipping come off it.",
          "Arbitrage is the strictest of the three: a spread is only reported if it survives fees on both sides. A thirty-point gross gap that nets negative is not a trade, so it isn't shown.",
          "The liquidity score works the same way — turnover gates the other factors rather than averaging with them. A 2% spread in a market that trades once a quarter isn't liquidity, because there is nobody there to sell to.",
        ],
      },
      {
        heading: "Deleting the fake market",
        body: [
          "There used to be a seeded market behind every holding: cost basis × 1.12, with a plausible history generated around it. The app looked completely functional and not one of its figures meant anything.",
          "It's gone, and nothing replaced it. Crypto, Pokémon, Magic and Yu-Gi-Oh price from real APIs. Every venue without an open price feed — StockX, GOAT, eBay, Goldin, Chrono24, PriceCharting, BrickLink, Discogs, GreatCollections, Whatnot — publishes nothing, so those holdings are valued by the collector and labelled as such everywhere. An asset OmniVault can't price comes back unpriced, and the dashboard states how much of the collection that covers.",
          "A valuation carries its own basis, so a market-derived value and a typed-in one stay distinguishable through every surface that consumes them — the charts, the alerts and the shareable card all refuse to present a manual figure as a market price. A partial read is handled the same way: a venue that can't be reached becomes a typed failure, the remaining venues still produce a valuation, and the UI says the pricing is incomplete instead of presenting it as whole.",
        ],
      },
      {
        heading: "Refusing to show the wrong photograph",
        body: [
          "Holdings resolve to real imagery through a chain ordered by fidelity rather than convenience: a PSA cert lookup returns the exact slab, TCGdex and Scryfall return the set- and printing-matched card, MusicBrainz plus Cover Art Archive return the pressing when the catalogue number matches. Every result is labelled, so an approximate picture can never pass as a photograph of the collector's own item.",
          "Two rules do most of the work, and both were written after the app got it wrong. A catalogue is only asked when it can actually answer — Wikimedia Commons is excluded from cards, comics, games, LEGO, vinyl and figures, not for lack of coverage but because it appears to have coverage: the artwork identifying those objects is in copyright, so a keyword search returns something adjacent and confident. \"Super Mario Bros. 3\" resolved to a photo of a Wii stand at a trade show. Coins are the opposite case and are wired in deliberately, because Commons holds obverse and reverse plates for most issues and a 1909-S VDB cent resolves to a real one.",
          "And a weak match is no match. Commons ranks something for almost any query, so the winner of a field of irrelevant files is still irrelevant — \"Gloomhaven\" came back as a photograph of a jigsaw piece. Candidates now need real vocabulary overlap with the holding, and the category glyph is the honest answer when nothing clears it. Graded cards are drawn inside their holder, with the real grade and cert number on the label, because a PSA 10 Charizard isn't a card — it's a card sealed in a labelled slab, and that's how it's bought and shipped.",
        ],
      },
      {
        heading: "A key in an app binary is a published key",
        body: [
          "Five catalogues require registration — PSA, eBay, IGDB, Comic Vine, BoardGameGeek — and anyone can pull a credential out of a shipped IPA. A small Node/TypeScript gateway holds those keys, caches the answers and performs the client-credential exchanges a device shouldn't.",
          "The split is deliberate. Keyed catalogues route through it, because its store is shared across users and its key is the one being rate-limited: a lookup answered once serves everyone who owns that item, so cost scales with distinct items owned rather than with users. Immutable records — a slab photograph, a comic cover, a game's box art — are written with no expiry, because a monthly TTL means paying for the same unchanging fact forever. Usage falls over time instead of resetting.",
          "Keyless catalogues never touch it. Routing TCGdex or Scryfall through a server would add a hop, make pictures depend on that server being up, and send someone's item names somewhere for no benefit. With no gateway deployed at all, Pokémon, Magic, Yu-Gi-Oh, LEGO, vinyl, coins and crypto still resolve — that's the state the app ships in.",
        ],
      },
      {
        heading: "The one screen that isn't a terminal",
        body: [
          "Everywhere else OmniVault is spreads and net proceeds, but nobody buys a 1909-S VDB cent for its liquidity score, and a vault that only shows numbers forgets what it's a vault of. One screen does nothing but present the object.",
          "The holographic card system is ported from YuGi-Dex — gyro and drag tilt, rotation on both axes, a shadow that moves against it, five foil treatments. Beyond cards, a stage composes from four ingredients rather than being written per category: backdrop, handling, ambience, hint. Watches sit in a glass case with lume you hold to charge; vinyl gets a slipmat and a spindle you flick to spin; coins sit on a velvet tray and turn over when tapped; games get a shelf edge and CRT scanlines. Sixteen bespoke view hierarchies would have been sixteen things to keep working, and a collector's instinct is the same across hobbies anyway.",
          "Crypto gets no stage at all. Inventing a coin on velvet for a wallet balance would be the app pretending you own an object.",
        ],
      },
      {
        heading: "Where it is",
        body: [
          "The engines are done and measured — pricing, portfolio, arbitrage, swaps, alerts, entitlements — behind 370 offline, deterministic tests that run in about thirteen seconds and are pointed at the arithmetic that carries money. They've earned it: eight real defects were found by the suite rather than by inspection, including a venue-premium cap that made cross-venue arbitrage structurally undetectable, a tokenizer that scored \"Base Set\" and \"Base Set 2\" identically and so served a reprint for the most valuable card in the hobby, and a CGC 9.8 comic priced at 72% of itself for borrowing the card market's quality factor.",
          "The iOS app runs on device today: four tabs, asset detail, the viewer, alerts with background refresh, spreadsheet import, home- and lock-screen widgets, Siri and Spotlight intents, subscriptions. Nothing is seeded — a first launch is an empty vault. Android is next, and it inherits the part that took the longest: the engine is a separate package with no platform types in it, so the market arithmetic ports rather than being rewritten and re-argued.",
          "What's honestly not finished: the marketplace's state machines are tested but have no sync transport, so listings and orders are local. The gateway is deployable and undeployed. Encryption is specified to SQLCipher keyed from the Secure Enclave and today relies on iOS data-at-rest protection. And the condition ladders — a PSA 9 at 0.42 of a PSA 10 — are documented starting points rather than measured constants, which makes them the first numbers to revisit once real sales data flows.",
        ],
      },
    ],
    stack: [
      "Swift 6",
      "SwiftUI",
      "SwiftData",
      "iOS",
      "Android",
      "WidgetKit",
      "App Intents",
      "StoreKit 2",
      "Node / TypeScript",
    ],
    waitlist: {
      platforms: ["iOS", "Android"],
      blurb:
        "OmniVault is heading for a beta on iOS and Android. Leave your email and we'll send you an invite and everything you need to bring your collection in when it opens.",
    },
  },
};
