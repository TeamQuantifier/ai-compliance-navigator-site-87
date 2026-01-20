import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SerpPreview } from './SerpPreview';
import { SocialPreviewPanel } from './SocialPreview';
import { SeoChecklist } from './SeoChecklist';
import { useSeoAnalysis, ContentData } from '@/hooks/useSeoAnalysis';
import { useSeoSettings } from '@/hooks/useSeoSettings';
import { getScoreColor, getScoreBgColor, getScoreStatus } from '@/lib/seo-rules';
import { cn } from '@/lib/utils';
import { 
  Search, 
  Share2, 
  CheckSquare, 
  Settings, 
  Code2,
  Sparkles,
  Loader2 
} from 'lucide-react';

export interface SeoFieldsData {
  // Basic
  focusKeyword?: string;
  canonicalUrl?: string;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  
  // Social
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCardType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  
  // Schema
  schemaType?: string;
  schemaJsonOverride?: any;
  breadcrumbsEnabled?: boolean;
  
  // Image
  featuredImageAlt?: string;
}

interface SeoToolkitPanelProps {
  // Content data from the editor
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
  
  // SEO-specific fields
  seoFields: SeoFieldsData;
  onUpdateSeoFields: (fields: Partial<SeoFieldsData>) => void;
  
  // For duplicate checking
  existingTitles?: string[];
}

