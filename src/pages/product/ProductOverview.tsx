
import { ArrowRight, Shield, CheckCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ProductOverview = () => {
  const features = [
    {
      title: "Main Features",
      href: "/product/features",
      description: "Explore the core capabilities of our AI-driven compliance platform."
    },
    {
      title: "AI Compliance Officer",
      href: "/product/ai-compliance-officer",
      description: "Meet your virtual compliance assistant that monitors and guides your compliance program."
    },
    {
      title: "Task and Data Management",
      href: "/product/task-data-management",
      description: "Efficiently manage compliance tasks and sensitive data with built-in controls."
    },
    {
      title: "Documents Management",
      href: "/product/documents-management",
      description: "Centralize and control all your compliance documentation in one secure place."
    },
    {
      title: "Value Chain",
      href: "/product/value-chain",
      description: "Map and monitor compliance across your entire organizational value chain."
    },
    {
      title: "Risk Assessment",
      href: "/product/risk-assessment",
      description: "Identify, assess, and mitigate compliance risks with AI-powered analysis."
    },
    {
      title: "AI Analytics and Dashboards",
      href: "/product/analytics-dashboards",
      description: "Gain insights with intelligent analytics and visualizations of your compliance data."
    },
    {
      title: "API Integrations",
      href: "/product/api-integrations",
      description: "Connect our platform with your existing tools and systems for seamless operation."
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-compliance-50 to-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-heading">
              AI-Powered Compliance Platform
            </h1>
            <p className="text-xl text-slate-700 mb-8">
              Our comprehensive solution automates and streamlines compliance processes
              using artificial intelligence and machine learning.
            </p>
            <Button className="group">
              Request Demo
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 gradient-heading">
            Product Features
          </h2>
          <p className="text-lg text-slate-700 mb-8">
            Explore the capabilities of our AI-driven compliance platform designed to
            revolutionize how organizations approach regulatory compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-slate-600 mb-4">{feature.description}</p>
              <Link to={feature.href} className="flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
                Learn more <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
