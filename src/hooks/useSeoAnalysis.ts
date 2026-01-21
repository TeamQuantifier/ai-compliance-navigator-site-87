import { useMemo } from 'react';
import {
  SeoRule,
  SeoCheckResult,
  SeoAnalysisResult,
  SeoThresholds,
  DEFAULT_THRESHOLDS,
  ON_PAGE_RULES,
  TECHNICAL_RULES,
  MAX_SCORE,
  getScoreStatus,
} from '@/lib/seo-rules';

interface ContentData {
  // Basic fields
  title: string;
  slug: string;
  excerpt?: string;
  
  // SEO fields
  metaTitle?: string;
  metaDesc?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  
  // Social
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterImage?: string;
  twitterCardType?: string;
  
  // Schema
  schemaType?: string;
  
  // Content
  bodyRich?: any;
  featuredImageUrl?: string;
  featuredImageAlt?: string;
  
  // Status
  status?: string;
  
  // For duplicate checking
  existingTitles?: string[];
}

interface BodyAnalysis {
  wordCount: number;
  h1Count: number;
  h2Count: number;
  h3Count: number;
  internalLinks: number;
  externalLinks: number;
  hasKeywordInIntro: boolean;
  plainText: string;
}

// Extract text and structure from TipTap JSON
function analyzeBodyRich(bodyRich: any, baseUrl: string = ''): BodyAnalysis {
  const result: BodyAnalysis = {
    wordCount: 0,
    h1Count: 0,
    h2Count: 0,
    h3Count: 0,
    internalLinks: 0,
    externalLinks: 0,
    hasKeywordInIntro: false,
    plainText: '',
  };

  if (!bodyRich || !bodyRich.content) return result;

  const extractText = (node: any, depth: number = 0): string => {
    let text = '';

    if (node.type === 'text') {
      return node.text || '';
    }

    if (node.type === 'heading') {
      const level = node.attrs?.level;
      if (level === 1) result.h1Count++;
      if (level === 2) result.h2Count++;
      if (level === 3) result.h3Count++;
    }

    if (node.type === 'link' || (node.marks && node.marks.some((m: any) => m.type === 'link'))) {
      const linkMark = node.marks?.find((m: any) => m.type === 'link');
      const href = linkMark?.attrs?.href || node.attrs?.href || '';
      
      if (href) {
        // Check if internal or external
        const isInternal = href.startsWith('/') || 
          href.includes('quantifier.ai') || 
          (baseUrl && href.includes(baseUrl));
        
        if (isInternal) {
          result.internalLinks++;
        } else if (href.startsWith('http')) {
          result.externalLinks++;
        }
      }
    }

    if (node.content) {
      for (const child of node.content) {
        text += extractText(child, depth + 1) + ' ';
      }
    }

    return text;
  };

  result.plainText = extractText(bodyRich).trim();
  result.wordCount = result.plainText.split(/\s+/).filter(Boolean).length;

  return result;
}

function checkKeywordInText(text: string, keyword: string): boolean {
  if (!keyword) return false;
  const normalizedText = text.toLowerCase();
  const normalizedKeyword = keyword.toLowerCase();
  return normalizedText.includes(normalizedKeyword);
}

