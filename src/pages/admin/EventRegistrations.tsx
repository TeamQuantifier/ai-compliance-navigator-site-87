import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download, Users, Search } from 'lucide-react';
import { format } from 'date-fns';

interface Registration {
  id: string;
  created_at: string;
  event_slug: string;
  event_title: string | null;
  first_name: string;
  work_email: string;
  company: string;
  role: string;
  company_size: string;
  nis2_qualifier: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

const ROLE_LABELS: Record<string, string> = {
  management: 'Management',
  'it-security': 'IT / Security',
  'compliance-risk': 'Compliance / Risk',
  other: 'Inne',
};

const NIS2_LABELS: Record<string, string> = {
  yes: 'Tak',
  no: 'Nie',
  'not-sure': 'Nie wiem',
};

export default function EventRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterEvent, setFilterEvent] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = async () => {
    const { data, error } = await supabase
      .from('event_registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setRegistrations(data);
    }
    setLoading(false);
  };

  const uniqueEvents = [...new Set(registrations.map(r => r.event_slug))];

  const filtered = registrations.filter(r => {
    if (filterEvent !== 'all' && r.event_slug !== filterEvent) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.first_name.toLowerCase().includes(q) ||
        r.work_email.toLowerCase().includes(q) ||
        r.company.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const exportCsv = () => {
    const headers = ['Data', 'Event', 'Imię', 'Email', 'Firma', 'Stanowisko', 'Wielkość firmy', 'NIS2?', 'UTM Source', 'UTM Medium', 'UTM Campaign'];
    const rows = filtered.map(r => [
      format(new Date(r.created_at), 'yyyy-MM-dd HH:mm'),
      r.event_slug,
      r.first_name,
      r.work_email,
      r.company,
      ROLE_LABELS[r.role] || r.role,
      r.company_size,
      NIS2_LABELS[r.nis2_qualifier] || r.nis2_qualifier,
      r.utm_source || '',
      r.utm_medium || '',
      r.utm_campaign || '',
    ]);
    const csv = [headers, ...rows].map(row => row.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `webinar-registrations-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Zapisy na webinary</h1>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Zapisy na webinary</h1>
        <Badge variant="secondary" className="text-base px-3 py-1">
          <Users className="h-4 w-4 mr-1" /> {filtered.length}
        </Badge>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Szukaj po imieniu, emailu lub firmie..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterEvent} onValueChange={setFilterEvent}>
              <SelectTrigger className="w-full sm:w-[220px]">
                <SelectValue placeholder="Filtruj event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie eventy</SelectItem>
                {uniqueEvents.map(slug => (
                  <SelectItem key={slug} value={slug}>{slug}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={exportCsv}>
              <Download className="h-4 w-4 mr-2" /> CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Imię</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Firma</TableHead>
                  <TableHead>Stanowisko</TableHead>
                  <TableHead>Wielkość</TableHead>
                  <TableHead>NIS2?</TableHead>
                  <TableHead>UTM</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                      Brak zapisów
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map(r => (
                    <TableRow key={r.id}>
                      <TableCell className="whitespace-nowrap text-sm">
                        {format(new Date(r.created_at), 'dd.MM.yyyy HH:mm')}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">{r.event_slug}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{r.first_name}</TableCell>
                      <TableCell className="text-sm">{r.work_email}</TableCell>
                      <TableCell className="text-sm">{r.company}</TableCell>
                      <TableCell className="text-sm">{ROLE_LABELS[r.role] || r.role}</TableCell>
                      <TableCell className="text-sm">{r.company_size}</TableCell>
                      <TableCell>
                        <Badge variant={r.nis2_qualifier === 'yes' ? 'default' : 'secondary'} className="text-xs">
                          {NIS2_LABELS[r.nis2_qualifier] || r.nis2_qualifier}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {r.utm_source && <span>{r.utm_source}</span>}
                        {r.utm_medium && <span> / {r.utm_medium}</span>}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
