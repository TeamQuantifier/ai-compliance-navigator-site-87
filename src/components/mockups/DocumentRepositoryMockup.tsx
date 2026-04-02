import { FileText, Shield, Clock, CheckCircle, Lock, Eye } from 'lucide-react';

const docs = [
  { name: 'Information Security Policy', framework: 'ISO 27001', version: 'v3.2', status: 'approved', updated: '2026-02-15', owner: 'MK' },
  { name: 'Incident Response Plan', framework: 'NIS2', version: 'v2.1', status: 'review', updated: '2026-03-01', owner: 'AW' },
  { name: 'Data Processing Agreement', framework: 'GDPR', version: 'v4.0', status: 'approved', updated: '2026-01-20', owner: 'JD' },
  { name: 'Business Continuity Plan', framework: 'DORA', version: 'v1.3', status: 'draft', updated: '2026-03-10', owner: 'PK' },
  { name: 'Risk Treatment Plan', framework: 'ISO 27001', version: 'v2.0', status: 'approved', updated: '2026-02-28', owner: 'MK' },
];

const statusMap = {
  approved: { label: 'Approved', color: 'text-green-600 bg-green-50', icon: CheckCircle },
  review: { label: 'In Review', color: 'text-amber-600 bg-amber-50', icon: Eye },
  draft: { label: 'Draft', color: 'text-slate-500 bg-slate-100', icon: Clock },
};

const DocumentRepositoryMockup = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-amber-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs font-medium text-slate-500">Document Repository</span>
        <div className="flex items-center gap-1">
          <Lock className="h-3 w-3 text-green-500" />
          <span className="text-[10px] text-green-600 font-medium">Encrypted</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 p-3 border-b border-slate-100">
        <div className="bg-green-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-green-600">47</div>
          <div className="text-[10px] text-green-600/70">Approved</div>
        </div>
        <div className="bg-amber-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-amber-600">8</div>
          <div className="text-[10px] text-amber-600/70">In Review</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-slate-600">3</div>
          <div className="text-[10px] text-slate-600/70">Drafts</div>
        </div>
      </div>

      {/* Document list */}
      <div className="divide-y divide-slate-100">
        {docs.map((doc, i) => {
          const st = statusMap[doc.status as keyof typeof statusMap];
          const Icon = st.icon;
          return (
            <div key={i} className="px-4 py-3 flex items-center gap-3 hover:bg-slate-50/50 transition-colors">
              <FileText className="h-4 w-4 text-[#9b87f5] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-800 truncate">{doc.name}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] px-1.5 py-0.5 bg-[#9b87f5]/10 text-[#7E69AB] rounded font-medium">{doc.framework}</span>
                  <span className="text-[10px] text-slate-400">{doc.version}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium flex items-center gap-1 ${st.color}`}>
                  <Icon className="h-3 w-3" />
                  {st.label}
                </span>
                <div className="h-6 w-6 rounded-full bg-[#9b87f5]/20 flex items-center justify-center text-[10px] font-bold text-[#7E69AB]">
                  {doc.owner}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DocumentRepositoryMockup;
