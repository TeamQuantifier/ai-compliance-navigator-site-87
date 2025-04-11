
import { ArrowRight, Shield, CheckCircle, MessageSquare, Zap, Slack, Eye, Clock, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative pt-20 pb-10 lg:pt-32 lg:pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 to-compliance-950/80 -z-10"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-innovation-700 rounded-full blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-compliance-800 rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Main Header - Full Width */}
          <h1 className="text-4xl mb-8 text-white text-center leading-tight font-semibold md:text-7xl">Quantifier.ai
The AI-native compliance layer for organizations
          </h1>
          
          {/* Subheader - Full Width */}
          <h2 className="text-xl md:text-2xl text-slate-300 mb-12 text-center leading-relaxed">Your right-hand AI Agent Compliance Officer that manages projects, collects data across your organization, and showcases results—significantly automating the entire compliance process</h2>
          
          {/* ChatGPT-like input */}
          <div className="max-w-3xl mx-auto mb-16 relative">
            <div className="bg-slate-800/80 shadow-xl shadow-slate-900/30 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center">
                <Input className="flex-grow pr-20 pl-12 py-4 text-base rounded-lg bg-slate-700/50 text-white border-slate-600 placeholder:text-slate-400" placeholder="Let's chat about type of compliance you need..." />
                <MessageSquare className="absolute left-8 text-slate-400" size={20} />
                <Button className="absolute right-8 bg-innovation-600 hover:bg-innovation-700" size="sm">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Framework icons */}
          <div className="text-center mb-16">
            <h3 className="text-lg font-medium text-white mb-6">
              Supporting key compliance frameworks
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-compliance-800/70 flex items-center justify-center mb-2 shadow-lg shadow-compliance-900/20">
                  <Shield className="h-8 w-8 text-compliance-300" />
                </div>
                <span className="text-sm font-medium text-slate-300">ISO 27001</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-innovation-800/70 flex items-center justify-center mb-2 shadow-lg shadow-innovation-900/20">
                  <Shield className="h-8 w-8 text-innovation-300" />
                </div>
                <span className="text-sm font-medium text-slate-300">SOC</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-compliance-800/70 flex items-center justify-center mb-2 shadow-lg shadow-compliance-900/20">
                  <Shield className="h-8 w-8 text-compliance-300" />
                </div>
                <span className="text-sm font-medium text-slate-300">NIS</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-innovation-800/70 flex items-center justify-center mb-2 shadow-lg shadow-innovation-900/20">
                  <Shield className="h-8 w-8 text-innovation-300" />
                </div>
                <span className="text-sm font-medium text-slate-300">ESG</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-compliance-800/70 flex items-center justify-center mb-2 shadow-lg shadow-compliance-900/20">
                  <Shield className="h-8 w-8 text-compliance-300" />
                </div>
                <span className="text-sm font-medium text-slate-300">CCPA</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-innovation-800/70 flex items-center justify-center mb-2 shadow-lg shadow-innovation-900/20">
                  <Shield className="h-8 w-8 text-innovation-300" />
                </div>
                <span className="text-sm font-medium text-slate-300">Others</span>
              </div>
            </div>
          </div>
          
          {/* Credentials Section */}
          <div className="mb-16 py-12 px-6 bg-slate-900/80 rounded-xl border border-slate-700 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
              Compliance, powered by insiders.
            </h3>
            <p className="text-lg text-slate-300 text-center mb-8 max-w-3xl mx-auto">
              We combine cutting-edge tech with real compliance expertise.
              Join 250+ companies—from startups to multinationals—who trust us to simplify their compliance.
            </p>
            
            {/* Placeholder for logos */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              {/* This would be replaced with actual client logos */}
              <div className="w-32 h-12 bg-slate-800/70 rounded-md flex items-center justify-center">
                <span className="text-xs text-slate-500">LOGO</span>
              </div>
              <div className="w-32 h-12 bg-slate-800/70 rounded-md flex items-center justify-center">
                <span className="text-xs text-slate-500">LOGO</span>
              </div>
              <div className="w-32 h-12 bg-slate-800/70 rounded-md flex items-center justify-center">
                <span className="text-xs text-slate-500">LOGO</span>
              </div>
              <div className="w-32 h-12 bg-slate-800/70 rounded-md flex items-center justify-center">
                <span className="text-xs text-slate-500">LOGO</span>
              </div>
            </div>
            
            {/* CTA for Contact */}
            <div className="text-center">
              <Link to="/contact">
                <Button className="bg-gradient-to-r from-compliance-600 to-innovation-600 hover:from-compliance-700 hover:to-innovation-700 text-white px-8 py-3 text-lg shadow-lg shadow-slate-900/30" size="lg">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Why Teams Trust Us Section */}
          <div className="mb-16">
            <h4 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
              Why Teams Trust Us with Compliance
            </h4>
            <p className="text-lg text-slate-300 text-center mb-12 max-w-3xl mx-auto italic">
              Compliance used to be time-consuming. Now, it's automatic.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Item 1 */}
              <div className="bg-slate-800/70 p-8 rounded-xl border border-slate-700 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="w-14 h-14 rounded-full bg-compliance-800/70 flex items-center justify-center mb-6 shadow-md">
                  <CheckCircle className="h-7 w-7 text-compliance-300" />
                </div>
                <h5 className="text-xl font-semibold text-white mb-4">Peace of Mind, Powered by Automation</h5>
                <p className="text-slate-300">
                  No more chasing employees or endless follow-ups. Our AI-driven platform ensures tasks get done—on time, every time—without manual reminders.
                </p>
              </div>
              
              {/* Item 2 */}
              <div className="bg-slate-800/70 p-8 rounded-xl border border-slate-700 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="w-14 h-14 rounded-full bg-innovation-800/70 flex items-center justify-center mb-6 shadow-md">
                  <Slack className="h-7 w-7 text-innovation-300" />
                </div>
                <h5 className="text-xl font-semibold text-white mb-4">Say Goodbye to Manual Oversight</h5>
                <p className="text-slate-300">
                  Our smart agents connect with your team directly via Slack and email, handling training, data collection, and policy sign-offs—so you don't have to.
                </p>
              </div>
              
              {/* Item 3 */}
              <div className="bg-slate-800/70 p-8 rounded-xl border border-slate-700 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="w-14 h-14 rounded-full bg-compliance-800/70 flex items-center justify-center mb-6 shadow-md">
                  <Eye className="h-7 w-7 text-compliance-300" />
                </div>
                <h5 className="text-xl font-semibold text-white mb-4">Stay Ahead with Real-Time Visibility</h5>
                <p className="text-slate-300">
                  Instantly see what's done, what's pending, and where the risks are. With continuous insights, you're always a step ahead of non-compliance.
                </p>
              </div>
              
              {/* Item 4 */}
              <div className="bg-slate-800/70 p-8 rounded-xl border border-slate-700 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="w-14 h-14 rounded-full bg-innovation-800/70 flex items-center justify-center mb-6 shadow-md">
                  <Clock className="h-7 w-7 text-innovation-300" />
                </div>
                <h5 className="text-xl font-semibold text-white mb-4">Launch in Minutes, Not Months</h5>
                <p className="text-slate-300">
                  No complex onboarding. No expensive consultants. Just a fast, seamless rollout that gets your team up and running—today.
                </p>
              </div>
              
              {/* Item 5 - Full Width */}
              <div className="md:col-span-2 bg-gradient-to-r from-compliance-900/90 to-innovation-900/90 p-8 rounded-xl border border-slate-700 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="w-14 h-14 rounded-full bg-compliance-800/70 flex items-center justify-center mb-6 shadow-md">
                  <Layers className="h-7 w-7 text-compliance-300" />
                </div>
                <h5 className="text-xl font-semibold text-white mb-4">Everything You Need. One Platform.</h5>
                <p className="text-slate-300">
                  Manage SOC 2, ISO 27001, GDPR, and more—all in one place. Fully automated. Fully integrated. Fully under control.
                </p>
              </div>
            </div>
          </div>
          
          {/* Call-to-action buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-gradient-to-r from-compliance-600 to-innovation-600 hover:from-compliance-700 hover:to-innovation-700 text-white px-6 py-2.5 shadow-lg shadow-slate-900/20" size="lg">
              Request Demo
            </Button>
            <Button variant="outline" size="lg" className="border-slate-600 group text-white bg-slate-800/70 hover:bg-slate-700/70">
              Explore Features
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
