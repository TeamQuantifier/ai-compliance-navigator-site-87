import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, FolderSearch, Lock, CheckCircle, GitBranch, History, ShieldCheck, Upload, Search } from 'lucide-react';
import DocumentRepositoryMockup from '@/components/mockups/DocumentRepositoryMockup';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const DocumentsManagement = () => {
  const { t, currentLocale } = useLanguage();

  const steps = [
    { icon: Upload, key: 'upload' },
    { icon: GitBranch, key: 'version' },
    { icon: ShieldCheck, key: 'approve' },
    { icon: History, key: 'audit' },
  ];

  const capabilities = [
    { icon: FolderSearch, key: 'centralRepo' },
    { icon: GitBranch, key: 'versionControl' },
    { icon: Lock, key: 'accessControl' },
    { icon: History, key: 'lifecycle' },
    { icon: ShieldCheck, key: 'auditReady' },
    { icon: Search, key: 'search' },
  ];

  const frameworks = ['iso27001', 'nis2', 'dora', 'gdpr', 'soc2', 'esg'];
  const faqKeys = ['whatIsDms', 'versionControl', 'whichFrameworks', 'accessControl', 'auditTrail'];

  return (
    <PageTemplate
      title={t('seo.product.documentsManagement.title')}
      description={t('seo.product.documentsManagement.description')}
    >
      <div className="max-w-6xl mx-auto">
        {/* 1. Hero */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t('product.documentsManagement.hero.title')}
                </h2>
                <p className="text-lg opacity-90 mb-6">
                  {t('product.documentsManagement.hero.subtitle')}
                </p>
                <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90" asChild>
                  <Link to={`/${currentLocale}/contact`}>
                    {t('product.documentsManagement.hero.bookDemo')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="lg:w-1/2">
                <DocumentRepositoryMockup />
              </div>
            </div>
          </div>
        </section>

        {/* 2. How It Works */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
            {t('product.documentsManagement.howItWorks.title')}
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
            {t('product.documentsManagement.howItWorks.subtitle')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.key} className="text-center">
                <div className="relative mx-auto mb-4">
                  <div className="h-14 w-14 rounded-full bg-[#9b87f5]/10 flex items-center justify-center mx-auto">
                    <step.icon className="h-7 w-7 text-[#7E69AB]" />
                  </div>
                  <span className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-[#9b87f5] text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold mb-2">{t(`product.documentsManagement.howItWorks.steps.${step.key}.title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`product.documentsManagement.howItWorks.steps.${step.key}.description`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Platform Mockup */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
            {t('product.documentsManagement.dashboard.title')}
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
            {t('product.documentsManagement.dashboard.subtitle')}
          </p>
          <div className="max-w-4xl mx-auto">
            <DocumentRepositoryMockup />
          </div>
        </section>

        {/* 4. Key Capabilities */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            {t('product.documentsManagement.capabilities.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <Card key={cap.key} className="border-[#9b87f5]/20 hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-[#9b87f5]/10 flex items-center justify-center mb-4">
                    <cap.icon className="h-6 w-6 text-[#7E69AB]" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t(`product.documentsManagement.capabilities.${cap.key}.title`)}</h3>
                  <p className="text-muted-foreground text-sm">{t(`product.documentsManagement.capabilities.${cap.key}.description`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 5. Framework Coverage */}
        <section className="mb-16 bg-slate-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-3 text-center">
            {t('product.documentsManagement.frameworks.title')}
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
            {t('product.documentsManagement.frameworks.subtitle')}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {frameworks.map((fw) => (
              <div key={fw} className="bg-white rounded-lg p-4 text-center border border-slate-200 hover:border-[#9b87f5]/40 transition-colors">
                <h3 className="font-semibold text-sm mb-1">{t(`product.documentsManagement.frameworks.items.${fw}.name`)}</h3>
                <p className="text-xs text-muted-foreground">{t(`product.documentsManagement.frameworks.items.${fw}.desc`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {t('product.documentsManagement.faq.title')}
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqKeys.map((key) => (
                <AccordionItem key={key} value={key}>
                  <AccordionTrigger className="text-left">
                    {t(`product.documentsManagement.faq.${key}.question`)}
                  </AccordionTrigger>
                  <AccordionContent>
                    {t(`product.documentsManagement.faq.${key}.answer`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* 7. CTA */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                {t('product.documentsManagement.cta.title')}
              </h2>
              <p className="text-xl opacity-90 mb-8">
                {t('product.documentsManagement.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90 px-8" asChild>
                  <Link to={`/${currentLocale}/contact`}>
                    {t('product.documentsManagement.cta.bookDemo')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" className="border-white text-white hover:bg-white/10 border bg-transparent px-8" asChild>
                  <Link to={`/${currentLocale}/plans`}>
                    {t('product.documentsManagement.cta.explorePlans')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default DocumentsManagement;
