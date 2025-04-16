
import React from 'react';
import DetailedCaseStudy, { 
  DetailedCaseStudyHeader,
  Section,
  CheckListItem,
  SummaryBox
} from './DetailedCaseStudy';
import { CheckCircle2 } from 'lucide-react';

const FashionRetailerCaseStudy = () => {
  return (
    <DetailedCaseStudy
      header={
        <DetailedCaseStudyHeader
          category="Case Study: ESG Compliance"
          title="ESG Compliance Journey of a Fashion Retailer"
          details={
            <>
              <p className="font-medium">Industry: Apparel Retail</p>
              <p>Employees: ~700 | Operations: Over 120 stores</p>
              <p>Reporting Year: 2025 | Year Established: Late 1990s</p>
            </>
          }
          imageSrc="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=300&h=150&fit=crop"
          imageAlt="Fashion retail store"
        />
      }
    >
      <Section title="01. Background">
        <p className="text-slate-700">
          This well-established European fashion retailer has long championed quality and design longevity 
          as part of its brand identity. These values inherently align with the principles of sustainable 
          development. As the regulatory environment around sustainability disclosures evolved, the company 
          recognized the need to transition from informal practices to structured ESG compliance, particularly 
          in light of the Corporate Sustainability Reporting Directive (CSRD).
        </p>
      </Section>
      
      <Section title="02. Trigger for ESG Compliance">
        <p className="text-slate-700 mb-4">
          Despite a history of responsible product design and resource use, it was the upcoming CSRD requirements 
          that catalyzed the company's formal ESG journey. The leadership team viewed ESG reporting as both a 
          regulatory obligation and a strategic opportunity to:
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">Strengthen customer engagement by showcasing responsible business practices</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">Prepare the organization for investor and stakeholder expectations</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">Align with future-proof operational standards</span>
          </li>
        </ul>
        <p className="text-slate-700 mt-4">
          The company also identified a growing commercial upside in ESG efforts. Consumer willingness to pay 
          a premium for sustainable products and packaging reinforced the business case for transparent sustainability reporting.
        </p>
      </Section>
      
      <Section title="03. ESG Implementation Strategy">
        <p className="text-slate-700 mb-4">
          To navigate the compliance process efficiently and accurately, the company partnered with Envirly, 
          a platform combining advanced ESG software with expert advisory.
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">In-depth regulatory knowledge (CSRD, ESRS, GHG Protocol)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">All-in-one solution</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">High user satisfaction with the platform's intuitive interface</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">Strong cost-to-value ratio</span>
          </li>
        </ul>
      </Section>
      
      <Section title="04. Governance and Cross-Functional Coordination">
        <p className="text-slate-700 mb-4">
          To ensure smooth implementation and compliance, the company created a steering committee, composed of:
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">A board member</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">A financial controller</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">A representative from finance and administration</span>
          </li>
        </ul>
        <p className="text-slate-700 mt-4">
          This core team was supported by stakeholders from HR, logistics, IT, controlling, and product development. 
          The company also plans to bring on a dedicated ESG coordinator to oversee long-term sustainability 
          strategy and regulatory reporting.
        </p>
      </Section>
      
      <Section title="05. Outcomes of the ESG Compliance Process">
        <p className="text-slate-700 mb-4">
          Key benefits realized:
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">Full visibility into emissions across Scopes 1, 2, and 3</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">Streamlined data collection and internal ESG processes</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">Enhanced stakeholder alignment around sustainability goals</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">Organizational readiness for upcoming ESRS-aligned reporting obligations</span>
          </li>
        </ul>
      </Section>
      
      <SummaryBox title="Key Takeaways for ESG Leaders:">
        <CheckListItem>
          <span className="font-medium">Start early.</span> CSRD compliance requires months of preparation and organizational coordination.
        </CheckListItem>
        <CheckListItem>
          <span className="font-medium">Invest in expertise.</span> A reliable partner helps demystify complex regulations.
        </CheckListItem>
        <CheckListItem>
          <span className="font-medium">Form a cross-functional team.</span> ESG is a horizontal topic that spans departments.
        </CheckListItem>
        <CheckListItem>
          <span className="font-medium">Embed accountability.</span> Assign ownership to ensure the process stays on track.
        </CheckListItem>
      </SummaryBox>
    </DetailedCaseStudy>
  );
};

export default FashionRetailerCaseStudy;
