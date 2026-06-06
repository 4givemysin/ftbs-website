# Phase 1 & 2 — Remaining Checklist

**Last updated:** June 2026  
**Purpose:** Close out Phase 1/2 before Phase 3 (BGW Construction Expansion).

---

## Development complete (in codebase)

- [x] Core pages: Home, About, Services, Contact
- [x] Credibility pages: Capability Statement, Projects, Case Studies, Testimonials, Certifications, Company Profile
- [x] Legal pages: Privacy, Terms, Cookie Policy, FAQ
- [x] Footer legal links + contact form privacy notice
- [x] Branded 404 page
- [x] Phone in navbar (desktop) + footer + contact
- [x] Print-friendly capability statement styles
- [x] Portfolio category navigation
- [x] Resend contact form + honeypot (code)
- [x] Optional GA4 via `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- [x] OG images, sitemap, JSON-LD

---

## Your action items (cannot be done in code alone)

### Production & SEO (Phase 1)

| Task | Owner | Notes |
|---|---|---|
| Connect `ftbsllc.com` to Vercel | **In progress (you)** | Follow [DEPLOY-DOMAIN.md](../DEPLOY-DOMAIN.md) — old placeholder still live at ftbsllc.com |
| Set Resend env vars on Vercel | You | `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_NOTIFICATION_EMAIL` |
| Test contact form in production | You | Submit test inquiry; confirm email delivery |
| Google Search Console | **Deferred** | Add property + submit sitemap after site is fully complete |
| Lighthouse audit | **Done** | Homepage: Performance 94, Accessibility 100, Best Practices 100, SEO 100 |

### Legal review (Phase 2)

| Task | Owner | Notes |
|---|---|---|
| Attorney review of Privacy Policy | Legal | Template live at `/legal/privacy` — marked for review |
| Attorney review of Terms of Service | Legal | Template live at `/legal/terms` |
| Enable GA4 when ready | You | Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel |

### Client content (Phase 2)

| Asset | Status | Action |
|---|---|---|
| Official FTBS logo (SVG) | Placeholder | Replace `components/brand/Logo.tsx` asset |
| Approved project portfolio | Sample | Replace data in `lib/projects.ts` |
| Approved case studies (3+) | Sample | Replace data in `lib/case-studies.ts` |
| Approved testimonials | Sample | Replace data in `lib/testimonials.ts` + permission docs |
| Verified certifications | Placeholders only | Update `lib/certifications.ts` with verified docs |
| Paul Gibbs full resume | **Integrated** | On About page — `/about#leadership-resume` |
| Hero / project photography | None | Add images via `next/image` when provided |
| Capability PDF download | Contact request | Full PDF generation planned Phase 6 |

### Stakeholder sign-off

- [ ] All public claims reviewed by FTBS/BGW leadership
- [ ] Sample content replaced or explicitly approved to remain as demo
- [ ] Phone, email, and address confirmed current

---

## After this checklist → Phase 3

When dev items above are done and client content is flowing in, proceed to **Phase 3: BGW Construction Expansion** (`/divisions/bgw-construction/*`).

Then request the **final website polish pass** for visual consistency, spacing, and UX refinement sitewide.
