import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePosts, useCategories, useStories } from '@/hooks/useBlog';
import { usePrerenderReady } from '@/hooks/usePrerenderReady';
import { calculateReadingTime } from '@/lib/reading-time';
import { events } from '@/data/eventsData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import {
  Clock,
  Calendar,
  ArrowRight,
  AlertCircle,
  BookOpen,
  Trophy,
  GraduationCap,
  Download,
  CalendarDays,
  Search,
  Users,
  ArrowUpRight,
  Play,
  ChevronRight,
} from 'lucide-react';
import PageTemplate from '@/components/PageTemplate';
import EbookDownloadSection from '@/components/blog/EbookDownloadSection';
import FeaturedBookSection from '@/components/blog/FeaturedBookSection';
import nis2ChecklistThumb from '@/assets/downloads/nis2-ksc-checklist.jpg';


const BlogList = () => {
  const { currentLocale, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data: posts, isLoading: postsLoading, error: postsError } = usePosts(
    currentLocale,
    selectedCategory === 'all' ? undefined : selectedCategory
  );
  const { data: categories, isLoading: categoriesLoading } = useCategories(currentLocale);
  const { data: stories, isLoading: storiesLoading } = useStories(currentLocale);
  usePrerenderReady(!postsLoading);

  const filteredPosts = useMemo(() => {
    if (!posts || !searchQuery.trim()) return posts;
    const q = searchQuery.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        (post.excerpt || post.meta_desc || '').toLowerCase().includes(q) ||
        (post.category?.name || '').toLowerCase().includes(q)
    );
  }, [posts, searchQuery]);

  const latestStories = stories?.slice(0, 3) || [];
  const latestEvent = events[0];

  const trainingPath =
    currentLocale === 'pl'
      ? '/pl/szkolenia-cyberbezpieczenstwo-dla-firm'
      : currentLocale === 'cs'
        ? '/cs/skoleni-kyberneticka-bezpecnost-pro-firmy'
        : '/en/cybersecurity-training-for-companies';

  const navItems = [
    { label: t('blog.knowledgeHub.nav.blog'), href: '#latest-posts', icon: BookOpen },
    { label: t('blog.knowledgeHub.nav.caseStudies'), href: '#case-studies', icon: Trophy },
    { label: t('blog.knowledgeHub.nav.training'), href: '#training', icon: GraduationCap },
    { label: t('blog.knowledgeHub.nav.downloads'), href: '#downloads', icon: Download },
    { label: t('blog.knowledgeHub.nav.events'), href: '#events', icon: CalendarDays },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (href === '#featured-resource') {
        setTimeout(() => {
          const input = document.querySelector<HTMLInputElement>('#featured-resource-email');
          input?.focus();
        }, 700);
      }
    }
  };


  if (postsError) {
    return (
      <PageTemplate title={t('blog.knowledgeHub.title')} description={t('blog.knowledgeHub.subtitle')}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{t('blog.error')}</AlertDescription>
        </Alert>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate
      title={t('blog.knowledgeHub.title')}
      description={t('blog.knowledgeHub.subtitle')}
      deferPrerender
    >
      {/* Hero */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-slate-950 via-slate-950 to-compliance-950 py-10 md:py-16 px-6 mb-8 shadow-lg">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-innovation-800 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-1/4 w-56 h-56 bg-compliance-800 rounded-full blur-3xl opacity-30" />
          <div className="absolute top-1/2 left-0 w-40 h-40 bg-slate-800 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white tracking-tight">
            {t('blog.knowledgeHub.subtitle')}
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-8">
            {t('blog.knowledgeHub.description')}
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('blog.knowledgeHub.topics.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-primary"
              />

            </div>
          </div>

          {/* Quick nav */}
          <div className="flex flex-wrap justify-center gap-3">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/90 transition-colors hover:bg-white/10 hover:text-white"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Featured book */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="text-primary border-primary/30">
              {t('blog.knowledgeHub.featured.label')}
            </Badge>
          </div>
          <FeaturedBookSection />
        </section>

        {/* Case studies */}
        <section id="case-studies">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                {t('blog.knowledgeHub.caseStudies.title')}
              </h2>
              <p className="text-muted-foreground">
                {t('blog.knowledgeHub.caseStudies.subtitle')}
              </p>
            </div>
            <Link to={`/${currentLocale}/success-stories`}>
              <Button variant="outline" className="group hidden sm:inline-flex">
                {t('blog.knowledgeHub.caseStudies.cta')}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {storiesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-video" />
                  <CardHeader>
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : latestStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestStories.map((story) => {
                const imageUrl = story.featured_image_url || story.og_image_url || '/og-homepage.png';
                return (
                  <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <Link to={`/${currentLocale}/success-stories/${story.slug}`} className="block">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={story.featured_image_alt || story.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                          width={800}
                          height={450}
                          loading="lazy"
                        />
                      </div>
                    </Link>
                    <CardHeader>
                      {story.industry && <Badge variant="secondary" className="mb-2">{story.industry}</Badge>}
                      <Link to={`/${currentLocale}/success-stories/${story.slug}`}>
                        <CardTitle className="line-clamp-2 text-lg hover:text-primary transition-colors cursor-pointer">
                          {story.title}
                        </CardTitle>
                      </Link>
                      <CardDescription className="line-clamp-3">
                        {story.summary || story.meta_desc}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link to={`/${currentLocale}/success-stories/${story.slug}`}>
                        <Button variant="ghost" size="sm" className="group p-0 h-auto">
                          {t('blog.readMore')}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground">{t('blog.notFound')}</p>
          )}
        </section>

        {/* Training */}
        <section id="training" className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-8 md:p-12 text-white">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">{t('blog.knowledgeHub.training.title')}</h2>
            <p className="text-white/80">{t('blog.knowledgeHub.training.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors">
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2 border-white/20 text-white/80">
                  {t('blog.knowledgeHub.training.card1.label')}
                </Badge>
                <CardTitle className="text-white text-xl">{t('blog.knowledgeHub.training.card1.title')}</CardTitle>
                <CardDescription className="text-white/70">
                  {t('blog.knowledgeHub.training.card1.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={trainingPath}>
                  <Button className="group">
                    {t('blog.knowledgeHub.training.card1.cta')}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors">
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2 border-white/20 text-white/80">
                  {t('blog.knowledgeHub.training.card2.label')}
                </Badge>
                <CardTitle className="text-white text-xl">{t('blog.knowledgeHub.training.card2.title')}</CardTitle>
                <CardDescription className="text-white/70">
                  {t('blog.knowledgeHub.training.card2.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={`/${currentLocale}/contact`}>
                  <Button variant="outline" className="group border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
                    {t('blog.knowledgeHub.training.card2.cta')}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

              </CardContent>
            </Card>
          </div>
        </section>

        {/* Downloads */}
        <section id="downloads">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">{t('blog.knowledgeHub.downloads.title')}</h2>
            <p className="text-muted-foreground">{t('blog.knowledgeHub.downloads.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Book card */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
              <div className="aspect-video overflow-hidden bg-card flex items-center justify-center p-4">
                <img
                  src="/images/nowa-architektura-compliance-okladka.png"
                  alt={t('blog.knowledgeHub.downloads.bookTitle')}
                  className="h-full w-auto object-contain drop-shadow-xl"
                  width={270}
                  height={380}
                  loading="lazy"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{t('blog.knowledgeHub.downloads.bookLabel')}</Badge>
                </div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  {t('blog.knowledgeHub.downloads.bookSubtitle')}
                </p>
                <CardTitle className="text-lg">{t('blog.knowledgeHub.downloads.bookTitle')}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {t('blog.knowledgeHub.downloads.bookDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href="https://www.ksiegarnia.beck.pl/23755-nowa-architektura-compliance-zgodnosc-ryzyko-cyberbezpieczenstwo-i-sztuczna-inteligencja-wzory-do-pobrania-weronika-czaplewska"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  {t('blog.knowledgeHub.downloads.bookCta')}
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </a>
              </CardContent>
            </Card>

            {/* Calendar card — scrolls to featured resource */}
            <Card
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => scrollTo('#featured-resource')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  scrollTo('#featured-resource');
                }
              }}
            >
              <div className="aspect-video overflow-hidden bg-gradient-to-br from-compliance-50 to-innovation-50 flex items-center justify-center p-6">
                <img
                  src="/lovable-uploads/compliance-calendar-2026-new.png"
                  alt={t('blog.knowledgeHub.downloads.calendarTitle')}
                  className="h-full w-auto object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
                  width={270}
                  height={380}
                  loading="lazy"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {t('blog.knowledgeHub.downloads.calendarTitle')}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {t('blog.knowledgeHub.downloads.calendarDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                  {t('blog.knowledgeHub.downloads.cta')}
                  <Download className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                </span>
              </CardContent>
            </Card>

            {/* NIS2 / KSC checklist — coming soon */}
            <Card className="overflow-hidden border-dashed">
              <div className="aspect-video overflow-hidden bg-muted flex items-center justify-center p-6 relative">
                <img
                  src={nis2ChecklistThumb}
                  alt={t('blog.knowledgeHub.downloads.checklistTitle')}
                  className="h-full w-auto object-contain drop-shadow-xl opacity-60"
                  width={320}
                  height={240}
                  loading="lazy"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary">{t('blog.knowledgeHub.downloads.comingSoon')}</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg text-muted-foreground">{t('blog.knowledgeHub.downloads.checklistTitle')}</CardTitle>
                <CardDescription className="line-clamp-2">{t('blog.knowledgeHub.downloads.checklistDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="inline-flex items-center text-sm font-medium text-muted-foreground">
                  {t('blog.knowledgeHub.downloads.comingSoon')}
                </span>
              </CardContent>
            </Card>


          </div>

          <div className="mt-8">
            <EbookDownloadSection />
          </div>
        </section>


        {/* Blog posts */}
        <section id="latest-posts">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                {t('blog.knowledgeHub.latestPosts.title')}
              </h2>
              <p className="text-muted-foreground">{t('blog.knowledgeHub.subtitle')}</p>
            </div>
          </div>

          {/* Category filter */}
          <div className="mb-8 flex gap-2 flex-wrap">
            {categoriesLoading ? (
              <>
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-28" />
              </>
            ) : (
              <>
                <Badge
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory('all')}
                >
                  {t('blog.allCategories')}
                </Badge>
                {categories?.map((category) => (
                  <Badge
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Badge>
                ))}
              </>
            )}
          </div>

          {/* Posts grid */}
          {postsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-video" />
                  <CardHeader>
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-32" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredPosts && filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => {
                const readingTime = calculateReadingTime(post.body_rich as any);
                const imageUrl = post.og_image_url || '/og-homepage.png';

                return (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <Link to={`/${currentLocale}/blog/${post.slug}`} className="block">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.featured_image_url || imageUrl}
                          alt={post.featured_image_alt || post.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                          width={800}
                          height={450}
                          loading="lazy"
                        />
                      </div>
                    </Link>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        {post.category && <Badge variant="secondary">{post.category.name}</Badge>}
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{readingTime} {t('blog.readingTime')}</span>
                        </div>
                      </div>
                      <Link to={`/${currentLocale}/blog/${post.slug}`}>
                        <CardTitle className="line-clamp-2 text-lg hover:text-primary transition-colors cursor-pointer">
                          {post.title}
                        </CardTitle>
                      </Link>
                      <CardDescription className="line-clamp-3">
                        {post.excerpt || post.meta_desc}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {post.published_at
                              ? new Date(post.published_at).toLocaleDateString(currentLocale)
                              : new Date(post.created_at).toLocaleDateString(currentLocale)}
                          </span>
                        </div>
                        <Link to={`/${currentLocale}/blog/${post.slug}`}>
                          <Button variant="ghost" size="sm" className="group">
                            {t('blog.readMore')}
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t('blog.notFound')}</p>
            </div>
          )}
        </section>

        {/* Events */}
        <section id="events">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">{t('blog.knowledgeHub.events.title')}</h2>
            <p className="text-muted-foreground">{t('blog.knowledgeHub.events.subtitle')}</p>
          </div>

          {latestEvent ? (
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-video md:aspect-auto md:min-h-[260px] overflow-hidden bg-slate-900 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Play className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-white/80 font-medium">{latestEvent.dateDisplay}</p>
                    <p className="text-white/60 text-sm mt-1">{latestEvent.duration}</p>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex gap-2 flex-wrap mb-3">
                    {latestEvent.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{latestEvent.title}</h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3">{latestEvent.subtitle}</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <Link to={`/${currentLocale}/events/${latestEvent.slug}`}>
                      <Button className="group">
                        {t('blog.knowledgeHub.events.cta')}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link to={`/${currentLocale}/events`}>
                      <Button variant="ghost" className="group">
                        {t('blog.viewAllStories')}
                        <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <p className="text-muted-foreground">{t('blog.notFound')}</p>
          )}
        </section>
      </div>
    </PageTemplate>
  );
};

export default BlogList;
