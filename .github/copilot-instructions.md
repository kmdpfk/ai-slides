# Copilot instructions — ai-slides

Hub for slide decks built with **React 19 + Vite**. Each deck is a self-contained folder under [src/decks/](../src/decks/) and is auto-discovered at build time. Deployed to GitHub Pages under base path `/ai-slides/`.

## Commands

| Task    | Command           | Notes                                                       |
| ------- | ----------------- | ----------------------------------------------------------- |
| Dev     | `npm run dev`     | Vite dev server with HMR                                    |
| Lint    | `npm run lint`    | Flat ESLint config ([eslint.config.js](../eslint.config.js)) |
| Build   | `npm run build`   | Outputs to `dist/`                                          |
| Preview | `npm run preview` | Serves the production build locally                         |
| Deploy  | `npm run deploy`  | Publishes `dist/` to `gh-pages` branch                      |

Always run `npm run lint` after editing `.jsx`/`.js` files. There is no test suite.

## Architecture

- **Entry**: [src/main.jsx](../src/main.jsx) → [src/App.jsx](../src/App.jsx).
- **Routing**: hash-based, parsed in [App.jsx](../src/App.jsx#L6-L12). `#/` shows the landing page, `#/deck/<slug>` shows a deck. No router library — keep it that way.
- **Deck registry**: [src/decks/registry.js](../src/decks/registry.js) uses `import.meta.glob('./*/index.{js,jsx}', { eager: true })` to auto-discover decks. The **folder name is the slug** used in URLs and as the React key.
- **Landing page**: [src/LandingPage.jsx](../src/LandingPage.jsx) renders one card per deck from the registry.
- **Base path**: `/ai-slides/` is set in [vite.config.js](../vite.config.js) for GitHub Pages — do not change without updating the deploy target.

## Adding a new deck

1. Create `src/decks/<slug>/` (the folder name becomes the URL slug — keep it kebab-case and URL-safe).
2. Add `<slug>/index.js` that **default-exports deck metadata**:
   ```js
   import MyDeck from './MyDeck.jsx'
   export default {
     title: '…',          // required, used for sort + landing card + <title>
     description: '…',    // optional, shown on landing card
     eyebrow: '…',        // optional, small label above title
     accent: '…',         // optional CSS color / gradient; becomes --deck-accent
     Component: MyDeck,   // required, the rendered React component
   }
   ```
3. Build the deck component + a sibling `<Deck>.css`. Scope CSS classes to the deck (existing pattern: `.deck`, `.slide`, plus deck-specific names) — there is **no CSS-modules / scoping system**, so unique class names are how collisions are avoided.
4. Put images/QR codes in `src/decks/<slug>/assets/` and import them so Vite fingerprints them.

Decks are sorted by `title` with Danish collation (`localeCompare(…, 'da')`); reflect that when ordering matters.

## Conventions

- **JSX only, no TypeScript.** React 19 — no `forwardRef`, no `defaultProps` on function components, no legacy lifecycles.
- **UI copy is in Danish.** Match the existing tone in [LandingPage.jsx](../src/LandingPage.jsx) and [AiTaskforceDeck.jsx](../src/decks/ai-taskforce/AiTaskforceDeck.jsx) when adding new visible strings; comments and identifiers stay in English.
- **Formatting**: 2-space indent, single quotes, no semicolons (match existing files).
- **Imports**: relative paths with explicit `.jsx` / `.js` extensions (required by the ESLint/Vite setup as configured).
- **Assets**: always `import` images instead of referencing `/public` paths so the `/ai-slides/` base path works in production.
