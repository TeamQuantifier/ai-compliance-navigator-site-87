
import PageTemplate from '@/components/PageTemplate';
import { Check, Building, Users, BarChart, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

const SuccessStories = () => {
  const caseStudies = [
    {
      title: "How Lakeshore reduced 40% of the time spent on ESG reporting",
      category: "Case Study: Manufacturing",
      logo: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=300&h=150&fit=crop",
      company: "Lakeshore Manufacturing",
      challenge: "Lakeshore Manufacturing, a company with over 200 employees and operations in 3 European countries, was struggling with managing ESG data collection and reporting across multiple frameworks.",
      solution: "Implementation of a centralized ESG data management platform with automated data collection and framework mapping.",
      results: [
        "40% reduction in time spent on ESG reporting",
        "80% decrease in data collection errors",
        "Successful compliance with 3 different reporting frameworks",
        "Improved stakeholder communication"
      ],
      testimonial: {
        quote: "The platform has dramatically simplified our ESG reporting process. What used to take weeks now takes days, with greater accuracy and less frustration from our team.",
        author: "ESG Manager, Lakeshore Manufacturing"
      }
    },
    {
      title: "How VelociBank streamlined emissions reporting across 5 countries",
      category: "Case Study: Financial Services",
      logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=150&fit=crop",
      company: "VelociBank",
      challenge: "VelociBank had operations spread across 5 countries and was struggling to collect and report carbon emissions data in a consistent way to meet various regulatory requirements and stakeholder expectations.",
      solution: "Implementation of a unified carbon accounting platform with localized regulatory compliance capabilities.",
      results: [
        "60% faster emissions data collection process",
        "Standardized reporting across all 5 countries",
        "Full compliance with EU CSRD requirements",
        "Enhanced data quality with 95% accuracy rate"
      ],
      testimonial: {
        quote: "The solution has transformed our carbon accounting from a confusing patchwork to a streamlined process. Our sustainability team can now focus on improvement initiatives rather than just collecting data.",
        author: "Chief Sustainability Officer, VelociBank"
      }
    },
    {
      title: "How EcoRetail achieved CSRD compliance 3 months ahead of deadline",
      category: "Case Study: Retail",
      logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=150&fit=crop",
      company: "EcoRetail",
      challenge: "EcoRetail, with operations in 7 EU countries, was struggling to meet the upcoming CSRD reporting requirements with their manual processes and disconnected data sources.",
      solution: "Implementation of an end-to-end CSRD compliance solution with integrated data collection and automated reporting capabilities.",
      results: [
        "CSRD compliance achieved 3 months ahead of deadline",
        "70% reduction in manual data entry work",
        "Improved data governance across all 7 countries",
        "Enhanced stakeholder communication with real-time dashboards"
      ],
      testimonial: {
        quote: "The platform took what seemed like an impossible compliance challenge and made it manageable. We're now using the time we saved to focus on actual sustainability improvements.",
        author: "Sustainability Director, EcoRetail"
      }
    }
  ];

  return (
    <PageTemplate
      title="Success Stories"
      description="Discover how organizations have transformed their compliance processes with our AI-powered platform."
    >
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 gap-16">
          {caseStudies.map((study, index) => (
            <div key={index} className="border border-slate-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="bg-gradient-to-r from-compliance-50 to-innovation-50 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="text-sm font-medium text-slate-500 mb-2">{study.category}</div>
                    <h2 className="text-2xl md:text-3xl font-bold gradient-heading mb-4">{study.title}</h2>
                    <p className="text-slate-700 text-lg">{study.company}</p>
                  </div>
                  <div className="rounded-md overflow-hidden shadow-md w-full md:w-64 h-32 bg-white flex items-center justify-center">
                    <img 
                      src={study.logo} 
                      alt={`${study.company} logo`} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3 text-slate-900">Challenge</h3>
                  <p className="text-slate-700">{study.challenge}</p>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3 text-slate-900">Solution</h3>
                  <p className="text-slate-700">{study.solution}</p>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3 text-slate-900">Results</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {study.results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="text-primary h-5 w-5 mt-1 shrink-0" />
                        <span className="text-slate-700">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-slate-50 p-5 rounded-lg border-l-4 border-primary mt-6">
                  <p className="text-slate-700 italic mb-3">{study.testimonial.quote}</p>
                  <p className="text-slate-900 font-medium">— {study.testimonial.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-24 mb-8">
          <h2 className="text-3xl font-bold gradient-heading text-center mb-12">Our Impact At A Glance</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="p-6 text-center card-hover">
              <div className="mb-4 mx-auto w-16 h-16 bg-compliance-100 rounded-full flex items-center justify-center">
                <Building className="h-8 w-8 text-compliance-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2">50+</h3>
              <p className="text-slate-600">Companies supported</p>
            </Card>
            
            <Card className="p-6 text-center card-hover">
              <div className="mb-4 mx-auto w-16 h-16 bg-innovation-100 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-innovation-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2">10,000+</h3>
              <p className="text-slate-600">User hours saved</p>
            </Card>
            
            <Card className="p-6 text-center card-hover">
              <div className="mb-4 mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <BarChart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2">5</h3>
              <p className="text-slate-600">Regulatory frameworks supported</p>
            </Card>
          </div>
          
          <div className="bg-gradient-to-r from-compliance-900 to-innovation-800 text-white rounded-xl p-8 md:p-12 text-center shadow-lg mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to achieve similar results for your organization?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">Join the growing number of companies transforming their compliance and sustainability processes.</p>
            <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 group">
              Schedule a Demo
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default SuccessStories;
