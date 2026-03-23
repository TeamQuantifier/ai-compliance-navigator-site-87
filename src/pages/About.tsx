import PageTemplate from '@/components/PageTemplate';
import { Building2, Award, Users, BarChart4, Globe, GraduationCap, MapPin, Linkedin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BookPromoSection } from '@/components/BookPromoSection';
import { PostgraduatePromoSection } from '@/components/PostgraduatePromoSection';

const teamMembers = [
  {
    name: 'Mateusz Masiak',
    role: { pl: 'CEO & Co-founder', en: 'CEO & Co-founder', cs: 'CEO & Co-founder' },
    bio: {
      pl: 'Prezes i współzałożyciel Quantifier.ai.',
      en: 'President and co-founder of Quantifier.ai.',
      cs: 'Prezident a spoluzakladatel Quantifier.ai.',
    },
    linkedin: 'https://www.linkedin.com/in/mmasiak/',
    avatar: '/images/team/Mateusz.jpg',
  },
  {
    name: 'Weronika Czaplewska',
    role: { pl: 'VP & Co-founder', en: 'VP & Co-founder', cs: 'VP & Co-founder' },
    bio: {
      pl: 'Współzałożycielka Quantifier.ai.',
      en: 'Co-founder of Quantifier.ai.',
      cs: 'Spoluzakladatelka Quantifier.ai.',
    },
    linkedin: 'https://www.linkedin.com/in/weronika-czaplewska/',
    avatar: '/images/team/Weronika.jpg',
  },
  {
    name: 'Paulina Klimiuk',
    role: { pl: 'Head of Customer Success', en: 'Head of Customer Success', cs: 'Head of Customer Success' },
    bio: {
      pl: 'Odpowiada za zespół Customer Success i komunikację z klientem.',
      en: 'Leads the Customer Success team and client communication.',
      cs: 'Vede tým Customer Success a komunikaci s klienty.',
    },
    linkedin: 'https://www.linkedin.com/in/paulina-klimiuk/',
    avatar: '/images/team/Paulina.jpg',
  },
  {
    name: 'Enrika Gawłowska-Nabożny',
    role: { pl: 'Project Manager', en: 'Project Manager', cs: 'Project Manager' },
    bio: {
      pl: 'Zarządza projektami i koordynuje wdrożenia w Quantifier.ai.',
      en: 'Manages projects and coordinates implementations at Quantifier.ai.',
      cs: 'Řídí projekty a koordinuje implementace v Quantifier.ai.',
    },
    linkedin: 'https://linkedin.com/in/enrikagn/',
    avatar: '/images/team/Enrika.jpg',
  },
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
    foundingDate: '2025',
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 10 },
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Rondo Daszyńskiego 1',
        addressLocality: 'Warsaw',
        addressCountry: 'PL',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Głowackiego 3/5/1',
        addressLocality: 'Lublin',
        addressCountry: 'PL',
      },
    ],
    member: teamMembers.map((m) => ({
      '@type': 'Person',
      name: m.name,
      jobTitle: m.role[currentLocale as keyof typeof m.role] || m.role.en,
      url: m.linkedin,
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

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-2 text-center">{t('about.team.title')}</h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">{t('about.team.subtitle')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.name} className="p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-28 h-28 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center overflow-hidden">
                  {member.avatar ? (
                    <img src={member.avatar} alt={member.name} className="w-28 h-28 rounded-full object-cover object-top" />
                  ) : (
                    <Users className="h-10 w-10 text-muted-foreground" />
                  )}
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-primary mb-2">
                  {member.role[currentLocale as keyof typeof member.role] || member.role.en}
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  {member.bio[currentLocale as keyof typeof member.bio] || member.bio.en}
                </p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-muted rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">{t('about.impact.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">250+</div>
              <p className="text-muted-foreground">{t('about.impact.clients')}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">30+</div>
              <p className="text-muted-foreground">{t('about.impact.activeFirms')}</p>
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

        {/* Office */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">{t('about.locations.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-lg">Europa</h3>
              <p className="text-sm text-muted-foreground">(+48) 698 759 206</p>
            </Card>
            <Card className="p-6 text-center">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-lg">{t('about.locations.warsaw')}</h3>
              <p className="text-sm text-muted-foreground">Rondo Daszyńskiego 1</p>
            </Card>
            <Card className="p-6 text-center">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-lg">{t('about.locations.lublin')}</h3>
              <p className="text-sm text-muted-foreground">Głowackiego 3/5/1</p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-compliance-700 to-innovation-600 rounded-xl p-8 text-white text-center mb-16">
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

        {/* Team Photo - Conferences */}
        <div className="mb-16 text-center">
          <h2 className="text-2xl font-bold mb-6">{t('about.conferences')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="/images/quantifier-team.jpg"
                alt={t('about.conferencesAlt')}
                className="w-full h-72 md:h-80 object-cover"
                loading="lazy"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="/images/quantifier-team-conference.jpeg"
                alt={t('about.conferencesAlt')}
                className="w-full h-72 md:h-80 object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default About;
