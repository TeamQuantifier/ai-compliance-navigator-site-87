import React from 'react';
import { FileText, ArrowRight, Settings, CheckCircle, Users, Play } from 'lucide-react';
const ProcedureFlowMockup = () => {
  const policies = [{
    id: 1,
    name: "Access Control Policy",
    status: "active",
    procedures: 3
  }, {
    id: 2,
    name: "Incident Response Policy",
    status: "active",
    procedures: 5
  }, {
    id: 3,
    name: "Data Protection Policy",
    status: "pending",
    procedures: 2
  }];
  const procedures = [{
    id: 1,
    name: "User Access Review",
    policy: "Access Control",
    status: "automated",
    assignee: "IT Team"
  }, {
    id: 2,
    name: "Incident Classification",
    policy: "Incident Response",
    status: "active",
    assignee: "CISO"
  }, {
    id: 3,
    name: "Data Breach Notification",
    policy: "Data Protection",
    status: "pending",
    assignee: "Legal"
  }, {
    id: 4,
    name: "Security Training Rollout",
    policy: "Access Control",
    status: "scheduled",
    assignee: "HR"
  }];
  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold">Policy-Driven Procedure Automation</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Policies Section */}
        <div>
          <h4 className="font-medium mb-4 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Active Policies
          </h4>
          <div className="space-y-3">
            {policies.map((policy) => (
              <div key={policy.id} className="p-3 border rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{policy.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    policy.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {policy.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{policy.procedures} automated procedures</p>
              </div>
            ))}
          </div>
        </div>

        {/* Procedures Section */}
        <div>
          <h4 className="font-medium mb-4 flex items-center gap-2">
            <Play className="h-4 w-4" />
            Generated Procedures
          </h4>
          <div className="space-y-3">
            {procedures.map((procedure) => (
              <div key={procedure.id} className="p-3 border rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{procedure.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    procedure.status === 'automated' ? 'bg-blue-100 text-blue-700' :
                    procedure.status === 'active' ? 'bg-green-100 text-green-700' :
                    procedure.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {procedure.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Policy: {procedure.policy}</span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {procedure.assignee}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-600" />
          AI automatically generates actionable procedures from your policies, assigns them to relevant teams, and tracks completion status.
        </p>
      </div>
    </div>
  );
};
export default ProcedureFlowMockup;