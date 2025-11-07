import PageTemplate from '@/components/PageTemplate';
import { useLanguage } from '@/contexts/LanguageContext';

const ValueChain = () => {
  const { t } = useLanguage();
  
  return (
    <PageTemplate
      title={t('product.valueChain.title')}
      description={t('product.valueChain.description')}
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-lg text-slate-700 mb-6">
          {t('product.valueChain.placeholder')}
        </p>
      </div>
    </PageTemplate>
  );
};

export default ValueChain;
