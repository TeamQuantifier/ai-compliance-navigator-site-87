import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Check, Building, Users, BarChart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

const SuccessStories = () => {
  const caseStudies = [
    {
      title: "How Lakeshore reduced 40% of the time spent on ESG reporting",
      category: "Case Study: Manufacturing",
      logo: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=300&h=150&fit=crop",
      company: "Lakeshore Manufacturing",
      challenge: "Lakeshore Manufacturing, a company with over 200 employees and operations in 3 European countries, was struggling with managing ESG data collection and reporting across multiple frameworks.",
      solution: "Implementation of a centralized ESG data management platform with automated data collection and framework mapping.",
      results: [
        "40% reduction in time spent on ESG reporting",
        "80% decrease in data collection errors",
        "Successful compliance with 3 different reporting frameworks",
        "Improved stakeholder communication"
      ],
      testimonial: {
        quote: "The platform has dramatically simplified our ESG reporting process. What used to take weeks now takes days, with greater accuracy and less frustration from our team.",
        author: "ESG Manager, Lakeshore Manufacturing"
      }
    },
    {
      title: "How VelociBank streamlined emissions reporting across 5 countries",
      category: "Case Study: Financial Services",
      logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=150&fit=crop",
      company: "VelociBank",
      challenge: "VelociBank had operations spread across 5 countries and was struggling to collect and report carbon emissions data in a consistent way to meet various regulatory requirements and stakeholder expectations.",
      solution: "Implementation of a unified carbon accounting platform with localized regulatory compliance capabilities.",
      results: [
        "60% faster emissions data collection process",
        "Standardized reporting across all 5 countries",
        "Full compliance with EU CSRD requirements",
        "Enhanced data quality with 95% accuracy rate"
      ],
      testimonial: {
        quote: "The solution has transformed our carbon accounting from a confusing patchwork to a streamlined process. Our sustainability team can now focus on improvement initiatives rather than just collecting data.",
        author: "Chief Sustainability Officer, VelociBank"
      }
    },
    {
      title: "How EcoRetail achieved CSRD compliance 3 months ahead of deadline",
      category: "Case Study: Retail",
      logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=150&fit=crop",
      company: "EcoRetail",
      challenge: "EcoRetail, with operations in 7 EU countries, was struggling to meet the upcoming CSRD reporting requirements with their manual processes and disconnected data sources.",
      solution: "Implementation of an end-to-end CSRD compliance solution with integrated data collection and automated reporting capabilities.",
      results: [
        "CSRD compliance achieved 3 months ahead of deadline",
        "70% reduction in manual data entry work",
        "Improved data governance across all 7 countries",
        "Enhanced stakeholder communication with real-time dashboards"
      ],
      testimonial: {
        quote: "The platform took what seemed like an impossible compliance challenge and made it manageable. We're now using the time we saved to focus on actual sustainability improvements.",
        author: "Sustainability Director, EcoRetail"
      }
    }
  ];

  return (
    <PageTemplate
      title="Success Stories"
      description="Discover how organizations have transformed their compliance processes with our AI-powered platform."
    >
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 gap-16">
          {caseStudies.map((study, index) => (
            <div key={index} className="border border-slate-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="bg-gradient-to-r from-compliance-50 to-innovation-50 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="text-sm font-medium text-slate-500 mb-2">{study.category}</div>
                    <h2 className="text-2xl md:text-3xl font-bold gradient-heading mb-4">{study.title}</h2>
                    <p className="text-slate-700 text-lg">{study.company}</p>
                  </div>
                  <div className="rounded-md overflow-hidden shadow-md w-full md:w-64 h-32 bg-white flex items-center justify-center">
                    <img 
                      src={study.logo} 
                      alt={`${study.company} logo`} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3 text-slate-900">Challenge</h3>
                  <p className="text-slate-700">{study.challenge}</p>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3 text-slate-900">Solution</h3>
                  <p className="text-slate-700">{study.solution}</p>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3 text-slate-900">Results</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {study.results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="text-primary h-5 w-5 mt-1 shrink-0" />
                        <span className="text-slate-700">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-slate-50 p-5 rounded-lg border-l-4 border-primary mt-6">
                  <p className="text-slate-700 italic mb-3">{study.testimonial.quote}</p>
                  <p className="text-slate-900 font-medium">— {study.testimonial.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 border border-slate-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
          <div className="bg-gradient-to-r from-compliance-50 to-innovation-50 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="text-sm font-medium text-slate-500 mb-2">Case Study: ESG Compliance</div>
                <h2 className="text-2xl md:text-3xl font-bold gradient-heading mb-4">
                  ESG Compliance Journey of a Fashion Retailer
                </h2>
                <div className="text-slate-700">
                  <p className="font-medium">Industry: Apparel Retail</p>
                  <p>Employees: ~700 | Operations: Over 120 stores</p>
                  <p>Reporting Year: 2025 | Year Established: Late 1990s</p>
                </div>
              </div>
              <div className="rounded-md overflow-hidden shadow-md w-full md:w-64 h-32 bg-white flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=300&h=150&fit=crop" 
                  alt="Fashion retail store" 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">01. Background</h3>
              <p className="text-slate-700">
                This well-established European fashion retailer has long championed quality and design longevity 
                as part of its brand identity. These values inherently align with the principles of sustainable 
                development. As the regulatory environment around sustainability disclosures evolved, the company 
                recognized the need to transition from informal practices to structured ESG compliance, particularly 
                in light of the Corporate Sustainability Reporting Directive (CSRD).
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">02. Trigger for ESG Compliance</h3>
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
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">03. ESG Implementation Strategy</h3>
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
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">04. Governance and Cross-Functional Coordination</h3>
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
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">05. Outcomes of the ESG Compliance Process</h3>
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
            </div>
            
            <div className="bg-slate-50 p-6 rounded-lg mt-6">
              <h4 className="font-semibold text-xl text-slate-900 mb-4">Key Takeaways for ESG Leaders:</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
                  <span className="text-slate-700"><span className="font-medium">Start early.</span> CSRD compliance requires months of preparation and organizational coordination.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
                  <span className="text-slate-700"><span className="font-medium">Invest in expertise.</span> A reliable partner helps demystify complex regulations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
                  <span className="text-slate-700"><span className="font-medium">Form a cross-functional team.</span> ESG is a horizontal topic that spans departments.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
                  <span className="text-slate-700"><span className="font-medium">Embed accountability.</span> Assign ownership to ensure the process stays on track.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border border-slate-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
          <div className="bg-gradient-to-r from-compliance-50 to-innovation-50 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="text-sm font-medium text-slate-500 mb-2">Case Study: ESG Compliance</div>
                <h2 className="text-2xl md:text-3xl font-bold gradient-heading mb-4">
                  A Leading Logistics Group's ESG Transformation
                </h2>
                <div className="text-slate-700">
                  <p className="font-medium">Industry: Transport, Freight Forwarding & Logistics (TSL)</p>
                  <p>Employees: &gt;1000 | Founded: 2010</p>
                  <p>Reporting Year: 2025</p>
                </div>
              </div>
              <div className="rounded-md overflow-hidden shadow-md w-full md:w-64 h-32 bg-white flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=300&h=150&fit=crop" 
                  alt="Logistics and transportation" 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">01. Introduction</h3>
              <p className="text-slate-700">
                The company has been actively engaged in sustainability initiatives for many years, including supporting 
                businesses in over 150 countries in developing modern workplace cultures built on trust and performance.
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">02. Challenges</h3>
              <p className="text-slate-700">
                The biggest challenge was identifying and collecting the right data for ESG reporting—particularly 
                carbon footprint data, which is critical in the TSL sector. As a logistics operator, not just a 
                transport provider, the company required expert guidance to determine which data sets were necessary 
                to meet the requirements of the CSRD directive.
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">03. Nature of the Collaboration</h3>
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
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">05. "We Want to Stay Ahead of Market Demands"</h3>
              <p className="text-slate-700">
                The client values competitiveness across all aspects of its business. It continuously improves TSL 
                processes, measures performance, and assesses the effectiveness of initiatives across all subsidiaries. 
                Through the partnership with Envirly, the organization gained tools and skills for monitoring, analyzing, 
                and verifying sustainability metrics and ESG data.
              </p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-lg mt-6">
              <h4 className="font-semibold text-xl text-slate-900 mb-4">Key Results:</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
                  <span className="text-slate-700">Comprehensive ESG strategy aligned with industry best practices</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
                  <span className="text-slate-700">Accurate carbon footprint measurement across all operations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
                  <span className="text-slate-700">Enhanced internal capabilities for ongoing ESG management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-primary h-5 w-5 mt-1 shrink-0" />
                  <span className="text-slate-700">Competitive advantage through early CSRD compliance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border border-slate-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
          <div className="bg-gradient-to-r from-compliance-50 to-innovation-50 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="text-sm font-medium text-slate-500 mb-2">Case Study: Financial Services</div>
                <h2 className="text-2xl md:text-3xl font-bold gradient-heading mb-4">
                  Driving ESG Compliance Through Innovation in Financial Services
                </h2>
                <div className="text-slate-700">
                  <p className="font-medium">Industry: Banking and Financial Services</p>
                </div>
              </div>
              <div className="rounded-md overflow-hidden shadow-md w-full md:w-64 h-32 bg-white flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=150&fit=crop" 
                  alt="Financial services" 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">01. The Challenge</h3>
              <p className="text-slate-700">
                As ESG regulations grow more demanding, especially with the upcoming Corporate Sustainability Reporting Directive (CSRD), 
                the bank recognized the urgent need to support its clients—especially SMEs and corporate clients—in aligning with these new standards.
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">02. The Solution</h3>
              <p className="text-slate-700 mb-4">
                "Companies need more than capital—they need support in meeting ESG goals and compliance requirements," 
                said the bank's Executive Director of Sustainable Development.
                The chosen solution—a digital ESG compliance platform—supports reporting aligned with GHG Protocol and ISO 14064-1. 
                During the pilot phase, clients used the platform to calculate their emissions and track reductions linked to 
                energy efficiency improvements and building upgrades.
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">03. Implementation</h3>
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
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">04. Benefits</h3>
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
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">05. Results</h3>
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
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">06. Conclusion</h3>
              <p className="text-slate-700 mb-4">
                This case study highlights how strategic partnerships between financial institutions and ESG tech providers can accelerate compliance, 
                empower businesses, and contribute to the broader EU goal of net-zero emissions by 2050.
              </p>
              <p className="text-slate-700">
                By digitizing ESG data management and making compliance tools broadly available, the bank plays a critical role in building market resilience, 
                climate awareness, and long-term competitiveness among its clients.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-24 mb-8">
          <h2 className="text-3xl font-bold gradient-heading text-center mb-12">Our Impact At A Glance</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="p-6 text-center card-hover">
              <div className="mb-4 mx-auto w-16 h-16 bg-compliance-100 rounded-full flex items-center justify-center">
                <Building className="h-8 w-8 text-compliance-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2">50+</h3>
              <p className="text-slate-600">Companies supported</p>
            </Card>
            
            <Card className="p-6 text-center card-hover">
              <div className="mb-4 mx-auto w-16 h-16 bg-innovation-100 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-innovation-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2">10,000+</h3>
              <p className="text-slate-600">User hours saved</p>
            </Card>
            
            <Card className="p-6 text-center card-hover">
              <div className="mb-4 mx-auto w-16 h-16 bg-compliance-100 rounded-full flex items-center justify-center">
                <Building className="h-8 w-8 text-compliance-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2">50+</h3>
              <p className="text-slate-600">Companies supported</p>
            </Card>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default SuccessStories;