export function useSeoAnalysis(
  data: ContentData,
  contentType: 'post' | 'story' = 'post',
  thresholds: SeoThresholds = DEFAULT_THRESHOLDS
): SeoAnalysisResult {
  return useMemo(() => {
    const passed: SeoCheckResult[] = [];
    const failed: SeoCheckResult[] = [];

    const bodyAnalysis = analyzeBodyRich(data.bodyRich);
    const minWords = contentType === 'post' ? thresholds.minWordsBlog : thresholds.minWordsStory;

    // Helper function to add result
    const addResult = (rule: SeoRule, isPassed: boolean, message: string, currentValue?: string | number, expectedValue?: string) => {
      const result: SeoCheckResult = { rule, passed: isPassed, message, currentValue, expectedValue };
      if (isPassed) {
        passed.push(result);
      } else {
        failed.push(result);
      }
    };

    // ===== ON-PAGE RULES =====

    // SEO Title check
    const seoTitle = data.metaTitle || data.title || '';
    const titleLength = seoTitle.length;
    const titleOk = titleLength >= thresholds.titleMin && titleLength <= thresholds.titleMax;
    addResult(
      ON_PAGE_RULES.find(r => r.id === 'seo-title-set')!,
      titleOk,
      titleOk 
        ? `SEO Title ma ${titleLength} znaków (idealne: ${thresholds.titleMin}-${thresholds.titleMax})`
        : `SEO Title ma ${titleLength} znaków (zalecane: ${thresholds.titleMin}-${thresholds.titleMax})`,
      titleLength,
      `${thresholds.titleMin}-${thresholds.titleMax}`
    );

    // Meta description check
    const metaDesc = data.metaDesc || data.excerpt || '';
    const descLength = metaDesc.length;
    const descOk = descLength >= thresholds.descriptionMin && descLength <= thresholds.descriptionMax;
    addResult(
      ON_PAGE_RULES.find(r => r.id === 'meta-description-set')!,
      descOk,
      descOk 
        ? `Meta description ma ${descLength} znaków (idealne)`
        : `Meta description ma ${descLength} znaków (zalecane: ${thresholds.descriptionMin}-${thresholds.descriptionMax})`,
      descLength,
      `${thresholds.descriptionMin}-${thresholds.descriptionMax}`
    );

    // Focus keyword check
    const hasKeyword = !!data.focusKeyword?.trim();
    addResult(
      ON_PAGE_RULES.find(r => r.id === 'focus-keyword-set')!,
      hasKeyword,
      hasKeyword ? `Focus keyword: "${data.focusKeyword}"` : 'Brak focus keyword',
      data.focusKeyword || ''
    );

    // Keyword in title
    const keywordInTitle = hasKeyword && checkKeywordInText(data.title || '', data.focusKeyword!);
    addResult(
      ON_PAGE_RULES.find(r => r.id === 'keyword-in-title')!,
      keywordInTitle || !hasKeyword,
      keywordInTitle 
        ? 'Keyword występuje w tytule' 
        : hasKeyword 
          ? 'Keyword nie występuje w tytule' 
          : 'Ustaw najpierw focus keyword',
      data.title
    );

    // Keyword in intro (first 100 words)
    const introText = bodyAnalysis.plainText.split(/\s+/).slice(0, 100).join(' ');
    const keywordInIntro = hasKeyword && checkKeywordInText(introText, data.focusKeyword!);
    addResult(
      ON_PAGE_RULES.find(r => r.id === 'keyword-in-intro')!,
      keywordInIntro || !hasKeyword,
      keywordInIntro 
        ? 'Keyword występuje w pierwszych 100 słowach' 
        : hasKeyword 
          ? 'Keyword nie występuje w pierwszych 100 słowach' 
          : 'Ustaw najpierw focus keyword'
    );

    // Single H1
    // Note: Title is usually H1, so we check body for extra H1s
    const h1Ok = bodyAnalysis.h1Count <= 1;
    addResult(
      ON_PAGE_RULES.find(r => r.id === 'single-h1')!,
      h1Ok,
      h1Ok 
        ? 'Poprawna struktura nagłówków H1' 
        : `Znaleziono ${bodyAnalysis.h1Count} nagłówków H1 w treści (powinno być max 1)`,
      bodyAnalysis.h1Count,
      '0-1'
    );

    // H2 headers
    const h2Ok = bodyAnalysis.h2Count >= thresholds.minH2Headers;
    addResult(
      ON_PAGE_RULES.find(r => r.id === 'h2-headers-present')!,
      h2Ok,
      h2Ok 
        ? `${bodyAnalysis.h2Count} nagłówków H2 w treści` 
        : `Tylko ${bodyAnalysis.h2Count} nagłówków H2 (minimum ${thresholds.minH2Headers})`,
      bodyAnalysis.h2Count,
      `≥${thresholds.minH2Headers}`
    );

    // Content length
    const contentOk = bodyAnalysis.wordCount >= minWords;
    addResult(
      ON_PAGE_RULES.find(r => r.id === 'content-length')!,
      contentOk,
      contentOk 
        ? `${bodyAnalysis.wordCount} słów w treści (minimum: ${minWords})` 
        : `Tylko ${bodyAnalysis.wordCount} słów (minimum: ${minWords})`,
      bodyAnalysis.wordCount,
      `≥${minWords}`
    );

    // Internal links
    const internalLinksOk = bodyAnalysis.internalLinks >= thresholds.minInternalLinks;
    addResult(
      ON_PAGE_RULES.find(r => r.id === 'internal-links')!,
      internalLinksOk,
      internalLinksOk 
        ? `${bodyAnalysis.internalLinks} linków wewnętrznych` 
        : `Tylko ${bodyAnalysis.internalLinks} linków wewnętrznych (minimum ${thresholds.minInternalLinks})`,
      bodyAnalysis.internalLinks,
      `≥${thresholds.minInternalLinks}`
    );

    // External links
    const externalLinksOk = bodyAnalysis.externalLinks >= thresholds.minExternalLinks;
    addResult(
      ON_PAGE_RULES.find(r => r.id === 'external-links')!,
      externalLinksOk,
      externalLinksOk 
        ? `${bodyAnalysis.externalLinks} linków zewnętrznych` 
        : `Brak linków zewnętrznych (zalecany minimum ${thresholds.minExternalLinks})`,
      bodyAnalysis.externalLinks,
      `≥${thresholds.minExternalLinks}`
    );

    // Featured image alt
    const hasImageAlt = !!data.featuredImageAlt?.trim();
    const hasImage = !!data.featuredImageUrl;
    addResult(
      ON_PAGE_RULES.find(r => r.id === 'featured-image-alt')!,
      hasImageAlt || !hasImage,
      hasImageAlt 
        ? 'Obrazek wyróżniający ma tekst ALT' 
        : hasImage 
          ? 'Brak tekstu ALT dla obrazka wyróżniającego' 
          : 'Brak obrazka wyróżniającego'
    );

    // Thin content
    const notThin = bodyAnalysis.wordCount >= thresholds.thinContentThreshold;
    addResult(
      ON_PAGE_RULES.find(r => r.id === 'no-thin-content')!,
      notThin,
      notThin 
        ? 'Treść ma wystarczającą długość' 
        : `UWAGA: Treść ma tylko ${bodyAnalysis.wordCount} słów (thin content < ${thresholds.thinContentThreshold})`,
      bodyAnalysis.wordCount,
      `≥${thresholds.thinContentThreshold}`
    );

    // ===== TECHNICAL RULES =====

    // Canonical
    const canonicalOk = !data.canonicalUrl || data.canonicalUrl.startsWith('http');
    addResult(
      TECHNICAL_RULES.find(r => r.id === 'canonical-correct')!,
      canonicalOk,
      data.canonicalUrl 
        ? `Custom canonical: ${data.canonicalUrl}` 
        : 'Canonical URL domyślny (poprawny)'
    );

    // Robots
    const isPublished = data.status === 'published';
    const robotsOk = isPublished ? (data.robotsIndex !== false) : true;
    addResult(
      TECHNICAL_RULES.find(r => r.id === 'robots-correct')!,
      robotsOk,
      robotsOk 
        ? `Robots: ${data.robotsIndex !== false ? 'index' : 'noindex'}, ${data.robotsFollow !== false ? 'follow' : 'nofollow'}` 
        : 'UWAGA: Opublikowany artykuł ma noindex!'
    );

    // OG Tags
    const hasOgTitle = !!(data.ogTitle || data.metaTitle || data.title);
    const hasOgDesc = !!(data.ogDescription || data.metaDesc || data.excerpt);
    const hasOgImage = !!(data.ogImage || data.featuredImageUrl);
    const ogComplete = hasOgTitle && hasOgDesc && hasOgImage;
    addResult(
      TECHNICAL_RULES.find(r => r.id === 'og-tags-complete')!,
      ogComplete,
      ogComplete 
        ? 'Wszystkie OG tags ustawione' 
        : `Brakuje: ${[!hasOgTitle && 'og:title', !hasOgDesc && 'og:description', !hasOgImage && 'og:image'].filter(Boolean).join(', ')}`
    );

    // Twitter Tags
    const hasTwitterTitle = !!(data.twitterTitle || data.ogTitle || data.metaTitle || data.title);
    const hasTwitterImage = !!(data.twitterImage || data.ogImage || data.featuredImageUrl);
    const twitterComplete = hasTwitterTitle && hasTwitterImage;
    addResult(
      TECHNICAL_RULES.find(r => r.id === 'twitter-tags-complete')!,
      twitterComplete,
      twitterComplete 
        ? 'Twitter Cards skonfigurowane' 
        : `Brakuje: ${[!hasTwitterTitle && 'twitter:title', !hasTwitterImage && 'twitter:image'].filter(Boolean).join(', ')}`
    );

    // Schema
    const schemaOk = !!data.schemaType;
    addResult(
      TECHNICAL_RULES.find(r => r.id === 'schema-valid')!,
      schemaOk,
      schemaOk 
        ? `Schema type: ${data.schemaType}` 
        : 'Schema type nie ustawiony'
    );

    // Sitemap
    const inSitemap = data.status === 'published';
    addResult(
      TECHNICAL_RULES.find(r => r.id === 'sitemap-included')!,
      inSitemap,
      inSitemap 
        ? 'Artykuł będzie w sitemap' 
        : 'Artykuł nie jest opublikowany - nie będzie w sitemap'
    );

    // Unique title
    const titleExists = data.existingTitles?.some(
      t => t.toLowerCase() === seoTitle.toLowerCase()
    );
    addResult(
      TECHNICAL_RULES.find(r => r.id === 'unique-title')!,
      !titleExists,
      titleExists 
        ? 'UWAGA: Ten SEO title już istnieje w innym artykule' 
        : 'SEO title jest unikalny'
    );

    // Calculate score
    const score = passed.reduce((sum, r) => sum + r.rule.points, 0);
    const status = getScoreStatus(score);

    // Sort failed by severity
    const severityOrder = { critical: 0, warning: 1, info: 2 };
    failed.sort((a, b) => severityOrder[a.rule.severity] - severityOrder[b.rule.severity]);

    return {
      score,
      maxScore: MAX_SCORE,
      status,
      passed,
      failed,
    };
  }, [data, contentType, thresholds]);
}

export type { ContentData, BodyAnalysis };
