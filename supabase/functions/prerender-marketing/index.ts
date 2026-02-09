import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BASE_URL = 'https://quantifier.ai';

// Hreflang map for regional targeting
const localeHreflangMap: Record<string, string> = {
  en: 'en',
  pl: 'pl-PL',
  cs: 'cs-CZ',
};

// Map page slugs to actual URL paths for correct canonical URLs
const pageUrlMap: Record<string, string> = {
  'index': '',
  'soc2-automation': 'frameworks/soc',
  'iso27001': 'frameworks/iso-27001',
  'gdpr-compliance': 'frameworks/gdpr',
  'nis2': 'frameworks/nis-ii',
  'grc-platform': 'grc-platform',
  'product-features': 'product/features',
  'plans': 'plans',
  'about': 'about',
  'contact': 'contact',
  'partners': 'partners',
  'frameworks': 'frameworks',
  'dora': 'frameworks/dora',
  'iso-9001': 'frameworks/iso-9001',
  'hipaa': 'frameworks/hipaa',
  'ccpa': 'frameworks/ccpa',
  'esg': 'frameworks/esg',
  'environmental': 'frameworks/environmental',
  'governance': 'frameworks/governance',
  'product-level': 'frameworks/product-level',
  'product-overview': 'product/overview',
  'compliance-officer': 'product/compliance-officer',
  'task-data-management': 'product/task-data-management',
  'analytics-dashboards': 'product/analytics-dashboards',
  'documents-management': 'product/documents-management',
  'api-integrations': 'product/api-integrations',
  'value-chain': 'product/value-chain',
  'risk-assessment': 'product/risk-assessment',
  'by-roles': 'by-roles',
  'by-roles-managers': 'by-roles/managers',
  'by-roles-contributors': 'by-roles/contributors',
  'by-roles-auditor': 'by-roles/auditor',
  'blog': 'blog',
  'success-stories': 'success-stories',
  'legal-privacy': 'legal/privacy',
  'legal-terms': 'legal/terms',
  'legal-cookies': 'legal/cookies',
};

interface FAQ {
  question: string;
  answer: string;
}

interface Section {
  h2: string;
  content: string[];
}

interface PageData {
  title: string;
  description: string;
  h1: string;
  subtitle?: string;
  sections: Section[];
  faqs?: FAQ[];
  internalLinks?: { text: string; href: string }[];
}

