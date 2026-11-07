# Replace Sample Projects with GitHub Projects

User requested reading equalignorecase's repositories and presenting the projects on the existing site.

- [x] Read public GitHub API metadata, README files, dependency manifests and representative source files.
- [x] Replace TaskFlow/FinTrack/DevNotes sample entries with 7 public project repositories; exclude the equalignorecase profile README repository.
- [x] Preserve original samples outside the content collection, record source URLs and review date.
- [x] Describe documented functionality and implementation without inventing personal responsibilities, performance, users, test coverage or live deployment status.
- [x] Keep current layout; allow a custom live-link label for the API project.
- [x] Build all project pages and check source links, anchors, project order and removal of sample content.

Technology evidence comes from package.json, requirements.txt and source imports. README statements with inconsistent versions or unverifiable security/performance guarantees are not repeated. Homepage URLs come from GitHub repo metadata; backend transaction endpoints are not invoked.

## Verification

- Built 8 pages: homepage and 7 real project detail pages.
- Generated HTML checks passed: exact repo/homepage links match GitHub metadata, unique IDs, one h1/page, internal anchors resolve, 7 homepage cards, custom API label, no old sample names or routes.
- Current local site responds HTTP 200 at port 4322.
- git diff --check passed.
- These checks validate the portfolio integration; the external applications and payment flows were not executed.
