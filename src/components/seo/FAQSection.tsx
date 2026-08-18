import { Helmet } from 'react-helmet-async';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  faqs: FAQ[];
  pageUrl: string;
  variant?: 'default' | 'legal';
}

const FAQSection = ({ title, faqs, pageUrl, variant = 'default' }: FAQSectionProps) => {
  // Generate FAQPage JSON-LD schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const isLegal = variant === 'legal';

  return (
    <section className={isLegal ? 'py-16 md:py-24 bg-white' : 'py-16 md:py-24 bg-slate-50'}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="container mx-auto px-4">
        {isLegal ? (
          <div className="max-w-3xl mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ksc-accent mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-ksc-ink">{title}</h2>
          </div>
        ) : (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900">
            {title}
          </h2>
        )}

        <div className={isLegal ? 'max-w-3xl' : 'max-w-3xl mx-auto'}>
          <Accordion type="single" collapsible className={isLegal ? 'border-t border-ksc-ink/15' : 'space-y-4'}>
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className={
                  isLegal
                    ? 'border-b border-ksc-ink/15'
                    : 'bg-white rounded-lg border border-slate-200 px-6'
                }
              >
                <AccordionTrigger
                  className={
                    isLegal
                      ? 'text-left font-semibold text-ksc-ink hover:text-ksc-accent py-5'
                      : 'text-left font-semibold text-slate-900 hover:text-compliance-700 py-5'
                  }
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className={isLegal ? 'text-ksc-ink/70 pb-6 leading-relaxed' : 'text-slate-600 pb-5'}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};


export default FAQSection;
