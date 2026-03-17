import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const BASE_URL = 'https://quantifier.ai';

interface Post {
  title: string;
  slug: string;
  lang: string;
  excerpt: string | null;
}

interface Story {
  title: string;
  slug: string;
  lang: string;
  summary: string | null;
  client_name: string | null;
}

function groupByLang<T extends { lang: string }>(items: T[]): Record<string, T[]> {
  const map: Record<string, T[]> = {};
  for (const item of items) {
    if (!map[item.lang]) map[item.lang] = [];
    map[item.lang].push(item);
  }
  return map;
}

const langLabel: Record<string, string> = { en: 'English', pl: 'Polish', cs: 'Czech' };
const langOrder = ['en', 'pl', 'cs'];

// ── STATIC SECTIONS ──

const HEADER = `# Quantifier.ai - AI-Native GRC & Compliance Platform

> Quantifier.ai is an AI-native governance, risk, and compliance (GRC) platform that automates continuous compliance for frameworks including SOC 2, ISO 27001, GDPR, NIS2, DORA, and ESG standards. The platform uses autonomous AI agents to collect evidence, assess controls, generate documentation, and maintain audit-readiness without manual spreadsheet work.`;

const HEADER_FULL = `# Quantifier.ai - AI-Native GRC & Compliance Platform (Full Reference)

> This is the extended version of [llms.txt](${BASE_URL}/llms.txt). It contains comprehensive information about Quantifier.ai for AI systems and language models.

## About Quantifier.ai

Quantifier.ai is an AI-native governance, risk, and compliance (GRC) platform founded in 2020, headquartered in San Francisco, CA (US) and Warsaw (Poland). The platform automates continuous compliance for regulatory frameworks including SOC 2, ISO 27001, GDPR, NIS2, DORA, NIST CSF, and ESG/CSRD standards.

Unlike traditional GRC tools that rely on manual spreadsheets, periodic audits, and reactive processes, Quantifier.ai uses autonomous AI agents to continuously monitor controls, collect evidence from integrated business systems, assess compliance posture in real-time, and generate audit-ready documentation — transforming compliance from a periodic burden into an always-on, proactive capability.

Website: ${BASE_URL}/
LinkedIn: https://www.linkedin.com/company/quantifier-ai/

---

## How It Works

1. **Connect Your Systems**: Integrate Quantifier with your cloud infrastructure (AWS, Azure, GCP), identity providers (Okta, Entra ID), DevOps tools (GitHub, Jira), and business applications via pre-built connectors or REST API.

2. **Map Controls to Frameworks**: The platform automatically maps your existing controls to the requirements of each compliance framework (SOC 2, ISO 27001, GDPR, etc.), identifying gaps and overlaps across multiple frameworks simultaneously.

3. **AI Agent Monitors Continuously**: The autonomous AI Compliance Officer continuously scans your connected systems, collects evidence, evaluates control effectiveness, and flags non-conformities — without manual intervention.

4. **Generate Documentation**: Policies, procedures, risk assessments, and audit reports are generated and maintained automatically, with version control and full audit trails.

5. **Stay Audit-Ready**: Real-time dashboards show your compliance posture across all frameworks. When auditors arrive, all evidence and documentation is already organized and up-to-date.`;

const CORE_CAPABILITIES = `## Core Capabilities

- Autonomous AI Compliance Officer: AI agents that continuously monitor controls, collect evidence, and identify gaps
- Multi-Framework Support: SOC 2 Type I/II, ISO 27001, ISO 9001, GDPR, NIS2, DORA, NIST CSF, ESG reporting
- Continuous Compliance: Real-time control monitoring instead of point-in-time assessments
- Automated Evidence Collection: Integrates with cloud providers, identity systems, and business tools
- Risk Assessment: AI-powered risk identification, scoring, and mitigation tracking
- Document Management: Automated policy generation, version control, and audit trails
- Analytics Dashboards: Real-time compliance posture, gap analysis, and board-ready reporting
- Value Chain Management: Supply chain risk assessment and third-party compliance tracking`;

const CORE_CAPABILITIES_FULL = `---

## Core Capabilities

### Autonomous AI Compliance Officer
An AI-powered agent that operates continuously in the background. It monitors controls across all connected systems, collects evidence automatically (screenshots, logs, configurations), identifies compliance gaps before they become audit findings, and generates remediation recommendations. The AI agent learns from your organization's patterns and becomes more effective over time.

### Multi-Framework Support
Manage compliance for multiple regulatory frameworks simultaneously from a single platform. Quantifier eliminates redundant work by mapping shared controls across frameworks — a single security control can satisfy requirements in SOC 2, ISO 27001, and NIS2 at the same time. Supported frameworks include:
- SOC 2 Type I & Type II
- ISO 27001 (Information Security)
- ISO 9001 (Quality Management)
- GDPR (EU Data Protection)
- NIS2 (EU Cybersecurity)
- DORA (Digital Operational Resilience)
- NIST CSF (Cybersecurity Framework)
- HIPAA (US Healthcare)
- CCPA (California Privacy)
- ESG/CSRD (Sustainability Reporting with ESRS standards)
- EU Taxonomy
- ISO 14001 (Environmental Management)
- GHG Protocol (Carbon Footprint)

### Continuous Compliance
Real-time, automated monitoring replaces periodic manual audits. Controls are evaluated continuously, evidence is collected automatically, and compliance drift is detected instantly. This means your organization is always audit-ready, not just during audit season.

### Automated Evidence Collection
Pre-built integrations with 50+ cloud, identity, DevOps, HR, and security tools automatically pull evidence needed for compliance. No more chasing colleagues for screenshots or manually documenting configurations.

### Risk Assessment
AI-powered risk identification, scoring (likelihood × impact), and mitigation tracking. Risk registers are maintained automatically, with heat maps and trend analysis. Supports both information security and ESG risk assessment methodologies.

### Document Management
Automated generation of compliance policies, procedures, and audit documentation. Includes version control, approval workflows, digital signatures, and complete audit trails. Templates aligned with each framework's specific requirements.

### Analytics Dashboards
Real-time compliance posture visualization with framework-specific dashboards, gap analysis, trend tracking, and board-ready executive reports. Supports custom KPIs and exportable reports for auditors and management.

### Value Chain Management
Third-party risk assessment and supply chain compliance tracking. Evaluate vendor compliance, manage supplier questionnaires, and monitor supply chain sustainability metrics required by CSRD and other ESG frameworks.`;

