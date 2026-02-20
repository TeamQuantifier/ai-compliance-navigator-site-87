import React, { useState } from 'react';
import logosGrid from '@/assets/logos-grid.png';
import PageTemplate from '@/components/PageTemplate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { newsletterClient } from '@/lib/newsletter-client';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
  const { toast } = useToast();
  const { t, currentLocale } = useLanguage();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side validation
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedMessage = message.trim();

    if (!trimmedFirstName || !trimmedLastName || !trimmedEmail || !trimmedMessage) {
      toast({
        title: t('contact.toast.missingFields'),
        description: t('contact.toast.missingFieldsDesc'),
        variant: 'destructive',
      });
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast({
        title: t('contact.toast.invalidEmail') || 'Invalid email',
        description: t('contact.toast.invalidEmailDesc') || 'Please enter a valid email address',
        variant: 'destructive',
      });
      return;
    }

    // Length validation
    if (trimmedFirstName.length > 100 || trimmedLastName.length > 100) {
      toast({
        title: t('contact.toast.fieldTooLong') || 'Field too long',
        description: t('contact.toast.nameTooLongDesc') || 'Name must be less than 100 characters',
        variant: 'destructive',
      });
      return;
    }

    if (trimmedMessage.length > 5000) {
      toast({
        title: t('contact.toast.fieldTooLong') || 'Field too long',
        description: t('contact.toast.messageTooLongDesc') || 'Message must be less than 5000 characters',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await newsletterClient.submitContact({
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        email: trimmedEmail,
        company: company.trim() || undefined,
        message: trimmedMessage,
      });

      toast({
        title: t('contact.toast.messageSent'),
        description: t('contact.toast.messageSentDesc'),
      });

      // Also subscribe to newsletter
      try {
        await newsletterClient.subscribe(trimmedEmail, currentLocale, {
          source: 'contact_form',
          first_name: trimmedFirstName,
          last_name: trimmedLastName,
          company: company.trim() || undefined,
          tags: ['contact_form', 'newsletter']
        });
      } catch (newsletterError) {
        // Don't fail the contact form if newsletter subscription fails
      }

      setFirstName('');
      setLastName('');
      setEmail('');
      setCompany('');
      setMessage('');
    } catch (err: any) {
      toast({
        title: t('contact.toast.failedToSend'),
        description: err?.message || t('contact.toast.failedToSendDesc'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return <PageTemplate title={t('seo.contact.title')} description={t('seo.contact.description')}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-bold mb-6 gradient-heading text-3xl md:text-4xl leading-tight py-[20px]">{t('contact.heading')}</h2>
          <p className="text-lg text-slate-600 mb-4">
            {t('contact.intro')}
          </p>
          <p className="text-base text-slate-600 mb-3">
            {t('contact.offerIntro')}
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-4 space-y-1">
            {(Array.isArray(t('contact.features', { returnObjects: true })) 
              ? (t('contact.features', { returnObjects: true }) as string[])
              : []
            ).map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <p className="text-slate-600 mb-3">
            {t('contact.summary')}
          </p>
          <p className="text-slate-700 font-medium mb-6">
            {t('contact.cta')}
          </p>

          <img
            src={logosGrid}
            alt="Klienci Quantifier – logotypy"
            className="w-full object-contain"
            width={600}
            height={400}
            loading="lazy"
          />
        </div>
        
        <div>
          <Card className="p-6 border border-slate-200">
            <h2 className="text-xl font-bold mb-6">
              {t('contact.formTitle')}
            </h2>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-slate-700">
                    {t('contact.firstName')}
                  </label>
                  <Input
                    id="firstName"
                    placeholder={t('contact.firstNamePlaceholder')}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-slate-700">
                    {t('contact.lastName')}
                  </label>
                  <Input
                    id="lastName"
                    placeholder={t('contact.lastNamePlaceholder')}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                  {t('contact.emailAddress')}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('contact.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-slate-700">
                  {t('contact.companyName')}
                </label>
                <Input
                  id="company"
                  placeholder={t('contact.companyPlaceholder')}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-700">
                  {t('contact.message')}
                </label>
                <Textarea
                  id="message"
                  placeholder={t('contact.messagePlaceholder')}
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="text-xs text-slate-500 mb-4">
                {t('contact.disclaimer')}
              </div>
              
              <Button className="w-full group" type="submit" disabled={loading} aria-busy={loading}>
                {loading ? t('contact.sending') : t('contact.sendMessage')}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Card>

          <div className="mt-6 space-y-6">
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-compliance-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">{t('contact.emailUs')}</h3>
                <p className="text-slate-600">contact@quantifier.ai</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="h-6 w-6 text-compliance-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">{t('contact.callUs')}</h3>
                <p className="text-slate-600">
                  {t('contact.usaPhone')}<br />
                  {t('contact.europePhone')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-compliance-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">{t('contact.visitOffices')}</h3>
                <p className="text-slate-600">
                  {t('contact.usaAddress')}<br />
                  {t('contact.europeLabel')}<br />
                  {t('contact.warsawAddress')}<br />
                  {t('contact.lublinAddress')}
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-4">
            <a href="https://www.linkedin.com/company/quantifier-ai/about/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-compliance-700 transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="mailto:contact@quantifier.ai" className="text-slate-500 hover:text-compliance-700 transition-colors">
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mt-16">
        <Card className="p-8 border border-slate-200 bg-gradient-to-br from-compliance-50 to-background">
          <div className="max-w-2xl mx-auto text-center">
            <Mail className="h-12 w-12 text-compliance-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-3">
              {t('contact.newsletter.title')}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t('contact.newsletter.subtitle')}
            </p>
            
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                
                if (!newsletterEmail) {
                  toast({
                    title: t('contact.newsletter.emailRequired'),
                    description: t('contact.newsletter.emailRequiredDesc'),
                    variant: 'destructive',
                  });
                  return;
                }
                
                setNewsletterLoading(true);
                try {
                  await newsletterClient.subscribe(newsletterEmail, currentLocale, {
                    source: 'contact_page_newsletter',
                    origin: window.location.origin,
                    tags: ['newsletter', 'contact_page_signup']
                  });
                  
                  toast({
                    title: t('contact.newsletter.success'),
                    description: t('contact.newsletter.successDesc'),
                  });
                  
                  setNewsletterEmail('');
                } catch (error) {
                  toast({
                    title: t('contact.newsletter.error'),
                    description: t('contact.newsletter.errorDesc'),
                    variant: 'destructive',
                  });
                } finally {
                  setNewsletterLoading(false);
                }
              }} 
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder={t('contact.newsletter.placeholder')}
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1"
                disabled={newsletterLoading}
              />
              <Button type="submit" disabled={newsletterLoading}>
                {newsletterLoading 
                  ? t('contact.newsletter.subscribing') 
                  : t('contact.newsletter.subscribe')}
              </Button>
            </form>
            
            <p className="text-xs text-muted-foreground mt-4">
              {t('contact.newsletter.disclaimer')}
            </p>
          </div>
        </Card>
      </div>
    </PageTemplate>;
};

export default Contact;