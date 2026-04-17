import PageTemplate from '@/components/PageTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, QrCode, FileCheck, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import FAQSection from '@/components/seo/FAQSection';

const hubCards = [
  { key: 'dpp', icon: QrCode, color: 'green' },
  { key: 'epd', icon: FileCheck, color: 'blue' },
  { key: 'lca', icon: BarChart3, color: 'amber' },
] as const;

const colorMap: Record<string, { bg: string; border: string; icon: string; badge: string; btn: string; btnHover: string }> = {
  green: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-600', badge: 'bg-green-100 text-green-800', btn: 'bg-green-600 hover:bg-green-700', btnHover: '' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', badge: 'bg-blue-100 text-blue-800', btn: 'bg-blue-600 hover:bg-blue-700', btnHover: '' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-600', badge: 'bg-amber-100 text-amber-800', btn: 'bg-amber-600 hover:bg-amber-700', btnHover: '' },
};

const ProductLevelHub = () => {
  const { t, currentLocale } = useLanguage();

  return (
    <PageTemplate
      title={t('productLevelHub.title')}
      description={t('productLevelHub.description')}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <section className="text-center mb-16">
          <span className="inline-block bg-emerald-100 text-emerald-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            ESPR · ISO 14025 · ISO 14040
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t('productLevelHub.hero.title')}
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {t('productLevelHub.hero.subtitle')}
          </p>
        </section>

        {/* Cards */}
        <section className="grid md:grid-cols-3 gap-8 mb-16">
          {hubCards.map(({ key, icon: Icon, color }) => {
            const c = colorMap[color];
            const card = t(`productLevelHub.cards.${key}`, { returnObjects: true }) as { badge: string; title: string; description: string; features: string[]; cta: string; href: string };
            if (!card || typeof card === 'string') return null;
            return (
              <Card key={key} className={`p-6 ${c.bg} ${c.border} border-2 flex flex-col`}>
                <Icon className={`h-10 w-10 ${c.icon} mb-4`} />
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit ${c.badge}`}>
                  {card.badge}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mb-2">{card.title}</h2>
                <p className="text-sm text-slate-600 mb-4 flex-grow">{card.description}</p>
                <ul className="space-y-1.5 mb-6 text-sm text-slate-700">
                  {Array.isArray(card.features) && card.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className={`mt-1 h-1.5 w-1.5 rounded-full ${c.icon} bg-current flex-shrink-0`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button className={`${c.btn} text-white w-full`} asChild>
                  <Link to={`/${currentLocale}${card.href}`}>
                    {card.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </Card>
            );
          })}
        </section>

        {/* TÜV Certification */}
        <section className="mb-16 bg-gradient-to-r from-slate-50 to-green-50 rounded-xl p-8 border border-slate-200">
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
            <img
              src="/lovable-uploads/edcfd427-dd46-414b-a937-7fcf86b91e04.png"
              alt="TÜV NORD Verified Product Certificate"
              loading="lazy"
              width="80"
              height="80"
              className="h-20 w-auto"
            />
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-slate-800 text-lg">{t('features.multiFramework.certified')}</h3>
              <p className="text-slate-600">{t('features.multiFramework.verifiedBy')}</p>
              <p className="text-sm text-slate-500 mt-1">{t('features.multiFramework.certDescription')}</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection
          title={t('productLevelHub.faq.title')}
          faqs={(t('productLevelHub.faq.items', { returnObjects: true }) as Array<{ question: string; answer: string }>) || []}
          pageUrl={`https://envirly.com/${currentLocale}/frameworks/product-level`}
        />

        {/* CTA */}
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold mb-3 text-slate-800">
            {t('productLevelHub.cta.title')}
          </h2>
          <p className="text-lg text-slate-700 mb-6 max-w-3xl mx-auto">
            {t('productLevelHub.cta.description')}
          </p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
            <Link to={`/${currentLocale}/contact`}>
              {t('productLevelHub.cta.bookDemo')} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default ProductLevelHub;
