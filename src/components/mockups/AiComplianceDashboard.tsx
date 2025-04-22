
import React from 'react';
import { Shield, Bell, BrainCircuit } from 'lucide-react';
import QuickStatsBar from './components/QuickStatsBar';
import KeyCharts from './components/KeyCharts';

interface AiComplianceDashboardProps {
  title?: string;
  themeColor?: string;
}

const AiComplianceDashboard = ({ 
  title = "Quantifier AI Compliance",
  themeColor = "#7E69AB"
}: AiComplianceDashboardProps) => {
  return (
    <div className="w-full bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shadow-lg">
      {/* Dashboard Header */}
      <div className="bg-white px-4 py-3 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5" style={{ color: themeColor }} />
          <h2 className="font-semibold text-base">{title}</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="h-4 w-4 text-slate-500" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold">3</span>
          </div>
          <div className="h-6 w-6 rounded-full flex items-center justify-center" style={{ backgroundColor: themeColor }}>
            <span className="text-[10px] text-white font-medium">JD</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <QuickStatsBar />
        <KeyCharts />
      </div>
    </div>
  );
};

export default AiComplianceDashboard;
