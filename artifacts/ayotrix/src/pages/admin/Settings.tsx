import React, { useState, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetAdminSiteSettings,
  useUpdateAdminSiteSettings,
  useAdminChangePassword,
  getGetAdminSiteSettingsQueryKey,
} from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Settings2, Image, Lock, Phone, Mail, MapPin, Building2, Eye, EyeOff, Upload, X } from "lucide-react";

export default function AdminSettings() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: settings, isLoading } = useGetAdminSiteSettings();
  const updateSettings = useUpdateAdminSiteSettings();
  const changePassword = useAdminChangePassword();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    logoUrl: "",
    companyName: "",
    phone: "",
    email: "",
    address: "",
  });

  const [pwForm, setPwForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [logoPreview, setLogoPreview] = useState("");

  useEffect(() => {
    if (settings) {
      setForm({
        logoUrl: settings.logoUrl || "",
        companyName: settings.companyName || "",
        phone: settings.phone || "",
        email: settings.email || "",
        address: settings.address || "",
      });
      setLogoPreview(settings.logoUrl || "");
    }
  }, [settings]);

  const handleLogoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "File too large", description: "Logo must be under 2MB.", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      setLogoPreview(base64);
      setForm(p => ({ ...p, logoUrl: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings.mutate({ data: form }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetAdminSiteSettingsQueryKey() });
        toast({ title: "Settings saved!", description: "Site settings updated successfully." });
      },
      onError: () => toast({ title: "Error", description: "Failed to save settings.", variant: "destructive" }),
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      toast({ title: "Passwords don't match", description: "New password and confirm password must match.", variant: "destructive" });
      return;
    }
    if (pwForm.newPassword.length < 4) {
      toast({ title: "Too short", description: "Password must be at least 4 characters.", variant: "destructive" });
      return;
    }
    changePassword.mutate(
      { data: { currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword } },
      {
        onSuccess: () => {
          toast({ title: "Password changed!", description: "Your admin password has been updated." });
          setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        },
        onError: () => toast({ title: "Wrong password", description: "Current password is incorrect.", variant: "destructive" }),
      }
    );
  };

  if (isLoading) return <div className="text-muted-foreground p-8">Loading settings...</div>;

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Settings2 className="w-8 h-8 text-primary" /> Site Settings
        </h1>
        <p className="text-muted-foreground">Manage your logo, company info, and admin password.</p>
      </div>

      {/* Company & Logo */}
      <Card className="bg-card border-border rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Building2 className="w-5 h-5 text-primary" /> Company Info & Logo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveSettings} className="space-y-5">

            {/* Logo Upload */}
            <div className="space-y-2">
              <Label className="text-slate-300 flex items-center gap-2"><Image className="w-4 h-4" /> Logo</Label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-background overflow-hidden shrink-0">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="w-full h-full object-contain p-2" />
                  ) : (
                    <Image className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogoFile} />
                  <Button type="button" variant="outline" size="sm" className="rounded-xl w-fit" onClick={() => fileRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" /> Upload Image
                  </Button>
                  <p className="text-xs text-muted-foreground">PNG, JPG, SVG — max 2MB. Stored as base64.</p>
                  {logoPreview && (
                    <Button type="button" variant="ghost" size="sm" className="rounded-xl w-fit text-destructive" onClick={() => { setLogoPreview(""); setForm(p => ({ ...p, logoUrl: "" })); }}>
                      <X className="w-4 h-4 mr-1" /> Remove
                    </Button>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Or paste a URL directly:</p>
              <Input
                placeholder="https://example.com/logo.png"
                value={form.logoUrl.startsWith("data:") ? "" : form.logoUrl}
                onChange={e => { setForm(p => ({ ...p, logoUrl: e.target.value })); setLogoPreview(e.target.value); }}
                className="bg-background rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 flex items-center gap-2"><Building2 className="w-4 h-4" /> Company Name</Label>
              <Input value={form.companyName} onChange={e => setForm(p => ({ ...p, companyName: e.target.value }))} className="bg-background rounded-xl" placeholder="Ayotrix Infotech" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300 flex items-center gap-2"><Phone className="w-4 h-4" /> Phone</Label>
                <Input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="bg-background rounded-xl" placeholder="+91 97520 45356" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 flex items-center gap-2"><Mail className="w-4 h-4" /> Email</Label>
                <Input value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="bg-background rounded-xl" placeholder="info@ayotrix.com" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 flex items-center gap-2"><MapPin className="w-4 h-4" /> Address</Label>
              <Input value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} className="bg-background rounded-xl" placeholder="Bhopal, Madhya Pradesh" />
            </div>

            <Button type="submit" disabled={updateSettings.isPending} className="rounded-xl" style={{ background: "linear-gradient(135deg, #1263E8, #6EDD00)" }}>
              {updateSettings.isPending ? "Saving..." : "Save Settings"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card className="bg-card border-border rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Lock className="w-5 h-5 text-primary" /> Change Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-slate-300">Current Password</Label>
              <div className="relative">
                <Input
                  type={showCurrent ? "text" : "password"}
                  value={pwForm.currentPassword}
                  onChange={e => setPwForm(p => ({ ...p, currentPassword: e.target.value }))}
                  required
                  className="bg-background rounded-xl pr-11"
                  placeholder="••••••"
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground" onClick={() => setShowCurrent(v => !v)} tabIndex={-1}>
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">New Password</Label>
              <div className="relative">
                <Input
                  type={showNew ? "text" : "password"}
                  value={pwForm.newPassword}
                  onChange={e => setPwForm(p => ({ ...p, newPassword: e.target.value }))}
                  required
                  className="bg-background rounded-xl pr-11"
                  placeholder="••••••"
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground" onClick={() => setShowNew(v => !v)} tabIndex={-1}>
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Confirm New Password</Label>
              <Input
                type="password"
                value={pwForm.confirmPassword}
                onChange={e => setPwForm(p => ({ ...p, confirmPassword: e.target.value }))}
                required
                className="bg-background rounded-xl"
                placeholder="••••••"
              />
            </div>

            <Button type="submit" disabled={changePassword.isPending} className="rounded-xl bg-primary hover:bg-primary/90">
              {changePassword.isPending ? "Updating..." : "Change Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
