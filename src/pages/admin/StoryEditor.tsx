import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import RichTextEditor from '@/components/editor/RichTextEditor';
import { toast } from 'sonner';
import { ArrowLeft, Save, Upload, X, Loader2 } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';

const StoryEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id && id !== 'new');
  const [story, setStory] = useState({
    title: '',
    slug: '',
    lang: 'pl',
    status: 'draft' as 'draft' | 'published' | 'scheduled' | 'archived',
    summary: '',
    client_name: '',
    industry: '',
    country: '',
    logo_url: '',
    meta_title: '',
    meta_desc: '',
    og_image_url: '',
    featured_image_url: '',
    body_rich: {} as any,
    tags: [] as string[],
    seo_score: 0,
  });

  useEffect(() => {
    if (id && id !== 'new') {
      loadStory();
    }
  }, [id]);

  const loadStory = async () => {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) {
        setStory({
          ...data,
          tags: data.tags || [],
          featured_image_url: (data as any).featured_image_url || '',
        });
      }
    } catch (error) {
      console.error('Error loading story:', error);
      toast.error('Błąd podczas wczytywania success story');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const storyData = {
        ...story,
        updated_at: new Date().toISOString(),
      };

      if (id && id !== 'new') {
        const { error } = await supabase
          .from('stories')
          .update(storyData)
          .eq('id', id);

        if (error) throw error;
        toast.success('Success story zaktualizowane');
      } else {
        const { error } = await supabase
          .from('stories')
          .insert([storyData]);

        if (error) throw error;
        toast.success('Success story utworzone');
        navigate('/admin/stories');
      }
    } catch (error) {
      console.error('Error saving story:', error);
      toast.error('Błąd podczas zapisywania');
    } finally {
      setLoading(false);
    }
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

    setLoading(true);
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

      setStory({ ...story, featured_image_url: publicUrl });
      toast.success('Obrazek dodany!');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Błąd podczas uploadu');
    } finally {
      setLoading(false);
    }
  };

  const removeFeaturedImage = () => {
    setStory({ ...story, featured_image_url: '' });
  };

  const renderContent = () => (
    <div className="space-y-6">
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
            {id === 'new' ? 'Nowe Success Story' : 'Edytuj Success Story'}
          </h1>
        </div>
        <Button onClick={handleSave} disabled={loading}>
          <Save className="h-4 w-4 mr-2" />
          Zapisz
        </Button>
      </div>

        <div className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Tytuł</Label>
              <Input
                id="title"
                value={story.title}
                onChange={(e) => setStory({ ...story, title: e.target.value })}
                placeholder="Tytuł success story"
              />
            </div>
            <div>
              <Label htmlFor="slug">Slug URL</Label>
              <Input
                id="slug"
                value={story.slug}
                onChange={(e) => setStory({ ...story, slug: e.target.value })}
                placeholder="url-slug"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="lang">Język</Label>
              <Select value={story.lang} onValueChange={(value) => setStory({ ...story, lang: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pl">Polski</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={story.status} onValueChange={(value: 'draft' | 'published' | 'scheduled' | 'archived') => setStory({ ...story, status: value })}>
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
                value={story.seo_score}
                onChange={(e) => setStory({ ...story, seo_score: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="summary">Podsumowanie</Label>
            <Textarea
              id="summary"
              value={story.summary || ''}
              onChange={(e) => setStory({ ...story, summary: e.target.value })}
              placeholder="Krótkie podsumowanie..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="client_name">Nazwa klienta</Label>
              <Input
                id="client_name"
                value={story.client_name || ''}
                onChange={(e) => setStory({ ...story, client_name: e.target.value })}
                placeholder="Nazwa firmy"
              />
            </div>
            <div>
              <Label htmlFor="industry">Branża</Label>
              <Input
                id="industry"
                value={story.industry || ''}
                onChange={(e) => setStory({ ...story, industry: e.target.value })}
                placeholder="np. E-commerce"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="country">Kraj</Label>
              <Input
                id="country"
                value={story.country || ''}
                onChange={(e) => setStory({ ...story, country: e.target.value })}
                placeholder="np. Polska"
              />
            </div>
            <div>
              <Label htmlFor="logo_url">URL logo</Label>
              <Input
                id="logo_url"
                value={story.logo_url || ''}
                onChange={(e) => setStory({ ...story, logo_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Thumbnail Upload Section */}
          <div>
            <Label>Główny obrazek (thumbnail)</Label>
            <div className="mt-2">
              {story.featured_image_url ? (
                <div className="relative inline-block">
                  <img 
                    src={story.featured_image_url} 
                    alt="Thumbnail" 
                    className="max-w-xs rounded-lg shadow-md"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={removeFeaturedImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button variant="outline" asChild disabled={loading}>
                  <label htmlFor="featured-image-upload" className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="meta_title">Meta Title</Label>
              <Input
                id="meta_title"
                value={story.meta_title || ''}
                onChange={(e) => setStory({ ...story, meta_title: e.target.value })}
                placeholder="SEO title"
                maxLength={60}
              />
            </div>
            <div>
              <Label htmlFor="og_image_url">OG Image URL</Label>
              <Input
                id="og_image_url"
                value={story.og_image_url || ''}
                onChange={(e) => setStory({ ...story, og_image_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <Label htmlFor="meta_desc">Meta Description</Label>
            <Textarea
              id="meta_desc"
              value={story.meta_desc || ''}
              onChange={(e) => setStory({ ...story, meta_desc: e.target.value })}
              placeholder="SEO description"
              maxLength={160}
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="tags">Tagi (rozdzielone przecinkami)</Label>
            <Input
              id="tags"
              value={story.tags.join(', ')}
              onChange={(e) => setStory({ ...story, tags: e.target.value.split(',').map(t => t.trim()) })}
              placeholder="tag1, tag2, tag3"
            />
          </div>

          <div>
            <Label>Treść (Rich Text)</Label>
            {initialLoading ? (
              <div className="flex justify-center items-center p-8 border rounded-lg">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <RichTextEditor
                content={story.body_rich}
                onChange={(content) => setStory({ ...story, body_rich: content })}
                placeholder="Napisz treść success story..."
              />
            )}
          </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {renderContent()}
    </div>
  );
};

export default StoryEditor;