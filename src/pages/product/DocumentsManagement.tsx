import PageTemplate from '@/components/PageTemplate';
import { useLanguage } from '@/contexts/LanguageContext';

const DocumentsManagement = () => {
  const { t } = useLanguage();
  
  return (
    <PageTemplate
      title={t('product.documentsManagement.title')}
      description={t('product.documentsManagement.description')}
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-lg text-slate-700 mb-6">
          {t('product.documentsManagement.placeholder')}
        </p>
      </div>
    </PageTemplate>
  );
};

export default DocumentsManagement;
