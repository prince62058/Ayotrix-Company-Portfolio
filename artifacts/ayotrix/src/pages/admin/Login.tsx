import React, { useState } from "react";
import { useLocation } from "wouter";
import { useAdminLogin, useGetAdminMe, useGetSiteSettings } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ShieldAlert, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import logoImg from "@assets/a_logo_(1)_1781854062528.png";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const login = useAdminLogin();
  const { data: me } = useGetAdminMe();
  const { data: settings } = useGetSiteSettings();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (me?.isAuthenticated) {
    setLocation("/admin/dashboard");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate(
      { data: { password } },
      {
        onSuccess: (res) => {
          if (res.success) {
            setLocation("/admin/dashboard");
          } else {
            toast({
              title: "Access Denied",
              description: "Wrong password. Please try again.",
              variant: "destructive"
            });
          }
        },
        onError: () => {
          toast({
            title: "Access Denied",
            description: "Wrong password. Please try again.",
            variant: "destructive"
          });
        }
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0A1628]">
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#6EDD00]/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md z-10 p-4"
      >
        <div className="bg-[#111C30]/80 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">

          <div className="flex flex-col items-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner"
            >
              <img src={settings?.logoUrl || logoImg} alt={settings?.companyName || "Ayotrix Infotech"} className="h-10 w-10 object-contain" />
            </motion.div>
            <h1 className="text-2xl font-black text-white tracking-tight mb-2 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-primary" />
              Admin Portal
            </h1>
            <p className="text-slate-400 text-sm text-center">
              Enter your password to access the admin panel.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300 font-semibold text-xs uppercase tracking-wider ml-1">Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-500" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                  placeholder="Enter password"
                  className="bg-black/20 border-white/10 text-white placeholder:text-slate-600 pl-11 pr-11 h-12 rounded-xl focus-visible:ring-primary focus-visible:border-primary transition-all"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                  onClick={() => setShowPassword(v => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-2">
              <Button
                type="submit"
                className="w-full h-12 rounded-xl font-bold flex items-center justify-center gap-2 group"
                style={{ background: "linear-gradient(135deg, #1263E8, #6EDD00)", boxShadow: "0 0 20px rgba(18,99,232,0.4)" }}
                disabled={login.isPending}
              >
                {login.isPending ? (
                  "Authenticating..."
                ) : (
                  <>
                    Secure Login
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </motion.div>
          </form>

        </div>
      </motion.div>
    </div>
  );
}
