import type { Project } from "../types";

export const rebar: Project = {
  slug: "rebar",
  name: "Rebar",
  discipline: "Program",
  status: "In Production",
  blurb:
    "A decompiler for spreadsheets. Point it at the forty-tab workbook a business actually runs on and it recovers the program hiding inside — typed cells, inferred units, a dependency graph, and the contradictions nobody has noticed in two years.",
  progress: 35,
  year: "2026",
  cover: "/work/rebar/cover.png",
  caseStudy: {
    tagline: "A spreadsheet is a program. Nobody has been allowed to read it like one.",
    role: "Static analysis, unit inference, CLI and report",
    timeframe: "2026 — in production",
    overview: [
      "Rebar reads an Excel workbook the way a compiler reads source. It parses every formula, builds the dependency graph, solves a physical dimension for each cell, and reports what doesn't hold together. Out the other end comes a report, a typed module you can actually test, and — the part that matters — a list of the places the model contradicts itself.",
      "Parsing xlsx is not the interesting problem; that's a weekend and a specification. The interesting problem is that a spreadsheet has no type system, so the errors that cost real money are invisible by construction: a rate summed with a total, an area multiplied by an area, a hard-coded 1.15 sitting inside a formula that nobody alive can source.",
    ],
    metrics: [
      { value: "0", label: "Cells it writes back" },
      { value: "9", label: "Dimensions solved, not guessed" },
      { value: "35%", label: "Build progress" },
    ],
    sections: [
      {
        heading: "Units are the type system a spreadsheet never had",
        body: [
          "Every cell gets a dimension — currency, length, area, volume, mass, time, count, rate, and dimensionless — and they are solved rather than annotated. Literals and number formats seed it, operators constrain it (a division of dollars by square metres is dollars per square metre whether or not anyone labelled it), and the workbook is unified in a single pass. A conflict isn't a note about style. It's a proof that two cells cannot both be what the model is treating them as.",
          "Header text is the least trustworthy signal in the building. \"SF\", \"Sq. Ft\", \"sqft\", \"AREA (ft2)\" and \"ft²\" all turn up in one workbook, and three tabs later the same heading has been reused for something else entirely. So labels seed the solver and are never allowed to override it, and any dimension resting on a label alone comes back marked assumed rather than derived. A tool that can't tell you which of its conclusions it earned is a second opinion with better formatting.",
          "The bug that made the case for building this was a SUM down a column where four rows were dollars per square metre and the other thirty-one were dollars. It totals fine. It has totalled fine for years.",
        ],
      },
      {
        heading: "Where the magic numbers went",
        body: [
          "=SUM(D4:D40)*1.15 is the most expensive line of code in most businesses: a constant with no name, no date and no author, applied to everything downstream of it. Rebar lifts every literal out of every formula into one table — the value, the cells it reaches, and when the cell holding it was last edited. On the workbooks we've run it against, roughly a third are duplicates of each other that have quietly drifted apart.",
          "It does not decide what they mean. It can't, and pretending otherwise would be the most dangerous thing this tool could do. It puts them in front of the one person who might still remember.",
        ],
      },
      {
        heading: "The report is not a rewrite",
        body: [
          "Rebar never writes to your workbook. Not a fixed formula, not a named range, not a comment. The spreadsheet stays authoritative until a human decides otherwise, because a tool that quietly edits the file a company invoices from is a liability with a nice interface.",
          "What it emits instead is a typed module — the same arithmetic as functions, with the dimensions in the signatures, and a generated test per formula pinned to the workbook's current values. Run those and you have an executable, diffable, reviewable version of the model sitting beside the original. The workbook remains the thing the business uses; the module is the thing you can reason about. The day the two disagree is a day you want to hear about.",
        ],
      },
      {
        heading: "Two versions of the same workbook",
        body: [
          "The other question nobody can answer: what actually changed between last quarter's model and this one? A cell-by-cell diff reports four thousand changes, which conveys exactly as much as reporting none.",
          "Rebar diffs the graph instead — formulas whose shape changed, constants whose value moved, dependencies added or cut, dimensions that flipped. A quarter of edits usually collapses to eleven or twelve things that matter, and about two of them are surprises.",
        ],
      },
      {
        heading: "Where it is",
        body: [
          "The parser handles xlsx as it is actually written rather than as specified: shared and array formulas, R1C1, structured table references, cross-sheet references and defined names, and the several ways Excel encodes the same thing depending on which program wrote the file. The dimension solver runs, and it has been pointed at real estimating workbooks — which is where the idea came from. We spent a year building software that reads drawings for people whose real source of truth was a spreadsheet nobody dared touch.",
          "What's honestly not finished: no VBA and no xlsm, because macros make a workbook a program in a second language and the analysis would have to be honest about not reading it. Pivot caches, external workbook links and LAMBDA are unsupported. The emitted module is TypeScript only. And circular references are detected and reported rather than resolved into iterative form — fine for estimating models, useless for financial ones.",
        ],
      },
    ],
    stack: ["TypeScript", "Node", "OOXML", "Static analysis", "CLI"],
    waitlist: {
      blurb:
        "Rebar goes out first to a handful of people with a workbook they're afraid of. Leave your email and we'll get in touch when there's something worth pointing at it.",
    },
  },
};
