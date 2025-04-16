
import PageTemplate from '@/components/PageTemplate';
import { 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  FileCheck, 
  Clock, 
  BarChart4, 
  Globe, 
  Lock, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

const InformationSecurity = () => {
  return (
    <PageTemplate
      title="Information Security Frameworks"
      description="Protect your information assets with standards like ISO 27001, ISO 9001, and DORA."
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-3/5">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Information Security Compliance That Drives Trust
              </h2>
              <p className="text-xl opacity-90 mb-6">
                Achieve ISO 27001, ISO 9001 and DORA compliance with ease—automatically.
              </p>
              <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90">
                Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="md:w-2/5">
              <img 
                src="/mockups/info-security-dashboard.png" 
                alt="Information Security Dashboard" 
                className="rounded-lg shadow-lg border border-white/20 w-full"
              />
            </div>
          </div>
        </section>

        {/* Framework Tabs */}
        <section className="mb-16">
          <Tabs defaultValue="iso27001" className="w-full">
            <TabsList className="w-full flex justify-between bg-[#E5DEFF]/70 p-1 rounded-lg mb-8">
              <TabsTrigger value="iso27001" className="flex-1 py-3 data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">
                ISO 27001
              </TabsTrigger>
              <TabsTrigger value="iso9001" className="flex-1 py-3 data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">
                ISO 9001
              </TabsTrigger>
              <TabsTrigger value="dora" className="flex-1 py-3 data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">
                DORA
              </TabsTrigger>
            </TabsList>
            
            {/* ISO 27001 Content */}
            <TabsContent value="iso27001" className="mt-4">
              <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
                <div className="md:w-1/2">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#1A1F2C]">
                    ISO 27001: Protect Your Information, Build Trust
                  </h3>
                  <p className="text-lg text-slate-700 mb-6">
                    ISO 27001 is the gold standard for information security management. Quantifier automates every step of your ISO 27001 journey—from establishing policies to ongoing audits—so you can focus on what truly matters: securing your business.
                  </p>
                  
                  <h4 className="font-semibold text-lg mb-3">You get:</h4>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                      <span><span className="font-medium">Automated Risk Management:</span> Identify, assess, and mitigate risks in real-time</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                      <span><span className="font-medium">Continuous Compliance:</span> Stay prepared for audits and inspections—no more last-minute scrambling</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                      <span><span className="font-medium">Real-Time Evidence Collection:</span> Automatically collect the necessary documentation for ISO 27001 compliance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                      <span><span className="font-medium">Policy Enforcement:</span> Agents ensure policies are adhered to by your team members, proactively closing gaps</span>
                    </li>
                  </ul>

                  <Button asChild>
                    <Link to="/frameworks/information-security/iso-27001">
                      Learn More About ISO 27001 <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src="/mockups/iso27001-dashboard.png" 
                    alt="ISO 27001 Security Dashboard" 
                    className="rounded-lg shadow-lg border border-[#E5DEFF] w-full"
                  />
                </div>
              </div>
            </TabsContent>
            
            {/* ISO 9001 Content */}
            <TabsContent value="iso9001" className="mt-4">
              <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
                <div className="md:w-1/2">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#1A1F2C]">
                    ISO 9001: Streamline Quality Management
                  </h3>
                  <p className="text-lg text-slate-700 mb-6">
                    ISO 9001 is the benchmark for quality management systems (QMS). Quantifier makes achieving and maintaining ISO 9001 compliance effortless by continuously driving quality management actions, tracking key metrics, and ensuring all necessary documentation is in place.
                  </p>
                  
                  <h4 className="font-semibold text-lg mb-3">You get:</h4>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                      <span><span className="font-medium">Automated Task Assignment:</span> Ensure quality management activities are performed consistently and on schedule</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                      <span><span className="font-medium">Audit-Ready Reporting:</span> Gather the required quality evidence without lifting a finger</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                      <span><span className="font-medium">Proactive Quality Control:</span> Identify quality gaps and resolve them before they escalate</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                      <span><span className="font-medium">Cross-Functional Alignment:</span> Involve relevant teams—IT, operations, HR, and legal—without manual oversight</span>
                    </li>
                  </ul>

                  <Button asChild>
                    <Link to="/frameworks/information-security/iso-9001">
                      Learn More About ISO 9001 <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src="/mockups/iso9001-quality-dashboard.png" 
                    alt="ISO 9001 Quality Management Dashboard" 
                    className="rounded-lg shadow-lg border border-[#E5DEFF] w-full"
                  />
                </div>
              </div>
            </TabsContent>
            
            {/* DORA Content */}
            <TabsContent value="dora" className="mt-4">
              <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
                <div className="md:w-1/2">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#1A1F2C]">
                    DORA: Ensure Digital Operational Resilience
                  </h3>
                  <p className="text-lg text-slate-700 mb-6">
                    The Digital Operational Resilience Act (DORA) ensures that financial institutions in the EU can withstand operational disruptions. Quantifier's platform automatically monitors, reports, and enforces resilience measures, ensuring your organization meets the stringent requirements of DORA.
                  </p>
                  
                  <h4 className="font-semibold text-lg mb-3">You get:</h4>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                      <span><span className="font-medium">Automated Risk Monitoring:</span> Continuously monitor and manage risks to your digital operations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                      <span><span className="font-medium">Incident Response Planning:</span> AI agents help build and execute comprehensive plans for operational disruptions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                      <span><span className="font-medium">Third-Party Compliance Management:</span> Ensure your third-party suppliers comply with DORA requirements</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#9b87f5] mt-1 mr-3 flex-shrink-0" />
                      <span><span className="font-medium">Real-Time Risk & Incident Reporting:</span> Track and mitigate risks before they affect your operations</span>
                    </li>
                  </ul>

                  <Button asChild>
                    <Link to="/frameworks/information-security/dora">
                      Learn More About DORA <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src="/mockups/dora-compliance-dashboard.png" 
                    alt="DORA Compliance Dashboard" 
                    className="rounded-lg shadow-lg border border-[#E5DEFF] w-full"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Why Choose Quantifier Section */}
        <section className="mb-16 bg-[#E5DEFF]/40 p-8 rounded-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#1A1F2C]">
            Why Choose Quantifier for Information Security & Quality Compliance?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <Shield className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Autonomous Compliance</h3>
                    <p className="text-slate-600">Forget manual tracking. Quantifier's AI agents continuously ensure you're meeting ISO 27001 and ISO 9001, DORA standards.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <FileCheck className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Seamless Integration</h3>
                    <p className="text-slate-600">From policies to procedures, integrate your information security and quality management processes across your organization—automatically.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <Clock className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Real-Time, Zero Delay</h3>
                    <p className="text-slate-600">Achieve continuous compliance with real-time risk assessments and evidence collection.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <Globe className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Global Standardization</h3>
                    <p className="text-slate-600">Manage compliance across multiple geographies and frameworks, all in one platform.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <Lock className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Data Security First</h3>
                    <p className="text-slate-600">With built-in security, your organization's data is always protected throughout the compliance process.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-[#9b87f5]/20 bg-white hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-[#9b87f5]/10 p-2 mr-4">
                    <BarChart4 className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Intelligent Reporting</h3>
                    <p className="text-slate-600">Get comprehensive insights with AI-generated reports that highlight risks and compliance status.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Platform Screenshot Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-[#E5DEFF] to-[#F1F0FB] p-6 rounded-xl">
            <div className="flex flex-col items-center text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#1A1F2C]">
                See the Quantifier Platform in Action
              </h2>
              <p className="text-lg text-slate-700 max-w-2xl">
                Our intuitive dashboard gives you complete visibility into your information security compliance status.
              </p>
            </div>
            
            <div className="relative">
              <img 
                src="/mockups/quantifier-platform-dashboard.png" 
                alt="Quantifier Platform Dashboard" 
                className="rounded-lg shadow-lg border border-white w-full object-cover max-h-[500px]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" className="bg-[#F97316] hover:bg-[#F97316]/90">
                  Watch Demo Video
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get Ready for Your Next Audit—Faster and Smarter
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Join organizations that trust Quantifier to automate their information security compliance journey.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-[#7E69AB] hover:bg-white/90 px-8">
                  Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Explore Plans
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default InformationSecurity;
