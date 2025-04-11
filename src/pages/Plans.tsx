
import PageTemplate from '@/components/PageTemplate';
import { Shield, Check, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Plans = () => {
  const plans = [
    {
      name: "Starter",
      price: "$499",
      period: "per month",
      description: "For small organizations with basic compliance needs.",
      features: [
        "AI Compliance Officer (Basic)",
        "5 User Accounts",
        "Document Management",
        "Task Management",
        "1 Compliance Framework",
        "Email Support"
      ],
      highlighted: false
    },
    {
      name: "Professional",
      price: "$1,499",
      period: "per month",
      description: "For growing companies with multiple compliance requirements.",
      features: [
        "AI Compliance Officer (Advanced)",
        "25 User Accounts",
        "Document Management",
        "Task & Data Management",
        "5 Compliance Frameworks",
        "Analytics & Dashboards",
        "API Access (Limited)",
        "Email & Phone Support",
        "Dedicated Account Manager"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations with complex compliance needs.",
      features: [
        "AI Compliance Officer (Enterprise)",
        "Unlimited User Accounts",
        "Advanced Document Management",
        "Comprehensive Task & Data Management",
        "Unlimited Compliance Frameworks",
        "Advanced Analytics & Custom Dashboards",
        "Full API Access",
        "24/7 Priority Support",
        "Dedicated Account Team",
        "Custom Integrations",
        "On-premise Deployment Options"
      ],
      highlighted: false
    }
  ];

  return (
    <PageTemplate
      title="Pricing Plans"
      description="Flexible pricing options to meet the compliance needs of organizations of all sizes."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan) => (
          <Card 
            key={plan.name} 
            className={`p-6 border ${plan.highlighted ? 'border-primary shadow-lg relative overflow-hidden' : 'border-slate-200'} card-hover`}
          >
            {plan.highlighted && (
              <div className="absolute top-0 right-0">
                <div className="bg-primary text-white text-xs font-semibold px-3 py-1 transform rotate-45 translate-x-6 -translate-y-1">
                  Popular
                </div>
              </div>
            )}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-slate-500"> {plan.period}</span>}
              </div>
              <p className="text-slate-600">{plan.description}</p>
            </div>
            
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button 
              className={`w-full ${plan.highlighted ? '' : 'bg-slate-800 hover:bg-slate-700'} group`}
              variant={plan.highlighted ? "default" : "outline"}
            >
              {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Card>
        ))}
      </div>
      
      <div className="bg-slate-50 rounded-xl p-8 border border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <Shield className="h-12 w-12 mx-auto mb-6 text-primary" />
          <h2 className="text-2xl font-bold mb-4 gradient-heading">
            Need a Custom Solution?
          </h2>
          <p className="text-lg text-slate-600 mb-6">
            We understand that every organization has unique compliance needs. Contact our sales team to discuss a customized solution that perfectly fits your requirements.
          </p>
          <Button size="lg" className="group">
            Contact Our Sales Team
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Plans;
