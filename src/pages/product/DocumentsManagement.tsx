import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, FolderSearch, ShieldCheck, CheckCircle, GitBranch, History, Lock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const DocumentsManagement = () => {
  const { t, currentLocale } = useLanguage();

  return (
    <PageTemplate
      title={t('seo.product.documentsManagement.title')}
      description={t('seo.product.documentsManagement.description')}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('product.documentsManagement.hero.title')}
              </h2>
              <p className="text-xl opacity-90 mb-6">
                {t('product.documentsManagement.hero.subtitle')}
              </p>
              <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90" asChild>
                <Link to={`/${currentLocale}/contact`}>
                  {t('product.documentsManagement.hero.bookDemo')} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <div className="space-y-3">
                  {['ISO 27001 — Information Security Policy', 'NIS2 — Incident Response Plan', 'GDPR — Data Processing Agreement'].map((doc, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                      <FileText className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm font-medium">{doc}</span>
                      <ShieldCheck className="h-4 w-4 ml-auto text-green-300" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-foreground">
            {t('product.documentsManagement.keyFeatures.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <FolderSearch className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('product.documentsManagement.keyFeatures.centralRepo.title')}</h3>
                    <p className="text-muted-foreground">{t('product.documentsManagement.keyFeatures.centralRepo.description')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <GitBranch className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('product.documentsManagement.keyFeatures.versionControl.title')}</h3>
                    <p className="text-muted-foreground">{t('product.documentsManagement.keyFeatures.versionControl.description')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <Lock className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('product.documentsManagement.keyFeatures.accessControl.title')}</h3>
                    <p className="text-muted-foreground">{t('product.documentsManagement.keyFeatures.accessControl.description')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Detailed Features */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-[#9b87f5]/20 flex items-center justify-center">
                  <History className="h-5 w-5 text-[#9b87f5]" />
                </div>
                <h3 className="text-xl font-bold">{t('product.documentsManagement.detailedFeatures.lifecycle.title')}</h3>
              </div>
              <p className="text-muted-foreground mb-5">
                {t('product.documentsManagement.detailedFeatures.lifecycle.description')}
              </p>
              <ul className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{t(`product.documentsManagement.detailedFeatures.lifecycle.feature${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-[#9b87f5]/20 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-[#9b87f5]" />
                </div>
                <h3 className="text-xl font-bold">{t('product.documentsManagement.detailedFeatures.auditReady.title')}</h3>
              </div>
              <p className="text-muted-foreground mb-5">
                {t('product.documentsManagement.detailedFeatures.auditReady.description')}
              </p>
              <ul className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{t(`product.documentsManagement.detailedFeatures.auditReady.feature${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
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
