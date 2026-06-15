import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Ban, UserRoundCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth';
import { AdminChromeHeader } from '@/components/layout/AdminChromeHeader';
import { getUserDetails, setUserSuspended, type AdminUserDetails } from '@/lib/api/admin';

function formatDate(value: string | null): string {
  if (!value) {
    return 'N/A';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'N/A';
  }

  return date.toLocaleString();
}

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user: currentUser } = useAuth();

  const [user, setUser] = useState<AdminUserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [suspending, setSuspending] = useState(false);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [reinstateDialogOpen, setReinstateDialogOpen] = useState(false);

  const loadUserDetails = useCallback(async (targetUserId: string, keepLoadingState: boolean = true) => {
    if (keepLoadingState) {
      setLoading(true);
    }

    setRefreshing(!keepLoadingState);

    if (!targetUserId) {
      setLoading(false);
      setRefreshing(false);
      return;
    }

    try {
      const data = await getUserDetails(targetUserId);
      setUser(data);
    } catch (error) {
      toast({
        title: 'Failed to load user details',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [toast]);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    void (async () => {
      await loadUserDetails(id);
    })();
  }, [id, loadUserDetails]);

  async function handleRefresh() {
    if (!id) {
      return;
    }

    await loadUserDetails(id, false);
  }

  const isSelf = Boolean(id && currentUser?.id === id);
  const isAdminTarget = user?.role === 'admin';
  const canSuspend = !isSelf && !isAdminTarget && user && !user.suspended;
  const canReinstate = !isSelf && user?.suspended;

  async function confirmSuspend() {
    if (!id) return;
    setSuspendDialogOpen(false);
    try {
      setSuspending(true);
      await setUserSuspended(id, true);
      await loadUserDetails(id, false);
      toast({
        title: 'User suspended',
        description: 'They can no longer sign in until reinstated.',
      });
    } catch (error) {
      toast({
        title: 'Failed to suspend user',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setSuspending(false);
    }
  }

  async function confirmReinstate() {
    if (!id) return;
    setReinstateDialogOpen(false);
    try {
      setSuspending(true);
      await setUserSuspended(id, false);
      await loadUserDetails(id, false);
      toast({
        title: 'User reinstated',
        description: 'They can sign in again.',
      });
    } catch (error) {
      toast({
        title: 'Failed to reinstate user',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setSuspending(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AdminChromeHeader />
        <div className="container mx-auto p-6">
          <p className="text-sm text-muted-foreground">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <AdminChromeHeader />
        <div className="container mx-auto space-y-4 p-6">
          <p className="text-muted-foreground">User not found.</p>
          <Button variant="outline" onClick={() => navigate('/admin/users')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminChromeHeader />
      <div className="container mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">User Details</h1>
          <p className="text-muted-foreground">Detailed profile and workflow usage overview.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/admin/users')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          {canSuspend && (
            <Button
              variant="secondary"
              disabled={suspending}
              onClick={() => setSuspendDialogOpen(true)}
            >
              <Ban className="mr-2 h-4 w-4" />
              Suspend user
            </Button>
          )}
          {canReinstate && (
            <Button
              variant="default"
              disabled={suspending}
              onClick={() => setReinstateDialogOpen(true)}
            >
              <UserRoundCheck className="mr-2 h-4 w-4" />
              Reinstate user
            </Button>
          )}
        </div>
      </div>

      <AlertDialog open={suspendDialogOpen} onOpenChange={setSuspendDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Suspend this user?</AlertDialogTitle>
            <AlertDialogDescription>
              They will be signed out and blocked from signing in (password and OAuth) until you reinstate
              them. Their data is not deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => void confirmSuspend()}
            >
              Suspend
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={reinstateDialogOpen} onOpenChange={setReinstateDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reinstate this user?</AlertDialogTitle>
            <AlertDialogDescription>
              They will be allowed to sign in again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => void confirmReinstate()}>Reinstate</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card>
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <div className="flex flex-wrap gap-2">
              {user.suspended ? (
                <Badge variant="destructive">Suspended</Badge>
              ) : (
                <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>{user.status}</Badge>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Role</p>
            <p className="font-medium">{user.role}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Subscription Taken</p>
            <p className="font-medium">{user.subscriptionTaken ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Workflows</p>
            <p className="font-medium">{user.totalWorkflowsBuilt}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">First Sign In</p>
            <p className="font-medium">{formatDate(user.firstSignInAt)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Sign In</p>
            <p className="font-medium">{formatDate(user.lastSignInAt)}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Workflows</CardTitle>
          <CardDescription>Workflow title, run count, and status.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Workflow Title</TableHead>
                <TableHead>Workflow runs</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {user.workflows.map((workflow) => (
                <TableRow key={workflow.id}>
                  <TableCell className="font-medium">{workflow.title}</TableCell>
                  <TableCell>{workflow.workflowRuns ?? workflow.apiCalls ?? 0}</TableCell>
                  <TableCell>
                    <Badge variant={workflow.status === 'active' ? 'default' : 'secondary'}>
                      {workflow.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {user.workflows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">
                    No workflows found for this user.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
