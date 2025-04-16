
import React from 'react';
import DetailedCaseStudy, { 
  DetailedCaseStudyHeader,
  Section,
  CheckListItem,
  SummaryBox
} from './DetailedCaseStudy';
import { Check, CheckCircle2 } from 'lucide-react';

const FinancialServicesCaseStudy = () => {
  return (
    <DetailedCaseStudy
      header={
        <DetailedCaseStudyHeader
          category="Case Study: Financial Services"
          title="Driving ESG Compliance Through Innovation in Financial Services"
          details={
            <>
              <p className="font-medium">Industry: Banking and Financial Services</p>
            </>
          }
          imageSrc="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=150&fit=crop"
          imageAlt="Financial services"
        />
      }
    >
      <Section title="01. The Challenge">
        <p className="text-slate-700">
          As ESG regulations grow more demanding, especially with the upcoming Corporate Sustainability Reporting Directive (CSRD), 
          the bank recognized the urgent need to support its clients—especially SMEs and corporate clients—in aligning with these new standards.
        </p>
      </Section>
      
      <Section title="02. The Solution">
        <p className="text-slate-700 mb-4">
          "Companies need more than capital—they need support in meeting ESG goals and compliance requirements," 
          said the bank's Executive Director of Sustainable Development.
          The chosen solution—a digital ESG compliance platform—supports reporting aligned with GHG Protocol and ISO 14064-1. 
          During the pilot phase, clients used the platform to calculate their emissions and track reductions linked to 
          energy efficiency improvements and building upgrades.
        </p>
      </Section>
      
      <Section title="03. Implementation">
        <p className="text-slate-700 mb-4">
          Through the partnership, the bank equipped its clients with tools to:
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">Measure and report emissions</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">Analyze environmental impact</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">Visualize ESG data with dashboards, infographics, and automated reports</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">Identify hotspots and track progress toward climate goals</span>
          </li>
        </ul>
        <p className="text-slate-700 mt-4">
          The solution, powered by artificial intelligence, also simplifies the complex process of ESG data aggregation 
          and supply chain emissions tracking—a critical capability for upcoming CSRD-aligned disclosures.
        </p>
      </Section>
      
      <Section title="04. Benefits">
        <div className="space-y-4">
          <div>
            <p className="font-medium text-slate-900">1. Tool Accessibility</p>
            <p className="text-slate-700">Business clients gained access to the platform at no cost during the pilot and now benefit from tailored ESG support at preferential rates.</p>
          </div>
          <div>
            <p className="font-medium text-slate-900">2. Regulatory Readiness</p>
            <p className="text-slate-700">The solution provides structured, regulation-aligned reporting, helping clients prepare for CSRD requirements and beyond.</p>
          </div>
          <div>
            <p className="font-medium text-slate-900">3. Cost Optimization</p>
            <p className="text-slate-700">Clients identified high-emission activities and implemented reduction strategies, leading to greater operational efficiency and lower costs.</p>
          </div>
          <div>
            <p className="font-medium text-slate-900">4. Data Reliability</p>
            <p className="text-slate-700">The platform delivers accurate, verifiable emissions data based on robust methodologies, supporting informed and credible decision-making.</p>
          </div>
        </div>
      </Section>
      
      <Section title="05. Results">
        <p className="text-slate-700 mb-4">
          Thanks to this collaboration, the bank's clients can now:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <li className="flex items-start gap-2">
            <Check className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">Systematically manage their carbon footprint</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">Comply with CSRD and other ESG regulations</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">Reduce GHG emissions</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">Improve ESG reporting practices</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">Develop informed decarbonization strategies</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">Prioritize investments in sustainable technologies</span>
          </li>
        </ul>
        <p className="text-slate-700 mt-4">
          The platform's automation and AI capabilities reduce the burden of ESG reporting while enhancing transparency and stakeholder trust.
        </p>
      </Section>
      
      <Section title="06. Conclusion">
        <p className="text-slate-700 mb-4">
          This case study highlights how strategic partnerships between financial institutions and ESG tech providers can accelerate compliance, 
          empower businesses, and contribute to the broader EU goal of net-zero emissions by 2050.
        </p>
        <p className="text-slate-700">
          By digitizing ESG data management and making compliance tools broadly available, the bank plays a critical role in building market resilience, 
          climate awareness, and long-term competitiveness among its clients.
        </p>
      </Section>
    </DetailedCaseStudy>
  );
};

export default FinancialServicesCaseStudy;
