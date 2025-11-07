import PageTemplate from '@/components/PageTemplate';
import { useLanguage } from '@/contexts/LanguageContext';

const ApiIntegrations = () => {
  const { t } = useLanguage();
  
  return (
    <PageTemplate
      title={t('product.apiIntegrations.title')}
      description={t('product.apiIntegrations.description')}
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-lg text-slate-700 mb-6">
          {t('product.apiIntegrations.placeholder')}
        </p>
      </div>
    </PageTemplate>
  );
};

export default ApiIntegrations;
