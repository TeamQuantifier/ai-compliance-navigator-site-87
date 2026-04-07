import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle2 } from 'lucide-react';

const TrainingLanding = () => {
  const { t, currentLocale } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Training | Quantifier.ai</title>
        <meta name="description" content="Training page" />
      </Helmet>

      <section className="bg-slate-950 py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white">HERO SECTION</h1>
          <p className="text-white/80 mt-4">This is the hero</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-black">PROBLEM SECTION</h2>
          <p className="text-gray-600 mt-4">This should be visible below the hero</p>
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="p-6 bg-gray-100 rounded-xl">
              <h3 className="font-bold text-black">Problem 1</h3>
              <p className="text-gray-600">Description here</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-xl">
              <h3 className="font-bold text-black">Problem 2</h3>
              <p className="text-gray-600">Description here</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-xl">
              <h3 className="font-bold text-black">Problem 3</h3>
              <p className="text-gray-600">Description here</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-black">TRACKS SECTION</h2>
          <p className="text-gray-600 mt-4">Training tracks go here</p>
        </div>
      </section>
    </>
  );
};

export default TrainingLanding;