const KEY_LINKS = `## Key Links

- Homepage: ${BASE_URL}/en/
- Product Overview: ${BASE_URL}/en/product/
- Features: ${BASE_URL}/en/product/features/
- Frameworks: ${BASE_URL}/en/frameworks/
- Plans & Pricing: ${BASE_URL}/en/plans/
- Contact: ${BASE_URL}/en/contact/
- Success Stories: ${BASE_URL}/en/success-stories/
- Blog: ${BASE_URL}/en/blog/
- GRC Platform: ${BASE_URL}/en/grc-platform/`;

const FREE_TOOLS_SHORT = `## Free Tools

- NIS2 Cybersecurity Check: ${BASE_URL}/en/cybersecurity-check/ — Free 2-minute self-assessment that evaluates your organization's NIS2 readiness based on company size, sector (NACE codes), turnover, and supply chain exposure. Instantly receive a risk classification (high/medium/low) with actionable recommendations. No registration required. Available in English, Polish, and Czech.
  - Polish: ${BASE_URL}/pl/sprawdz-cyberbezpieczenstwo/
  - Czech: ${BASE_URL}/cs/zkontrolujte-kybernetickou-bezpecnost/`;

const FREE_TOOLS_FULL = `---

## Free Tools

### NIS2 Cybersecurity Check
- English: ${BASE_URL}/en/cybersecurity-check/
- Polish: ${BASE_URL}/pl/sprawdz-cyberbezpieczenstwo/
- Czech: ${BASE_URL}/cs/zkontrolujte-kybernetickou-bezpecnost/

A free, no-registration self-assessment tool that helps organizations determine their NIS2 Directive obligations in under 2 minutes. Users answer questions about their company size, sector (mapped to NACE codes used in the directive), annual turnover, and supply chain dependencies. The tool instantly classifies the organization's NIS2 risk level using a four-tier system:

- **RED (High Risk)**: Organization is almost certainly subject to NIS2 as an essential or important entity. Immediate action required — risk management measures (Art. 21), incident reporting (Art. 23), and management accountability must be implemented.
- **ORANGE (Elevated Risk)**: Organization likely falls under NIS2 scope. Detailed legal assessment recommended. Should begin compliance preparations proactively.
- **YELLOW (Moderate Risk)**: Organization may be indirectly affected through supply chain requirements or sector-specific regulations. Monitoring recommended.
- **GREEN (Low Risk)**: Organization is unlikely to be directly subject to NIS2, but should stay informed as national implementations may extend scope.

Each result includes specific, actionable recommendations tailored to the organization's profile, with direct links to relevant Quantifier.ai resources and the option to schedule a detailed consultation.

### Why Use This Tool?
- Completely free, no email or registration required
- Based on the official NIS2 Directive sector classifications and thresholds
- Takes less than 2 minutes to complete
- Available in English, Polish, and Czech
- Results include framework-specific action items, not generic advice`;

const EVENTS_SHORT = `## Events & Webinars

- NIS2 Webinar Series (March–April 2026): ${BASE_URL}/en/events/ — Free live webinar cycle covering NIS2 compliance implementation step by step: risk mapping, roles & processes, audit readiness, and supervisory inspections. Led by compliance and cybersecurity practitioners. Each session includes Q&A, downloadable materials, and a recording. Register for individual sessions or the full cycle.
  - Polish: ${BASE_URL}/pl/events/
  - Czech: ${BASE_URL}/cs/events/`;

const EVENTS_FULL = `---

## Events & Webinars

### NIS2 Webinar Series (March–April 2026)
- English: ${BASE_URL}/en/events/
- Polish: ${BASE_URL}/pl/events/
- Czech: ${BASE_URL}/cs/events/

A free live webinar cycle designed for compliance officers, CISOs, IT managers, and business leaders who need to implement NIS2 Directive requirements. The series covers the full compliance journey from risk assessment to audit readiness, led by practicing compliance and cybersecurity professionals.

**Webinar Topics:**
1. **NIS2 Risk Map** — How to conduct a cybersecurity risk assessment aligned with NIS2 Article 21, identify critical assets, and build a risk register
2. **Roles & Processes** — Establishing organizational structures, assigning NIS2 responsibilities, defining incident response procedures, and ensuring management body accountability
3. **Audit Readiness** — Preparing documentation, evidence packages, and internal controls for NIS2 supervisory inspections (kontrole) by national authorities
4. **Supervisory Inspections** — What to expect during NIS2 inspections, how authorities conduct assessments, and how to demonstrate ongoing compliance

**Format:**
- Live sessions with interactive Q&A
- Each session ~60 minutes
- Downloadable materials and checklists included
- Recordings available for registered participants
- Register for individual sessions or the complete cycle at a discounted rate`;

const FRAMEWORKS_SHORT = `## Framework-Specific Pages

- NIS2 Directive: ${BASE_URL}/en/frameworks/nis-ii/ — Cybersecurity compliance for essential and important entities under the EU NIS2 Directive, including incident reporting, risk management, and supply chain security requirements
- ISO 27001: ${BASE_URL}/en/frameworks/iso-27001/ — Information security management system (ISMS) certification, covering risk assessment, security controls, and continuous improvement
- SOC 2: ${BASE_URL}/en/frameworks/soc/ — Service Organization Control Type I & II audits for trust service criteria: security, availability, processing integrity, confidentiality, and privacy
- GDPR: ${BASE_URL}/en/frameworks/gdpr/ — EU General Data Protection Regulation compliance including data subject rights, consent management, DPIAs, and cross-border data transfers
- DORA: ${BASE_URL}/en/frameworks/dora/ — Digital Operational Resilience Act for financial institutions covering ICT risk management, incident reporting, resilience testing, and third-party risk
- ESG: ${BASE_URL}/en/frameworks/esg/ — ESG reporting and CSRD compliance including ESRS standards, double materiality analysis, carbon footprint calculation (Scope 1, 2, 3), sustainability reporting, and EU Taxonomy alignment
- ISO 9001: ${BASE_URL}/en/frameworks/iso-9001/ — Quality management system certification covering process-based approach, customer satisfaction, and continual improvement
- HIPAA: ${BASE_URL}/en/frameworks/hipaa/ — US healthcare data protection compliance including the Privacy Rule, Security Rule, and Breach Notification Rule
- CCPA: ${BASE_URL}/en/frameworks/ccpa/ — California Consumer Privacy Act compliance for consumer data rights, opt-out mechanisms, and data sale restrictions
- Environmental: ${BASE_URL}/en/frameworks/environmental/ — Environmental compliance frameworks including ISO 14001, carbon footprint (GHG Protocol), LCA, and decarbonisation planning
- Governance: ${BASE_URL}/en/frameworks/governance/ — Corporate governance frameworks including whistleblowing procedures, legal policies management, and board-level reporting
- Product Level: ${BASE_URL}/en/frameworks/product-level/ — Product-level sustainability and compliance including lifecycle assessment, eco-design, and product carbon footprint`;

