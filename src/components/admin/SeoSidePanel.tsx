import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { SeoToolkitPanel, SeoFieldsData } from '@/components/seo/SeoToolkitPanel';
import { useSeoAnalysis, ContentData } from '@/hooks/useSeoAnalysis';
import { useSeoSettings } from '@/hooks/useSeoSettings';
import { getScoreColor, getScoreBgColor, getScoreStatus } from '@/lib/seo-rules';
import { cn } from '@/lib/utils';

interface SeoSidePanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // Content data
  title: string;
  slug: string;
  excerpt?: string;
  metaTitle?: string;
  metaDesc?: string;
  bodyRich?: any;
  featuredImageUrl?: string;
  status?: string;
  lang: string;
  contentType: 'post' | 'story';
  // SEO fields
  seoFields: SeoFieldsData;
  onUpdateSeoFields: (fields: Partial<SeoFieldsData>) => void;
  existingTitles?: string[];
}

export function SeoSidePanel({
  open,
  onOpenChange,
  title,
  slug,
  excerpt,
  metaTitle,
  metaDesc,
  bodyRich,
  featuredImageUrl,
  status,
  lang,
  contentType,
  seoFields,
  onUpdateSeoFields,
  existingTitles,
}: SeoSidePanelProps) {
  const { settings } = useSeoSettings();

  // Prepare data for analysis to calculate score for header
  const analysisData: ContentData = {
    title,
    slug,
    excerpt,
    metaTitle: metaTitle || title,
    metaDesc: metaDesc || excerpt,
    focusKeyword: seoFields.focusKeyword,
    canonicalUrl: seoFields.canonicalUrl,
    robotsIndex: seoFields.robotsIndex,
    robotsFollow: seoFields.robotsFollow,
    ogTitle: seoFields.ogTitle,
    ogDescription: seoFields.ogDescription,
    ogImage: seoFields.ogImage || featuredImageUrl,
    twitterTitle: seoFields.twitterTitle,
    twitterImage: seoFields.twitterImage,
    twitterCardType: seoFields.twitterCardType,
    schemaType: seoFields.schemaType || (contentType === 'post' ? 'BlogPosting' : 'Article'),
    bodyRich,
    featuredImageUrl,
    featuredImageAlt: seoFields.featuredImageAlt,
    status,
    existingTitles,
  };

  const analysis = useSeoAnalysis(analysisData, contentType, {
    titleMin: settings.titleMin,
    titleMax: settings.titleMax,
    descriptionMin: settings.descriptionMin,
    descriptionMax: settings.descriptionMax,
    minWordsBlog: settings.minWordsBlog,
    minWordsStory: settings.minWordsStory,
    thinContentThreshold: 300,
    minInternalLinks: 2,
    minExternalLinks: 1,
    minH2Headers: 2,
  });

  const scoreStatus = getScoreStatus(analysis.score);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-[480px] sm:max-w-[480px] p-0 flex flex-col"
      >
        <SheetHeader className="px-6 py-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <SheetTitle>SEO Toolkit</SheetTitle>
            <Badge 
              variant="outline"
              className={cn(
                "text-sm px-3 py-1",
                getScoreBgColor(scoreStatus),
                getScoreColor(scoreStatus)
              )}
            >
              {analysis.score}/{analysis.maxScore}
            </Badge>
          </div>
        </SheetHeader>
        
        <ScrollArea className="flex-1">
          <div className="p-6">
            <SeoToolkitPanel
              title={title}
              slug={slug}
              excerpt={excerpt}
              metaTitle={metaTitle}
              metaDesc={metaDesc}
              bodyRich={bodyRich}
              featuredImageUrl={featuredImageUrl}
              status={status}
              lang={lang}
              contentType={contentType}
              seoFields={seoFields}
              onUpdateSeoFields={onUpdateSeoFields}
              existingTitles={existingTitles}
            />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

// Helper to get SEO score for button display
export function useSeoScore(
  contentData: {
    title: string;
    slug: string;
    excerpt?: string;
    metaTitle?: string;
    metaDesc?: string;
    bodyRich?: any;
    featuredImageUrl?: string;
    status?: string;
  },
  seoFields: SeoFieldsData,
  contentType: 'post' | 'story'
) {
  const { settings } = useSeoSettings();

  const analysisData: ContentData = {
    ...contentData,
    metaTitle: contentData.metaTitle || contentData.title,
    metaDesc: contentData.metaDesc || contentData.excerpt,
    focusKeyword: seoFields.focusKeyword,
    canonicalUrl: seoFields.canonicalUrl,
    robotsIndex: seoFields.robotsIndex,
    robotsFollow: seoFields.robotsFollow,
    ogTitle: seoFields.ogTitle,
    ogDescription: seoFields.ogDescription,
    ogImage: seoFields.ogImage || contentData.featuredImageUrl,
    twitterTitle: seoFields.twitterTitle,
    twitterImage: seoFields.twitterImage,
    twitterCardType: seoFields.twitterCardType,
    schemaType: seoFields.schemaType || (contentType === 'post' ? 'BlogPosting' : 'Article'),
    featuredImageAlt: seoFields.featuredImageAlt,
  };

  const analysis = useSeoAnalysis(analysisData, contentType, {
    titleMin: settings.titleMin,
    titleMax: settings.titleMax,
    descriptionMin: settings.descriptionMin,
    descriptionMax: settings.descriptionMax,
    minWordsBlog: settings.minWordsBlog,
    minWordsStory: settings.minWordsStory,
    thinContentThreshold: 300,
    minInternalLinks: 2,
    minExternalLinks: 1,
    minH2Headers: 2,
  });

  return {
    score: analysis.score,
    maxScore: analysis.maxScore,
    status: getScoreStatus(analysis.score),
  };
}
