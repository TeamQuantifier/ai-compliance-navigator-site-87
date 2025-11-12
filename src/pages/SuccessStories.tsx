import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Building, Users } from 'lucide-react';
import CaseStudy from '@/components/case-studies/CaseStudy';
import FashionRetailerCaseStudy from '@/components/case-studies/FashionRetailerCaseStudy';
import LogisticsGroupCaseStudy from '@/components/case-studies/LogisticsGroupCaseStudy';
import FinancialServicesCaseStudy from '@/components/case-studies/FinancialServicesCaseStudy';
import StatsSection from '@/components/case-studies/StatsSection';
import { simpleCaseStudies } from '@/data/caseStudies';
import { useTranslation } from 'react-i18next';

const SuccessStories = () => {
  const { t } = useTranslation();
  const impactStats = [
    {
      icon: <Building />,
      value: "50+",
      label: t('successStoriesPage.stats.partnerships'), 
      bgColor: "bg-compliance-100",
      iconColor: "text-compliance-600"
    },
    {
      icon: <Users />,
      value: "10,000+",
      label: t('successStoriesPage.stats.userHoursSaved'),
      bgColor: "bg-innovation-100",
      iconColor: "text-innovation-600"
    },
    {
      icon: <Building />,
      value: "250+",
      label: t('successStoriesPage.stats.companiesSupported'),
      bgColor: "bg-compliance-100",
      iconColor: "text-compliance-600"
    }
  ];

  return (
    <PageTemplate
      title={t('successStoriesPage.title')}
      description={t('successStoriesPage.description')}
    >
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 gap-16">
          {simpleCaseStudies.map((study, index) => (
            <CaseStudy key={index} {...study} />
          ))}
        </div>
        
        <div className="mt-16">
          <FashionRetailerCaseStudy />
        </div>
        
        <div className="mt-16">
          <LogisticsGroupCaseStudy />
        </div>
        
        <div className="mt-16">
          <FinancialServicesCaseStudy />
        </div>
        
        <StatsSection 
          title={t('successStoriesPage.impactTitle')}
          stats={impactStats}
        />
      </div>
    </PageTemplate>
  );
};

export default SuccessStories;
