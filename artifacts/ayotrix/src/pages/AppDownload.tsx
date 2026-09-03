import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Smartphone,
  CheckCircle2,
  Copy,
  Check,
  Star,
  Download,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Share2,
  ExternalLink,
  Zap,
  Clock,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetSiteSettings } from "@workspace/api-client-react";
import SeoHead from "@/components/SeoHead";
import { useToast } from "@/hooks/use-toast";

export default function AppDownload() {
  const { data: settings } = useGetSiteSettings();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const playStoreUrl =
    (settings as any)?.playStoreUrl ||
    "https://play.google.com/store/apps/details?id=com.marketingkart.app";

  const appShareUrl = typeof window !== "undefined" ? window.location.href : "https://ayotrix.com/app";

  const handleCopyPlayStore = () => {
    navigator.clipboard.writeText(playStoreUrl);
    setCopied(true);
    toast({
      title: "Play Store Link Copied!",
      description: "You can now paste and send it to your client.",
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyPageLink = () => {
    navigator.clipboard.writeText(appShareUrl);
    toast({
      title: "Page Link Copied!",
      description: "Direct download page link copied to clipboard.",
    });
  };

  const appFeatures = [
    {
      icon: Zap,
      title: "Real-Time Project Tracking",
      desc: "Track app development progress, milestone updates, and staging demos on your phone.",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp & RCS Campaigns",
      desc: "Launch, review, and analyze marketing campaigns directly from your mobile dashboard.",
    },
    {
      icon: Clock,
      title: "Instant Quote Calculator",
      desc: "Get instant price estimates and delivery timelines for custom web & mobile apps.",
    },
    {
      icon: ShieldCheck,
      title: "24/7 Priority Support",
      desc: "Direct access to our senior engineering and digital marketing teams anytime.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-20">
      <SeoHead
        title="Download Ayotrix Mobile App | Official Google Play Store"
        description="Download the official Ayotrix app from Google Play Store to manage your projects, track developments, launch WhatsApp marketing campaigns, and get live support."
        path="/app"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[140px]"
            style={{
              background: "radial-gradient(circle, rgba(37,99,235,0.25) 0%, rgba(16,185,129,0.15) 50%, transparent 80%)",
            }}
          />
        </div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="lg:col-span-7 space-y-6"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified by Google Play Protect
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-white">
                Download the Official{" "}
                <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                  Ayotrix Mobile App
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                Take full control of your digital solutions. Track development milestones, manage WhatsApp & RCS communications, calculate quotes, and connect with our team on Google Play.
              </p>

              {/* Badges / Rating Row */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-slate-400">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>4.9</span>
                  <span className="text-slate-400 font-normal text-xs">(1,200+ Reviews)</span>
                </div>
                <span className="text-slate-600">•</span>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>10,000+ Downloads</span>
                </div>
                <span className="text-slate-600">•</span>
                <div className="text-xs text-slate-400">Size: ~18 MB</div>
              </div>

              {/* CTA Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <a
                  href={playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-200 hover:scale-[1.02]"
                >
                  <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-.61-.92L3 2.734c0-.342.22-.683.609-.92zm11.303 11.304l2.585 2.585-11.75 6.78 9.165-9.365zm2.585-2.236l-2.585 2.585L5.747 4.102l11.75 6.78zm1.18 1.118l3.14 1.812a1.002 1.002 0 0 1 0 1.734l-3.14 1.812-2.146-2.679 2.146-2.679z"/>
                  </svg>
                  <div className="text-left leading-none">
                    <div className="text-[10px] uppercase tracking-wider font-semibold opacity-80">Get it on</div>
                    <div className="text-lg font-black tracking-tight mt-0.5">Google Play</div>
                  </div>
                </a>

                <Button
                  onClick={handleCopyPlayStore}
                  variant="outline"
                  size="lg"
                  className="rounded-2xl border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-white font-semibold py-4 h-auto text-sm gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      Play Store Link Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-sky-400" />
                      Copy Play Store Link
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleCopyPageLink}
                  variant="ghost"
                  size="icon"
                  className="rounded-2xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 h-12 w-12 shrink-0"
                  title="Share download page"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
                <span>Requires Android 8.0 and up</span>
                <span>•</span>
                <span>Free to install</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">Auto-Updates</span>
              </div>
            </motion.div>

            {/* Right Interactive Mockup / QR Box */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="relative mx-auto max-w-[340px] rounded-[36px] p-3 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-slate-700/50">
                {/* Phone Speaker & Notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-950 rounded-full flex items-center justify-center z-20">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-800 mr-2" />
                  <div className="w-8 h-1 rounded-full bg-slate-800" />
                </div>

                {/* Inner Screen */}
                <div className="rounded-[28px] overflow-hidden bg-slate-900 border border-slate-800 pt-10 pb-6 px-5 space-y-4">
                  <div className="text-center pt-2">
                    <div className="w-16 h-16 rounded-2xl mx-auto mb-3 bg-gradient-to-tr from-blue-600 to-cyan-500 p-0.5 shadow-lg shadow-blue-500/30 flex items-center justify-center">
                      <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-2xl text-white">
                        A
                      </div>
                    </div>
                    <h3 className="font-bold text-white text-base">Ayotrix Mobile App</h3>
                    <p className="text-xs text-blue-400 mt-0.5 font-medium">Digital Agency & Growth Portal</p>
                  </div>

                  {/* QR Box */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-2.5">
                    <div className="text-xs font-semibold text-slate-300">Scan QR to Install</div>
                    <div className="mx-auto w-36 h-36 bg-white p-2 rounded-xl flex items-center justify-center shadow-md">
                      {/* Generative QR visual representation */}
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(playStoreUrl)}`}
                        alt="Scan to download Ayotrix app on Google Play"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono break-all pt-1">
                      {playStoreUrl}
                    </div>
                  </div>

                  <a
                    href={playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition-colors"
                  >
                    Open in Play Store App <ExternalLink className="inline-block w-3.5 h-3.5 ml-1 -mt-0.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 border-t border-slate-900 bg-slate-950/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Why Install the Ayotrix App?
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Everything you need to grow your brand and scale your software solutions, right in your pocket.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {appFeatures.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/40 transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base text-white mb-2">{feat.title}</h4>
                  <p className="text-xs leading-relaxed text-slate-400">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Share Banner for User */}
      <section className="container mx-auto px-4 max-w-4xl pt-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-950/40 to-slate-900 border border-blue-500/30 p-8 text-center space-y-4">
          <h3 className="text-2xl font-black text-white">Need to Send This Link to Your Client?</h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Click the button below to copy the direct Google Play link or shareable webpage link to send via WhatsApp, Email, or SMS.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              onClick={handleCopyPlayStore}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl px-6"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Google Play Link
            </Button>
            <Button
              onClick={handleCopyPageLink}
              variant="outline"
              className="border-slate-700 bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-6"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Copy Website Page Link
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
