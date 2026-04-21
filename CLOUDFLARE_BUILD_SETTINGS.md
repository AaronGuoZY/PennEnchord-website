# Cloudflare Build Settings

Configure these in the Cloudflare dashboard under **Workers & Pages → pennenchord-website → Settings → Build**.

## Correct settings

| Setting | Value |
|---------|-------|
| **Framework preset** | None |
| **Build command** | `npm run deploy` |
| **Deploy command** | *(leave blank)* |
| **Build output directory** | *(leave blank)* |
| **Root directory** | *(leave blank — repo root)* |
| **Node.js version** | 22.x |

`npm run deploy` (defined in `package.json`) runs:
```
opennextjs-cloudflare build && opennextjs-cloudflare deploy
```

This compiles the Next.js app into a Cloudflare Worker bundle and deploys it in one step. The deploy command must be left blank — running build and deploy separately causes a "Could not find compiled Open Next config" error because the deploy step would run before the build artifacts exist.

## Required files (already committed — do not delete)

| File | Purpose |
|------|---------|
| `wrangler.jsonc` | Cloudflare Worker config — worker name must be `pennenchord-website` |
| `open-next.config.ts` | OpenNext adapter config |
| `next.config.ts` | Must have `output: "standalone"` (not `"export"`) |
