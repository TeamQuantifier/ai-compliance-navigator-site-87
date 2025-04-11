
import PageTemplate from '@/components/PageTemplate';
import { Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Soc = () => {
  return (
    <PageTemplate
      title="SOC 1 & SOC 2 Compliance"
      description="Demonstrate trust to your customers, investors, and partners with automated SOC compliance."
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-compliance-800 to-innovation-800 rounded-xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-3/5">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                SOC Compliance That Handles Itself
              </h2>
              <p className="text-xl opacity-90 mb-6">
                Stay audit-ready with continuous SOC 1 & SOC 2 compliance automation.
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
                alt="SOC Compliance Dashboard showing automated controls monitoring and real-time audit readiness status" 
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
                <Shield className="w-5 h-5 mr-2" />
                <span className="font-medium">SOC 1 & SOC 2 Compliance</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-heading">
                Demonstrate Trust to Your Stakeholders
              </h2>
              <p className="text-lg text-slate-700 mb-6">
                Our platform ensures continuous readiness for both SOC 1 and SOC 2, covering controls 
                around data handling, privacy, availability, and more.
              </p>
              
              <h4 className="font-semibold text-lg mb-3">Key Benefits:</h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                  <span>Automated task assignment & evidence collection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                  <span>Control monitoring across the Trust Services Criteria</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                  <span>Real-time audit readiness dashboards</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                  <span>Secure data mapping to controls</span>
                </li>
              </ul>
              <Button className="group bg-gradient-to-r from-compliance-600 to-innovation-600 hover:from-compliance-700 hover:to-innovation-700 text-white">
                Schedule SOC Readiness Assessment
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            <div className="md:w-1/2">
              <Card className="border-compliance-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">SOC 2 Trust Services Criteria Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Security:</span>
                        <span className="text-slate-600 ml-1">Protection against unauthorized access</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Availability:</span>
                        <span className="text-slate-600 ml-1">Systems are available for operation and use</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Processing Integrity:</span>
                        <span className="text-slate-600 ml-1">System processing is complete, accurate, and authorized</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Confidentiality:</span>
                        <span className="text-slate-600 ml-1">Information designated as confidential is protected</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Privacy:</span>
                        <span className="text-slate-600 ml-1">Personal information is collected, used, and retained appropriately</span>
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
                Ready to Streamline Your SOC Compliance?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Join organizations that trust our platform to automate their SOC compliance journey.
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

export default Soc;
