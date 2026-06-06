# Phase 4 — Lead Generation

**Goal:** Capture, route, and measure qualified leads through dedicated forms and a unified lead generation system.

**Status:** Not started

**Estimated effort:** 3 weeks (50–70 hours)

**Depends on:** Phase 2 form email delivery; Phase 3 BGW pages and CTAs

---

## Business-critical deliverables

| Deliverable | Route (proposed) | Priority |
|---|---|---|
| **Consultation Form** | `/contact/consultation` | Critical |
| **Quote Request Form** | `/contact/quote` | Critical |
| **Project Inquiry Form** | `/contact/project-inquiry` | Critical |
| **Lead Generation System** | Backend routing, tracking, CRM | Critical |

---

## Task checklist

### Consultation Form *(business-critical)*

- [ ] Dedicated page `/contact/consultation`
- [ ] Fields: name, organization, email, phone, service interest, preferred contact method, message
- [ ] Suitable for early-stage discovery calls
- [ ] Route to consultation inbox or CRM pipeline stage
- [ ] Pre-fill from BGW/service page CTAs via URL params
- [ ] Success state with expected response timeline

### Quote Request Form *(business-critical)*

- [ ] Dedicated page `/contact/quote`
- [ ] Fields: organization, project type, location, scope summary, timeline, budget range (optional)
- [ ] Project type selector: infrastructure, commercial, residential, technology, other
- [ ] Route to estimating/sales inbox
- [ ] Internal notification with structured summary
- [ ] Spam protection on all quote submissions

### Project Inquiry Form *(business-critical)*

- [ ] Dedicated page `/contact/project-inquiry`
- [ ] Fields: organization, project name, inquiry type, division (FTBS / BGW), project focus checkboxes
- [ ] Optimized for government and institutional project submissions
- [ ] File upload placeholder for RFP documents (Phase 4.5 or Phase 6)
- [ ] Route BGW/infrastructure inquiries to designated team
- [ ] Link prominently from BGW gallery and service verticals

### Lead Generation System *(business-critical)*

- [ ] Unified server actions or API layer for all forms
- [ ] Inquiry type routing rules (consultation, quote, project, general)
- [ ] Email notifications with branded templates
- [ ] Optional: CRM integration (HubSpot, Pipedrive, Zoho)
- [ ] Optional: Slack/webhook instant alerts
- [ ] Lead logging (database, spreadsheet, or CRM — auditable trail)
- [ ] Auto-reply confirmation emails to submitters
- [ ] Admin documentation for routing rules and inbox ownership

### Conversion UX

- [ ] Contact hub page (`/contact`) linking all three forms
- [ ] Sticky mobile CTA bar (Call · Consultation · Quote)
- [ ] Click-to-call on mobile
- [ ] CTA audit on Home, Services, BGW, Projects, Capability pages
- [ ] "What happens next" copy on every form success state

### Tracking & measurement

- [ ] Analytics conversion events per form type
- [ ] UTM parameter preservation through form flow
- [ ] Monthly lead report template (volume, source, type)
- [ ] Form abandonment tracking (optional)

### Performance & security

- [ ] Honeypot or Cloudflare Turnstile on all forms
- [ ] Rate limiting on server actions
- [ ] No PII in client-side logs
- [ ] Maintain Lighthouse performance ≥90

---

## Completion criteria

Phase 4 is **complete** when all of the following are true:

1. **Consultation Form**, **Quote Request Form**, and **Project Inquiry Form** are live and tested.
2. **Lead Generation System** routes each submission to the correct inbox/CRM with zero failures in 7-day test.
3. All forms have spam protection and accessible labels/errors.
4. Auto-reply confirmations sent to submitters (if enabled).
5. Conversion events tracked in analytics per form type.
6. Contact hub clearly directs users to the appropriate form.
7. Mobile users can call or submit within one tap from key pages.

---

## Dependency mapping

| Task | Depends on | Blocks |
|---|---|---|
| Consultation Form | Phase 2 email delivery | Discovery lead flow |
| Quote Request Form | Service/project taxonomy | Sales pipeline |
| Project Inquiry Form | Phase 3 BGW pages | Infrastructure leads |
| Lead Generation System | Email API, routing rules | CRM, reporting |
| CRM integration | Business tool selection | Sales ops efficiency |
| Analytics events | Phase 2 analytics + cookie policy | ROI measurement |
| RFP file upload | Storage service decision | Phase 6 gov submissions |

**External dependencies**

- Inbox owners per lead type
- CRM choice (if any)
- Response time SLA for auto-replies
- Turnstile or spam service account
- Legal review of form data handling (privacy policy)

---

## Estimated effort

| Workstream | Hours | Notes |
|---|---|---|
| Consultation Form | 8–12 | |
| Quote Request Form | 8–12 | |
| Project Inquiry Form | 10–14 | |
| Lead Generation System (routing) | 12–20 | |
| Contact hub + CTA UX | 6–10 | |
| Analytics + reporting | 6–10 | |
| CRM integration (optional) | 8–16 | Optional |
| QA + 7-day monitoring | 6–10 | |
| **Total** | **50–70** | Excludes optional CRM |

---

## Implementation order

1. Define lead routing rules and inbox ownership  
2. Build **Lead Generation System** core (shared validation, email, logging)  
3. **Consultation Form** page + server action  
4. **Quote Request Form** page + routing  
5. **Project Inquiry Form** page + BGW routing  
6. Update `/contact` hub with form selector  
7. Spam protection + rate limiting  
8. Auto-reply email templates  
9. URL param pre-fill from BGW and Services CTAs  
10. Mobile sticky CTA + click-to-call  
11. Analytics conversion events  
12. Optional CRM webhook integration  
13. 7-day monitoring, tuning, documentation  

---

## KPIs to track

| Metric | Target (first 90 days) |
|---|---|
| Total form submissions | Establish baseline |
| Quote vs consultation vs project mix | Track distribution |
| BGW/project inquiry share | ≥30% of construction leads |
| Form completion rate | >60% |
| Spam submission rate | <5% |
| Median response time | Per SLA commitment |
