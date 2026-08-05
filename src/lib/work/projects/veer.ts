import type { Project } from "../types";

export const veer: Project = {
  slug: "veer",
  name: "Veer",
  discipline: "App",
  status: "In Production",
  blurb:
    "A weather app that shows you where the models disagree instead of hiding it behind one icon — and keeps score against its own past forecasts, on a screen inside the app.",
  progress: 25,
  year: "2026",
  cover: "/work/veer/cover.png",
  caseStudy: {
    tagline: "A forecast that tells you when it doesn't know.",
    role: "Product design, ensemble pipeline, verification ledger, iOS build",
    timeframe: "2026 — in production",
    overview: [
      "Veer is built on the thing every other weather app throws away. Forecasts are produced as ensembles — dozens of runs of the same model from slightly different starting conditions — and then flattened to one icon and one number before anybody sees them. Veer shows the spread.",
      "Which lets it do the thing no consumer forecast will do: say that Thursday isn't knowable yet. Where the members agree, the band is a hairline and you can plan around it. Where they fan into a wet half and a dry half, drawing a 43% raindrop compresses a real disagreement into a figure that sounds like knowledge.",
    ],
    metrics: [
      { value: "51", label: "Ensemble members, not one line" },
      { value: "Every", label: "Forecast scored against what happened" },
      { value: "25%", label: "Build progress" },
    ],
    sections: [
      {
        heading: "The icon is the lie",
        body: [
          "Two Thursdays: on the first, every member puts a little rain over you through the afternoon. On the second, half the members soak you and half leave you dry all day. Both are 40%. They are not the same day, and one number cannot tell you which one you're looking at.",
          "So the primitive in Veer isn't a number, it's a plume. Temperature, rain and wind are drawn as the ensemble actually resolved them, with the spread as the shape of the thing rather than a footnote under it. Reading a fan instead of an icon is a slightly harder skill, and it is the only honest one available.",
        ],
      },
      {
        heading: "A forecast nobody scores is a horoscope",
        body: [
          "Every forecast Veer issues is written to a ledger at the moment it's issued and scored when the observation lands — Brier for the probabilistic ones, mean absolute error for temperature — broken out by lead time and location. Those scores are a screen in the app, not a blog post we'd write once and never update.",
          "The bar isn't zero, it's climatology and persistence. \"The same as yesterday\" is a shockingly good forecast at twenty-four hours and a worthless one at seven days, and any lead time where Veer can't beat both is labelled as such. At ten days it will mostly be saying so.",
          "Calibration gets stated in a sentence rather than a reliability diagram nobody reads: when Veer said 70% here, it rained 64% of the time, across 180 forecasts. If that sentence is embarrassing, it stays on the screen until the app deserves a better one.",
        ],
      },
      {
        heading: "Precision it hasn't earned",
        body: [
          "There is no minute-by-minute nowcast for places with no radar coverage, because inventing one is trivial and it's a fabrication with a progress bar. Temperature is shown to the degree — a tenth of a degree on a seven-day forecast is a graphic design decision, not a measurement.",
          "Anything derived rather than forecast says what it is. \"Feels like\" carries the formula that produced it, because wind chill and heat index are two different models and quoting them as one temperature is how a number stops meaning anything.",
        ],
      },
      {
        heading: "A tile, not a person",
        body: [
          "Location is coarsened on the device to the model's own grid cell before any request goes out. The forecast is computed for that cell anyway, so a request carrying exact coordinates buys the forecast nothing while costing you the only thing it could have cost.",
          "No account, no ad SDK, no third-party analytics in the app. The history and the ledger live on the device. The business model is that you pay for it.",
        ],
      },
      {
        heading: "Where it is",
        body: [
          "Ingest and the verification ledger are the two pieces that exist, which is the right order. The ledger is what makes every later claim checkable, and building it last would have meant a year of unscored forecasts and nothing to show for the argument. The GEFS and open ECMWF ensembles are wired in; plume rendering is prototyped on a desktop harness rather than on device.",
          "What's honestly not finished: there's no site-level bias correction yet, and that's the gap between a grid cell's forecast and your valley's weather — the largest remaining source of error by some distance. Severe-weather alerting is deliberately out of scope until the verification record is long enough to justify sending anyone a warning. And the storage question is a real one: keeping every forecast ever issued for every location is what makes the scoring honest, and it isn't free.",
        ],
      },
    ],
    stack: [
      "Swift",
      "SwiftUI",
      "iOS",
      "Metal",
      "GEFS / ECMWF ensembles",
      "Node / TypeScript",
    ],
    waitlist: {
      platforms: ["iOS"],
      blurb:
        "Veer is heading for a beta on iOS. Leave your email and we'll send you an invite — and the scoreboard, which by then will have some numbers on it.",
    },
  },
};
