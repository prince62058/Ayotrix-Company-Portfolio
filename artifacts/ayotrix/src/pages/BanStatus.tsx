import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  ShieldAlert,
  ShieldCheck,
  Search,
  Lock,
  Mail,
  Phone,
  Globe,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Send,
  Unlock,
  Ban,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import SeoHead from "@/components/SeoHead";
import { useGetSiteSettings } from "@workspace/api-client-react";

interface BanCheckResult {
  isBanned: boolean;
  query?: string;
  type?: string;
  reason?: string;
  bannedAt?: string | null;
  expiresAt?: string | null;
  message?: string;
}

const COMMON_REASONS = [
  "Spamming Contact Form",
  "Fake / Bot Inquiries",
  "Abusive / Harassment Message",
  "DDoS / Malicious Probing",
  "Repeated Policy Violations",
];

export default function BanStatus() {
  const { toast } = useToast();
  const { data: settings } = useGetSiteSettings();

  const [activeTab, setActiveTab] = useState<"check" | "manage">("check");

  // Lookup state
  const [queryInput, setQueryInput] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<BanCheckResult | null>(null);

  // Quick action state
  const [targetType, setTargetType] = useState<"email" | "phone" | "ip">("email");
  const [targetValue, setTargetValue] = useState("");
  const [reason, setReason] = useState(COMMON_REASONS[0]);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle public status lookup
  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim()) {
      toast({
        title: "Input required",
        description: "Please enter an Email, Phone Number, or IP address.",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);
    setCheckResult(null);

    try {
      const res = await fetch(`/api/bans/check?query=${encodeURIComponent(queryInput.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to check status");
      }
      setCheckResult(data);
    } catch (err: any) {
      toast({
        title: "Lookup Failed",
        description: err.message || "Could not complete lookup. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  // Handle staff quick ban/unban action
  const handleQuickAction = async (action: "ban" | "unban") => {
    if (!targetValue.trim()) {
      toast({
        title: "Target value required",
        description: "Please enter the Email, Phone, or IP address.",
        variant: "destructive",
      });
      return;
    }

    if (!password.trim()) {
      toast({
        title: "Password required",
        description: "Please enter the security password to authorize.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/bans/quick", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: password.trim(),
          action,
          type: targetType,
          value: targetValue.trim(),
          reason,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Operation failed");
      }

      toast({
        title: action === "ban" ? "Restriction Applied" : "Restriction Removed",
        description: data.message,
      });

      // Clear input on success
      setTargetValue("");
      if (checkResult && checkResult.query === targetValue.trim().toLowerCase()) {
        setCheckResult(null);
      }
    } catch (err: any) {
      toast({
        title: "Authorization Failed",
        description: err.message || "Invalid credentials or request failed.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-36 md:pt-40 pb-20 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      <SeoHead
        title="User Ban & Security Status | Ayotrix Infotech"
        description="Check user restriction and ban status for inquiries and security compliance on Ayotrix portal."
        path="/banned-users"
      />

      {/* Atmospheric background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full blur-[130px] opacity-25 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(239,68,68,0.3) 0%, rgba(59,130,246,0.2) 60%, transparent 80%)",
          }}
        />
      </div>

      <motion.div
        className="w-full max-w-lg relative z-10 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header Badge & Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
            <ShieldAlert className="w-3.5 h-3.5" />
            Security & Restriction Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            User Ban Status
          </h1>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">
            Verify whether an email, phone number, or IP has any restrictions on contact submissions and portal actions.
          </p>
        </div>

        {/* Main Card Container */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl p-6 sm:p-7 space-y-6">
          {/* Tab Switcher */}
          <div className="flex rounded-2xl bg-slate-950 p-1 border border-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("check")}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === "check"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              Check Status
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("manage")}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === "manage"
                  ? "bg-slate-800 text-white shadow-md font-bold border border-slate-700/60"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              Staff Action
            </button>
          </div>

          <AnimatePresence mode="wait">
            {/* TAB 1: Check Ban Status */}
            {activeTab === "check" && (
              <motion.div
                key="check-tab"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <form onSubmit={handleCheck} className="space-y-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-slate-300">
                      Enter Email, Phone or IP Address
                    </Label>
                    <div className="relative">
                      <Input
                        type="text"
                        value={queryInput}
                        onChange={(e) => setQueryInput(e.target.value)}
                        placeholder="e.g. name@example.com or 9752045356"
                        className="pl-10 rounded-xl bg-slate-950/70 border-slate-800 text-white placeholder:text-slate-500 text-sm h-11 focus-visible:ring-blue-500"
                      />
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isChecking}
                    className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm h-11 shadow-md transition-all duration-150"
                  >
                    {isChecking ? "Verifying..." : "Check Restriction Status"}
                  </Button>
                </form>

                {/* Result Display */}
                {checkResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-2xl p-4.5 border ${
                      checkResult.isBanned
                        ? "bg-red-950/30 border-red-500/40 text-red-200"
                        : "bg-emerald-950/30 border-emerald-500/40 text-emerald-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {checkResult.isBanned ? (
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      <div className="space-y-1 text-xs flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm">
                            {checkResult.isBanned ? "Account Restricted" : "Status: Clean & Verified"}
                          </span>
                          <Badge
                            variant="outline"
                            className={`text-[10px] uppercase tracking-wider font-bold ${
                              checkResult.isBanned
                                ? "bg-red-500/20 text-red-300 border-red-500/40"
                                : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                            }`}
                          >
                            {checkResult.isBanned ? "Banned" : "Active"}
                          </Badge>
                        </div>

                        {checkResult.isBanned ? (
                          <div className="space-y-1.5 pt-1 text-slate-300">
                            <p>
                              <span className="font-semibold text-white">Reason:</span>{" "}
                              {checkResult.reason || "Policy compliance violation"}
                            </p>
                            {checkResult.bannedAt && (
                              <p className="text-[11px] text-slate-400">
                                Restricted on: {new Date(checkResult.bannedAt).toLocaleDateString()}
                              </p>
                            )}
                            <div className="pt-2">
                              <a
                                href={`mailto:${settings?.email || "info@ayotrix.com"}?subject=Ban%20Appeal%20for%20${encodeURIComponent(
                                  queryInput
                                )}`}
                                className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-bold underline"
                              >
                                Request Review / Appeal Restriction <ArrowRight className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        ) : (
                          <p className="text-slate-300 pt-0.5">
                            No restriction or security flag found. You can submit inquiries, contact our team, and use services normally.
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* TAB 2: Staff Quick Ban Tool */}
            {activeTab === "manage" && (
              <motion.div
                key="manage-tab"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
                  <Lock className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>Authorized staff only. Security password required to restrict spammers.</span>
                </div>

                {/* Target Type Selector */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-slate-300">Target Type</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { type: "email", label: "Email", icon: Mail },
                      { type: "phone", label: "Phone", icon: Phone },
                      { type: "ip", label: "IP", icon: Globe },
                    ].map(({ type, label, icon: Icon }) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setTargetType(type as any)}
                        className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                          targetType === type
                            ? "bg-slate-800 border-blue-500 text-blue-400 shadow-sm"
                            : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Value Input */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-slate-300">Target Value to Restrict</Label>
                  <Input
                    type="text"
                    value={targetValue}
                    onChange={(e) => setTargetValue(e.target.value)}
                    placeholder={
                      targetType === "email"
                        ? "spammer@bad.com"
                        : targetType === "phone"
                        ? "+91 99999 99999"
                        : "192.168.1.1"
                    }
                    className="rounded-xl bg-slate-950/70 border-slate-800 text-white placeholder:text-slate-600 text-sm h-10"
                  />
                </div>

                {/* Reason Selector */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-slate-300">Reason</Label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 text-xs h-10 px-3 focus:outline-none focus:border-blue-500"
                  >
                    {COMMON_REASONS.map((r) => (
                      <option key={r} value={r} className="bg-slate-900 text-white">
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Security Password */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-slate-300">Security Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter site admin password"
                    className="rounded-xl bg-slate-950/70 border-slate-800 text-white placeholder:text-slate-600 text-sm h-10"
                  />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={isSubmitting}
                    onClick={() => handleQuickAction("ban")}
                    className="rounded-xl font-bold text-xs h-10 gap-1.5 bg-red-600 hover:bg-red-500 shadow-md"
                  >
                    <Ban className="w-3.5 h-3.5" />
                    {isSubmitting ? "Processing..." : "Ban Target"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={() => handleQuickAction("unban")}
                    className="rounded-xl font-bold text-xs h-10 gap-1.5 border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 shadow-sm"
                  >
                    <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                    Unban Target
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Help Link */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <Link href="/contact" className="hover:text-blue-400 transition-colors flex items-center gap-1">
              Contact Support <ArrowRight className="w-3 h-3" />
            </Link>
            <Link href="/" className="hover:text-slate-300 transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
