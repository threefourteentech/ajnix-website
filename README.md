# Ajnix marketing website

Next.js 15 marketing site for Ajnix — lives at `ajnix.com` (EN) and `ajnix.com/fr` (FR).

Source of truth for design, copy and overrides: [`../design_website/AJNIX_Website_ClaudeCode_Handoff.md`](../design_website/AJNIX_Website_ClaudeCode_Handoff.md).

## Stack

- Next.js 15 (App Router) + TypeScript strict
- Tailwind CSS (tokens mapped from `design_website/styles/tokens.css`)
- next-intl for EN/FR routing — EN at root, FR at `/fr`, locale persisted via cookie
- next/font for self-hosted Inter Tight + IBM Plex Mono
- react-hook-form + zod for forms
- html-react-parser for blog article HTML rendering

## Scripts

```bash
npm run dev         # http://localhost:3000
npm run build       # production build
npm run start       # serve production build
npm run typecheck   # tsc --noEmit
npm run lint
```

## Routes

| URL                      | Page                                |
| ------------------------ | ----------------------------------- |
| `/`, `/fr`               | Homepage                            |
| `/wordpress-plugin`      | WP plugin landing                   |
| `/pro-waitlist`          | Pro waitlist + email capture        |
| `/pricing`               | 4-tier pricing + FAQ                |
| `/blog`                  | Blog index (filterable)             |
| `/blog/[slug]`           | Blog article template               |
| `/vs-[competitor]`       | Comparison pages (rewritten to `/vs/[competitor]`) |
| `/api/waitlist`          | Waitlist submit (POST) + count (GET) |
| `/sitemap.xml`           | Auto-generated                      |
| `/robots.txt`            | Auto-generated                      |

Available competitor slugs are defined in `lib/competitors.ts` (`monsterinsights`, `google-analytics-4`, `woocommerce-analytics`).

## Folder structure

```
app/
├── [locale]/              # localized pages (EN root, FR /fr)
│   ├── layout.tsx         # html shell, fonts, NextIntlClientProvider
│   ├── page.tsx           # homepage
│   ├── wordpress-plugin/
│   ├── pro-waitlist/
│   ├── pricing/
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── vs/[competitor]/   # rewritten from /vs-:slug
├── api/waitlist/route.ts  # JSON-file stub
├── sitemap.ts
├── robots.ts
└── globals.css

components/
├── ui/                    # primitives: Button, Card, Eyebrow, Badge, Input, GradientShape, Icon, Faq, CodeBlock, Section
├── layout/                # Header, Footer, LanguageToggle
├── home/                  # homepage sections
├── attribution/           # AttributionPreview, ModelDiagram (shared)
├── wordpress/             # BrowserMock, ComparisonTable
├── waitlist/              # WaitlistForm (client)
├── pricing/               # PricingCard
├── blog/                  # BlogCard, ArticleBody, TableOfContents, CategoryFilter
├── comparison/            # CompareTable
└── seo/                   # JsonLd helpers

lib/
├── cn.ts          # clsx wrapper
├── slug.ts
├── waitlist.ts    # JSON-file persistence stub
├── blog.ts        # env-aware: WP REST API fallback, seed otherwise
├── blog-seed.ts   # 9 seed articles (EN + FR)
└── competitors.ts # 3 seed competitors

messages/
├── en.json
└── fr.json

i18n/
├── routing.ts     # locales, defaultLocale, navigation helpers
└── request.ts     # message loader

data/
└── waitlist.json  # created on first POST (gitignored)
```

## Environment variables

See `.env.example`. None are required for local dev — the blog falls back to seed data and the waitlist writes to a local JSON file.

| Var | Used for |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical, OG, sitemap |
| `NEXT_PUBLIC_WP_API_URL` | WordPress headless blog REST API. Empty in dev → seed data. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible script (not yet wired) |

## Pricing model (override vs Claude Design)

Per the handoff doc, the production pricing is **4 tiers**, not the 2 shown in the JSX design refs:

- Free — $0, unlimited sites
- Starter — $39/mo (early bird $29), 1 site
- Pro — $99/mo (early bird $69), 5 sites
- Agency — $299/mo (early bird $199), 25 sites

The homepage teaser shows only Free + Pro. The `/pricing` page shows all four.

## Sections explicitly removed

Per Eric's instructions during build (2026-04-21):

- Social proof logo strip on homepage (no fake company names)
- Testimonials section on homepage (no fake quotes)

Both should be re-added once real beta testers exist.

## Blog content strategy

In dev: the 9 seed articles in `lib/blog-seed.ts` render. In prod (when `NEXT_PUBLIC_WP_API_URL` is set), the blog fetches from a WordPress headless instance via REST API. If the WP fetch fails or returns nothing, it falls back to the seed.

Each post has both EN and FR variants in the seed. Real WP posts should rely on Polylang or WPML for the `lang` parameter.

## Waitlist storage

The MVP stub writes submitted emails to `data/waitlist.json` (gitignored) and exposes the count at `GET /api/waitlist`. Swap `lib/waitlist.ts` for a real provider (ConvertKit, Mailchimp, Supabase) when ready — the API contract stays the same.
