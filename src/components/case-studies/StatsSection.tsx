
import React, { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  bgColor: string;
  iconColor: string;
}

const StatCard = ({ icon, value, label, bgColor, iconColor }: StatCardProps) => (
  <Card className="p-6 text-center card-hover">
    <div className={`mb-4 mx-auto w-16 h-16 ${bgColor} rounded-full flex items-center justify-center`}>
      <div className={`h-8 w-8 ${iconColor}`}>{icon}</div>
    </div>
    <h3 className="text-3xl font-bold text-slate-900 mb-2">{value}</h3>
    <p className="text-slate-600">{label}</p>
  </Card>
);

interface StatsSectionProps {
  title: string;
  stats: Array<StatCardProps>;
}

const StatsSection = ({ title, stats }: StatsSectionProps) => {
  return (
    <div className="mt-24 mb-8">
      <h2 className="text-3xl font-bold gradient-heading text-center mb-12">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
