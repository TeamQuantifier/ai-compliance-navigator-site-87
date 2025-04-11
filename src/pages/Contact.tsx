import PageTemplate from '@/components/PageTemplate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
const Contact = () => {
  return <PageTemplate title="Contact Us" description="Get in touch with our team to learn more about our AI-powered compliance solutions.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-bold mb-6 gradient-heading text-6xl py-[20px]">Contact us</h2>
          <p className="text-lg text-slate-600 mb-8">
            Quantifier is redefining how companies approach compliance — with an always-on, autonomous AI platform that monitors, enforces, and drives regulatory actions across the enterprise.
          </p>
          
          <div className="space-y-6 mb-8">
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-compliance-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Email Us</h3>
                <p className="text-slate-600">contact@quantifier.ai</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="h-6 w-6 text-compliance-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Call Us</h3>
                <p className="text-slate-600">(+1) 415-799-8206</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-compliance-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Visit Our Office</h3>
                <p className="text-slate-600">447 Sutter St Ste 405 PMB 137, San Francisco, CA 94108</p>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-slate-500 hover:text-compliance-700 transition-colors">
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
              Send Us a Message
            </h2>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-slate-700">
                    First Name
                  </label>
                  <Input id="firstName" placeholder="John" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-slate-700">
                    Last Name
                  </label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-slate-700">
                  Company Name
                </label>
                <Input id="company" placeholder="Acme Inc." />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-700">
                  Message
                </label>
                <Textarea id="message" placeholder="How can we help you?" rows={5} />
              </div>
              
              <div className="text-xs text-slate-500 mb-4">
                You can unsubscribe from these communications at any time. For more information on how to unsubscribe, our privacy practices, and how we are committed to protecting and respecting your privacy, please review our Privacy Policy. By clicking "send" above, you consent to allow Quantifier.ai to store and process the personal information submitted above to provide you the content requested.
              </div>
              
              <Button className="w-full group">
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </PageTemplate>;
};
export default Contact;