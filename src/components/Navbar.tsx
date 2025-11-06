import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { MobileMenu } from './MobileMenu';
import { Button } from '@/components/ui/button';
import { LanguageSwitch } from './LanguageSwitch';
import { useLanguage } from '@/contexts/LanguageContext';


export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { currentLocale, t } = useLanguage();

  const menuItems = [
    {
      title: t('menu.product.title'),
      href: '/product',
      items: [
        { title: t('menu.product.items.features'), href: '/product/features' },
        { title: t('menu.product.items.aiOfficer'), href: '/product/ai-compliance-officer' },
        { title: t('menu.product.items.taskManagement'), href: '/product/task-data-management' },
        { title: t('menu.product.items.documents'), href: '/product/documents-management' },
        { title: t('menu.product.items.valueChain'), href: '/product/value-chain' },
        { title: t('menu.product.items.riskAssessment'), href: '/product/risk-assessment' },
        { title: t('menu.product.items.analytics'), href: '/product/analytics-dashboards' },
        { title: t('menu.product.items.apiIntegrations'), href: '/product/api-integrations' },
      ],
    },
    {
      title: t('menu.byRoles.title'),
      href: '/by-roles',
      items: [
        { title: t('menu.byRoles.items.managers'), href: '/by-roles/managers' },
        { title: t('menu.byRoles.items.contributors'), href: '/by-roles/contributors' },
        { title: t('menu.byRoles.items.auditor'), href: '/by-roles/auditor' },
      ],
    },
    {
      title: t('menu.frameworks.title'),
      href: '/frameworks',
      items: [
        {
          title: t('menu.frameworks.cybersecurity.title'),
          href: '/frameworks/cybersecurity',
          items: [
            { title: t('menu.frameworks.cybersecurity.soc'), href: '/frameworks/cybersecurity/soc' },
            { title: t('menu.frameworks.cybersecurity.nis'), href: '/frameworks/cybersecurity/nis-ii' },
            { title: t('menu.frameworks.cybersecurity.nist'), href: '/frameworks/cybersecurity/nist' },
          ],
        },
        {
          title: t('menu.frameworks.infoSecurity.title'),
          href: '/frameworks/information-security',
          items: [
            { title: t('menu.frameworks.infoSecurity.iso27001'), href: '/frameworks/information-security/iso-27001' },
            { title: t('menu.frameworks.infoSecurity.iso9001'), href: '/frameworks/information-security/iso-9001' },
            { title: t('menu.frameworks.infoSecurity.dora'), href: '/frameworks/information-security/dora' },
          ],
        },
        {
          title: t('menu.frameworks.dataSecurity.title'),
          href: '/frameworks/data-security',
          items: [
            { title: t('menu.frameworks.dataSecurity.gdpr'), href: '/frameworks/data-security/gdpr' },
            { title: t('menu.frameworks.dataSecurity.hipaa'), href: '/frameworks/data-security/hippa' },
            { title: t('menu.frameworks.dataSecurity.ccpa'), href: '/frameworks/data-security/ccpa' },
          ],
        },
        {
          title: t('menu.frameworks.esg.title'),
          href: '/frameworks/esg',
          items: [
            { title: t('menu.frameworks.esg.csdr'), href: '/frameworks/esg/csdr-reporting' },
            { title: t('menu.frameworks.esg.gri'), href: '/frameworks/esg/gri-reporting' },
            { title: t('menu.frameworks.esg.cbam'), href: '/frameworks/esg/cbam-reporting' },
          ],
        },
        {
          title: t('menu.frameworks.environmental.title'),
          href: '/frameworks/environmental',
          items: [
            { title: t('menu.frameworks.environmental.iso14001'), href: '/frameworks/environmental/iso-14001' },
            { title: t('menu.frameworks.environmental.lca'), href: '/frameworks/environmental/lca' },
            { title: t('menu.frameworks.environmental.carbonFootprint'), href: '/frameworks/environmental/carbon-footprint' },
            { title: t('menu.frameworks.environmental.decarbonisation'), href: '/frameworks/environmental/decarbonisation' },
          ],
        },
        {
          title: t('menu.frameworks.governance.title'),
          href: '/frameworks/governance',
          items: [
            { title: t('menu.frameworks.governance.legalPolicies'), href: '/frameworks/governance/legal-policies' },
            { title: t('menu.frameworks.governance.whistleblowing'), href: '/frameworks/governance/whistleblowing' },
          ],
        },
        {
          title: t('menu.frameworks.productLevel.title'),
          href: '/frameworks/product-level',
          items: [
            { title: t('menu.frameworks.productLevel.dpp'), href: '/frameworks/product-level/dpp' },
            { title: t('menu.frameworks.productLevel.lcaAnalysis'), href: '/frameworks/product-level/lca-analysis' },
          ],
        },
      ],
    },
    {
      title: t('menu.plans'),
      href: '/plans',
    },
    {
      title: t('menu.partners'),
      href: '/partners',
    },
    {
      title: t('menu.successStories'),
      href: '/success-stories',
    },
    {
      title: t('menu.about'),
      href: '/about',
    },
    {
      title: t('menu.contact'),
      href: '/contact',
    },
  ];

  // Effect to handle scroll position on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to handle link clicks - scroll to top
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  // Function to handle login button click
  const handleLoginClick = () => {
    window.location.href = 'https://platform.quantifier.ai';
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to={`/${currentLocale}`} className="flex items-center" onClick={handleLinkClick}>
            <img 
              src="/lovable-uploads/dc230f24-69a0-48e6-952c-3811d16e1833.png" 
              alt="Quantifier.ai Logo" 
              className="h-10 w-10 mr-3" 
            />
            <span className="text-xl font-bold bg-gradient-to-r from-compliance-700 to-innovation-600 bg-clip-text text-transparent whitespace-nowrap">
              Quantifier.ai
            </span>
          </Link>
        </div>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                <Link 
                  to={`/${currentLocale}${item.href}`}
                  className={navigationMenuTriggerStyle() + " h-9 px-3"}
                  onClick={handleLinkClick}
                >
                  {item.title}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex items-center gap-2">
          <LanguageSwitch />
          <div className="hidden md:flex">
            <Button variant="outline" size="sm" onClick={handleLoginClick}>
              {t('nav.login')}
            </Button>
          </div>
          <MobileMenu items={menuItems} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
