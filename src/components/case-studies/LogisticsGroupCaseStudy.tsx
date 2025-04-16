
import React from 'react';
import DetailedCaseStudy, { 
  DetailedCaseStudyHeader,
  Section,
  CheckListItem,
  SummaryBox
} from './DetailedCaseStudy';
import { CheckCircle2 } from 'lucide-react';

const LogisticsGroupCaseStudy = () => {
  return (
    <DetailedCaseStudy
      header={
        <DetailedCaseStudyHeader
          category="Case Study: ESG Compliance"
          title="A Leading Logistics Group's ESG Transformation"
          details={
            <>
              <p className="font-medium">Industry: Transport, Freight Forwarding & Logistics (TSL)</p>
              <p>Employees: &gt;1000 | Founded: 2010</p>
              <p>Reporting Year: 2025</p>
            </>
          }
          imageSrc="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=300&h=150&fit=crop"
          imageAlt="Logistics and transportation"
        />
      }
    >
      <Section title="01. Introduction">
        <p className="text-slate-700">
          The company has been actively engaged in sustainability initiatives for many years, including supporting 
          businesses in over 150 countries in developing modern workplace cultures built on trust and performance.
        </p>
      </Section>
      
      <Section title="02. Challenges">
        <p className="text-slate-700">
          The biggest challenge was identifying and collecting the right data for ESG reporting—particularly 
          carbon footprint data, which is critical in the TSL sector. As a logistics operator, not just a 
          transport provider, the company required expert guidance to determine which data sets were necessary 
          to meet the requirements of the CSRD directive.
        </p>
      </Section>
      
      <Section title="03. Nature of the Collaboration">
        <p className="text-slate-700 mb-4">
          The collaboration consisted of several key phases:
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">Double Materiality Assessment – identifying the most relevant environmental, social, and governance topics for the company and its stakeholders</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">Carbon Footprint Calculation – estimation of GHG emissions across Scopes 1, 2, and 3</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">Governance & HR Policy Analysis – including anti-mobbing procedures, whistleblower protection, and anti-corruption measures</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">Sustainability Strategy Development – building internal know-how and capabilities</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">Training for Employees – to ensure a broader understanding of ESG principles</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
            <span className="text-slate-700">ESG Communication Strategy – defining the company's narrative and messaging</span>
          </li>
        </ul>
      </Section>
      
      <Section title="05. &quot;We Want to Stay Ahead of Market Demands&quot;">
        <p className="text-slate-700">
          The client values competitiveness across all aspects of its business. It continuously improves TSL 
          processes, measures performance, and assesses the effectiveness of initiatives across all subsidiaries. 
          Through the partnership with Envirly, the organization gained tools and skills for monitoring, analyzing, 
          and verifying sustainability metrics and ESG data.
        </p>
      </Section>
      
      <SummaryBox title="Key Results:">
        <CheckListItem>
          Comprehensive ESG strategy aligned with industry best practices
        </CheckListItem>
        <CheckListItem>
          Accurate carbon footprint measurement across all operations
        </CheckListItem>
        <CheckListItem>
          Enhanced internal capabilities for ongoing ESG management
        </CheckListItem>
        <CheckListItem>
          Competitive advantage through early CSRD compliance
        </CheckListItem>
      </SummaryBox>
    </DetailedCaseStudy>
  );
};

export default LogisticsGroupCaseStudy;
