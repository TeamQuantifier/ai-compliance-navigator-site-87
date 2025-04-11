
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import CtaSection from "@/components/CtaSection";
import { ArrowRight, CheckCircle, Database, Shield, Users, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeatureSection />
      
      {/* Framework Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
              Comprehensive Framework Coverage
            </h2>
            <p className="text-lg text-slate-600">
              Our platform supports a wide range of compliance frameworks to help your organization meet various regulatory requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 border border-slate-200 card-hover">
              <h3 className="text-xl font-semibold mb-3">Cybersecurity</h3>
              <p className="text-slate-600 mb-4">Secure your digital assets and meet cybersecurity compliance requirements.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">SOC I and SOC II</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">NIS II</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">NIST</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full group" size="sm">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Card>
            
            <Card className="p-6 border border-slate-200 card-hover">
              <h3 className="text-xl font-semibold mb-3">Data Privacy</h3>
              <p className="text-slate-600 mb-4">Protect personal data and comply with privacy regulations worldwide.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-innovation-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">GDPR</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-innovation-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">HIPAA</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-innovation-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">CCPA</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full group" size="sm">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Card>
            
            <Card className="p-6 border border-slate-200 card-hover">
              <h3 className="text-xl font-semibold mb-3">ESG</h3>
              <p className="text-slate-600 mb-4">Meet environmental, social, and governance reporting requirements.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">CSDR Reporting</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">GRI Reporting</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">CBAM Reporting</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full group" size="sm">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Card>
            
            <Card className="p-6 border border-slate-200 card-hover">
              <h3 className="text-xl font-semibold mb-3">Information Security</h3>
              <p className="text-slate-600 mb-4">Secure information assets and comply with security standards.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-innovation-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">ISO 27001</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-innovation-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">ISO 9001</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-innovation-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">DORA</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full group" size="sm">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Card>
            
            <Card className="p-6 border border-slate-200 card-hover">
              <h3 className="text-xl font-semibold mb-3">Environmental</h3>
              <p className="text-slate-600 mb-4">Meet environmental compliance and sustainability requirements.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">ISO 14001</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">Carbon Footprint, GHG</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-compliance-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">Decarbonisation</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full group" size="sm">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Card>
            
            <Card className="p-6 border border-slate-200 card-hover">
              <h3 className="text-xl font-semibold mb-3">Governance</h3>
              <p className="text-slate-600 mb-4">Ensure proper governance and organizational compliance.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-innovation-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">Legal Policies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-innovation-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">Whistleblowing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-innovation-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">Risk Management</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full group" size="sm">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Card>
          </div>
          
          <div className="text-center">
            <Button className="group" size="lg">
              Explore All Frameworks
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Role-Based Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
              Tailored for Every Role
            </h2>
            <p className="text-lg text-slate-600">
              Our platform provides specialized interfaces and features for different roles within your organization.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-compliance-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-compliance-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">For Managers</h3>
              <p className="text-slate-600 mb-4">
                Comprehensive dashboards and reporting tools to oversee compliance activities and make informed decisions.
              </p>
              <Button variant="outline" className="group" size="sm">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-innovation-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Database className="h-10 w-10 text-innovation-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">For Contributors</h3>
              <p className="text-slate-600 mb-4">
                Streamlined interfaces for data entry, task management, and evidence collection to simplify compliance work.
              </p>
              <Button variant="outline" className="group" size="sm">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-compliance-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileCheck className="h-10 w-10 text-compliance-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">For Auditors</h3>
              <p className="text-slate-600 mb-4">
                Detailed audit trails, evidence repositories, and verification tools to validate compliance status.
              </p>
              <Button variant="outline" className="group" size="sm">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CtaSection />
    </div>
  );
};

export default Index;
