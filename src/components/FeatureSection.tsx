
import { Shield, FileCheck, Users, BarChart3, RefreshCw, Database, CheckCircle, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const FeatureCard = ({ title, description, icon, className }: FeatureCardProps) => {
  return (
    <Card className={cn("p-6 border border-slate-200 card-hover", className)}>
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </Card>
  );
};

const FeatureSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
            Comprehensive AI-Powered Compliance Suite
          </h2>
          <p className="text-lg text-slate-600">
            Our platform offers a complete set of tools to automate and streamline your compliance processes across multiple regulatory frameworks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="AI Compliance Officer"
            description="AI-driven compliance assistant that continuously monitors your systems, identifies issues, and suggests remediation steps."
            icon={<Shield className="h-10 w-10 text-compliance-600" />}
          />
          
          <FeatureCard
            title="Document Management"
            description="Centralized repository for all compliance documents with automated version control and audit trails."
            icon={<FileCheck className="h-10 w-10 text-innovation-600" />}
          />
          
          <FeatureCard
            title="Role-Based Access"
            description="Tailored interfaces and capabilities for managers, contributors, and auditors to ensure proper segregation of duties."
            icon={<Users className="h-10 w-10 text-compliance-600" />}
          />
          
          <FeatureCard
            title="Analytics & Dashboards"
            description="Real-time visualization of compliance status, risk levels, and key metrics to support informed decision-making."
            icon={<BarChart3 className="h-10 w-10 text-innovation-600" />}
          />
          
          <FeatureCard
            title="Automated Workflows"
            description="Define and automate compliance processes to ensure consistency, reduce manual effort, and minimize human error."
            icon={<RefreshCw className="h-10 w-10 text-compliance-600" />}
          />
          
          <FeatureCard
            title="Data Management"
            description="Secure handling of sensitive compliance data with built-in controls to ensure privacy and regulatory compliance."
            icon={<Database className="h-10 w-10 text-innovation-600" />}
          />
        </div>
        
        <div className="mt-16 bg-slate-50 rounded-2xl p-8 border border-slate-100">
          <div className="flex flex-col md:flex-row gap-8 md:items-center">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4 gradient-heading">
                Multi-Framework Support
              </h3>
              <p className="text-slate-600 mb-6">
                Our platform covers a wide range of compliance frameworks, allowing you to manage multiple regulatory requirements from a single interface.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-slate-700">Cybersecurity (SOC, NIS II, NIST)</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-slate-700">Information Security (ISO 27001)</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-slate-700">Data Privacy (GDPR, HIPAA, CCPA)</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-slate-700">Environmental (ISO 14001, GHG)</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-slate-700">ESG Reporting Standards</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-slate-700">Governance & Whistleblowing</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-medium text-slate-900">Framework Compatibility</h4>
                  <Zap className="h-5 w-5 text-yellow-500" />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">Cybersecurity</span>
                      <span className="text-sm text-slate-500">98%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-compliance-600 h-2 rounded-full" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">Data Privacy</span>
                      <span className="text-sm text-slate-500">95%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-innovation-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">ESG</span>
                      <span className="text-sm text-slate-500">92%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-compliance-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">Information Security</span>
                      <span className="text-sm text-slate-500">96%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-innovation-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">Environmental</span>
                      <span className="text-sm text-slate-500">90%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-compliance-400 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
