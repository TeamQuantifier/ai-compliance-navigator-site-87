

## Plan: Add MailerLite API call to Cycle Registration Form

### Current state
- The `CycleRegistrationForm` already uses `t()` translation keys for all UI text
- Translations already exist in all 3 locales (PL, EN, CS) — `cycleBadge`, `cycleFormTitle`, `cycleFormSubmit`, etc.
- The form currently only inserts into `event_registrations` in the database

### What needs to change

**One file: `src/components/events/CycleRegistrationForm.tsx`**

In the `onSubmit` function, after the successful Supabase insert, add a non-blocking call to `newsletterClient.subscribe()` — same pattern used in Footer, Contact, Quiz, and Ebook forms:

```typescript
import { newsletterClient } from '@/lib/newsletter-client';

// After supabase insert succeeds, fire-and-forget:
newsletterClient.subscribe(data.workEmail, currentLocale, {
  source: 'webinar_cycle_registration',
  first_name: data.firstName,
  company: data.company,
  tags: ['webinar-cycle', 'nis2-webinars'],
}).catch(() => {}); // non-blocking
```

This sends the registrant's email, name, company, and language to the marketing API (`marketing.quantifier.ai`) with appropriate source/tags for segmentation.

### No other changes needed
- Translations: already complete in PL/EN/CS
- `newsletter-client.ts`: no changes needed, existing `subscribe` method supports all required fields

