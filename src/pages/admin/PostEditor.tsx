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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LanguageTabs, type Language, LANGUAGE_CONFIG } from '@/components/admin/LanguageTabs';
import { useMultiLangPost, type PostVersion } from '@/hooks/useMultiLangPost';
import RichTextEditor from '@/components/editor/RichTextEditor';
import { toast } from 'sonner';
import { ArrowLeft, Save, Upload, X, Plus, Copy, Loader2 } from 'lucide-react';

const PostEditor = () => {
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
    loadByPostId,
    hasContent,
    isPublished,
  } = useMultiLangPost(groupIdParam || undefined);

  const [activeLanguage, setActiveLanguage] = useState<Language>('pl');
  const [categories, setCategories] = useState<any[]>([]);
  const [showNewCategoryDialog, setShowNewCategoryDialog] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategorySlug, setNewCategorySlug] = useState('');
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [tagsInput, setTagsInput] = useState('');
  const [uploading, setUploading] = useState(false);

  // Load post by ID (legacy route support)
  useEffect(() => {
    if (id && id !== 'new' && !groupIdParam) {
      loadByPostId(id);
    }
  }, [id, groupIdParam, loadByPostId]);

  // Load categories
  useEffect(() => {
    loadCategories();
  }, []);

  // Sync tags input when active language changes
  useEffect(() => {
    setTagsInput(versions[activeLanguage].tags.join(', '));
  }, [activeLanguage, versions]);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, lang')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

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

  const handleNewCategoryNameChange = (value: string) => {
    setNewCategoryName(value);
    setNewCategorySlug(generateSlug(value));
  };

  const createCategory = async () => {
    if (!newCategoryName.trim() || !newCategorySlug.trim()) {
      toast.error('Nazwa i slug kategorii są wymagane');
      return;
    }

    setCreatingCategory(true);
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([{ 
          name: newCategoryName.trim(), 
          slug: newCategorySlug.trim(), 
          lang: activeLanguage 
        }])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setCategories([...categories, data]);
        updateVersion(activeLanguage, { category_id: data.id });
        setShowNewCategoryDialog(false);
        setNewCategoryName('');
        setNewCategorySlug('');
        toast.success('Kategoria utworzona!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Błąd podczas tworzenia kategorii');
    } finally {
      setCreatingCategory(false);
    }
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
        .from('blog-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
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
      excerpt: source.excerpt,
      featured_image_url: source.featured_image_url,
      og_image_url: source.og_image_url,
      category_id: null, // Categories are per-language
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
      navigate(`/admin/posts/edit?group=${savedGroupId}`, { replace: true });
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
            onClick={() => navigate('/admin/posts')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Powrót
          </Button>
          <h1 className="text-3xl font-bold">
            {isNew ? 'Nowy Artykuł' : 'Edytuj Artykuł'}
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
              placeholder="Tytuł artykułu"
              maxLength={200}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {currentVersion.title.length}/200 znaków
            </p>
          </div>
          <div>
            <Label htmlFor="slug">Slug URL</Label>
            <Input
              id="slug"
              value={currentVersion.slug}
              onChange={(e) => updateVersion(activeLanguage, { slug: e.target.value })}
              placeholder="url-slug"
              maxLength={250}
            />
            <p className="text-xs text-muted-foreground mt-1">
              /{activeLanguage}/blog/{currentVersion.slug || 'slug'}
            </p>
          </div>
        </div>

        {/* Status & Date */}
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
            <Label htmlFor="published_at">Data publikacji</Label>
            <Input
              id="published_at"
              type="datetime-local"
              value={currentVersion.published_at ? new Date(currentVersion.published_at).toISOString().slice(0, 16) : ''}
              onChange={(e) => updateVersion(activeLanguage, { 
                published_at: e.target.value ? new Date(e.target.value).toISOString() : null 
              })}
            />
          </div>
          <div>
            <Label htmlFor="category">Kategoria</Label>
            <div className="flex gap-2">
              <Select 
                value={currentVersion.category_id || ''} 
                onValueChange={(value) => updateVersion(activeLanguage, { category_id: value || null })}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Wybierz kategorię" />
                </SelectTrigger>
                <SelectContent>
                  {categories.filter(c => c.lang === activeLanguage).map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Dialog open={showNewCategoryDialog} onOpenChange={setShowNewCategoryDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" title="Dodaj nową kategorię">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dodaj nową kategorię</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label>Nazwa kategorii</Label>
                      <Input
                        value={newCategoryName}
                        onChange={(e) => handleNewCategoryNameChange(e.target.value)}
                        placeholder="np. Sztuczna Inteligencja"
                      />
                    </div>
                    <div>
                      <Label>Slug</Label>
                      <Input
                        value={newCategorySlug}
                        onChange={(e) => setNewCategorySlug(e.target.value)}
                        placeholder="np. sztuczna-inteligencja"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Kategoria dla języka: <strong>{LANGUAGE_CONFIG[activeLanguage].label}</strong>
                    </p>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNewCategoryDialog(false)}>
                      Anuluj
                    </Button>
                    <Button onClick={createCategory} disabled={creatingCategory}>
                      {creatingCategory ? 'Tworzenie...' : 'Utwórz'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <Label htmlFor="excerpt">Krótkie podsumowanie (excerpt)</Label>
          <Textarea
            id="excerpt"
            value={currentVersion.excerpt}
            onChange={(e) => updateVersion(activeLanguage, { excerpt: e.target.value })}
            placeholder="Krótkie podsumowanie artykułu..."
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
                  alt="Featured" 
                  className="max-w-xs rounded-lg border"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => updateVersion(activeLanguage, { featured_image_url: '' })}
                  type="button"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
              </div>
            )}
          </div>
        </div>

        {/* Rich Text Editor */}
        <div>
          <Label>Treść artykułu ({LANGUAGE_CONFIG[activeLanguage].label})</Label>
          <RichTextEditor
            content={currentVersion.body_rich}
            onChange={(content) => updateVersion(activeLanguage, { body_rich: content })}
            placeholder="Zacznij pisać treść artykułu..."
          />
        </div>

        {/* SEO Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">SEO</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
                rows={2}
                maxLength={160}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {currentVersion.meta_desc.length}/160 znaków
              </p>
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
          </CardContent>
        </Card>

        {/* Tags */}
        <div>
          <Label htmlFor="tags">Tagi (oddzielone przecinkiem)</Label>
          <Input
            id="tags"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            onBlur={processTags}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), processTags())}
            placeholder="tag1, tag2, tag3"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Aktualne tagi: {currentVersion.tags.length > 0 ? currentVersion.tags.join(', ') : 'brak'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