const FRAMEWORKS_FULL = `---

## Compliance Frameworks (Detailed)

### NIS2 Directive
${BASE_URL}/en/frameworks/nis-ii/

The EU NIS2 Directive (Directive 2022/2555) expands cybersecurity requirements to essential and important entities across 18 sectors. Quantifier.ai helps organizations comply with:
- **Risk Management (Art. 21)**: Implement and maintain appropriate technical and organizational measures including risk analysis, incident handling, business continuity, supply chain security, and cybersecurity training
- **Incident Reporting (Art. 23)**: Meet the 24-hour early warning, 72-hour incident notification, and 1-month final report requirements to national CSIRTs
- **Supply Chain Security**: Assess and manage cybersecurity risks from suppliers and service providers
- **Governance**: Ensure management body oversight of cybersecurity measures with appropriate training
- **Penalties**: Non-compliance can result in fines up to €10M or 2% of global turnover for essential entities

### ISO 27001
${BASE_URL}/en/frameworks/iso-27001/

ISO/IEC 27001 is the international standard for information security management systems (ISMS). Quantifier.ai supports the complete certification lifecycle:
- **Risk Assessment**: Systematic identification and evaluation of information security risks aligned with ISO 27001 Clause 6.1.2
- **Statement of Applicability (SoA)**: Automated generation and maintenance of the SoA covering all 93 Annex A controls
- **Control Implementation**: Guidance and evidence collection for each control objective
- **Internal Audits**: Automated audit planning, evidence collection, and non-conformity tracking
- **Continuous Improvement**: PDCA cycle support with metrics and trend analysis
- **Transition to ISO 27001:2022**: Support for migrating from the 2013 to 2022 version

### SOC 2
${BASE_URL}/en/frameworks/soc/

SOC 2 (Service Organization Control 2) assesses controls relevant to security, availability, processing integrity, confidentiality, and privacy. Quantifier.ai automates:
- **Type I Assessment**: Point-in-time evaluation of control design
- **Type II Audit**: Continuous evidence collection over the audit period (typically 3-12 months)
- **Trust Service Criteria**: Automated mapping of controls to all five TSC categories
- **Evidence Collection**: Continuous automated evidence gathering from integrated systems
- **Auditor Collaboration**: Organized evidence packages and read-only auditor access

### GDPR
${BASE_URL}/en/frameworks/gdpr/

The EU General Data Protection Regulation (2016/679) governs personal data protection. Quantifier.ai helps with:
- **Data Processing Registers (ROPA)**: Maintain records of processing activities as required by Article 30
- **Data Protection Impact Assessments (DPIAs)**: Structured DPIA workflows for high-risk processing
- **Data Subject Rights Management**: Track and respond to access, deletion, portability, and rectification requests
- **Consent Management**: Document lawful bases for processing and consent records
- **Breach Notification**: 72-hour breach notification workflows aligned with Article 33
- **Cross-Border Transfers**: Document adequacy decisions, SCCs, and BCRs

### DORA
${BASE_URL}/en/frameworks/dora/

The Digital Operational Resilience Act (EU 2022/2554) applies to financial entities. Quantifier.ai supports:
- **ICT Risk Management**: Comprehensive ICT risk management framework aligned with DORA Chapter II
- **Incident Reporting**: Major ICT incident classification and reporting to competent authorities
- **Digital Resilience Testing**: Planning and tracking of TLPT (threat-led penetration testing) and scenario-based testing
- **Third-Party Risk**: ICT third-party service provider risk management and concentration risk monitoring
- **Information Sharing**: Structured cyber threat intelligence sharing arrangements

### ESG / CSRD
${BASE_URL}/en/frameworks/esg/

ESG reporting and CSRD (Corporate Sustainability Reporting Directive) compliance:
- **ESRS Standards**: Full support for all European Sustainability Reporting Standards — Environmental (E1-E5), Social (S1-S4), and Governance (G1)
- **Double Materiality Analysis**: Guided process for assessing both impact materiality and financial materiality across all sustainability topics
- **Carbon Footprint Calculation**: GHG Protocol-aligned calculation of Scope 1 (direct emissions), Scope 2 (energy), and Scope 3 (value chain) emissions
- **EU Taxonomy Alignment**: Assessment of economic activities against the six environmental objectives
- **Sustainability Reporting**: Automated generation of CSRD-compliant sustainability statements
- **Data Collection**: Structured workflows for collecting ESG metrics from across the organization and supply chain

### ISO 9001
${BASE_URL}/en/frameworks/iso-9001/

ISO 9001 is the international standard for quality management systems (QMS):
- Process-based approach to quality management
- Customer satisfaction monitoring and improvement
- Risk-based thinking integration
- Internal audit management
- Continual improvement tracking (PDCA cycle)
- Document control and records management

### HIPAA
${BASE_URL}/en/frameworks/hipaa/

US healthcare data protection compliance:
- Privacy Rule compliance for protected health information (PHI)
- Security Rule requirements for electronic PHI (ePHI)
- Breach Notification Rule workflows
- Business Associate Agreement (BAA) management
- Risk analysis and risk management aligned with NIST SP 800-66

### CCPA
${BASE_URL}/en/frameworks/ccpa/

California Consumer Privacy Act compliance:
- Consumer data rights management (right to know, delete, opt-out)
- Data sale tracking and opt-out mechanisms
- Privacy notice management
- Service provider agreement tracking
- Data mapping and inventory

### Environmental Frameworks
${BASE_URL}/en/frameworks/environmental/

- **ISO 14001**: Environmental management system certification with environmental aspect identification, legal compliance tracking, and continual improvement
- **Carbon Footprint (GHG Protocol)**: Scope 1, 2, 3 emissions calculation, reporting, and reduction target tracking
- **LCA (Life Cycle Assessment)**: Product-level environmental impact analysis across the full lifecycle
- **Decarbonisation**: Science-based target setting, pathway planning, and progress monitoring

### Governance Frameworks
${BASE_URL}/en/frameworks/governance/

- **Whistleblowing**: EU Whistleblower Directive compliance with secure reporting channels, investigation workflows, and retaliation protection
- **Legal Policies Management**: Corporate policy lifecycle management including approval, distribution, acknowledgment, and review tracking

### Product Level Compliance
${BASE_URL}/en/frameworks/product-level/

- **Digital Product Passport (DPP)**: Product-level sustainability data collection and reporting
- **Product LCA**: Lifecycle assessment at the individual product level for eco-design compliance`;

