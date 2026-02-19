
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu as MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';

interface SubSubMenuItem {
  title: string;
  href: string;
}

interface SubMenuItem {
  title: string;
  href: string;
  items?: SubSubMenuItem[];
}

interface MenuItem {
  title: string;
  href: string;
  items?: SubMenuItem[];
}

interface MobileMenuProps {
  items: MenuItem[];
  cybersecHref?: string;
}

export const MobileMenu = ({ items, cybersecHref = '/cybersecurity-check' }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { currentLocale, t } = useLanguage();
  
  // Function to handle link clicks
  const handleLinkClick = () => {
    setOpen(false);
    window.scrollTo(0, 0);
  };

  // Function to handle login button click
  const handleLoginClick = () => {
    window.location.href = 'https://platform.quantifier.ai';
  };

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Menu">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
          <div className="flex flex-col space-y-4 py-4">
            <div className="px-4 flex justify-end">
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            {items.map((item) => (
              <div key={item.title} className="px-4">
                {item.items && item.items.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={item.title} className="border-b-0">
                      <AccordionTrigger className="py-2 text-base font-medium">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col space-y-1 ml-4">
                          {item.items.map((subItem) => (
                            <div key={subItem.title}>
                              {subItem.items && subItem.items.length > 0 ? (
                                <Accordion type="single" collapsible className="w-full">
                                  <AccordionItem value={subItem.title} className="border-b-0">
                                    <AccordionTrigger className="py-2 text-sm">
                                      {subItem.title}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <div className="flex flex-col space-y-1 ml-4">
                                        {subItem.items.map((subSubItem) => (
                                          <Link
                                            key={subSubItem.title}
                                            to={`/${currentLocale}${subSubItem.href}`}
                                            className="py-2 text-sm text-muted-foreground hover:text-foreground"
                                            onClick={handleLinkClick}
                                          >
                                            {subSubItem.title}
                                          </Link>
                                        ))}
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              ) : (
                                <Link
                                  to={`/${currentLocale}${subItem.href}`}
                                  className="py-2 text-sm font-medium hover:text-primary"
                                  onClick={handleLinkClick}
                                >
                                  {subItem.title}
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <Link
                    to={`/${currentLocale}${item.href}`}
                    className="block py-2 text-base font-medium hover:text-primary"
                    onClick={handleLinkClick}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Cybersec-Check CTA in mobile menu */}
            <div className="px-4 pt-2">
              <Link
                to={`/${currentLocale}${cybersecHref}`}
                className="flex items-center justify-center w-full px-3 py-2 text-sm font-semibold bg-[#6d38a8] text-white rounded-md hover:bg-[#5a2e8e] transition-colors"
                onClick={handleLinkClick}
              >
                {t('menu.cybersecCheck')}
              </Link>
            </div>

            {/* Login button in mobile menu */}
            <div className="px-4 pt-4 border-t border-gray-200">
              <Button 
                className="w-full" 
                variant="outline"
                onClick={handleLoginClick}
              >
                {t('nav.login')}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
