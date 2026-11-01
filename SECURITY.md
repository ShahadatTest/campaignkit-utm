# Security and data safety

CampaignKit v0.1 is an early release. Security fixes target the current `main` branch; there is no long-term support commitment or security audit claim.

## Report a vulnerability

Do not put credentials, personal data or a working exploit against another user's data into a public issue. Prefer GitHub's **Report a vulnerability** option on this repository's Security tab if private reporting is enabled. If that option is unavailable, use a contact method on the [maintainer profile](https://github.com/diyaryavuz) to request a private channel. No dedicated security mailbox or response-time guarantee is currently provided.

Include the affected version, a minimal reproduction using invented data, expected/actual behavior and potential impact. Do not send real customer exports. Ordinary non-sensitive bugs can use the bug report template.

## Data-loss reports

Stop editing and export a backup if possible. Describe the action that failed and browser version, but avoid clearing site data until you have preserved what you can. Never paste a whole localStorage dump into an issue. The app does not send records to a server and maintainers cannot recover another browser's deleted local data.

## Contribution boundaries

Preserve input validation, additive import behavior, CSV formula protection and failure reporting. Discuss changes to those guarantees before implementation. Local-first storage is not encryption: anyone with access to the browser profile may be able to read its records.
