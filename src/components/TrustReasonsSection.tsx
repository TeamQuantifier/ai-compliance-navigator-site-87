
import { 
  Clock, 
  Bot, 
  LineChart, 
  Rocket, 
  Database,
  CheckCircle,
  Shield,
  Award,
  Star,
  BarChart3,
  Zap,
  BrainCircuit
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";

interface TrustReasonCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const TrustReasonCard = ({ icon, title, description, delay }: TrustReasonCardProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 transform ${
        inView 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay * 150}ms` }}
    >
      <Card className="p-6 border border-slate-200 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 h-full hover:shadow-lg hover:shadow-innovation-900/20 hover:-translate-y-1">
        <div className="mb-4 text-innovation-400 animate-pulse">{icon}</div>
        <h5 className="text-xl font-semibold mb-3 text-white">{title}</h5>
        <p className="text-slate-300">{description}</p>
      </Card>
    </div>
  );
};

const TrustReasonsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const trustReasons = [
    {
      icon: <Clock className="h-10 w-10" />,
      title: "Peace of Mind, Powered by Automation",
      description: "No more chasing employees or endless follow-ups. Our AI-driven platform ensures tasks get done—on time, every time—without manual reminders."
    },
    {
      icon: <Bot className="h-10 w-10" />,
      title: "Say Goodbye to Manual Oversight",
      description: "Our smart agents connect with your team directly via Slack and email, handling training, data collection, and policy sign-offs—so you don't have to."
    },
    {
      icon: <LineChart className="h-10 w-10" />,
      title: "Stay Ahead with Real-Time Visibility",
      description: "Instantly see what's done, what's pending, and where the risks are. With continuous insights, you're always a step ahead of non-compliance."
    },
    {
      icon: <Rocket className="h-10 w-10" />,
      title: "Launch in Minutes, Not Months",
      description: "No complex onboarding. No expensive consultants. Just a fast, seamless rollout that gets your team up and running—today."
    },
    {
      icon: <Database className="h-10 w-10" />,
      title: "Everything You Need. One Platform.",
      description: "Manage SOC 2, ISO 27001, GDPR, and more—all in one place. Fully automated. Fully integrated. Fully under control."
    }
  ];

  // Using useInView for the credentials section
  const { ref: credentialsRef, inView: credentialsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Using useInView for the screenshots section
  const { ref: screenshotsRef, inView: screenshotsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
        <div className="container mx-auto px-4">
          <div 
            ref={ref} 
            className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h4 className="text-2xl md:text-3xl font-bold mb-4 text-white relative">
              Why Teams Trust Us with Compliance
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-compliance-600 to-innovation-600"></span>
            </h4>
            <p className="text-xl text-slate-300 mt-6">
              Compliance used to be time-consuming. Now, it's automatic.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trustReasons.map((reason, index) => (
              <TrustReasonCard
                key={index}
                icon={reason.icon}
                title={reason.title}
                description={reason.description}
                delay={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Platform Screenshots Section */}
      <section className="py-16 bg-gradient-to-b from-slate-800 to-slate-900 overflow-hidden">
        <div className="container mx-auto px-4">
          <div 
            ref={screenshotsRef} 
            className={`transition-all duration-700 transform ${
              screenshotsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h4 className="text-3xl font-bold mb-4 text-white relative">
                AI-Powered Compliance in Action
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-compliance-600 to-innovation-600"></span>
              </h4>
              <p className="text-xl text-slate-300 mt-6">
                See how our platform transforms compliance from a burden into a competitive advantage
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* AI Analytics Dashboard */}
              <div className={`transition-all duration-700 delay-[150ms] transform ${
                screenshotsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
                <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 shadow-xl hover:shadow-innovation-600/20 hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-700">
                    <div className="flex items-center">
                      <BarChart3 className="h-5 w-5 text-innovation-400 mr-2" />
                      <span className="text-white font-medium">Compliance Analytics Dashboard</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-slate-700 rounded p-3 border border-slate-600">
                        <p className="text-slate-400 text-xs mb-1">Risk Score</p>
                        <p className="text-2xl font-bold text-white flex items-center">
                          87%
                          <span className="text-green-400 text-xs ml-1 flex items-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                              <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            12%
                          </span>
                        </p>
                      </div>
                      <div className="bg-slate-700 rounded p-3 border border-slate-600">
                        <p className="text-slate-400 text-xs mb-1">Compliance</p>
                        <p className="text-2xl font-bold text-white">94%</p>
                      </div>
                      <div className="bg-slate-700 rounded p-3 border border-slate-600">
                        <p className="text-slate-400 text-xs mb-1">Tasks</p>
                        <p className="text-2xl font-bold text-white">128</p>
                      </div>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-4 mb-4 border border-slate-600">
                      <div className="mb-3 flex justify-between items-center">
                        <h5 className="text-white font-medium">Compliance Score Trend</h5>
                        <div className="text-xs text-slate-400">Last 6 months</div>
                      </div>
                      <div className="h-40 flex items-end space-x-2">
                        <div className="h-[40%] w-1/6 bg-innovation-600 rounded-t-md relative">
                          <div className="absolute bottom-0 w-full h-[60%] bg-innovation-500 opacity-20 rounded-t-md"></div>
                        </div>
                        <div className="h-[55%] w-1/6 bg-innovation-600 rounded-t-md relative">
                          <div className="absolute bottom-0 w-full h-[45%] bg-innovation-500 opacity-20 rounded-t-md"></div>
                        </div>
                        <div className="h-[48%] w-1/6 bg-innovation-600 rounded-t-md relative">
                          <div className="absolute bottom-0 w-full h-[52%] bg-innovation-500 opacity-20 rounded-t-md"></div>
                        </div>
                        <div className="h-[60%] w-1/6 bg-innovation-600 rounded-t-md relative">
                          <div className="absolute bottom-0 w-full h-[40%] bg-innovation-500 opacity-20 rounded-t-md"></div>
                        </div>
                        <div className="h-[75%] w-1/6 bg-innovation-600 rounded-t-md relative">
                          <div className="absolute bottom-0 w-full h-[25%] bg-innovation-500 opacity-20 rounded-t-md"></div>
                        </div>
                        <div className="h-[90%] w-1/6 bg-innovation-600 rounded-t-md relative">
                          <div className="absolute bottom-0 w-full h-[10%] bg-innovation-500 opacity-20 rounded-t-md"></div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-slate-400">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                      </div>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                      <div className="mb-3">
                        <h5 className="text-white font-medium">Framework Coverage</h5>
                      </div>
                      <div className="flex space-x-3">
                        <div className="w-40 h-40 relative">
                          <svg viewBox="0 0 36 36" className="w-full h-full">
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#444" strokeWidth="3" />
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#8B5CF6" strokeWidth="3" strokeDasharray="75, 100" />
                          </svg>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <div className="text-2xl font-bold text-white">75%</div>
                            <div className="text-xs text-slate-400">Coverage</div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="mb-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-white">ISO 27001</span>
                              <span className="text-slate-400">92%</span>
                            </div>
                            <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                              <div className="h-full bg-compliance-500 rounded-full" style={{ width: '92%' }}></div>
                            </div>
                          </div>
                          <div className="mb-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-white">SOC 2</span>
                              <span className="text-slate-400">86%</span>
                            </div>
                            <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                              <div className="h-full bg-innovation-500 rounded-full" style={{ width: '86%' }}></div>
                            </div>
                          </div>
                          <div className="mb-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-white">GDPR</span>
                              <span className="text-slate-400">78%</span>
                            </div>
                            <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                              <div className="h-full bg-compliance-400 rounded-full" style={{ width: '78%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-white">HIPAA</span>
                              <span className="text-slate-400">65%</span>
                            </div>
                            <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                              <div className="h-full bg-innovation-400 rounded-full" style={{ width: '65%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* AI Agent Workflow */}
              <div className={`transition-all duration-700 delay-[300ms] transform ${
                screenshotsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
                <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 shadow-xl hover:shadow-compliance-600/20 hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-700">
                    <div className="flex items-center">
                      <BrainCircuit className="h-5 w-5 text-compliance-400 mr-2" />
                      <span className="text-white font-medium">AI Agent Workflow</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-center py-2 mb-4">
                      <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-innovation-100">
                        <Bot className="h-8 w-8 text-innovation-600" />
                        <div className="absolute right-0 bottom-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>
                      <div className="h-0.5 w-12 bg-compliance-300"></div>
                      <div className="w-16 h-16 rounded-full bg-slate-600 flex items-center justify-center">
                        <Zap className="h-8 w-8 text-yellow-400" />
                      </div>
                      <div className="h-0.5 w-12 bg-compliance-300"></div>
                      <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center">
                        <Shield className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    
                    <div className="bg-slate-700 rounded-lg p-4 mb-4 border border-slate-600">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-innovation-600 flex items-center justify-center mr-3">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h6 className="text-white font-medium">Compliance Agent</h6>
                          <p className="text-xs text-slate-400">Active now</p>
                        </div>
                      </div>
                      <div className="pl-11">
                        <div className="bg-slate-800 rounded-lg p-3 mb-2 text-sm text-white border border-slate-600">
                          I've analyzed the latest data security policies and found 3 potential gaps that need attention.
                        </div>
                        <div className="bg-slate-800 rounded-lg p-3 mb-2 text-sm text-white border border-slate-600">
                          Scheduling automated follow-ups with IT team members to collect necessary documentation.
                        </div>
                        <div className="flex space-x-2 mb-3">
                          <div className="bg-innovation-600 text-white text-xs px-3 py-1 rounded-full">View Details</div>
                          <div className="bg-slate-600 text-white text-xs px-3 py-1 rounded-full">Respond</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                      <h5 className="text-white font-medium mb-3">Active Compliance Workflows</h5>
                      <div className="space-y-3">
                        <div className="flex items-center p-2 bg-slate-800 rounded border border-slate-600">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <h6 className="text-white text-sm font-medium">GDPR Data Mapping</h6>
                            <div className="flex items-center">
                              <div className="h-1.5 flex-1 bg-slate-600 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: '70%' }}></div>
                              </div>
                              <span className="text-xs text-slate-400 ml-2">70%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-2 bg-slate-800 rounded border border-slate-600">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <Shield className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h6 className="text-white text-sm font-medium">ISO 27001 Documentation</h6>
                            <div className="flex items-center">
                              <div className="h-1.5 flex-1 bg-slate-600 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
                              </div>
                              <span className="text-xs text-slate-400 ml-2">45%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-2 bg-slate-800 rounded border border-slate-600">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                            <Database className="h-5 w-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h6 className="text-white text-sm font-medium">SOC 2 Evidence Collection</h6>
                            <div className="flex items-center">
                              <div className="h-1.5 flex-1 bg-slate-600 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 rounded-full" style={{ width: '85%' }}></div>
                              </div>
                              <span className="text-xs text-slate-400 ml-2">85%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Assessment and Real-time Monitoring */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className={`transition-all duration-700 delay-[450ms] transform lg:col-span-2 ${
                screenshotsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
                <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 shadow-xl hover:shadow-innovation-600/20 hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-700">
                    <div className="flex items-center">
                      <LineChart className="h-5 w-5 text-innovation-400 mr-2" />
                      <span className="text-white font-medium">Risk Assessment Matrix</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-6 gap-1 mb-2">
                      <div className="col-span-1"></div>
                      <div className="col-span-1 text-center text-xs text-slate-400">Very Low</div>
                      <div className="col-span-1 text-center text-xs text-slate-400">Low</div>
                      <div className="col-span-1 text-center text-xs text-slate-400">Medium</div>
                      <div className="col-span-1 text-center text-xs text-slate-400">High</div>
                      <div className="col-span-1 text-center text-xs text-slate-400">Very High</div>
                    </div>
                    
                    {/* Risk matrix */}
                    <div className="grid grid-cols-6 gap-1 mb-4">
                      <div className="text-xs text-slate-400 flex items-center justify-end pr-2">Very High</div>
                      <div className="bg-yellow-500/70 h-12 rounded"></div>
                      <div className="bg-orange-500/70 h-12 rounded"></div>
                      <div className="bg-red-500/70 h-12 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-white">R2</span>
                      </div>
                      <div className="bg-red-600/70 h-12 rounded"></div>
                      <div className="bg-red-700/70 h-12 rounded"></div>
                      
                      <div className="text-xs text-slate-400 flex items-center justify-end pr-2">High</div>
                      <div className="bg-yellow-400/70 h-12 rounded"></div>
                      <div className="bg-yellow-500/70 h-12 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-white">R5</span>
                      </div>
                      <div className="bg-orange-500/70 h-12 rounded"></div>
                      <div className="bg-red-500/70 h-12 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-white">R1</span>
                      </div>
                      <div className="bg-red-600/70 h-12 rounded"></div>
                      
                      <div className="text-xs text-slate-400 flex items-center justify-end pr-2">Medium</div>
                      <div className="bg-green-500/70 h-12 rounded"></div>
                      <div className="bg-yellow-400/70 h-12 rounded"></div>
                      <div className="bg-yellow-500/70 h-12 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-white">R4</span>
                      </div>
                      <div className="bg-orange-500/70 h-12 rounded"></div>
                      <div className="bg-red-500/70 h-12 rounded"></div>
                      
                      <div className="text-xs text-slate-400 flex items-center justify-end pr-2">Low</div>
                      <div className="bg-green-400/70 h-12 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-white">R8</span>
                      </div>
                      <div className="bg-green-500/70 h-12 rounded"></div>
                      <div className="bg-yellow-400/70 h-12 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-white">R6</span>
                      </div>
                      <div className="bg-yellow-500/70 h-12 rounded"></div>
                      <div className="bg-orange-500/70 h-12 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-white">R3</span>
                      </div>
                      
                      <div className="text-xs text-slate-400 flex items-center justify-end pr-2">Very Low</div>
                      <div className="bg-green-300/70 h-12 rounded"></div>
                      <div className="bg-green-400/70 h-12 rounded"></div>
                      <div className="bg-green-500/70 h-12 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-white">R7</span>
                      </div>
                      <div className="bg-yellow-400/70 h-12 rounded"></div>
                      <div className="bg-yellow-500/70 h-12 rounded"></div>
                    </div>
                    
                    <div className="bg-slate-700 rounded-lg p-3 border border-slate-600">
                      <h5 className="text-white font-medium mb-2">Top Risk Factors</h5>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-2">
                            <span className="text-xs font-bold text-red-600">R1</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-white">Third-party vendor access controls</p>
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-400">Impact: High</span>
                              <span className="text-slate-400">Likelihood: High</span>
                              <span className="text-red-400 font-medium">Critical</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-2">
                            <span className="text-xs font-bold text-red-600">R2</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-white">Outdated encryption standards</p>
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-400">Impact: Very High</span>
                              <span className="text-slate-400">Likelihood: Medium</span>
                              <span className="text-red-400 font-medium">Critical</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                            <span className="text-xs font-bold text-orange-600">R3</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-white">Incomplete data retention policy</p>
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-400">Impact: Very High</span>
                              <span className="text-slate-400">Likelihood: Low</span>
                              <span className="text-orange-400 font-medium">High</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`transition-all duration-700 delay-[600ms] transform ${
                screenshotsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
                <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 shadow-xl hover:shadow-compliance-600/20 hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-700">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-compliance-400 mr-2" />
                      <span className="text-white font-medium">Real-time Monitoring</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="text-white font-medium">Compliance Activity</h5>
                      <div className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Live</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-white">ISO 27001 control A.9.4 verified</p>
                            <p className="text-xs text-slate-400">2 minutes ago</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
                            <Bot className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-white">AI agent collecting evidence from HR team</p>
                            <p className="text-xs text-slate-400">7 minutes ago</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-2 flex-shrink-0">
                            <Shield className="h-4 w-4 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-sm text-white">SOC 2 Type II audit preparation started</p>
                            <p className="text-xs text-slate-400">24 minutes ago</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2 flex-shrink-0">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-600">
                              <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-white">GDPR policy update required</p>
                            <p className="text-xs text-slate-400">35 minutes ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div 
            ref={credentialsRef} 
            className={`transition-all duration-700 transform ${
              credentialsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h4 className="text-3xl font-bold mb-4 text-slate-800 relative">
                Compliance made effortless. Trust built in.
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-compliance-600 to-innovation-600"></span>
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className={`transition-all duration-700 delay-[150ms] transform ${
                credentialsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
                <Card className="p-6 h-full border-compliance-200 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="mb-4 text-compliance-600">
                    <Shield className="h-10 w-10" />
                  </div>
                  <h5 className="text-xl font-semibold mb-3 text-slate-800">Battle-Tested in Dozens of Audits</h5>
                  <p className="text-slate-600">We don't just talk compliance—we prove it in real-world scenarios.</p>
                </Card>
              </div>

              <div className={`transition-all duration-700 delay-[300ms] transform ${
                credentialsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
                <Card className="p-6 h-full border-compliance-200 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="mb-4 text-innovation-600">
                    <Award className="h-10 w-10" />
                  </div>
                  <h5 className="text-xl font-semibold mb-3 text-slate-800">Enterprise-Grade Security & Certification</h5>
                  <p className="text-slate-600">Rigorous penetration testing and top-tier certifications ensure your data is safe.</p>
                </Card>
              </div>

              <div className={`transition-all duration-700 delay-[450ms] transform ${
                credentialsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
                <Card className="p-6 h-full border-compliance-200 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="mb-4 text-compliance-600">
                    <Star className="h-10 w-10" />
                  </div>
                  <h5 className="text-xl font-semibold mb-3 text-slate-800">Proven Success & Satisfaction</h5>
                  <p className="text-slate-600">Happy clients, strong partnerships, and measurable impact.</p>
                </Card>
              </div>
            </div>

            {/* Testimonial */}
            <div className={`max-w-3xl mx-auto bg-gradient-to-r from-compliance-50 to-innovation-50 p-8 rounded-lg border border-slate-200 shadow-lg transition-all duration-700 delay-[600ms] transform ${
              credentialsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              <p className="text-xl italic text-slate-700 mb-6">
                "This Innovative solutions not only meet strict regulatory requirements but also effectively address business needs."
              </p>
              <div className="flex items-center justify-center">
                <div>
                  <p className="font-semibold text-slate-800">Michal Miszulowicz</p>
                  <p className="text-slate-600 text-sm">Director of Innovation Sector Collaboration, BNP Paribas Bank</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrustReasonsSection;
