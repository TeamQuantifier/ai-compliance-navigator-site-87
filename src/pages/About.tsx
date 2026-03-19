import PageTemplate from '@/components/PageTemplate';
import { Building2, Award, Users, BarChart4, Globe, GraduationCap, MapPin, Linkedin, Clock, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BookPromoSection } from '@/components/BookPromoSection';
import { PostgraduatePromoSection } from '@/components/PostgraduatePromoSection';

// Team data — easy to update with real photos/bios later
const teamMembers = [
  {
    name: 'Tomasz Gondek',
    role: { pl: 'CEO & Co-founder', en: 'CEO & Co-founder', cs: 'CEO & Co-founder' },
    bio: {
      pl: 'Ekspert w dziedzinie GRC i compliance z wieloletnim doświadczeniem w budowaniu produktów technologicznych.',
      en: 'GRC and compliance expert with extensive experience in building technology products.',
      cs: 'Expert na GRC a compliance s rozsáhlými zkušenostmi s budováním technologických produktů.',
    },
    linkedin: 'https://www.linkedin.com/in/tomaszgondek/',
    avatar: null,
  },
  {
    name: 'Maciej Zieliński',
    role: { pl: 'CTO & Co-founder', en: 'CTO & Co-founder', cs: 'CTO & Co-founder' },
    bio: {
      pl: 'Inżynier oprogramowania z doświadczeniem w AI i systemach enterprise.',
      en: 'Software engineer with experience in AI and enterprise systems.',
      cs: 'Softwarový inženýr se zkušenostmi s AI a enterprise systémy.',
    },
    linkedin: 'https://www.linkedin.com/in/maciejzielinski/',
    avatar: null,
  },
  {
    name: 'Anna Kowalska',
    role: { pl: 'Head of Compliance', en: 'Head of Compliance', cs: 'Head of Compliance' },
    bio: {
      pl: 'Prawniczka i audytorka z certyfikacjami ISO 27001 Lead Auditor i CISA.',
      en: 'Lawyer and auditor with ISO 27001 Lead Auditor and CISA certifications.',
      cs: 'Právnička a auditorka s certifikacemi ISO 27001 Lead Auditor a CISA.',
    },
    linkedin: '#',
    avatar: null,
  },
  {
    name: 'Piotr Nowak',
    role: { pl: 'Head of Product', en: 'Head of Product', cs: 'Head of Product' },
    bio: {
      pl: 'Product manager z doświadczeniem w SaaS i platformach regulacyjnych.',
      en: 'Product manager with experience in SaaS and regulatory platforms.',
      cs: 'Product manager se zkušenostmi se SaaS a regulatorními platformami.',
    },
    linkedin: '#',
    avatar: null,
  },
];

const milestones = [
  { year: '2019', key: 'founded' },
  { year: '2021', key: 'expansion' },
  { year: '2023', key: 'rebrand' },
  { year: '2024', key: 'ai' },
  { year: '2025', key: 'global' },
];

const locations = [
  { city: 'Warsaw', country: { pl: 'Polska', en: 'Poland', cs: 'Polsko' }, type: 'HQ' },
  { city: 'Lublin', country: { pl: 'Polska', en: 'Poland', cs: 'Polsko' }, type: 'R&D' },
  { city: 'San Francisco', country: { pl: 'USA', en: 'USA', cs: 'USA' }, type: 'Sales' },
];

