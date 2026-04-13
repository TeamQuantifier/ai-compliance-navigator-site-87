

## Problem

The contact form on `/pl/partners/gs1-polska` displays raw i18n keys (`contact.form.firstName`, `contact.form.lastName`, etc.) instead of translated placeholder text. This is because the code references non-existent nested keys like `contact.form.firstName`, while the actual translation keys are `contact.firstName` (without the `.form.` nesting).

## Fix

**Single file change**: `src/pages/partners/Gs1Polska.tsx` (lines 312-319)

Replace the incorrect translation key paths in the form inputs:

| Current (broken)              | Corrected                     |
|-------------------------------|-------------------------------|
| `contact.form.firstName`      | `contact.firstName`           |
| `contact.form.lastName`       | `contact.lastName`            |
| `contact.form.email`          | `contact.emailAddress`        |
| `contact.form.company`        | `contact.companyName`         |
| `contact.form.message`        | `contact.message`             |
| `contact.form.sending`        | `contact.sending`             |

The form submission logic (`handleSubmit`) already works correctly -- it calls the `contact-form` Edge Function, saves to `contact_submissions` table, and syncs with the marketing API. No backend changes needed.

This fix applies to all three languages (PL, EN, CS) since they all have the correct keys under `contact.*`.