// Page content database
const getPageContent = (locale: string, page: string): PageData | null => {
  const isPolish = locale === 'pl';
  const isCzech = locale === 'cs';
  
  const pages: Record<string, Record<string, PageData>> = {
    'index': {
      en: {
        title: 'Quantifier.ai - AI-Powered GRC Platform | Compliance & Risk Management',
        description: 'End-to-end GRC in one AI-native platform. Automate ISO 27001, SOC 2, GDPR, NIS2 compliance. Reduce manual work by 80%. Trusted by 250+ companies.',
        h1: 'End-to-end GRC. In one AI-native platform.',
        subtitle: 'Your AI Compliance Officer that manages projects, collects data and presents results, automating the entire compliance process.',
        sections: [
          {
            h2: 'Comprehensive AI-Powered Compliance Suite',
            content: [
              'AI Compliance Officer - AI-driven assistant that monitors systems, identifies issues, and suggests remediation',
              'Document Management - Centralized repository with automated version control and audit trails',
              'Role-Based Access - Tailored interfaces for managers, contributors, and auditors',
              'Analytics & Dashboards - Real-time visualization of compliance status and risk levels',
              'Automated Workflows - Automate compliance processes to ensure consistency',
              'Data Management - Secure handling of sensitive data with privacy controls'
            ]
          },
          {
            h2: 'Why Teams Trust Us with Compliance',
            content: [
              'Peace of Mind, Powered by Automation - No more chasing employees or endless follow-ups',
              'Say Goodbye to Manual Oversight - AI agents handle training, data collection, and policy sign-offs',
              'Stay Ahead with Real-Time Visibility - Instantly see what\'s done, pending, and risky',
              'Launch in Minutes, Not Months - Fast, seamless rollout without expensive consultants',
              'Everything You Need in One Platform - Manage SOC 2, ISO 27001, GDPR, and more'
            ]
          },
          {
            h2: 'Compliance, powered by insiders',
            content: [
              'Join 250+ companies—from startups to multinational corporations—who trust our solutions',
              'We combine cutting-edge tech with real compliance expertise'
            ]
          },
          {
            h2: 'Tailored for Every Role',
            content: [
              'For Leadership & Executive (CFO, COO, CISO, Head of Risk) - Comprehensive dashboards to oversee compliance',
              'For Operational Teams (Compliance, IT, Security, ESG) - Streamlined interfaces for data entry and tasks',
              'For Internal & External Auditors - Detailed audit trails and verification tools'
            ]
          },
          {
            h2: 'Start Your AI-Powered Compliance Journey Today',
            content: [
              'For Enterprise - Comprehensive compliance management for complex regulatory environments',
              'For Mid-Market - Scalable solutions to grow with your compliance needs',
              'For Startups - Build compliance into your foundation from day one'
            ]
          }
        ],
        faqs: [
          { question: 'What is Quantifier.ai?', answer: 'Quantifier.ai is an AI-powered GRC (Governance, Risk, and Compliance) platform that helps organizations automate compliance workflows, manage risks, and achieve certifications faster.' },
          { question: 'Which compliance frameworks does Quantifier support?', answer: 'Quantifier supports ISO 27001, SOC 2, GDPR, NIS2, DORA, ISO 9001, NIST, HIPAA, CCPA and many more frameworks with cross-mapping capabilities.' },
          { question: 'How much time can I save with Quantifier?', answer: 'Organizations typically reduce compliance effort by 80% and achieve certifications 10x faster compared to manual processes.' }
        ],
        internalLinks: [
          { text: 'Product Features', href: '/product/features' },
          { text: 'Pricing Plans', href: '/plans' },
          { text: 'ISO 27001 Compliance', href: '/frameworks/iso-27001' },
          { text: 'SOC 2 Automation', href: '/frameworks/soc' },
          { text: 'NIS 2 Directive', href: '/frameworks/nis-ii' },
          { text: 'GDPR Compliance', href: '/frameworks/gdpr' }
        ]
      },
      pl: {
        title: 'Quantifier.ai - Platforma GRC oparta na AI | Zarządzanie Zgodnością i Ryzykiem',
        description: 'Kompleksowe GRC w jednej platformie AI. Automatyzuj ISO 27001, SOC 2, GDPR, NIS2. Zmniejsz pracę ręczną o 80%. Zaufało nam 250+ firm.',
        h1: 'Kompleksowe GRC. W jednej platformie AI.',
        subtitle: 'Twój AI Compliance Officer, który zarządza projektami, zbiera dane i prezentuje wyniki, automatyzując cały proces zgodności.',
        sections: [
          {
            h2: 'Kompleksowy pakiet zgodności oparty na AI',
            content: [
              'AI Compliance Officer - Asystent AI monitorujący systemy i identyfikujący problemy',
              'Zarządzanie dokumentami - Centralne repozytorium z automatyczną kontrolą wersji',
              'Dostęp oparty na rolach - Interfejsy dla menedżerów, współpracowników i audytorów',
              'Analityka i dashboardy - Wizualizacja statusu zgodności w czasie rzeczywistym',
              'Zautomatyzowane przepływy pracy - Automatyzacja procesów zgodności',
              'Zarządzanie danymi - Bezpieczna obsługa wrażliwych danych'
            ]
          },
          {
            h2: 'Dlaczego zespoły nam ufają',
            content: [
              'Spokój ducha dzięki automatyzacji - Koniec z poganianiem pracowników',
              'Pożegnaj ręczny nadzór - Agenci AI obsługują szkolenia i zbieranie danych',
              'Bądź o krok do przodu - Natychmiast zobacz co zrobione, co w toku, gdzie ryzyko'
            ]
          },
          {
            h2: 'Zgodność napędzana przez ekspertów',
            content: [
              'Dołącz do 250+ firm - od startupów po korporacje międzynarodowe',
              'Łączymy najnowsze technologie z prawdziwą wiedzą ekspercką'
            ]
          }
        ],
        internalLinks: [
          { text: 'Funkcje produktu', href: '/product/features' },
          { text: 'Cennik', href: '/plans' },
          { text: 'ISO 27001', href: '/frameworks/iso-27001' },
          { text: 'SOC 2', href: '/frameworks/soc' },
          { text: 'NIS 2', href: '/frameworks/nis-ii' },
          { text: 'GDPR', href: '/frameworks/gdpr' }
        ]
      },
      cs: {
        title: 'Quantifier.ai - GRC platforma poháněná AI | Správa shody a rizik',
        description: 'Komplexní GRC v jedné AI platformě. Automatizujte ISO 27001, SOC 2, GDPR, NIS2. Snižte manuální práci o 80%. Důvěřuje nám 250+ firem.',
        h1: 'Komplexní GRC. V jedné AI platformě.',
        subtitle: 'Váš AI Compliance Officer, který řídí projekty, sbírá data a prezentuje výsledky, automatizuje celý proces shody.',
        sections: [
          {
            h2: 'Komplexní sada pro shodu poháněná AI',
            content: [
              'AI Compliance Officer - AI asistent monitorující systémy a identifikující problémy',
              'Správa dokumentů - Centrální repozitář s automatickou kontrolou verzí',
              'Přístup založený na rolích - Rozhraní pro manažery, přispěvatele a auditory',
              'Analytika a dashboardy - Vizualizace stavu shody v reálném čase'
            ]
          },
          {
            h2: 'Proč nám týmy důvěřují',
            content: [
              'Klid díky automatizaci - Konec s honěním zaměstnanců',
              'Rozlučte se s manuálním dohledem - AI agenti zajistí školení a sběr dat'
            ]
          }
        ],
        internalLinks: [
          { text: 'Funkce produktu', href: '/product/features' },
          { text: 'Ceník', href: '/plans' },
          { text: 'ISO 27001', href: '/frameworks/iso-27001' },
          { text: 'SOC 2', href: '/frameworks/soc' },
          { text: 'NIS 2', href: '/frameworks/nis-ii' }
        ]
      }
    },
    'soc2-automation': {
      en: {
        title: 'SOC 2 Automation Platform - Achieve Compliance 10x Faster | Quantifier',
        description: 'Automate SOC 2 compliance with Quantifier.ai. AI-powered evidence collection, continuous monitoring, and audit-ready reports. Get certified faster.',
        h1: 'SOC 2 Automation Platform',
        subtitle: 'Achieve SOC 2 compliance 10x faster with AI-powered automation. Continuous monitoring, evidence collection, and audit-ready reports.',
        sections: [
          {
            h2: 'The Problem with Manual SOC 2 Compliance',
            content: [
              'Manual evidence collection takes months of engineering time',
              'Spreadsheet-based tracking leads to gaps and missed controls',
              'Annual audits require scrambling to gather documentation',
              'No visibility into compliance status between audits',
              'Difficult to maintain continuous compliance'
            ]
          },
          {
            h2: 'How Quantifier Automates SOC 2',
            content: [
              'AI-powered evidence collection from 100+ integrations',
              'Automated control mapping to Trust Services Criteria',
              'Continuous monitoring with real-time alerts',
              'Audit-ready reports generated automatically',
              'Gap analysis and remediation recommendations'
            ]
          },
          {
            h2: 'SOC 2 Trust Services Criteria Coverage',
            content: [
              'Security - Protection against unauthorized access',
              'Availability - System availability for operation',
              'Processing Integrity - Complete and accurate processing',
              'Confidentiality - Protection of confidential information',
              'Privacy - Collection and use of personal information'
            ]
          },
          {
            h2: 'Results Our Customers Achieve',
            content: [
              '80% reduction in time to SOC 2 certification',
              '90% less manual evidence collection',
              '100% audit success rate',
              '60% cost savings compared to manual compliance'
            ]
          }
        ],
        faqs: [
          { question: 'What is SOC 2 automation?', answer: 'SOC 2 automation uses software to continuously collect evidence, monitor controls, and maintain compliance with SOC 2 Trust Services Criteria, replacing manual spreadsheet-based processes.' },
          { question: 'How long does it take to get SOC 2 certified with Quantifier?', answer: 'Most organizations achieve SOC 2 Type I certification within 4-6 weeks using Quantifier, compared to 3-6 months with manual processes.' },
          { question: 'What Trust Services Criteria does Quantifier cover?', answer: 'Quantifier covers all five Trust Services Criteria: Security, Availability, Processing Integrity, Confidentiality, and Privacy.' },
          { question: 'Do you integrate with our existing tools?', answer: 'Yes, Quantifier integrates with 100+ tools including AWS, Azure, GCP, GitHub, Jira, Slack, Okta, and many more for automated evidence collection.' },
          { question: 'Can Quantifier help with SOC 2 Type I and Type II?', answer: 'Yes, Quantifier supports both SOC 2 Type I (point-in-time) and Type II (period of time) audits with continuous monitoring and evidence collection.' },
          { question: 'How much does SOC 2 automation cost?', answer: 'Quantifier offers flexible pricing based on company size and needs. Contact us for a customized quote and see how much you can save compared to manual compliance.' }
        ],
        internalLinks: [
          { text: 'SOC Framework Details', href: '/frameworks/soc' },
          { text: 'ISO 27001 Compliance', href: '/frameworks/iso-27001' },
          { text: 'GRC Platform Overview', href: '/grc-platform' },
          { text: 'Pricing Plans', href: '/plans' }
        ]
      },
      pl: {
        title: 'Platforma Automatyzacji SOC 2 - Uzyskaj Zgodność 10x Szybciej | Quantifier',
        description: 'Automatyzuj zgodność SOC 2 z Quantifier.ai. Zbieranie dowodów wspierane przez AI, ciągłe monitorowanie i raporty gotowe do audytu.',
        h1: 'Platforma Automatyzacji SOC 2',
        subtitle: 'Uzyskaj zgodność SOC 2 10x szybciej dzięki automatyzacji opartej na AI.',
        sections: [
          {
            h2: 'Problem z Ręczną Zgodnością SOC 2',
            content: [
              'Ręczne zbieranie dowodów zajmuje miesiące pracy inżynierów',
              'Śledzenie w arkuszach prowadzi do luk i pominiętych kontroli',
              'Roczne audyty wymagają pośpiesznego gromadzenia dokumentacji'
            ]
          },
          {
            h2: 'Jak Quantifier Automatyzuje SOC 2',
            content: [
              'Zbieranie dowodów wspierane przez AI z ponad 100 integracji',
              'Automatyczne mapowanie kontroli do kryteriów Trust Services',
              'Ciągłe monitorowanie z alertami w czasie rzeczywistym'
            ]
          }
        ],
        faqs: [
          { question: 'Czym jest automatyzacja SOC 2?', answer: 'Automatyzacja SOC 2 wykorzystuje oprogramowanie do ciągłego zbierania dowodów, monitorowania kontroli i utrzymywania zgodności z kryteriami Trust Services SOC 2.' }
        ],
        internalLinks: [
          { text: 'Szczegóły SOC', href: '/frameworks/soc' },
          { text: 'Cennik', href: '/plans' }
        ]
      }
    },
    'iso27001': {
      en: {
        title: 'ISO 27001 Compliance Software - Build Your ISMS with AI | Quantifier',
        description: 'Implement ISO 27001 faster with AI-powered ISMS software. Automated gap analysis, risk assessments, and Annex A control mapping. Get certified in weeks.',
        h1: 'ISO 27001 Compliance Software',
        subtitle: 'Build your Information Security Management System (ISMS) with AI. From gap analysis to certification in weeks, not months.',
        sections: [
          {
            h2: 'Why ISO 27001 Certification Matters',
            content: [
              'Demonstrates commitment to information security to clients and partners',
              'Required for enterprise sales and government contracts',
              'Reduces risk of data breaches and security incidents',
              'Provides competitive advantage in the market',
              'Ensures compliance with regulatory requirements'
            ]
          },
          {
            h2: 'Challenges of ISO 27001 Implementation',
            content: [
              'Complex standard with 93 Annex A controls',
              'Requires extensive documentation and policies',
              'Manual risk assessments are time-consuming',
              'Difficult to maintain continuous compliance',
              'Expensive consultant fees and internal resources'
            ]
          },
          {
            h2: 'AI-Powered ISMS Implementation',
            content: [
              'Automated gap analysis against ISO 27001 requirements',
              'AI-generated policies and procedures',
              'Intelligent risk assessment with treatment recommendations',
              'Annex A control mapping and evidence collection',
              'Continuous compliance monitoring and alerts'
            ]
          },
          {
            h2: 'Annex A Control Categories',
            content: [
              'A.5 Organizational Controls - Policies, roles, responsibilities',
              'A.6 People Controls - Screening, training, awareness',
              'A.7 Physical Controls - Secure areas, equipment security',
              'A.8 Technological Controls - Access control, cryptography, security'
            ]
          }
        ],
        faqs: [
          { question: 'What is ISO 27001?', answer: 'ISO 27001 is the international standard for information security management systems (ISMS). It provides a framework for managing and protecting sensitive information.' },
          { question: 'How does Quantifier help with ISO 27001 certification?', answer: 'Quantifier automates gap analysis, generates required documentation, performs risk assessments, and provides continuous monitoring to help you achieve and maintain ISO 27001 certification.' },
          { question: 'What is the timeline for ISO 27001 certification?', answer: 'With Quantifier, most organizations can achieve ISO 27001 certification within 8-12 weeks, compared to 6-12 months with manual processes.' },
          { question: 'Do I need consultants for ISO 27001?', answer: 'Quantifier reduces the need for expensive consultants by providing AI-powered guidance, pre-built templates, and automated compliance workflows.' },
          { question: 'How does continuous compliance work?', answer: 'Quantifier continuously monitors your security controls, collects evidence automatically, and alerts you to any compliance gaps or issues in real-time.' },
          { question: 'Can I manage ISO 27001 and SOC 2 together?', answer: 'Yes, Quantifier supports multi-framework compliance with cross-mapping between ISO 27001 and SOC 2, reducing duplicate effort.' }
        ],
        internalLinks: [
          { text: 'ISO 27001 Framework Details', href: '/frameworks/iso-27001' },
          { text: 'SOC 2 Automation', href: '/frameworks/soc' },
          { text: 'GRC Platform', href: '/grc-platform' },
          { text: 'Pricing', href: '/plans' }
        ]
      },
      pl: {
        title: 'Oprogramowanie do Zgodności ISO 27001 - Zbuduj ISMS z AI | Quantifier',
        description: 'Wdróż ISO 27001 szybciej dzięki oprogramowaniu ISMS wspieranemu przez AI. Automatyczna analiza luk i ocena ryzyka.',
        h1: 'Oprogramowanie do Zgodności ISO 27001',
        subtitle: 'Zbuduj swój System Zarządzania Bezpieczeństwem Informacji (ISMS) z AI.',
        sections: [
          {
            h2: 'Dlaczego Certyfikacja ISO 27001 Jest Ważna',
            content: [
              'Demonstruje zaangażowanie w bezpieczeństwo informacji',
              'Wymagana dla sprzedaży korporacyjnej i kontraktów rządowych',
              'Zmniejsza ryzyko naruszeń danych'
            ]
          }
        ],
        faqs: [
          { question: 'Czym jest ISO 27001?', answer: 'ISO 27001 to międzynarodowy standard dla systemów zarządzania bezpieczeństwem informacji (ISMS).' }
        ],
        internalLinks: [
          { text: 'Szczegóły ISO 27001', href: '/frameworks/iso-27001' },
          { text: 'Cennik', href: '/plans' }
        ]
      }
    },
    'gdpr-compliance': {
      en: {
        title: 'GDPR Compliance Software - Automate Data Privacy Management | Quantifier',
        description: 'Simplify GDPR compliance with automated data mapping, DSAR handling, and privacy impact assessments. Protect personal data and avoid fines.',
        h1: 'GDPR Compliance Software',
        subtitle: 'Automate data privacy management and GDPR compliance. From data mapping to DSAR handling, all in one platform.',
        sections: [
          {
            h2: 'GDPR Requirements Overview',
            content: [
              'Lawful basis for processing personal data',
              'Data subject rights (access, erasure, portability)',
              'Data protection by design and default',
              'Data breach notification within 72 hours',
              'Cross-border data transfer compliance'
            ]
          },
          {
            h2: 'Common GDPR Compliance Challenges',
            content: [
              'Tracking personal data across multiple systems',
              'Managing data subject access requests (DSARs) manually',
              'Conducting privacy impact assessments',
              'Maintaining records of processing activities',
              'Ensuring third-party vendor compliance'
            ]
          },
          {
            h2: 'Complete GDPR Management Solution',
            content: [
              'Automated data discovery and mapping',
              'DSAR workflow automation and tracking',
              'Privacy impact assessment templates',
              'Consent management and documentation',
              'Vendor risk assessment and monitoring'
            ]
          },
          {
            h2: 'Data Subject Rights Automation',
            content: [
              'Access requests - Provide data within 30 days',
              'Erasure requests - Right to be forgotten workflow',
              'Portability requests - Export data in machine-readable format',
              'Rectification requests - Update inaccurate data',
              'Objection handling - Process and document objections'
            ]
          }
        ],
        faqs: [
          { question: 'What is GDPR compliance?', answer: 'GDPR (General Data Protection Regulation) compliance means following EU regulations for protecting personal data of EU residents, including lawful processing, data subject rights, and breach notification.' },
          { question: 'How does Quantifier help with GDPR?', answer: 'Quantifier automates data mapping, DSAR handling, privacy impact assessments, and provides continuous monitoring to help you maintain GDPR compliance.' },
          { question: 'Can you automate DSAR handling?', answer: 'Yes, Quantifier provides automated workflows for all types of data subject requests including access, erasure, portability, and rectification requests.' },
          { question: 'How do you handle cross-border data transfers?', answer: 'Quantifier helps document and manage cross-border transfers with standard contractual clauses, adequacy decisions, and binding corporate rules.' },
          { question: 'What about cookie consent management?', answer: 'Quantifier integrates with cookie consent platforms and helps you document consent collection, preferences, and withdrawal across your digital properties.' },
          { question: 'Do you support other privacy regulations?', answer: 'Yes, Quantifier supports CCPA, LGPD, POPIA, and other privacy regulations with cross-mapping to reduce duplicate compliance effort.' }
        ],
        internalLinks: [
          { text: 'All Frameworks', href: '/frameworks' },
          { text: 'ISO 27001 Compliance', href: '/frameworks/iso-27001' },
          { text: 'NIS2 Compliance', href: '/frameworks/nis-ii' },
          { text: 'Pricing', href: '/plans' }
        ]
      },
      pl: {
        title: 'Oprogramowanie do Zgodności z GDPR - Automatyzacja Zarządzania Prywatnością | Quantifier',
        description: 'Uprość zgodność z GDPR dzięki automatycznemu mapowaniu danych, obsłudze DSAR i ocenom wpływu na prywatność.',
        h1: 'Oprogramowanie do Zgodności z GDPR',
        subtitle: 'Automatyzuj zarządzanie prywatnością danych i zgodność z GDPR.',
        sections: [
          {
            h2: 'Przegląd Wymagań GDPR',
            content: [
              'Podstawa prawna przetwarzania danych osobowych',
              'Prawa osób, których dane dotyczą',
              'Ochrona danych w fazie projektowania'
            ]
          }
        ],
        faqs: [
          { question: 'Czym jest zgodność z GDPR?', answer: 'Zgodność z GDPR oznacza przestrzeganie przepisów UE dotyczących ochrony danych osobowych mieszkańców UE.' }
        ],
        internalLinks: [
          { text: 'Bezpieczeństwo Danych', href: '/frameworks/data-security' },
          { text: 'Cennik', href: '/plans' }
        ]
      }
    },
    'nis2': {
      en: {
        title: 'NIS2 Compliance Platform - Meet EU Cybersecurity Requirements | Quantifier',
        description: 'Prepare for NIS2 Directive compliance with automated risk management, incident reporting, and supply chain security. Avoid penalties up to €10M.',
        h1: 'NIS2 Compliance Platform',
        subtitle: 'Meet EU cybersecurity requirements with automated NIS2 compliance. Risk management, incident reporting, and supply chain security in one platform.',
        sections: [
          {
            h2: 'Understanding the NIS2 Directive',
            content: [
              'NIS2 is the updated EU directive on network and information security',
              'Expands scope to cover more sectors and entities',
              'Introduces stricter security requirements and penalties',
              'Mandates incident reporting within 24-72 hours',
              'Requires supply chain risk management'
            ]
          },
          {
            h2: 'Who Must Comply with NIS2',
            content: [
              'Essential entities: Energy, transport, banking, health, water, digital infrastructure',
              'Important entities: Postal services, waste, chemicals, food, manufacturing',
              'Digital service providers: Cloud, data centers, CDNs, social networks',
              'Public administration entities',
              'Medium and large enterprises in covered sectors'
            ]
          },
          {
            h2: 'NIS2 Implementation with Quantifier',
            content: [
              'Cybersecurity risk assessment and management',
              'Incident handling and reporting workflows',
              'Business continuity and crisis management',
              'Supply chain security assessment',
              'Security awareness training management'
            ]
          },
          {
            h2: 'Incident Response and Reporting',
            content: [
              'Early warning within 24 hours of significant incident',
              'Incident notification within 72 hours',
              'Final report within one month',
              'Automated incident classification and routing',
              'Integration with national CSIRTs'
            ]
          }
        ],
        faqs: [
          { question: 'What is the NIS2 Directive?', answer: 'NIS2 is the updated EU directive on the security of network and information systems, replacing NIS1 with stricter requirements and broader scope.' },
          { question: 'Which organizations must comply with NIS2?', answer: 'Essential and important entities in sectors like energy, transport, health, banking, digital infrastructure, and many others must comply. This includes medium and large enterprises.' },
          { question: 'What are the NIS2 penalties for non-compliance?', answer: 'Penalties can reach up to €10 million or 2% of global annual turnover for essential entities, and €7 million or 1.4% for important entities.' },
          { question: 'How does Quantifier help with NIS2?', answer: 'Quantifier provides automated risk assessments, incident reporting workflows, supply chain security monitoring, and continuous compliance tracking for NIS2 requirements.' },
          { question: 'What is the NIS2 compliance deadline?', answer: 'EU member states must transpose NIS2 into national law by October 2024, with organizations required to comply thereafter.' },
          { question: 'How long does NIS2 implementation take?', answer: 'With Quantifier, organizations can implement NIS2 requirements within 2-3 months, depending on current security maturity.' }
        ],
        internalLinks: [
          { text: 'Cybersecurity Frameworks', href: '/frameworks/cybersecurity' },
          { text: 'DORA Compliance', href: '/frameworks/information-security/dora' },
          { text: 'ISO 27001', href: '/iso27001' },
          { text: 'Pricing', href: '/plans' }
        ]
      },
      pl: {
        title: 'Platforma Zgodności NIS2 - Spełnij Wymagania Cyberbezpieczeństwa UE | Quantifier',
        description: 'Przygotuj się na zgodność z dyrektywą NIS2. Automatyczne zarządzanie ryzykiem, raportowanie incydentów i bezpieczeństwo łańcucha dostaw.',
        h1: 'Platforma Zgodności NIS2',
        subtitle: 'Spełnij wymagania cyberbezpieczeństwa UE z automatyczną zgodnością NIS2.',
        sections: [
          {
            h2: 'Zrozumienie Dyrektywy NIS2',
            content: [
              'NIS2 to zaktualizowana dyrektywa UE dotycząca bezpieczeństwa sieci i informacji',
              'Rozszerza zakres na więcej sektorów i podmiotów',
              'Wprowadza surowsze wymagania bezpieczeństwa i kary'
            ]
          }
        ],
        faqs: [
          { question: 'Czym jest dyrektywa NIS2?', answer: 'NIS2 to zaktualizowana dyrektywa UE dotycząca bezpieczeństwa systemów sieciowych i informacyjnych.' }
        ],
        internalLinks: [
          { text: 'Frameworki Cyberbezpieczeństwa', href: '/frameworks/cybersecurity' },
          { text: 'Cennik', href: '/plans' }
        ]
      }
    },
    'grc-platform': {
      en: {
        title: 'AI-Native GRC Platform - Unified Governance, Risk & Compliance | Quantifier',
        description: 'Modern GRC platform with AI automation. Manage governance, risk, and compliance across multiple frameworks. Replace spreadsheets with intelligent workflows.',
        h1: 'AI-Native GRC Platform',
        subtitle: 'Unified Governance, Risk, and Compliance management. Replace spreadsheets with intelligent automation.',
        sections: [
          {
            h2: 'What is a GRC Platform?',
            content: [
              'Governance: Define policies, controls, and organizational structure',
              'Risk Management: Identify, assess, and mitigate risks',
              'Compliance: Meet regulatory and industry standard requirements',
              'Integrated approach: Break down silos between teams',
              'Continuous monitoring: Real-time visibility into GRC posture'
            ]
          },
          {
            h2: 'Why Traditional GRC Tools Fall Short',
            content: [
              'Manual data entry and evidence collection',
              'Siloed systems that dont talk to each other',
              'Point-in-time assessments instead of continuous monitoring',
              'Complex implementations taking 12-18 months',
              'High total cost of ownership'
            ]
          },
          {
            h2: 'The Quantifier Difference: AI-Native GRC',
            content: [
              'AI-powered automation reduces manual effort by 80%',
              'Unified platform for all frameworks and standards',
              'Deploy in weeks, not months or years',
              'Continuous compliance with real-time monitoring',
              'Built-in integrations with 100+ tools'
            ]
          },
          {
            h2: 'Multi-Framework Compliance',
            content: [
              'ISO 27001 - Information Security Management',
              'SOC 2 - Trust Services Criteria',
              'GDPR - Data Privacy Regulation',
              'NIS2 - EU Cybersecurity Directive',
              'DORA - Digital Operational Resilience',
              'NIST - Cybersecurity Framework',
              'PCI DSS - Payment Card Security'
            ]
          }
        ],
        faqs: [
          { question: 'What is GRC?', answer: 'GRC stands for Governance, Risk, and Compliance. It is an integrated approach to managing organizational governance, enterprise risk management, and regulatory compliance.' },
          { question: 'Why do I need a GRC platform?', answer: 'A GRC platform provides centralized visibility, automates manual processes, reduces compliance costs, and ensures consistent risk management across the organization.' },
          { question: 'What frameworks does Quantifier support?', answer: 'Quantifier supports ISO 27001, SOC 2, GDPR, NIS2, DORA, NIST, PCI DSS, ISO 9001, and many more with cross-framework mapping.' },
          { question: 'How is Quantifier different from Vanta or Drata?', answer: 'Quantifier is built AI-native from the ground up, supports more frameworks including ESG and environmental compliance, and provides deeper automation capabilities.' },
          { question: 'Can I manage multiple compliance programs?', answer: 'Yes, Quantifier supports multi-framework compliance with intelligent cross-mapping to eliminate duplicate work and streamline audits.' },
          { question: 'What integrations are available?', answer: 'Quantifier integrates with 100+ tools including AWS, Azure, GCP, GitHub, Jira, Slack, Okta, Google Workspace, and many more.' }
        ],
        internalLinks: [
          { text: 'All Frameworks', href: '/frameworks' },
          { text: 'SOC 2 Automation', href: '/soc2-automation' },
          { text: 'ISO 27001', href: '/iso27001' },
          { text: 'Pricing', href: '/plans' }
        ]
      },
      pl: {
        title: 'Natywna Platforma GRC z AI - Ujednolicone Zarządzanie, Ryzyko i Zgodność | Quantifier',
        description: 'Nowoczesna platforma GRC z automatyzacją AI. Zarządzaj governance, ryzykiem i zgodnością w wielu standardach.',
        h1: 'Natywna Platforma GRC z AI',
        subtitle: 'Ujednolicone zarządzanie governance, ryzykiem i zgodnością.',
        sections: [
          {
            h2: 'Czym jest Platforma GRC?',
            content: [
              'Governance: Definiowanie polityk, kontroli i struktury organizacyjnej',
              'Zarządzanie Ryzykiem: Identyfikacja, ocena i mitygacja ryzyk',
              'Zgodność: Spełnianie wymogów regulacyjnych i standardów branżowych'
            ]
          }
        ],
        faqs: [
          { question: 'Czym jest GRC?', answer: 'GRC oznacza Governance, Risk i Compliance. Jest to zintegrowane podejście do zarządzania governance organizacyjnym, ryzykiem przedsiębiorstwa i zgodnością regulacyjną.' }
        ],
        internalLinks: [
          { text: 'Wszystkie Frameworki', href: '/frameworks' },
          { text: 'Cennik', href: '/plans' }
        ]
      }
    },
    'product-features': {
      en: {
        title: 'Product Features - AI-Powered Compliance Automation | Quantifier',
        description: 'Explore Quantifier features: AI compliance officer, risk assessments, document management, analytics dashboards, and 100+ integrations.',
        h1: 'Product Features',
        subtitle: 'Everything you need to automate compliance and manage risk in one platform.',
        sections: [
          {
            h2: 'AI Compliance Officer',
            content: [
              'Get instant answers to compliance questions',
              'AI-generated policies and procedures',
              'Automated gap analysis and recommendations',
              'Natural language interface for compliance queries'
            ]
          },
          {
            h2: 'Risk Assessment',
            content: [
              'Automated risk identification and scoring',
              'Treatment recommendations with AI insights',
              'Risk register with tracking and reporting',
              'Continuous risk monitoring'
            ]
          },
          {
            h2: 'Document Management',
            content: [
              'Centralized policy and evidence storage',
              'Version control and approval workflows',
              'Automatic evidence collection',
              'Audit-ready documentation'
            ]
          },
          {
            h2: 'Analytics Dashboards',
            content: [
              'Real-time compliance status',
              'Risk heat maps and trends',
              'Framework progress tracking',
              'Executive reporting'
            ]
          }
        ],
        internalLinks: [
          { text: 'AI Compliance Officer', href: '/product/compliance-officer' },
          { text: 'Risk Assessment', href: '/product/risk-assessment' },
          { text: 'Pricing', href: '/plans' }
        ]
      },
      pl: {
        title: 'Funkcje Produktu - Automatyzacja Zgodności z AI | Quantifier',
        description: 'Poznaj funkcje Quantifier: AI compliance officer, oceny ryzyka, zarządzanie dokumentami, pulpity analityczne.',
        h1: 'Funkcje Produktu',
        subtitle: 'Wszystko czego potrzebujesz do automatyzacji zgodności i zarządzania ryzykiem.',
        sections: [
          {
            h2: 'AI Compliance Officer',
            content: [
              'Natychmiastowe odpowiedzi na pytania dotyczące zgodności',
              'Polityki i procedury generowane przez AI'
            ]
          }
        ],
        internalLinks: [
          { text: 'Cennik', href: '/plans' }
        ]
      }
    },
    'plans': {
      en: {
        title: 'Pricing Plans - Flexible Compliance Solutions | Quantifier',
        description: 'Choose the right plan for your compliance needs. From startups to enterprises, flexible pricing with no hidden fees. Start free trial today.',
        h1: 'Pricing Plans',
        subtitle: 'Choose the plan that fits your compliance needs. All plans include our AI-powered platform.',
        sections: [
          {
            h2: 'Plan Options',
            content: [
              'Starter - For small teams getting started with compliance',
              'Professional - For growing companies with multiple frameworks',
              'Enterprise - For large organizations with advanced needs',
              'All plans include unlimited users and frameworks'
            ]
          },
          {
            h2: 'What is Included',
            content: [
              'AI Compliance Officer for instant guidance',
              'Automated evidence collection',
              'Risk assessment and management',
              'Analytics dashboards and reporting',
              'Dedicated customer success manager'
            ]
          }
        ],
        faqs: [
          { question: 'Do you offer a free trial?', answer: 'Yes, we offer a 14-day free trial with full access to all features. No credit card required.' },
          { question: 'Can I change plans later?', answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.' },
          { question: 'Is there a setup fee?', answer: 'No, there are no setup fees. You can start using Quantifier immediately after signing up.' }
        ],
        internalLinks: [
          { text: 'Contact Sales', href: '/contact' },
          { text: 'Product Features', href: '/product/features' },
          { text: 'SOC 2 Automation', href: '/soc2-automation' }
        ]
      },
      pl: {
        title: 'Cennik - Elastyczne Rozwiązania Zgodności | Quantifier',
        description: 'Wybierz odpowiedni plan dla swoich potrzeb zgodności. Od startupów po przedsiębiorstwa.',
        h1: 'Cennik',
        subtitle: 'Wybierz plan dopasowany do Twoich potrzeb zgodności.',
        sections: [
          {
            h2: 'Opcje Planów',
            content: [
              'Starter - Dla małych zespołów rozpoczynających zgodność',
              'Professional - Dla rozwijających się firm z wieloma standardami',
              'Enterprise - Dla dużych organizacji z zaawansowanymi potrzebami'
            ]
          }
        ],
        internalLinks: [
          { text: 'Kontakt', href: '/contact' },
          { text: 'Funkcje Produktu', href: '/product/features' }
        ]
      }
    },
    'about': {
      en: {
        title: 'About Quantifier - Our Mission to Simplify Compliance | Quantifier',
        description: 'Learn about Quantifier mission to make compliance accessible for every organization. Meet our team and discover our story.',
        h1: 'About Quantifier',
        subtitle: 'Our mission is to make compliance simple, automated, and accessible for every organization.',
        sections: [
          {
            h2: 'Our Mission',
            content: [
              'Compliance should not be a burden that slows down innovation',
              'Every organization deserves access to enterprise-grade security practices',
              'AI can eliminate the manual drudgery of compliance work',
              'We are building the future of GRC'
            ]
          },
          {
            h2: 'Our Story',
            content: [
              'Founded by compliance and security professionals',
              'Built from frustration with legacy GRC tools',
              'AI-native approach from day one',
              'Serving hundreds of organizations worldwide'
            ]
          }
        ],
        internalLinks: [
          { text: 'Contact Us', href: '/contact' },
          { text: 'Careers', href: '/contact' },
          { text: 'Product', href: '/product/features' }
        ]
      },
      pl: {
        title: 'O Quantifier - Nasza Misja Upraszczania Zgodności | Quantifier',
        description: 'Poznaj misję Quantifier - uczynić zgodność dostępną dla każdej organizacji.',
        h1: 'O Quantifier',
        subtitle: 'Nasza misja to uczynić zgodność prostą, zautomatyzowaną i dostępną dla każdej organizacji.',
        sections: [
          {
            h2: 'Nasza Misja',
            content: [
              'Zgodność nie powinna być obciążeniem spowalniającym innowacje',
              'Każda organizacja zasługuje na dostęp do praktyk bezpieczeństwa klasy enterprise'
            ]
          }
        ],
        internalLinks: [
          { text: 'Kontakt', href: '/contact' },
          { text: 'Produkt', href: '/product/features' }
        ]
      }
    },
    'contact': {
      en: {
        title: 'Contact Quantifier - Get in Touch | Quantifier',
        description: 'Contact Quantifier for a demo, pricing information, or to learn how we can help with your compliance needs.',
        h1: 'Contact Us',
        subtitle: 'Get in touch with our team. We would love to hear from you and discuss how Quantifier can help.',
        sections: [
          {
            h2: 'Get in Touch',
            content: [
              'Schedule a personalized demo',
              'Get pricing information',
              'Ask questions about our platform',
              'Learn about partnership opportunities'
            ]
          }
        ],
        internalLinks: [
          { text: 'Pricing', href: '/plans' },
          { text: 'Product Features', href: '/product/features' },
          { text: 'About Us', href: '/about' }
        ]
      },
      pl: {
        title: 'Kontakt z Quantifier - Skontaktuj się | Quantifier',
        description: 'Skontaktuj się z Quantifier aby umówić demo lub dowiedzieć się więcej o naszej platformie.',
        h1: 'Kontakt',
        subtitle: 'Skontaktuj się z naszym zespołem. Chętnie porozmawiamy o tym jak Quantifier może pomóc.',
        sections: [
          {
            h2: 'Skontaktuj się',
            content: [
              'Umów spersonalizowane demo',
              'Uzyskaj informacje o cenach',
              'Zadaj pytania o naszą platformę'
            ]
          }
        ],
        internalLinks: [
          { text: 'Cennik', href: '/plans' },
          { text: 'O nas', href: '/about' }
        ]
      }
    },
    'partners': {
      en: {
        title: 'Partner with Quantifier - Grow Your Business | Quantifier',
        description: 'Join the Quantifier partner program. Help your clients achieve compliance faster while growing your business.',
        h1: 'Partner with Quantifier',
        subtitle: 'Join our partner program and help organizations achieve compliance faster.',
        sections: [
          {
            h2: 'Partnership Benefits',
            content: [
              'Revenue sharing and referral commissions',
              'Partner training and certification',
              'Co-marketing opportunities',
              'Dedicated partner support',
              'Early access to new features'
            ]
          },
          {
            h2: 'Partner Types',
            content: [
              'Consulting Partners - Compliance consultants and advisors',
              'Technology Partners - Integrate with Quantifier',
              'Reseller Partners - Sell Quantifier to your clients',
              'Referral Partners - Earn commissions on referrals'
            ]
          }
        ],
        internalLinks: [
          { text: 'Contact Us', href: '/contact' },
          { text: 'About Quantifier', href: '/about' }
        ]
      },
      pl: {
        title: 'Zostań Partnerem Quantifier - Rozwijaj Swój Biznes | Quantifier',
        description: 'Dołącz do programu partnerskiego Quantifier. Pomagaj klientom osiągać zgodność szybciej.',
        h1: 'Zostań Partnerem Quantifier',
        subtitle: 'Dołącz do naszego programu partnerskiego.',
        sections: [
          {
            h2: 'Korzyści dla Partnerów',
            content: [
              'Podział przychodów i prowizje za polecenia',
              'Szkolenia i certyfikacja partnerów',
              'Możliwości wspólnego marketingu'
            ]
          }
        ],
        internalLinks: [
          { text: 'Kontakt', href: '/contact' },
          { text: 'O Quantifier', href: '/about' }
        ]
      }
    },
    'frameworks': {
      en: {
        title: 'Compliance Frameworks - ISO 27001, SOC 2, NIS II, GDPR & More | Quantifier',
        description: 'Comprehensive support for key regulatory standards: NIS II, ISO 27001, SOC 2, GDPR, NIST and more. Automation, monitoring and reporting in one platform.',
        h1: 'Compliance Frameworks',
        subtitle: 'Comprehensive support for key regulatory standards. Automation, monitoring and reporting in one platform.',
        sections: [
          {
            h2: 'Most Popular Frameworks',
            content: [
              'NIS II - EU Cybersecurity Directive for essential and important entities',
              'ISO 27001 - Information Security Management System standard',
              'SOC 2 - Service Organization Controls for trust and security',
              'GDPR - General Data Protection Regulation for EU data privacy',
              'NIST - National Institute of Standards and Technology Cybersecurity Framework'
            ]
          },
          {
            h2: 'Cybersecurity Standards',
            content: [
              'NIS II - Network and Information Security Directive',
              'SOC 1 & SOC 2 - Trust Services Criteria',
              'NIST - Cybersecurity Framework'
            ]
          },
          {
            h2: 'Information Security',
            content: [
              'ISO 27001 - Information Security Management System',
              'ISO 9001 - Quality Management System'
            ]
          },
          {
            h2: 'Data Protection',
            content: [
              'GDPR - General Data Protection Regulation',
              'HIPAA - Health Insurance Portability and Accountability Act',
              'CCPA - California Consumer Privacy Act'
            ]
          },
          {
            h2: 'ESG & Environmental',
            content: [
              'ESG Reporting - Environmental, Social and Governance',
              'ISO 14001 - Environmental Management',
              'Carbon Footprint & GHG Protocol',
              'LCA - Life Cycle Assessment'
            ]
          }
        ],
        internalLinks: [
          { text: 'NIS II', href: '/frameworks/nis-ii' },
          { text: 'ISO 27001', href: '/frameworks/iso-27001' },
          { text: 'SOC 2', href: '/frameworks/soc' },
          { text: 'GDPR', href: '/frameworks/gdpr' },
          { text: 'NIST', href: '/frameworks/nist' },
          { text: 'GRC Platform', href: '/grc-platform' }
        ]
      },
      pl: {
        title: 'Standardy Compliance - ISO 27001, SOC 2, NIS II, GDPR i Więcej | Quantifier',
        description: 'Kompleksowe wsparcie dla kluczowych standardów regulacyjnych: NIS II, ISO 27001, SOC 2, GDPR, NIST i wiele innych. Automatyzacja, monitoring i raportowanie.',
        h1: 'Standardy Compliance',
        subtitle: 'Kompleksowe wsparcie dla kluczowych standardów regulacyjnych. Automatyzacja, monitoring i raportowanie w jednej platformie.',
        sections: [
          {
            h2: 'Najpopularniejsze Standardy',
            content: [
              'NIS II - Dyrektywa UE o cyberbezpieczeństwie',
              'ISO 27001 - System Zarządzania Bezpieczeństwem Informacji',
              'SOC 2 - Kontrole organizacji usługowych',
              'GDPR/RODO - Rozporządzenie o ochronie danych osobowych',
              'NIST - Framework cyberbezpieczeństwa'
            ]
          },
          {
            h2: 'Cyberbezpieczeństwo',
            content: [
              'NIS II - Dyrektywa o bezpieczeństwie sieci i informacji',
              'SOC 1 i SOC 2 - Kontrole organizacji usługowych',
              'NIST - Framework cyberbezpieczeństwa'
            ]
          },
          {
            h2: 'Bezpieczeństwo Informacji',
            content: [
              'ISO 27001 - System Zarządzania Bezpieczeństwem Informacji',
              'ISO 9001 - System Zarządzania Jakością'
            ]
          },
          {
            h2: 'Ochrona Danych',
            content: [
              'GDPR/RODO - Rozporządzenie o ochronie danych osobowych',
              'HIPAA - Ustawa o przenośności i odpowiedzialności ubezpieczeń zdrowotnych',
              'CCPA - Kalifornijska ustawa o ochronie prywatności konsumentów'
            ]
          }
        ],
        internalLinks: [
          { text: 'NIS II', href: '/frameworks/nis-ii' },
          { text: 'ISO 27001', href: '/frameworks/iso-27001' },
          { text: 'SOC 2', href: '/frameworks/soc' },
          { text: 'GDPR', href: '/frameworks/gdpr' },
          { text: 'NIST', href: '/frameworks/nist' },
          { text: 'Platforma GRC', href: '/grc-platform' }
        ]
      }
    }
  };

  const pageData = pages[page];
  if (!pageData) return null;
  
  return pageData[locale] || pageData['en'];
};

// Generate JSON-LD schemas
function generateSchemas(locale: string, page: string, pageData: PageData): string {
  const baseUrl = `${BASE_URL}/${locale}`;
  const pageUrl = page === 'index' ? baseUrl : `${baseUrl}/${page}`;
  
  const schemas: object[] = [];
  
  // BreadcrumbList
  const breadcrumbItems = [
    { name: locale === 'pl' ? 'Strona główna' : 'Home', url: baseUrl }
  ];
  
  if (page !== 'index') {
    breadcrumbItems.push({ name: pageData.h1, url: pageUrl });
  }
  
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url
    }))
  });
  
  // SoftwareApplication for relevant pages
  if (['index', 'soc2-automation', 'iso27001', 'gdpr-compliance', 'nis2', 'grc-platform', 'product-features'].includes(page)) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Quantifier',
      'applicationCategory': 'BusinessApplication',
      'operatingSystem': 'Web',
      'description': pageData.description,
      'url': BASE_URL,
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.9',
        'ratingCount': '127',
        'bestRating': '5',
        'worstRating': '1'
      },
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD',
        'description': 'Free trial available'
      }
    });
  }
  
  // FAQPage for pages with FAQs
  if (pageData.faqs && pageData.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': pageData.faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    });
  }
  
  // Organization for homepage
  if (page === 'index') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Quantifier',
      'url': BASE_URL,
      'logo': `${BASE_URL}/og-image.png`,
      'sameAs': [
        'https://www.linkedin.com/company/quantifier-ai',
        'https://twitter.com/quantifier_ai'
      ]
    });
  }
  
  return schemas.map(schema => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('\n');
}

