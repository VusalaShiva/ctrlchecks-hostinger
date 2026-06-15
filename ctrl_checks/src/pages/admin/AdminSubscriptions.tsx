import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AdminChromeHeader } from "@/components/layout/AdminChromeHeader";
import { awsClient } from "@/integrations/aws/client";
import { getBackendUrl } from "@/lib/api/getBackendUrl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  CreditCard,
  Search,
  Loader2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Zap,
  Crown,
  Shield,
  Users,
} from "lucide-react";

interface UserRow {
  id: string;
  email: string;
  workflowCount: number;
  createdAt: string;
  subscription: {
    id: string;
    planName: string;
    workflowLimit: number;
    status: string;
    startedAt: string;
    expiresAt?: string;
  } | null;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const PLAN_ICON: Record<string, React.ReactNode> = {
  Free: <Shield className="h-3.5 w-3.5" />,
  Pro: <Zap className="h-3.5 w-3.5" />,
  Enterprise: <Crown className="h-3.5 w-3.5" />,
};

const PLAN_BADGE: Record<string, string> = {
  Free: "bg-muted text-muted-foreground border-border",
  Pro: "bg-primary/10 text-primary border-primary/30",
  Enterprise: "bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/30 dark:text-amber-400",
};

export default function AdminSubscriptions() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [upgradingUser, setUpgradingUser] = useState<string | null>(null);

  const fetchUsers = useCallback(async (page = 1, searchTerm = "") => {
    setLoading(true);
    try {
      const session = await awsClient.auth.getSession();
      const token = session.data.session?.access_token;
      if (!token) { navigate("/signin"); return; }

      const backendUrl = getBackendUrl();
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
        ...(searchTerm ? { search: searchTerm } : {}),
      });

      const res = await fetch(`${backendUrl}/api/admin/subscriptions/users?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 403) {
        toast({ title: "Access Denied", description: "Admin access required", variant: "destructive" });
        navigate("/dashboard");
        return;
      }

      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data.users || []);
      setPagination(data.pagination || { page: 1, limit: 20, total: 0, totalPages: 0 });
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to load users", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchUsers(1, search);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers(1, search);
  };

  const handleUpgrade = async (userId: string, planName: string) => {
    setUpgradingUser(userId);
    try {
      const session = await awsClient.auth.getSession();
      const token = session.data.session?.access_token;
      if (!token) return;

      const backendUrl = getBackendUrl();
      const res = await fetch(`${backendUrl}/api/admin/subscriptions/upgrade/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planName, notes: "Admin manual upgrade" }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to upgrade");
      }

      toast({ title: "Subscription Updated", description: `User upgraded to ${planName}` });
      fetchUsers(pagination.page, search);
    } catch (err: any) {
      toast({ title: "Upgrade Failed", description: err.message, variant: "destructive" });
    } finally {
      setUpgradingUser(null);
    }
  };

  const planCounts = users.reduce((acc, u) => {
    const plan = u.subscription?.planName || "Free";
    acc[plan] = (acc[plan] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-background">
      <AdminChromeHeader />
      <div className="container mx-auto p-6 space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-primary" />
              Subscription Management
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage user subscriptions and billing
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => fetchUsers(pagination.page, search)}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Users", value: pagination.total, icon: <Users className="h-4 w-4" /> },
            { label: "Free", value: planCounts["Free"] || 0, icon: <Shield className="h-4 w-4 text-muted-foreground" /> },
            { label: "Pro", value: planCounts["Pro"] || 0, icon: <Zap className="h-4 w-4 text-primary" /> },
            { label: "Enterprise", value: planCounts["Enterprise"] || 0, icon: <Crown className="h-4 w-4 text-amber-500" /> },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-4 pb-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <Button type="submit" size="sm" className="h-9">Search</Button>
        </form>

        {/* Table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Users ({pagination.total})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-sm">No users found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">User</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Plan</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Workflows</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Joined</th>
                      <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => {
                      const planName = user.subscription?.planName || "Free";
                      const isUpgrading = upgradingUser === user.id;
                      return (
                        <tr key={user.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3">
                            <div>
                              <p className="font-medium truncate max-w-[200px]">{user.email}</p>
                              <p className="text-xs text-muted-foreground font-mono">{user.id.slice(0, 8)}...</p>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className={`text-xs ${PLAN_BADGE[planName]}`}>
                              <span className="mr-1">{PLAN_ICON[planName]}</span>
                              {planName}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-medium">{user.workflowCount}</span>
                            <span className="text-muted-foreground"> / {user.subscription?.workflowLimit || 2}</span>
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              variant="outline"
                              className={
                                user.subscription?.status === "active"
                                  ? "border-green-500 text-green-600 text-xs"
                                  : "border-muted text-muted-foreground text-xs"
                              }
                            >
                              {user.subscription?.status || "active"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground text-xs">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Select
                              onValueChange={(val) => handleUpgrade(user.id, val)}
                              disabled={isUpgrading}
                            >
                              <SelectTrigger className="h-7 w-32 text-xs">
                                {isUpgrading ? (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                  <SelectValue placeholder="Change plan" />
                                )}
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Free">Free</SelectItem>
                                <SelectItem value="Pro">Pro</SelectItem>
                                <SelectItem value="Enterprise">Enterprise</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between text-sm">
            <p className="text-muted-foreground">
              Page {pagination.page} of {pagination.totalPages} · {pagination.total} users
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page <= 1}
                onClick={() => fetchUsers(pagination.page - 1, search)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => fetchUsers(pagination.page + 1, search)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
