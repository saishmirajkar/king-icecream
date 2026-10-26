# King Ice Cream

The current King Ice Cream website, exported from the Replit project as a standalone Next.js application.

## Run locally

Requires Node.js 20 or newer and pnpm.

```sh
pnpm install
PORT=3000 pnpm dev
```

Visit http://localhost:3000.

## Production

```sh
pnpm build
PORT=3000 pnpm start
```

Production builds use `.next-production`, separate from the development server's `.next` directory.

## Included

- All website pages, product imagery, fonts, and branding assets.
- The integrated scrolling storefront intro, with the original homepage retained below it.
- Product categories, section waves, and the scrolling journal showcase.

The website's source lives in `src/`, and static assets live in `public/`.
Build caches, dependencies, private workspace files, and environment secrets are not included.

The existing project configuration permits production builds despite pre-existing TypeScript issues in unused legacy components. `pnpm typecheck` reports these separately.
