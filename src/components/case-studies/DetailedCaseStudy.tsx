
import React, { ReactNode } from 'react';

interface DetailedCaseStudyHeaderProps {
  title: string;
  category: string;
  details: ReactNode;
  imageSrc: string;
  imageAlt: string;
}

export const DetailedCaseStudyHeader = ({
  title,
  category,
  details,
  imageSrc,
  imageAlt,
}: DetailedCaseStudyHeaderProps) => (
  <div className="bg-gradient-to-r from-compliance-50 to-innovation-50 p-6">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <div className="text-sm font-medium text-slate-500 mb-2">{category}</div>
        <h2 className="text-2xl md:text-3xl font-bold gradient-heading mb-4">
          {title}
        </h2>
        <div className="text-slate-700">
          {details}
        </div>
      </div>
      <div className="rounded-md overflow-hidden shadow-md w-full md:w-64 h-32 bg-white flex items-center justify-center">
        <img 
          src={imageSrc} 
          alt={imageAlt} 
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  </div>
);

interface SectionProps {
  title: string;
  children: ReactNode;
}

export const Section = ({ title, children }: SectionProps) => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold mb-3 text-slate-900">{title}</h3>
    {children}
  </div>
);

interface CheckListItemProps {
  children: ReactNode;
}

export const CheckListItem = ({ children }: CheckListItemProps) => (
  <li className="flex items-start gap-2">
    <span className="text-primary h-5 w-5 mt-1 shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    </span>
    <span className="text-slate-700">{children}</span>
  </li>
);

interface SummaryBoxProps {
  title: string;
  children: ReactNode;
}

export const SummaryBox = ({ title, children }: SummaryBoxProps) => (
  <div className="bg-slate-50 p-6 rounded-lg mt-6">
    <h4 className="font-semibold text-xl text-slate-900 mb-4">{title}</h4>
    <ul className="space-y-3">
      {children}
    </ul>
  </div>
);

interface DetailedCaseStudyProps {
  header: ReactNode;
  children: ReactNode;
}

const DetailedCaseStudy = ({ header, children }: DetailedCaseStudyProps) => {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
      {header}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default DetailedCaseStudy;
