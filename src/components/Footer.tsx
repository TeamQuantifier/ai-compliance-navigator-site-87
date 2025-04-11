
import { Link } from 'react-router-dom';
import { Shield, Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-primary mr-2" />
              <span className="text-xl font-bold bg-gradient-to-r from-compliance-700 to-innovation-600 bg-clip-text text-transparent">
                ComplianceAI
              </span>
            </Link>
            
            <p className="text-slate-600 mb-6 max-w-md">
              Empowering organizations to navigate the complex world of compliance with intelligent AI-driven solutions.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-slate-500 hover:text-compliance-700 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-compliance-700 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-compliance-700 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-compliance-700 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/product/features" className="text-slate-600 hover:text-primary transition-colors">Features</Link></li>
              <li><Link to="/product/ai-compliance-officer" className="text-slate-600 hover:text-primary transition-colors">AI Compliance Officer</Link></li>
              <li><Link to="/product/analytics-dashboards" className="text-slate-600 hover:text-primary transition-colors">Analytics & Dashboards</Link></li>
              <li><Link to="/product/risk-assessment" className="text-slate-600 hover:text-primary transition-colors">Risk Assessment</Link></li>
              <li><Link to="/product/api-integrations" className="text-slate-600 hover:text-primary transition-colors">API Integrations</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/resources" className="text-slate-600 hover:text-primary transition-colors">Resource Center</Link></li>
              <li><Link to="/resources/blog" className="text-slate-600 hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/resources/documentation" className="text-slate-600 hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link to="/resources/webinars" className="text-slate-600 hover:text-primary transition-colors">Webinars</Link></li>
              <li><Link to="/contact" className="text-slate-600 hover:text-primary transition-colors">Contact Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-slate-600 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/about/history" className="text-slate-600 hover:text-primary transition-colors">Our History</Link></li>
              <li><Link to="/about/press" className="text-slate-600 hover:text-primary transition-colors">Press</Link></li>
              <li><Link to="/partners" className="text-slate-600 hover:text-primary transition-colors">Partners</Link></li>
              <li><Link to="/contact" className="text-slate-600 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-200 mb-12">
          <h3 className="font-semibold text-slate-900 mb-2">Subscribe to our newsletter</h3>
          <p className="text-slate-600 mb-4">Stay updated with the latest compliance insights and product updates.</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1" 
            />
            <Button>Subscribe</Button>
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-slate-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ComplianceAI. All rights reserved.
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
    </footer>
  );
};

export default Footer;
