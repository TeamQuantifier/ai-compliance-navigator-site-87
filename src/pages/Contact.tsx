
import PageTemplate from '@/components/PageTemplate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, Linkedin, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <PageTemplate 
        title="Contact Us" 
        description="Get in touch with our team to learn more about our AI-powered compliance solutions."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-compliance-600 to-innovation-600 rounded-full opacity-30 blur-xl"></div>
              <h2 className="font-bold mb-2 text-6xl relative z-10 text-white">
                Get in <span className="text-compliance-400">Touch</span>
              </h2>
              <div className="flex items-center gap-2 mb-6">
                <Shield className="h-5 w-5 text-compliance-400" />
                <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">
                  Secure Communications
                </p>
              </div>
            </div>
            
            <p className="text-lg text-slate-300 border-l-4 border-compliance-500 pl-4">
              Quantifier is redefining how companies approach compliance — with an always-on, autonomous AI platform that monitors, enforces, and drives regulatory actions across the enterprise.
            </p>
            
            <div className="space-y-6 bg-slate-800/50 p-6 rounded-lg border border-slate-700">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-compliance-400 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Email Us</h3>
                  <p className="text-slate-300">contact@quantifier.ai</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-compliance-400 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Call Us</h3>
                  <p className="text-slate-300">415-799-8206</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-compliance-400 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Visit Our Office</h3>
                  <p className="text-slate-300">447 Sutter St Ste 405 PMB 137, San Francisco, CA 94108</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-3 rounded-full hover:bg-compliance-600 transition-all duration-300 group">
                <Linkedin className="h-6 w-6 text-slate-300 group-hover:text-white" />
              </a>
              <a href="mailto:contact@quantifier.ai" className="bg-slate-800 p-3 rounded-full hover:bg-compliance-600 transition-all duration-300 group">
                <Mail className="h-6 w-6 text-slate-300 group-hover:text-white" />
              </a>
            </div>
          </div>
          
          <div>
            <Card className="p-6 border-0 bg-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-compliance-600/20 to-innovation-600/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="flex items-center gap-2 mb-6">
                <Zap className="h-5 w-5 text-compliance-400" />
                <h2 className="text-xl font-bold text-white">
                  Send Us a Message
                </h2>
              </div>
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-slate-300">
                      First Name
                    </label>
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      className="bg-slate-700 border-slate-600 placeholder:text-slate-400 text-white focus:border-compliance-400 focus-visible:ring-compliance-400" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-slate-300">
                      Last Name
                    </label>
                    <Input 
                      id="lastName" 
                      placeholder="Doe" 
                      className="bg-slate-700 border-slate-600 placeholder:text-slate-400 text-white focus:border-compliance-400 focus-visible:ring-compliance-400" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-300">
                    Email Address
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    className="bg-slate-700 border-slate-600 placeholder:text-slate-400 text-white focus:border-compliance-400 focus-visible:ring-compliance-400" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-slate-300">
                    Company Name
                  </label>
                  <Input 
                    id="company" 
                    placeholder="Acme Inc." 
                    className="bg-slate-700 border-slate-600 placeholder:text-slate-400 text-white focus:border-compliance-400 focus-visible:ring-compliance-400" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-300">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="How can we help you?" 
                    rows={5} 
                    className="bg-slate-700 border-slate-600 placeholder:text-slate-400 text-white focus:border-compliance-400 focus-visible:ring-compliance-400" 
                  />
                </div>
                
                <Button 
                  className="w-full group bg-gradient-to-r from-compliance-600 to-innovation-600 hover:from-compliance-500 hover:to-innovation-500 transition-all duration-300" 
                  type="submit"
                >
                  Send Message
                  <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </PageTemplate>
    </div>
  );
};

export default Contact;
