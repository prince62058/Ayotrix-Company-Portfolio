import React, { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { useGetAdminMe, useAdminLogout, useGetSiteSettings } from "@workspace/api-client-react";
import { Loader2, LayoutDashboard, Image as ImageIcon, Briefcase, Box, Users, MessageSquareQuote, Mail, LogOut, Building, Settings2 } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { data: me, isLoading } = useGetAdminMe();
  const logout = useAdminLogout();
  const { data: settings } = useGetSiteSettings();

  useEffect(() => {
    if (!isLoading && (!me || !me.isAuthenticated)) {
      setLocation("/admin");
    }
  }, [me, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!me?.isAuthenticated) {
    return null;
  }

  const links = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/banners", label: "Banners", icon: ImageIcon },
    { href: "/admin/services", label: "Services", icon: Briefcase },
    { href: "/admin/products", label: "Products", icon: Box },
    { href: "/admin/team", label: "Team", icon: Users },
    { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
    { href: "/admin/clients", label: "Clients", icon: Building },
    { href: "/admin/contacts", label: "Contacts", icon: Mail },
    { href: "/admin/settings", label: "Settings", icon: Settings2 },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground dark">
      <aside className="w-64 border-r border-border bg-card">
        <div className="flex h-16 items-center gap-3 border-b border-border px-6">
          {settings?.logoUrl ? (
            <img src={settings.logoUrl} alt="Logo" className="h-6 w-6 object-contain" />
          ) : (
            <Building className="h-6 w-6 text-primary" />
          )}
          <span className="text-sm font-bold text-primary truncate">
            {settings?.companyName || "Admin Portal"}
          </span>
        </div>
        <nav className="space-y-1 p-4">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
          <button
            onClick={() => {
              logout.mutate(undefined, {
                onSuccess: () => {
                  queryClient.clear();
                  setLocation("/admin");
                },
              });
            }}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
