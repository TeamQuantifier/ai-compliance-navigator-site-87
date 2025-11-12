
import React from 'react';
import DetailedCaseStudy, { 
  DetailedCaseStudyHeader,
  Section,
  CheckListItem,
  SummaryBox
} from './DetailedCaseStudy';
import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FashionRetailerCaseStudy = () => {
  const { t } = useTranslation();
  
  return (
    <DetailedCaseStudy
      header={
        <DetailedCaseStudyHeader
          category={t('successStoriesPage.fashionRetailer.category')}
          title={t('successStoriesPage.fashionRetailer.title')}
          details={
            <>
              <p className="font-medium">{t('successStoriesPage.fashionRetailer.industryLabel')}: {t('successStoriesPage.fashionRetailer.industry')}</p>
              <p>{t('successStoriesPage.fashionRetailer.employees')}</p>
              <p>{t('successStoriesPage.fashionRetailer.reportingYear')}</p>
            </>
          }
          imageSrc="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=300&h=150&fit=crop"
          imageAlt={t('successStoriesPage.fashionRetailer.imageAlt')}
        />
      }
    >
      <Section title={t('successStoriesPage.fashionRetailer.section1Title')}>
        <p className="text-slate-700">
          {t('successStoriesPage.fashionRetailer.section1Text')}
        </p>
      </Section>
      
      <Section title={t('successStoriesPage.fashionRetailer.section2Title')}>
        <p className="text-slate-700 mb-4">
          {t('successStoriesPage.fashionRetailer.section2Intro')}
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.fashionRetailer.section2Item1')}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.fashionRetailer.section2Item2')}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.fashionRetailer.section2Item3')}</span>
          </li>
        </ul>
        <p className="text-slate-700 mt-4">
          {t('successStoriesPage.fashionRetailer.section2Outro')}
        </p>
      </Section>
      
      <Section title={t('successStoriesPage.fashionRetailer.section3Title')}>
        <p className="text-slate-700 mb-4">
          {t('successStoriesPage.fashionRetailer.section3Intro')}
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.fashionRetailer.section3Item1')}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.fashionRetailer.section3Item2')}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.fashionRetailer.section3Item3')}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.fashionRetailer.section3Item4')}</span>
          </li>
        </ul>
      </Section>
      
      <Section title={t('successStoriesPage.fashionRetailer.section4Title')}>
        <p className="text-slate-700 mb-4">
          {t('successStoriesPage.fashionRetailer.section4Intro')}
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.fashionRetailer.section4Item1')}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.fashionRetailer.section4Item2')}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.fashionRetailer.section4Item3')}</span>
          </li>
        </ul>
        <p className="text-slate-700 mt-4">
          {t('successStoriesPage.fashionRetailer.section4Outro')}
        </p>
      </Section>
      
      <Section title={t('successStoriesPage.fashionRetailer.section5Title')}>
        <p className="text-slate-700 mb-4">
          {t('successStoriesPage.fashionRetailer.section5Intro')}
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.fashionRetailer.section5Item1')}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.fashionRetailer.section5Item2')}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.fashionRetailer.section5Item3')}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">{t('successStoriesPage.fashionRetailer.section5Item4')}</span>
          </li>
        </ul>
      </Section>
      
      <SummaryBox title={t('successStoriesPage.fashionRetailer.summaryTitle')}>
        <CheckListItem>
          <span className="font-medium">{t('successStoriesPage.fashionRetailer.summaryItem1')}</span>{t('successStoriesPage.fashionRetailer.summaryItem1Text')}
        </CheckListItem>
        <CheckListItem>
          <span className="font-medium">{t('successStoriesPage.fashionRetailer.summaryItem2')}</span>{t('successStoriesPage.fashionRetailer.summaryItem2Text')}
        </CheckListItem>
        <CheckListItem>
          <span className="font-medium">{t('successStoriesPage.fashionRetailer.summaryItem3')}</span>{t('successStoriesPage.fashionRetailer.summaryItem3Text')}
        </CheckListItem>
        <CheckListItem>
          <span className="font-medium">{t('successStoriesPage.fashionRetailer.summaryItem4')}</span>{t('successStoriesPage.fashionRetailer.summaryItem4Text')}
        </CheckListItem>
      </SummaryBox>
    </DetailedCaseStudy>
  );
};

export default FashionRetailerCaseStudy;
