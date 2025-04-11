
import { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface MegaMenuProps {
  items: MenuItem[];
}

export const MegaMenu = ({ items }: MegaMenuProps) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  const handleMenuEnter = (title: string) => {
    setActiveMenu(title);
  };

  const handleMenuLeave = () => {
    setActiveMenu(null);
    setActiveSubMenu(null);
  };

  const handleSubMenuEnter = (title: string) => {
    setActiveSubMenu(title);
  };

  const handleSubMenuLeave = () => {
    setActiveSubMenu(null);
  };

  return (
    <nav className="hidden lg:flex items-center space-x-1">
      {items.map((item) => (
        <div
          key={item.title}
          className="relative"
          onMouseEnter={() => handleMenuEnter(item.title)}
          onMouseLeave={handleMenuLeave}
        >
          <Link
            to={item.href}
            className={cn(
              "nav-item",
              activeMenu === item.title && "nav-item-active"
            )}
          >
            {item.title}
            {item.items && item.items.length > 0 && (
              <ChevronDown className="ml-1 h-4 w-4 inline-block" />
            )}
          </Link>

          {item.items && item.items.length > 0 && activeMenu === item.title && (
            <div className="absolute left-0 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-fade-in">
              <div className="py-1">
                {item.items.map((subItem) => (
                  <Fragment key={subItem.title}>
                    {subItem.items && subItem.items.length > 0 ? (
                      <div
                        className="relative"
                        onMouseEnter={() => handleSubMenuEnter(subItem.title)}
                        onMouseLeave={handleSubMenuLeave}
                      >
                        <Link
                          to={subItem.href}
                          className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          {subItem.title}
                          <ChevronRight className="h-4 w-4" />
                        </Link>

                        {activeSubMenu === subItem.title && (
                          <div className="absolute left-full top-0 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-fade-in">
                            <div className="py-1">
                              {subItem.items.map((subSubItem) => (
                                <Link
                                  key={subSubItem.title}
                                  to={subSubItem.href}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                >
                                  {subSubItem.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={subItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        {subItem.title}
                      </Link>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default MegaMenu;
