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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import RichTextEditor from '@/components/editor/RichTextEditor';
import { toast } from 'sonner';
import { ArrowLeft, Save, CheckCircle, Upload, X, Plus } from 'lucide-react';

const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [post, setPost] = useState({
    title: '',
    slug: '',
    lang: 'pl',
    status: 'draft' as 'draft' | 'published' | 'scheduled' | 'archived',
    body_rich: {},
    excerpt: '',
    category_id: null as string | null,
    meta_title: '',
    meta_desc: '',
    og_image_url: '',
    featured_image_url: '',
    tags: [] as string[],
    related_post_ids: [] as string[],
    published_at: null as string | null,
  });

  // New category dialog state
  const [showNewCategoryDialog, setShowNewCategoryDialog] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategorySlug, setNewCategorySlug] = useState('');
  const [creatingCategory, setCreatingCategory] = useState(false);

  // Tags input state
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    loadCategories();
    if (id && id !== 'new') {
      loadPost();
    }
  }, [id]);

  // Sync tags input when post loads
  useEffect(() => {
    setTagsInput(post.tags.join(', '));
  }, [post.tags]);

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


  const loadPost = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) {
        setPost({
          ...data,
          tags: data.tags || [],
          related_post_ids: data.related_post_ids || [],
        });
      }
    } catch (error) {
      console.error('Error loading post:', error);
      toast.error('Błąd podczas wczytywania posta');
    }
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
    setPost({
      ...post,
      title: value,
      slug: post.slug || generateSlug(value),
    });
  };

  const handleNewCategoryNameChange = (value: string) => {
    setNewCategoryName(value);
    setNewCategorySlug(generateSlug(value));
  };

  const createCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error('Nazwa kategorii jest wymagana');
      return;
    }
    if (!newCategorySlug.trim()) {
      toast.error('Slug kategorii jest wymagany');
      return;
    }

    setCreatingCategory(true);
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([{ 
          name: newCategoryName.trim(), 
          slug: newCategorySlug.trim(), 
          lang: post.lang 
        }])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setCategories([...categories, data]);
        setPost({ ...post, category_id: data.id });
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
    setPost({ ...post, tags: newTags });
  };

  const handleTagsKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      processTags();
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
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      setPost({ ...post, featured_image_url: publicUrl });
      toast.success('Obrazek dodany!');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeFeaturedImage = () => {
    setPost({ ...post, featured_image_url: '' });
    toast.success('Obrazek usunięty');
  };

  const validatePost = () => {
    if (!post.title) {
      toast.error('Tytuł jest wymagany');
      return false;
    }
    if (post.title.length > 200) {
      toast.error('Tytuł może mieć maksymalnie 200 znaków');
      return false;
    }
    if (post.meta_title && post.meta_title.length > 60) {
      toast.error('Meta Title może mieć maksymalnie 60 znaków');
      return false;
    }
    if (post.meta_desc && post.meta_desc.length > 160) {
      toast.error('Meta Description może mieć maksymalnie 160 znaków');
      return false;
    }
    if (post.slug.length > 250) {
      toast.error('Slug może mieć maksymalnie 250 znaków');
      return false;
    }
    return true;
  };

  const handleSaveAsDraft = async () => {
    if (!validatePost()) return;

    setLoading(true);
    try {
      const postData = {
        ...post,
        status: 'draft' as const,
        updated_at: new Date().toISOString(),
      };

      if (id && id !== 'new') {
        const { error } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', id);

        if (error) throw error;
        toast.success('Draft zapisany');
      } else {
        const { error } = await supabase
          .from('posts')
          .insert([postData]);

        if (error) throw error;
        toast.success('Draft utworzony');
        navigate('/admin/posts');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!validatePost()) return;

    setLoading(true);
    try {
      const postData = {
        ...post,
        status: 'published' as const,
        published_at: post.published_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (id && id !== 'new') {
        const { error } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', id);

        if (error) throw error;
        toast.success('Post opublikowany!');
      } else {
        const { error } = await supabase
          .from('posts')
          .insert([postData]);

        if (error) throw error;
        toast.success('Post opublikowany!');
        navigate('/admin/posts');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => (
    <div className="space-y-6">
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
            {id === 'new' ? 'Nowy Post' : 'Edytuj Post'}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleSaveAsDraft} 
            disabled={loading}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button 
            onClick={handlePublish} 
            disabled={loading}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Tytuł</Label>
            <Input
              id="title"
              value={post.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Tytuł posta"
              maxLength={200}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {post.title.length}/200 znaków
            </p>
          </div>
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={post.slug}
              onChange={(e) => setPost({ ...post, slug: e.target.value })}
              placeholder="slug-posta"
              maxLength={250}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {post.slug.length}/250 znaków
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="lang">Język</Label>
            <Select value={post.lang} onValueChange={(value) => setPost({ ...post, lang: value })}>
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
            <Select value={post.status} onValueChange={(value: any) => setPost({ ...post, status: value })}>
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
              value={post.published_at ? new Date(post.published_at).toISOString().slice(0, 16) : ''}
              onChange={(e) => setPost({ ...post, published_at: e.target.value ? new Date(e.target.value).toISOString() : null })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="category">Kategoria</Label>
          <div className="flex gap-2">
            <Select value={post.category_id || ''} onValueChange={(value) => setPost({ ...post, category_id: value || null })}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Wybierz kategorię" />
              </SelectTrigger>
              <SelectContent>
                {categories.filter(c => c.lang === post.lang).map((category) => (
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
                    <Label htmlFor="new-category-name">Nazwa kategorii</Label>
                    <Input
                      id="new-category-name"
                      value={newCategoryName}
                      onChange={(e) => handleNewCategoryNameChange(e.target.value)}
                      placeholder="np. Sztuczna Inteligencja"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-category-slug">Slug</Label>
                    <Input
                      id="new-category-slug"
                      value={newCategorySlug}
                      onChange={(e) => setNewCategorySlug(e.target.value)}
                      placeholder="np. sztuczna-inteligencja"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Kategoria zostanie utworzona dla języka: <strong>{post.lang === 'pl' ? 'Polski' : 'English'}</strong>
                  </p>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowNewCategoryDialog(false)}>
                    Anuluj
                  </Button>
                  <Button onClick={createCategory} disabled={creatingCategory}>
                    {creatingCategory ? 'Tworzenie...' : 'Utwórz kategorię'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div>
          <Label htmlFor="excerpt">Krótkie podsumowanie (excerpt)</Label>
          <Textarea
            id="excerpt"
            value={post.excerpt}
            onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
            placeholder="Krótkie podsumowanie posta..."
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="featured_image">Główny obrazek artykułu (thumbnail)</Label>
          <div className="mt-2">
            {post.featured_image_url ? (
              <div className="relative inline-block">
                <img 
                  src={post.featured_image_url} 
                  alt="Featured" 
                  className="max-w-xs rounded-lg border"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={removeFeaturedImage}
                  type="button"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Input
                  id="featured_image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={loading}
                />
                <Upload className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </div>
        </div>

        <div>
          <Label>Treść posta</Label>
          <RichTextEditor
            content={post.body_rich}
            onChange={(content) => setPost({ ...post, body_rich: content })}
            placeholder="Zacznij pisać treść posta..."
          />
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">SEO</h2>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="meta_title">Meta Title</Label>
              <Input
                id="meta_title"
                value={post.meta_title}
                onChange={(e) => setPost({ ...post, meta_title: e.target.value })}
                placeholder="SEO title"
                maxLength={60}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {post.meta_title.length}/60 znaków
              </p>
            </div>
            <div>
              <Label htmlFor="meta_desc">Meta Description</Label>
              <Textarea
                id="meta_desc"
                value={post.meta_desc}
                onChange={(e) => setPost({ ...post, meta_desc: e.target.value })}
                placeholder="SEO description"
                rows={2}
                maxLength={160}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {post.meta_desc.length}/160 znaków
              </p>
            </div>
            <div>
              <Label htmlFor="og_image_url">OG Image URL</Label>
              <Input
                id="og_image_url"
                value={post.og_image_url}
                onChange={(e) => setPost({ ...post, og_image_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Tagi</h2>
          <div>
            <Label htmlFor="tags">Tagi (oddzielone przecinkiem lub średnikiem)</Label>
            <Input
              id="tags"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              onBlur={processTags}
              onKeyDown={handleTagsKeyDown}
              placeholder="tag1, tag2, tag3"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Naciśnij Enter lub kliknij poza pole aby zatwierdzić. Aktualne tagi: {post.tags.length > 0 ? post.tags.join(', ') : 'brak'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {renderContent()}
    </div>
  );
};

export default PostEditor;
