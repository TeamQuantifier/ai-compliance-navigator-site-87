import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LanguageTabs, type Language, LANGUAGE_CONFIG } from '@/components/admin/LanguageTabs';
import { useMultiLangStory, type StoryVersion } from '@/hooks/useMultiLangStory';
import { SeoSidePanel, useSeoScore } from '@/components/admin/SeoSidePanel';
import { SeoFieldsData } from '@/components/seo/SeoToolkitPanel';
import RichTextEditor from '@/components/editor/RichTextEditor';
import { toast } from 'sonner';
import { ArrowLeft, Save, Upload, X, Copy, Loader2, Search } from 'lucide-react';
import { getScoreColor, getScoreBgColor } from '@/lib/seo-rules';
import { cn } from '@/lib/utils';

const StoryEditor = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const isNew = id === 'new';
  const groupIdParam = searchParams.get('group');
  
  const {
    groupId,
    versions,
    isLoading,
    isSaving,
    updateVersion,
    saveAllVersions,
    loadByStoryId,
    hasContent,
    isPublished,
  } = useMultiLangStory(groupIdParam || undefined);

  const [activeLanguage, setActiveLanguage] = useState<Language>('pl');
  const [tagsInput, setTagsInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [seoOpen, setSeoOpen] = useState(false);

  // Load story by ID (legacy route support)
  useEffect(() => {
    if (id && id !== 'new' && !groupIdParam) {
      loadByStoryId(id);
    }
  }, [id, groupIdParam, loadByStoryId]);

  // Check URL param for openSeo (from SEO Audit navigation)
  useEffect(() => {
    if (searchParams.get('openSeo') === 'true') {
      setSeoOpen(true);
    }
  }, [searchParams]);

  // Sync tags input when active language changes
  useEffect(() => {
    setTagsInput(versions[activeLanguage].tags.join(', '));
  }, [activeLanguage, versions]);

  const currentVersion = versions[activeLanguage];

  // Get SEO score for button display
  const seoFields: SeoFieldsData = {
    focusKeyword: currentVersion.focus_keyword,
    canonicalUrl: currentVersion.canonical_url,
    robotsIndex: currentVersion.robots_index,
    robotsFollow: currentVersion.robots_follow,
    ogTitle: currentVersion.og_title,
    ogDescription: currentVersion.og_description,
    ogImage: currentVersion.og_image_url,
    twitterCardType: currentVersion.twitter_card_type,
    twitterTitle: currentVersion.twitter_title,
    twitterDescription: currentVersion.twitter_description,
    twitterImage: currentVersion.twitter_image_url,
    schemaType: currentVersion.schema_type,
    schemaJsonOverride: currentVersion.schema_json_override,
    breadcrumbsEnabled: currentVersion.breadcrumbs_enabled,
    featuredImageAlt: currentVersion.featured_image_alt,
  };

  const { score, status: scoreStatus } = useSeoScore(
    {
      title: currentVersion.title,
      slug: currentVersion.slug,
      excerpt: currentVersion.summary,
      metaTitle: currentVersion.meta_title,
      metaDesc: currentVersion.meta_desc,
      bodyRich: currentVersion.body_rich,
      featuredImageUrl: currentVersion.featured_image_url,
      status: currentVersion.status,
    },
    seoFields,
    'story'
  );

  // Update SEO score in version when it changes
  useEffect(() => {
    if (score !== currentVersion.seo_score) {
      updateVersion(activeLanguage, { seo_score: score });
    }
  }, [score, currentVersion.seo_score, activeLanguage, updateVersion]);

  const handleUpdateSeoFields = (fields: Partial<SeoFieldsData>) => {
    const updates: Partial<StoryVersion> = {};
    
    if ('focusKeyword' in fields) updates.focus_keyword = fields.focusKeyword || '';
    if ('canonicalUrl' in fields) updates.canonical_url = fields.canonicalUrl || '';
    if ('robotsIndex' in fields) updates.robots_index = fields.robotsIndex ?? true;
    if ('robotsFollow' in fields) updates.robots_follow = fields.robotsFollow ?? true;
    if ('ogTitle' in fields) updates.og_title = fields.ogTitle || '';
    if ('ogDescription' in fields) updates.og_description = fields.ogDescription || '';
    if ('ogImage' in fields) updates.og_image_url = fields.ogImage || '';
    if ('twitterCardType' in fields) updates.twitter_card_type = fields.twitterCardType || '';
    if ('twitterTitle' in fields) updates.twitter_title = fields.twitterTitle || '';
    if ('twitterDescription' in fields) updates.twitter_description = fields.twitterDescription || '';
    if ('twitterImage' in fields) updates.twitter_image_url = fields.twitterImage || '';
    if ('schemaType' in fields) updates.schema_type = fields.schemaType || '';
    if ('schemaJsonOverride' in fields) updates.schema_json_override = fields.schemaJsonOverride;
    if ('breadcrumbsEnabled' in fields) updates.breadcrumbs_enabled = fields.breadcrumbsEnabled ?? true;
    if ('featuredImageAlt' in fields) updates.featured_image_alt = fields.featuredImageAlt || '';
    
    updateVersion(activeLanguage, updates);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (value: string) => {
    updateVersion(activeLanguage, {
      title: value,
      slug: currentVersion.slug || generateSlug(value),
    });
  };

  const processTags = () => {
    const newTags = tagsInput
      .split(/[,;]+/)
      .map(t => t.trim())
      .filter(Boolean);
    updateVersion(activeLanguage, { tags: newTags });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Proszę wybrać plik graficzny');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Obrazek jest za duży (max 5MB)');
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('stories-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('stories-images')
        .getPublicUrl(fileName);

      updateVersion(activeLanguage, { featured_image_url: publicUrl });
      toast.success('Obrazek dodany!');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  const copyFromLanguage = (sourceLang: Language) => {
    const source = versions[sourceLang];
    updateVersion(activeLanguage, {
      body_rich: source.body_rich,
      summary: source.summary,
      featured_image_url: source.featured_image_url,
      og_image_url: source.og_image_url,
      logo_url: source.logo_url,
      // Copy client info as it's usually the same
      client_name: source.client_name,
      industry: source.industry,
      country: source.country,
      tags: [...source.tags],
    });
    toast.success(`Skopiowano treść z wersji ${LANGUAGE_CONFIG[sourceLang].label}`);
  };

  const handleSave = async () => {
    if (!currentVersion.title.trim()) {
      toast.error('Tytuł jest wymagany w co najmniej jednej wersji językowej');
      return;
    }

    const savedGroupId = await saveAllVersions();
    if (savedGroupId && isNew) {
      navigate(`/admin/stories/edit?group=${savedGroupId}`, { replace: true });
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-5xl mx-auto flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/admin/stories')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Powrót
          </Button>
          <h1 className="text-3xl font-bold">
            {isNew ? 'Nowe Success Story' : 'Edytuj Success Story'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setSeoOpen(true)}
            className="gap-2"
          >
            <Search className="h-4 w-4" />
            SEO Toolkit
            <Badge 
              variant="outline"
              className={cn(
                "ml-1",
                getScoreBgColor(scoreStatus),
                getScoreColor(scoreStatus)
              )}
            >
              {score}
            </Badge>
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Zapisz wszystkie wersje
          </Button>
        </div>
      </div>

      {/* Language Tabs */}
      <LanguageTabs
        activeLanguage={activeLanguage}
        onLanguageChange={setActiveLanguage}
        hasContent={{
          pl: hasContent('pl'),
          en: hasContent('en'),
          cs: hasContent('cs'),
        }}
        isPublished={{
          pl: isPublished('pl'),
          en: isPublished('en'),
          cs: isPublished('cs'),
        }}
      />

      {/* Copy from other language */}
      {(hasContent('pl') || hasContent('en')) && !hasContent(activeLanguage) && (
        <Card className="bg-muted/50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-4">
              <Copy className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Skopiuj treść z:</span>
              {hasContent('pl') && activeLanguage !== 'pl' && (
                <Button variant="outline" size="sm" onClick={() => copyFromLanguage('pl')}>
                  🇵🇱 Polski
                </Button>
              )}
              {hasContent('en') && activeLanguage !== 'en' && (
                <Button variant="outline" size="sm" onClick={() => copyFromLanguage('en')}>
                  🇬🇧 English
                </Button>
              )}
              {hasContent('cs') && activeLanguage !== 'cs' && (
                <Button variant="outline" size="sm" onClick={() => copyFromLanguage('cs')}>
                  🇨🇿 Čeština
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Form */}
      <div className="grid gap-6">
        {/* Title & Slug */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Tytuł ({LANGUAGE_CONFIG[activeLanguage].label})</Label>
            <Input
              id="title"
              value={currentVersion.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Tytuł success story"
            />
          </div>
          <div>
            <Label htmlFor="slug">Slug URL</Label>
            <Input
              id="slug"
              value={currentVersion.slug}
              onChange={(e) => updateVersion(activeLanguage, { slug: e.target.value })}
              placeholder="url-slug"
            />
            <p className="text-xs text-muted-foreground mt-1">
              /{activeLanguage}/success-stories/{currentVersion.slug || 'slug'}
            </p>
          </div>
        </div>

        {/* Status & Country */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="status">Status</Label>
            <Select 
              value={currentVersion.status} 
              onValueChange={(value: any) => updateVersion(activeLanguage, { status: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="country">Kraj</Label>
            <Input
              id="country"
              value={currentVersion.country}
              onChange={(e) => updateVersion(activeLanguage, { country: e.target.value })}
              placeholder="np. Polska"
            />
          </div>
        </div>

        {/* Client Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informacje o kliencie</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="client_name">Nazwa klienta</Label>
              <Input
                id="client_name"
                value={currentVersion.client_name}
                onChange={(e) => updateVersion(activeLanguage, { client_name: e.target.value })}
                placeholder="Nazwa firmy"
              />
            </div>
            <div>
              <Label htmlFor="industry">Branża</Label>
              <Input
                id="industry"
                value={currentVersion.industry}
                onChange={(e) => updateVersion(activeLanguage, { industry: e.target.value })}
                placeholder="np. E-commerce"
              />
            </div>
            <div>
              <Label htmlFor="logo_url">URL logo</Label>
              <Input
                id="logo_url"
                value={currentVersion.logo_url}
                onChange={(e) => updateVersion(activeLanguage, { logo_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <div>
          <Label htmlFor="summary">Podsumowanie ({LANGUAGE_CONFIG[activeLanguage].label})</Label>
          <Textarea
            id="summary"
            value={currentVersion.summary}
            onChange={(e) => updateVersion(activeLanguage, { summary: e.target.value })}
            placeholder="Krótkie podsumowanie..."
            rows={3}
          />
        </div>

        {/* Featured Image */}
        <div>
          <Label>Główny obrazek (thumbnail)</Label>
          <div className="mt-2">
            {currentVersion.featured_image_url ? (
              <div className="relative inline-block">
                <img 
                  src={currentVersion.featured_image_url} 
                  alt="Thumbnail" 
                  className="max-w-xs rounded-lg shadow-md"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => updateVersion(activeLanguage, { featured_image_url: '' })}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button variant="outline" asChild disabled={uploading}>
                <label htmlFor="featured-image-upload" className="cursor-pointer">
                  {uploading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4 mr-2" />
                  )}
                  Wybierz obrazek
                  <input
                    id="featured-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </Button>
            )}
          </div>
        </div>

        {/* Rich Text Editor */}
        <div>
          <Label>Treść ({LANGUAGE_CONFIG[activeLanguage].label})</Label>
          <RichTextEditor
            content={currentVersion.body_rich}
            onChange={(content) => updateVersion(activeLanguage, { body_rich: content })}
            placeholder="Napisz treść success story..."
          />
        </div>

        {/* Basic SEO Fields */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-base font-medium">SEO Podstawowe</Label>
              <Button variant="link" size="sm" onClick={() => setSeoOpen(true)}>
                Otwórz pełny panel SEO →
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="meta_title">Meta Title</Label>
                <Input
                  id="meta_title"
                  value={currentVersion.meta_title}
                  onChange={(e) => updateVersion(activeLanguage, { meta_title: e.target.value })}
                  placeholder="SEO title"
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {currentVersion.meta_title.length}/60 znaków
                </p>
              </div>
              <div>
                <Label htmlFor="meta_desc">Meta Description</Label>
                <Textarea
                  id="meta_desc"
                  value={currentVersion.meta_desc}
                  onChange={(e) => updateVersion(activeLanguage, { meta_desc: e.target.value })}
                  placeholder="SEO description"
                  maxLength={160}
                  rows={2}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {currentVersion.meta_desc.length}/160 znaków
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        <div>
          <Label htmlFor="tags">Tagi (rozdzielone przecinkami)</Label>
          <Input
            id="tags"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            onBlur={processTags}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), processTags())}
            placeholder="tag1, tag2, tag3"
          />
        </div>
      </div>

      {/* SEO Side Panel */}
      <SeoSidePanel
        open={seoOpen}
        onOpenChange={setSeoOpen}
        title={currentVersion.title}
        slug={currentVersion.slug}
        excerpt={currentVersion.summary}
        metaTitle={currentVersion.meta_title}
        metaDesc={currentVersion.meta_desc}
        bodyRich={currentVersion.body_rich}
        featuredImageUrl={currentVersion.featured_image_url}
        status={currentVersion.status}
        lang={activeLanguage}
        contentType="story"
        seoFields={seoFields}
        onUpdateSeoFields={handleUpdateSeoFields}
      />
    </div>
  );
};

export default StoryEditor;
