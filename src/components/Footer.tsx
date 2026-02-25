import { Link } from 'react-router-dom';
import { Linkedin, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { newsletterClient } from '@/lib/newsletter-client';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t, currentLocale } = useLanguage();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: t('footer.toast.emailRequired'),
        description: t('footer.toast.emailRequiredDesc'),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await newsletterClient.subscribe(email, currentLocale, {
        source: 'website_footer',
        origin: window.location.origin,
        tags: ['newsletter', 'footer_signup']
      });
      
      toast({
        title: t('footer.toast.subscribeSuccess'),
        description: t('footer.toast.subscribeSuccessDesc'),
      });
      
      setEmail('');
    } catch (error) {
      toast({
        title: t('footer.toast.subscribeFailed'),
        description: error instanceof Error ? error.message : t('footer.toast.subscribeFailedDesc'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <Link to={`/${currentLocale}`} className="flex items-center mb-4">
              <img 
                src="/logo-quantifier.png" 
                alt="Quantifier.ai" 
                className="h-10 w-auto"
                width={180}
                height={40}
                loading="lazy"
              />
            </Link>
            
            <p className="text-muted-foreground mb-6 max-w-md text-sm">
              {t('footer.description')}
            </p>
            
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/quantifier-ai/about/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:contact@quantifier.ai" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Solutions Section */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.solutions.title')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to={`/${currentLocale}/frameworks/soc`} className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.solutions.soc2')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLocale}/frameworks/iso-27001`} className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.solutions.iso27001')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLocale}/frameworks/gdpr`} className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.solutions.gdpr')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLocale}/frameworks/nis-ii`} className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.solutions.nis2')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLocale}/grc-platform`} className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.solutions.grcPlatform')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company Section */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.company.title')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to={`/${currentLocale}/partners`} className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.company.partners')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLocale}/success-stories`} className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.company.successStories')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLocale}/blog`} className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.company.blog')}
                </Link>
              </li>
              <li>
              <Link to={`/${currentLocale}/contact`} className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.company.contact')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLocale}/legal/privacy`} className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.legal.privacy')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Section */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.contactUs.title')}</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@quantifier.ai</span>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                <div>
                  <div>{t('footer.contact.usaPhone')}</div>
                  <div className="text-xs">{t('footer.contact.usaAddress')}</div>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                <div>
                  <div>{t('footer.contact.europePhone')}</div>
                  <div className="text-xs">{t('footer.contact.warsawAddress')}</div>
                  <div className="text-xs">{t('footer.contact.lublinAddress')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto bg-card rounded-xl p-5 border border-border mb-12">
          <h3 className="font-semibold text-foreground mb-2 text-center">{t('footer.newsletter.title')}</h3>
          <p className="text-muted-foreground mb-4 text-center text-sm">{t('footer.newsletter.subtitle')}</p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
            <Input 
              type="email" 
              placeholder={t('footer.newsletter.placeholder')}
              className="flex-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? t('footer.newsletter.subscribing') : t('footer.newsletter.subscribe')}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-3 text-center">{t('footer.newsletter.disclaimer')}</p>
        </div>
        
        <Separator className="mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Quantifier.ai. {t('footer.legal.allRightsReserved')}
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <Link to={`/${currentLocale}/legal/privacy`} className="text-muted-foreground hover:text-primary transition-colors">
              {t('footer.legal.privacy')}
            </Link>
            <Link to={`/${currentLocale}/legal/terms`} className="text-muted-foreground hover:text-primary transition-colors">
              {t('footer.legal.terms')}
            </Link>
            <Link to={`/${currentLocale}/legal/cookies`} className="text-muted-foreground hover:text-primary transition-colors">
              {t('footer.legal.cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;