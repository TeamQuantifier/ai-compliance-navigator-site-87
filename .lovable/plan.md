
# Plan: Aktualizacja meta tagów SEO dla kluczowych stron

## Podsumowanie

Projekt już ma pełną implementację SEO z:
- `react-helmet-async` (zainstalowane)
- Komponent `PageTemplate` renderujący wszystkie wymagane tagi (title, description, og:title, og:description, canonical, twitter cards)
- Klucze tłumaczeń SEO w plikach `translation.json`

Zadanie polega na **aktualizacji treści** w plikach tłumaczeń dla podanych stron.

---

## Strony do aktualizacji

| Strona | Route | Klucz tłumaczenia |
|--------|-------|-------------------|
| Homepage | `/en` | `seo.index.*` |
| Contact | `/en/contact` | `seo.contact.*` |
| Pricing | `/en/plans` | `seo.plans.*` |
| Features | `/en/product` | `seo.product.*` |
| ISO 27001 | `/en/frameworks/iso-27001` | `seo.frameworks.informationSecurity.iso27001.*` |
| SOC 2 | `/en/frameworks/soc` | `seo.frameworks.cybersecurity.soc.*` |
| NIS2 | `/en/frameworks/nis-ii` | `seo.frameworks.cybersecurity.nisII.*` |

---

## Zmiany w plikach tłumaczeń

### 1. `public/locales/en/translation.json`

```json
"seo": {
  "index": {
    "title": "Compliance Automation Platform | ISO 27001, SOC 2, NIS2",
    "description": "Automate compliance with AI. Reduce ISO 27001, SOC 2, and NIS2 audit preparation by 80%. Continuous monitoring and evidence collection."
  },
  "contact": {
    "title": "Contact Quantifier.ai | Get a Demo of AI Compliance Platform",
    "description": "Contact our team for a demo. See how Quantifier.ai automates ISO 27001, SOC 2, NIS2 compliance with AI-powered evidence collection."
  },
  "plans": {
    "title": "Pricing | Quantifier.ai Compliance Automation",
    "description": "Flexible pricing for AI-powered compliance automation. Start free, scale as you grow. ISO 27001, SOC 2, NIS2 frameworks included."
  },
  "product": {
    "title": "Features | AI-Powered Compliance Automation",
    "description": "Automated evidence collection, continuous monitoring, audit-ready reports. See all features of Quantifier.ai compliance platform."
  },
  "frameworks": {
    "informationSecurity": {
      "iso27001": {
        "title": "ISO 27001 Automation | Reduce Certification Time by 80%",
        "description": "Automate ISO 27001 compliance with AI. Gap analysis, evidence collection, audit preparation - all in one platform."
      }
    },
    "cybersecurity": {
      "soc": {
        "title": "SOC 2 Automation | Faster Audit Prep",
        "description": "Automate SOC 2 Type I and Type II compliance. Continuous monitoring, automated evidence collection, audit-ready reports."
      },
      "nisII": {
        "title": "NIS2 Compliance Automation | EU Directive Ready",
        "description": "Prepare for NIS2 directive with AI-powered compliance. Risk assessment, incident reporting, supply chain security automated."
      }
    }
  }
}
```

### 2. `public/locales/pl/translation.json`

Odpowiednie polskie tłumaczenia dla tych samych kluczy.

### 3. `public/locales/cs/translation.json`

Odpowiednie czeskie tłumaczenia dla tych samych kluczy.

---

## Szczegóły techniczne

### Obecna implementacja (bez zmian)

**PageTemplate** już renderuje wszystkie wymagane tagi:
- `<title>` - z sufixem `| Quantifier.ai`
- `<meta name="description">`
- `<meta property="og:title">`
- `<meta property="og:description">`
- `<link rel="canonical">`
- `<meta name="twitter:card">`
- `<meta name="twitter:title">`
- `<meta name="twitter:description">`
- `<link rel="alternate" hreflang="...">`

### Strony używające PageTemplate

Wszystkie wymienione strony już używają PageTemplate z kluczami `t('seo.*.title')` i `t('seo.*.description')`:
- `Index.tsx` - własna implementacja Helmet (bardziej rozbudowana)
- `Contact.tsx` - używa PageTemplate
- `Plans.tsx` - używa PageTemplate  
- `Features.tsx` - używa PageTemplate
- `Iso27001.tsx` - używa PageTemplate
- `Soc.tsx` - używa PageTemplate
- `NisII.tsx` - używa PageTemplate

---

## Zakres prac

1. Aktualizacja kluczy SEO w `public/locales/en/translation.json`
2. Aktualizacja kluczy SEO w `public/locales/pl/translation.json` (polskie odpowiedniki)
3. Aktualizacja kluczy SEO w `public/locales/cs/translation.json` (czeskie odpowiedniki)

---

## Uwagi

- Żadne zmiany w komponentach React nie są wymagane
- Infrastruktura SEO jest już kompletna
- Wystarczy zaktualizować wartości tekstowe w plikach tłumaczeń
