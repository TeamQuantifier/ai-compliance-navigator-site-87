import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
const InsidersSection = () => {
  // Sample logos for the carousel
  const logos = [{
    id: 1,
    src: "https://placehold.co/200x100/e2e8f0/64748b?text=Company+1",
    alt: "Company 1"
  }, {
    id: 2,
    src: "https://placehold.co/200x100/e2e8f0/64748b?text=Company+2",
    alt: "Company 2"
  }, {
    id: 3,
    src: "https://placehold.co/200x100/e2e8f0/64748b?text=Company+3",
    alt: "Company 3"
  }, {
    id: 4,
    src: "https://placehold.co/200x100/e2e8f0/64748b?text=Company+4",
    alt: "Company 4"
  }, {
    id: 5,
    src: "https://placehold.co/200x100/e2e8f0/64748b?text=Company+5",
    alt: "Company 5"
  }, {
    id: 6,
    src: "https://placehold.co/200x100/e2e8f0/64748b?text=Company+6",
    alt: "Company 6"
  }];
  return <section className="py-16 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h3 className="text-3xl font-bold mb-6 text-white">
            Compliance, powered by insiders.
          </h3>
          <p className="text-xl text-slate-300 mb-6">
            We combine cutting-edge tech with real compliance expertise.
          </p>
          <p className="text-lg text-slate-400 mb-10">Join 250+ companies—from startups to multinational corporations —who trust us to simplify their compliance.</p>
        </div>

        {/* Logo Carousel */}
        <div className="mb-16 max-w-4xl mx-auto">
          <Carousel opts={{
          align: "start",
          loop: true
        }} className="w-full">
            <CarouselContent>
              {logos.map(logo => <CarouselItem key={logo.id} className="md:basis-1/3 lg:basis-1/4">
                  <div className="p-4">
                    <img src={logo.src} alt={logo.alt} className="h-12 mx-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                  </div>
                </CarouselItem>)}
            </CarouselContent>
            <div className="flex justify-center mt-6">
              <CarouselPrevious className="relative static mx-2 bg-slate-800 hover:bg-slate-700 border-slate-700" />
              <CarouselNext className="relative static mx-2 bg-slate-800 hover:bg-slate-700 border-slate-700" />
            </div>
          </Carousel>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/contact">
            <Button className="bg-gradient-to-r from-compliance-600 to-innovation-600 hover:from-compliance-700 hover:to-innovation-700 text-white px-8 py-6 h-auto text-lg shadow-lg shadow-slate-900/30 group">
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>;
};
export default InsidersSection;