# theeat.app — facts the new design must preserve

Source of truth for re-skinning the website. Every number/claim here is pulled
from the live app or worker code (Sept 2026). Design changes the look; these
facts do not change.

## Plans & prices (must match the app)

| Plan | Monthly | Annual (app) | Annual (old site) ⚠️ | Status |
|---|---|---|---|---|
| Free | £0 | — | — | 1 plan generation, full result preview |
| **Solo** | **£4.99/mo** | £41.99/yr | £49.90/yr | Live · 7-day free trial |
| **Power** | **£9.99/mo** | £83.99/yr | £99.90/yr | Live |
| Household | £14.99/mo | £125.99/yr | — | "Coming soon" |
| Lux | £20.00/mo | £167.99/yr | — | "Coming soon" |

⚠️ Annual prices DIFFER between the app (30% off) and the old site (~17% off).
Pick one before launch; whichever wins must also match the Stripe annual Price
objects (`STRIPE_PRICE_SOLO_ANNUAL` / `STRIPE_PRICE_POWER_ANNUAL` in the worker).

Currency: site auto-localises via `currency.js` + worker `/geo`
(gbp/usd/…); show the symbol the visitor's region uses.

## Plan features — copy verbatim from the app
**Solo:** Unlimited meal plans · Craving-based plans · Swap & remake meals ·
Saved favourites · Nutrient targeting · Full grocery list · Cupboard staples ·
Protein powder support
**Power:** Everything in Solo · Instant photo & barcode logging · Import recipes
from any link
**Household (soon):** Everything in Power · Up to 6 family profiles · Kids'
adapted meals · Combined grocery list · Per-person calorie targets · Family
batch cook planner
**Lux (soon):** Everything in Power · Fine dining meal generation ·
Michelin-inspired recipes · Wine pairing suggestions · Exclusive Lux dark theme ·
Premium ingredient sourcing

## Product facts (for hero/feature copy)
- Real supermarket prices from **17 stores**: UK — Tesco, Sainsbury's, Asda,
  Morrisons, Waitrose, Aldi, Lidl, Co-op, M&S, Costco · US — Walmart, Target,
  Kroger, Aldi, Trader Joe's · UAE — Carrefour · KSA — Danube
- Prices refreshed daily; multi-store lists pick the cheapest store per item
  and show the estimated total
- Calorie targets via Mifflin-St Jeor + activity; goal timelines calculated
  from body weight (safe cut/bulk rates); clinical calorie floors
- 9-step onboarding; plan in ~1–2 min; batch-cook prep day; cook mode
- Power: photo → macros, barcode scan, recipe import from any link
- Referral: invite a friend → both get a free week (server-side grant)
- iPhone (iOS 17+). No Android. Website = account + subscription management.

## Account link (app ⇄ web) — must keep working
- Same **Firebase Auth** account on both (`firebase-init.js`, project eat-2d454).
  Sign-in methods: Google, Apple, email+password.
- Email verification = custom 6-digit code via worker (`/send-verification`,
  `/verify-code`), NOT Firebase's link.
- Pages that must exist and keep their JS: `signin.html`, `login.html`,
  `account.html`, `checkout.html`, `welcome.html` (Stripe success landing),
  `join.html` (referral landing, reads `?ref=` → `localStorage eat_ref`).
- `account.html` calls `/subscription/status` with the Firebase ID token and
  caches tier in `localStorage eat_tier` (drives the blue Power favicon via
  `favicon.js`). Sign-out clears it.
- Avatar sync: app uploads to Firebase Storage `avatars/<uid>/photo.jpg`;
  account page shows `photoURL`.

## Subscribe on the web (Stripe)
- `checkout.html` → POST worker `/stripe/create-checkout` with
  `{plan: solo|power, period: monthly|annual}` → redirect to Stripe →
  success lands on `welcome.html?plan=…` → subscription visible in the app
  via `/subscription/status` (keyed by Firebase UID/email).
- Manage/cancel: `/stripe/portal` (Stripe customer portal) from account page.
- Apple subscriptions are managed in iOS Settings, not on the web — say so.

## Worker base + public endpoints used by the site
`https://eat-claude-proxy.mohammed-alsafwani.workers.dev`
`/geo` `/subscription/status` `/stripe/create-checkout` `/stripe/portal`
`/send-verification` `/verify-code` `/referral/*` `/profile` `/handle/*`

## Shared assets to carry over
`site.js` (nav, reduce-motion), `firebase-init.js`, `currency.js`,
`legal.js`, `favicon.js`, `favicon-eat.png`, `favicon-eat-power.png`,
`apple-touch-icon`. Fonts: DM Serif Display + DM Sans (Google Fonts).

## FAQ (current questions — keep, answers updated to the facts above)
1. How does Eat build my plan?
2. Do I need to be a confident cook?
3. Can Eat handle my diet and allergies?
4. Is there a free trial?  (Solo: 7 days, cancel anytime)
5. What's the difference between Solo and Power?
6. Can I change or cancel my plan?
7. How does the shopping list work?  (17 stores, cheapest per item, totals)
8. Which devices does Eat support?  (iPhone; web for account/billing)
9. What happens to my data?  (plans device-local; account = email/name/photo)
10. Still curious? → hello@theeat.app

## Legal pages — keep, re-skin, bump the date
`privacy.html`, `terms.html`, `cookies.html` — last updated 3 July 2026.
Contacts published: hello@ · privacy@ · legal@ · press@theeat.app
(all forwarding via Cloudflare Email Routing — verify with `check-email`).
Terms facts: 7-day trial → subscription starts unless cancelled; cancelling
stops the next renewal, access continues to period end; App Store subs are
cancelled in iOS settings; web subs via the Stripe portal.
Add to Privacy: data-local statement, Firebase Auth/Storage, Stripe (web
billing), Cloudflare (API + email), OpenAI (meal images), Anthropic (plan
generation). Add to Cookies: only functional cookies/localStorage
(`eat_tier`, `eat_ref`, Firebase session); no ad tracking.

## Footer
Product · Pricing · FAQ · Support · Contact · Privacy · Terms · Cookies.
NO "Account" column (removed by request). App Store badge → placeholder
until live, then the real URL.
