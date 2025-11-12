
import React from 'react';
import DetailedCaseStudy, { 
  DetailedCaseStudyHeader,
  Section,
  CheckListItem,
  SummaryBox
} from './DetailedCaseStudy';
import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LogisticsGroupCaseStudy = () => {
  const { t } = useTranslation();
  
  return (
    <DetailedCaseStudy
      header={
        <DetailedCaseStudyHeader
          category={t('successStoriesPage.logisticsGroup.category')}
          title={t('successStoriesPage.logisticsGroup.title')}
          details={
            <>
              <p className="font-medium">{t('successStoriesPage.logisticsGroup.industryLabel')}: {t('successStoriesPage.logisticsGroup.industry')}</p>
              <p>{t('successStoriesPage.logisticsGroup.employees')}</p>
              <p>{t('successStoriesPage.logisticsGroup.reportingYear')}</p>
            </>
          }
          imageSrc="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=300&h=150&fit=crop"
          imageAlt={t('successStoriesPage.logisticsGroup.imageAlt')}
        />
      }
    >
      <Section title={t('successStoriesPage.logisticsGroup.section1Title')}>
        <p className="text-slate-700">
          {t('successStoriesPage.logisticsGroup.section1Text')}
        </p>
      </Section>
      
      <Section title={t('successStoriesPage.logisticsGroup.section2Title')}>
        <p className="text-slate-700">
          {t('successStoriesPage.logisticsGroup.section2Text')}
        </p>
      </Section>
      
      <Section title={t('successStoriesPage.logisticsGroup.section3Title')}>
        <p className="text-slate-700 mb-4">
          {t('successStoriesPage.logisticsGroup.section3Intro')}
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.logisticsGroup.section3Item1')}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.logisticsGroup.section3Item2')}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.logisticsGroup.section3Item3')}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.logisticsGroup.section3Item4')}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.logisticsGroup.section3Item5')}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.logisticsGroup.section3Item6')}</span>
          </li>
        </ul>
      </Section>
      
      <Section title={t('successStoriesPage.logisticsGroup.section4Title')}>
        <p className="text-slate-700">
          {t('successStoriesPage.logisticsGroup.section4Text')}
        </p>
      </Section>
      
      <SummaryBox title={t('successStoriesPage.logisticsGroup.summaryTitle')}>
        <CheckListItem>
          {t('successStoriesPage.logisticsGroup.summaryItem1')}
        </CheckListItem>
        <CheckListItem>
          {t('successStoriesPage.logisticsGroup.summaryItem2')}
        </CheckListItem>
        <CheckListItem>
          {t('successStoriesPage.logisticsGroup.summaryItem3')}
        </CheckListItem>
        <CheckListItem>
          {t('successStoriesPage.logisticsGroup.summaryItem4')}
        </CheckListItem>
      </SummaryBox>
    </DetailedCaseStudy>
  );
};

export default LogisticsGroupCaseStudy;
