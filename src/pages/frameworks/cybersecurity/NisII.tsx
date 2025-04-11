
import PageTemplate from '@/components/PageTemplate';
import { Globe, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const NisII = () => {
  return (
    <PageTemplate
      title="NIS 2 Directive (EU)"
      description="Stay ahead of critical infrastructure security regulations with automated NIS 2 compliance."
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-compliance-800 to-innovation-800 rounded-xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-3/5">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                NIS 2 Compliance That Handles Itself
              </h2>
              <p className="text-xl opacity-90 mb-6">
                Stay ahead of expanding EU cybersecurity obligations with automation.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-compliance-600 to-innovation-600 hover:from-compliance-700 hover:to-innovation-700 text-white">
                <Link to="/contact" className="flex items-center">
                  Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="md:w-2/5">
              <img 
                src="/placeholder.svg" 
                alt="NIS 2 Compliance Dashboard showing EU compliance status" 
                className="rounded-lg shadow-lg border border-white/20 w-full"
              />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-compliance-100 text-compliance-800 mb-4">
                <Globe className="w-5 h-5 mr-2" />
                <span className="font-medium">NIS 2 Directive (EU)</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-heading">
                Stay Ahead of Critical Infrastructure Regulations
              </h2>
              <p className="text-lg text-slate-700 mb-6">
                NIS 2 expands cybersecurity obligations across sectors in the EU. Our platform keeps you ahead—automatically identifying risks, assigning responsibilities, and ensuring compliance across your organization.
              </p>
              
              <h4 className="font-semibold text-lg mb-3">Key Benefits:</h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                  <span>AI agents driving real-time policy checks & enforcement</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                  <span>Role-based actioning for IT, legal, and ops teams</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                  <span>Gap analysis aligned with NIS 2 mandates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                  <span>Scalable compliance across multiple jurisdictions</span>
                </li>
              </ul>
              <Button className="group bg-gradient-to-r from-compliance-600 to-innovation-600 hover:from-compliance-700 hover:to-innovation-700 text-white">
                Get NIS 2 Readiness Assessment
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            <div className="md:w-1/2">
              <Card className="border-compliance-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">NIS 2 Key Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Risk Management Measures:</span>
                        <span className="text-slate-600 ml-1">Analyze risks and implement comprehensive security policies</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Incident Handling:</span>
                        <span className="text-slate-600 ml-1">Establish procedures for incident detection, response, and recovery</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Business Continuity:</span>
                        <span className="text-slate-600 ml-1">Maintain service availability during incidents</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Management Accountability:</span>
                        <span className="text-slate-600 ml-1">Direct management involvement in cybersecurity measures</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Supply Chain Security:</span>
                        <span className="text-slate-600 ml-1">Security assessment of suppliers and service providers</span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-compliance-800 to-innovation-700 rounded-xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Implement NIS 2 Requirements?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Join organizations that trust our platform to automate their NIS 2 compliance journey.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-gradient-to-r from-compliance-600 to-innovation-600 hover:from-compliance-700 hover:to-innovation-700 text-white px-8">
                  <Link to="/contact" className="flex items-center">
                    Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  Watch Platform Tour
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default NisII;
