# English Partner — Landing Page

A fast, lead-generation landing page for **English Partner Spoken English Training Institution, Coimbatore**. The page showcases the institute's direct classroom training, student transformation stories, and drives WhatsApp conversations for free demo-class bookings.

Live audience: prospective learners looking to improve spoken English — job seekers, college students, working professionals, and homemakers.

---

## Tech Stack

- **React 18** — UI framework
- **Vite 5** — build tool and dev server
- **Framer Motion** — scroll-driven animations
- **Vanilla CSS** — per-section stylesheets, no CSS framework
- **Sharp** — image optimization (build-time script)

Everything renders client-side; this is a single-page static build suitable for any static host.

---

## Project Structure

```
.
├── index.html              # HTML entry — preloads fonts, hero banner, sets meta
├── public/
│   ├── assets/             # Banners, icons, section images
│   ├── videos/             # Student testimonial videos
│   └── favicon.svg
├── src/
│   ├── main.jsx            # React entry
│   ├── App.jsx             # Top-level layout + lazy-loaded sections
│   ├── Navbar.jsx
│   ├── components/         # StickyCTA, WhatsAppFloat, LetterPop
│   └── sections/
│       ├── HeroCarousel.*
│       ├── WhoIsItFor.*
│       ├── Courses.*
│       ├── BeforeAfter.*
│       ├── Testimonials.*  # Video marquee with iOS/Android fixes
│       ├── FAQ.*
│       ├── Contact.*       # Final CTA
│       └── Footer.*
├── scripts/                # Image/asset helpers
├── vite.config.js
└── package.json
```

Below-the-fold sections are lazy-loaded via `React.lazy` to keep initial bundle size small and improve LCP.

---

## Prerequisites

- **Node.js 18+** (Node 20 LTS recommended)
- **npm 9+** (ships with Node)
- Git

Check your versions:
```bash
node -v
npm -v
```

---

## Run Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/moulishwaran-forgemind/EP-Landing_page-.git
   cd EP-Landing_page-
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

   Vite will print a local URL — usually `http://localhost:5173`. Open it in your browser. Hot-reload works out of the box; edit any file in `src/` and the page updates.

---

## Build for Production

```bash
npm run build
```

This produces a production-ready static bundle in the `dist/` folder.

To preview the production build locally:
```bash
npm run preview
```

---

## Deploy

The `dist/` folder is a plain static site. Any static host works.

### Option 1 — Vercel (recommended, zero-config)

1. Push the repo to GitHub (already done).
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the GitHub repo.
3. Vercel auto-detects Vite. Accept the defaults:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**. Vercel assigns a `*.vercel.app` URL immediately.
5. To attach a custom domain (e.g. `englishpartner.in`), go to **Project → Settings → Domains** and add it, then update your domain's DNS to point at Vercel.

Subsequent `git push` to `main` triggers an automatic redeploy.

### Option 2 — Netlify

1. [netlify.com](https://netlify.com) → **Add new site → Import from Git** → select the repo.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy. Same auto-redeploy-on-push behavior as Vercel.

### Option 3 — GitHub Pages

1. Add the base path to `vite.config.js`:
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/EP-Landing_page-/',
   })
   ```
2. Build: `npm run build`
3. Push the `dist/` folder to a `gh-pages` branch (use the `gh-pages` package or a GitHub Action).
4. In the repo settings, enable GitHub Pages pointing to the `gh-pages` branch.

Note: GitHub Pages serves under `/<repo-name>/`, so the `base` config is required — without it, assets 404.

### Option 4 — Any static host (S3, Cloudflare Pages, Firebase Hosting, cPanel, etc.)

Run `npm run build` locally and upload the contents of `dist/` to the host's public directory. No server-side runtime needed.

---

## Common Tasks

| Task | Command |
|---|---|
| Start dev server | `npm run dev` |
| Build for production | `npm run build` |
| Preview production build | `npm run preview` |
| Install a new package | `npm install <name>` |

---

## Notes

- **Videos**: Testimonial videos in `public/videos/` should be kept reasonable in size (under ~5 MB each). Large files slow down load.
- **Images**: Banners and section images live in `public/assets/`. The build does not automatically re-encode these — pre-optimize JPGs/WebPs before committing.
- **WhatsApp CTA**: The phone number is hard-coded in `src/App.jsx` as the `WA_LINK` constant — update it there if the business number changes.

---

## License

Private project — for English Partner's use only. All content and assets belong to the client.
