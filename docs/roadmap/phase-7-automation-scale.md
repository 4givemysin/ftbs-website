# Phase 7 — Automation & Scale

**Goal:** Automate lead handling, content operations, and compliance monitoring so FTBS + BGW can scale without proportional manual overhead.

**Status:** Not started

**Estimated effort:** 4–6 weeks (120–180 hours)

**Business impact score:** 7 / 10

**Depends on:** Phase 4 lead system stable; Phase 5 content volume; Phase 6 gov data processes defined

---

## Objectives

- Sync form submissions to CRM automatically
- Enable sustainable content publishing (CMS or structured git workflow)
- Monitor certification expirations and gov registration status
- Add CI quality gates (Lighthouse, accessibility, structured data)
- Document operational runbooks for automations

---

## Pages & systems

| Item | Type | Purpose |
|---|---|---|
| CRM webhook endpoints | API | Lead sync |
| CMS admin (or git CMS) | Internal | Blog, news, resources |
| Portfolio admin | Internal / CMS | Projects and case studies |
| Certification monitor | Internal job | Expiry alerts |
| SAM status check | Scheduled job | Gov readiness freshness |
| `/feed.xml` | Public | RSS for blog/news (optional) |

---

## Components (planned)

- `CrmWebhookAdapter` — HubSpot, Salesforce, or Zoho
- `LeadPipelineStatus` — internal tracking
- CMS content templates with required alt text and headings
- `AutomationHealthCheck` — email/CRM uptime
- Feature flags in `lib/features.ts`

---

## SEO requirements

- Auto-regenerate sitemap on content publish
- OG image generation for new CMS entries
- Schema.org validation in CI
- Scheduled Search Console review

---

## Accessibility requirements

- CMS templates enforce accessible heading order
- axe-core CI checks on key routes
- PDF accessibility audit for generated capability PDFs

---

## Technical requirements

- Vercel cron, Inngest, or similar for scheduled jobs
- Sentry (or equivalent) for error monitoring
- Lighthouse CI on pull requests
- Idempotent webhook handlers with retry
- Optional database for lead archive
- Rate limiting on form endpoints

---

## Task checklist

### Lead automation

- [ ] Select CRM platform with client
- [ ] Map inquiry types to CRM pipelines
- [ ] Implement webhook adapter with retry logic
- [ ] Auto-confirmation + CRM record creation
- [ ] SLA alert emails for unresponded leads (24h / 48h)

### Content operations

- [ ] Evaluate CMS vs. MDX-in-repo workflow
- [ ] Content preview for drafts
- [ ] Portfolio/case study update workflow without full redeploy
- [ ] Image upload pipeline with optimization

### Compliance automation

- [ ] Certification expiry date tracking
- [ ] 30/60/90-day reminder emails
- [ ] SAM registration status review schedule
- [ ] Quarterly capability statement review reminder

### Quality & observability

- [ ] Lighthouse CI gate (Performance ≥ 90, A11y ≥ 95)
- [ ] axe-core accessibility tests in CI
- [ ] Sentry for form and email failures
- [ ] Uptime monitoring for production domain
- [ ] Automation runbook documentation

---

## Completion criteria

1. Leads sync to CRM within 1 minute of submission
2. Content can be updated via approved workflow without developer for every change
3. Certification expiry reminders operational
4. CI blocks regressions on Lighthouse and critical a11y rules
5. Error monitoring alerts on form/email failures
6. Runbook published for all automations

---

## Dependencies

| Dependency | Required from |
|---|---|
| Stable Phase 4 forms | Phase 4 |
| CRM account and field mapping | Client |
| Gov registration data process | Phase 6 |
| Content volume justifying CMS | Phase 5 |
| Budget for tooling | Client |

---

## Business impact

Phase 7 does not win the first contract alone — it ensures leads are not lost, content stays fresh, and compliance data does not go stale. Highest ROI after Phases 2, 4, and 6 are live.

---

## See also

- [MASTER-ROADMAP.md](./MASTER-ROADMAP.md) — full seven-phase specification
- [phase-4-lead-generation.md](./phase-4-lead-generation.md)
- [phase-6-government-contractor-readiness.md](./phase-6-government-contractor-readiness.md)
