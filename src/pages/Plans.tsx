import PageTemplate from '@/components/PageTemplate';
import { Shield, Check, ArrowRight, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const Plans = () => {
  const planFeatures = [{
    name: "Starter",
    subtitle: "For startups and small teams",
    description: "Perfect if you're getting started with compliance and want smart automation without the complexity.",
    features: ["Usage-based pricing (per request)", "Essential modules only", "Limited access to advanced features", "Basic reporting and dashboards"],
    cta: "Get started easily and scale as you grow.",
    buttonText: "Talk to Sales",
    highlighted: false
  }, {
    name: "Growth",
    subtitle: "For growing Mid-caps with broader compliance needs",
    description: "Balance flexibility with full functionality",
    features: ["Full access to all platform modules", "Unlimited users and roles (Admins, Contributors, Viewers, Auditors)", "Access to selected compliance frameworks", "Limits on number of requests (expandable)", "Limits on document storage limits (expandable)"],
    cta: "Powerful tools to streamline and scale your compliance operations.",
    buttonText: "Talk to Sales",
    highlighted: true
  }, {
    name: "Enterprise",
    subtitle: "For large-scale organizations and multi-entity teams",
    description: "Built for global scale and complexity—without compromising on control or visibility.",
    features: ["Multi-entity management from one platform", "Unlimited AI agent interactions", "Unlimited document storage", "Full access to all compliance frameworks", "Advanced role and permission controls", "Dedicated support and onboarding"],
    cta: "Enterprise-grade compliance. Simple, powerful, seamless.",
    buttonText: "Talk to Sales",
    highlighted: false
  }];
  return <PageTemplate title="Scalable plans for every stage of growth" description="Whether you're just starting out or managing compliance across global entities—there's a plan built for your needs.">
      <div className="max-w-3xl mx-auto text-center mb-12">
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {planFeatures.map(plan => <Card key={plan.name} className={`p-6 border ${plan.highlighted ? 'border-primary shadow-lg relative overflow-hidden' : 'border-slate-200'} h-full flex flex-col card-hover`}>
            {plan.highlighted && <div className="absolute top-0 right-0">
                <div className="bg-primary text-white text-xs font-semibold px-3 py-1 transform rotate-45 translate-x-6 -translate-y-1">
                  Popular
                </div>
              </div>}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="font-medium text-primary">{plan.subtitle}</p>
              <p className="text-slate-600 mt-3">{plan.description}</p>
            </div>
            
            <ul className="space-y-3 mb-6 flex-grow">
              {plan.features.map(feature => <li key={feature} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">{feature}</span>
                </li>)}
            </ul>
            
            <div className="mt-auto">
              <p className="text-sm font-medium mb-4">{plan.cta}</p>
              <Button className={`w-full ${plan.highlighted ? '' : 'bg-slate-800 hover:bg-slate-700'} group`} variant={plan.highlighted ? "default" : "outline"}>
                <MessageSquare className="mr-2 h-4 w-4" />
                {plan.buttonText}
              </Button>
            </div>
          </Card>)}
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
    </PageTemplate>;
};
export default Plans;