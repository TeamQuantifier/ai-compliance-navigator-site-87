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

interface Story {
  id: string;
  title: string;
  slug: string;
  lang: string;
  status: string;
  client_name: string | null;
  industry: string | null;
  seo_score: number;
  published_at: string | null;
  created_at: string;
}

export default function StoriesList() {
  const navigate = useNavigate();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('id, title, slug, lang, status, client_name, industry, seo_score, published_at, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      console.error('Error loading stories:', error);
      toast({
        title: 'Error',
        description: 'Failed to load success stories',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteStory = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const { error } = await supabase.from('stories').delete().eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Success story deleted',
      });
      
      loadStories();
    } catch (error) {
      console.error('Error deleting story:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete success story',
        variant: 'destructive',
      });
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

  if (loading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Success Stories</h1>
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
        <h1 className="text-3xl font-bold">Success Stories</h1>
        <Button onClick={() => navigate('/admin/stories/new')}>
          <Plus className="mr-2 h-4 w-4" />
          New Story
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>SEO Score</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No success stories yet. Create your first one!
                </TableCell>
              </TableRow>
            ) : (
              stories.map((story) => (
                <TableRow key={story.id}>
                  <TableCell className="font-medium">{story.title}</TableCell>
                  <TableCell>{story.client_name || '-'}</TableCell>
                  <TableCell>{story.industry || '-'}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{story.lang.toUpperCase()}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(story.status)}>
                      {story.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={story.seo_score >= 80 ? 'default' : 'destructive'}
                    >
                      {story.seo_score}/100
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="View"
                        onClick={() => window.open(`/${story.lang}/success-stories/${story.slug}`, '_blank')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Edit"
                        onClick={() => navigate(`/admin/stories/${story.id}`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Delete"
                        onClick={() => deleteStory(story.id, story.title)}
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
