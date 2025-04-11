
import PageTemplate from '@/components/PageTemplate';
import { Shield, FileCheck, RefreshCw, Database, BarChart3, Eye, Lock, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      title: "AI-Powered Risk Assessment",
      description: "Leverage machine learning to identify and prioritize compliance risks across your organization.",
      icon: <Shield className="h-8 w-8 text-compliance-600" />
    },
    {
      title: "Automated Document Management",
      description: "Centralize and organize all compliance documents with automated version control and approval workflows.",
      icon: <FileCheck className="h-8 w-8 text-innovation-600" />
    },
    {
      title: "Workflow Automation",
      description: "Streamline compliance processes with customizable workflows and automated task assignments.",
      icon: <RefreshCw className="h-8 w-8 text-compliance-600" />
    },
    {
      title: "Secure Data Repository",
      description: "Store sensitive compliance data in a secure, encrypted environment with granular access controls.",
      icon: <Database className="h-8 w-8 text-innovation-600" />
    },
    {
      title: "Real-time Analytics",
      description: "Gain insights into your compliance posture with interactive dashboards and reports.",
      icon: <BarChart3 className="h-8 w-8 text-compliance-600" />
    },
    {
      title: "Continuous Monitoring",
      description: "Automatically track changes in regulatory requirements and your compliance status.",
      icon: <Eye className="h-8 w-8 text-innovation-600" />
    },
    {
      title: "Role-Based Access Control",
      description: "Ensure proper segregation of duties with customizable user roles and permissions.",
      icon: <Lock className="h-8 w-8 text-compliance-600" />
    },
    {
      title: "Integration Capabilities",
      description: "Connect with your existing systems through our comprehensive API and pre-built connectors.",
      icon: <Zap className="h-8 w-8 text-innovation-600" />
    }
  ];

  return (
    <PageTemplate
      title="Main Features"
      description="Explore the powerful capabilities of our AI-driven compliance platform that streamline and enhance your regulatory compliance efforts."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <Card key={feature.title} className="p-6 border border-slate-200 card-hover">
            <div className="mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-slate-600">{feature.description}</p>
          </Card>
        ))}
      </div>
      
      <div className="mt-16 p-8 bg-slate-50 rounded-xl border border-slate-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 gradient-heading">
            Why Choose Our Platform?
          </h2>
          <p className="text-lg text-slate-600 mb-6">
            Our AI-powered compliance platform offers a unique combination of automation, intelligence, and ease of use that sets it apart from traditional compliance management solutions.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <Shield className="h-6 w-6 text-compliance-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900">Reduced Compliance Burden</h3>
                <p className="text-slate-600">Automate routine compliance tasks to free up your team for higher-value activities.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Shield className="h-6 w-6 text-compliance-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900">Enhanced Risk Management</h3>
                <p className="text-slate-600">Identify and address compliance risks before they become problems.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Shield className="h-6 w-6 text-compliance-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900">Consistent Compliance</h3>
                <p className="text-slate-600">Ensure consistent application of compliance measures across your organization.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Shield className="h-6 w-6 text-compliance-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900">Audit-Ready Documentation</h3>
                <p className="text-slate-600">Maintain comprehensive compliance records that are always ready for audit.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Features;
