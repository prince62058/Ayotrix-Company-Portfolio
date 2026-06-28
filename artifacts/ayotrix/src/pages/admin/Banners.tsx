import React, { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetBanners, useCreateBanner, useUpdateBanner, useDeleteBanner, getGetBannersQueryKey } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash, Upload, X } from "lucide-react";

export default function AdminBanners() {
  const { data: banners, isLoading } = useGetBanners();
  const createBanner = useCreateBanner();
  const updateBanner = useUpdateBanner();
  const deleteBanner = useDeleteBanner();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleMediaFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: "File too large", description: "Media must be under 10MB.", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      setFormData(p => ({ ...p, imageUrl: base64 }));
    };
    reader.readAsDataURL(file);
  };
  
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    ctaText: "",
    ctaLink: "",
    imageUrl: "",
    isActive: true,
    sortOrder: 0
  });

  const handleEdit = (banner: any) => {
    setEditingId(banner.id);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle,
      ctaText: banner.ctaText,
      ctaLink: banner.ctaLink,
      imageUrl: banner.imageUrl,
      isActive: banner.isActive,
      sortOrder: banner.sortOrder
    });
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData({
      title: "",
      subtitle: "",
      ctaText: "",
      ctaLink: "",
      imageUrl: "",
      isActive: true,
      sortOrder: 0
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateBanner.mutate({ id: editingId, data: formData }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetBannersQueryKey() });
          toast({ title: "Banner updated" });
          setIsDialogOpen(false);
        }
      });
    } else {
      createBanner.mutate({ data: formData }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetBannersQueryKey() });
          toast({ title: "Banner created" });
          setIsDialogOpen(false);
        }
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      deleteBanner.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetBannersQueryKey() });
          toast({ title: "Banner deleted" });
        }
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Banners</h1>
          <p className="text-muted-foreground">Manage the hero section sliders.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate} className="bg-primary hover:bg-primary/90 rounded-2xl">
              <Plus className="w-4 h-4 mr-2" /> Add Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Banner" : "Create Banner"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} required className="bg-background rounded-2xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input id="subtitle" value={formData.subtitle} onChange={e => setFormData(p => ({ ...p, subtitle: e.target.value }))} required className="bg-background rounded-2xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Media (Image or Video)</Label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-16 rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-background overflow-hidden shrink-0">
                    {formData.imageUrl ? (
                      (formData.imageUrl === "default" || formData.imageUrl.startsWith("data:video/") || formData.imageUrl.endsWith(".mp4") || formData.imageUrl.endsWith(".webm") || formData.imageUrl.endsWith(".mov")) ? (
                        <video src={formData.imageUrl === "default" ? "/hero-banner.mp4" : formData.imageUrl} className="w-full h-full object-cover p-1" muted autoPlay loop playsInline />
                      ) : (
                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover p-1" />
                      )
                    ) : (
                      <span className="text-xs text-muted-foreground">No media</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <input ref={fileRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleMediaFile} />
                    <Button type="button" variant="outline" size="sm" className="rounded-xl w-fit" onClick={() => fileRef.current?.click()}>
                      <Upload className="w-4 h-4 mr-2" /> Upload File
                    </Button>
                    <p className="text-[10px] text-muted-foreground">Image or MP4/WebM video up to 10MB.</p>
                    {formData.imageUrl && (
                      <Button type="button" variant="ghost" size="sm" className="rounded-xl w-fit text-destructive" onClick={() => setFormData(p => ({ ...p, imageUrl: "" }))}>
                        <X className="w-4 h-4 mr-1" /> Clear Media
                      </Button>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Or paste a URL directly:</p>
                <Input id="imageUrl" value={formData.imageUrl.startsWith("data:") ? "" : formData.imageUrl} onChange={e => setFormData(p => ({ ...p, imageUrl: e.target.value }))} required className="bg-background rounded-2xl" placeholder="https://example.com/media.mp4" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ctaText">CTA Text</Label>
                  <Input id="ctaText" value={formData.ctaText} onChange={e => setFormData(p => ({ ...p, ctaText: e.target.value }))} className="bg-background rounded-2xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ctaLink">CTA Link</Label>
                  <Input id="ctaLink" value={formData.ctaLink} onChange={e => setFormData(p => ({ ...p, ctaLink: e.target.value }))} className="bg-background rounded-2xl" />
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Switch id="isActive" checked={formData.isActive} onCheckedChange={c => setFormData(p => ({ ...p, isActive: c }))} />
                <Label htmlFor="isActive">Active</Label>
              </div>
              <div className="pt-4 flex justify-end">
                <Button type="submit" className="bg-primary hover:bg-primary/90 rounded-2xl" disabled={createBanner.isPending || updateBanner.isPending}>
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
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {banners?.map((banner) => (
                  <TableRow key={banner.id} className="border-border">
                    <TableCell>
                      {banner.imageUrl ? (
                        (banner.imageUrl === "default" || banner.imageUrl.startsWith("data:video/") || banner.imageUrl.endsWith(".mp4") || banner.imageUrl.endsWith(".webm") || banner.imageUrl.endsWith(".mov")) ? (
                          <video src={banner.imageUrl === "default" ? "/hero-banner.mp4" : banner.imageUrl} className="w-20 h-12 object-cover bg-muted rounded" muted autoPlay loop playsInline />
                        ) : (
                          <img src={banner.imageUrl} alt={banner.title} className="w-20 h-12 object-cover bg-muted rounded" />
                        )
                      ) : (
                        <span className="text-xs text-muted-foreground">No Media</span>
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-white">{banner.title}</TableCell>
                    <TableCell>{banner.isActive ? "Active" : "Inactive"}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(banner)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(banner.id)}>
                        <Trash className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {banners?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No banners found.</TableCell>
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
