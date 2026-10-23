
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { FileText, Bell, CheckCircle2, AlertTriangle, BrainCircuit, MessageSquare, ClipboardCheck, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useMockupText } from '@/lib/mockup-text';

const LegalPoliciesDashboard = () => {
  const mt = useMockupText();
  // Sample data for Legal Policies dashboard
  const policyComplianceData = [
    { month: mt({ en: 'Jan', pl: 'sty', cs: 'led' }), value: 78 },
    { month: mt({ en: 'Feb', pl: 'lut', cs: 'úno' }), value: 82 },
    { month: mt({ en: 'Mar', pl: 'mar', cs: 'bře' }), value: 85 },
    { month: mt({ en: 'Apr', pl: 'kwi', cs: 'dub' }), value: 89 },
    { month: mt({ en: 'May', pl: 'maj', cs: 'kvě' }), value: 92 },
    { month: mt({ en: 'Jun', pl: 'cze', cs: 'čvn' }), value: 95 }
  ];

  const documentsByStatusData = [
    { name: mt({ en: 'Acknowledged', pl: 'Potwierdzone' }), value: 85 },
    { name: mt({ en: 'Pending', pl: 'Oczekujące' }), value: 12 },
    { name: mt({ en: 'Expired', pl: 'Przeterminowane' }), value: 3 },
  ];

  const COLORS = ['#22c55e', '#f97316', '#ef4444'];

  const policyDistributionData = [
    { month: mt({ en: 'Jan', pl: 'sty', cs: 'led' }), employees: 120 },
    { month: mt({ en: 'Feb', pl: 'lut', cs: 'úno' }), employees: 156 },
    { month: mt({ en: 'Mar', pl: 'mar', cs: 'bře' }), employees: 187 },
    { month: mt({ en: 'Apr', pl: 'kwi', cs: 'dub' }), employees: 205 },
    { month: mt({ en: 'May', pl: 'maj', cs: 'kvě' }), employees: 230 },
    { month: mt({ en: 'Jun', pl: 'cze', cs: 'čvn' }), employees: 255 }
  ];

  const policyCategories = [
    { name: mt({ en: 'Code of Conduct', pl: 'Kodeks etyki' }), progress: 96 },
    { name: mt({ en: 'Data Protection', pl: 'Ochrona danych' }), progress: 88 },
    { name: mt({ en: 'Anti-Corruption', pl: 'Antykorupcja' }), progress: 92 }
  ];

  const aiAgentActions = [
    { action: mt({ en: 'Policy update notification sent to Sales team', pl: 'Powiadomienie o aktualizacji polityki wysłane do zespołu sprzedaży' }), time: mt({ en: '2 hours ago', pl: '2 godz. temu' }) },
    { action: mt({ en: 'GDPR compliance reminder scheduled for next week', pl: 'Przypomnienie o RODO zaplanowane na przyszły tydzień' }), time: mt({ en: '1 day ago', pl: '1 dzień temu' }) },
    { action: mt({ en: 'Anti-corruption training completion report generated', pl: 'Wygenerowano raport ze szkolenia antykorupcyjnego' }), time: mt({ en: 'Yesterday', pl: 'wczoraj' }) },
    { action: mt({ en: 'New employees onboarding policy package prepared', pl: 'Przygotowano pakiet polityk dla nowych pracowników' }), time: mt({ en: '3 days ago', pl: '3 dni temu' }) },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Policy Compliance Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <FileText className="h-4 w-4 mr-2 text-purple-600" />
              {mt({ en: 'Policy Compliance Status', pl: 'Status zgodności z politykami' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600 mb-2">95%</div>
            <p className="text-xs text-slate-500 mb-2">{mt({ en: 'Overall acknowledgment rate', pl: 'Ogólny wskaźnik potwierdzeń' })}</p>
            <div className="h-32">
              <ChartContainer
                config={{
                  compliance: {
                    theme: {
                      light: '#9b87f5',
                      dark: '#7E69AB'
                    }
                  }
                }}
              >
                <BarChart data={policyComplianceData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis hide domain={[70, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" name={mt({ en: 'compliance', pl: 'zgodność' })} radius={[4, 4, 0, 0]} barSize={12} />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Documentation Status */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <ClipboardCheck className="h-4 w-4 mr-2 text-purple-600" />
              {mt({ en: 'Documentation Status', pl: 'Status dokumentacji' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ChartContainer
                config={{
                  status: {
                    theme: {
                      light: '#9b87f5',
                      dark: '#7E69AB'
                    }
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={documentsByStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {documentsByStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                      wrapperStyle={{ fontSize: '10px' }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Policy Categories */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Shield className="h-4 w-4 mr-2 text-purple-600" />
              {mt({ en: 'Policy Categories', pl: 'Kategorie polityk' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {policyCategories.map((category) => (
                <div key={category.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium">{category.name}</span>
                    <span className="text-xs font-semibold">{category.progress}%</span>
                  </div>
                  <Progress value={category.progress} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Policy Distribution Trend */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Bell className="h-4 w-4 mr-2 text-purple-600" />
              {mt({ en: 'Policy Distribution Trend', pl: 'Trend dystrybucji polityk' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer
                config={{
                  employees: {
                    theme: {
                      light: '#9b87f5',
                      dark: '#7E69AB'
                    }
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={policyDistributionData}>
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      width={30}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="employees"
                      name={mt({ en: 'employees', pl: 'pracownicy' })}
                      stroke="#9b87f5"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* AI Agent Activity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <BrainCircuit className="h-4 w-4 mr-2 text-purple-600" />
              {mt({ en: 'AI Agent Activity', pl: 'Aktywność agenta AI' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiAgentActions.map((item, index) => (
                <div key={index} className="flex items-start pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <BrainCircuit className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm">{item.action}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LegalPoliciesDashboard;
