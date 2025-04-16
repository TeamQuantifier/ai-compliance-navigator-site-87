
import React from 'react';
import { Shield, Bell, BrainCircuit, BarChart4, CheckCircle, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import QuickStatsBar from './components/QuickStatsBar';
import ComplianceStatus from './components/ComplianceStatus';
import RiskAssessment from './components/RiskAssessment';
import AIInsights from './components/AIInsights';

const AiComplianceDashboard = () => {
  return (
    <div className="w-full bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shadow-lg">
      {/* Dashboard Header */}
      <div className="bg-white px-4 py-3 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-[#7E69AB]" />
          <h2 className="font-semibold text-base">Quantifier AI Compliance</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="h-4 w-4 text-slate-500" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold">3</span>
          </div>
          <div className="h-6 w-6 bg-[#7E69AB] rounded-full flex items-center justify-center">
            <span className="text-[10px] text-white font-medium">JD</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <QuickStatsBar />
        <ComplianceStatus />
        <div className="grid grid-cols-2 gap-4">
          <RiskAssessment />
          <AIInsights />
        </div>
      </div>
    </div>
  );
};

export default AiComplianceDashboard;
