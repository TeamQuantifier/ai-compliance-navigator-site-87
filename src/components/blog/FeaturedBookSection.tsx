import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import bookCoverAsset from '@/assets/nowa-architektura-compliance-okladka.png.asset.json';

const FeaturedBookSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-card border border-border rounded-lg p-8 md:p-12 mb-8 shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left column - content */}
        <div className="space-y-6 text-foreground">
          <div>
            <Badge variant="secondary" className="mb-3">
              {t('blog.knowledgeHub.downloads.bookLabel')}
            </Badge>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
              {t('blog.knowledgeHub.downloads.bookSubtitle')}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {t('blog.knowledgeHub.downloads.bookTitle')}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {t('blog.knowledgeHub.downloads.bookDesc')}
            </p>
          </div>

          <Button asChild size="lg" className="group">
            <a
              href="https://www.ksiegarnia.beck.pl/23755-nowa-architektura-compliance-zgodnosc-ryzyko-cyberbezpieczenstwo-i-sztuczna-inteligencja-wzory-do-pobrania-weronika-czaplewska"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('blog.knowledgeHub.downloads.bookCta')}
              <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </Button>
        </div>

        {/* Right column - image */}
        <div className="flex justify-center rounded-lg bg-card p-6 md:p-8">
          <img
            src={bookCoverAsset.url}
            alt={t('blog.knowledgeHub.downloads.bookTitle')}
            className="max-w-[200px] md:max-w-[240px] h-auto drop-shadow-2xl"
            width={270}
            height={380}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedBookSection;
