
import React from 'react';
import { Check, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
}

export interface CaseStudyProps {
  title: string;
  category: string;
  logo: string;
  company: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial: Testimonial;
}

const CaseStudy = ({
  title,
  category,
  logo,
  company,
  challenge,
  solution,
  results,
  testimonial,
}: CaseStudyProps) => {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
      <div className="bg-gradient-to-r from-compliance-50 to-innovation-50 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-sm font-medium text-slate-500 mb-2">{category}</div>
            <h2 className="text-2xl md:text-3xl font-bold gradient-heading mb-4">{title}</h2>
            <p className="text-slate-700 text-lg">{company}</p>
          </div>
          <div className="rounded-md overflow-hidden shadow-md w-full md:w-64 h-32 bg-white flex items-center justify-center">
            <img 
              src={logo} 
              alt={`${company} logo`} 
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-slate-900">Challenge</h3>
          <p className="text-slate-700">{challenge}</p>
        </div>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-slate-900">Solution</h3>
          <p className="text-slate-700">{solution}</p>
        </div>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-slate-900">Results</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {results.map((result, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="text-primary h-5 w-5 mt-1 shrink-0" />
                <span className="text-slate-700">{result}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-slate-50 p-5 rounded-lg border-l-4 border-primary mt-6">
          <p className="text-slate-700 italic mb-3">{testimonial.quote}</p>
          <p className="text-slate-900 font-medium">— {testimonial.author}</p>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;
