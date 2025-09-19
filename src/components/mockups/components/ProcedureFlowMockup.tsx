import React from 'react';
import { FileText, ArrowRight, Settings, CheckCircle, Users, Play } from 'lucide-react';

const ProcedureFlowMockup = () => {
  const policies = [
    { id: 1, name: "Access Control Policy", status: "active", procedures: 3 },
    { id: 2, name: "Incident Response Policy", status: "active", procedures: 5 },
    { id: 3, name: "Data Protection Policy", status: "pending", procedures: 2 },
  ];

  const procedures = [
    { id: 1, name: "User Access Review", policy: "Access Control", status: "automated", assignee: "IT Team" },
    { id: 2, name: "Incident Classification", policy: "Incident Response", status: "active", assignee: "CISO" },
    { id: 3, name: "Data Breach Notification", policy: "Data Protection", status: "pending", assignee: "Legal" },
    { id: 4, name: "Security Training Rollout", policy: "Access Control", status: "scheduled", assignee: "HR" },
  ];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Settings className="h-5 w-5 text-[#7E69AB]" />
          Policy to Procedure Flow
        </h3>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
          12 Active Procedures
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Policies Section */}
        <div>
          <h4 className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Policies
          </h4>
          <div className="space-y-3">
            {policies.map((policy) => (
              <div key={policy.id} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-800">{policy.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    policy.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {policy.status}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  {policy.procedures} procedures generated
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flow Arrow */}
        <div className="flex items-center justify-center lg:justify-start">
          <ArrowRight className="h-8 w-8 text-[#7E69AB] hidden lg:block" />
        </div>

        {/* Procedures Section */}
        <div className="lg:col-start-2">
          <h4 className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
            <Play className="h-4 w-4" />
            Generated Procedures
          </h4>
          <div className="space-y-3">
            {procedures.map((procedure) => (
              <div key={procedure.id} className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-800">{procedure.name}</span>
                  <div className="flex items-center gap-2">
                    {procedure.status === 'automated' && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      procedure.status === 'automated' 
                        ? 'bg-green-100 text-green-700'
                        : procedure.status === 'active'
                        ? 'bg-blue-100 text-blue-700'
                        : procedure.status === 'scheduled'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {procedure.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Policy: {procedure.policy}</span>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {procedure.assignee}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flow Indicator */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
          <span>AI automatically generates procedures from policy templates</span>
          <ArrowRight className="h-3 w-3" />
          <span>Role-based assignments</span>
          <ArrowRight className="h-3 w-3" />
          <span>Workflow automation</span>
        </div>
      </div>
    </div>
  );
};

export default ProcedureFlowMockup;