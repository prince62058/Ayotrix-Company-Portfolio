import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetContacts, getGetContactsQueryKey } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { ShieldAlert, Trash2, Globe, Mail, Phone, User, Ban } from "lucide-react";

export default function AdminContacts() {
  const { data: contacts, isLoading } = useGetContacts();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Ban Modal State
  const [banModalContact, setBanModalContact] = useState<any | null>(null);
  const [banEmail, setBanEmail] = useState(true);
  const [banPhone, setBanPhone] = useState(false);
  const [banIp, setBanIp] = useState(false);
  const [banReason, setBanReason] = useState("Spam contact form submissions");
  const [isBanning, setIsBanning] = useState(false);

  // Delete State
  const [deleteContactId, setDeleteContactId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const openBanModal = (contact: any) => {
    setBanModalContact(contact);
    setBanEmail(Boolean(contact.email));
    setBanPhone(Boolean(contact.phone));
    setBanIp(Boolean(contact.ip));
    setBanReason("Spam contact form submissions");
  };

  const handleConfirmBan = async () => {
    if (!banModalContact) return;
    if (!banEmail && !banPhone && !banIp) {
      toast({
        title: "No Target Selected",
        description: "Please select at least one identifier to ban (Email, Phone, or IP).",
        variant: "destructive",
      });
      return;
    }

    setIsBanning(true);
    try {
      const res = await fetch(`/api/contacts/${banModalContact.id}/ban`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          banEmail,
          banPhone,
          banIp,
          reason: banReason,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to ban user");

      toast({
        title: "User Banned Successfully",
        description: data.message || `Restrictions applied to ${banModalContact.name}`,
      });
      queryClient.invalidateQueries({ queryKey: ["admin-bans"] });
      queryClient.invalidateQueries({ queryKey: ["admin-bans-stats"] });
      setBanModalContact(null);
    } catch (err: any) {
      toast({
        title: "Ban Failed",
        description: err.message || "An error occurred while banning.",
        variant: "destructive",
      });
    } finally {
      setIsBanning(false);
    }
  };

  const handleDeleteContact = async () => {
    if (!deleteContactId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/contacts/${deleteContactId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete contact");

      toast({ title: "Inquiry Deleted", description: "The message has been removed." });
      queryClient.invalidateQueries({ queryKey: getGetContactsQueryKey() });
      setDeleteContactId(null);
    } catch (err: any) {
      toast({
        title: "Delete Failed",
        description: err.message || "Could not delete contact.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Contacts & Inquiries</h1>
          <p className="text-muted-foreground text-sm">
            View messages submitted via the public contact and inquiry forms. You can ban malicious senders directly with one click.
          </p>
        </div>
      </div>

      <Card className="bg-card border-border rounded-2xl overflow-hidden shadow-sm">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6">
              <Skeleton className="h-[400px] w-full" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="w-[140px]">Date</TableHead>
                  <TableHead className="w-[230px]">Contact Details</TableHead>
                  <TableHead className="w-[180px]">Subject</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead className="w-[130px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts?.map((contact: any) => (
                  <TableRow key={contact.id} className="border-border align-top hover:bg-accent/20">
                    <TableCell className="py-4 text-muted-foreground text-xs">
                      <div>{new Date(contact.createdAt).toLocaleDateString()}</div>
                      <div className="text-[11px] text-muted-foreground/70 mt-0.5">
                        {new Date(contact.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </TableCell>

                    <TableCell className="py-4">
                      <div className="font-semibold text-white text-sm flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-primary" />
                        {contact.name}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Mail className="h-3 w-3 text-muted-foreground/70" />
                        <span className="truncate">{contact.email}</span>
                      </div>
                      {contact.phone && (
                        <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                          <Phone className="h-3 w-3 text-muted-foreground/70" />
                          <span>{contact.phone}</span>
                        </div>
                      )}
                      {contact.ip && (
                        <div className="mt-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-muted/40 text-[10px] text-muted-foreground font-mono">
                          <Globe className="h-2.5 w-2.5" />
                          {contact.ip}
                        </div>
                      )}
                    </TableCell>

                    <TableCell className="py-4 font-medium text-sm text-foreground/90">
                      {contact.subject || "—"}
                    </TableCell>

                    <TableCell className="py-4 text-muted-foreground text-xs whitespace-pre-wrap leading-relaxed max-w-md">
                      {contact.message}
                    </TableCell>

                    <TableCell className="py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openBanModal(contact)}
                          className="h-8 px-2.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 font-semibold gap-1"
                          title="Ban this user / spammer"
                        >
                          <Ban className="h-3.5 w-3.5" />
                          Ban
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteContactId(contact.id)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          title="Delete contact inquiry"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {contacts?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-16 text-muted-foreground text-sm">
                      No contact inquiries found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Quick Ban Dialog */}
      <Dialog open={!!banModalContact} onOpenChange={(open) => !open && setBanModalContact(null)}>
        <DialogContent className="sm:max-w-[460px] bg-card border-border text-foreground">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2 text-white">
              <ShieldAlert className="h-5 w-5 text-red-500" />
              Ban Submitter: {banModalContact?.name}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs pt-1">
              Select which contact attributes to add to the ban list. Any future form submissions with these details will be rejected.
            </DialogDescription>
          </DialogHeader>

          {banModalContact && (
            <div className="space-y-4 pt-2">
              <div className="space-y-2 rounded-xl bg-background/60 p-3 border border-border text-xs">
                <div className="font-semibold text-white mb-1.5">Select Targets to Block:</div>

                {banModalContact.email && (
                  <label className="flex items-center gap-2.5 cursor-pointer py-1 text-muted-foreground hover:text-white">
                    <Checkbox checked={banEmail} onCheckedChange={(v) => setBanEmail(Boolean(v))} />
                    <span>
                      Ban Email: <strong className="text-white font-mono">{banModalContact.email}</strong>
                    </span>
                  </label>
                )}

                {banModalContact.phone && (
                  <label className="flex items-center gap-2.5 cursor-pointer py-1 text-muted-foreground hover:text-white">
                    <Checkbox checked={banPhone} onCheckedChange={(v) => setBanPhone(Boolean(v))} />
                    <span>
                      Ban Phone: <strong className="text-white font-mono">{banModalContact.phone}</strong>
                    </span>
                  </label>
                )}

                {banModalContact.ip && (
                  <label className="flex items-center gap-2.5 cursor-pointer py-1 text-muted-foreground hover:text-white">
                    <Checkbox checked={banIp} onCheckedChange={(v) => setBanIp(Boolean(v))} />
                    <span>
                      Ban IP Address: <strong className="text-white font-mono">{banModalContact.ip}</strong>
                    </span>
                  </label>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-white">Reason for Ban</Label>
                <Input
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                  placeholder="e.g. Spam contact form inquiries"
                  className="bg-background border-border text-xs rounded-xl"
                />
              </div>

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setBanModalContact(null)}
                  className="border-border"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleConfirmBan}
                  disabled={isBanning}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold"
                >
                  {isBanning ? "Applying Ban..." : "Confirm & Ban User"}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Contact Dialog */}
      <Dialog open={!!deleteContactId} onOpenChange={(open) => !open && setDeleteContactId(null)}>
        <DialogContent className="sm:max-w-[400px] bg-card border-border text-foreground">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-white">Delete Inquiry?</DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs pt-1">
              Are you sure you want to permanently delete this contact inquiry message?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-3">
            <Button
              variant="outline"
              onClick={() => setDeleteContactId(null)}
              className="border-border"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteContact}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Permanently"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
