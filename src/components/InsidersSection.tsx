
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from "@/contexts/LanguageContext";

const InsidersSection = () => {
  const { t, currentLocale } = useLanguage();
  // Real partner logos
  const logos = [
    {
      id: 1,
      src: "/lovable-uploads/c61c6c7b-4cca-41ee-a271-ed1dcb71d49e.png",
      alt: "UDS"
    },
    {
      id: 2,
      src: "/lovable-uploads/cfc3645d-ad39-4425-9d86-c4c0dd7a55b4.png",
      alt: "NBS Communications"
    },
    {
      id: 3,
      src: "/lovable-uploads/9c1dd21a-e99c-4c0d-b845-8ca517904897.png",
      alt: "Pracodawcy RP"
    },
    {
      id: 4,
      src: "/lovable-uploads/62a1cf77-388a-4393-9d3a-13bfa765711d.png",
      alt: "Wosana"
    },
    {
      id: 5,
      src: "/lovable-uploads/0012c069-5ef3-4d57-bf97-21a8d8a136b8.png",
      alt: "Zymetria"
    },
    {
      id: 6,
      src: "/lovable-uploads/ca42b48f-1e50-47df-aec7-ad128711f4e9.png",
      alt: "Real Management"
    },
    {
      id: 7,
      src: "/lovable-uploads/818eb7b5-1469-4fc6-897b-e36a76fce702.png",
      alt: "NOMAX"
    },
    {
      id: 8,
      src: "/lovable-uploads/350b02bb-31cf-475e-8be8-96bce489e9a2.png",
      alt: "RBE"
    },
    {
      id: 9,
      src: "/lovable-uploads/6f957ced-6a8e-4236-8c91-0210ec2802c5.png",
      alt: "Dr Irena Eris"
    },
    {
      id: 10,
      src: "/lovable-uploads/11f051b4-56aa-4680-bb0b-a87b0f460379.png",
      alt: "MAMNT"
    },
    {
      id: 11,
      src: "/lovable-uploads/adf3b32c-ea6c-4dcf-8b0f-3305e40772da.png", 
      alt: "BCC"
    },
    {
      id: 12,
      src: "/lovable-uploads/8cb2791b-5806-460b-b9d2-e524f7e54e0f.png",
      alt: "LOCO Trans-Seed"
    },
    {
      id: 13,
      src: "/lovable-uploads/c7cc79e7-a30c-475d-b216-704b60ab3882.png",
      alt: "Bank Polski"
    },
    {
      id: 14,
      src: "/lovable-uploads/b5ac5352-8089-4e7d-a1d4-6c879bd4f57e.png",
      alt: "4F"
    },
    {
      id: 15,
      src: "/lovable-uploads/154104eb-8338-4e4f-884c-2343169fc09b.png",
      alt: "Compensa Vienna Insurance Group"
    },
    {
      id: 16,
      src: "/lovable-uploads/f6b1d6fd-988e-45fe-8a9a-ae06db0a5f62.png",
      alt: "BNP Paribas"
    },
    {
      id: 17,
      src: "/lovable-uploads/cash-director-logo.png",
      alt: "Cash Director"
    },
    {
      id: 18,
      src: "/lovable-uploads/unicell-logo.png",
      alt: "Unicell International"
    }
  ];

  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h3 className="text-3xl font-bold mb-6 text-white">
            {t('insiders.title')}
          </h3>
          <p className="text-xl text-slate-300 mb-6">
            {t('insiders.subtitle')}
          </p>
          <p className="text-lg text-slate-400 mb-10">
            {t('insiders.companiesCount')}
          </p>
        </div>

        {/* Logo Carousel */}
        <div className="mb-16 max-w-5xl mx-auto">
          <Carousel 
            opts={{
              align: "start",
              loop: true
            }}
            plugins={[
              Autoplay({
                delay: 3000,
              }) as any
            ]}
            className="w-full"
          >
            <CarouselContent>
              {logos.map(logo => (
                <CarouselItem key={logo.id} className="md:basis-1/3 lg:basis-1/4">
                  <div className="p-6 h-28 flex items-center justify-center bg-white rounded-md shadow-sm">
                    <img 
                      src={logo.src} 
                      alt={logo.alt} 
                      className="max-h-20 max-w-full mx-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300" 
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to={`/${currentLocale}/contact`}>
            <Button className="bg-gradient-to-r from-compliance-600 to-innovation-600 hover:from-compliance-700 hover:to-innovation-700 text-white px-8 py-6 h-auto text-lg shadow-lg shadow-slate-900/30 group">
              {t('insiders.contactUs')}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InsidersSection;
