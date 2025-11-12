
import React from 'react';
import DetailedCaseStudy, { 
  DetailedCaseStudyHeader,
  Section,
  CheckListItem,
  SummaryBox
} from './DetailedCaseStudy';
import { Check, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FinancialServicesCaseStudy = () => {
  const { t } = useTranslation();
  
  return (
    <DetailedCaseStudy
      header={
        <DetailedCaseStudyHeader
          category={t('successStoriesPage.financialServices.category')}
          title={t('successStoriesPage.financialServices.title')}
          details={
            <>
              <p className="font-medium">{t('successStoriesPage.financialServices.industryLabel')}: {t('successStoriesPage.financialServices.industry')}</p>
            </>
          }
          imageSrc="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=150&fit=crop"
          imageAlt={t('successStoriesPage.financialServices.imageAlt')}
        />
      }
    >
      <Section title={t('successStoriesPage.financialServices.section1Title')}>
        <p className="text-slate-700">
          {t('successStoriesPage.financialServices.section1Text')}
        </p>
      </Section>
      
      <Section title={t('successStoriesPage.financialServices.section2Title')}>
        <p className="text-slate-700 mb-4">
          {t('successStoriesPage.financialServices.section2Text')}
        </p>
      </Section>
      
      <Section title={t('successStoriesPage.financialServices.section3Title')}>
        <p className="text-slate-700 mb-4">
          {t('successStoriesPage.financialServices.section3Intro')}
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.financialServices.section3Item1')}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.financialServices.section3Item2')}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.financialServices.section3Item3')}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.financialServices.section3Item4')}</span>
          </li>
        </ul>
        <p className="text-slate-700 mt-4">
          {t('successStoriesPage.financialServices.section3Outro')}
        </p>
      </Section>
      
      <Section title={t('successStoriesPage.financialServices.section4Title')}>
        <div className="space-y-4">
          <div>
            <p className="font-medium text-slate-900">{t('successStoriesPage.financialServices.section4Benefit1Title')}</p>
            <p className="text-slate-700">{t('successStoriesPage.financialServices.section4Benefit1Text')}</p>
          </div>
          <div>
            <p className="font-medium text-slate-900">{t('successStoriesPage.financialServices.section4Benefit2Title')}</p>
            <p className="text-slate-700">{t('successStoriesPage.financialServices.section4Benefit2Text')}</p>
          </div>
          <div>
            <p className="font-medium text-slate-900">{t('successStoriesPage.financialServices.section4Benefit3Title')}</p>
            <p className="text-slate-700">{t('successStoriesPage.financialServices.section4Benefit3Text')}</p>
          </div>
          <div>
            <p className="font-medium text-slate-900">{t('successStoriesPage.financialServices.section4Benefit4Title')}</p>
            <p className="text-slate-700">{t('successStoriesPage.financialServices.section4Benefit4Text')}</p>
          </div>
        </div>
      </Section>
      
      <Section title={t('successStoriesPage.financialServices.section5Title')}>
        <p className="text-slate-700 mb-4">
          {t('successStoriesPage.financialServices.section5Intro')}
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <li className="flex items-start gap-2">
            <Check className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.financialServices.section5Item1')}</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.financialServices.section5Item2')}</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.financialServices.section5Item3')}</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.financialServices.section5Item4')}</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.financialServices.section5Item5')}</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.financialServices.section5Item6')}</span>
          </li>
        </ul>
        <p className="text-slate-700 mt-4">
          {t('successStoriesPage.financialServices.section5Outro')}
        </p>
      </Section>
      
      <Section title={t('successStoriesPage.financialServices.section6Title')}>
        <p className="text-slate-700 mb-4">
          {t('successStoriesPage.financialServices.section6Text1')}
        </p>
        <p className="text-slate-700">
          {t('successStoriesPage.financialServices.section6Text2')}
        </p>
      </Section>
    </DetailedCaseStudy>
  );
};

export default FinancialServicesCaseStudy;
