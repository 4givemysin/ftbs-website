# Phase 1 — Foundation

**Goal:** Establish a production-ready website core with professional structure, reusable components, and SEO fundamentals.

**Status:** Largely complete — polish and deployment items remain.

**Estimated effort:** 3–4 weeks (80–120 hours)

---

## Task checklist

### Design system & architecture

- [x] Tailwind CSS v4 design tokens (brand navy, blue, gold)
- [x] Typography and spacing conventions
- [x] Reusable UI primitives (`Button`, `Container`, `Section`)
- [x] Centralized content config (`lib/company.ts`, `lib/navigation.ts`, `lib/services.ts`)
- [x] SEO metadata helper (`lib/seo.ts`)
- [ ] Replace default favicon with FTBS brand icon
- [ ] Finalize brand colors against official logo

### Layout components

- [x] Navbar (desktop)
- [x] Mobile menu (drawer, keyboard escape, focus management)
- [x] Footer (company, services, contact columns)
- [x] Site header with skip-to-content link

### Marketing components

- [x] Hero section
- [x] Section header
- [x] Services grid
- [x] CTA section
- [x] Contact form (client + server validation)

### Pages

- [x] Home (`/`)
- [x] About (`/about`)
- [x] Services (`/services`)
- [x] Contact (`/contact`)

### SEO & technical

- [x] Per-page metadata (title, description, canonical, Open Graph)
- [x] Organization JSON-LD
- [x] LocalBusiness JSON-LD on contact page
- [x] Dynamic sitemap (`/sitemap.xml`)
- [x] Robots file (`/robots.txt`)
- [ ] Open Graph images per major page
- [ ] Google Search Console setup + sitemap submission

### Quality & deployment

- [x] Production build passes
- [x] ESLint passes
- [ ] Cross-browser QA (Chrome, Safari, Firefox, Edge)
- [ ] Responsive QA (375px, 768px, 1024px, 1440px)
- [ ] Lighthouse audit (Performance ≥90, Accessibility ≥95)
- [ ] Deploy to Vercel (or chosen host)
- [ ] DNS cutover for `ftbsllc.com`
- [ ] Verify SSL and canonical domain redirect

---

## Completion criteria

Phase 1 is **complete** when all of the following are true:

1. All four core pages render correctly on mobile and desktop.
2. Navigation, mobile menu, and footer work without errors.
3. Contact form validates input and shows success/error states.
4. `npm run build` and `npm run lint` pass with zero errors.
5. Site is live on production domain with valid HTTPS.
6. Sitemap is submitted to Google Search Console.
7. Lighthouse scores meet targets (Performance ≥90, Accessibility ≥95).

---

## Dependency mapping

| Task | Depends on | Blocks |
|---|---|---|
| Design tokens | — | All components |
| Layout shell | Design tokens | All pages |
| Page content | `lib/` config | SEO metadata |
| Contact form UI | Layout shell | Phase 2 form delivery |
| Production deploy | Build passing | Phase 2+ live updates |
| Search Console | Production deploy | SEO monitoring |
| Favicon / OG images | Logo assets (client) | Phase 2 credibility |

**External dependencies**

- Hosting account (Vercel recommended)
- Domain DNS access for `ftbsllc.com`
- Optional: logo files for favicon

---

## Estimated effort

| Workstream | Hours | Notes |
|---|---|---|
| Design system + components | 24–32 | Mostly complete |
| Pages + content | 24–32 | Mostly complete |
| SEO infrastructure | 8–12 | Mostly complete |
| QA + accessibility | 8–12 | Remaining |
| Deployment + DNS | 4–8 | Remaining |
| **Total remaining** | **12–20** | Polish and launch |

---

## Implementation order

1. ~~Design tokens and `lib/` config~~ ✅
2. ~~Layout components (Navbar, MobileMenu, Footer)~~ ✅
3. ~~Marketing components~~ ✅
4. ~~Core pages (Home, About, Services, Contact)~~ ✅
5. ~~SEO (metadata, sitemap, robots, JSON-LD)~~ ✅
6. **Responsive and accessibility QA**
7. **Lighthouse optimization pass**
8. **Production deployment + DNS**
9. **Search Console + favicon (when logo available)**

---

## Notes

- Phase 1 intentionally excludes BGW dedicated pages, portfolio, legal pages, and form email delivery — those belong to Phases 2–4.
- Contact form server action validates but does not send email yet; wire in Phase 2.
- **Handoff to Phase 2:** Next priorities are Capability Statement Page, Projects Portfolio, Case Studies, Testimonials, and Certifications Page (see [phase-2-business-credibility.md](./phase-2-business-credibility.md)).
