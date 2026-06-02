import { useLanguage } from "@/contexts/LanguageContext";
import nccPl from "@/assets/featured/ncc-pl.png.asset.json";
import ministerstwo from "@/assets/featured/ministerstwo-cyfryzacji.png.asset.json";
import topAi from "@/assets/featured/top-ai-driven-companies.png.asset.json";
import featuredLogo from "@/assets/featured/featured-logo.svg.asset.json";
import featuredHeader from "@/assets/featured/featured-header.svg.asset.json";

const logos = [
  { src: ministerstwo.url, alt: "Ministerstwo Cyfryzacji", h: "h-16" },
  { src: nccPl.url, alt: "NCC-PL — Krajowe Centrum Kompetencji Cyberbezpieczeństwa", h: "h-16" },
  { src: featuredHeader.url, alt: "Partner instytucjonalny", h: "h-12" },
  { src: featuredLogo.url, alt: "Partner technologiczny", h: "h-10" },
  { src: topAi.url, alt: "Top AI Driven Companies", h: "h-14" },
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
                "Współpracujemy z instytucjami publicznymi i organizacjami eksperckimi kształtującymi standardy cyberbezpieczeństwa i compliance.",
            })}
          </p>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-16">
          {logos.map((logo) => (
            <li
              key={logo.src}
              className="flex items-center justify-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
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
