import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface GroupedPost {
  group_id: string;
  title: string;
  languages: string[];
  status: string;
  published_at: string | null;
  featured_image_url: string | null;
  primary_slug: string;
  primary_lang: string;
}

export default function PostsList() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<GroupedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, slug, lang, status, published_at, created_at, featured_image_url, group_id')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group posts by group_id
      const grouped = new Map<string, GroupedPost>();
      
      data?.forEach(post => {
        const groupKey = post.group_id || post.id;
        
        if (!grouped.has(groupKey)) {
          grouped.set(groupKey, {
            group_id: groupKey,
            title: post.title,
            languages: [post.lang],
            status: post.status,
            published_at: post.published_at,
            featured_image_url: post.featured_image_url,
            primary_slug: post.slug,
            primary_lang: post.lang,
          });
        } else {
          const existing = grouped.get(groupKey)!;
          existing.languages.push(post.lang);
          // Prefer published status
          if (post.status === 'published') {
            existing.status = 'published';
          }
          // Use most recent published_at
          if (post.published_at && (!existing.published_at || post.published_at > existing.published_at)) {
            existing.published_at = post.published_at;
          }
        }
      });

      setPosts(Array.from(grouped.values()));
    } catch (error) {
      console.error('Error loading posts:', error);
      toast({
        title: 'Error',
        description: 'Failed to load posts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteGroup = async (groupId: string, title: string) => {
    if (!confirm(`Czy na pewno chcesz usunąć "${title}" we wszystkich wersjach językowych?`)) return;

    try {
      const { error } = await supabase.from('posts').delete().eq('group_id', groupId);
      if (error) throw error;
      
      toast({ title: 'Success', description: 'Artykuł usunięty' });
      loadPosts();
    } catch (error) {
      console.error('Error deleting posts:', error);
      toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'default';
      case 'draft': return 'secondary';
      case 'scheduled': return 'outline';
      case 'archived': return 'destructive';
      default: return 'secondary';
    }
  };

  const getLangFlag = (lang: string) => {
    switch (lang) {
      case 'pl': return '🇵🇱';
      case 'en': return '🇬🇧';
      case 'cs': return '🇨🇿';
      default: return lang.toUpperCase();
    }
  };

  if (loading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Button onClick={() => navigate('/admin/posts/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Nowy Artykuł
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Obrazek</TableHead>
              <TableHead>Tytuł</TableHead>
              <TableHead className="w-32">Języki</TableHead>
              <TableHead className="w-24">Status</TableHead>
              <TableHead className="w-32">Publikacja</TableHead>
              <TableHead className="text-right w-32">Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Brak artykułów. Utwórz pierwszy!
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.group_id}>
                  <TableCell>
                    {post.featured_image_url ? (
                      <img 
                        src={post.featured_image_url} 
                        alt={post.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                    ) : (
                      <span className="text-muted-foreground text-xs">Brak</span>
                    )}
                  </TableCell>
                  <TableCell className="font-medium max-w-xs truncate">{post.title}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {post.languages.sort().map(lang => (
                        <span key={lang} className="text-lg" title={lang.toUpperCase()}>
                          {getLangFlag(lang)}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(post.status)}>
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {post.published_at 
                      ? format(new Date(post.published_at), 'dd MMM yyyy')
                      : '-'
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Podgląd"
                        onClick={() => window.open(`/${post.primary_lang}/blog/${post.primary_slug}`, '_blank')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Edytuj"
                        onClick={() => navigate(`/admin/posts/edit?group=${post.group_id}`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Usuń"
                        onClick={() => deleteGroup(post.group_id, post.title)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
