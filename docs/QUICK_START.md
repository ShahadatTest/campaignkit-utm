# Try CampaignKit in five minutes

Use the demo linked in README if available, or run `npm ci` and `npm run dev` locally. The demo and localhost use separate browser storage.

1. Switch to English with the language control if needed.
2. In the link builder enter `https://example.com/offer?ref=home#details`, source `newsletter`, medium `email`, campaign `autumn_2026`, and content `header`.
3. Review the preview: the existing ref parameter and #details fragment remain; the campaign values become utm_ query parameters. Copying a link does not send it to the destination.
4. Save the link and open the library. Search for autumn_2026 and reuse the record to prepare a variant.
5. Export JSON before clearing browser data. CSV is for spreadsheets; JSON is the supported import format.
6. Try bulk variants with the same campaign and different source/medium/content values. Resolve invalid rows before saving.

## Verify a change without risking your library

Use a separate browser profile or test context and invented data. Check a save survives reload, duplicate saves do not increase the count, an invalid import does not replace existing records, and switching language preserves input. Do not deliberately corrupt your daily browser library to test recovery.

## Troubleshooting

- **Save failed:** check browser storage permissions; do not assume the link was saved because a preview exists.
- **Corrupt library:** download the original data before an explicit reset. Maintainers cannot recover data cleared from your browser.
- **Import rejected:** use a version-1 CampaignKit JSON export within the documented size and record limits; CSV is not an import format.
- **No click statistics:** expected. CampaignKit prepares URLs; your destination analytics system performs measurement.

To help improve this guide, report the exact step, browser and expected/actual result using invented data. See CONTRIBUTING.md.
