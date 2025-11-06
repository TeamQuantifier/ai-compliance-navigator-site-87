import React, { useState } from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { newsletterClient } from '@/lib/newsletter-client';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = "https://cuzufmphilriynstexsv.supabase.co/functions/v1/contact-submit";
    const supabase_anon_api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1enVmbXBoaWxyaXluc3RleHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MjMyMDIsImV4cCI6MjA3MTE5OTIwMn0.PJFJKz4M-aDo-7r1a6g2JHOjnUB1UsYb8QxvZ9GjFNk"

    if (!url) {
      toast({
        title: t('contact.toast.configError'),
        description: t('contact.toast.configErrorDesc'),
        variant: 'destructive',
      });
      return;
    }

    if (!firstName || !lastName || !email || !message) {
      toast({
        title: t('contact.toast.missingFields'),
        description: t('contact.toast.missingFieldsDesc'),
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${supabase_anon_api_key}` },
        body: JSON.stringify({ firstName, lastName, email, company, message }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || 'Failed to send message');
      }

      toast({
        title: t('contact.toast.messageSent'),
        description: t('contact.toast.messageSentDesc'),
      });

      // Also subscribe to newsletter with contact form data
      try {
        await newsletterClient.subscribe(email, 'en', {
          source: 'contact_form',
          first_name: firstName,
          last_name: lastName,
          company: company,
          customer_message: message,
          origin: window.location.origin,
          tags: ['contact_form', 'newsletter']
        });
      } catch (newsletterError) {
        // Don't fail the contact form if newsletter subscription fails
        console.warn('Newsletter subscription failed:', newsletterError);
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

  return <PageTemplate title={t('contact.title')} description={t('contact.description')}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-bold mb-6 gradient-heading text-6xl py-[20px]">{t('contact.heading')}</h2>
          <p className="text-lg text-slate-600 mb-8">
            {t('contact.intro')}
          </p>
          
          <div className="space-y-6 mb-8">
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
          
          <div className="flex space-x-4">
            <a href="https://www.linkedin.com/company/quantifier-ai/about/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-compliance-700 transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="mailto:contact@quantifier.ai" className="text-slate-500 hover:text-compliance-700 transition-colors">
              <Mail className="h-6 w-6" />
            </a>
          </div>
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
        </div>
      </div>
    </PageTemplate>;
};

export default Contact;