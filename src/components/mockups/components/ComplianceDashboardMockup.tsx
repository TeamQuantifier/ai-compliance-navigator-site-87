import React from 'react';
import { Shield, Calendar, Activity, TrendingUp, CheckCircle, AlertCircle, Clock, Users } from 'lucide-react';

const ComplianceDashboardMockup = () => {
  return (
    <div className="bg-card rounded-lg border p-6 space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-medium text-primary">Quantifier.ai</span>
        </div>
        <h2 className="text-2xl font-bold mb-1">Hey Tim 👋,</h2>
        <p className="text-xl">Get your compliance done <span className="font-bold">10x faster</span></p>
      </div>

      {/* Continuous Compliance Section */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Continuous Compliance
        </h3>
        <p className="text-sm text-muted-foreground mb-4">Ongoing monitoring and maintenance of compliance activities</p>
        
        <div className="grid md:grid-cols-3 gap-4">
          {/* Current Score */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Current Score</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary">72%</span>
              <span className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +4% this month
              </span>
            </div>
          </div>

          {/* Scheduled Reviews */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Scheduled Reviews</p>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-orange-600">4</span>
              <Calendar className="h-5 w-5 text-orange-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Next 30 days</p>
          </div>

          {/* Active Monitors */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Active Monitors</p>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-green-600">3</span>
              <Activity className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Running daily</p>
          </div>
        </div>
      </div>

      {/* Automated Monitoring Systems */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-600" />
          Automated Monitoring Systems
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          {/* Asset Discovery */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Asset Discovery</h4>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">active</span>
            </div>
            <p className="text-sm text-muted-foreground">Automated scanning for new network assets</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Run:</span>
                <span>2024-06-19 23:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Next Run:</span>
                <span>2024-06-20 23:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Findings:</span>
                <span className="text-blue-600">2 (low)</span>
              </div>
            </div>
            
            <button className="w-full bg-muted text-muted-foreground py-2 px-4 rounded-md text-sm font-medium">
              Review Findings
            </button>
          </div>

          {/* Policy Compliance Check */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Policy Compliance Check</h4>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">active</span>
            </div>
            <p className="text-sm text-muted-foreground">Validation of security policy adherence</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Run:</span>
                <span>-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Next Run:</span>
                <span>-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Findings:</span>
                <span>-</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-primary-foreground">TB</span>
          </div>
          <div>
            <p className="font-medium text-sm">Tim Burry</p>
            <p className="text-xs text-muted-foreground">CISO</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-green-600" />
            Audit done, stress-free
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComplianceDashboardMockup;