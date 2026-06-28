import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetTeamMembers, useCreateTeamMember, useUpdateTeamMember, useDeleteTeamMember, getGetTeamMembersQueryKey } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash } from "lucide-react";

export default function AdminTeam() {
  const { data: teamMembers, isLoading } = useGetTeamMembers();
  const createTeamMember = useCreateTeamMember();
  const updateTeamMember = useUpdateTeamMember();
  const deleteTeamMember = useDeleteTeamMember();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    imageUrl: "",
    isActive: true,
    sortOrder: 0
  });

  const handleEdit = (member: any) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio,
      imageUrl: member.imageUrl,
      isActive: member.isActive,
      sortOrder: member.sortOrder
    });
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData({
      name: "",
      role: "",
      bio: "",
      imageUrl: "",
      isActive: true,
      sortOrder: 0
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateTeamMember.mutate({ id: editingId, data: formData }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetTeamMembersQueryKey() });
          toast({ title: "Team member updated" });
          setIsDialogOpen(false);
        }
      });
    } else {
      createTeamMember.mutate({ data: formData }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetTeamMembersQueryKey() });
          toast({ title: "Team member created" });
          setIsDialogOpen(false);
        }
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      deleteTeamMember.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetTeamMembersQueryKey() });
          toast({ title: "Team member deleted" });
        }
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Team Members</h1>
          <p className="text-muted-foreground">Manage the leadership and team display.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate} className="bg-primary hover:bg-primary/90 rounded-2xl">
              <Plus className="w-4 h-4 mr-2" /> Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Member" : "Create Member"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} required className="bg-background rounded-2xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" value={formData.role} onChange={e => setFormData(p => ({ ...p, role: e.target.value }))} required className="bg-background rounded-2xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" value={formData.bio} onChange={e => setFormData(p => ({ ...p, bio: e.target.value }))} required className="bg-background rounded-2xl resize-none" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input id="imageUrl" value={formData.imageUrl} onChange={e => setFormData(p => ({ ...p, imageUrl: e.target.value }))} required className="bg-background rounded-2xl" />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Switch id="isActive" checked={formData.isActive} onCheckedChange={c => setFormData(p => ({ ...p, isActive: c }))} />
                <Label htmlFor="isActive">Active</Label>
              </div>
              <div className="pt-4 flex justify-end">
                <Button type="submit" className="bg-primary hover:bg-primary/90 rounded-2xl" disabled={createTeamMember.isPending || updateTeamMember.isPending}>
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
                  <TableHead>Photo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers?.map((member) => (
                  <TableRow key={member.id} className="border-border">
                    <TableCell>
                      <img src={member.imageUrl} alt={member.name} className="w-12 h-12 rounded-full object-cover bg-muted" />
                    </TableCell>
                    <TableCell className="font-medium text-white">{member.name}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(member)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(member.id)}>
                        <Trash className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {teamMembers?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No team members found.</TableCell>
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
