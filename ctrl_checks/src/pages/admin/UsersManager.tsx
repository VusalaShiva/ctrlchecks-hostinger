import { useCallback, useEffect, useState } from 'react';
import { Trash2, RefreshCw, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { AdminChromeHeader } from '@/components/layout/AdminChromeHeader';
import { deleteUser, getAllUsers, updateUserRole, type AdminUser } from '@/lib/api/admin';
import type { Database } from '@/integrations/aws/types';

type AppRole = Database['public']['Enums']['app_role'];

export default function UsersManager() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [updatingRoleUserId, setUpdatingRoleUserId] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const { toast } = useToast();

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      toast({
        title: 'Failed to load users',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  async function handleRefresh() {
    try {
      setRefreshing(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      toast({
        title: 'Failed to refresh users',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setRefreshing(false);
    }
  }

  async function handleRoleChange(userId: string, role: AppRole) {
    try {
      setUpdatingRoleUserId(userId);
      await updateUserRole(userId, role);
      setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, role } : user)));
      toast({
        title: 'Role updated',
        description: `User role changed to ${role}`,
      });
    } catch (error) {
      toast({
        title: 'Failed to update role',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setUpdatingRoleUserId(null);
    }
  }

  async function handleDeleteUser(user: AdminUser) {
    const confirmed = window.confirm(`Delete user "${user.email}"? This action cannot be undone.`);
    if (!confirmed) {
      return;
    }

    try {
      setDeletingUserId(user.id);
      await deleteUser(user.id);
      setUsers((prev) => prev.filter((item) => item.id !== user.id));
      toast({
        title: 'User deleted',
        description: `${user.email} has been removed`,
      });
    } catch (error) {
      toast({
        title: 'Failed to delete user',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setDeletingUserId(null);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminChromeHeader />
      <div className="container mx-auto space-y-6 p-6">
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading users...</p>
      ) : (
      <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users Management</h1>
          <p className="text-muted-foreground mt-1">
            Rendered from database: name, email, status, role, and delete controls.
          </p>
        </div>
        <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Total users: {users.length}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">View</TableHead>
                <TableHead className="text-right">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.suspended ? (
                      <Badge variant="destructive">Suspended</Badge>
                    ) : (
                      <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onValueChange={(value: AppRole) => handleRoleChange(user.id, value)}
                      disabled={updatingRoleUserId === user.id}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">admin</SelectItem>
                        <SelectItem value="moderator">moderator</SelectItem>
                        <SelectItem value="user">user</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/admin/users/${user.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteUser(user)}
                      disabled={deletingUserId === user.id}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      </>
      )}
      </div>
    </div>
  );
}
