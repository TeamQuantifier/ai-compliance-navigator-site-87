
import PageTemplate from '@/components/PageTemplate';
import { Check, ArrowRight, Globe, MessageSquare, Sparkles, Users, BarChart, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Partners = () => {
  const partnerBenefits = [
    {
      title: "Expand your service offering with cutting-edge compliance tech",
      icon: <Sparkles className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Gain early access to innovation and product updates",
      icon: <Gift className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Co-market and co-sell to grow your customer base",
      icon: <Users className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Add measurable value to your clients' compliance efforts",
      icon: <BarChart className="h-8 w-8 text-blue-500" />,
    },
  ];

  return (
    <PageTemplate
      title="Partner With Us"
      description="Join a global ecosystem driving smarter, simpler compliance."
    >
      <div className="max-w-4xl mx-auto">
        <section className="mb-16">
          <p className="text-lg text-slate-700 mb-6">
            We collaborate with over 50+ trusted partners—including auditors, business connectors, 
            banks, consulting firms, and NGOs. Together, we're helping companies across the world 
            navigate the evolving landscape of compliance and sustainability with confidence.
          </p>
          <p className="text-lg text-slate-700 mb-6">
            Let's grow together. Whether you're advising clients, managing audits, or driving 
            innovation —there's a place for you in our partner network.
          </p>
        </section>
        
        <section className="mb-16 bg-slate-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 gradient-heading">Trusted by Partners Around the World</h2>
          <p className="text-lg text-slate-700 mb-8">
            We're proud to collaborate with organizations across:
          </p>
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <p className="text-center text-slate-500">Map: All EU member states, United Kingdom, United States, Mexico, Brazil</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-blue-500">
            <p className="text-lg italic text-slate-700 mb-4">
              "Working with this team has transformed the way we support our clients' compliance journeys—faster, 
              more transparent, and far more efficient."
            </p>
            <p className="font-medium text-slate-900">— ESG Consultant, UK</p>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 gradient-heading text-center">Why Partner With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partnerBenefits.map((benefit, index) => (
              <Card key={index} className="p-6 border border-slate-200 h-full flex items-start gap-4">
                <div className="flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900">{benefit.title}</h3>
                </div>
              </Card>
            ))}
          </div>
        </section>
        
        <section className="bg-slate-50 rounded-xl p-8 border border-slate-100 text-center">
          <h2 className="text-2xl font-bold mb-4 gradient-heading">
            Ready to become a partner?
          </h2>
          <p className="text-lg text-slate-600 mb-6">
            Join a trusted network driving real change in compliance and ESG.
          </p>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white group">
            <MessageSquare className="mr-2 h-5 w-5" />
            Contact Us
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </section>
      </div>
    </PageTemplate>
  );
};

export default Partners;
