

## Problem

The marketing API (`marketing.quantifier.ai/subscribe`) returns: `"Subscription failed: Float types are not supported. Use Decimal types instead."` — this is a backend validation error from the Python/Pydantic API.

The likely cause: we're sending `undefined` values for optional fields (like `company`), which when serialized to JSON become `null`. The backend may be interpreting these incorrectly, or there's a type mismatch in the payload.

## Solution

Clean the request payload to **strip all `undefined`/`null` fields** before sending, so the API only receives fields with actual values. This prevents the backend from trying to parse empty optional fields.

### Changes

**`src/lib/newsletter-client.ts`** — Add a helper to strip empty fields, and use it in both `submitContact` and `subscribe`:

```typescript
private cleanPayload(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null && v !== '')
  );
}
```

Then wrap both payloads:
```typescript
return this._request('/subscribe', 'POST', this.cleanPayload({ ... }));
```

This ensures only populated fields are sent to the API, avoiding type-parsing issues on the backend side.

