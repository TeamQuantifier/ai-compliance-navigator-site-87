/**
 * Centralized JSON-LD schema builders for Quantifier.ai.
 *
 * IMPORTANT: We intentionally avoid `SoftwareApplication` without
 * `aggregateRating`/`review`. Google + Semrush flag SoftwareApplication
 * as invalid when those fields are missing. For framework/landing pages
 * we expose Quantifier.ai as a `Service`, which has no such requirement.
 *
 * Use `buildServiceSchema()` on framework/product pages.
 * Use `buildOrganizationSchema()` + `buildWebsiteSchema()` on homepage.
 */

const BASE_URL = "https://quantifier.ai";
const ORG_ID = `${BASE_URL}/#organization`;
const WEBSITE_ID = `${BASE_URL}/#website`;

export const ORGANIZATION_REF = { "@id": ORG_ID } as const;

export function buildOrganizationNode() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Quantifier.ai",
    url: BASE_URL,
    logo: `${BASE_URL}/logo-quantifier.png`,
  };
}

export function buildWebsiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: BASE_URL,
    name: "Quantifier.ai",
    publisher: { "@id": ORG_ID },
  };
}

export interface ServiceSchemaInput {
  /** Localised page URL e.g. https://quantifier.ai/en/frameworks/dora/ */
  url: string;
  /** Human service name e.g. "DORA Compliance Platform" */
  name: string;
  description: string;
  /** Short, specific service type label e.g. "Compliance automation platform" */
  serviceType?: string;
  areaServed?: string | string[];
  featureList?: string[];
  locale?: "en" | "pl" | "cs";
}

/**
 * Builds a SAFE Service JSON-LD node — no aggregateRating required.
 */
export function buildServiceNode(input: ServiceSchemaInput) {
  const {
    url,
    name,
    description,
    serviceType = "Compliance automation platform",
    areaServed = ["EU", "US", "Worldwide"],
    featureList,
  } = input;

  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    serviceType,
    url,
    areaServed,
    provider: { "@id": ORG_ID },
    ...(featureList && featureList.length ? { hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${name} capabilities`,
      itemListElement: featureList.map((f, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: { "@type": "Service", name: f },
      })),
    } } : {}),
  };
}

/**
 * Wraps a list of nodes into a single @graph document.
 * Always include Organization + WebSite once per page.
 */
export function buildGraphSchema(nodes: Array<Record<string, unknown>>) {
  return {
    "@context": "https://schema.org",
    "@graph": [buildOrganizationNode(), buildWebsiteNode(), ...nodes],
  };
}

/**
 * Convenience: full Service-page schema (Organization + WebSite + Service).
 */
export function buildServicePageSchema(input: ServiceSchemaInput) {
  return buildGraphSchema([buildServiceNode(input)]);
}
