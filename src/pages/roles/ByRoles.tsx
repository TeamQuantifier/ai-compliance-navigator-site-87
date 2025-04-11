
import PageTemplate from '@/components/PageTemplate';
import { Users, UserCog, User, FileCheck, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ByRoles = () => {
  const roles = [
    {
      title: "Managers",
      description: "Tailored features for executives and compliance managers to oversee the entire compliance program.",
      capabilities: [
        "Comprehensive dashboards for compliance status",
        "Strategic risk assessment tools",
        "Resource allocation and planning",
        "Performance reporting and analytics",
        "Audit readiness evaluations"
      ],
      icon: <UserCog className="h-10 w-10 text-compliance-600" />,
      href: "/by-roles/managers",
      color: "bg-compliance-50"
    },
    {
      title: "Contributors",
      description: "Streamlined interfaces for team members responsible for implementing compliance measures.",
      capabilities: [
        "Task management and tracking",
        "Evidence collection and documentation",
        "Guided compliance procedures",
        "Collaboration tools and workflows",
        "Training and knowledge resources"
      ],
      icon: <User className="h-10 w-10 text-innovation-600" />,
      href: "/by-roles/contributors",
      color: "bg-innovation-50"
    },
    {
      title: "Auditors",
      description: "Specialized tools for internal and external auditors to verify compliance status.",
      capabilities: [
        "Evidence verification and validation",
        "Audit trail monitoring",
        "Compliance testing frameworks",
        "Gap analysis and remediation tracking",
        "Detailed reporting capabilities"
      ],
      icon: <FileCheck className="h-10 w-10 text-compliance-600" />,
      href: "/by-roles/auditor",
      color: "bg-compliance-50"
    }
  ];

  return (
    <PageTemplate
      title="Tailored Solutions by Role"
      description="Our platform offers specialized interfaces and capabilities designed for different roles within your organization."
    >
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-slate-100 rounded-full mb-8">
          <Users className="h-10 w-10 text-slate-700" />
        </div>
        <h2 className="text-2xl font-bold mb-4">
          Role-Based Access and Functionality
        </h2>
        <p className="text-lg text-slate-600">
          We understand that different roles have different compliance needs. Our platform provides tailored experiences for managers, contributors, and auditors, ensuring everyone has the right tools for their specific responsibilities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {roles.map((role) => (
          <Card key={role.title} className={`p-6 border border-slate-200 card-hover ${role.color}`}>
            <div className="flex justify-center mb-6">
              {role.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">{role.title}</h3>
            <p className="text-slate-600 mb-4 text-center">{role.description}</p>
            <div className="mb-6">
              <h4 className="font-medium text-slate-800 mb-2 text-center">Key Capabilities:</h4>
              <ul className="space-y-2">
                {role.capabilities.map((capability) => (
                  <li key={capability} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-slate-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span className="text-slate-600">{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link to={role.href} className="block mt-auto">
              <Button variant="outline" className="w-full group" size="sm">
                Explore {role.title} Features
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </Card>
        ))}
      </div>
      
      <div className="mt-16 p-8 bg-slate-50 rounded-xl border border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 gradient-heading">
            Unified Compliance, Different Perspectives
          </h2>
          <p className="text-lg text-slate-600 mb-6">
            While each role sees a tailored view of the compliance landscape, all data and processes are integrated within a single, unified platform. This ensures consistency and collaboration across your entire organization.
          </p>
          <Button className="group">
            Schedule a Role-Based Demo
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default ByRoles;
