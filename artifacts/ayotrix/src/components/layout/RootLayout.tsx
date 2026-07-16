import React from "react";
import { ThemeProvider } from "@/hooks/use-theme";
import Navbar from "./Navbar";
import Footer from "./Footer";
import OrganizationSchema from "@/components/OrganizationSchema";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <OrganizationSchema />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Layout>{children}</Layout>
    </ThemeProvider>
  );
}
