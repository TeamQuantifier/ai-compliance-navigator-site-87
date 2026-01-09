import { useLanguage } from '@/contexts/LanguageContext';
import PageTemplate from '@/components/PageTemplate';

const PrivacyPolicy = () => {
  const { t } = useLanguage();

  return (
    <PageTemplate 
      title={t('legal.privacy.title')} 
      description={t('legal.privacy.metaDescription')}
    >
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {t('legal.privacy.title')}
        </h1>
        <p className="text-slate-500 mb-8">
          {t('legal.cookies.lastUpdated')}: 2026-01-09
        </p>

        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 leading-relaxed mb-6">
            {t('legal.privacy.intro')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {t('legal.privacy.dataCollection.title')}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {t('legal.privacy.dataCollection.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {t('legal.privacy.dataUse.title')}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {t('legal.privacy.dataUse.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {t('legal.privacy.thirdParty.title')}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {t('legal.privacy.thirdParty.content')}
            </p>
            <p className="text-slate-600 leading-relaxed">
              <a 
                href="https://policies.google.com/privacy" 
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('legal.privacy.thirdParty.googleLink')}
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {t('legal.privacy.contact.title')}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {t('legal.privacy.contact.content')}
            </p>
          </section>
        </div>
      </div>
    </PageTemplate>
  );
};

export default PrivacyPolicy;
