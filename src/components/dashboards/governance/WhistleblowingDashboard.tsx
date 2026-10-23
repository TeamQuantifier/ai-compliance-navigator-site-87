
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { FileText, Shield, CheckCircle2, AlertTriangle, BrainCircuit, Clock, MessageSquare, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useMockupText } from '@/lib/mockup-text';

const WhistleblowingDashboard = () => {
  const mt = useMockupText();
  // Sample data for Whistleblowing dashboard
  const caseResolutionData = [
    { month: mt({ en: 'Jan', pl: 'sty', cs: 'led' }), value: 85 },
    { month: mt({ en: 'Feb', pl: 'lut', cs: 'úno' }), value: 82 },
    { month: mt({ en: 'Mar', pl: 'mar', cs: 'bře' }), value: 90 },
    { month: mt({ en: 'Apr', pl: 'kwi', cs: 'dub' }), value: 86 },
    { month: mt({ en: 'May', pl: 'maj', cs: 'kvě' }), value: 92 },
    { month: mt({ en: 'Jun', pl: 'cze', cs: 'čvn' }), value: 95 }
  ];

  const casesByStatusData = [
    { name: mt({ en: 'Resolved', pl: 'Zakończone' }), value: 24 },
    { name: mt({ en: 'In Progress', pl: 'W toku' }), value: 9 },
    { name: mt({ en: 'New', pl: 'Nowe' }), value: 3 },
  ];

  const COLORS = ['#22c55e', '#f97316', '#ef4444'];

  const reportTrendData = [
    { month: mt({ en: 'Jan', pl: 'sty', cs: 'led' }), reports: 8 },
    { month: mt({ en: 'Feb', pl: 'lut', cs: 'úno' }), reports: 12 },
    { month: mt({ en: 'Mar', pl: 'mar', cs: 'bře' }), reports: 7 },
    { month: mt({ en: 'Apr', pl: 'kwi', cs: 'dub' }), reports: 10 },
    { month: mt({ en: 'May', pl: 'maj', cs: 'kvě' }), reports: 6 },
    { month: mt({ en: 'Jun', pl: 'cze', cs: 'čvn' }), reports: 4 }
  ];

  const caseCategories = [
    { name: mt({ en: 'Ethical Concerns', pl: 'Zagadnienia etyczne' }), count: 12 },
    { name: mt({ en: 'Workplace Safety', pl: 'Bezpieczeństwo w pracy' }), count: 8 },
    { name: mt({ en: 'Compliance Issues', pl: 'Niezgodności' }), count: 16 }
  ];

  const aiAgentActions = [
    { action: mt({ en: 'Anonymous report triage completed', pl: 'Zakończono wstępną ocenę zgłoszenia anonimowego' }), time: mt({ en: '1 hour ago', pl: '1 godz. temu' }) },
    { action: mt({ en: 'Follow-up questionnaire sent to reporter', pl: 'Wysłano anketę uzupełniającą do zgłaszającego' }), time: mt({ en: '1 day ago', pl: '1 dzień temu' }) },
    { action: mt({ en: 'Case #245 evidence package prepared for review', pl: 'Przygotowano pakiet dowodów w sprawie #245' }), time: mt({ en: 'Yesterday', pl: 'wczoraj' }) },
    { action: mt({ en: 'Regulatory submission requirements verified', pl: 'Zweryfikowano wymagania zgłoszenia do organu' }), time: mt({ en: '2 days ago', pl: '2 dni temu' }) },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Case Resolution Rate */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <FileText className="h-4 w-4 mr-2 text-indigo-600" />
              {mt({ en: 'Case Resolution Rate', pl: 'Skuteczność zamykania spraw' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600 mb-2">95%</div>
            <p className="text-xs text-slate-500 mb-2">{mt({ en: 'Average time to resolution: 14 days', pl: 'Średni czas rozwiązania: 14 dni' })}</p>
            <div className="h-32">
              <ChartContainer
                config={{
                  resolution: {
                    theme: {
                      light: '#818cf8',
                      dark: '#6366f1'
                    }
                  }
                }}
              >
                <BarChart data={caseResolutionData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis hide domain={[80, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" name={mt({ en: 'resolution', pl: 'zamknięcia' })} radius={[4, 4, 0, 0]} barSize={12} />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Cases by Status */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2 text-indigo-600" />
              {mt({ en: 'Cases by Status', pl: 'Sprawy wg statusu' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ChartContainer
                config={{
                  status: {
                    theme: {
                      light: '#818cf8',
                      dark: '#6366f1'
                    }
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={casesByStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {casesByStatusData.map((entry, index) => (
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

        {/* Case Categories */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Shield className="h-4 w-4 mr-2 text-indigo-600" />
              {mt({ en: 'Report Categories', pl: 'Kategorie zgłoszeń' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {caseCategories.map((category) => (
                <div key={category.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium">{category.name}</span>
                    <span className="text-xs font-semibold">
                      {mt({ en: `${category.count} cases`, pl: `${category.count} spraw` })}
                    </span>
                  </div>
                  <Progress value={category.count * 100 / 20} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Report Trend */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <MessageSquare className="h-4 w-4 mr-2 text-indigo-600" />
              {mt({ en: 'Report Submission Trend', pl: 'Trend zgłoszeń' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer
                config={{
                  reports: {
                    theme: {
                      light: '#818cf8',
                      dark: '#6366f1'
                    }
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={reportTrendData}>
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
                      dataKey="reports"
                      name={mt({ en: 'reports', pl: 'zgłoszenia' })}
                      stroke="#818cf8"
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
              <BrainCircuit className="h-4 w-4 mr-2 text-indigo-600" />
              {mt({ en: 'AI Agent Activity', pl: 'Aktywność agenta AI' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiAgentActions.map((item, index) => (
                <div key={index} className="flex items-start pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <BrainCircuit className="h-4 w-4 text-indigo-600" />
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

export default WhistleblowingDashboard;
