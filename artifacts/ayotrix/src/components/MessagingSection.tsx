import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, CheckCircle, MessageCircle, Zap, Shield, Globe, Users, TrendingUp } from "lucide-react";
import { ScrollReveal, StaggerParent, StaggerChild } from "@/components/ui/scroll-reveal";
import { useGetProducts } from "@workspace/api-client-react";
import IconDisplay, { resolveIcon } from "@/components/IconDisplay";
import { PRODUCTS } from "@/lib/static-data";

const PLATFORMS = [
  {
    id: "whatsapp",
    name: "WhatsApp Business Solution",
    shortName: "WhatsApp",
    tagline: "Connect on the world's #1 messaging app",
    description: "Reach 2+ billion users with official WhatsApp Business API. Rich media, interactive buttons, broadcast campaigns, and automated chatbots — all on a channel users already trust.",
    color: "#25D366",
    darkColor: "#128C5E",
    bgGradient: "linear-gradient(135deg, #001A0D 0%, #003D20 60%, #065F46 100%)",
    cardGradient: "linear-gradient(145deg, rgba(37,211,102,0.12) 0%, rgba(37,211,102,0.04) 100%)",
    borderColor: "rgba(37,211,102,0.3)",
    glowColor: "rgba(37,211,102,0.25)",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    stats: [{ v: "2B+", l: "Users" }, { v: "98%", l: "Open Rate" }, { v: "45%", l: "Click Rate" }],
    features: ["Official API Access", "Rich Media & Buttons", "Broadcast Campaigns", "AI Chatbot Integration"],
    link: "/products/whatsapp-marketing",
  },
  {
    id: "rcs",
    name: "RCS Business Messaging",
    shortName: "RCS",
    tagline: "Next-gen SMS with rich media & verification",
    description: "Upgrade your SMS to RCS — branded sender identity, carousel cards, quick replies, and read receipts. Delivered to the native messaging app with zero app download required.",
    color: "#2563EB",
    darkColor: "#1D4ED8",
    bgGradient: "linear-gradient(135deg, #000B28 0%, #0F2460 60%, #1E3A8A 100%)",
    cardGradient: "linear-gradient(145deg, rgba(37,99,235,0.12) 0%, rgba(37,99,235,0.04) 100%)",
    borderColor: "rgba(37,99,235,0.3)",
    glowColor: "rgba(37,99,235,0.25)",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12zM7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
      </svg>
    ),
    stats: [{ v: "70%", l: "Higher Engagement" }, { v: "4×", l: "vs Email CTR" }, { v: "100%", l: "Verified" }],
    features: ["Verified Brand Sender", "Interactive Carousels", "Read Receipts", "Fallback to SMS"],
    link: "/products/rcs-marketing",
  },
  {
    id: "google",
    name: "Google's Business Messages",
    shortName: "Google Chat",
    tagline: "Be found & respond instantly on Google",
    description: "Convert searchers into customers by chatting directly from Google Search and Maps. Automated FAQs, live agent handoff, and appointment booking — right where customers are looking.",
    color: "#4285F4",
    darkColor: "#1A73E8",
    bgGradient: "linear-gradient(135deg, #000D24 0%, #0C2461 60%, #1A3C7A 100%)",
    cardGradient: "linear-gradient(145deg, rgba(66,133,244,0.12) 0%, rgba(66,133,244,0.04) 100%)",
    borderColor: "rgba(66,133,244,0.3)",
    glowColor: "rgba(66,133,244,0.25)",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"/>
      </svg>
    ),
    stats: [{ v: "5B+", l: "Google Users" }, { v: "3×", l: "Lead Conversion" }, { v: "24/7", l: "Availability" }],
    features: ["Google Search Integration", "Maps Business Chat", "Automated FAQ Bot", "Live Agent Support"],
    link: "/products/whatsapp-chatbot",
  },
  {
    id: "instagram",
    name: "Messenger API for Instagram",
    shortName: "Instagram",
    tagline: "Turn followers into loyal customers",
    description: "Automate and scale Instagram DM conversations with the official Messenger API. Handle story replies, comments, and DMs with intelligent bots and seamless human handoff.",
    color: "#E1306C",
    darkColor: "#C13584",
    bgGradient: "linear-gradient(135deg, #1A0010 0%, #4A0A2E 60%, #7B1C5E 100%)",
    cardGradient: "linear-gradient(145deg, rgba(225,48,108,0.12) 0%, rgba(225,48,108,0.04) 100%)",
    borderColor: "rgba(225,48,108,0.3)",
    glowColor: "rgba(225,48,108,0.25)",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    stats: [{ v: "2B+", l: "Active Users" }, { v: "80%", l: "DM Open Rate" }, { v: "5×", l: "Engagement" }],
    features: ["Story Reply Automation", "DM Bot Flows", "Comment Auto-Reply", "Influencer Campaign Tools"],
    link: "/products/ai-agents",
  },
];

