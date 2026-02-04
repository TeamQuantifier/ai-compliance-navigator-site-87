import { 
  SeoAnalysisResult, 
  SeoCheckResult, 
  SeoThresholds,
  DEFAULT_THRESHOLDS,
  ON_PAGE_RULES,
  TECHNICAL_RULES,
  MAX_SCORE,
  getScoreStatus
} from './seo-rules';
import { Json } from '@/integrations/supabase/types';

export interface SeoContentData {
  title: string;
  slug: string;
  meta_title?: string | null;
  meta_desc?: string | null;
  focus_keyword?: string | null;
  featured_image_url?: string | null;
  featured_image_alt?: string | null;
  canonical_url?: string | null;
  robots_index?: boolean | null;
  robots_follow?: boolean | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image_url?: string | null;
  twitter_title?: string | null;
  twitter_description?: string | null;
  twitter_image_url?: string | null;
  twitter_card_type?: string | null;
  schema_type?: string | null;
  body_rich?: Json;
  status?: string;
}

interface BodyAnalysis {
  wordCount: number;
  h1Count: number;
  h2Count: number;
  h3Count: number;
  internalLinkCount: number;
  externalLinkCount: number;
  hasKeywordInIntro: boolean;
}

function analyzeBodyRich(bodyRich: Json | undefined, keyword: string | null): BodyAnalysis {
  const result: BodyAnalysis = {
    wordCount: 0,
    h1Count: 0,
    h2Count: 0,
    h3Count: 0,
    internalLinkCount: 0,
    externalLinkCount: 0,
    hasKeywordInIntro: false
  };

  if (!bodyRich || typeof bodyRich !== 'object') return result;

  const doc = bodyRich as { type?: string; content?: unknown[] };
  if (doc.type !== 'doc' || !Array.isArray(doc.content)) return result;

  let allText = '';
  let introText = '';
  let isIntro = true;

  const extractText = (node: unknown): string => {
    if (!node || typeof node !== 'object') return '';
    const n = node as { type?: string; text?: string; content?: unknown[]; attrs?: { href?: string } };
    
    if (n.type === 'text' && n.text) return n.text;
    if (n.content && Array.isArray(n.content)) {
      return n.content.map(extractText).join('');
    }
    return '';
  };

  const countNodes = (node: unknown): void => {
    if (!node || typeof node !== 'object') return;
    const n = node as { type?: string; attrs?: { level?: number; href?: string }; content?: unknown[]; marks?: Array<{ type: string; attrs?: { href?: string } }> };

    if (n.type === 'heading') {
      const level = n.attrs?.level;
      if (level === 1) result.h1Count++;
      else if (level === 2) { result.h2Count++; isIntro = false; }
      else if (level === 3) result.h3Count++;
    }

    if (n.type === 'text' && n.marks) {
      n.marks.forEach(mark => {
        if (mark.type === 'link' && mark.attrs?.href) {
          const href = mark.attrs.href;
          if (href.startsWith('/') || href.includes('compliancesumo')) {
            result.internalLinkCount++;
          } else if (href.startsWith('http')) {
            result.externalLinkCount++;
          }
        }
      });
    }

    const text = extractText(node);
    allText += text + ' ';
    if (isIntro) introText += text + ' ';

    if (n.content && Array.isArray(n.content)) {
      n.content.forEach(countNodes);
    }
  };

  doc.content.forEach(countNodes);
  
  result.wordCount = allText.trim().split(/\s+/).filter(w => w.length > 0).length;
  
  if (keyword) {
    const kw = keyword.toLowerCase();
    result.hasKeywordInIntro = introText.toLowerCase().includes(kw);
  }

  return result;
}

