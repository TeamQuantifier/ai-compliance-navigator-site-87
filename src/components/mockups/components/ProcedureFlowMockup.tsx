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
  return;
};
export default ProcedureFlowMockup;