# Connect ftbsllc.com to Vercel

**Current state (June 2026)**

| URL | What it shows |
|---|---|
| [ftbs-website.vercel.app](https://ftbs-website.vercel.app) | ✅ New FTBS site (correct) |
| [ftbsllc.com](https://ftbsllc.com) | ❌ Old placeholder (“We make project management seamless!”) |

DNS for `ftbsllc.com` still points to the previous host (not Vercel). Connecting the domain is done in **Vercel** + your **domain registrar** (where you bought `ftbsllc.com` — often GoDaddy, Namecheap, Google Domains, etc.).

**Deferred until site is fully complete:** Google Search Console + sitemap submission.

---

## Step 1 — Confirm Vercel project

1. Sign in at [vercel.com](https://vercel.com)
2. Open the **ftbs-website** project (linked to `4givemysin/ftbs-website` on GitHub)
3. Confirm the latest deployment from `main` is **Ready**
4. Preview: [ftbs-website.vercel.app](https://ftbs-website.vercel.app)

If the project is not connected to GitHub, import the repo: **Add New → Project → Import Git Repository**.

---

## Step 2 — Add domains in Vercel

1. Project → **Settings** → **Domains**
2. Add:
   - `ftbsllc.com`
   - `www.ftbsllc.com`
3. Vercel shows **Invalid Configuration** until DNS is updated — that is expected.

Set **Primary domain** to `ftbsllc.com` and enable redirect **www → apex** (recommended).

---

## Step 3 — Update DNS at your registrar

Vercel shows the exact records after you add the domain. Typical setup:

### Option A — Vercel nameservers (easiest)

At your registrar, change nameservers to Vercel’s (shown in Domains settings). Vercel then manages all DNS.

### Option B — Keep registrar DNS (manual records)

| Type | Name | Value |
|---|---|---|
| **A** | `@` | `76.76.21.21` |
| **CNAME** | `www` | `cname.vercel-dns.com` |

Remove or replace old **A** / **CNAME** records pointing to the previous host (current IPs like `76.223.105.230` / `13.248.243.5`).

**TTL:** 600 seconds (10 min) during cutover; increase after verified.

---

## Step 4 — Wait for propagation

- DNS changes: **15 minutes – 48 hours** (often under 1 hour)
- Vercel issues **HTTPS** automatically once DNS validates
- In Vercel Domains, status should change to **Valid Configuration**

Verify:

```text
https://ftbsllc.com          → new FTBS homepage
https://www.ftbsllc.com      → redirects to ftbsllc.com
```

---

## Step 5 — Production environment variables

In Vercel → **Settings** → **Environment Variables** (Production):

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Contact form email delivery |
| `RESEND_FROM_EMAIL` | Verified sender (e.g. `FTBS Website <noreply@ftbsllc.com>`) |
| `CONTACT_NOTIFICATION_EMAIL` | `info@ftbsllc.com` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional — GA4 when ready |

Redeploy after adding variables.

---

## Step 6 — Resend sender domain (recommended)

For production email from `@ftbsllc.com`:

1. [resend.com](https://resend.com) → **Domains** → Add `ftbsllc.com`
2. Add the DNS records Resend provides (SPF, DKIM)
3. Set `RESEND_FROM_EMAIL` to a verified address on that domain

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Old site still shows | Clear browser cache; try incognito; wait for DNS |
| SSL pending | Wait up to 24h; confirm DNS matches Vercel exactly |
| www works but apex does not | Check **A** record on `@` |
| Vercel shows wrong project | Ensure domain is on **ftbs-website**, not another project |

---

## After the site is fully complete

1. [Google Search Console](https://search.google.com/search-console) → add property `https://ftbsllc.com`
2. Submit sitemap: `https://ftbsllc.com/sitemap.xml`
3. Optional: enable GA4 via `NEXT_PUBLIC_GA_MEASUREMENT_ID`
