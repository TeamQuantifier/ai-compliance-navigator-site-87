import { useLanguage } from '@/contexts/LanguageContext';
import PageTemplate from '@/components/PageTemplate';

const InformationSecurityPolicy = () => {
  const { t } = useLanguage();

  const commitments = t('legal.informationSecurity.commitments.items', { returnObjects: true }) as unknown;
  const scope = t('legal.informationSecurity.scope.items', { returnObjects: true }) as unknown;
  const employees = t('legal.informationSecurity.employees.items', { returnObjects: true }) as unknown;
  const suppliers = t('legal.informationSecurity.suppliers.items', { returnObjects: true }) as unknown;

  const commitmentsArr = Array.isArray(commitments) ? commitments : [];
  const scopeArr = Array.isArray(scope) ? scope : [];
  const employeesArr = Array.isArray(employees) ? employees : [];
  const suppliersArr = Array.isArray(suppliers) ? suppliers : [];

  return (
    <PageTemplate
      title={t('legal.informationSecurity.title')}
      description={t('legal.informationSecurity.metaDescription')}
    >
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          {t('legal.informationSecurity.title')}
        </h1>
        <p className="text-slate-600 mb-2">Quantifier.ai sp. z o.o.</p>
        <p className="text-slate-500 mb-8">
          {t('legal.informationSecurity.lastUpdated')}: 2026-01-12
        </p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {t('legal.informationSecurity.intro.title')}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {t('legal.informationSecurity.intro.p1')}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {t('legal.informationSecurity.intro.p2')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {t('legal.informationSecurity.commitments.title')}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {t('legal.informationSecurity.commitments.intro')}
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4 mb-4">
              {commitmentsArr.map((item, idx) => (
                <li key={idx}>{String(item)}</li>
              ))}
            </ul>
            <p className="text-slate-600 leading-relaxed">
              {t('legal.informationSecurity.commitments.review')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {t('legal.informationSecurity.scope.title')}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {t('legal.informationSecurity.scope.intro')}
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              {scopeArr.map((item, idx) => (
                <li key={idx}>{String(item)}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {t('legal.informationSecurity.governance.title')}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {t('legal.informationSecurity.governance.content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {t('legal.informationSecurity.employees.title')}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {t('legal.informationSecurity.employees.intro')}
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              {employeesArr.map((item, idx) => (
                <li key={idx}>{String(item)}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {t('legal.informationSecurity.suppliers.title')}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {t('legal.informationSecurity.suppliers.intro')}
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4 mb-4">
              {suppliersArr.map((item, idx) => (
                <li key={idx}>{String(item)}</li>
              ))}
            </ul>
            <p className="text-slate-600 leading-relaxed">
              {t('legal.informationSecurity.suppliers.consequence')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {t('legal.informationSecurity.incidents.title')}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {t('legal.informationSecurity.incidents.content')}
            </p>
            <p className="text-slate-700 font-medium mb-4">
              {t('legal.informationSecurity.incidents.contactLabel')}{' '}
              <a href="mailto:security@quantifier.ai" className="text-primary hover:underline">
                security@quantifier.ai
              </a>
            </p>
            <p className="text-slate-600 leading-relaxed">
              {t('legal.informationSecurity.incidents.handling')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {t('legal.informationSecurity.review.title')}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {t('legal.informationSecurity.review.content')}
            </p>
          </section>
        </div>
      </div>
    </PageTemplate>
  );
};

export default InformationSecurityPolicy;
