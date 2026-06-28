import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetProducts, useCreateProduct, useUpdateProduct, useDeleteProduct, getGetProductsQueryKey } from "@workspace/api-client-react";
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

export default function AdminProducts() {
  const { data: products, isLoading } = useGetProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    category: "",
    isActive: true,
    sortOrder: 0
  });

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      category: product.category,
      isActive: product.isActive,
      sortOrder: product.sortOrder
    });
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData({
      name: "",
      description: "",
      imageUrl: "",
      category: "",
      isActive: true,
      sortOrder: 0
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateProduct.mutate({ id: editingId, data: formData }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetProductsQueryKey() });
          toast({ title: "Product updated" });
          setIsDialogOpen(false);
        }
      });
    } else {
      createProduct.mutate({ data: formData }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetProductsQueryKey() });
          toast({ title: "Product created" });
          setIsDialogOpen(false);
        }
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetProductsQueryKey() });
          toast({ title: "Product deleted" });
        }
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Products</h1>
          <p className="text-muted-foreground">Manage the product portfolio.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate} className="bg-primary hover:bg-primary/90 rounded-2xl">
              <Plus className="w-4 h-4 mr-2" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Product" : "Create Product"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} required className="bg-background rounded-2xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" value={formData.category} onChange={e => setFormData(p => ({ ...p, category: e.target.value }))} required className="bg-background rounded-2xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} required className="bg-background rounded-2xl resize-none" />
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
                <Button type="submit" className="bg-primary hover:bg-primary/90 rounded-2xl" disabled={createProduct.isPending || updateProduct.isPending}>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.map((product) => (
                  <TableRow key={product.id} className="border-border">
                    <TableCell>
                      {product.imageUrl && (product.imageUrl.startsWith("http") || product.imageUrl.startsWith("/") || product.imageUrl.startsWith("data:")) ? (
                        <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover bg-muted rounded-xl" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl">
                          {product.imageUrl || "📦"}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-white">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(product.id)}>
                        <Trash className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {products?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No products found.</TableCell>
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
