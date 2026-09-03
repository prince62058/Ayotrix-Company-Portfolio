import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ShieldAlert,
  Ban,
  Mail,
  Globe,
  Phone,
  Search,
  Plus,
  Trash2,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Clock,
  Filter,
  RefreshCw,
  UserX,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

interface BannedUserItem {
  id: string;
  type: "email" | "ip" | "phone" | "all";
  value: string;
  name?: string;
  email?: string;
  phone?: string;
  ip?: string;
  reason: string;
  bannedBy: string;
  isActive: boolean;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface BanStats {
  total: number;
  active: number;
  bannedEmails: number;
  bannedIps: number;
  bannedPhones: number;
}

const COMMON_REASONS = [
  "Spamming Contact Form",
  "Fake / Bot Inquiries",
  "Abusive / Harassment Message",
  "DDoS / Malicious Probing",
  "Repeated Policy Violations",
];

export default function AdminBannedUsers() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all_types");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [banType, setBanType] = useState<"email" | "ip" | "phone">("email");
  const [banValue, setBanValue] = useState("");
  const [banName, setBanName] = useState("");
  const [banReason, setBanReason] = useState(COMMON_REASONS[0]);
  const [customReason, setCustomReason] = useState("");
  const [banDuration, setBanDuration] = useState("permanent");

  // Fetch Ban List
  const {
    data: bans = [],
    isLoading,
    isRefetching,
    refetch,
  } = useQuery<BannedUserItem[]>({
    queryKey: ["admin-bans", search, typeFilter, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      if (typeFilter && typeFilter !== "all_types") params.set("type", typeFilter);
      if (statusFilter !== "all") params.set("status", statusFilter);

      const res = await fetch(`/api/bans?${params.toString()}`);
      if (!res.ok) {
        throw new Error("Failed to load ban list");
      }
      return res.json();
    },
  });

  // Fetch Stats
  const { data: stats } = useQuery<BanStats>({
    queryKey: ["admin-bans-stats"],
    queryFn: async () => {
      const res = await fetch("/api/bans/stats");
      if (!res.ok) return { total: 0, active: 0, bannedEmails: 0, bannedIps: 0, bannedPhones: 0 };
      return res.json();
    },
  });

