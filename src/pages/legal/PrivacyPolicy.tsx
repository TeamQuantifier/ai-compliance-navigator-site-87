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
          {t('legal.privacy.lastUpdated')}: 2026-01-12
        </p>

        <div className="prose prose-slate max-w-none space-y-8">
          {/* Section 1: Data Controller */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {t('legal.privacy.admin.title')}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {t('legal.privacy.admin.content')}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {t('legal.privacy.admin.contactEmail')}{' '}
              <a href="mailto:contact@quantifier.ai" className="text-primary hover:underline">
                contact@quantifier.ai
              </a>
            </p>
          </section>

          {/* Section 2: Data We Process */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {t('legal.privacy.dataProcessed.title')}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {t('legal.privacy.dataProcessed.intro')}
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li>{t('legal.privacy.dataProcessed.formData')}</li>
              <li>{t('legal.privacy.dataProcessed.technicalData')}</li>
            </ul>
          </section>

          {/* Section 3: Purposes and Legal Bases */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {t('legal.privacy.purposes.title')}
            </h2>
            
            {/* 3.1 Newsletter */}
            <div className="mb-6">
              <h3 className="text-xl font-medium text-slate-700 mb-3">
                {t('legal.privacy.purposes.newsletter.title')}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                {t('legal.privacy.purposes.newsletter.content')}
              </p>
              <p className="text-slate-600 leading-relaxed mb-2">
                {t('legal.privacy.purposes.newsletter.legalBasis')}
              </p>
              <p className="text-slate-600 leading-relaxed mb-3">
                {t('legal.privacy.purposes.newsletter.electronicComm')}
              </p>
              <p className="text-slate-600 leading-relaxed">
                {t('legal.privacy.purposes.newsletter.withdrawal')}
              </p>
            </div>

            {/* 3.2 Contact */}
            <div className="mb-6">
              <h3 className="text-xl font-medium text-slate-700 mb-3">
                {t('legal.privacy.purposes.contact.title')}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                {t('legal.privacy.purposes.contact.content')}
              </p>
              <p className="text-slate-600 leading-relaxed">
                {t('legal.privacy.purposes.contact.legalBasis')}
              </p>
            </div>

            {/* 3.3 Security */}
            <div>
              <h3 className="text-xl font-medium text-slate-700 mb-3">
                {t('legal.privacy.purposes.security.title')}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                {t('legal.privacy.purposes.security.content')}
              </p>
              <p className="text-slate-600 leading-relaxed">
                {t('legal.privacy.purposes.security.legalBasis')}
              </p>
            </div>
          </section>

          {/* Section 4: Recipients */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {t('legal.privacy.recipients.title')}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {t('legal.privacy.recipients.intro')}
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4 mb-4">
              <li>{t('legal.privacy.recipients.hosting')}</li>
              <li>{t('legal.privacy.recipients.newsletter')}</li>
              <li>{t('legal.privacy.recipients.analytics')}</li>
              <li>{t('legal.privacy.recipients.legal')}</li>
            </ul>
            <p className="text-slate-600 leading-relaxed">
              {t('legal.privacy.recipients.processors')}
            </p>
          </section>

          {/* Section 5: Google Services */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {t('legal.privacy.googleServices.title')}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {t('legal.privacy.googleServices.content')}
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4 mb-4">
              <li>
                <a 
                  href="https://policies.google.com/privacy" 
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('legal.privacy.googleServices.privacyLink')}
                </a>
              </li>
              <li>
                <a 
                  href="https://policies.google.com/terms" 
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('legal.privacy.googleServices.termsLink')}
                </a>
              </li>
            </ul>
            <p className="text-slate-600 leading-relaxed">
              {t('legal.privacy.googleServices.recaptchaNote')}
            </p>
          </section>

          {/* Section 6: International Transfers */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {t('legal.privacy.internationalTransfer.title')}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {t('legal.privacy.internationalTransfer.content')}
            </p>
          </section>

          {/* Section 7: Retention */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {t('legal.privacy.retention.title')}
            </h2>
            <ul className="list-disc list-inside text-slate-600 space-y-3 ml-4">
              <li>{t('legal.privacy.retention.newsletter')}</li>
              <li>{t('legal.privacy.retention.contact')}</li>
              <li>{t('legal.privacy.retention.technical')}</li>
              <li>{t('legal.privacy.retention.cookies')}</li>
            </ul>
          </section>

          {/* Section 8: Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {t('legal.privacy.rights.title')}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {t('legal.privacy.rights.intro')}
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4 mb-4">
              <li>{t('legal.privacy.rights.access')}</li>
              <li>{t('legal.privacy.rights.rectification')}</li>
              <li>{t('legal.privacy.rights.erasure')}</li>
              <li>{t('legal.privacy.rights.restriction')}</li>
              <li>{t('legal.privacy.rights.portability')}</li>
              <li>{t('legal.privacy.rights.objection')}</li>
              <li>{t('legal.privacy.rights.withdrawConsent')}</li>
            </ul>
            <p className="text-slate-600 leading-relaxed">
              {t('legal.privacy.rights.howToExercise')}{' '}
              <a href="mailto:contact@quantifier.ai" className="text-primary hover:underline">
                contact@quantifier.ai
              </a>
            </p>
          </section>

          {/* Section 9: Complaint */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {t('legal.privacy.complaint.title')}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {t('legal.privacy.complaint.content')}
            </p>
          </section>

          {/* Section 10: Mandatory */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {t('legal.privacy.mandatory.title')}
            </h2>
            <ul className="list-disc list-inside text-slate-600 space-y-3 ml-4">
              <li>{t('legal.privacy.mandatory.newsletter')}</li>
              <li>{t('legal.privacy.mandatory.contact')}</li>
            </ul>
          </section>

          {/* Section 11: Automated Decisions */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {t('legal.privacy.automatedDecisions.title')}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {t('legal.privacy.automatedDecisions.content')}
            </p>
          </section>

          {/* Section 12: Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {t('legal.privacy.cookies.title')}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {t('legal.privacy.cookies.content')}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {t('legal.privacy.cookies.manage')}
            </p>
          </section>

          {/* Section 13: Changes */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {t('legal.privacy.changes.title')}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {t('legal.privacy.changes.content')}
            </p>
          </section>
        </div>
      </div>
    </PageTemplate>
  );
};

export default PrivacyPolicy;
