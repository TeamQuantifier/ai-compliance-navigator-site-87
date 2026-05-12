import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Crown, ClipboardList, Users, Search, ArrowRight } from "lucide-react";

const ROLES = [
  {
    icon: Crown,
    name: "Zarząd",
    desc: "Management Body Accountability na talerzu — dashboardy, decyzje i podpisy w jednym miejscu.",
    href: "/roles/managers",
    color: "from-amber-500/20 to-orange-500/10",
  },
  {
    icon: ClipboardList,
    name: "Compliance Manager",
    desc: "Mniej Excela, więcej decyzji. Leon obsługuje rutynę, Ty zajmujesz się ryzykiem.",
    href: "/roles/managers",
    color: "from-purple-500/20 to-blue-500/10",
  },
  {
    icon: Users,
    name: "Contributor",
    desc: "Realizujesz zadania prosto z maila. Bez logowania w 5 systemach, bez „dogadaj się z IT”.",
    href: "/roles/contributors",
    color: "from-emerald-500/20 to-teal-500/10",
  },
  {
    icon: Search,
    name: "Audytor",
    desc: "Wchodzisz, klikasz, masz pakiet. PDF, XLSX, XBRL, XML — gotowe.",
    href: "/roles/auditor",
    color: "from-blue-500/20 to-indigo-500/10",
  },
];

const RolesValueCards = () => {
  const { currentLocale } = useLanguage();
  return (
    <section className="bg-slate-950 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Quantifier robi różnicę dla każdej roli
          </h2>
          <p className="text-white/70">
            Od Zarządu po audytora zewnętrznego — każdy widzi to, czego potrzebuje.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROLES.map((r) => {
            const Icon = r.icon;
            return (
              <Link
                key={r.name}
                to={`/${currentLocale}${r.href}/`}
                className={`group bg-gradient-to-br ${r.color} bg-white/[0.03] border border-white/10 hover:border-white/30 rounded-2xl p-5 transition-all backdrop-blur-sm`}
              >
                <Icon className="h-8 w-8 text-white mb-4" />
                <div className="font-bold text-white mb-2">{r.name}</div>
                <p className="text-sm text-white/80 mb-4 leading-snug">{r.desc}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-white/90 group-hover:text-white">
                  Zobacz widok roli <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RolesValueCards;