// Generate HTML content
function generateHtml(locale: string, page: string, pageData: PageData): string {
  const baseUrl = `${BASE_URL}/${locale}`;
  const pageUrl = page === 'index' ? baseUrl : `${baseUrl}/${page}`;
  
  // Generate all locale URLs for hreflang
  const locales = ['en', 'pl', 'cs'];
  const hreflangTags = locales.map(l => {
    const url = page === 'index' ? `${BASE_URL}/${l}` : `${BASE_URL}/${l}/${page}`;
    return `<link rel="alternate" hreflang="${l}" href="${url}">`;
  }).join('\n  ');
  
  const schemas = generateSchemas(locale, page, pageData);
  
  // Generate main navigation HTML
  const navLabels = {
    en: { product: 'Product', frameworks: 'Frameworks', plans: 'Plans', partners: 'Partners', blog: 'Blog', contact: 'Contact' },
    pl: { product: 'Produkt', frameworks: 'Standardy', plans: 'Cennik', partners: 'Partnerzy', blog: 'Blog', contact: 'Kontakt' },
    cs: { product: 'Produkt', frameworks: 'Standardy', plans: 'Ceník', partners: 'Partneři', blog: 'Blog', contact: 'Kontakt' }
  };
  const labels = navLabels[locale as keyof typeof navLabels] || navLabels.en;
  
  const mainNavHtml = `
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="${BASE_URL}/${locale}/product/features">${labels.product}</a></li>
        <li><a href="${BASE_URL}/${locale}/frameworks">${labels.frameworks}</a></li>
        <li><a href="${BASE_URL}/${locale}/plans">${labels.plans}</a></li>
        <li><a href="${BASE_URL}/${locale}/partners">${labels.partners}</a></li>
        <li><a href="${BASE_URL}/${locale}/blog">${labels.blog}</a></li>
        <li><a href="${BASE_URL}/${locale}/contact">${labels.contact}</a></li>
      </ul>
    </nav>
  `;
  
  // Generate sections HTML
  const sectionsHtml = pageData.sections.map(section => `
    <section>
      <h2>${section.h2}</h2>
      <ul>
        ${section.content.map(item => `<li>${item}</li>`).join('\n        ')}
      </ul>
    </section>
  `).join('\n');
  
  // Generate FAQ HTML
  const faqTitle = locale === 'pl' ? 'Często Zadawane Pytania' : (locale === 'cs' ? 'Často Kladené Otázky' : 'Frequently Asked Questions');
  const faqHtml = pageData.faqs ? `
    <section class="faq-section">
      <h2>${faqTitle}</h2>
      ${pageData.faqs.map(faq => `
        <div class="faq-item">
          <h3>${faq.question}</h3>
          <p>${faq.answer}</p>
        </div>
      `).join('\n')}
    </section>
  ` : '';
  
  // Generate internal links HTML
  const relatedTitle = locale === 'pl' ? 'Powiązane Strony' : (locale === 'cs' ? 'Související Stránky' : 'Related Pages');
  const linksHtml = pageData.internalLinks ? `
    <nav class="internal-links">
      <h2>${relatedTitle}</h2>
      <ul>
        ${pageData.internalLinks.map(link => `<li><a href="${BASE_URL}/${locale}${link.href}">${link.text}</a></li>`).join('\n        ')}
      </ul>
    </nav>
  ` : '';
  
  const ogLocale = locale === 'pl' ? 'pl_PL' : (locale === 'cs' ? 'cs_CZ' : 'en_US');
  const ctaTitle = locale === 'pl' ? 'Rozpocznij z Quantifier' : (locale === 'cs' ? 'Začněte s Quantifier' : 'Get Started with Quantifier');
  const ctaText = locale === 'pl' ? 'Dołącz do setek organizacji, które zautomatyzowały swoją zgodność z Quantifier.' : (locale === 'cs' ? 'Připojte se ke stovkám organizací, které automatizovaly svou shodu s Quantifier.' : 'Join hundreds of organizations that have automated their compliance with Quantifier.');
  const ctaButton = locale === 'pl' ? 'Umów Demo' : (locale === 'cs' ? 'Naplánovat Demo' : 'Schedule a Demo');
  const footerText = locale === 'pl' ? 'Wszelkie prawa zastrzeżone.' : (locale === 'cs' ? 'Všechna práva vyhrazena.' : 'All rights reserved.');

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow">
  <title>${pageData.title}</title>
  <meta name="description" content="${pageData.description}">
  <link rel="canonical" href="${pageUrl}">
  ${hreflangTags}
  <link rel="alternate" hreflang="x-default" href="${BASE_URL}/en/${page === 'index' ? '' : page}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${pageData.title}">
  <meta property="og:description" content="${pageData.description}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:site_name" content="Quantifier">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${BASE_URL}/og-image.png">
  <meta property="og:locale" content="${ogLocale}">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${pageData.title}">
  <meta name="twitter:description" content="${pageData.description}">
  <meta name="twitter:image" content="${BASE_URL}/og-image.png">
  
  ${schemas}
  
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #1a1a2e; background: #fff; padding: 2rem; max-width: 1200px; margin: 0 auto; }
    h1 { font-size: 2.5rem; margin-bottom: 1rem; color: #0f172a; }
    h2 { font-size: 1.75rem; margin: 2rem 0 1rem; color: #1e293b; }
    h3 { font-size: 1.25rem; margin: 1rem 0 0.5rem; color: #334155; }
    p { margin-bottom: 1rem; color: #475569; }
    ul { margin: 1rem 0; padding-left: 1.5rem; }
    li { margin-bottom: 0.5rem; color: #475569; }
    a { color: #2563eb; text-decoration: none; }
    a:hover { text-decoration: underline; }
    nav[aria-label="Main navigation"] ul { display: flex; flex-wrap: wrap; gap: 1rem; list-style: none; padding: 0; margin-bottom: 2rem; }
    nav[aria-label="Main navigation"] li a { background: #f1f5f9; padding: 0.5rem 1rem; border-radius: 4px; display: inline-block; }
    .subtitle { font-size: 1.25rem; color: #64748b; margin-bottom: 2rem; }
    section { margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid #e2e8f0; }
    .faq-section { background: #f8fafc; padding: 1.5rem; border-radius: 8px; }
    .faq-item { margin-bottom: 1.5rem; }
    .internal-links { margin-top: 2rem; }
    .internal-links ul { display: flex; flex-wrap: wrap; gap: 1rem; list-style: none; padding: 0; }
    .internal-links li { background: #f1f5f9; padding: 0.5rem 1rem; border-radius: 4px; }
    .cta { background: #2563eb; color: white; padding: 1rem 2rem; border-radius: 8px; display: inline-block; margin-top: 1rem; }
  </style>
  
  <script>
    // Redirect non-bot users to SPA
    (function() {
      var botPattern = /bot|crawl|spider|slurp|facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Discordbot|Telegrambot|Googlebot|Bingbot|Slackbot|Pinterest|Embedly|Quora|OutBrain|vkShare/i;
      if (!botPattern.test(navigator.userAgent)) {
        window.location.replace('${pageUrl}');
      }
    })();
  </script>
</head>
<body>
  ${mainNavHtml}
  
  <header>
    <h1>${pageData.h1}</h1>
    ${pageData.subtitle ? `<p class="subtitle">${pageData.subtitle}</p>` : ''}
  </header>
  
  <main>
    ${sectionsHtml}
    ${faqHtml}
    
    <section class="cta-section">
      <h2>${ctaTitle}</h2>
      <p>${ctaText}</p>
      <a href="${BASE_URL}/${locale}/contact" class="cta">${ctaButton}</a>
    </section>
    
    ${linksHtml}
  </main>
  
  <footer>
    <p>&copy; ${new Date().getFullYear()} Quantifier. ${footerText}</p>
  </footer>
</body>
</html>`;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const locale = url.searchParams.get('locale') || 'en';
    const page = url.searchParams.get('page') || 'index';
    
    console.log(`Prerendering marketing page: locale=${locale}, page=${page}`);
    
    // Validate locale
    if (!['en', 'pl', 'cs'].includes(locale)) {
      return new Response('Invalid locale', { status: 400, headers: corsHeaders });
    }
    
    // Get page content
    const pageData = getPageContent(locale, page);
    
    if (!pageData) {
      console.log(`Page not found: ${page}`);
      return new Response('Page not found', { status: 404, headers: corsHeaders });
    }
    
    // Generate HTML
    const html = generateHtml(locale, page, pageData);
    
    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    });
  } catch (error) {
    console.error('Error in prerender-marketing:', error);
    return new Response(`Error: ${error.message}`, { 
      status: 500, 
      headers: corsHeaders 
    });
  }
});
