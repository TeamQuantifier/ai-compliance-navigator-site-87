import { useEffect, useState } from 'react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Trash2, Shield, ShieldCheck, History } from 'lucide-react';

type AppRole = 'admin' | 'editor' | 'viewer';

interface UserRow {
  user_id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  roles: AppRole[];
}

interface AuditRow {
  id: string;
  actor_email: string | null;
  target_email: string | null;
  action: string;
  role: AppRole;
  created_at: string;
}

const emailSchema = z.string().trim().email({ message: 'Invalid email' }).max(255);

export default function UsersList() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [audit, setAudit] = useState<AuditRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [addEmail, setAddEmail] = useState('');
  const [addRole, setAddRole] = useState<AppRole>('admin');
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    const [u, a] = await Promise.all([
      supabase.rpc('list_users_with_roles'),
      supabase.rpc('list_role_audit_log'),
    ]);
    if (u.error) toast({ title: 'Failed to load users', description: u.error.message, variant: 'destructive' });
    else setUsers((u.data as UserRow[]) || []);
    if (!a.error) setAudit((a.data as AuditRow[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const grantRole = async () => {
    const parsed = emailSchema.safeParse(addEmail);
    if (!parsed.success) {
      toast({ title: 'Invalid email', description: parsed.error.errors[0].message, variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    const target = users.find(u => u.email.toLowerCase() === parsed.data.toLowerCase());
    if (!target) {
      toast({
        title: 'User not found',
        description: 'The user must first sign up at /admin/login. Then come back to grant a role.',
        variant: 'destructive',
      });
      setSubmitting(false);
      return;
    }
    if (target.roles.includes(addRole)) {
      toast({ title: 'Already assigned', description: `User already has role "${addRole}".` });
      setSubmitting(false);
      return;
    }
    const { error } = await supabase
      .from('user_roles')
      .insert({ user_id: target.user_id, role: addRole });
    setSubmitting(false);
    if (error) {
      toast({ title: 'Failed to grant role', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Role granted', description: `${addRole} → ${target.email}` });
      setAddOpen(false);
      setAddEmail('');
      load();
    }
  };

  const revokeRole = async (userId: string, role: AppRole, email: string) => {
    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userId)
      .eq('role', role);
    if (error) {
      toast({
        title: 'Failed to revoke',
        description: error.message.includes('last admin')
          ? 'You cannot remove the last admin.'
          : error.message,
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Role revoked', description: `${role} ✕ ${email}` });
      load();
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7" /> Admins &amp; Users
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage who can access the CMS. Signed in as <span className="font-medium">{user?.email}</span>.
          </p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> Grant role</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Grant role to user</DialogTitle>
              <DialogDescription>
                The user must already exist (have signed up at /admin/login).
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="user@quantifier.ai"
                  value={addEmail}
                  onChange={e => setAddEmail(e.target.value)}
                  maxLength={255}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Role</label>
                <Select value={addRole} onValueChange={(v) => setAddRole(v as AppRole)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">admin — full CMS access</SelectItem>
                    <SelectItem value="editor">editor — reserved for future use</SelectItem>
                    <SelectItem value="viewer">viewer — reserved for future use</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
              <Button onClick={grantRole} disabled={submitting}>
                {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Grant
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" /> Users</CardTitle>
          <CardDescription>All users that have signed up. Only admins can access /admin.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Signed up</TableHead>
                  <TableHead>Last sign-in</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(u => {
                  const isSelf = u.user_id === user?.id;
                  return (
                    <TableRow key={u.user_id}>
                      <TableCell className="font-medium">
                        {u.email}{isSelf && <span className="text-xs text-muted-foreground ml-2">(you)</span>}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {u.roles.length === 0 && <span className="text-xs text-muted-foreground">—</span>}
                          {u.roles.map(r => (
                            <Badge key={r} variant={r === 'admin' ? 'default' : 'secondary'}>{r}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(u.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleDateString() : 'never'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          {u.roles.map(r => (
                            <AlertDialog key={r}>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  disabled={isSelf && r === 'admin'}
                                  title={isSelf && r === 'admin' ? 'You cannot revoke your own admin role' : `Revoke ${r}`}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="ml-1 text-xs">{r}</span>
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Revoke {r} from {u.email}?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This user will immediately lose <strong>{r}</strong> permissions. The action is logged.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => revokeRole(u.user_id, r, u.email)}>
                                    Revoke
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><History className="h-5 w-5" /> Audit log</CardTitle>
          <CardDescription>Last 100 role changes.</CardDescription>
        </CardHeader>
        <CardContent>
          {audit.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">No entries yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>When</TableHead>
                  <TableHead>Actor</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Target</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {audit.map(a => (
                  <TableRow key={a.id}>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(a.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm">{a.actor_email || 'system'}</TableCell>
                    <TableCell>
                      <Badge variant={a.action === 'granted' ? 'default' : 'destructive'}>{a.action}</Badge>
                    </TableCell>
                    <TableCell><Badge variant="secondary">{a.role}</Badge></TableCell>
                    <TableCell className="text-sm">{a.target_email || '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