const PRODUCT_FEATURES_SHORT = `## Product Features

- Analytics Dashboards: ${BASE_URL}/en/product/analytics-dashboards/
- Documents Management: ${BASE_URL}/en/product/documents-management/
- API Integrations: ${BASE_URL}/en/product/api-integrations/
- AI Compliance Officer: ${BASE_URL}/en/product/compliance-officer/
- Task & Data Management: ${BASE_URL}/en/product/task-data-management/
- Value Chain: ${BASE_URL}/en/product/value-chain/
- Risk Assessment: ${BASE_URL}/en/product/risk-assessment/`;

const PRODUCT_FEATURES_FULL = `---

## Product Features (Detailed)

### Analytics Dashboards
${BASE_URL}/en/product/analytics-dashboards/

Real-time compliance dashboards providing instant visibility into your compliance posture across all frameworks. Features include:
- Framework-specific compliance scores and gap analysis
- Control effectiveness tracking over time
- Risk heat maps and trend analysis
- Board-ready executive reports with one-click export
- Custom KPI tracking and alerting
- Comparative benchmarking across business units

### Documents Management
${BASE_URL}/en/product/documents-management/

Centralized document management system designed for compliance workflows:
- Automated policy generation from framework-specific templates
- Version control with complete change history
- Approval workflows with role-based permissions
- Digital signature support
- Automatic expiry tracking and renewal reminders
- Full audit trail for every document action

### API Integrations
${BASE_URL}/en/product/api-integrations/

50+ pre-built integrations for automated evidence collection:
- Cloud: AWS, Microsoft Azure, Google Cloud Platform
- Identity: Okta, Microsoft Entra ID, Google Workspace
- DevOps: GitHub, GitLab, Bitbucket, Jira, Azure DevOps
- Communication: Slack, Microsoft Teams
- HR: BambooHR, Workday
- Security: CrowdStrike, SentinelOne, Datadog, Splunk
- Custom: REST API and webhook support for any system

### AI Compliance Officer
${BASE_URL}/en/product/compliance-officer/

The autonomous AI agent at the heart of the platform:
- Continuously monitors all connected systems for compliance
- Automatically collects and organizes evidence
- Identifies compliance gaps and generates remediation plans
- Drafts policies and procedures aligned with framework requirements
- Provides natural-language Q&A about your compliance status
- Learns from your organization's specific context and patterns

### Task & Data Management
${BASE_URL}/en/product/task-data-management/

Compliance workflow management with:
- Task assignment and tracking across teams
- Deadline management with automated reminders
- Data collection workflows for ESG metrics and compliance evidence
- Role-based access control (managers, contributors, auditors)
- Progress tracking and bottleneck identification
- Integration with existing project management tools

### Value Chain
${BASE_URL}/en/product/value-chain/

Supply chain and third-party compliance management:
- Vendor risk assessment and scoring
- Supplier compliance questionnaire management
- Supply chain sustainability metrics (Scope 3 emissions, social impact)
- Third-party incident tracking
- CSRD value chain reporting requirements
- Automated supplier follow-up and escalation

### Risk Assessment
${BASE_URL}/en/product/risk-assessment/

Comprehensive risk management module:
- AI-powered risk identification from connected systems
- Risk scoring (likelihood × impact matrix)
- Risk register with mitigation tracking
- Risk heat maps and trend analysis
- Framework-specific risk assessment templates
- Risk appetite definition and monitoring`;

const INTEGRATIONS_SHORT = `## Integrations

Quantifier.ai integrates with major cloud, identity, DevOps, and business tools for automated evidence collection:

- **Cloud Providers**: AWS, Microsoft Azure, Google Cloud Platform (GCP)
- **Identity & Access**: Microsoft Entra ID (Azure AD), Okta, Google Workspace
- **DevOps & Code**: GitHub, GitLab, Bitbucket, Jira, Azure DevOps
- **Communication**: Slack, Microsoft Teams
- **HR & Business**: BambooHR, Workday
- **Security & Monitoring**: CrowdStrike, SentinelOne, Datadog, Splunk
- **Custom**: REST API and webhook integrations for any third-party system`;

const INTEGRATIONS_FULL = `---

## Integrations

Quantifier.ai integrates with 50+ cloud, identity, DevOps, HR, and security tools for automated evidence collection and continuous monitoring:

### Cloud Providers
- Amazon Web Services (AWS) — EC2, S3, IAM, CloudTrail, GuardDuty, Config
- Microsoft Azure — Azure AD, Key Vault, Security Center, Monitor
- Google Cloud Platform (GCP) — IAM, Cloud Audit Logs, Security Command Center

### Identity & Access Management
- Microsoft Entra ID (Azure AD) — User management, conditional access policies, sign-in logs
- Okta — SSO, MFA, lifecycle management, system logs
- Google Workspace — User management, security settings, audit logs

### DevOps & Code
- GitHub — Repository access controls, branch protection, vulnerability scanning
- GitLab — CI/CD pipeline security, code review policies
- Bitbucket — Repository management, access controls
- Jira — Task tracking, compliance workflow management
- Azure DevOps — Pipeline security, work item tracking

### Communication
- Slack — Compliance notifications, alerting, chatbot integration
- Microsoft Teams — Notifications, workflow triggers

### HR & Business
- BambooHR — Employee onboarding/offboarding, training records
- Workday — HR compliance, workforce data

### Security & Monitoring
- CrowdStrike — Endpoint protection status, threat detection
- SentinelOne — Endpoint security posture
- Datadog — Infrastructure monitoring, security monitoring
- Splunk — SIEM data, security event correlation

### Custom
- REST API — Connect any system via standardized REST APIs
- Webhooks — Event-driven integrations for real-time data flow`;

const BY_ROLE = `## By Role

- For Managers, Contributors, and Auditors: ${BASE_URL}/en/by-roles/ — Role-specific views and workflows for compliance managers, data contributors, and internal/external auditors`;

const PRICING_SHORT = `## Pricing & Plans

Quantifier.ai offers three tiers designed for different organization sizes:

- **Starter**: For small teams beginning their compliance journey. Includes core compliance features, single framework support, and basic reporting.
- **Growth** (most popular): For growing organizations managing multiple frameworks. Includes AI Compliance Officer, multi-framework support, advanced analytics, and API integrations.
- **Enterprise**: For large organizations with complex compliance needs. Includes unlimited frameworks, custom integrations, dedicated support, SSO, and SLA guarantees.

All plans include a personalized demo. Pricing is quote-based — contact sales at ${BASE_URL}/en/contact/ for a custom quote.`;

