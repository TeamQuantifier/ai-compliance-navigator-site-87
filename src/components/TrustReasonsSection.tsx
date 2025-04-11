
import { 
  Clock, 
  Bot, 
  LineChart, 
  Rocket, 
  Database,
  CheckCircle,
  Shield,
  Award,
  Star 
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