  // Add Ban Mutation
  const addBanMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch("/api/bans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create ban");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-bans"] });
      queryClient.invalidateQueries({ queryKey: ["admin-bans-stats"] });
      toast({ title: "Ban Applied", description: "The identifier has been added to the ban list." });
      setIsAddDialogOpen(false);
      resetForm();
    },
    onError: (err: any) => {
      toast({ title: "Action Failed", description: err.message, variant: "destructive" });
    },
  });

  // Toggle Ban Status Mutation
  const toggleBanMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/bans/${id}/toggle`, { method: "PATCH" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to toggle status");
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-bans"] });
      queryClient.invalidateQueries({ queryKey: ["admin-bans-stats"] });
      toast({ title: "Status Updated", description: data.message });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  // Delete Ban Mutation
  const deleteBanMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/bans/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete ban record");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-bans"] });
      queryClient.invalidateQueries({ queryKey: ["admin-bans-stats"] });
      toast({ title: "Record Deleted", description: "The ban record has been permanently removed." });
      setDeleteConfirmId(null);
    },
    onError: (err: any) => {
      toast({ title: "Delete Failed", description: err.message, variant: "destructive" });
    },
  });

  const resetForm = () => {
    setBanType("email");
    setBanValue("");
    setBanName("");
    setBanReason(COMMON_REASONS[0]);
    setCustomReason("");
    setBanDuration("permanent");
  };

  const handleCreateBan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!banValue.trim()) {
      toast({ title: "Missing Value", description: "Please enter a target to ban.", variant: "destructive" });
      return;
    }

    let expiresAt: string | null = null;
    const now = new Date();
    if (banDuration === "24h") {
      now.setHours(now.getHours() + 24);
      expiresAt = now.toISOString();
    } else if (banDuration === "7d") {
      now.setDate(now.getDate() + 7);
      expiresAt = now.toISOString();
    } else if (banDuration === "30d") {
      now.setDate(now.getDate() + 30);
      expiresAt = now.toISOString();
    }

    const finalReason = banReason === "Other" ? customReason : banReason;

    addBanMutation.mutate({
      type: banType,
      value: banValue.trim(),
      name: banName.trim(),
      reason: finalReason || "Spam or policy violation",
      expiresAt,
      isActive: true,
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4 text-blue-400" />;
      case "ip":
        return <Globe className="h-4 w-4 text-amber-400" />;
      case "phone":
        return <Phone className="h-4 w-4 text-purple-400" />;
      default:
        return <ShieldAlert className="h-4 w-4 text-red-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-white tracking-tight">Banned Users & Blocklist</h1>
            <Badge variant="outline" className="border-red-500/40 text-red-400 bg-red-500/10 px-2.5 py-0.5 text-xs font-semibold">
              Security Active
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Manage blocked email addresses, phone numbers, and IP addresses to prevent spam inquiries and unauthorized requests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isRefetching}
            className="border-border hover:bg-accent text-xs"
          >
            <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${isRefetching ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Button
            onClick={() => {
              resetForm();
              setIsAddDialogOpen(true);
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-[0_0_20px_rgba(239,68,68,0.25)]"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Add New Ban
          </Button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Restrictions</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stats?.total ?? 0}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">All-time blacklist records</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <ShieldAlert className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Active Bans</p>
              <h3 className="text-2xl font-bold text-red-400 mt-1">{stats?.active ?? 0}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Currently enforced blocks</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <Ban className="h-6 w-6 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Banned Emails</p>
              <h3 className="text-2xl font-bold text-blue-400 mt-1">{stats?.bannedEmails ?? 0}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Restricted mailboxes</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Mail className="h-6 w-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Banned IPs</p>
              <h3 className="text-2xl font-bold text-amber-400 mt-1">{stats?.bannedIps ?? 0}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Network addresses blocked</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Globe className="h-6 w-6 text-amber-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter Bar */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by email, phone, IP address, user name, or reason..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-background/50 border-border text-sm rounded-xl focus-visible:ring-primary"
              />
            </div>

            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px] bg-background/50 border-border rounded-xl text-xs font-medium">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all_types">All Types</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="ip">IP Address</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-background/50 border-border rounded-xl text-xs font-medium">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                  <SelectItem value="inactive">Lifted / Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Table */}
      <Card className="bg-card border-border rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : bans.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-muted/20 border border-muted/30 flex items-center justify-center">
                <UserX className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-base font-semibold text-white">No Banned Users Found</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                {search || typeFilter !== "all_types" || statusFilter !== "all"
                  ? "Try clearing filters to see existing banned records."
                  : "No entries have been restricted yet. Click 'Add New Ban' or use the quick ban action in Contacts."}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="w-[220px]">Target Identifier</TableHead>
                  <TableHead className="w-[180px]">Associated Info</TableHead>
                  <TableHead>Ban Reason</TableHead>
                  <TableHead className="w-[130px]">Duration / Date</TableHead>
                  <TableHead className="w-[110px]">Status</TableHead>
                  <TableHead className="w-[120px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bans.map((item) => (
                  <TableRow key={item.id} className="border-border hover:bg-accent/30">
                    {/* Identifier */}
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-background border border-border">
                          {getTypeIcon(item.type)}
                        </div>
                        <div>
                          <div className="font-semibold text-white text-sm font-mono break-all">{item.value}</div>
                          <Badge variant="secondary" className="mt-1 text-[10px] uppercase tracking-wider py-0 px-1.5 font-semibold">
                            {item.type}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>

                    {/* Associated info */}
                    <TableCell className="py-4 text-xs">
                      {item.name ? <div className="font-medium text-white mb-0.5">{item.name}</div> : null}
                      {item.email && item.type !== "email" ? (
                        <div className="text-muted-foreground truncate">{item.email}</div>
                      ) : null}
                      {item.phone && item.type !== "phone" ? (
                        <div className="text-muted-foreground truncate">{item.phone}</div>
                      ) : null}
                      {item.ip && item.type !== "ip" ? (
                        <div className="text-muted-foreground font-mono text-[11px] mt-0.5">IP: {item.ip}</div>
                      ) : null}
                      {!item.name && !item.email && !item.phone && !item.ip && (
                        <span className="text-muted-foreground/60">—</span>
                      )}
                    </TableCell>

                    {/* Reason */}
                    <TableCell className="py-4">
                      <div className="text-sm text-foreground/90 font-medium">{item.reason}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">By: {item.bannedBy || "admin"}</div>
                    </TableCell>

                    {/* Date / Expiry */}
                    <TableCell className="py-4 text-xs text-muted-foreground">
                      <div>{new Date(item.createdAt).toLocaleDateString()}</div>
                      {item.expiresAt ? (
                        <div className="flex items-center gap-1 text-[11px] text-amber-400/80 mt-1">
                          <Clock className="h-3 w-3" />
                          <span>Expires {new Date(item.expiresAt).toLocaleDateString()}</span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-muted-foreground/70 uppercase">Permanent</span>
                      )}
                    </TableCell>

                    {/* Status */}
                    <TableCell className="py-4">
                      {item.isActive ? (
                        <Badge className="bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/20 text-xs py-0.5">
                          Blocked
                        </Badge>
                      ) : (
                        <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/10 text-xs py-0.5">
                          Lifted
                        </Badge>
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleBanMutation.mutate(item.id)}
                          disabled={toggleBanMutation.isPending}
                          title={item.isActive ? "Unban user" : "Re-apply ban"}
                          className={`h-8 px-2 text-xs font-semibold ${
                            item.isActive
                              ? "text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                              : "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          }`}
                        >
                          {item.isActive ? "Unban" : "Re-ban"}
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteConfirmId(item.id)}
                          title="Delete Ban Record"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add Ban Modal Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-card border-border text-foreground">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2 text-white">
              <ShieldAlert className="h-5 w-5 text-red-500" />
              Add User / IP Restriction
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs">
              Directly ban an email, IP address, or phone number from submitting contact forms or accessing sensitive services.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateBan} className="space-y-4 pt-2">
            {/* Type selector */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-white">Restriction Target Type</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant={banType === "email" ? "default" : "outline"}
                  onClick={() => setBanType("email")}
                  className={`text-xs py-2 h-auto justify-center gap-1.5 ${
                    banType === "email" ? "bg-primary text-white" : "border-border"
                  }`}
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </Button>
                <Button
                  type="button"
                  variant={banType === "ip" ? "default" : "outline"}
                  onClick={() => setBanType("ip")}
                  className={`text-xs py-2 h-auto justify-center gap-1.5 ${
                    banType === "ip" ? "bg-primary text-white" : "border-border"
                  }`}
                >
                  <Globe className="h-3.5 w-3.5" />
                  IP Address
                </Button>
                <Button
                  type="button"
                  variant={banType === "phone" ? "default" : "outline"}
                  onClick={() => setBanType("phone")}
                  className={`text-xs py-2 h-auto justify-center gap-1.5 ${
                    banType === "phone" ? "bg-primary text-white" : "border-border"
                  }`}
                >
                  <Phone className="h-3.5 w-3.5" />
                  Phone
                </Button>
              </div>
            </div>

            {/* Target Value */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-white">
                {banType === "email" && "Target Email Address *"}
                {banType === "ip" && "Target IP Address *"}
                {banType === "phone" && "Target Phone Number *"}
              </Label>
              <Input
                required
                placeholder={
                  banType === "email"
                    ? "spammer@example.com"
                    : banType === "ip"
                    ? "192.168.1.100"
                    : "+91 98765 43210"
                }
                value={banValue}
                onChange={(e) => setBanValue(e.target.value)}
                className="bg-background border-border text-sm rounded-xl font-mono"
              />
            </div>

            {/* Associated Name (Optional) */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground">User Name / Note (Optional)</Label>
              <Input
                placeholder="e.g. John Doe / Bot Spammer"
                value={banName}
                onChange={(e) => setBanName(e.target.value)}
                className="bg-background border-border text-sm rounded-xl"
              />
            </div>

            {/* Reason selection */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-white">Ban Reason</Label>
              <div className="flex flex-wrap gap-1.5">
                {COMMON_REASONS.map((reason) => (
                  <button
                    key={reason}
                    type="button"
                    onClick={() => {
                      setBanReason(reason);
                      setCustomReason("");
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                      banReason === reason
                        ? "bg-red-500/20 text-red-300 border border-red-500/40 font-medium"
                        : "bg-muted/30 text-muted-foreground hover:text-white border border-border"
                    }`}
                  >
                    {reason}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setBanReason("Other")}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                    banReason === "Other"
                      ? "bg-red-500/20 text-red-300 border border-red-500/40 font-medium"
                      : "bg-muted/30 text-muted-foreground hover:text-white border border-border"
                  }`}
                >
                  Custom Reason
                </button>
              </div>

              {banReason === "Other" && (
                <Input
                  required
                  placeholder="Enter custom ban reason..."
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  className="bg-background border-border text-sm rounded-xl mt-2"
                />
              )}
            </div>

            {/* Ban Duration */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-white">Ban Duration</Label>
              <Select value={banDuration} onValueChange={setBanDuration}>
                <SelectTrigger className="bg-background border-border rounded-xl text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="permanent">Permanent Restriction</SelectItem>
                  <SelectItem value="24h">24 Hours</SelectItem>
                  <SelectItem value="7d">7 Days</SelectItem>
                  <SelectItem value="30d">30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter className="pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
                className="border-border"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={addBanMutation.isPending}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                {addBanMutation.isPending ? "Applying Ban..." : "Confirm & Ban"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!deleteConfirmId} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
        <DialogContent className="sm:max-w-[400px] bg-card border-border text-foreground">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2 text-white">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Delete Ban Record?
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs pt-1">
              Are you sure you want to completely delete this ban record? The user/IP will be allowed to submit inquiries again.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-3 flex gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmId(null)}
              className="border-border"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirmId && deleteBanMutation.mutate(deleteConfirmId)}
              disabled={deleteBanMutation.isPending}
            >
              {deleteBanMutation.isPending ? "Deleting..." : "Delete Permanently"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
