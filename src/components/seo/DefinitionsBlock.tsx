import { Helmet } from 'react-helmet-async';
import { BookOpen } from 'lucide-react';

export interface Definition {
  term: string;
  definition: string;
}

interface DefinitionsBlockProps {
  title: string;
  definitions: Definition[];
  className?: string;
}

/**
 * DefinitionsBlock - SEO-optimized component for AI/zero-click optimization
 * 
 * Renders a list of defined terms with Schema.org DefinedTermSet markup,
 * optimized for featured snippets and LLM consumption.
 */
const DefinitionsBlock = ({ title, definitions, className = '' }: DefinitionsBlockProps) => {
  // Schema.org DefinedTermSet for structured data
  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": title,
    "hasDefinedTerm": definitions.map(d => ({
      "@type": "DefinedTerm",
      "name": d.term,
      "description": d.definition
    }))
  };

  return (
    <section className={`py-12 ${className}`}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      
      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-compliance-100 rounded-lg flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-compliance-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        </div>
        
        <dl className="space-y-6">
          {definitions.map((d, index) => (
            <div 
              key={index} 
              className="border-l-4 border-compliance-500 pl-4 py-1"
            >
              <dt className="font-semibold text-lg text-slate-900 mb-1">
                {d.term}
              </dt>
              <dd className="text-slate-600 leading-relaxed">
                {d.definition}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default DefinitionsBlock;
