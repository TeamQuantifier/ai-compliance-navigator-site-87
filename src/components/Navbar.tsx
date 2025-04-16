
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

const menuItems = [
  {
    title: 'Product',
    href: '/product',
    items: [
      { title: 'Main Features', href: '/product/features' },
      { title: 'AI Compliance Officer', href: '/product/ai-compliance-officer' },
      { title: 'Task and Data Management', href: '/product/task-data-management' },
      { title: 'Documents Management', href: '/product/documents-management' },
      { title: 'Value Chain', href: '/product/value-chain' },
      { title: 'Risk Assessment', href: '/product/risk-assessment' },
      { title: 'AI Analytics and Dashboards', href: '/product/analytics-dashboards' },
      { title: 'API Integrations', href: '/product/api-integrations' },
    ],
  },
  {
    title: 'By Roles',
    href: '/by-roles',
    items: [
      { title: 'Managers', href: '/by-roles/managers' },
      { title: 'Contributors', href: '/by-roles/contributors' },
      { title: 'Auditor', href: '/by-roles/auditor' },
    ],
  },
  {
    title: 'Frameworks',
    href: '/frameworks',
    items: [
      {
        title: 'Cybersecurity',
        href: '/frameworks/cybersecurity',
        items: [
          { title: 'SOC I and SOC II', href: '/frameworks/cybersecurity/soc' },
          { title: 'NIS II', href: '/frameworks/cybersecurity/nis-ii' },
          { title: 'NIST', href: '/frameworks/cybersecurity/nist' },
        ],
      },
      {
        title: 'Information Security',
        href: '/frameworks/information-security',
        items: [
          { title: 'ISO 27001', href: '/frameworks/information-security/iso-27001' },
          { title: 'ISO 9001', href: '/frameworks/information-security/iso-9001' },
          { title: 'DORA', href: '/frameworks/information-security/dora' },
        ],
      },
      {
        title: 'Data Security',
        href: '/frameworks/data-security',
        items: [
          { title: 'GDPR', href: '/frameworks/data-security/gdpr' },
          { title: 'HIPPA', href: '/frameworks/data-security/hippa' },
          { title: 'CCPA', href: '/frameworks/data-security/ccpa' },
        ],
      },
      {
        title: 'ESG',
        href: '/frameworks/esg',
        items: [
          { title: 'CSDR Reporting', href: '/frameworks/esg/csdr-reporting' },
          { title: 'GRI Reporting', href: '/frameworks/esg/gri-reporting' },
          { title: 'CBAM Reporting', href: '/frameworks/esg/cbam-reporting' },
        ],
      },
      {
        title: 'Environmental',
        href: '/frameworks/environmental',
        items: [
          { title: 'ISO 14001', href: '/frameworks/environmental/iso-14001' },
          { title: 'LCA', href: '/frameworks/environmental/lca' },
          { title: 'Carbon Footprint, GHG', href: '/frameworks/environmental/carbon-footprint' },
          { title: 'Decarbonisation', href: '/frameworks/environmental/decarbonisation' },
        ],
      },
      {
        title: 'Governance',
        href: '/frameworks/governance',
        items: [
          { title: 'Legal Policies', href: '/frameworks/governance/legal-policies' },
          { title: 'Whistleblowing', href: '/frameworks/governance/whistleblowing' },
        ],
      },
      {
        title: 'Product Level',
        href: '/frameworks/product-level',
        items: [
          { title: 'DPP', href: '/frameworks/product-level/dpp' },
          { title: 'LCA Analysis', href: '/frameworks/product-level/lca-analysis' },
        ],
      },
    ],
  },
  {
    title: 'Plans',
    href: '/plans',
  },
  {
    title: 'Partners',
    href: '/partners',
  },
  {
    title: 'Success Stories',
    href: '/success-stories',
  },
  {
    title: 'About Us',
    href: '/about',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
          <Link to="/" className="flex items-center">
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
                  to={item.href}
                  className={navigationMenuTriggerStyle() + " h-9 px-3"}
                >
                  {item.title}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex items-center">
          <div className="hidden md:flex">
            <Button variant="outline" size="sm">
              Log In
            </Button>
          </div>
          <MobileMenu items={menuItems} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
