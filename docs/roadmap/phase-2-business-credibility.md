# Phase 2 — Business Credibility

**Goal:** Transform the functional foundation into a trustworthy, contract-ready presence with proof of work, credentials, and core trust pages.

**Status:** Not started

**Estimated effort:** 4–5 weeks (100–140 hours)

**Depends on:** Phase 1 complete (especially live deployment)

---

## Business-critical deliverables

| Deliverable | Route (proposed) | Priority |
|---|---|---|
| **Capability Statement Page** | `/about/capabilities` | Critical |
| **Projects Portfolio** | `/projects` | Critical |
| **Testimonials** | Component + `/projects`, `/about` | High |
| **Case Studies** | `/projects/[slug]` | Critical |
| **Certifications Page** | `/about/certifications` | High |

---

## Task checklist

### Brand identity

- [ ] Add official FTBS logo to header and footer (SVG preferred)
- [ ] Replace text-only branding with responsive logo component
- [ ] Confirm and apply final brand color palette
- [ ] Custom favicon and apple-touch-icon
- [ ] Branded Open Graph images (Home, About, Services, Contact, Projects)
- [ ] Branded email signature alignment (for form notifications)

### Capability Statement Page *(business-critical)*

- [ ] Create `/about/capabilities` page
- [ ] Core competencies: construction + technology
- [ ] Company overview, differentiators, and service summary
- [ ] Past performance highlights (summary — detail in case studies)
- [ ] NAICS preview section (full detail in Phase 6)
- [ ] Download CTA placeholder for PDF (live download in Phase 6)
- [ ] Print-friendly layout
- [ ] Metadata and internal links from Services, About, Contact

### Projects Portfolio *(business-critical)*

- [ ] Create Projects hub (`/projects`)
- [ ] Define project data model (`lib/projects.ts` or content files)
- [ ] Project card component with category filters
- [ ] Categories: infrastructure, commercial, residential, project management, technology
- [ ] Link portfolio from Home, Services, About, and footer
- [ ] Add projects to sitemap
- [ ] Empty-state handling if fewer than 3 projects at launch

### Case Studies *(business-critical)*

- [ ] Case study detail template (`/projects/[slug]`)
- [ ] Structure: challenge, approach, outcome, services, timeline
- [ ] Publish minimum 3 case studies (client approval required)
- [ ] Project photography with alt text
- [ ] Client type labels (government, developer, institution — anonymized if needed)
- [ ] Cross-link case studies from Capability Statement and Services

### Testimonials *(business-critical)*

- [ ] Testimonials component (reusable)
- [ ] Place on Home, About, and Projects pages
- [ ] Minimum 3 approved quotes with name, title, organization (as permitted)
- [ ] Document client permission for each testimonial
- [ ] Optional: video testimonial embed (Phase 5)

### Certifications Page *(business-critical)*

- [ ] Create `/about/certifications` page
- [ ] List verifiable licenses, certifications, and registrations only
- [ ] Certification badge/grid component
- [ ] Link from About, Capability Statement, footer
- [ ] Note: SAM, NAICS detail expands in Phase 6
- [ ] Quarterly review process for expired credentials

### Photography & visual assets

- [ ] Professional hero photography (construction / infrastructure)
- [ ] Team or leadership photo (if approved)
- [ ] Project gallery images for portfolio
- [ ] Optimize all images via `next/image`

### Contact & communication

- [ ] Add confirmed business phone number to `lib/company.ts`
- [ ] Display phone in header (mobile), footer, and contact page
- [ ] Wire contact form to email service (Resend, SendGrid, or Formspree)
- [ ] Configure environment variables for form delivery
- [ ] Set expected response time copy on contact page

### Leadership & trust content

- [ ] Add President full name and title to About page
- [ ] Leadership section with approved bio
- [ ] Credentials bar (licensed, insured — verifiable claims only)
- [ ] Client types served (government, developers, institutions)

### Legal & additional pages (see [additional-deliverables.md](./additional-deliverables.md))

- [ ] Privacy Policy (`/legal/privacy`)
- [ ] Terms of Service (`/legal/terms`)
- [ ] FAQ Page — initial version (`/faq`)
- [ ] Cookie Policy (`/legal/cookies`) — when analytics enabled
- [ ] Link all legal pages in footer

### Technical polish

- [ ] Branded 404 page
- [ ] Analytics integration (GA4 or privacy-friendly alternative)
- [ ] Form spam protection (honeypot or Turnstile)

### QA & launch verification

- [ ] Verify contact paths (form, email, phone)
- [ ] Lighthouse and accessibility audit
- [ ] Stakeholder content approval

---

## Completion criteria

Phase 2 is **complete** when all of the following are true:

1. **Capability Statement Page** is live with accurate, approved content.
2. **Projects Portfolio** hub is live with at least 3 **Case Studies** published.
3. **Testimonials** appear on Home, About, and Projects with documented approval.
4. **Certifications Page** lists only verified credentials.
5. Logo, phone, and form email delivery work across all devices.
6. Privacy Policy, Terms, and initial FAQ are published and footer-linked.
7. Stakeholder sign-off on all public claims and project content.

---

## Dependency mapping

| Task | Depends on | Blocks |
|---|---|---|
| Capability Statement Page | Logo, service copy | Phase 6 PDF, gov outreach |
| Projects Portfolio | Project photos, copy | Case studies, testimonials |
| Case Studies | Client approval | Capability page, Phase 6 past performance |
| Testimonials | Client permission | Home/About credibility |
| Certifications Page | Verified credential list | Phase 6 NAICS/SAM sections |
| Form email delivery | Email API + env vars | Phase 4 lead system |
| Privacy / Terms | Legal copy | Phase 4 forms, Phase 6 compliance |
| FAQ Page | Approved Q&A | Phase 5 SEO content |

**External dependencies**

- Logo files, phone, email inbox
- 3+ project case studies with photos and approval
- Testimonial quotes with permission
- Certification/license documentation
- Capability statement content
- Legal review of privacy and terms

---

## Estimated effort

| Workstream | Hours | Notes |
|---|---|---|
| Brand assets integration | 12–16 | |
| Capability Statement Page | 12–16 | Content-heavy |
| Projects Portfolio + case studies | 32–48 | 3+ studies |
| Testimonials | 6–10 | |
| Certifications Page | 8–12 | |
| Form email delivery | 8–12 | |
| Legal + FAQ pages | 12–16 | |
| Photography + OG images | 12–16 | |
| QA + stakeholder review | 12–16 | |
| **Total** | **100–140** | |

---

## Implementation order

1. Collect assets — logo, phone, projects, testimonials, certifications, legal copy  
2. Logo, favicon, header/footer update  
3. Contact form email delivery  
4. Phone number site-wide + JSON-LD  
5. **Capability Statement Page** (web version)  
6. **Certifications Page**  
7. Projects data model + **Projects Portfolio** hub  
8. **Case Studies** (3 minimum)  
9. **Testimonials** component + placement  
10. Privacy Policy, Terms, initial **FAQ Page**  
11. Hero/project photography + Open Graph images  
12. Cookie Policy (if analytics enabled)  
13. 404 page + analytics + spam protection  
14. QA, Lighthouse, stakeholder approval  

---

## Quick wins within Phase 2

| Task | Effort | Impact |
|---|---|---|
| Form email delivery | 4–6 hours | Critical |
| Phone number site-wide | 1 hour | High |
| Capability Statement Page (MVP) | 8–12 hours | Critical |
| First case study published | 6–8 hours | High |
| Privacy Policy + Terms | 4–8 hours | High |
