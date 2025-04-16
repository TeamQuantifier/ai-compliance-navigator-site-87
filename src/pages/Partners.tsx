import PageTemplate from '@/components/PageTemplate';
import { Check, ArrowRight, Globe, MessageSquare, Sparkles, Users, BarChart, Gift, MapPin, Building, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PartnerMap from '@/components/PartnerMap';
import { Separator } from '@/components/ui/separator';
import CtaSection from '@/components/CtaSection';
const Partners = () => {
  const partnerBenefits = [{
    title: "Expand your service offering with cutting-edge compliance tech",
    description: "Add AI-powered compliance solutions to your portfolio and stay ahead of the competition.",
    icon: <Sparkles className="h-10 w-10 text-primary" />
  }, {
    title: "Gain early access to innovation and product updates",
    description: "Be the first to preview and implement new features before they reach the market.",
    icon: <Gift className="h-10 w-10 text-primary" />
  }, {
    title: "Co-market and co-sell to grow your customer base",
    description: "Leverage our marketing resources and joint go-to-market strategies to reach new audiences.",
    icon: <Users className="h-10 w-10 text-primary" />
  }, {
    title: "Add measurable value to your clients' compliance efforts",
    description: "Provide data-driven insights and improvement metrics that demonstrate your impact.",
    icon: <BarChart className="h-10 w-10 text-primary" />
  }];
  const partnerTypes = [{
    name: "Consulting Firms",
    icon: <Building className="h-6 w-6 text-compliance-600" />
  }, {
    name: "Audit Partners",
    icon: <Check className="h-6 w-6 text-compliance-600" />
  }, {
    name: "Technology Integrators",
    icon: <Sparkles className="h-6 w-6 text-compliance-600" />
  }, {
    name: "Financial Institutions",
    icon: <Building className="h-6 w-6 text-compliance-600" />
  }, {
    name: "NGOs",
    icon: <Globe className="h-6 w-6 text-compliance-600" />
  }];
  return <PageTemplate title="Partner With Us" description="Join a global ecosystem driving smarter, simpler compliance.">
      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="w-full md:w-1/2">
              {/* Removed image div */}
            </div>
            <div className="w-full md:w-1/2">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-compliance-100 text-compliance-800 mb-4">
                <Handshake className="w-5 h-5 mr-2" />
                <span className="font-medium">Global Partnership Network</span>
              </div>
              <p className="text-lg text-slate-700 mb-4">
                We collaborate with over 50+ trusted partners—including auditors, business connectors, 
                banks, consulting firms, and NGOs. Together, we're helping companies across the world 
                navigate the evolving landscape of compliance and sustainability with confidence.
              </p>
              <p className="text-lg text-slate-700">
                Let's grow together. Whether you're advising clients, managing audits, or driving 
                innovation —there's a place for you in our partner network.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-8">
            {partnerTypes.map((type, idx) => <div key={idx} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-all">
                {type.icon}
                <p className="mt-2 text-sm font-medium text-slate-700 text-center">{type.name}</p>
              </div>)}
          </div>
        </section>
        
        <section className="mb-12 bg-gradient-to-r from-blue-50 to-compliance-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 gradient-heading">Trusted by Partners Around the World</h2>
          <p className="text-lg text-slate-700 mb-6">
            We're proud to collaborate with organizations across:
          </p>
          
          <div className="h-[400px] mb-8 bg-white rounded-lg shadow-lg overflow-hidden">
            <PartnerMap />
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-primary">
            <p className="text-lg italic text-slate-700 mb-4">
              "Working with this team has transformed the way we support our clients' compliance journeys—faster, 
              more transparent, and far more efficient."
            </p>
            <div className="flex items-center">
              <div className="rounded-full bg-slate-200 w-10 h-10 flex items-center justify-center mr-3">
                <Users className="h-5 w-5 text-slate-700" />
              </div>
              <p className="font-medium text-slate-900">— ESG Consultant, UK</p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-8 gradient-heading text-center">Why Partner With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnerBenefits.map((benefit, index) => <Card key={index} className="p-6 border border-slate-200 h-full flex flex-col card-hover">
                <div className="mb-4 p-3 rounded-full bg-compliance-50 w-fit">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-medium text-slate-900 mb-2">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.description}</p>
                </div>
              </Card>)}
          </div>
        </section>
        
        <div className="mb-16">
          <Separator className="my-8" />
          <div className="bg-gradient-to-r from-compliance-900 to-innovation-900 rounded-xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -z-10"></div>
            
            <h2 className="text-3xl font-bold mb-4 text-white">
              Ready to become a partner?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">
              Join a trusted network driving real change in compliance and ESG.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 px-8 py-6 text-lg group shadow-lg">
                <MessageSquare className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
              
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>;
};
export default Partners;