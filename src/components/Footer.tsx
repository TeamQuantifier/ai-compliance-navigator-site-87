import { Link } from 'react-router-dom';
import { Linkedin, Mail, Phone, MapPin } from 'lucide-react';
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

  return <footer className="bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img src="/lovable-uploads/dc230f24-69a0-48e6-952c-3811d16e1833.png" alt="Quantifier.ai Logo" className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold bg-gradient-to-r from-compliance-700 to-innovation-600 bg-clip-text text-transparent">
                Quantifier.ai
              </span>
            </Link>
            
            <p className="text-slate-600 mb-6 max-w-md text-sm">
              {t('footer.description')}
            </p>
            
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/quantifier-ai/about/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-compliance-700 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:contact@quantifier.ai" className="text-slate-500 hover:text-compliance-700 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Solutions Section */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">{t('footer.solutions.title')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to={`/${currentLocale}/soc2-automation`} className="text-slate-600 hover:text-compliance-700 transition-colors">
                  {t('footer.solutions.soc2')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLocale}/iso27001`} className="text-slate-600 hover:text-compliance-700 transition-colors">
                  {t('footer.solutions.iso27001')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLocale}/gdpr-compliance`} className="text-slate-600 hover:text-compliance-700 transition-colors">
                  {t('footer.solutions.gdpr')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLocale}/nis2`} className="text-slate-600 hover:text-compliance-700 transition-colors">
                  {t('footer.solutions.nis2')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLocale}/grc-platform`} className="text-slate-600 hover:text-compliance-700 transition-colors">
                  {t('footer.solutions.grcPlatform')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company Section */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">{t('footer.company.title')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to={`/${currentLocale}/about`} className="text-slate-600 hover:text-compliance-700 transition-colors">
                  {t('footer.company.about')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLocale}/partners`} className="text-slate-600 hover:text-compliance-700 transition-colors">
                  {t('footer.company.partners')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLocale}/success-stories`} className="text-slate-600 hover:text-compliance-700 transition-colors">
                  {t('footer.company.successStories')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLocale}/blog`} className="text-slate-600 hover:text-compliance-700 transition-colors">
                  {t('footer.company.blog')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLocale}/contact`} className="text-slate-600 hover:text-compliance-700 transition-colors">
                  {t('footer.company.contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Section */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">{t('footer.contactUs.title')}</h4>
            <div className="space-y-2 text-sm text-slate-600">
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
        
        <div className="max-w-2xl mx-auto bg-white rounded-xl p-5 border border-slate-200 mb-12">
          <h3 className="font-semibold text-slate-900 mb-2 text-center">{t('footer.newsletter.title')}</h3>
          <p className="text-slate-600 mb-4 text-center text-sm">{t('footer.newsletter.subtitle')}</p>
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
          <p className="text-xs text-slate-500 mt-3 text-center">{t('footer.newsletter.disclaimer')}</p>
        </div>
        
        <Separator className="mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-slate-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Quantifier.ai. {t('footer.legal.allRightsReserved')}
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <Link to="/legal/privacy" className="text-slate-500 hover:text-primary transition-colors">
              {t('footer.legal.privacy')}
            </Link>
            <Link to="/legal/terms" className="text-slate-500 hover:text-primary transition-colors">
              {t('footer.legal.terms')}
            </Link>
            <Link to="/legal/cookies" className="text-slate-500 hover:text-primary transition-colors">
              {t('footer.legal.cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;