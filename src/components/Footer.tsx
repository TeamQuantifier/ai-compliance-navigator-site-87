import { Link } from 'react-router-dom';
import { Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return <footer className="bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <img src="/lovable-uploads/dc230f24-69a0-48e6-952c-3811d16e1833.png" alt="Quantifier.ai Logo" className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold bg-gradient-to-r from-compliance-700 to-innovation-600 bg-clip-text text-transparent">
                Quantifier.ai
              </span>
            </Link>
            
            <p className="text-slate-600 mb-6 max-w-md">
              Quantifier is redefining how companies approach compliance — with an always-on, autonomous AI platform that monitors, enforces, and drives regulatory actions across the enterprise.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-slate-500 hover:text-compliance-700 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:contact@quantifier.ai" className="text-slate-500 hover:text-compliance-700 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>

            <div className="mt-5 space-y-2 text-sm text-slate-600">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@quantifier.ai</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>415-799-8206</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                <div>
                  <div>USA: (+1) 415-799-8206</div>
                  <div>447 Sutter St Ste 405 PMB 137, San Francisco, CA 94108</div>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                <div>
                  <div>Europe: (+48) 698 759 206</div>
                  <div>Warsaw: Rondo Daszynskiego 1, Warsaw</div>
                  <div>Lublin: Głowackiego 3/5/1</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-200 mb-12">
          <h3 className="font-semibold text-slate-900 mb-2">Subscribe to our newsletter</h3>
          <p className="text-slate-600 mb-4">Stay updated with the latest compliance insights and product updates.</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input type="email" placeholder="Enter your email" className="flex-1" />
            <Button>Subscribe</Button>
          </div>
          <p className="text-xs text-slate-500 mt-3">You can unsubscribe from these communications at any time. For more information on how to unsubscribe, our privacy practices, and how we are committed to protecting and respecting your privacy, please review our Privacy Policy. By clicking "Subscribe" above, you consent to allow Quantifier.ai to store and process the personal information submitted above to provide you the content requested.</p>
        </div>
        
        <Separator className="mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-slate-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Quantifier.ai. All rights reserved.
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <Link to="/legal/privacy" className="text-slate-500 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/legal/terms" className="text-slate-500 hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/legal/cookies" className="text-slate-500 hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
