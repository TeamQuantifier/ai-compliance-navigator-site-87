import { Shield, CheckCircle, FileText, Download, Clock, Eye } from 'lucide-react';

const evidenceItems = [
  { control: 'A.5.1 — Information Security Policy', evidence: 3, status: 'verified', lastAudit: '2026-01-15' },
  { control: 'A.8.1 — Asset Inventory', evidence: 5, status: 'verified', lastAudit: '2026-01-15' },
  { control: 'A.9.2 — User Access Management', evidence: 2, status: 'pending', lastAudit: '2026-01-15' },
  { control: 'A.12.4 — Logging & Monitoring', evidence: 4, status: 'verified', lastAudit: '2026-01-15' },
  { control: 'A.16.1 — Incident Management', evidence: 1, status: 'gap', lastAudit: '2026-01-15' },
];

const statusMap = {
  verified: { label: 'Verified', color: 'text-green-600 bg-green-50', icon: CheckCircle },
  pending: { label: 'Pending', color: 'text-amber-600 bg-amber-50', icon: Clock },
  gap: { label: 'Gap', color: 'text-red-600 bg-red-50', icon: Shield },
};

const AuditorDashboardMockup = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-amber-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs font-medium text-slate-500">Audit Workspace</span>
        <div className="flex items-center gap-1">
          <Download className="h-3 w-3 text-[#7E69AB]" />
          <span className="text-[10px] text-[#7E69AB] font-medium">Export</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 p-3 border-b border-slate-100">
        <div className="bg-green-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-green-600">38</div>
          <div className="text-[10px] text-green-600/70">Verified</div>
        </div>
        <div className="bg-amber-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-amber-600">5</div>
          <div className="text-[10px] text-amber-600/70">Pending</div>
        </div>
        <div className="bg-red-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-red-600">2</div>
          <div className="text-[10px] text-red-600/70">Gaps</div>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {evidenceItems.map((item, i) => {
          const st = statusMap[item.status as keyof typeof statusMap];
          const Icon = st.icon;
          return (
            <div key={i} className="px-4 py-3 flex items-center gap-3 hover:bg-slate-50/50 transition-colors">
              <Shield className="h-4 w-4 text-[#9b87f5] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-800 truncate">{item.control}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                    <FileText className="h-3 w-3" />{item.evidence} evidence files
                  </span>
                </div>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium flex items-center gap-0.5 ${st.color}`}>
                <Icon className="h-3 w-3" />
                {st.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AuditorDashboardMockup;
