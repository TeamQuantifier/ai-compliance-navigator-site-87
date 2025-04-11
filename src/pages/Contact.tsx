
import PageTemplate from '@/components/PageTemplate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <PageTemplate
      title="Contact Us"
      description="Get in touch with our team to learn more about our AI-powered compliance solutions."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6 gradient-heading">
            Get in Touch
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Have questions about our platform? Ready to start your AI compliance journey? Our team is here to help.
          </p>
          
          <div className="space-y-6 mb-8">
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-compliance-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Email Us</h3>
                <p className="text-slate-600">info@complianceai.com</p>
                <p className="text-slate-600">support@complianceai.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="h-6 w-6 text-compliance-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Call Us</h3>
                <p className="text-slate-600">+1 (555) 123-4567</p>
                <p className="text-slate-600">Mon-Fri: 9AM - 6PM EST</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-compliance-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Visit Our Office</h3>
                <p className="text-slate-600">123 Compliance Way</p>
                <p className="text-slate-600">Suite 456</p>
                <p className="text-slate-600">New York, NY 10001</p>
              </div>
            </div>
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
                <Textarea 
                  id="message" 
                  placeholder="How can we help you?" 
                  rows={5} 
                />
              </div>
              
              <Button className="w-full group">
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Contact;
