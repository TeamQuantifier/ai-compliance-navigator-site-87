
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-heading">
            AI-Powered Compliance Management
          </h1>
          <p className="text-xl text-slate-700 mb-8">
            Streamline your regulatory compliance processes with our intelligent platform that combines artificial intelligence and industry expertise.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="group">
              <Link to="/product">
                Explore Features
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