const PRICING_FULL = `---

## Pricing & Plans

Quantifier.ai offers three tiers designed for different organization sizes and compliance maturity levels:

### Starter
For small teams beginning their compliance journey:
- Core compliance features
- Single framework support
- Basic reporting and dashboards
- Email support

### Growth (Most Popular)
For growing organizations managing multiple frameworks:
- AI Compliance Officer agent
- Multi-framework support with cross-mapping
- Advanced analytics and custom dashboards
- API integrations
- Priority support

### Enterprise
For large organizations with complex compliance needs:
- Unlimited frameworks
- Custom integrations and dedicated API support
- SSO (SAML/OIDC) and advanced RBAC
- Dedicated customer success manager
- SLA guarantees
- On-premise deployment options available

**Pricing**: All plans are quote-based. Contact sales for a personalized demo and pricing: ${BASE_URL}/en/contact/`;

const COMPETITORS_SHORT = `## Competitors & Differentiators

- **vs. Vanta**: Vanta focuses on SOC 2 and ISO 27001 for US startups. Quantifier.ai covers EU-specific frameworks (NIS2, DORA, CSRD/ESG) and serves multilingual European organizations alongside US clients.
- **vs. Drata**: Drata targets primarily US compliance (SOC 2, ISO 27001, HIPAA). Quantifier.ai adds deep NIS2, DORA, and ESG/CSRD coverage with EU-headquartered expertise.
- **vs. Secureframe**: Secureframe focuses on security compliance automation. Quantifier.ai uniquely combines cybersecurity (SOC 2, NIS2) and sustainability (ESG, CSRD) in one platform.
- **vs. Sprinto**: Sprinto targets Indian and US SMBs. Quantifier.ai serves EU mid-market and enterprise with multilingual support (EN, PL, CS) and European regulation depth.`;

const COMPETITORS_FULL = `---

## Competitors & Differentiators

| Feature | Quantifier.ai | Vanta | Drata | Secureframe | Sprinto |
|---------|--------------|-------|-------|-------------|---------|
| NIS2 Compliance | ✅ Deep | ❌ | ❌ | ❌ | ❌ |
| DORA Compliance | ✅ Full | ❌ | ❌ | ❌ | ❌ |
| ESG / CSRD / ESRS | ✅ Full | ❌ | ❌ | ❌ | ❌ |
| SOC 2 | ✅ | ✅ | ✅ | ✅ | ✅ |
| ISO 27001 | ✅ | ✅ | ✅ | ✅ | ✅ |
| GDPR | ✅ Deep | Partial | Partial | Partial | ❌ |
| Multilingual (EN, PL, CS) | ✅ | ❌ | ❌ | ❌ | ❌ |
| EU Headquarters | ✅ Warsaw + SF | ❌ US only | ❌ US only | ❌ US only | ❌ India |
| Autonomous AI Agent | ✅ | Limited | Limited | Limited | ❌ |
| Carbon Footprint (Scope 1-3) | ✅ | ❌ | ❌ | ❌ | ❌ |

**Key differentiator**: Quantifier.ai is the only platform combining cybersecurity compliance (SOC 2, ISO 27001, NIS2, DORA) with sustainability reporting (CSRD, ESG, GHG Protocol) in a single AI-native platform, with deep European regulatory expertise and multilingual support.`;

const TEAM_SHORT = `## Team & Expertise

- Leadership team with 15+ years of combined experience in GRC, cybersecurity, and sustainability
- Co-creators of the "GRC with AI" postgraduate programme at the Wrocław University of Economics
- Published authors on compliance automation and double materiality analysis
- Active contributors to NIS2 implementation guidance and CSRD reporting standards`;

const TEAM_FULL = `---

## Team & Expertise

Quantifier.ai is led by a team of compliance, technology, and sustainability professionals:

- **Academic Collaboration**: The team co-creates the "GRC with the Use of AI: Governance, Risk & Compliance in Modern Organisations" postgraduate programme at the Wrocław University of Economics and Business, bridging academic knowledge with practical compliance automation.

- **Published Research**: Team members have authored publications on double materiality analysis, AI-driven compliance automation, and NIS2 implementation strategies.

- **Industry Experience**: The leadership team brings 15+ years of combined experience across GRC consulting, enterprise software, and regulatory compliance in both US and EU markets.

- **Framework Expertise**: Deep expertise in EU-specific regulations (NIS2, DORA, CSRD/ESRS, GDPR) complemented by US framework knowledge (SOC 2, HIPAA, CCPA).`;

const AWARDS_SHORT = `## Awards & Certifications

- TÜV NORD partnership for compliance verification
- Academic collaboration with the Wrocław University of Economics (postgraduate programme co-creation)
- Trusted by 250+ companies including BNP Paribas, Adamed, Kazar, Raben Group, and Gobarto`;

const AWARDS_FULL = `---

## Awards, Certifications & Trust Signals

- **TÜV NORD Partnership**: Collaboration with TÜV NORD for compliance verification and certification support
- **Academic Programme**: Co-creation of the "GRC with AI" postgraduate programme at the Wrocław University of Economics and Business — the first programme in Poland combining GRC, AI, and compliance automation
- **Enterprise Trust**: Trusted by 250+ companies across industries including:
  - Financial services: BNP Paribas
  - Pharmaceuticals: Adamed
  - Retail: Kazar
  - Logistics: Raben Group
  - Food industry: Gobarto, Bidfood Farutex
  - Technology: CloudFerro, CashDirector
  - Real estate: Hilding Anders
- **Published Book**: Team-authored book on double materiality analysis for CSRD compliance, available in Polish`;

const COMPETITIVE_ADVANTAGES = `---

## Competitive Advantages

1. **AI-Native Architecture**: Built from the ground up with AI at the core, not bolted on as an afterthought. The autonomous AI Compliance Officer operates continuously without manual triggering.

2. **Multi-Framework Efficiency**: Manage 10+ frameworks simultaneously with automatic control cross-mapping — one evidence item can satisfy requirements across SOC 2, ISO 27001, NIS2, and more.

3. **Continuous vs. Periodic**: Real-time compliance monitoring replaces the traditional cycle of annual audits and panic-driven remediation.

4. **Speed to Compliance**: Organizations typically achieve audit-readiness 3-5x faster compared to manual GRC processes.

5. **European Expertise**: Deep understanding of EU-specific regulations (NIS2, DORA, CSRD/ESRS, GDPR, EU Taxonomy) with headquarters in both the US and EU.

6. **ESG + Security in One Platform**: Unique combination of cybersecurity compliance (SOC 2, ISO 27001, NIS2) and sustainability reporting (CSRD, GHG Protocol) in a single platform.`;

