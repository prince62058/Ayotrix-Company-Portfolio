import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetTestimonials, useCreateTestimonial, useUpdateTestimonial, useDeleteTestimonial, getGetTestimonialsQueryKey } from "@workspace/api-client-react";
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

export default function AdminTestimonials() {
  const { data: testimonials, isLoading } = useGetTestimonials();
  const createTestimonial = useCreateTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    clientName: "",
    company: "",
    review: "",
    rating: 5,
    imageUrl: "",
    isActive: true
  });

  const handleEdit = (t: any) => {
    setEditingId(t.id);
    setFormData({
      clientName: t.clientName,
      company: t.company,
      review: t.review,
      rating: t.rating,
      imageUrl: t.imageUrl || "",
      isActive: t.isActive
    });
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData({
      clientName: "",
      company: "",
      review: "",
      rating: 5,
      imageUrl: "",
      isActive: true
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateTestimonial.mutate({ id: editingId, data: formData }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetTestimonialsQueryKey() });
          toast({ title: "Testimonial updated" });
          setIsDialogOpen(false);
        }
      });
    } else {
      createTestimonial.mutate({ data: formData }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetTestimonialsQueryKey() });
          toast({ title: "Testimonial created" });
          setIsDialogOpen(false);
        }
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      deleteTestimonial.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetTestimonialsQueryKey() });
          toast({ title: "Testimonial deleted" });
        }
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Testimonials</h1>
          <p className="text-muted-foreground">Manage client reviews and testimonials.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate} className="bg-primary hover:bg-primary/90 rounded-2xl">
              <Plus className="w-4 h-4 mr-2" /> Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Testimonial" : "Create Testimonial"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input id="clientName" value={formData.clientName} onChange={e => setFormData(p => ({ ...p, clientName: e.target.value }))} required className="bg-background rounded-2xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" value={formData.company} onChange={e => setFormData(p => ({ ...p, company: e.target.value }))} required className="bg-background rounded-2xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="review">Review</Label>
                <Textarea id="review" value={formData.review} onChange={e => setFormData(p => ({ ...p, review: e.target.value }))} required className="bg-background rounded-2xl resize-none" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input id="rating" type="number" min="1" max="5" value={formData.rating} onChange={e => setFormData(p => ({ ...p, rating: parseInt(e.target.value) }))} required className="bg-background rounded-2xl" />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Switch id="isActive" checked={formData.isActive} onCheckedChange={c => setFormData(p => ({ ...p, isActive: c }))} />
                <Label htmlFor="isActive">Active</Label>
              </div>
              <div className="pt-4 flex justify-end">
                <Button type="submit" className="bg-primary hover:bg-primary/90 rounded-2xl" disabled={createTestimonial.isPending || updateTestimonial.isPending}>
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
                  <TableHead>Client</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials?.map((t) => (
                  <TableRow key={t.id} className="border-border">
                    <TableCell className="font-medium text-white">{t.clientName}</TableCell>
                    <TableCell>{t.company}</TableCell>
                    <TableCell>{t.rating}/5</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(t)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(t.id)}>
                        <Trash className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {testimonials?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No testimonials found.</TableCell>
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
