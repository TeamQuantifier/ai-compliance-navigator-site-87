
import { useState } from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Scan, RefreshCw, QrCode, BarChart3, Shield, Leaf, Clock, CheckCircle, Zap, Recycle, Globe, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import AiComplianceDashboard from '@/components/mockups/AiComplianceDashboard';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const ProductLevel = () => {
  const [activeTab, setActiveTab] = useState("dpp");

  const FeatureItem = ({ icon: Icon, title, children }) => (
    <div className="flex gap-3 mb-5">
      <div className="flex-shrink-0 mt-1">
        <div className="bg-green-100 p-2 rounded-full">
          <Icon className="h-5 w-5 text-green-600" />
        </div>
      </div>
      <div>
        <h4 className="font-medium text-slate-800 mb-1">{title}</h4>
        <p className="text-slate-600">{children}</p>
      </div>
    </div>
  );

  // Data for Digital Product Passport visualization
  const dppCompletionData = [
    { name: 'Materials', value: 85 },
    { name: 'Manufacturing', value: 92 },
    { name: 'Certifications', value: 78 },
    { name: 'End of Life', value: 65 }
  ];

  const DPP_COLORS = ['#22c55e', '#16a34a', '#15803d', '#166534'];

  // Data for LCA visualization
  const lcaImpactData = [
    { phase: 'Raw Materials', carbon: 38, water: 45, waste: 25 },
    { phase: 'Manufacturing', carbon: 25, water: 20, waste: 30 },
    { phase: 'Distribution', carbon: 15, water: 10, waste: 12 },
    { phase: 'Usage', carbon: 12, water: 15, waste: 8 },
    { phase: 'End of Life', carbon: 10, water: 10, waste: 25 }
  ];

  return (
    <PageTemplate
      title="Product-Level Compliance, Powered by AI"
      description="Build sustainable, transparent products from the ground up. Quantifier brings intelligence and automation to your product compliance—so you can meet regulatory demands and customer expectations with ease."
    >
      <div className="max-w-6xl mx-auto">
        {/* Framework Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
            <TabsTrigger value="dpp" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
              Digital Product Passport
            </TabsTrigger>
            <TabsTrigger value="lca" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
              Life Cycle Assessment
            </TabsTrigger>
          </TabsList>

          {/* DPP Tab Content */}
          <TabsContent value="dpp" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  Digital Product Passport (DPP): Future-Proof Your Products
                </h2>
                <p className="text-slate-600 mb-6">
                  DPP is the new standard for transparency and circularity. Quantifier helps you generate, manage, and update digital product passports automatically—ensuring compliance with EU regulations and positioning your brand for the next generation of sustainable markets.
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">You get:</h3>
                  <FeatureItem icon={FileText} title="AI-generated DPPs">
                    Automatically aligned with EU Ecodesign Regulation (ESPR)
                  </FeatureItem>
                  <FeatureItem icon={Globe} title="Real-time data collection">
                    Gather information across your entire supply chain
                  </FeatureItem>
                  <FeatureItem icon={RefreshCw} title="Automated updates">
                    When inputs, materials, or regulations change
                  </FeatureItem>
                  <FeatureItem icon={QrCode} title="Easy integration">
                    With QR codes, NFC, or third-party platforms
                  </FeatureItem>
                  <FeatureItem icon={CheckCircle} title="Ready-to-share passports">
                    That meet industry-specific requirements
                  </FeatureItem>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-100">
                <h3 className="text-lg font-semibold mb-4 text-slate-800 text-center">Digital Product Passport Completion</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dppCompletionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                        labelLine={false}
                      >
                        {dppCompletionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={DPP_COLORS[index % DPP_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 bg-white p-4 rounded-lg border border-green-100">
                  <h4 className="text-sm font-medium text-green-700 mb-2">Quantifier's AI Generated Insights:</h4>
                  <p className="text-xs text-slate-600">Your product passport is 82% complete. Add more end-of-life recycling details to improve compliance with upcoming EU regulations.</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* LCA Tab Content */}
          <TabsContent value="lca" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  LCA (Life Cycle Assessment): Understand and Optimize Environmental Impact
                </h2>
                <p className="text-slate-600 mb-6">
                  Quantifier transforms life cycle assessments from a one-off burden into a continuous, intelligent process. Automate data gathering, track changes over time, and reduce your environmental footprint with clarity.
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">You get:</h3>
                  <FeatureItem icon={Leaf} title="Step-by-step, AI-guided LCA workflows">
                    Based on ISO 14040/44 standards
                  </FeatureItem>
                  <FeatureItem icon={Globe} title="Integrated supplier data collection">
                    And emissions calculations
                  </FeatureItem>
                  <FeatureItem icon={BarChart3} title="Material libraries and benchmarking tools">
                    Built in for easy comparison
                  </FeatureItem>
                  <FeatureItem icon={FileText} title="Exportable, audit-ready reports">
                    For internal and external use
                  </FeatureItem>
                  <FeatureItem icon={Recycle} title="Full transparency">
                    From raw material to end-of-life
                  </FeatureItem>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-lg border border-emerald-100">
                <h3 className="text-lg font-semibold mb-4 text-slate-800 text-center">Life Cycle Impact Assessment</h3>
                <div className="h-64">
                  <ChartContainer
                    config={{
                      carbon: { 
                        theme: { 
                          light: '#15803d',
                          dark: '#166534'
                        } 
                      },
                      water: { 
                        theme: { 
                          light: '#0ea5e9',
                          dark: '#0284c7'
                        } 
                      },
                      waste: { 
                        theme: { 
                          light: '#f97316',
                          dark: '#ea580c'
                        } 
                      }
                    }}
                  >
                    <BarChart 
                      data={lcaImpactData} 
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      barGap={0}
                      barCategoryGap="15%"
                    >
                      <XAxis dataKey="phase" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="carbon" name="Carbon Impact" barSize={20} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="water" name="Water Usage" barSize={20} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="waste" name="Waste Production" barSize={20} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
                <div className="mt-4 bg-white p-4 rounded-lg border border-emerald-100">
                  <h4 className="text-sm font-medium text-emerald-700 mb-2">Quantifier's AI Recommendation:</h4>
                  <p className="text-xs text-slate-600">Focus on raw material sourcing to reduce your largest environmental impacts. Consider alternative suppliers with documented sustainability practices.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Why Choose Quantifier Section */}
        <div className="my-16 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
          <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
            Why Quantifier for Product-Level Compliance?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 border-green-100 bg-white/80">
              <Package className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">AI-Powered Data Collection & Reporting</h3>
              <p className="text-slate-600">Eliminate bottlenecks by letting autonomous agents gather and verify product data.</p>
            </Card>
            
            <Card className="p-6 border-green-100 bg-white/80">
              <RefreshCw className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">Always Up to Date</h3>
              <p className="text-slate-600">Your passports and LCAs evolve in real time as materials, suppliers, or rules change.</p>
            </Card>
            
            <Card className="p-6 border-green-100 bg-white/80">
              <Recycle className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">Designed for Circularity</h3>
              <p className="text-slate-600">From recyclability to emissions, Quantifier helps you build better products—and prove it.</p>
            </Card>
            
            <Card className="p-6 border-green-100 bg-white/80">
              <Zap className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">Fast Time-to-Compliance</h3>
              <p className="text-slate-600">Launch new products in new markets without worrying about regulatory delays.</p>
            </Card>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold mb-3 text-slate-800">
            Make Your Products Compliant—and Competitive
          </h2>
          <p className="text-lg text-slate-700 mb-6 max-w-3xl mx-auto">
            Smarter compliance. Stronger transparency. Lower impact.
            Quantifier gives your products the intelligence they need to lead.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
              Talk to Our Product Compliance Expert
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default ProductLevel;
