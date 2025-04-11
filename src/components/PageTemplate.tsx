
import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageTemplateProps {
  title: string;
  description: string;
  children: ReactNode;
}

const PageTemplate = ({
  title,
  description,
  children
}: PageTemplateProps) => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-[20px]">
        {children}
      </div>
    </div>
  );
};

export default PageTemplate;
