import PageTemplate from '@/components/PageTemplate';
import { useLanguage } from '@/contexts/LanguageContext';

const Contributors = () => {
  const { t } = useLanguage();
  
  return (
    <PageTemplate
      title={t('roles.contributors.title')}
      description={t('roles.contributors.description')}
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-lg text-muted-foreground mb-6">
          {t('byRoles.contributors.whoDescription')}
        </p>
      </div>
    </PageTemplate>
  );
};

export default Contributors;
