# @thebensage-dev/ui

Shared React components, hooks and Tailwind v4 styles for my Next.js apps (Portfolio,
UserDirectory and whatever comes next). The repo is public at
[thebensage-dev/SharedUI](https://github.com/thebensage-dev/SharedUI); the package is published to
**GitHub Packages** by CI and documented in **Storybook**.

- **Stack:** React 19, TypeScript 6, Tailwind v4 (`light-dark()` tokens, no `dark:` variants),
  Storybook 10 (`@storybook/nextjs-vite`), Vitest.
- **Storybook:** `npm run dev` → <http://localhost:6006>. Deployed at `ui.<your-domain>` (see
  [Deploying Storybook](#deploying-storybook)).

## What's in it

| Import from                     | What                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@thebensage-dev/ui`            | `Logo`, `LogoMark`, `SiteHeader`, `Footer`, `SectionHeading`, `FeatureGrid`, `FlowSteps`, `StepTimeline`, `NoteCard`, `CookieNotice`, `ThemeToggle`, `ColourPicker`, `SegmentedControl`, `Modal`, `ConfirmDialog`, `Pagination` (+ `pageList`), `SearchBox`, `EmptyState`, `Avatar`, `Highlight`, `Reveal`, `useShortcut`, theme helpers, text helpers (`normalise`, `searchTerms`, `pluralise`), `logoSvg()` / `LOGO` (the apps' favicons) and `palette` (every colour, from `palette.json`) |
| `@thebensage-dev/ui/next`       | `NavLink`, `PathLink` (use `next/link` and `next/navigation`, so they live in their own entry)                                                                                                                                                                                                                                                                                                                                                                                                |
| `@thebensage-dev/ui/styles.css` | Colour tokens, base styles, component classes (`btn`, `card`, `input`, `tag`, `segmented`…), the brand tone classes (`tone-*`, `icon-tile`, `tone-card`, `brand-wash`…) and motion classes (`reveal`, `blob`, `float`…)                                                                                                                                                                                                                                                                       |

Everything came out of the User Directory's `components/ui`, `hooks`, `lib` and `styles`, which
Portfolio mirrored. Both apps now import it from this package instead. App-specific code (users,
countries, Drizzle, the landing preview, Portfolio's project cards) stays in the apps.

## Brand, fonts and licences

- **Colours:** one file, `brand/palette.json`, is the only place colours are defined. Each
  has a role name and a light and a dark value: neutrals (`background`, `surface`,
  `surface-muted`, `border`, `border-strong`, `foreground`, `foreground-muted`, `overlay`), brand
  (`primary` with `-hover`, `-soft`, `-ink` and `on-primary`; `secondary` and `accent`, the logo's
  red and yellow, for decoration only) and status (`success`, `warning`, `danger`, each with
  `-soft` and `-ink`). Cool neutral greys, close to a code editor's themes, with a blue primary.
- **Visitor colours:** visitors can pick each of the three brand roles on its own with
  `ColourPicker`. `choices` in `palette.json` lists the options per role (the first is the Brand
  default; the others override every token of that role: `primary`, `primary-hover`,
  `primary-soft`, `primary-ink`, `on-primary`, and likewise for `secondary` and `accent`), and
  `presets` names combinations of one choice per role (the first, Brand, is blue, red and yellow).
  They are generated as `[data-primary="<name>"]`, `[data-secondary="<name>"]` and
  `[data-accent="<name>"]` rules, so the attributes on `<html>` recolour a page and on any element
  recolour just that element. `npm run palette` fails if any choice has a text pair below 4.5:1
  (ink on the page, a card and its soft fill; `on-*` on its fill and hover; text on
  `accent-soft`) or a primary below 3:1 against the page, in either theme.
- **Changing a colour:** edit `brand/palette.json`, run `npm run palette`, then release as usual.
  It regenerates `src/styles/palette.css` (CSS variables and Tailwind colours),
  `src/lib/palette.ts` (Storybook's theme, the logo, `logoSvg()` for the apps' favicons) and
  `brand/logo.svg`. **`brand/`** is the one source of the look outside this package: each release
  is tagged `v<version>` by CI, and Infrastructure's authentik image downloads `brand/palette.json`
  and `brand/logo.svg` from that tag (its `SHAREDUI_REF`) to render the sign-in CSS, logo and
  email templates. To take a new release there, bump `SHAREDUI_REF` in Infrastructure.
  `npm run check` fails if a generated file is out of date. Storybook's **Foundations > Colours**
  shows every value.
- **Fonts:** IBM Plex Sans for text and JetBrains Mono for labels and code. Each app loads them
  with `next/font/google` (self-hosted at build time, so visitors' browsers never contact Google)
  into `--font-ui` and `--font-code`; `tokens.css` falls back to system fonts without them.
- **Licences:** this library is MIT-licensed (see `LICENSE`). IBM Plex and JetBrains Mono are under the SIL Open Font License 1.1, which allows
  use on websites, including commercial ones. Lucide icons are under the ISC licence (keep the
  notice in the package, nothing to show on the site). Portfolio's tool logos come from
  simple-icons (CC0 for the drawings); the logos themselves stay their owners' trademarks. Showing one
  to name a tool you use, linked to its site, is the use most brand guidelines permit; don't
  alter them or suggest the brand endorses the site.

## How it fits with the other repos

| Repo                | Role                                                                                                                                                                        |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SharedUI** (this) | `@thebensage-dev/ui` on GitHub Packages, plus Storybook as its own Coolify app at `ui.<domain>`.                                                                            |
| Portfolio           | Uses the styles, `Logo`, `Footer`, `CookieNotice` and `ThemeToggle`. Links to Storybook at `ui.<domain>` (its pipeline derives the URL from `DOMAIN`).                      |
| UserDirectory       | Uses most of the components, hooks and styles, plus `Footer`, `CookieNotice` and `logoSvg()` for its favicon.                                                               |
| Infrastructure      | authentik and Prometheus/Grafana on the same VPS. Its `sites.yml` lists Storybook, so Grafana checks `ui.<domain>`. Its `local/compose.yaml` builds this Storybook locally. |

All four are sibling folders under `Documents\GitHub`.

## Prerequisites

- **Node 26** (`.nvmrc`, so `nvm use 26`).
- Working on this repo needs no token: its own dependencies are public.
- Apps that install the package need a token with `read:packages` in their own gitignored `.npmrc` (see below). Publishing happens only in CI, with the workflow's own token.

## Using it in a Next.js app

### 1. A GitHub token in the app's `.npmrc`

GitHub Packages needs a token even to install. Create a **classic** personal access token with only
the `read:packages` scope (GitHub → Settings → Developer settings → Personal access tokens →
Tokens (classic)). Each app keeps it in its own `.npmrc`, which is **gitignored**; commit an
`.npmrc.example` with a placeholder instead:

```ini
@thebensage-dev:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=ghp_your_token
```

npm reads `.npmrc` itself, so plain `npm install` and `npm ci` work. In CI, `actions/setup-node`
with `registry-url: https://npm.pkg.github.com` and `scope: "@thebensage-dev"` writes the same config
from `NODE_AUTH_TOKEN`, so no `.npmrc` is needed there.

### 2. In each app

Add the package (the app needs React 19, Tailwind v4 and `lucide-react` already):

```bash
npm install @thebensage-dev/ui
```

Pull in the styles in `src/app/globals.css`, after Tailwind. This replaces the app's own copies of
`tokens.css`, `base.css` and the shared component classes:

```css
@import "tailwindcss";
@import "@thebensage-dev/ui/styles.css";

/* App-only styles after this. */
```

The package's CSS tells Tailwind to scan its own components (`@source`), so their utility classes
are generated without any extra config.

### 3. Theme toggle (no flash on load)

Read the cookie on the server and set the class on `<html>` before anything paints:

```tsx
// src/app/layout.tsx
import { cookies } from "next/headers";
import { readTheme, THEME_COOKIE, ThemeToggle, themeClass } from "@thebensage-dev/ui";
import { NavLink } from "@thebensage-dev/ui/next";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = readTheme((await cookies()).get(THEME_COOKIE)?.value);

  return (
    <html lang="en" className={themeClass(theme)}>
      <body>
        <header>
          <NavLink href="/users">Directory</NavLink>
          <ThemeToggle initialTheme={theme} />
        </header>
        {children}
      </body>
    </html>
  );
}
```

Reading cookies makes the layout render per request, which both apps already do.

The colours work the same way: read `COLOURS_COOKIE` (`colours`, e.g. `teal.sky.mint`) with
`readColours()`, spread `{...colourAttrs(colours)}` on `<html>`, and render
`<ColourPicker initialColours={colours} />` where visitors should pick them. Every toggle and
picker on a page stays in step.

To share both choices between the main site and its subdomains, pass
`cookieDomain={preferenceCookieDomain(mainSiteUrl)}` to `ThemeToggle` and `ColourPicker`. It gives
the main site's host without `www.`, so `example.com` cookies reach `users.example.com` and
`ui.example.com` (Storybook starts in them too). Browsers refuse a shared domain on `localhost`
(`localhost` and `users.localhost` keep separate cookies), so it returns undefined there. The
dev servers still share them, as cookies ignore the port (`localhost:3001` and `localhost:3000`).

### 4. Docker / Coolify builds

`npm ci` inside the image needs the token too. Keep the local `.npmrc` in `.dockerignore`, and pass
the token as a build secret so it never lands in an image layer. The temporary `.npmrc` only names
the variable:

```dockerfile
COPY package.json package-lock.json ./
RUN --mount=type=secret,id=NODE_AUTH_TOKEN,env=NODE_AUTH_TOKEN \
    printf '%s\n' '@thebensage-dev:registry=https://npm.pkg.github.com' \
      '//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}' > .npmrc \
    && npm ci \
    && rm .npmrc
```

In production the apps' images are built by each app's own pipeline (GitHub Actions), which
passes the job's `GITHUB_TOKEN` as this build secret; Coolify only runs the finished image.
Locally, each app's `npm run docker:build` passes the token from its `.npmrc` as the build secret.

### Updating

```bash
npm install @thebensage-dev/ui@latest
```

A major version bump means a breaking change: check the SharedUI commits since the last release first.

## Working on the library

```bash
npm install
npm run dev        # Storybook at http://localhost:6006: the main place to build components
npm run test:watch # Vitest
npm run check      # palette check, format check, lint, typecheck, tests, build: run before every commit
```

| Script                    | What it does                                                                                              |
| ------------------------- | --------------------------------------------------------------------------------------------------------- |
| `dev`                     | Storybook dev server on port 6006                                                                         |
| `palette`                 | Regenerates `palette.css` and `palette.ts` from `palette.json` and copies it to Infrastructure            |
| `build`                   | `palette`, then the package into `dist/` (plain `tsc`, one module per file, so `"use client"` survives)   |
| `build-storybook`         | The static Storybook site in `storybook-static/` (what the Docker image serves)                           |
| `check`                   | Fails on a stale palette, then format check, lint (zero warnings), typecheck, tests and the build         |
| `lint` / `typecheck`      | ESLint, `tsc --noEmit`                                                                                    |
| `test` / `test:watch`     | Vitest once, or watching                                                                                  |
| `format` / `format:check` | Prettier, including Tailwind class ordering                                                               |
| `pack:local`              | Builds and writes `.packs/thebensage-dev-ui-<version>.tgz`, to try an unreleased change in an app (below) |

### Adding a component

1. Create `src/components/<Name>/<Name>.tsx` with a **named** export. Add `"use client"` at the top
   if it uses state, effects, refs or event handlers.
2. Add `<Name>.stories.tsx` next to it (docs are generated from props and JSDoc comments) and a
   `<Name>.test.tsx` for behaviour.
3. Export it from `src/index.ts` (or `src/next/index.ts` if it imports from `next/*`).
4. Use the role colours (`bg-surface`, `text-foreground-muted`, `border-border`…) and the component classes
   in `src/styles/`, never raw colours or `dark:` variants. New component classes go in the matching
   file in `src/styles/components/`.

### Trying an unreleased change inside an app

Storybook covers most work. When you need to see a change in a real app before releasing:

```bash
# in SharedUI
npm run pack:local                     # builds and writes .packs/thebensage-dev-ui-<version>.tgz
# in the app
npm install ../SharedUI/.packs/thebensage-dev-ui-<version>.tgz
```

A tarball installs exactly like the published package. (`npm link` or a `file:` folder link tends
to load two copies of React and break hooks.) Run `npm install @thebensage-dev/ui@latest` in the app to
go back.

### Releasing

Releases follow semver, and publishing is automatic once the version changes:

1. Bump `version` in `package.json` with `npm version <patch|minor|major> --no-git-tag-version`
   (patch for fixes, minor for new components or props, major for anything that renames or removes
   an export or a CSS class).
2. Commit and push to `main`.
3. CI's `publish` job sees a version that isn't on GitHub Packages yet and publishes it. Pushes
   that don't change the version skip publishing.

CI (`.github/workflows/ci.yml`) runs the same checks as `npm run check` plus a Storybook build on
every PR and every push to `main`. After a green push to `main`, its `publish` job releases a new
version (see above), and its `image` and `deploy` jobs
build the Storybook image and send it to Coolify after your approval (see
[Deploying Storybook](#deploying-storybook)). Dependabot (`.github/dependabot.yml`) opens weekly PRs
for npm and GitHub Actions updates: one PR for all minor and patch updates, Storybook's and React's
packages together, majors on their own, nothing younger than 3 days. It skips the TypeScript and
ESLint pins and Node's types majors (they follow `.nvmrc`).

After a release, update the apps (`npm install @thebensage-dev/ui@latest` in Portfolio and
UserDirectory) so their lockfiles pick it up.

Each app needs read access to the package once, so its CI can install it with `GITHUB_TOKEN`. On
GitHub, open the package page (Packages > ui), then Package settings > Manage Actions access, and
add Portfolio and UserDirectory with **Read**. The same grant lets their Dependabot read it, so
no extra token is needed.

## Deploying Storybook

Storybook builds to a static site, served by Caddy on port 80. It runs as its own Coolify app on
a subdomain such as `ui.<your-domain>`, and Portfolio links to it.

Deploys go through this repo's pipeline (`.github/workflows/ci.yml`), never through Coolify's own auto-deploy. On every push to `main` (or Actions > CI > **Run workflow**):

1. **Check** runs the checks and the build (also on every pull request).
2. **Publish package** publishes `@thebensage-dev/ui` only when `package.json` has a version that isn't on GitHub Packages yet, then tags the commit `v<version>`.
3. **Build image** runs only after **Publish package** succeeds (or had nothing to publish), then builds the production image from that commit and pushes it to GitHub's container registry as `ghcr.io/thebensage-dev/storybook:sha-<commit>` (and `:main`).
4. **Check Coolify is ready** runs next to **Build image**, the same in every repo (see below).
5. **Deploy to Coolify** waits for your approval, then Infrastructure's shared deploy action (`thebensage-dev/Infrastructure/.github/actions/coolify-deploy`) writes the app's runtime settings into Coolify from the org's `DOMAIN` variable and this repo's `production` secret, points the app at the new image tag, starts the deployment and waits until Coolify reports it finished.

Coolify only runs images; it builds nothing and holds no tokens of its own. The **image** job keeps the 10 newest images on ghcr.io (about 10 deploys to roll back to) and deletes older ones, and Coolify's own Docker cleanup (Servers > the server > Docker Cleanup) removes images the server no longer uses.

**One-time setup on GitHub:** Settings > Environments > New environment `production`: tick **Required reviewers** and add yourself (later, your team), and under **Deployment branches and tags** allow only `main`. **Secrets** are environment secrets there, so only an approved deploy from `main` can read them; a pull request or another branch never sees them. **Variables** aren't secret and are set once for every repo as organization variables (thebensage-dev > Settings > Secrets and variables > Actions > Variables). The script in Infrastructure's README ("Every value for all four repos at once") sets all of it.

The deploy job only runs once Coolify is ready: **Check Coolify is ready** checks that `DOMAIN` is set and that `https://coolify.<DOMAIN>/api/health` answers. Until then the deploy job is skipped (a notice or yellow warning in the run, never a red failure, and no approval request). If `COOLIFY_TOKEN` is missing after you approve, the deploy step is skipped with a warning too.

| Name            | Kind               | Value                                                                                                                           |
| --------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `DOMAIN`        | org variable       | `example.com`. The pipeline finds Coolify at `https://coolify.example.com`.                                                     |
| `COOLIFY_TOKEN` | environment secret | Coolify API token with **write** and **deploy** (Keys & Tokens > API tokens; enable API Access under Settings > Advanced first) |

Optional overrides: `COOLIFY_URL` (variable) if Coolify isn't at `https://coolify.<DOMAIN>`, and `COOLIFY_APP_UUID` (variable) if the Coolify app isn't named `storybook`.

**One-time setup in Coolify:** New resource > **Docker Image**, named `storybook`, image `ghcr.io/thebensage-dev/storybook`, tag `main` (the pipeline sets the exact tag on every deploy). If the image on ghcr.io is private, the server needs a one-time `docker login ghcr.io` (Infrastructure README, "Coolify can pull the app images"). Then:

| Setting                | Value                      |
| ---------------------- | -------------------------- |
| Port (Ports Exposes)   | `80`                       |
| Domain                 | `https://ui.<your-domain>` |
| Env vars               | None.                      |
| Persistent storage     | None. It's a static site.  |
| Auto deploy / webhooks | Off. The pipeline deploys. |

Portfolio links to it at `https://ui.<DOMAIN>` automatically.

Locally, `docker compose up --build -d` in `Infrastructure/local` builds this Storybook too and serves it at
<http://ui.localhost:8080>. On its own: `docker build -t storybook . && docker run --rm -p 6006:80 storybook`.

A subdomain keeps Storybook's build and release cycle independent of Portfolio's. Serving it under a
path of Portfolio (`/storybook`) would mean copying this repo's build into Portfolio on every
release.

Storybook is public once deployed, like the repo. To hide it, turn on basic auth for the app in
Coolify.

## Repository setup (one-time)

- Publish the repo to the **thebensage-dev** organization as **public** (GitHub Desktop: Publish
  repository, Organization thebensage-dev, "Keep this code private" unticked), then push `main`.
- The package appears under the organization's **Packages** after the first release, linked to
  this repo. Installing from GitHub Packages always needs a `read:packages` token, even for a
  public package. Until the first release, Portfolio and UserDirectory can't `npm ci` (locally,
  in CI or in Docker). The first green push to `main` publishes `1.0.0`, the first release of
  `@thebensage-dev/ui` in the thebensage-dev organization (both apps already ask for `^1.0.0`). Then run
  `npm install` in each app to update their lockfiles.
