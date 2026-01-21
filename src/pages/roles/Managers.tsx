import PageTemplate from '@/components/PageTemplate';
import { useLanguage } from '@/contexts/LanguageContext';

const Managers = () => {
  const { t } = useLanguage();
  
  return (
    <PageTemplate
      title={t('roles.managers.title')}
      description={t('roles.managers.description')}
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-lg text-muted-foreground mb-6">
          {t('byRoles.managers.whoDescription')}
        </p>
      </div>
    </PageTemplate>
  );
};

export default Managers;
