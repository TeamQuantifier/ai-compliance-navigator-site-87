
import { CaseStudyProps } from '@/components/case-studies/CaseStudy';

export const simpleCaseStudies: CaseStudyProps[] = [
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
