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
import { useTableSort, SortableHead } from '@/hooks/useTableSort';

interface GroupedStory {
  group_id: string;
  title: string;
  client_name: string | null;
  industry: string | null;
  languages: string[];
  status: string;
  seo_score: number;
  primary_slug: string;
  primary_lang: string;
}

export default function StoriesList() {
  const navigate = useNavigate();
  const [stories, setStories] = useState<GroupedStory[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('id, title, slug, lang, status, client_name, industry, seo_score, group_id')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group stories by group_id
      const grouped = new Map<string, GroupedStory>();
      
      data?.forEach(story => {
        const groupKey = story.group_id || story.id;
        
        if (!grouped.has(groupKey)) {
          grouped.set(groupKey, {
            group_id: groupKey,
            title: story.title,
            client_name: story.client_name,
            industry: story.industry,
            languages: [story.lang],
            status: story.status,
            seo_score: story.seo_score || 0,
            primary_slug: story.slug,
            primary_lang: story.lang,
          });
        } else {
          const existing = grouped.get(groupKey)!;
          existing.languages.push(story.lang);
          if (story.status === 'published') existing.status = 'published';
          if (story.seo_score > existing.seo_score) existing.seo_score = story.seo_score;
        }
      });

      setStories(Array.from(grouped.values()));
    } catch (error) {
      console.error('Error loading stories:', error);
      toast({ title: 'Error', description: 'Failed to load stories', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const deleteGroup = async (groupId: string, title: string) => {
    if (!confirm(`Czy na pewno chcesz usunąć "${title}" we wszystkich wersjach językowych?`)) return;

    try {
      const { error } = await supabase.from('stories').delete().eq('group_id', groupId);
      if (error) throw error;
      toast({ title: 'Success', description: 'Success story usunięte' });
      loadStories();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'default';
      case 'draft': return 'secondary';
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

  const { sortedData, sortKey, sortDir, toggleSort } = useTableSort(
    stories,
    {
      title: (s) => s.title,
      client_name: (s) => s.client_name,
      industry: (s) => s.industry,
      languages: (s) => s.languages.length,
      status: (s) => s.status,
      seo_score: (s) => s.seo_score,
    },
    'title',
    'asc'
  );

  if (loading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Success Stories</h1>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
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
          Nowe Story
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHead sortKey="title" currentSort={sortKey} currentDir={sortDir} onSort={toggleSort}>Tytuł</SortableHead>
              <SortableHead sortKey="client_name" currentSort={sortKey} currentDir={sortDir} onSort={toggleSort}>Klient</SortableHead>
              <SortableHead sortKey="industry" currentSort={sortKey} currentDir={sortDir} onSort={toggleSort}>Branża</SortableHead>
              <SortableHead sortKey="languages" currentSort={sortKey} currentDir={sortDir} onSort={toggleSort} className="w-32">Języki</SortableHead>
              <SortableHead sortKey="status" currentSort={sortKey} currentDir={sortDir} onSort={toggleSort}>Status</SortableHead>
              <SortableHead sortKey="seo_score" currentSort={sortKey} currentDir={sortDir} onSort={toggleSort}>SEO</SortableHead>
              <TableHead className="text-right">Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  Brak success stories. Utwórz pierwsze!
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((story) => (
                <TableRow key={story.group_id}>
                  <TableCell className="font-medium max-w-xs truncate">{story.title}</TableCell>
                  <TableCell>{story.client_name || '-'}</TableCell>
                  <TableCell>{story.industry || '-'}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {story.languages.sort().map(lang => (
                        <span key={lang} className="text-lg" title={lang.toUpperCase()}>
                          {getLangFlag(lang)}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(story.status)}>{story.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={story.seo_score >= 80 ? 'default' : 'destructive'}>
                      {story.seo_score}/100
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => window.open(`/${story.primary_lang}/success-stories/${story.primary_slug}`, '_blank')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => navigate(`/admin/stories/edit?group=${story.group_id}`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => deleteGroup(story.group_id, story.title)}
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