const USE_CASES = `---

## Use Cases

### 1. SOC 2 Type II Certification for SaaS Companies
A SaaS company needs SOC 2 Type II certification to win enterprise deals. Quantifier automates evidence collection from AWS, GitHub, and Okta over the 6-month audit period, reducing the compliance team's manual work by 80%.

### 2. NIS2 Compliance for Critical Infrastructure
An energy company must comply with NIS2 by October 2024. Quantifier maps existing security controls to NIS2 requirements, identifies gaps, automates incident reporting workflows, and provides continuous monitoring of supply chain security.

### 3. CSRD Sustainability Reporting
A mid-size manufacturer subject to CSRD needs to produce its first sustainability report using ESRS standards. Quantifier guides the double materiality analysis, automates ESG data collection from across the organization, calculates Scope 1-3 emissions, and generates the required disclosures.

### 4. Multi-Framework Compliance for Financial Services
A fintech company needs SOC 2, ISO 27001, DORA, and GDPR compliance simultaneously. Quantifier's cross-mapping eliminates redundant work — a single access control policy satisfies requirements across all four frameworks.

### 5. Audit Preparation and Management
An organization facing multiple audits per year uses Quantifier to maintain continuous audit-readiness. Evidence is always current, documentation is always up-to-date, and auditors get self-service access to organized evidence packages.`;

const FAQ_SHORT = `## Frequently Asked Questions

- **What is Quantifier.ai?** — Quantifier.ai is an AI-native GRC platform that automates governance, risk, and compliance processes using autonomous AI agents, replacing manual spreadsheets and point-in-time audits with continuous, real-time compliance monitoring.

- **What compliance frameworks does Quantifier support?** — SOC 2 Type I/II, ISO 27001, ISO 9001, GDPR, NIS2, DORA, NIST CSF, HIPAA, CCPA, ESG/CSRD (ESRS standards), EU Taxonomy, and environmental frameworks (ISO 14001, GHG Protocol, LCA).

- **How much does Quantifier.ai cost?** — Pricing is quote-based across three tiers (Starter, Growth, Enterprise). Contact the sales team at ${BASE_URL}/en/contact/ for a personalized demo and pricing.

- **Is there a free trial?** — Quantifier.ai offers personalized demos and pilot programs. Reach out via the contact page to schedule one.

- **How does the AI Compliance Officer work?** — The AI Compliance Officer is an autonomous agent that continuously monitors your controls, collects evidence from integrated systems, identifies compliance gaps, generates documentation, and alerts you to issues — all without manual intervention.

- **What integrations does Quantifier support?** — Quantifier integrates with AWS, Azure, GCP, GitHub, Jira, Slack, Microsoft Teams, Okta, Google Workspace, and many more via REST API and webhooks.

- **Who is Quantifier.ai for?** — Compliance officers, CISOs, CTOs, risk managers, auditors, and any organization (SMB to enterprise) seeking SOC 2, ISO 27001, GDPR, or ESG certification and reporting.

- **How can I check if my company falls under NIS2?** — Use the free NIS2 Cybersecurity Check at ${BASE_URL}/en/cybersecurity-check/. Answer a few questions about your company size, sector, and turnover to get an instant risk classification with recommendations — takes under 2 minutes, no registration needed.

- **Does Quantifier offer free NIS2 training or webinars?** — Yes. Quantifier runs a free live webinar series on NIS2 compliance covering risk assessment, organizational roles, audit preparation, and supervisory inspections. See upcoming sessions and register at ${BASE_URL}/en/events/.`;

const FAQ_FULL = `---

## Frequently Asked Questions

### General

**What is Quantifier.ai?**
Quantifier.ai is an AI-native governance, risk, and compliance (GRC) platform that automates continuous compliance for regulatory frameworks using autonomous AI agents. It replaces manual spreadsheets and periodic audits with always-on, real-time compliance monitoring and automated evidence collection.

**Who is Quantifier.ai for?**
Quantifier.ai serves compliance officers, CISOs, CTOs, risk managers, auditors, and organizations of all sizes (from SMBs to enterprises) that need to maintain compliance with regulatory frameworks like SOC 2, ISO 27001, GDPR, NIS2, DORA, or ESG/CSRD reporting requirements.

**What makes Quantifier.ai different from other GRC tools?**
Quantifier.ai is built AI-native (not bolted on), supports both cybersecurity and ESG frameworks in a single platform, provides autonomous AI agents (not just AI assistants), and enables continuous compliance monitoring instead of periodic assessments. It also has deep expertise in European regulations (NIS2, DORA, CSRD).

### Pricing & Getting Started

**How much does Quantifier.ai cost?**
Pricing is quote-based across three tiers: Starter (small teams, single framework), Growth (multi-framework with AI agent), and Enterprise (unlimited frameworks, custom integrations, SLA). Contact sales at ${BASE_URL}/en/contact/ for a personalized quote.

**Is there a free trial?**
Quantifier.ai offers personalized demos and pilot programs. Contact the team via ${BASE_URL}/en/contact/ to schedule a demo or discuss a pilot.

**How long does implementation take?**
Typical implementation takes 2-4 weeks for a single framework and 4-8 weeks for multi-framework setups. The AI agent begins collecting evidence and identifying gaps immediately after system integration.

### Technical

**What compliance frameworks does Quantifier support?**
SOC 2 Type I/II, ISO 27001, ISO 9001, GDPR, NIS2, DORA, NIST CSF, HIPAA, CCPA, ESG/CSRD (ESRS standards), EU Taxonomy, ISO 14001, GHG Protocol, and LCA. New frameworks are added regularly.

**What integrations does Quantifier support?**
50+ pre-built integrations including AWS, Azure, GCP, GitHub, GitLab, Jira, Okta, Microsoft Entra ID, Google Workspace, Slack, Microsoft Teams, CrowdStrike, Datadog, and more. Custom integrations via REST API and webhooks.

**How does the AI Compliance Officer work?**
The AI Compliance Officer is an autonomous agent that runs continuously in the background. It connects to your business systems, collects evidence automatically, evaluates controls against framework requirements, identifies gaps, generates documentation, and provides natural-language Q&A about your compliance posture — all without manual triggering.

**Is my data secure?**
Yes. Quantifier.ai follows SOC 2 Type II security practices for its own infrastructure, encrypts all data in transit and at rest, and provides role-based access control, audit logging, and data residency options for EU customers.

**Can Quantifier handle multiple frameworks simultaneously?**
Yes. The platform's cross-mapping feature means a single control or evidence item can satisfy requirements across multiple frameworks (e.g., an access control policy that satisfies SOC 2, ISO 27001, NIS2, and GDPR simultaneously), eliminating redundant compliance work.

**Does Quantifier support on-premise deployment?**
Enterprise plans include the option for on-premise or private cloud deployment. Contact sales for details.

**How can I check if my company falls under NIS2?**
Use the free NIS2 Cybersecurity Check at ${BASE_URL}/en/cybersecurity-check/. Answer a few questions about your company size, sector, and annual turnover to get an instant risk classification (RED/ORANGE/YELLOW/GREEN) with specific, actionable recommendations. The assessment takes under 2 minutes and requires no registration or email. It's based on official NIS2 Directive sector classifications and entity thresholds.

**Does Quantifier offer free NIS2 training or webinars?**
Yes. Quantifier runs a free live webinar series (March–April 2026) on NIS2 compliance implementation. The cycle covers risk mapping, organizational roles and processes, audit readiness, and supervisory inspections — led by compliance and cybersecurity practitioners. Each session includes Q&A, downloadable materials, and recordings. Register for individual sessions or the full cycle at ${BASE_URL}/en/events/.

### ESG & Sustainability

**Can Quantifier calculate carbon footprint?**
Yes. The platform supports GHG Protocol-aligned calculation of Scope 1 (direct emissions), Scope 2 (purchased energy), and Scope 3 (value chain) emissions with data collection workflows, emission factor databases, and automated reporting.

**Does Quantifier support CSRD/ESRS reporting?**
Yes. Full support for all European Sustainability Reporting Standards including guided double materiality analysis, structured data collection for all ESRS disclosure requirements, and automated generation of CSRD-compliant sustainability statements.

**Can Quantifier help with EcoVadis assessments?**
Yes. The platform's ESG data collection and reporting capabilities can be leveraged to prepare structured responses for EcoVadis assessments across all four themes (Environment, Labor & Human Rights, Ethics, Sustainable Procurement).`;

