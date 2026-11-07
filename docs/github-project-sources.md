# GitHub project sources

Reviewed 2026-11-07. Public source: https://api.github.com/users/equalignorecase/repos?per_page=100&sort=updated

Seven non-fork project repos are displayed. The equalignorecase/equalignorecase profile README repo is excluded.

| Project | Source | Evidence read | Website from GitHub metadata |
| --- | --- | --- | --- |
| donate-project | [donate-project](https://github.com/equalignorecase/donate-project) | README.md, package.json, tree: app/api, app/admin, app/customizer, supabase migrations | https://localhostvlr-donate.vercel.app |
| laijai | [laijai](https://github.com/equalignorecase/laijai) | README.md, package.json, tree: src/lib/ocr, src/app/api/ai/parse-slip, tests/unit | https://laijai.vercel.app |
| valotrack-bot | [valotrack-bot](https://github.com/equalignorecase/valotrack-bot) | README.md, requirements.txt, tree: cogs, database, services | Not specified |
| march-coffee-dashboard | [march-coffee-dashboard](https://github.com/equalignorecase/march-coffee-dashboard) | README.md, package.json, src/lib/db.ts, src/lib/db-service.ts, tree: pages/components | https://march-coffee-dashboard.vercel.app |
| truewallet-api | [truewallet-api](https://github.com/equalignorecase/truewallet-api) | README.md, requirements.txt, main.py, api/index.py | https://localhostvlr-wallet-api.vercel.app |
| nattapong-profile | [nattapong-profile](https://github.com/equalignorecase/nattapong-profile) | package.json, complete source tree (no README found) | https://nattapong-profile.vercel.app |
| basic-web | [basic-web](https://github.com/equalignorecase/basic-web) | index.html, about_me.html, complete source tree (no README found) | Not specified |

## Content decisions

- Replaced the 3 sample entries with 7 source-based summaries; originals preserved in docs/archive/sample-projects/ outside the Astro loader.
- Year uses repository creation year, not a claim about the full project timeline.
- The role field describes project type, not an unverified personal responsibility or team role.
- Packages and implementation files support the tech stack; no unsupported framework is added to basic-web.
- No user counts, performance, test coverage, security guarantees or successful payment transactions are asserted.
- Laijai README has inconsistent Gemini model versions: descriptions use Gemini without a version.
- March Coffee's service layer uses PostgreSQL and references fallback example data. Do not present demo sales figures as business results.
- Nattapong Profile contains sample project content. Those fictional sample apps are not treated as separate real projects.
- TrueMoney's website is labeled “ดู API” rather than a frontend demo; no transaction endpoint was invoked.
- Website URLs come from repo homepage metadata; availability and deployed feature parity were not independently verified.
- Existing site layout, personal details and skill declarations are unchanged.
