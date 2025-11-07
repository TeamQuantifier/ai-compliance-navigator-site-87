import { useState } from 'react';
import { Brain, BarChart3, Database, ShieldAlert } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTemplate from '@/components/PageTemplate';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const RiskAssessment = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("risk-assessment");
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Navigate to the corresponding page based on tab selection
    switch (value) {
      case "ai-officer":
        navigate("/product/ai-compliance-officer");
        break;
      case "analytics":
        navigate("/product/analytics-dashboards");
        break;
      case "task-hub":
        navigate("/product/task-data-management");
        break;
      case "risk-assessment":
        // Already on this page
        break;
    }
  };

  return (
    <PageTemplate
      title={t('product.riskAssessment.title')}
      description={t('product.riskAssessment.description')}
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-lg text-slate-700 mb-6">
          {t('product.riskAssessment.placeholder')}
        </p>
      </div>

      <div className="mt-16 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-6 text-center">Explore Other Product Features</h3>
        
        <Tabs defaultValue="risk-assessment" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-transparent h-auto p-0">
            <TabsTrigger value="ai-officer" className={`data-[state=active]:bg-compliance-100 data-[state=active]:border-compliance-500 border-2 border-transparent px-4 py-3 h-auto`}>
              <Brain className="h-5 w-5 mr-2" />
              <span>{t('product.taskDataManagement.tabs.aiOfficer')}</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className={`data-[state=active]:bg-innovation-100 data-[state=active]:border-innovation-500 border-2 border-transparent px-4 py-3 h-auto`}>
              <BarChart3 className="h-5 w-5 mr-2" />
              <span>{t('product.taskDataManagement.tabs.analytics')}</span>
            </TabsTrigger>
            <TabsTrigger value="task-hub" className={`data-[state=active]:bg-slate-800 data-[state=active]:text-white data-[state=active]:border-compliance-500 border-2 border-transparent px-4 py-3 h-auto`}>
              <Database className="h-5 w-5 mr-2" />
              <span>{t('product.taskDataManagement.tabs.taskHub')}</span>
            </TabsTrigger>
            <TabsTrigger value="risk-assessment" className={`data-[state=active]:bg-innovation-100 data-[state=active]:border-innovation-500 border-2 border-transparent px-4 py-3 h-auto`}>
              <ShieldAlert className="h-5 w-5 mr-2" />
              <span>{t('product.taskDataManagement.tabs.riskAssessment')}</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </PageTemplate>
  );
};

export default RiskAssessment;
