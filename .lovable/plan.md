

## Problem

The contact form calls `POST /contact` on `marketing.quantifier.ai`, but that endpoint doesn't exist (returns 404). The API only supports `/subscribe` and `/unsubscribe`.

## Solution

Use the `/subscribe` endpoint for contact form submissions too — it already accepts `first_name`, `last_name`, `company`, `customer_message`, and `tags`. We'll modify `submitContact` in `newsletter-client.ts` to call `/subscribe` with a `contact_form` tag and include the message in `customer_message`.

### Changes

**`src/lib/newsletter-client.ts`** — Rewrite `submitContact` to use `/subscribe`:

```typescript
async submitContact(data: {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  message: string;
}) {
  const pageUrl = (typeof window !== 'undefined' && window.location?.href) || undefined;

  return this._request('/subscribe', 'POST', {
    email: data.email,
    first_name: data.firstName,
    last_name: data.lastName,
    company: data.company,
    customer_message: data.message,
    origin: pageUrl,
    source: pageUrl,
    tags: ['contact_form'],
  });
}
```

**`src/pages/Contact.tsx`** — Remove the redundant second `newsletterClient.subscribe()` call after `submitContact`, since `submitContact` now uses `/subscribe` directly (avoids double-subscribing).

This ensures contact form data gets to your marketing system and the user gets properly tagged as a contact form submission. The `customer_message` field carries the message content.

