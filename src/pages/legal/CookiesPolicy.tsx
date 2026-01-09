import { useLanguage } from '@/contexts/LanguageContext';
import PageTemplate from '@/components/PageTemplate';

const CookiesPolicy = () => {
  const { t } = useLanguage();

  return (
    <PageTemplate 
      title={t('legal.cookies.title')} 
      description={t('legal.cookies.metaDescription')}
    >
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {t('legal.cookies.title')}
        </h1>
        <p className="text-slate-500 mb-8">
          {t('legal.cookies.lastUpdated')}: 2026-01-09
        </p>

        {/* What are cookies */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            {t('legal.cookies.whatAreCookies.title')}
          </h2>
          <p className="text-slate-600 leading-relaxed">
            {t('legal.cookies.whatAreCookies.content')}
          </p>
        </section>

        {/* Cookies we use */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            {t('legal.cookies.cookiesWeUse.title')}
          </h2>
          
          <h3 className="text-xl font-medium text-slate-700 mb-3">Google Analytics</h3>
          <p className="text-slate-600 mb-4">
            {t('legal.cookies.cookiesWeUse.googleAnalytics')}
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4 ml-4">
            <li><code className="bg-slate-100 px-2 py-1 rounded text-sm">_ga</code> - {t('legal.cookies.cookiesWeUse.gaCookie')}</li>
            <li><code className="bg-slate-100 px-2 py-1 rounded text-sm">_ga_*</code> - {t('legal.cookies.cookiesWeUse.gaSessionCookie')}</li>
          </ul>
        </section>

        {/* Email collection */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            {t('legal.cookies.emailCollection.title')}
          </h2>
          <p className="text-slate-600 leading-relaxed">
            {t('legal.cookies.emailCollection.content')}
          </p>
        </section>

        {/* Managing cookies */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            {t('legal.cookies.manageCookies.title')}
          </h2>
          <p className="text-slate-600 leading-relaxed">
            {t('legal.cookies.manageCookies.content')}
          </p>
        </section>

        {/* Contact */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            {t('legal.cookies.contact.title')}
          </h2>
          <p className="text-slate-600 leading-relaxed">
            {t('legal.cookies.contact.content')}
          </p>
        </section>
      </div>
    </PageTemplate>
  );
};

export default CookiesPolicy;