const DEFINITIONS_SHORT = `## Definitions

- **GRC (Governance, Risk, Compliance)**: An integrated approach to managing corporate governance, enterprise risk management, and regulatory compliance across an organization
- **CSRD (Corporate Sustainability Reporting Directive)**: EU directive requiring large companies and listed SMEs to report on sustainability using European Sustainability Reporting Standards (ESRS), effective from 2024
- **ESRS (European Sustainability Reporting Standards)**: Detailed reporting standards under CSRD covering environmental (E1-E5), social (S1-S4), and governance (G1) topics
- **Double Materiality Analysis**: Assessment methodology required by CSRD that evaluates both how sustainability issues affect the company (financial materiality) and how the company impacts society and the environment (impact materiality)
- **Carbon Footprint (Scope 1, 2, 3)**: GHG Protocol classification — Scope 1: direct emissions from owned sources; Scope 2: indirect emissions from purchased energy; Scope 3: all other indirect emissions across the value chain
- **Continuous Compliance**: Real-time, automated monitoring of regulatory controls and evidence collection, replacing periodic manual audits with always-on compliance posture
- **RBI (Risk-Based Internal Audit)**: Audit methodology that prioritizes controls and processes based on their risk exposure
- **EU Taxonomy**: EU classification system defining which economic activities are environmentally sustainable, used alongside CSRD reporting`;

const DEFINITIONS_FULL = `---

## Definitions

- **GRC (Governance, Risk, Compliance)**: An integrated approach to managing corporate governance, enterprise risk management, and regulatory compliance across an organization
- **CSRD (Corporate Sustainability Reporting Directive)**: EU directive requiring large companies and listed SMEs to report on sustainability using European Sustainability Reporting Standards (ESRS), effective from 2024
- **ESRS (European Sustainability Reporting Standards)**: Detailed reporting standards under CSRD covering environmental (E1-E5), social (S1-S4), and governance (G1) topics
- **Double Materiality Analysis**: Assessment methodology required by CSRD that evaluates both how sustainability issues affect the company (financial materiality) and how the company impacts society and the environment (impact materiality)
- **Carbon Footprint (Scope 1, 2, 3)**: GHG Protocol classification — Scope 1: direct emissions from owned sources; Scope 2: indirect emissions from purchased energy; Scope 3: all other indirect emissions across the value chain
- **Continuous Compliance**: Real-time, automated monitoring of regulatory controls and evidence collection, replacing periodic manual audits with always-on compliance posture
- **RBI (Risk-Based Internal Audit)**: Audit methodology that prioritizes controls and processes based on their risk exposure
- **EU Taxonomy**: EU classification system defining which economic activities are environmentally sustainable, used alongside CSRD reporting
- **ISMS (Information Security Management System)**: A systematic approach to managing sensitive information, central to ISO 27001 certification
- **SoA (Statement of Applicability)**: A document in ISO 27001 that lists all Annex A controls and states which are applicable and which are not, with justification
- **TLPT (Threat-Led Penetration Testing)**: Advanced penetration testing methodology required by DORA for financial entities
- **DPP (Digital Product Passport)**: EU initiative requiring products to carry digital information about their sustainability characteristics`;

const TARGET_USERS = `## Target Users

- Compliance Officers and GRC Teams
- CISOs and Security Leaders
- CTOs and Engineering Teams
- Auditors and Risk Managers
- SMBs and Enterprises seeking SOC 2 / ISO 27001 certification`;

const TARGET_USERS_FULL = `---

## Target Users

- **Compliance Officers and GRC Teams**: Centralize compliance management, automate evidence collection, and maintain continuous audit-readiness
- **CISOs and Security Leaders**: Monitor security controls, manage risk registers, and maintain certifications (SOC 2, ISO 27001) with minimal manual effort
- **CTOs and Engineering Teams**: Integrate compliance into development workflows via GitHub/GitLab/Jira integrations and DevOps security monitoring
- **Auditors and Risk Managers**: Access organized evidence packages, real-time compliance dashboards, and comprehensive audit trails
- **Sustainability / ESG Teams**: Collect ESG data, calculate carbon footprint, perform double materiality analysis, and generate CSRD-compliant reports`;