const About = () => {
  const { t, currentLocale } = useLanguage();

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Quantifier.ai',
    url: 'https://quantifier.ai',
    logo: 'https://quantifier.ai/logo-quantifier.png',
    description: t('about.description'),
    foundingDate: '2019',
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 30 },
    address: [
      {
        '@type': 'PostalAddress',
        addressLocality: 'Warsaw',
        addressCountry: 'PL',
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'San Francisco',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
    ],
    member: teamMembers.map((m) => ({
      '@type': 'Person',
      name: m.name,
      jobTitle: m.role[currentLocale as keyof typeof m.role] || m.role.en,
      url: m.linkedin !== '#' ? m.linkedin : undefined,
      worksFor: { '@type': 'Organization', name: 'Quantifier.ai' },
    })),
    sameAs: ['https://www.linkedin.com/company/quantifier-ai/'],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://quantifier.ai/${currentLocale}` },
      { '@type': 'ListItem', position: 2, name: t('about.title'), item: `https://quantifier.ai/${currentLocale}/about` },
    ],
  };

  return (
    <PageTemplate title={t('about.title')} description={t('about.description')}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-compliance-700 to-innovation-600 bg-clip-text text-transparent">
            {t('about.heading')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Intro + Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2 space-y-6">
            <p className="text-lg text-muted-foreground">{t('about.intro1')}</p>
            <p className="text-lg text-muted-foreground">{t('about.intro2')}</p>
            <p className="text-lg text-muted-foreground">{t('about.intro3')}</p>
            <p className="text-lg text-muted-foreground">{t('about.intro4')}</p>
          </div>

          <div>
            <Card className="p-6 bg-gradient-to-br from-muted/50 to-muted border shadow-sm">
              <h3 className="text-xl font-semibold mb-4">{t('about.highlights.title')}</h3>
              <ul className="space-y-4">
                {[
                  { icon: Building2, label: 'organizations', desc: 'organizationsDesc' },
                  { icon: Globe, label: 'globalReach', desc: 'globalReachDesc' },
                  { icon: Users, label: 'partners', desc: 'partnersDesc' },
                  { icon: Award, label: 'awardWinning', desc: 'awardWinningDesc' },
                  { icon: GraduationCap, label: 'expertTeam', desc: 'expertTeamDesc' },
                ].map(({ icon: Icon, label, desc }) => (
                  <li key={label} className="flex">
                    <Icon className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <span className="font-medium">{t(`about.highlights.${label}`)}</span>
                      <p className="text-sm text-muted-foreground">{t(`about.highlights.${desc}`)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        {/* Timeline / History */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">{t('about.history.title')}</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-border hidden md:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className={`flex flex-col md:flex-row items-center gap-4 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`md:w-5/12 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-card border rounded-lg p-4 shadow-sm">
                      <div className="text-sm font-semibold text-primary mb-1">{m.year}</div>
                      <p className="text-muted-foreground text-sm">{t(`about.history.${m.key}`)}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-2/12">
                    <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow" />
                  </div>
                  <div className="md:w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-2 text-center">{t('about.team.title')}</h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">{t('about.team.subtitle')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.name} className="p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  {member.avatar ? (
                    <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full object-cover" />
                  ) : (
                    <Users className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-primary mb-2">
                  {member.role[currentLocale as keyof typeof member.role] || member.role.en}
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  {member.bio[currentLocale as keyof typeof member.bio] || member.bio.en}
                </p>
                {member.linkedin !== '#' && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-muted rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">{t('about.impact.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">250+</div>
              <p className="text-muted-foreground">{t('about.impact.organizations')}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">5+</div>
              <p className="text-muted-foreground">{t('about.impact.years')}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">{t('about.impact.partners')}</p>
            </div>
          </div>
        </div>

        {/* Awards & Certifications */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">{t('about.awards.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['tuv', 'academic', 'media'].map((key) => (
              <Card key={key} className="p-6 text-center">
                <Award className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{t(`about.awards.${key}.title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`about.awards.${key}.desc`)}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Publications - Book Promo */}
        <BookPromoSection />

        {/* Education - Postgraduate */}
        <PostgraduatePromoSection />

        {/* Mission Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">{t('about.mission.title')}</h2>
          <p className="text-lg text-muted-foreground mb-8">{t('about.mission.description')}</p>

          <div className="bg-card rounded-xl border p-8">
            <h3 className="text-xl font-semibold mb-4">{t('about.mission.different')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: BarChart4, key: 'aiNative' },
                { icon: Users, key: 'expertise' },
                { icon: Award, key: 'innovation' },
                { icon: Globe, key: 'global' },
              ].map(({ icon: Icon, key }) => (
                <div key={key} className="flex">
                  <Icon className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-1">{t(`about.mission.${key}`)}</p>
                    <p className="text-muted-foreground">{t(`about.mission.${key}Desc`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">{t('about.locations.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <Card key={loc.city} className="p-6 text-center">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-lg">{loc.city}</h3>
                <p className="text-sm text-muted-foreground">
                  {loc.country[currentLocale as keyof typeof loc.country] || loc.country.en}
                </p>
                <span className="inline-block mt-2 text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {loc.type}
                </span>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-compliance-700 to-innovation-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">{t('about.cta.title')}</h2>
          <p className="mb-6 max-w-2xl mx-auto">{t('about.cta.description')}</p>
          <Button
            size="lg"
            className="bg-white text-compliance-900 hover:bg-white/90 font-semibold border-2 border-white shadow-lg hover:shadow-xl transition-all"
            asChild
          >
            <Link to={`/${currentLocale}/contact`}>{t('about.cta.button')}</Link>
          </Button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default About;
