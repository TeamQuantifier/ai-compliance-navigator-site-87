
import PageTemplate from '@/components/PageTemplate';
import { Building2, Award, Users, BarChart4, Globe, GraduationCap, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const About = () => {
  return (
    <PageTemplate
      title="About Us"
      description="Learn about our mission to simplify compliance with AI-powered solutions."
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-compliance-700 to-innovation-600 bg-clip-text text-transparent">
            Quantifier: The Autonomous Compliance Officer for the AI Era
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto">
            Transforming how organizations manage compliance with an always-on, AI-native platform
          </p>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2 space-y-6">
            <p className="text-lg text-slate-700">
              Quantifier is transforming how organizations manage compliance — with an always-on, AI-native platform that continuously monitors, enforces, and drives adherence to regulations like SOC, ISO, and GDPR. Acting as your virtual compliance officer, Quantifier automates data collection, task management, and oversight, ensuring continuous audit readiness and confidence in an ever-evolving regulatory landscape.
            </p>
            
            <p className="text-lg text-slate-700">
              Over the past three years, we've supported more than 250 organizations across Europe, the US, and Latin America — from global industry leaders in manufacturing, pharma, and professional services to fast-growing startups. Our network includes 50+ partners, including major banks, consulting firms, and NGOs.
            </p>
            
            <p className="text-lg text-slate-700">
              We're proud to be recognized by top media outlets and to have received multiple awards for innovation and impact.
            </p>
            
            <p className="text-lg text-slate-700">
              Our team includes some of the best engineers, lawyers, and advisors — many holding or pursuing PhDs — united by a mission to build the AI infrastructure powering the future of global compliance.
            </p>
            
            <div className="pt-4">
              <Button size="lg" className="mr-4">
                Meet Our Team
              </Button>
              <Button variant="outline" size="lg">
                Our Values
              </Button>
            </div>
          </div>
          
          <div>
            <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Key Highlights</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <Building2 className="h-6 w-6 text-compliance-600 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">250+ Organizations</span>
                    <p className="text-sm text-slate-600">Served across multiple industries</p>
                  </div>
                </li>
                <li className="flex">
                  <Globe className="h-6 w-6 text-compliance-600 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Global Reach</span>
                    <p className="text-sm text-slate-600">Operating in Europe, US, and Latin America</p>
                  </div>
                </li>
                <li className="flex">
                  <Users className="h-6 w-6 text-compliance-600 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">50+ Partners</span>
                    <p className="text-sm text-slate-600">Including banks, consulting firms, and NGOs</p>
                  </div>
                </li>
                <li className="flex">
                  <Award className="h-6 w-6 text-compliance-600 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Award Winning</span>
                    <p className="text-sm text-slate-600">Recognized for innovation and impact</p>
                  </div>
                </li>
                <li className="flex">
                  <GraduationCap className="h-6 w-6 text-compliance-600 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Expert Team</span>
                    <p className="text-sm text-slate-600">Engineers, lawyers, and PhDs</p>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
        </div>
        
        {/* Awards Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Awards</h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              We're honored to be recognized for our innovation and impact in the compliance industry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
              <div className="flex justify-center items-center h-24 mb-4">
                <img 
                  src="/lovable-uploads/1790cc93-5eb8-428e-a56c-6ed0adc47925.png" 
                  alt="Rzeczpospolita Logo" 
                  className="h-16 object-contain"
                  style={{ objectPosition: '0 0', objectFit: 'contain', clipPath: 'inset(0 75% 0 0)' }}
                />
              </div>
              <h3 className="font-semibold mb-2 text-slate-900">Main Award the Eagle of Innovation</h3>
              <p className="text-sm text-slate-600">
                For "Solution for the Common Good" awarded by the leading Polish newspaper
              </p>
            </div>
            
            <div className="text-center bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
              <div className="flex justify-center items-center h-24 mb-4">
                <img 
                  src="/lovable-uploads/1790cc93-5eb8-428e-a56c-6ed0adc47925.png" 
                  alt="ING Logo" 
                  className="h-16 object-contain"
                  style={{ objectPosition: '33.33% 0', objectFit: 'contain', clipPath: 'inset(0 25% 0 50%)' }}
                />
              </div>
              <h3 className="font-semibold mb-2 text-slate-900">ING Grant Program Finalist</h3>
              <p className="text-sm text-slate-600">
                Final of the first edition of the "ING Grant Program" Competition for a solution to support the environmental revolution
              </p>
            </div>
            
            <div className="text-center bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
              <div className="flex justify-center items-center h-24 mb-4">
                <img 
                  src="/lovable-uploads/1790cc93-5eb8-428e-a56c-6ed0adc47925.png" 
                  alt="WSA Logo" 
                  className="h-16 object-contain"
                  style={{ objectPosition: '66.66% 0', objectFit: 'contain', clipPath: 'inset(0 0 0 50%)' }}
                />
              </div>
              <h3 className="font-semibold mb-2 text-slate-900">World Summit Awards</h3>
              <p className="text-sm text-slate-600">
                Polish representative in the 2022 Innovation Competition in the "Environment and Green Energy" category
              </p>
            </div>
            
            <div className="text-center bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
              <div className="flex justify-center items-center h-24 mb-4">
                <img 
                  src="/lovable-uploads/1790cc93-5eb8-428e-a56c-6ed0adc47925.png" 
                  alt="Brief Magazine Logo" 
                  className="h-16 object-contain"
                  style={{ objectPosition: '100% 0', objectFit: 'contain', clipPath: 'inset(0 0 0 75%)' }}
                />
              </div>
              <h3 className="font-semibold mb-2 text-slate-900">50 Most Creative Business</h3>
              <p className="text-sm text-slate-600">
                Laureate of the 50 Most Creative Business in Brief magazine in 2022
              </p>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="bg-slate-50 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Our Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-compliance-600 mb-2">250+</div>
              <p className="text-slate-700">Organizations Supported</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-compliance-600 mb-2">3+</div>
              <p className="text-slate-700">Years of Excellence</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-compliance-600 mb-2">50+</div>
              <p className="text-slate-700">Partner Network</p>
            </div>
          </div>
        </div>
        
        {/* Mission Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Our Mission</h2>
          <p className="text-lg text-slate-700 mb-8">
            At Quantifier, we're on a mission to build the AI infrastructure that powers the future of global compliance. We believe that with the right technology, organizations can transform compliance from a burden into a competitive advantage.
          </p>
          
          <div className="bg-white rounded-xl border border-slate-200 p-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">How We're Different</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex">
                <BarChart4 className="h-6 w-6 text-compliance-600 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">AI-Native Platform</p>
                  <p className="text-slate-600">Built from the ground up with AI at its core, not as an afterthought</p>
                </div>
              </div>
              
              <div className="flex">
                <Users className="h-6 w-6 text-compliance-600 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Interdisciplinary Expertise</p>
                  <p className="text-slate-600">Engineers, lawyers, and domain experts working in unison</p>
                </div>
              </div>
              
              <div className="flex">
                <Award className="h-6 w-6 text-compliance-600 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Continuous Innovation</p>
                  <p className="text-slate-600">Constantly evolving our solutions for the changing regulatory landscape</p>
                </div>
              </div>
              
              <div className="flex">
                <Globe className="h-6 w-6 text-compliance-600 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Global Perspective</p>
                  <p className="text-slate-600">Solutions designed for international compliance requirements</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-compliance-700 to-innovation-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to transform your compliance approach?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Join the 250+ organizations already benefiting from Quantifier's autonomous compliance platform.
          </p>
          <Button variant="secondary" size="lg">
            Request a Demo
          </Button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default About;