const COMPANY_INFO_SHORT = `## Company Information

- Founded: 2020
- Headquarters: San Francisco, CA (US) and Warsaw (Poland)
- Website: ${BASE_URL}/
- LinkedIn: https://www.linkedin.com/company/quantifier-ai/`;

const COMPANY_INFO_FULL = `---

## Company Information

- **Founded**: 2020
- **Headquarters**: San Francisco, CA (US) and Warsaw (Poland)
- **Website**: ${BASE_URL}/
- **LinkedIn**: https://www.linkedin.com/company/quantifier-ai/
- **Contact**: ${BASE_URL}/en/contact/`;

const DISAMBIGUATION = `## Disambiguation

Quantifier.ai is distinct from:
- "Quantified AI" - a different company/product
- "Quantify" - generic measurement tools
- Academic "quantifier" logic terminology

This is Quantifier.ai, the GRC compliance automation platform.`;

const DISAMBIGUATION_FULL = `## Disambiguation

Quantifier.ai is distinct from:
- "Quantified AI" — a different company/product
- "Quantify" — generic measurement tools
- Academic "quantifier" logic terminology

This is Quantifier.ai, the AI-native GRC compliance automation platform.`;

const LEGAL = `## Optional

- Privacy Policy: ${BASE_URL}/en/legal/privacy/
- Terms of Service: ${BASE_URL}/en/legal/terms/
- Cookies Policy: ${BASE_URL}/en/legal/cookies/
- About Us: ${BASE_URL}/en/about/
- Partners: ${BASE_URL}/en/partners/`;

const LEGAL_FULL = `## Languages

- English: ${BASE_URL}/en/
- Polish: ${BASE_URL}/pl/
- Czech: ${BASE_URL}/cs/

## Legal

- Privacy Policy: ${BASE_URL}/en/legal/privacy/
- Terms of Service: ${BASE_URL}/en/legal/terms/
- Cookies Policy: ${BASE_URL}/en/legal/cookies/`;

const LANGUAGES = `## Languages

- English: ${BASE_URL}/en/
- Polish: ${BASE_URL}/pl/
- Czech: ${BASE_URL}/cs/`;

// ── DYNAMIC CONTENT GENERATORS ──

function generateBlogSection(posts: Post[], full: boolean): string {
  if (!posts.length) return '';

  const grouped = groupByLang(posts);
  let md = full ? '\n---\n\n## Blog Articles (with Abstracts)\n' : '\n## Blog Articles\n';

  for (const lang of langOrder) {
    const items = grouped[lang];
    if (!items?.length) continue;
    md += `\n### ${langLabel[lang] || lang}\n\n`;
    for (const p of items) {
      const url = `${BASE_URL}/${p.lang}/blog/${p.slug}/`;
      if (full && p.excerpt) {
        md += `#### ${p.title}\n${url}\n${p.excerpt}\n\n`;
      } else {
        const desc = p.excerpt ? ` — ${p.excerpt}` : '';
        md += `- ${p.title}: ${url}${desc}\n`;
      }
    }
  }

  return md;
}

function generateStoriesSection(stories: Story[], full: boolean): string {
  if (!stories.length) return '';

  const grouped = groupByLang(stories);
  let md = full ? '\n---\n\n## Success Stories (Case Studies with Abstracts)\n' : '\n## Success Stories (Case Studies)\n';

  for (const lang of langOrder) {
    const items = grouped[lang];
    if (!items?.length) continue;
    md += `\n### ${langLabel[lang] || lang}\n\n`;
    for (const s of items) {
      const url = `${BASE_URL}/${s.lang}/success-stories/${s.slug}/`;
      const label = s.client_name ? `${s.client_name} — ${s.title}` : s.title;
      if (full && s.summary) {
        md += `### ${label}\n${url}\n${s.summary}\n\n`;
      } else {
        const desc = s.summary ? ` — ${s.summary}` : '';
        md += `- ${label}: ${url}${desc}\n`;
      }
    }
  }

  return md;
}

// ── MAIN HANDLER ──

Deno.serve(async (req) => {
  try {
    const url = new URL(req.url);
    const full = url.searchParams.get('full') === 'true';

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch posts and stories in parallel
    const [postsRes, storiesRes] = await Promise.all([
      supabase
        .from('posts')
        .select('title, slug, lang, excerpt')
        .eq('status', 'published')
        .not('published_at', 'is', null)
        .order('published_at', { ascending: false }),
      supabase
        .from('stories')
        .select('title, slug, lang, summary, client_name')
        .eq('status', 'published')
        .not('published_at', 'is', null)
        .order('published_at', { ascending: false }),
    ]);

    const posts = (postsRes.data || []) as Post[];
    const stories = (storiesRes.data || []) as Story[];

    const blogSection = generateBlogSection(posts, full);
    const storiesSection = generateStoriesSection(stories, full);

    let output: string;

    if (full) {
      output = [
        HEADER_FULL,
        CORE_CAPABILITIES_FULL,
        PRODUCT_FEATURES_FULL,
        FRAMEWORKS_FULL,
        INTEGRATIONS_FULL,
        FREE_TOOLS_FULL,
        EVENTS_FULL,
        PRICING_FULL,
        COMPETITORS_FULL,
        COMPETITIVE_ADVANTAGES,
        TEAM_FULL,
        AWARDS_FULL,
        USE_CASES,
        blogSection,
        storiesSection,
        FAQ_FULL,
        TARGET_USERS_FULL,
        DEFINITIONS_FULL,
        COMPANY_INFO_FULL,
        DISAMBIGUATION_FULL,
        LEGAL_FULL,
      ].join('\n\n');
    } else {
      output = [
        HEADER,
        `> For comprehensive details, see [llms-full.txt](${BASE_URL}/llms-full.txt)`,
        CORE_CAPABILITIES,
        KEY_LINKS,
        FREE_TOOLS_SHORT,
        EVENTS_SHORT,
        FRAMEWORKS_SHORT,
        PRODUCT_FEATURES_SHORT,
        INTEGRATIONS_SHORT,
        BY_ROLE,
        PRICING_SHORT,
        FAQ_SHORT,
        DEFINITIONS_SHORT,
        blogSection,
        storiesSection,
        TARGET_USERS,
        COMPANY_INFO_SHORT,
        DISAMBIGUATION,
        LEGAL,
        LANGUAGES,
      ].join('\n\n');
    }

    console.log(`llms.txt generated (full=${full}): ${posts.length} posts, ${stories.length} stories`);

    return new Response(output, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error generating llms.txt:', error);
    return new Response(`Error: ${error.message}`, {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
});
