
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu as MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
}

export const MobileMenu = ({ items }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  
  // Function to handle link clicks
  const handleLinkClick = () => {
    setOpen(false);
    window.scrollTo(0, 0);
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
                                            to={subSubItem.href}
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
                                  to={subItem.href}
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
                    to={item.href}
                    className="block py-2 text-base font-medium hover:text-primary"
                    onClick={handleLinkClick}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
