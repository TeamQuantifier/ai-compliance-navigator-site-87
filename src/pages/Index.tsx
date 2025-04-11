
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import InsidersSection from "@/components/InsidersSection";
import TrustReasonsSection from "@/components/TrustReasonsSection";
import CtaSection from "@/components/CtaSection";
import { ArrowRight, CheckCircle, Database, Shield, Users, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeatureSection />
      <InsidersSection />
      <TrustReasonsSection />
      
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
              <Button asChild variant="outline" className="group" size="sm">
                <Link to="/by-roles">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
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
              <Button asChild variant="outline" className="group" size="sm">
                <Link to="/by-roles">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
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
              <Button asChild variant="outline" className="group" size="sm">
                <Link to="/by-roles">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
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
