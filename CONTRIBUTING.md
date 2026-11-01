# Contributing to CampaignKit

Welcome! CampaignKit helps people build consistent campaign links without an account or backend. Code, documentation, translations, testing and accessibility feedback all help.

## Your first contribution

1. Read the [v0.1 scope and roadmap](docs/ROADMAP.md).
2. Pick an unassigned `good first issue`. Read its comments and linked PRs before starting. Comment with the task you want to take; take one task at a time. If you stop, say so so another person can continue.
3. For a small correction, a direct PR is welcome. Discuss new features and data-format changes in an issue first.
4. Fork this repository, create a branch from `main`, and follow the setup below.
5. Open a PR to `main`. Explain the user problem, what changed, and what you checked. Link the issue with `Fixes #number` when it is fully addressed.

New to GitHub? You can start by reviewing the English or Turkish quick start and reporting a specific step that does not work. No code contribution is required to participate.

## Setup and checks

Use Node.js 22.12 or newer and npm. CI uses Node 22.

```sh
git clone https://github.com/YOUR-USERNAME/campaignkit-utm.git
cd campaignkit-utm
git remote add upstream https://github.com/diyaryavuz/campaignkit-utm.git
git switch -c fix/short-description
npm ci
npm run dev
```

Before opening a PR:

```sh
npm test
npm run build
git diff --check
```

For UI changes, also check keyboard navigation, English and Turkish text, narrow layouts, and storage behavior after reload. Include a screenshot when the visible result changes. Do not commit `dist`, `node_modules`, coverage output or personal backups.

## Boundaries that protect users

- Never silently normalize campaign fields. Normalization is an explicit user action.
- Preserve unrelated URL parameters and fragments. Treat pasted URLs and imported JSON as untrusted input.
- Preserve existing storage and failed/corrupt imports. Do not show success if saving failed.
- Do not remove CSV formula protection or import/record limits.
- Keep the app local-first. A backend, account, telemetry or third-party API needs a design discussion before implementation.
- Do not include personal data, credentials or real customer campaign exports in examples, screenshots or issues. Use `example.com` and invented data.
- Version-1 backups are a compatibility commitment. Discuss changes and migration before altering that format.

## Tests and style

Follow nearby React/TypeScript patterns. Keep changes focused rather than reformatting unrelated files. Add a regression test for behavior fixes; describe manual verification for copy-only changes. `npm run build` includes TypeScript checks. There is no separate lint command yet; do not claim one ran.

## Language and AI assistance

English is the shared language for issues, PR summaries and code identifiers. Turkish documentation and translation contributions are welcome; contributors may ask questions in either language. Keep the two README files aligned when instructions change.

AI-assisted contributions are welcome when you understand the change, verify it, and disclose assistance briefly in the PR. You remain responsible for correctness, licensing and review replies. Do not submit generated bulk changes or fabricated test results.

## Review and community

Diyar Yavuz currently maintains the project. Review timing is best effort; there is no response-time promise. Maintainers may request a smaller scope or ask for evidence. All participants follow the [Code of Conduct](CODE_OF_CONDUCT.md). Security and data-loss concerns have a separate [reporting guide](SECURITY.md).

Questions and proposals belong in GitHub issues using the question/idea template. See the [starter task catalog](docs/STARTER_TASKS.md) for concrete ways to help.
