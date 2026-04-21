# Cloudflare Build Settings

Configure these in the Cloudflare dashboard under **Workers & Pages → pennenchord-website → Settings → Build**.

## Current working setup

| Setting | Value |
|---------|-------|
| **Framework preset** | None |
| **Build command** | `npm run build` |
| **Deploy command** | `npx wrangler deploy` |
| **Build output directory** | *(leave blank)* |
| **Root directory** | *(leave blank — repo root)* |
| **Node.js version** | 22.x |

> `npx wrangler deploy` detects `open-next.config.ts` and automatically calls `opennextjs-cloudflare build && opennextjs-cloudflare deploy`. This means Next.js is built twice per deploy (once by `npm run build`, once by OpenNext). It works correctly but is slightly slower.

## Optimized setup (avoids the double build)

| Setting | Value |
|---------|-------|
| **Framework preset** | None |
| **Build command** | *(leave blank)* |
| **Deploy command** | `npm run deploy` |
| **Build output directory** | *(leave blank)* |
| **Root directory** | *(leave blank — repo root)* |
| **Node.js version** | 22.x |

`npm run deploy` is defined in `package.json` as `opennextjs-cloudflare build && opennextjs-cloudflare deploy`, which builds and deploys in one step.

## Required files (already committed)

These files must be present in the repo for the build to work. Do not delete them.

| File | Purpose |
|------|---------|
| `wrangler.jsonc` | Cloudflare Worker configuration — sets the worker name to `pennenchord-website` |
| `open-next.config.ts` | Tells wrangler this is an OpenNext project |
| `next.config.ts` | Must have `output: "standalone"` (not `"export"`) |