const FLOATING_LAYOUT = [
  { color: "#25D366", x: "8%", y: "18%", size: 48, delay: 0 },
  { color: "#2563EB", x: "88%", y: "12%", size: 42, delay: 0.4 },
  { color: "#E1306C", x: "5%", y: "72%", size: 44, delay: 0.8 },
  { color: "#4285F4", x: "91%", y: "68%", size: 40, delay: 0.6 },
  { color: "#8B5CF6", x: "50%", y: "8%", size: 36, delay: 1.0 },
  { color: "#F59E0B", x: "22%", y: "88%", size: 32, delay: 1.2 },
  { color: "#06B6D4", x: "78%", y: "85%", size: 34, delay: 0.3 },
];

const DEFAULT_FLOAT_ICONS = ["💬", "📡", "📸", "🔍", "🤖", "⚡", "🌐"];

export default function MessagingSection() {
  const [activeTab, setActiveTab] = useState(0);
  const active = PLATFORMS[activeTab];
  const { data: apiProducts } = useGetProducts();

  const floatingIcons = useMemo(() => {
    const products = apiProducts && apiProducts.length > 0
      ? (apiProducts as any[]).filter(p => p.isActive !== false)
      : PRODUCTS;
    return FLOATING_LAYOUT.map((layout, i) => ({
      ...layout,
      icon: resolveIcon(products[i % products.length], DEFAULT_FLOAT_ICONS[i]),
    }));
  }, [apiProducts]);

  return (
    <section className="relative overflow-hidden py-24" style={{ background: "linear-gradient(180deg, #F5FBF0 0%, #EEF8E6 50%, #F5FBF0 100%)" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, rgba(18,99,232,0.15), transparent)" }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, rgba(110,221,0,0.18), transparent)" }} />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-bold uppercase tracking-widest"
            style={{ background: "rgba(110,221,0,0.1)", border: "1px solid rgba(110,221,0,0.3)", color: "#3D8B00" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#6EDD00" }} />
            Enhanced Business Messaging
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-5 leading-tight" style={{ color: "#0A1628" }}>
            Reach Customers on{" "}
            <span style={{ backgroundImage: "linear-gradient(90deg, #1263E8, #6EDD00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Every Channel
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            From WhatsApp to RCS, Google to Instagram — power every conversation with enterprise-grade messaging tools that convert.
          </p>
        </ScrollReveal>

        <div className="relative mb-16">
          <div className="relative rounded-3xl overflow-hidden min-h-[340px] flex items-center"
            style={{ background: "linear-gradient(135deg, #070D18 0%, #0A1A10 50%, #071428 100%)" }}>
            <div className="absolute inset-0">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, rgba(18,99,232,0.22) 0%, transparent 50%),
                                  radial-gradient(circle at 80% 50%, rgba(110,221,0,0.15) 0%, transparent 50%)`,
              }} />
              <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {floatingIcons.map((fi, i) => (
              <motion.div
                key={i}
                className="absolute hidden md:flex items-center justify-center rounded-2xl shadow-xl overflow-hidden"
                style={{ left: fi.x, top: fi.y, width: fi.size, height: fi.size, background: `${fi.color}22`, border: `1px solid ${fi.color}44`, fontSize: fi.size * 0.45 }}
                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4 + i * 0.5, delay: fi.delay, repeat: Infinity, ease: "easeInOut" }}
              >
                <IconDisplay icon={fi.icon} imgClassName="w-[60%] h-[60%] object-contain" />
              </motion.div>
            ))}

            <div className="relative z-10 w-full px-8 md:px-16 py-12 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 text-center md:text-left">
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-bold uppercase tracking-widest"
                  style={{ background: "rgba(110,221,0,0.15)", border: "1px solid rgba(110,221,0,0.4)", color: "#A3E635" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Zap className="w-3 h-3" /> Omnichannel Messaging
                </motion.div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                  One Platform.<br />
                  <span style={{ backgroundImage: "linear-gradient(90deg, #1A8FFF, #6EDD00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    All Channels.
                  </span>
                </h3>
                <p className="text-blue-100/70 text-base mb-6 max-w-md">
                  Deploy unified messaging across WhatsApp, RCS, Google, and Instagram from a single dashboard. Automate, engage, and convert at scale.
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {["Unified Dashboard", "AI Automation", "Real Analytics", "24/7 Support"].map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#CBD5E1" }}>
                      <CheckCircle className="w-3 h-3" style={{ color: "#6EDD00" }} /> {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0">
                <img
                  src="/messaging-illustration.png"
                  alt="Omnichannel Messaging"
                  className="w-72 md:w-80 rounded-2xl object-cover shadow-2xl"
                  style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {PLATFORMS.map((p, i) => (
            <motion.button
              key={p.id}
              onClick={() => setActiveTab(i)}
              className="relative flex items-center gap-2.5 px-5 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-300"
              style={{
                background: activeTab === i ? p.color : "rgba(255,255,255,0.8)",
                color: activeTab === i ? "#fff" : "#64748B",
                border: activeTab === i ? `1px solid ${p.color}` : "1px solid rgba(0,0,0,0.08)",
                boxShadow: activeTab === i ? `0 8px 24px ${p.glowColor}` : "0 2px 8px rgba(0,0,0,0.06)",
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="w-5 h-5 flex-shrink-0" style={{ color: activeTab === i ? "#fff" : p.color }}>
                {p.icon}
              </span>
              {p.shortName}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl overflow-hidden"
            style={{ background: "white", border: `1px solid ${active.borderColor}`, boxShadow: `0 20px 60px ${active.glowColor}` }}
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 flex flex-col justify-between" style={{ background: active.bgGradient }}>
                <div>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 p-3.5"
                    style={{ background: `${active.color}22`, border: `1px solid ${active.color}44` }}>
                    <span style={{ color: active.color }}>{active.icon}</span>
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: active.color }}>
                    {active.shortName} Solution
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">{active.name}</h3>
                  <p className="text-sm font-semibold mb-4" style={{ color: `${active.color}CC` }}>{active.tagline}</p>
                  <p className="text-blue-100/60 text-sm leading-relaxed mb-8">{active.description}</p>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {active.stats.map((s) => (
                      <div key={s.l} className="text-center rounded-xl p-3" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                        <div className="text-xl font-black text-white">{s.v}</div>
                        <div className="text-xs text-blue-200/60 mt-0.5">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <Link href={active.link}>
                  <motion.div
                    className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl cursor-pointer"
                    style={{ background: active.color, color: "#fff" }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Explore {active.shortName} <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </div>

              <div className="p-8 md:p-12 bg-white flex flex-col justify-center">
                <div className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: active.color }}>
                  Key Capabilities
                </div>
                <div className="space-y-4 mb-8">
                  {active.features.map((f, i) => (
                    <motion.div
                      key={f}
                      className="flex items-center gap-3 p-4 rounded-xl"
                      style={{ background: active.cardGradient, border: `1px solid ${active.borderColor}` }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${active.color}15` }}>
                        <CheckCircle className="w-4 h-4" style={{ color: active.color }} />
                      </div>
                      <span className="font-semibold text-sm" style={{ color: "#0A1628" }}>{f}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg, #F8FAFF, #EFF4FF)", border: "1px solid rgba(37,99,235,0.1)" }}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${active.color}15` }}>
                      <TrendingUp className="w-5 h-5" style={{ color: active.color }} />
                    </div>
                    <div>
                      <div className="font-bold text-sm mb-1" style={{ color: "#0A1628" }}>Why Businesses Choose This</div>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {activeTab === 0 && "WhatsApp has the highest open rate of any digital channel — 98%. Every message you send is seen, making it the most cost-effective customer communication channel available today."}
                        {activeTab === 1 && "RCS delivers branded, verified messages in the native SMS app — no app downloads needed. 70% higher engagement vs traditional SMS with interactive rich media capabilities."}
                        {activeTab === 2 && "Your customers are already on Google Search. Business Messages lets you capture that intent in real-time and convert searchers directly into paying customers."}
                        {activeTab === 3 && "Instagram's 2B users are highly engaged and ready to buy. Automate DM conversations to turn every follower interaction into a qualified sales opportunity."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <StaggerParent className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {PLATFORMS.map((p, i) => (
            <StaggerChild key={p.id}>
              <motion.button
                onClick={() => setActiveTab(i)}
                className="relative group overflow-hidden rounded-2xl p-5 text-left w-full cursor-pointer"
                style={{
                  background: activeTab === i ? p.bgGradient : "white",
                  border: `1px solid ${activeTab === i ? p.color : "rgba(0,0,0,0.08)"}`,
                  boxShadow: activeTab === i ? `0 8px 32px ${p.glowColor}` : "0 2px 8px rgba(0,0,0,0.04)",
                }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === i && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: p.color }} />
                )}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 p-2"
                  style={{ background: `${p.color}${activeTab === i ? "22" : "12"}`, border: `1px solid ${p.color}30` }}>
                  <span style={{ color: p.color }}>{p.icon}</span>
                </div>
                <div className="font-bold text-xs mb-1" style={{ color: activeTab === i ? "white" : "#0A1628" }}>{p.shortName}</div>
                <div className="text-xs leading-relaxed" style={{ color: activeTab === i ? "rgba(255,255,255,0.6)" : "#94A3B8" }}>{p.tagline}</div>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold" style={{ color: p.color }}>
                  Learn more <ArrowUpRight className="w-3 h-3" />
                </div>
              </motion.button>
            </StaggerChild>
          ))}
        </StaggerParent>

        <ScrollReveal delay={0.2} className="mt-12">
          <div className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ background: "linear-gradient(135deg, #070D18, #0A1A10)", border: "1px solid rgba(110,221,0,0.25)" }}>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                {[{ icon: <Shield className="w-4 h-4" />, label: "Enterprise Security" }, { icon: <Globe className="w-4 h-4" />, label: "Global Coverage" }, { icon: <Users className="w-4 h-4" />, label: "2000+ Brands" }].map((b) => (
                  <span key={b.label} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(110,221,0,0.1)", border: "1px solid rgba(110,221,0,0.25)", color: "#A3E635" }}>
                    {b.icon} {b.label}
                  </span>
                ))}
              </div>
              <h4 className="text-2xl md:text-3xl font-black text-white mb-2">Ready to start messaging at scale?</h4>
              <p className="text-blue-200/60 text-sm">Get a free consultation and see which channels work best for your business.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link href="/contact">
                <motion.div
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm cursor-pointer text-white"
                  style={{ background: "linear-gradient(135deg, #1263E8, #6EDD00)", boxShadow: "0 0 20px rgba(110,221,0,0.25)" }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Get Free Demo <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Link>
              <Link href="/products">
                <motion.div
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "white" }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View All Products
                </motion.div>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
