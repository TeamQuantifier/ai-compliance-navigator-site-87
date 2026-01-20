import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LanguageTabs, type Language, LANGUAGE_CONFIG } from '@/components/admin/LanguageTabs';
import { useMultiLangStory } from '@/hooks/useMultiLangStory';
import RichTextEditor from '@/components/editor/RichTextEditor';
import { toast } from 'sonner';
import { ArrowLeft, Save, Upload, X, Copy, Loader2 } from 'lucide-react';

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

  // Load story by ID (legacy route support)
  useEffect(() => {
    if (id && id !== 'new' && !groupIdParam) {
      loadByStoryId(id);
    }
  }, [id, groupIdParam, loadByStoryId]);

  // Sync tags input when active language changes
  useEffect(() => {
    setTagsInput(versions[activeLanguage].tags.join(', '));
  }, [activeLanguage, versions]);

  const currentVersion = versions[activeLanguage];

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
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Zapisz wszystkie wersje
        </Button>
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

        {/* Status & SEO Score */}
        <div className="grid grid-cols-3 gap-4">
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
            <Label htmlFor="seo_score">SEO Score</Label>
            <Input
              id="seo_score"
              type="number"
              min="0"
              max="100"
              value={currentVersion.seo_score}
              onChange={(e) => updateVersion(activeLanguage, { seo_score: parseInt(e.target.value) || 0 })}
            />
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

        {/* SEO Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">SEO</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
              </div>
              <div>
                <Label htmlFor="og_image_url">OG Image URL</Label>
                <Input
                  id="og_image_url"
                  value={currentVersion.og_image_url}
                  onChange={(e) => updateVersion(activeLanguage, { og_image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
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
    </div>
  );
};

export default StoryEditor;
