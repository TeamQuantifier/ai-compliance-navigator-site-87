import PageTemplate from '@/components/PageTemplate';
import { useLanguage } from '@/contexts/LanguageContext';

const Auditor = () => {
  const { t } = useLanguage();
  
  return (
    <PageTemplate
      title={t('roles.auditors.title')}
      description={t('roles.auditors.description')}
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-lg text-muted-foreground mb-6">
          {t('byRoles.auditors.whoDescription')}
        </p>
      </div>
    </PageTemplate>
  );
};

export default Auditor;
