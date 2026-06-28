import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import React, { useEffect } from "react";
import { useGetSiteSettings } from "@workspace/api-client-react";

import RootLayout from "@/components/layout/RootLayout";
import AdminLayout from "@/components/layout/AdminLayout";

import Home from "@/pages/Home";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import DigitalMarketing from "@/pages/DigitalMarketing";
import DigitalMarketingServiceDetail from "@/pages/DigitalMarketingServiceDetail";
import Contact from "@/pages/Contact";

import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminBanners from "@/pages/admin/Banners";
import AdminServices from "@/pages/admin/Services";
import AdminProducts from "@/pages/admin/Products";
import AdminTeam from "@/pages/admin/Team";
import AdminTestimonials from "@/pages/admin/Testimonials";
import AdminContacts from "@/pages/admin/Contacts";
import AdminClients from "@/pages/admin/Clients";
import AdminSettings from "@/pages/admin/Settings";
import { SmoothScroll } from "@/components/SmoothScroll";

const queryClient = new QueryClient();

function MainRouter() {
  return (
    <RootLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/services/:slug" component={ServiceDetail} />
        <Route path="/products" component={Products} />
        <Route path="/products/:slug" component={ProductDetail} />
        <Route path="/digital-marketing" component={DigitalMarketing} />
        <Route path="/digital-marketing/:slug" component={DigitalMarketingServiceDetail} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </RootLayout>
  );
}

function AdminRouter() {
  return (
    <AdminLayout>
      <Switch>
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/admin/banners" component={AdminBanners} />
        <Route path="/admin/services" component={AdminServices} />
        <Route path="/admin/products" component={AdminProducts} />
        <Route path="/admin/team" component={AdminTeam} />
        <Route path="/admin/testimonials" component={AdminTestimonials} />
        <Route path="/admin/contacts" component={AdminContacts} />
        <Route path="/admin/clients" component={AdminClients} />
        <Route path="/admin/settings" component={AdminSettings} />
        <Route component={NotFound} />
      </Switch>
    </AdminLayout>
  );
}

function DynamicBranding() {
  const { data: settings } = useGetSiteSettings();

  useEffect(() => {
    if (settings) {
      if (settings.companyName) {
        document.title = `${settings.companyName} - IT Company Website`;
      }
      if (settings.logoUrl) {
        const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (link) {
          link.href = settings.logoUrl;
        } else {
          const newLink = document.createElement("link");
          newLink.rel = "icon";
          newLink.href = settings.logoUrl;
          document.head.appendChild(newLink);
        }
      }
    }
  }, [settings]);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DynamicBranding />
      <SmoothScroll>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Switch>
              <Route path="/admin" component={AdminLogin} />
              <Route path="/admin/*" component={AdminRouter} />
              <Route path="/*" component={MainRouter} />
            </Switch>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </SmoothScroll>
    </QueryClientProvider>
  );
}

export default App;
