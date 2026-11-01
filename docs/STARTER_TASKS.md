# Starter contribution tasks

Choose one unassigned issue, read its discussion and comment before starting. The published GitHub issue is the assignment record; this catalog is a planning snapshot. Maintainers can revise scope after discussion.

## 1. docs: add English and Turkish campaign naming examples

Suggested labels: good first issue, documentation.

## User need
New users need realistic examples for consistent source/medium/campaign values before using their own data.

## Scope
Add `docs/NAMING_EXAMPLES.md` with paired English/Turkish explanations. Link it from both READMEs.

## Acceptance
- Three invented campaigns: newsletter, organic social, and paid social.
- Each has a destination on example.com, source, medium, campaign and optional content/term.
- Explain case/space warnings and that normalization is explicit, not automatic.
- Explain that naming consistency does not guarantee attribution or measure clicks.
- Examples match `buildLink` behavior; `npm test` and `npm run build` pass.

No UI or analytics integrations. Comment before starting; take one task at a time.

## 2. fix: reject impossible creation dates when importing a backup

Suggested labels: good first issue, bug.

## User need
Imported creation dates should not silently turn an impossible calendar date into a different day.

## Evidence
In `src/lib/library.ts`, `parseBackup` accepts a createdAt string with an ISO-looking prefix and finite Date.parse result. JavaScript can normalize February 30. Existing fallback is the newly generated record time when a date is unusable.

## Acceptance
- Add strict calendar validation before accepting imported createdAt.
- Preserve current fallback behavior for unusable dates; do not reject otherwise valid campaign records solely for that field.
- Tests in `src/lib/library.test.ts` cover February 30, non-leap February 29, valid leap years including century rules, and valid timezone offsets.
- Preserve valid timestamps as ISO instants, additive import, duplicate handling and version-1 backup shape.
- `npm test` and `npm run build` pass.

No new dependency or storage migration. Comment before starting.

## 3. docs: review English and Turkish UI terminology for consistency

Suggested labels: good first issue, documentation.

## User need
Both languages should describe the same action and warning, especially save failures and recovery.

## Scope
Review the labels in `src/App.tsx` against README.md and README.tr.md. Propose a small, justified terminology patch rather than rewriting all copy.

## Acceptance
- Identify concrete inconsistencies with before/after examples.
- Keep storage errors, reset consequences, import limits and no-tracking statements equally clear in both languages.
- Preserve accessible labels and update affected assertions in App.test.tsx if needed.
- Check both languages; run npm test and npm run build.

Do not change product behavior or add a third language in this task. Comment before starting.

## 4. a11y: audit keyboard focus through builder, bulk and library

Suggested labels: help wanted, accessibility.

## User need
Keyboard users should be able to complete the same link and backup workflows.

## Scope
Perform a focused keyboard audit of builder, bulk variants, library search/reuse, notifications and import controls in `src/App.tsx` and src styles. This is an audit task; do not assume a bug exists.

## Acceptance
- Record browser/version, exact key sequence, expected/actual focus, and screenshots where useful using invented data.
- Check visible focus, logical order, no focus traps, and focus after switching views or dismissing notifications.
- Fix only confirmed small defects and add relevant behavioral tests. Larger design changes become separate issues.
- Check English/Turkish and narrow layout. npm test and npm run build pass.

Do not rewrite the whole UI or claim an accessibility certification.

## 5. test: add browser coverage for saving and additive backup import

Suggested labels: help wanted, testing.

## User need
The component tests cover persistence, but a real browser should verify a saved link survives reload and imports preserve existing records.

## Scope
Propose a minimal Playwright setup and one browser workflow before adding a dependency. Start with package.json, .github/workflows/quality-and-pages.yml and src/App.test.tsx.

## Acceptance
- Build/start the local app in CI; use temporary isolated browser storage and invented data.
- Save a link, reload, verify it, import a second valid version-1 backup, and verify both records remain without duplicates.
- Include one invalid-import case proving the existing library is unchanged.
- Document local execution and browser installation. Existing unit tests/build remain green.
- CI test jobs do not receive deployment secrets or Pages write permissions.

No app backend or shared-user storage. This task is larger than a first copy edit.

## 6. design: define optional utm_id and utm_source_platform compatibility

Suggested labels: help wanted, enhancement.

## User need
Some campaigns need optional utm_id/source_platform values without losing current backup compatibility.

## Scope
Write a design proposal first; implementation is not part of this issue. Inspect src/lib/campaign.ts, src/lib/library.ts and both README files.

## Acceptance
- Define field validation, empty-field behavior and what happens to an existing destination parameter.
- Explain single/bulk/library UI impact and English/Turkish labels.
- Specify version-1 import compatibility, export strategy and migration tests.
- Preserve explicit normalization and unrelated URL parameters/fragments.
- Maintainer discussion resolves the data-format approach before coding.

No tracking API, automatic attribution claims or new account requirement.
