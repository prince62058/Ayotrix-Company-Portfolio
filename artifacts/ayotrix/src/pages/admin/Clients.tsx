import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetClients, useCreateClient, useUpdateClient, useDeleteClient, getGetClientsQueryKey } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash } from "lucide-react";

export default function AdminClients() {
  const { data: clients, isLoading } = useGetClients();
  const createClient = useCreateClient();
  const updateClient = useUpdateClient();
  const deleteClient = useDeleteClient();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    logoUrl: "",
    isActive: true
  });

  const handleEdit = (c: any) => {
    setEditingId(c.id);
    setFormData({
      name: c.name,
      logoUrl: c.logoUrl,
      isActive: c.isActive
    });
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData({
      name: "",
      logoUrl: "",
      isActive: true
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateClient.mutate({ id: editingId, data: formData }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetClientsQueryKey() });
          toast({ title: "Client updated" });
          setIsDialogOpen(false);
        }
      });
    } else {
      createClient.mutate({ data: formData }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetClientsQueryKey() });
          toast({ title: "Client created" });
          setIsDialogOpen(false);
        }
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this client?")) {
      deleteClient.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetClientsQueryKey() });
          toast({ title: "Client deleted" });
        }
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Clients</h1>
          <p className="text-muted-foreground">Manage client logos displayed on the site.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate} className="bg-primary hover:bg-primary/90 rounded-2xl">
              <Plus className="w-4 h-4 mr-2" /> Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Client" : "Create Client"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Client Name</Label>
                <Input id="name" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} required className="bg-background rounded-2xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logoUrl">Logo URL</Label>
                <Input id="logoUrl" value={formData.logoUrl} onChange={e => setFormData(p => ({ ...p, logoUrl: e.target.value }))} required className="bg-background rounded-2xl" />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Switch id="isActive" checked={formData.isActive} onCheckedChange={c => setFormData(p => ({ ...p, isActive: c }))} />
                <Label htmlFor="isActive">Active</Label>
              </div>
              <div className="pt-4 flex justify-end">
                <Button type="submit" className="bg-primary hover:bg-primary/90 rounded-2xl" disabled={createClient.isPending || updateClient.isPending}>
                  {editingId ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-card border-border rounded-2xl">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6">
              <Skeleton className="h-[400px] w-full" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead>Logo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients?.map((c) => (
                  <TableRow key={c.id} className="border-border">
                    <TableCell>
                      <img src={c.logoUrl} alt={c.name} className="w-16 h-8 object-contain bg-white p-1 rounded" />
                    </TableCell>
                    <TableCell className="font-medium text-white">{c.name}</TableCell>
                    <TableCell>{c.isActive ? "Active" : "Inactive"}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(c)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(c.id)}>
                        <Trash className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {clients?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No clients found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