export function SeoToolkitPanel({
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
}: SeoToolkitPanelProps) {
  const { settings } = useSeoSettings();
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('serp');

  // Prepare data for analysis
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

  // Build preview URL
  const baseUrl = settings.brandUrl || 'https://quantifier.ai';
  const contentPath = contentType === 'post' ? 'blog' : 'success-stories';
  const previewUrl = `${baseUrl}/${lang}/${contentPath}/${slug || 'slug'}`;

  // Auto-fix handlers (placeholder - will be connected to AI edge function)
  const handleAutoFix = async (action: string) => {
    setIsGenerating(true);
    try {
      // TODO: Call AI edge function for generation
      console.log('Auto-fix action:', action);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Score Badge Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">SEO Toolkit</h3>
        <Badge 
          variant="outline"
          className={cn(
            "text-sm px-3 py-1",
            getScoreBgColor(scoreStatus),
            getScoreColor(scoreStatus)
          )}
        >
          Score: {analysis.score}/{analysis.maxScore}
        </Badge>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="serp" className="text-xs gap-1">
            <Search className="h-3 w-3" />
            SERP
          </TabsTrigger>
          <TabsTrigger value="social" className="text-xs gap-1">
            <Share2 className="h-3 w-3" />
            Social
          </TabsTrigger>
          <TabsTrigger value="checklist" className="text-xs gap-1">
            <CheckSquare className="h-3 w-3" />
            Checklist
          </TabsTrigger>
          <TabsTrigger value="meta" className="text-xs gap-1">
            <Settings className="h-3 w-3" />
            Meta
          </TabsTrigger>
          <TabsTrigger value="schema" className="text-xs gap-1">
            <Code2 className="h-3 w-3" />
            Schema
          </TabsTrigger>
        </TabsList>

        {/* SERP Preview */}
        <TabsContent value="serp" className="mt-4">
          <SerpPreview
            title={metaTitle || title || ''}
            url={previewUrl}
            description={metaDesc || excerpt || ''}
            titleMaxLength={settings.titleMax}
            descriptionMaxLength={settings.descriptionMax}
          />
        </TabsContent>

        {/* Social Preview */}
        <TabsContent value="social" className="mt-4">
          <SocialPreviewPanel
            title={title}
            description={metaDesc || excerpt || ''}
            ogTitle={seoFields.ogTitle}
            ogDescription={seoFields.ogDescription}
            ogImage={seoFields.ogImage || featuredImageUrl}
            twitterTitle={seoFields.twitterTitle}
            twitterDescription={seoFields.twitterDescription}
            twitterImage={seoFields.twitterImage}
            siteUrl={baseUrl}
          />
        </TabsContent>

        {/* Checklist */}
        <TabsContent value="checklist" className="mt-4">
          <SeoChecklist 
            analysis={analysis}
            onAutoFix={handleAutoFix}
            isGenerating={isGenerating}
          />
        </TabsContent>

        {/* Meta & Indexing */}
        <TabsContent value="meta" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Focus Keyword</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="focus-keyword">Główna fraza kluczowa</Label>
                <Input
                  id="focus-keyword"
                  value={seoFields.focusKeyword || ''}
                  onChange={(e) => onUpdateSeoFields({ focusKeyword: e.target.value })}
                  placeholder="np. compliance software, zarządzanie ryzykiem"
                />
                <p className="text-xs text-muted-foreground">
                  Fraza na którą optymalizujesz ten artykuł
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Canonical & Robots</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="canonical">Canonical URL (opcjonalne)</Label>
                <Input
                  id="canonical"
                  value={seoFields.canonicalUrl || ''}
                  onChange={(e) => onUpdateSeoFields({ canonicalUrl: e.target.value })}
                  placeholder="Pozostaw puste dla domyślnego URL"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Index</Label>
                  <p className="text-xs text-muted-foreground">
                    Pozwól wyszukiwarkom indeksować stronę
                  </p>
                </div>
                <Switch
                  checked={seoFields.robotsIndex !== false}
                  onCheckedChange={(checked) => onUpdateSeoFields({ robotsIndex: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Follow</Label>
                  <p className="text-xs text-muted-foreground">
                    Pozwól wyszukiwarkom śledzić linki
                  </p>
                </div>
                <Switch
                  checked={seoFields.robotsFollow !== false}
                  onCheckedChange={(checked) => onUpdateSeoFields({ robotsFollow: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Open Graph</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="og-title">OG Title (opcjonalne)</Label>
                <Input
                  id="og-title"
                  value={seoFields.ogTitle || ''}
                  onChange={(e) => onUpdateSeoFields({ ogTitle: e.target.value })}
                  placeholder="Domyślnie: tytuł artykułu"
                  maxLength={95}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="og-desc">OG Description (opcjonalne)</Label>
                <Textarea
                  id="og-desc"
                  value={seoFields.ogDescription || ''}
                  onChange={(e) => onUpdateSeoFields({ ogDescription: e.target.value })}
                  placeholder="Domyślnie: meta description"
                  rows={2}
                  maxLength={300}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="og-image">OG Image URL (opcjonalne)</Label>
                <Input
                  id="og-image"
                  value={seoFields.ogImage || ''}
                  onChange={(e) => onUpdateSeoFields({ ogImage: e.target.value })}
                  placeholder="Domyślnie: featured image"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Twitter Card</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="twitter-card">Card Type</Label>
                <Select
                  value={seoFields.twitterCardType || 'summary_large_image'}
                  onValueChange={(value) => onUpdateSeoFields({ twitterCardType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary_large_image">Large Image</SelectItem>
                    <SelectItem value="summary">Summary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter-title">Twitter Title (opcjonalne)</Label>
                <Input
                  id="twitter-title"
                  value={seoFields.twitterTitle || ''}
                  onChange={(e) => onUpdateSeoFields({ twitterTitle: e.target.value })}
                  placeholder="Domyślnie: OG title"
                  maxLength={70}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Obrazek wyróżniający</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="image-alt">Tekst alternatywny (ALT)</Label>
                <Input
                  id="image-alt"
                  value={seoFields.featuredImageAlt || ''}
                  onChange={(e) => onUpdateSeoFields({ featuredImageAlt: e.target.value })}
                  placeholder="Opisz zawartość obrazka"
                />
                <p className="text-xs text-muted-foreground">
                  Ważne dla SEO i dostępności
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schema */}
        <TabsContent value="schema" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Structured Data (JSON-LD)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="schema-type">Schema Type</Label>
                <Select
                  value={seoFields.schemaType || (contentType === 'post' ? 'BlogPosting' : 'Article')}
                  onValueChange={(value) => onUpdateSeoFields({ schemaType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Article">Article</SelectItem>
                    <SelectItem value="BlogPosting">BlogPosting</SelectItem>
                    <SelectItem value="NewsArticle">NewsArticle</SelectItem>
                    {contentType === 'story' && (
                      <SelectItem value="CaseStudy">CaseStudy (custom)</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Breadcrumbs Schema</Label>
                  <p className="text-xs text-muted-foreground">
                    Dodaj BreadcrumbList do schema
                  </p>
                </div>
                <Switch
                  checked={seoFields.breadcrumbsEnabled !== false}
                  onCheckedChange={(checked) => onUpdateSeoFields({ breadcrumbsEnabled: checked })}
                />
              </div>

              {/* Schema Preview */}
              <div className="space-y-2">
                <Label>Podgląd Schema</Label>
                <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto max-h-48">
                  {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": seoFields.schemaType || (contentType === 'post' ? 'BlogPosting' : 'Article'),
                    "headline": title,
                    "description": metaDesc || excerpt,
                    "image": featuredImageUrl || settings.defaultOgImage,
                    "datePublished": new Date().toISOString(),
                    "publisher": {
                      "@type": "Organization",
                      "name": settings.brandName,
                      "url": settings.brandUrl,
                    }
                  }, null, 2)}
                </pre>
                <p className="text-xs text-muted-foreground">
                  Schema JSON-LD będzie automatycznie wygenerowane na stronie
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
