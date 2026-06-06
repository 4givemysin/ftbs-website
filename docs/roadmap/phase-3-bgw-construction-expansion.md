# Phase 3 — BGW Construction Expansion

**Goal:** Establish BGW Construction Company as a full division hub with service verticals, future development narrative, and visual project proof.

**Status:** Not started

**Estimated effort:** 3–4 weeks (70–100 hours)

**Depends on:** Phase 2 brand assets, portfolio foundation, leadership content approved

---

## Business-critical deliverables

| Deliverable | Route (proposed) | Priority |
|---|---|---|
| **BGW Construction Division** | `/divisions/bgw-construction` | Critical |
| **Infrastructure Services** | `/divisions/bgw-construction/infrastructure` | Critical |
| **Commercial Construction** | `/divisions/bgw-construction/commercial-construction` | High |
| **Residential Construction** | `/divisions/bgw-construction/residential-construction` | High |
| **Future Development** | `/divisions/bgw-construction/future-development` | Medium |
| **Project Gallery** | `/divisions/bgw-construction/projects` or `/projects?division=bgw` | High |

---

## Task checklist

### Site structure

- [ ] Create Divisions overview page (`/divisions`)
- [ ] Add Divisions to main navigation
- [ ] Update footer with BGW and service vertical links
- [ ] Update sitemap with all BGW routes
- [ ] Breadcrumb navigation on all BGW pages

### BGW Construction Division *(business-critical)*

- [ ] BGW landing page (`/divisions/bgw-construction`)
- [ ] Division hero — infrastructure and community development focus
- [ ] President's letter (approved name, title, date)
- [ ] "What we seek" — partnership and project types
- [ ] Who we partner with (government, developers, institutions)
- [ ] BGW-specific CTAs → Phase 4 inquiry forms
- [ ] BGW division badge and accent theming
- [ ] BGW JSON-LD and metadata

### Infrastructure Services *(business-critical)*

- [ ] Dedicated page: roads, housing, buildings, essential infrastructure
- [ ] Service capabilities aligned with President's letter
- [ ] Link to Phase 2 case studies (infrastructure category)
- [ ] CTA: infrastructure partnership inquiry

### Commercial Construction *(business-critical)*

- [ ] Dedicated page: commercial buildings and facilities
- [ ] Scope, compliance, and delivery approach
- [ ] Link to relevant case studies
- [ ] CTA: project inquiry form (Phase 4)

### Residential Construction *(business-critical)*

- [ ] Dedicated page: housing and residential development
- [ ] Community impact and long-term development narrative
- [ ] Link to housing-related case studies or gallery items
- [ ] CTA: consultation form (Phase 4)

### Future Development *(business-critical)*

- [ ] Page outlining planned growth, regions, and strategic priorities
- [ ] "Returning home" and national development alignment
- [ ] Pipeline categories (without unapproved commitments)
- [ ] Partnership invitation for upcoming initiatives
- [ ] Clear disclaimer: forward-looking statements subject to change

### Project Gallery *(business-critical)*

- [ ] BGW-filtered project gallery (photos + short captions)
- [ ] Grid/lightbox component optimized for mobile
- [ ] Categories: infrastructure, commercial, residential
- [ ] Link from BGW landing and each service vertical
- [ ] Alt text and lazy loading for performance
- [ ] Integrate with Phase 2 `/projects` or standalone BGW gallery route

### Visual & branding

- [ ] BGW accent colors (earth/green) on division pages
- [ ] Infrastructure photography for heroes and gallery
- [ ] Consistent division badge across BGW section

### SEO & cross-linking

- [ ] Unique metadata per BGW page
- [ ] Internal links from Home, About, Services, Capability Statement
- [ ] Target keywords: BGW Construction, infrastructure, commercial/residential construction
- [ ] BreadcrumbList JSON-LD

### Homepage integration

- [ ] Upgrade homepage BGW section with links to division hub
- [ ] Feature Project Gallery preview on homepage or BGW landing

### Content config

- [ ] Create `lib/divisions.ts` with BGW metadata and service verticals
- [ ] Gallery content in `lib/projects.ts` or `content/bgw/`

---

## Completion criteria

Phase 3 is **complete** when all of the following are true:

1. **BGW Construction Division** landing page is live with approved letter and messaging.
2. All four service vertical pages are published: **Infrastructure**, **Commercial**, **Residential**, **Future Development**.
3. **Project Gallery** displays BGW work with optimized images and categories.
4. BGW section appears in navigation, sitemap, and footer.
5. CTAs connect to Phase 4 forms (or contact with pre-filled inquiry type).
6. All pages pass mobile QA and accessibility spot-check.
7. Stakeholder approval on forward-looking Future Development content.

---

## Dependency mapping

| Task | Depends on | Blocks |
|---|---|---|
| BGW Division landing | Phase 2 brand, letter approval | All BGW verticals |
| Infrastructure Services | BGW landing, service copy | Phase 4 project inquiry |
| Commercial / Residential pages | Service definitions | Gallery categorization |
| Future Development | Leadership-approved roadmap copy | Partnership messaging |
| Project Gallery | Phase 2 portfolio photos | BGW credibility |
| BGW theming | Phase 2 design system | Visual consistency |
| Phase 4 forms | Phase 3 CTAs | Lead capture from BGW |

**External dependencies**

- President letter (name, date, approved text)
- BGW service vertical copy
- Future Development approved messaging
- BGW project photos for gallery
- FTBS/BGW legal relationship for footer and schema

---

## Estimated effort

| Workstream | Hours | Notes |
|---|---|---|
| BGW Division landing + letter | 16–24 | |
| Infrastructure Services page | 8–12 | |
| Commercial Construction page | 8–12 | |
| Residential Construction page | 8–12 | |
| Future Development page | 8–12 | |
| Project Gallery | 12–20 | |
| Navigation, SEO, cross-links | 8–12 | |
| QA + content approval | 8–12 | |
| **Total** | **70–100** | |

---

## Implementation order

1. Confirm letter, legal relationship, and BGW service copy  
2. Create `lib/divisions.ts` and gallery content structure  
3. **BGW Construction Division** landing page  
4. **Infrastructure Services** page  
5. **Commercial Construction** page  
6. **Residential Construction** page  
7. **Project Gallery** (BGW-filtered)  
8. **Future Development** page  
9. Divisions overview + navigation/footer/sitemap updates  
10. BGW theming, breadcrumbs, JSON-LD  
11. Homepage and Phase 2 cross-links  
12. QA, SEO check, stakeholder approval  

---

## Content source reference

BGW narrative centers on:

- Returning home to support national infrastructure development  
- Roads, buildings, housing, and essential infrastructure  
- Community impact and long-term legacy  
- Commercial and residential construction verticals  
- Future development and partnership opportunities  

All public copy must be approved before publish.
