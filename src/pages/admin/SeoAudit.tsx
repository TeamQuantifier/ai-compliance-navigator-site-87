import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Search, 
  FileText, 
  Award, 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  ChevronDown, 
  ChevronRight,
  Edit,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { analyzeSeoContent, getIssueSummary, SeoContentData } from '@/lib/seo-analyzer';
import { SeoAnalysisResult } from '@/lib/seo-rules';
import { cn } from '@/lib/utils';

interface ContentItem extends SeoContentData {
  id: string;
  group_id?: string | null;
  lang: string;
  contentType: 'post' | 'story';
  analysis?: SeoAnalysisResult;
}

const LANG_FLAGS: Record<string, string> = {
  pl: '🇵🇱',
  en: '🇬🇧',
  cs: '🇨🇿'
};

export default function SeoAudit() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // Filters
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [langFilter, setLangFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [scoreFilter, setScoreFilter] = useState<string>('all');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      const [postsResult, storiesResult] = await Promise.all([
        supabase.from('posts').select(`
          id, title, slug, lang, status, group_id,
          meta_title, meta_desc, focus_keyword,
          featured_image_url, featured_image_alt,
          canonical_url, robots_index, robots_follow,
          og_title, og_description, og_image_url,
          twitter_title, twitter_description, twitter_image_url, twitter_card_type,
          schema_type, seo_score, body_rich
        `),
        supabase.from('stories').select(`
          id, title, slug, lang, status, group_id,
          meta_title, meta_desc, focus_keyword,
          featured_image_url, featured_image_alt,
          canonical_url, robots_index, robots_follow,
          og_title, og_description, og_image_url,
          twitter_title, twitter_description, twitter_image_url, twitter_card_type,
          schema_type, seo_score, body_rich
        `)
      ]);

      const posts: ContentItem[] = (postsResult.data || []).map(p => ({ ...p, contentType: 'post' as const }));
      const stories: ContentItem[] = (storiesResult.data || []).map(s => ({ ...s, contentType: 'story' as const }));
      const allContent = [...posts, ...stories];

      // Collect all titles for duplicate detection
      const allTitles = allContent.map(item => item.meta_title || item.title);

      // Analyze each item
      const analyzed = allContent.map(item => ({
        ...item,
        analysis: analyzeSeoContent(item, item.contentType, undefined, allTitles)
      }));

      setContent(analyzed);
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtered content
  const filteredContent = useMemo(() => {
    return content.filter(item => {
      if (typeFilter !== 'all' && item.contentType !== typeFilter) return false;
      if (langFilter !== 'all' && item.lang !== langFilter) return false;
      if (statusFilter !== 'all' && item.status !== statusFilter) return false;
      if (scoreFilter !== 'all') {
        const score = item.analysis?.score || 0;
        if (scoreFilter === 'critical' && score >= 50) return false;
        if (scoreFilter === 'warning' && (score < 50 || score >= 80)) return false;
        if (scoreFilter === 'good' && score < 80) return false;
      }
      return true;
    });
  }, [content, typeFilter, langFilter, statusFilter, scoreFilter]);

  // Stats
  const stats = useMemo(() => {
    const total = content.length;
    let critical = 0;
    let warning = 0;
    let good = 0;
    let duplicates = 0;
    let missingMeta = 0;

    const titleMap = new Map<string, number>();
    
    content.forEach(item => {
      const score = item.analysis?.score || 0;
      if (score < 50) critical++;
      else if (score < 80) warning++;
      else good++;

      if (!item.meta_desc) missingMeta++;

      const title = (item.meta_title || item.title).toLowerCase();
      titleMap.set(title, (titleMap.get(title) || 0) + 1);
    });

    titleMap.forEach(count => {
      if (count > 1) duplicates += count;
    });

    return { total, critical, warning, good, duplicates, missingMeta };
  }, [content]);

  const toggleRow = (id: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleEdit = (item: ContentItem) => {
    const basePath = item.contentType === 'post' ? '/admin/posts' : '/admin/stories';
    const param = item.group_id || item.id;
    navigate(`${basePath}/${param}?openSeo=true`);
  };

  const getScoreBadgeVariant = (score: number): 'destructive' | 'secondary' | 'default' => {
    if (score < 50) return 'destructive';
    if (score < 80) return 'secondary';
    return 'default';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Search className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">SEO Audit</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-12" />
        <Skeleton className="h-[400px]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Search className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">SEO Audit</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Articles</div>
          </CardContent>
        </Card>
        <Card className="border-destructive/50">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-destructive">{stats.critical}</div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> Critical (&lt;50)
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-500/50">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-500">{stats.warning}</div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" /> Warning (50-79)
            </div>
          </CardContent>
        </Card>
        <Card className="border-primary/50">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-primary">{stats.good}</div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Good (≥80)
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{stats.duplicates}</div>
            <div className="text-sm text-muted-foreground">Duplicate Titles</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{stats.missingMeta}</div>
            <div className="text-sm text-muted-foreground">Missing Meta</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="post">Posts</SelectItem>
            <SelectItem value="story">Stories</SelectItem>
          </SelectContent>
        </Select>

        <Select value={langFilter} onValueChange={setLangFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            <SelectItem value="pl">🇵🇱 Polish</SelectItem>
            <SelectItem value="en">🇬🇧 English</SelectItem>
            <SelectItem value="cs">🇨🇿 Czech</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
          </SelectContent>
        </Select>

        <Select value={scoreFilter} onValueChange={setScoreFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Score" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Scores</SelectItem>
            <SelectItem value="critical">Critical (&lt;50)</SelectItem>
            <SelectItem value="warning">Warning (50-79)</SelectItem>
            <SelectItem value="good">Good (≥80)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-20">Type</TableHead>
              <TableHead className="w-16">Lang</TableHead>
              <TableHead className="w-24">Score</TableHead>
              <TableHead className="w-24">Issues</TableHead>
              <TableHead className="w-24">Status</TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContent.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No content found matching filters
                </TableCell>
              </TableRow>
            ) : (
              filteredContent.map(item => {
                const isExpanded = expandedRows.has(item.id);
                const issues = item.analysis ? getIssueSummary(item.analysis) : { critical: 0, warning: 0, info: 0 };
                const totalIssues = issues.critical + issues.warning + issues.info;

                return (
                  <Collapsible key={item.id} open={isExpanded} onOpenChange={() => toggleRow(item.id)} asChild>
                    <>
                      <TableRow className="cursor-pointer hover:bg-muted/50">
                        <TableCell>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            </Button>
                          </CollapsibleTrigger>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="truncate max-w-[300px]" title={item.title}>
                            {item.title}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="gap-1">
                            {item.contentType === 'post' ? (
                              <><FileText className="h-3 w-3" /> Post</>
                            ) : (
                              <><Award className="h-3 w-3" /> Story</>
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-lg">{LANG_FLAGS[item.lang] || item.lang}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getScoreBadgeVariant(item.analysis?.score || 0)}>
                            {item.analysis?.score || 0}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {totalIssues > 0 ? (
                            <div className="flex items-center gap-1">
                              {issues.critical > 0 && (
                                <span className="text-destructive flex items-center gap-0.5">
                                  <XCircle className="h-3 w-3" />{issues.critical}
                                </span>
                              )}
                              {issues.warning > 0 && (
                                <span className="text-amber-600 dark:text-amber-500 flex items-center gap-0.5">
                                  <AlertTriangle className="h-3 w-3" />{issues.warning}
                                </span>
                              )}
                              {issues.info > 0 && (
                                <span className="text-muted-foreground flex items-center gap-0.5">
                                  <Info className="h-3 w-3" />{issues.info}
                                </span>
                              )}
                            </div>
                          ) : (
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={item.status === 'published' ? 'default' : 'secondary'}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <CollapsibleContent asChild>
                        <TableRow className="bg-muted/30">
                          <TableCell></TableCell>
                          <TableCell colSpan={7} className="py-4">
                            {item.analysis?.failed && item.analysis.failed.length > 0 ? (
                              <div className="space-y-2">
                                {item.analysis.failed.map((check, idx) => (
                                  <div 
                                    key={idx} 
                                    className={cn(
                                      "flex items-start gap-2 text-sm",
                                      check.rule.severity === 'critical' && "text-destructive",
                                      check.rule.severity === 'warning' && "text-amber-600 dark:text-amber-500",
                                      check.rule.severity === 'info' && "text-muted-foreground"
                                    )}
                                  >
                                    {check.rule.severity === 'critical' && <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                                    {check.rule.severity === 'warning' && <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                                    {check.rule.severity === 'info' && <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                                    <div>
                                      <span className="font-medium">{check.rule.name}:</span> {check.message}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-primary flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4" />
                                All SEO checks passed!
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      </CollapsibleContent>
                    </>
                  </Collapsible>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
