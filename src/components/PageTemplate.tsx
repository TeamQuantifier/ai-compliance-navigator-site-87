
import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageTemplateProps {
  title: string;
  description: string;
  children: ReactNode;
}

const PageTemplate = ({ title, description, children }: PageTemplateProps) => {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-compliance-50 to-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-heading">
              {title}
            </h1>
            <p className="text-xl text-slate-700 mb-8">
              {description}
            </p>
            <Button className="group">
              Request Demo
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {children}
      </div>
    </div>
  );
};

export default PageTemplate;
