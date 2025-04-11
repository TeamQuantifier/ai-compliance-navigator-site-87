
import { 
  Clock, 
  Bot, 
  LineChart, 
  Rocket, 
  Database,
  CheckCircle 
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface TrustReasonCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const TrustReasonCard = ({ icon, title, description }: TrustReasonCardProps) => {
  return (
    <Card className="p-6 border border-slate-200 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 h-full">
      <div className="mb-4 text-innovation-400">{icon}</div>
      <h5 className="text-xl font-semibold mb-3 text-white">{title}</h5>
      <p className="text-slate-300">{description}</p>
    </Card>
  );
};

const TrustReasonsSection = () => {
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

  return (
    <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h4 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Why Teams Trust Us with Compliance
          </h4>
          <p className="text-xl text-slate-300">
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
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustReasonsSection;
