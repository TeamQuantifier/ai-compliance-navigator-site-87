import { useLanguage } from "@/contexts/LanguageContext";

// Served from /public/featured so they work on both Lovable preview AND the
// Netlify-hosted production domain (the /__l5e/ asset path is preview-only).
const logos = [
  {
    src: "/featured/ministerstwo-cyfryzacji.png",
    alt: "Ministerstwo Cyfryzacji",
    h: "h-14 md:h-16",
  },
  {
    src: "/featured/ncc-pl.png",
    alt: "NCC-PL — Krajowe Centrum Kompetencji Cyberbezpieczeństwa",
    h: "h-14 md:h-16",
  },
  {
    src: "/featured/ai-chamber.png",
    alt: "AI Chamber",
    h: "h-10 md:h-12",
  },
  {
    src: "/featured/klaster-gospodarki-cyrkularnej.png",
    alt: "Klaster Gospodarki Cyrkularnej i Recyklingu",
    h: "h-12 md:h-14",
  },
  {
    src: "/featured/top-ai-driven-companies.png",
    alt: "Top AI Driven Companies",
    h: "h-12 md:h-14",
  },
];

const FeaturedBySection = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-white py-16 border-y border-slate-200/70">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-compliance-50 border border-compliance-200 text-compliance-700 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-compliance-500" />
            {t("featuredBy.badge", { defaultValue: "Zaufali nam" })}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            {t("featuredBy.title", { defaultValue: "Wyróżnieni przez ekspertów i instytucje" })}
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            {t("featuredBy.subtitle", {
              defaultValue:
                "Nasze technologie zdobywają uznanie ekspertów, a współpraca z czołowymi instytucjami pozwala nam współtworzyć standardy cyberbezpieczeństwa, AI i compliance.",
            })}
          </p>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-10 md:gap-x-20">
          {logos.map((logo) => (
            <li
              key={logo.src}
              className="flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                width={200}
                height={64}
                className={`${logo.h} w-auto object-contain`}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FeaturedBySection;
