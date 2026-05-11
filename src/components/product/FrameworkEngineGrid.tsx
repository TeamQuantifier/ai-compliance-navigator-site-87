import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Lock, Globe, FileCheck, Server, Leaf, Building2, KeyRound } from "lucide-react";

const FRAMEWORKS = [
  { name: "NIS2", icon: Shield, href: "/frameworks/cybersecurity/nis2", desc: "Cyberbezpieczeństwo UE" },
  { name: "ISO 27001", icon: Lock, href: "/frameworks/information-security/iso-27001", desc: "ISMS — bezpieczeństwo informacji" },
  { name: "DORA", icon: Server, href: "/frameworks/information-security/dora", desc: "Operacyjna odporność cyfrowa" },
  { name: "GDPR", icon: KeyRound, href: "/frameworks/data-security/gdpr", desc: "Ochrona danych osobowych" },
  { name: "SOC 2", icon: FileCheck, href: "/frameworks/cybersecurity/soc", desc: "Trust Services Criteria" },
  { name: "KSC", icon: Building2, href: "/seo/nis2-ksc", desc: "Krajowy System Cyberbezpieczeństwa" },
  { name: "ISO 9001", icon: Globe, href: "/frameworks/information-security/iso-9001", desc: "System zarządzania jakością" },
  { name: "ESG / CSRD", icon: Leaf, href: "/frameworks/environmental", desc: "Sprawozdawczość zrównoważona" },
];

const FrameworkEngineGrid = () => {
  const { currentLocale } = useLanguage();
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Jeden silnik kontroli — wszystkie regulacje, których potrzebujesz
          </h2>
          <p className="text-slate-600">
            Mapowanie kontroli między frameworkami robi się samo. Robisz raz — używasz wszędzie.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {FRAMEWORKS.map((f) => {
            const Icon = f.icon;
            return (
              <Link
                key={f.name}
                to={`/${currentLocale}${f.href}/`}
                className="group bg-white border border-slate-200 hover:border-slate-900 rounded-xl p-5 transition-all hover:shadow-lg"
              >
                <Icon className="h-7 w-7 text-slate-700 group-hover:text-slate-900 mb-3" />
                <div className="font-bold text-slate-900 mb-1">{f.name}</div>
                <div className="text-xs text-slate-500 leading-snug">{f.desc}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FrameworkEngineGrid;
