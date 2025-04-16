
import PageTemplate from '@/components/PageTemplate';
import { FileCheck, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Nist = () => {
  return (
    <PageTemplate
      title="NIST Cybersecurity Framework"
      description="Align your organization to the gold standard in security with automated NIST framework implementation."
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-compliance-800 to-innovation-800 rounded-xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-3/5">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                NIST Compliance That Handles Itself
              </h2>
              <p className="text-xl opacity-90 mb-6">
                From Identify to Recover — implement NIST controls with automation.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-compliance-600 to-innovation-600 hover:from-compliance-700 hover:to-innovation-700 text-white">
                <Link to="/contact" className="flex items-center">
                  Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="md:w-2/5">
              <img 
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="NIST Framework Implementation Dashboard showing the five functions" 
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
                <FileCheck className="w-5 h-5 mr-2" />
                <span className="font-medium">NIST Cybersecurity Framework</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-heading">
                Align with the Gold Standard in Security
              </h2>
              <p className="text-lg text-slate-700 mb-6">
                Our platform automates NIST implementation by continuously mapping your assets, risks, and mitigations to the five NIST functions.
              </p>
              
              <h4 className="font-semibold text-lg mb-3">Key Benefits:</h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                  <span>Intelligent asset and risk mapping</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                  <span>Proactive tasking aligned with NIST categories</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                  <span>Integrated reporting for regulators and auditors</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                  <span>Alerts when controls fall out of scope</span>
                </li>
              </ul>
              <Button className="group bg-gradient-to-r from-compliance-600 to-innovation-600 hover:from-compliance-700 hover:to-innovation-700 text-white">
                Get NIST Implementation Assessment
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            <div className="md:w-1/2">
              <Card className="border-compliance-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">The Five NIST Functions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Identify:</span>
                        <span className="text-slate-600 ml-1">Develop understanding of risks to systems, assets, data and capabilities</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Protect:</span>
                        <span className="text-slate-600 ml-1">Develop and implement safeguards for critical services</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Detect:</span>
                        <span className="text-slate-600 ml-1">Develop and implement activities to identify cybersecurity events</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Respond:</span>
                        <span className="text-slate-600 ml-1">Develop and implement appropriate activities to act on a cybersecurity event</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-compliance-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Recover:</span>
                        <span className="text-slate-600 ml-1">Develop and implement appropriate activities to restore capabilities impaired due to a cybersecurity event</span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Platform Screenshot Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-compliance-100 to-slate-100 p-6 rounded-xl">
            <div className="flex flex-col items-center text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-compliance-900">
                NIST Implementation Dashboard
              </h2>
              <p className="text-lg text-slate-700 max-w-2xl">
                Monitor your NIST framework implementation with our comprehensive dashboard.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img 
                src="https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="NIST Functions Tracking Dashboard" 
                className="rounded-lg shadow-lg border border-compliance-200 w-full object-cover h-72"
              />
              <img 
                src="https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="NIST Risk Assessment Interface" 
                className="rounded-lg shadow-lg border border-compliance-200 w-full object-cover h-72"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-compliance-800 to-innovation-700 rounded-xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Implement NIST Framework?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Join organizations that trust our platform to automate their NIST compliance journey.
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

export default Nist;