export function analyzeSeoContent(
  data: SeoContentData,
  contentType: 'post' | 'story' = 'post',
  thresholds: SeoThresholds = DEFAULT_THRESHOLDS,
  allTitles: string[] = []
): SeoAnalysisResult {
  const passed: SeoCheckResult[] = [];
  const failed: SeoCheckResult[] = [];

  const seoTitle = data.meta_title || data.title || '';
  const metaDesc = data.meta_desc || '';
  const keyword = data.focus_keyword || '';
  const bodyAnalysis = analyzeBodyRich(data.body_rich, keyword);

  // Check for duplicate titles
  const titleLower = seoTitle.toLowerCase();
  const duplicateCount = allTitles.filter(t => t.toLowerCase() === titleLower).length;
  const hasDuplicate = duplicateCount > 1;

  // On-page rules
  ON_PAGE_RULES.forEach(rule => {
    let isPassed = false;
    let message = '';
    let currentValue: string | number | undefined;

    switch (rule.id) {
      case 'seo-title-set':
        currentValue = seoTitle.length;
        isPassed = seoTitle.length >= thresholds.titleMin && seoTitle.length <= thresholds.titleMax;
        message = isPassed ? `Title length (${seoTitle.length}) is optimal` : `Title length (${seoTitle.length}) should be ${thresholds.titleMin}-${thresholds.titleMax} chars`;
        break;

      case 'meta-description-set':
        currentValue = metaDesc.length;
        isPassed = metaDesc.length >= thresholds.descriptionMin && metaDesc.length <= thresholds.descriptionMax;
        message = isPassed ? `Meta description (${metaDesc.length}) is optimal` : `Meta description (${metaDesc.length}) should be ${thresholds.descriptionMin}-${thresholds.descriptionMax} chars`;
        break;

      case 'focus-keyword-set':
        isPassed = keyword.length > 0;
        message = isPassed ? 'Focus keyword is set' : 'No focus keyword defined';
        break;

      case 'keyword-in-title':
        const keywordWords = keyword.toLowerCase().split(/\s+/).filter(w => w.length > 0);
        isPassed = !keyword || keywordWords.every(word => seoTitle.toLowerCase().includes(word));
        message = isPassed ? 'Keyword found in title' : 'Add focus keyword to SEO title';
        break;

      case 'keyword-in-intro':
        isPassed = !keyword || bodyAnalysis.hasKeywordInIntro;
        message = isPassed ? 'Keyword in first paragraph' : 'Add keyword to introduction';
        break;

      case 'single-h1':
        currentValue = bodyAnalysis.h1Count;
        isPassed = bodyAnalysis.h1Count === 1;
        message = bodyAnalysis.h1Count === 1 ? 'Single H1 present' : bodyAnalysis.h1Count === 0 ? 'No H1 heading found' : `Multiple H1s found (${bodyAnalysis.h1Count})`;
        break;

      case 'h2-headers-present':
        currentValue = bodyAnalysis.h2Count;
        isPassed = bodyAnalysis.h2Count >= thresholds.minH2Headers;
        message = isPassed ? `${bodyAnalysis.h2Count} H2 headings` : `Only ${bodyAnalysis.h2Count} H2 headings (min ${thresholds.minH2Headers})`;
        break;

      case 'content-length':
        const minWords = contentType === 'story' ? thresholds.minWordsStory : thresholds.minWordsBlog;
        currentValue = bodyAnalysis.wordCount;
        isPassed = bodyAnalysis.wordCount >= minWords;
        message = isPassed ? `${bodyAnalysis.wordCount} words` : `Only ${bodyAnalysis.wordCount} words (min ${minWords})`;
        break;

      case 'internal-links':
        currentValue = bodyAnalysis.internalLinkCount;
        isPassed = bodyAnalysis.internalLinkCount >= thresholds.minInternalLinks;
        message = isPassed ? `${bodyAnalysis.internalLinkCount} internal links` : `Only ${bodyAnalysis.internalLinkCount} internal links (min ${thresholds.minInternalLinks})`;
        break;

      case 'external-links':
        currentValue = bodyAnalysis.externalLinkCount;
        isPassed = bodyAnalysis.externalLinkCount >= thresholds.minExternalLinks;
        message = isPassed ? `${bodyAnalysis.externalLinkCount} external links` : `No external links found (min ${thresholds.minExternalLinks})`;
        break;

      case 'featured-image-alt':
        isPassed = !data.featured_image_url || !!data.featured_image_alt;
        message = isPassed ? 'Featured image has alt text' : 'Missing alt text for featured image';
        break;

      case 'no-thin-content':
        currentValue = bodyAnalysis.wordCount;
        isPassed = bodyAnalysis.wordCount >= thresholds.thinContentThreshold;
        message = isPassed ? 'Content is substantial' : `Thin content (${bodyAnalysis.wordCount} words, min ${thresholds.thinContentThreshold})`;
        break;
    }

    if (rule.id.startsWith('seo-title') || rule.id.startsWith('meta-desc') || rule.id.startsWith('focus-keyword') || 
        rule.id.startsWith('keyword') || rule.id.startsWith('single-h1') || rule.id.startsWith('h2-') || 
        rule.id.startsWith('content-') || rule.id.startsWith('internal-') || rule.id.startsWith('external-') ||
        rule.id.startsWith('featured-') || rule.id.startsWith('no-thin')) {
      const result: SeoCheckResult = { rule, passed: isPassed, message, currentValue };
      if (isPassed) passed.push(result);
      else failed.push(result);
    }
  });

  // Technical rules
  TECHNICAL_RULES.forEach(rule => {
    let isPassed = false;
    let message = '';

    switch (rule.id) {
      case 'canonical-correct':
        isPassed = !data.canonical_url || data.canonical_url.startsWith('http');
        message = isPassed ? 'Valid canonical URL' : 'Invalid canonical URL format';
        break;

      case 'robots-correct':
        isPassed = data.robots_index !== false;
        message = isPassed ? 'Page is indexable' : 'Page set to noindex';
        break;

      case 'og-tags-complete':
        isPassed = !!(data.og_title && data.og_description);
        message = isPassed ? 'OG tags complete' : 'Missing OG title or description';
        break;

      case 'twitter-tags-complete':
        isPassed = !!(data.twitter_title || data.og_title);
        message = isPassed ? 'Twitter tags present' : 'Missing Twitter card data';
        break;

      case 'schema-valid':
        isPassed = !!data.schema_type;
        message = isPassed ? `Schema: ${data.schema_type}` : 'No schema type selected';
        break;

      case 'sitemap-included':
        isPassed = data.status === 'published';
        message = isPassed ? 'Included in sitemap' : 'Draft not in sitemap';
        break;

      case 'unique-title':
        isPassed = !hasDuplicate;
        message = isPassed ? 'Unique SEO title' : 'Duplicate title detected';
        break;
    }

    const result: SeoCheckResult = { rule, passed: isPassed, message };
    if (isPassed) passed.push(result);
    else failed.push(result);
  });

  // Calculate score
  const earnedPoints = passed.reduce((sum, r) => sum + r.rule.points, 0);
  const score = Math.round((earnedPoints / MAX_SCORE) * 100);
  const status = getScoreStatus(score);

  return { score, maxScore: MAX_SCORE, status, passed, failed };
}

// Get quick issue summary
export function getIssueSummary(analysis: SeoAnalysisResult): { critical: number; warning: number; info: number } {
  let critical = 0;
  let warning = 0;
  let info = 0;

  analysis.failed.forEach(check => {
    if (check.rule.severity === 'critical') critical++;
    else if (check.rule.severity === 'warning') warning++;
    else info++;
  });

  return { critical, warning, info };
}
