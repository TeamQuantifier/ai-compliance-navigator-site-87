
import PageTemplate from '@/components/PageTemplate';
import { Shield, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Frameworks = () => {
  const frameworkCategories = [
    {
      title: "Cybersecurity",
      description: "Frameworks for protecting digital assets and systems from cyber threats.",
      items: ["SOC I and SOC II", "NIS II", "NIST"],
      href: "/frameworks/cybersecurity",
      color: "bg-compliance-50"
    },
    {
      title: "Information Security",
      description: "Standards for securing information assets and maintaining confidentiality.",
      items: ["ISO 27001", "ISO 9001", "DORA"],
      href: "/frameworks/information-security",
      color: "bg-innovation-50"
    },
    {
      title: "Data Security",
      description: "Regulations for protecting personal and sensitive data.",
      items: ["GDPR", "HIPPA", "CCPA"],
      href: "/frameworks/data-security",
      color: "bg-compliance-50"
    },
    {
      title: "ESG",
      description: "Environmental, Social, and Governance reporting standards.",
      items: ["CSDR Reporting", "GRI Reporting", "CBAM Reporting"],
      href: "/frameworks/esg",
      color: "bg-innovation-50"
    },
    {
      title: "Environmental",
      description: "Standards for environmental management and sustainability.",
      items: ["ISO 14001", "LCA", "Carbon Footprint, GHG", "Decarbonisation"],
      href: "/frameworks/environmental",
      color: "bg-compliance-50"
    },
    {
      title: "Governance",
      description: "Guidelines for organizational governance and ethics.",
      items: ["Legal Policies", "Whistleblowing"],
      href: "/frameworks/governance",
      color: "bg-innovation-50"
    },
    {
      title: "Product Level",
      description: "Standards specific to product compliance and lifecycle.",
      items: ["DPP", "LCA Analysis"],
      href: "/frameworks/product-level",
      color: "bg-compliance-50"
    }
  ];

  return (
    <PageTemplate
      title="Compliance Frameworks"
      description="Our platform supports a wide range of compliance frameworks to help your organization meet various regulatory requirements."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {frameworkCategories.map((category) => (
          <Card key={category.title} className={`p-6 border border-slate-200 card-hover ${category.color}`}>
            <h3 className="text-xl font-semibold mb-3">{category.title}</h3>
            <p className="text-slate-600 mb-4">{category.description}</p>
            <div className="mb-4">
              <h4 className="font-medium text-slate-800 mb-2">Supported Frameworks:</h4>
              <ul className="space-y-1 pl-5 list-disc text-slate-600">
                {category.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <Link to={category.href}>
              <Button variant="outline" className="w-full group" size="sm">
                Explore {category.title}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </Card>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4 gradient-heading">
          Need Support for a Specific Framework?
        </h2>
        <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
          Our platform is constantly evolving to support new compliance frameworks. Contact us to discuss your specific requirements.
        </p>
        <Button className="group">
          Contact Our Compliance Experts
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </PageTemplate>
  );
};

export default Frameworks;
