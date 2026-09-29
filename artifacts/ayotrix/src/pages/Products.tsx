import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Check, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  Headphones, 
  MessageSquare, 
  Bot, 
  MapPin, 
  Lock, 
  Smartphone,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import SeoHead from "@/components/SeoHead";
import ProductsHeroShowcase from "@/components/showcase/ProductsHeroShowcase";
import { 
  AdsVisual, 
  WhatsAppMarketingVisual, 
  RcsVisual, 
  OtpVisual, 
  AiAgentsVisual, 
  WhatsAppChatbotVisual, 
  GmbVisual, 
  GoogleAdsVisual 
} from "@/components/showcase/ProductsCardVisuals";

export default function Products() {
  const productCards = [
    {
      id: "01",
      slug: "ads-management",
      title: "Ads Management",
      description: "Ad spend that actually converts.",
      icon: BarChart3,
      iconBg: "bg-purple-600 text-white",
      numberColor: "text-purple-200",
      checkColor: "bg-purple-600 text-white",
      buttonClass: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-500/20",
      points: [
        "Meta, Google & LinkedIn Ads",
        "High ROI Campaigns",
        "Audience Targeting & Optimization"
      ],
      Visual: AdsVisual
    },
    {
      id: "02",
      slug: "whatsapp-marketing",
      title: "WhatsApp Marketing",
      description: "98% open rate. No other channel comes close.",
      icon: MessageSquare,
      iconBg: "bg-emerald-500 text-white",
      numberColor: "text-emerald-200",
      checkColor: "bg-emerald-500 text-white",
      buttonClass: "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-md shadow-emerald-500/20",
      points: [
        "Bulk Messaging",
        "Personalized Campaigns",
        "Automation & Scheduling"
      ],
      Visual: WhatsAppMarketingVisual
    },
    {
      id: "03",
      slug: "rcs-marketing",
      title: "RCS Marketing",
      description: "SMS evolved — rich, interactive, verified.",
      icon: MessageSquare,
      iconBg: "bg-blue-600 text-white",
      numberColor: "text-blue-200",
      checkColor: "bg-blue-600 text-white",
      buttonClass: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/20",
      points: [
        "Rich Media Messaging",
        "Verified Brand Identity",
        "Higher Engagement Rate"
      ],
      Visual: RcsVisual
    },
    {
      id: "04",
      slug: "otp-services",
      title: "OTP Services",
      description: "Secure. Instant. Reliable. Every time.",
      icon: ShieldCheck,
      iconBg: "bg-orange-500 text-white",
      numberColor: "text-orange-200",
      checkColor: "bg-orange-500 text-white",
      buttonClass: "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md shadow-orange-500/20",
      points: [
        "Transactional OTP",
        "High Delivery Rate",
        "Enterprise Grade Security"
      ],
      Visual: OtpVisual
    },
    {
      id: "05",
      slug: "ai-agents",
      title: "AI Agents",
      description: "Your 24/7 AI workforce — never sleeps, never tires.",
      icon: Bot,
      iconBg: "bg-pink-600 text-white",
      numberColor: "text-pink-200",
      checkColor: "bg-pink-600 text-white",
      buttonClass: "bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white shadow-md shadow-pink-500/20",
      points: [
        "Automate Customer Support",
        "Lead Generation & Qualification",
        "AI-Powered Responses"
      ],
      Visual: AiAgentsVisual
    },
    {
      id: "06",
      slug: "whatsapp-chatbot",
      title: "WhatsApp Chatbot",
      description: "Automate 80% of customer conversations on WhatsApp.",
      icon: Bot,
      iconBg: "bg-teal-600 text-white",
      numberColor: "text-teal-200",
      checkColor: "bg-teal-600 text-white",
      buttonClass: "bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white shadow-md shadow-teal-500/20",
      points: [
        "Smart Chat Flows",
        "Lead Capture & Nurturing",
        "Integrations with CRM"
      ],
      Visual: WhatsAppChatbotVisual
    },
    {
      id: "07",
      slug: "google-my-business",
      title: "GMB Optimization",
      description: "Dominate local search. Own your area.",
      icon: MapPin,
      iconBg: "bg-blue-600 text-white",
      numberColor: "text-blue-200",
      checkColor: "bg-blue-600 text-white",
      buttonClass: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/20",
      points: [
        "Google Business Profile Setup",
        "Local SEO Optimization",
        "More Calls, Visits & Leads"
      ],
      Visual: GmbVisual
    },
    {
      id: "08",
      slug: "google-ads",
      title: "Google Ads",
      description: "Show up exactly when customers are searching.",
      icon: TrendingUp,
      iconBg: "bg-amber-500 text-white",
      numberColor: "text-amber-200",
      checkColor: "bg-amber-500 text-white",
      buttonClass: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md shadow-amber-500/20",
      points: [
        "Search, Display & YouTube Ads",
        "Keyword Research & Bidding",
        "Performance Tracking"
      ],
      Visual: GoogleAdsVisual
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFCFF] pt-20 md:pt-24 relative overflow-hidden">
      <SeoHead
        title="Our Products | Communication Suite, WhatsApp, RCS, OTP & AI | Ayotrix"
        description="Battle-tested communication products that connect, automate, and accelerate your business by Ayotrix Infotech."
        path="/products"
      />

      {/* Decorative ambient background glows */}
      <div className="absolute top-0 inset-x-0 h-[650px] pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[580px] bg-gradient-to-b from-blue-100/50 via-sky-50/40 to-transparent blur-3xl" />
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-purple-100/30 rounded-full blur-3xl" />
        <div className="absolute top-40 left-[-10%] w-[450px] h-[450px] bg-emerald-100/35 rounded-full blur-3xl" />
      </div>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-4 md:pt-8 pb-12 md:pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              className="lg:col-span-6 flex flex-col items-start"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Category Pill Tag */}
              <div className="inline-block text-[#2563EB] text-xs sm:text-[13px] font-black tracking-[0.18em] uppercase mb-3">
                COMMUNICATION SUITE
              </div>

              {/* Title with Blue Curve Underline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0A1628] tracking-tight leading-[1.1] mb-5">
                Our{" "}
                <span className="relative inline-block text-[#0A1628]">
                  Products
                  {/* Elegant Blue Smile / Swoosh underline */}
                  <svg 
                    className="absolute -bottom-2.5 left-0 w-full overflow-visible" 
                    height="12" 
                    viewBox="0 0 100 12" 
                    fill="none" 
                    preserveAspectRatio="none"
                  >
                    <path 
                      d="M2 3C28 11 72 11 98 3" 
                      stroke="#2563EB" 
                      strokeWidth="3.8" 
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-600 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-xl mb-8">
                Battle-tested communication products that connect, automate, and accelerate your business.
              </p>

              {/* 4 Feature Pills in a row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-2xl">
                {/* Pill 1 */}
                <div className="flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-100 shadow-xs">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 truncate">All-in-One Platform</span>
                </div>

                {/* Pill 2 */}
                <div className="flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-100 shadow-xs">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 truncate">Easy Integration</span>
                </div>

                {/* Pill 3 */}
                <div className="flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-100 shadow-xs">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 truncate">Scalable Solutions</span>
                </div>

                {/* Pill 4 */}
                <div className="flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-100 shadow-xs">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 truncate">24/7 Support</span>
                </div>
              </div>
            </motion.div>

            {/* Right Showcase: Laptop Dashboard & WhatsApp Phone */}
            <div className="lg:col-span-6 flex justify-center">
              <ProductsHeroShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* 8 PRODUCTS CARDS SECTION (4x2 GRID) */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {productCards.map((product, index) => {
              const IconComp = product.icon;
              const VisualComp = product.Visual;
              return (
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group relative flex flex-col justify-between rounded-[2rem] bg-white border border-slate-100/90 p-5 sm:p-6 shadow-[0_6px_28px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.08)] transition-all duration-300"
                >
                  {/* Card Header & Content */}
                  <div>
                    {/* Top Row: Icon badge & Number */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl ${product.iconBg} flex items-center justify-center shadow-sm`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className={`text-3xl font-black font-mono tracking-tight select-none opacity-80 ${product.numberColor}`}>
                        {product.id}
                      </div>
                    </div>

                    {/* Card Title */}
                    <h3 className="text-lg font-black text-[#0A1628] leading-tight mb-2">
                      {product.title}
                    </h3>

                    {/* Card Description */}
                    <p className="text-slate-500 text-xs leading-relaxed mb-4 min-h-[34px]">
                      {product.description}
                    </p>

                    {/* Bullet Points with Checkmarks */}
                    <div className="space-y-2 mb-4">
                      {product.points.map((pt, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className={`w-3.5 h-3.5 rounded-full ${product.checkColor} flex items-center justify-center shrink-0`}>
                            <Check className="w-2 h-2" />
                          </div>
                          <span className="text-xs font-semibold text-slate-800 truncate">
                            {pt}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Visual Illustration & Button */}
                  <div className="mt-2">
                    {/* 3D Visual */}
                    <div className="mb-4">
                      <VisualComp />
                    </div>

                    {/* Button */}
                    <Link
                      href={`/products/${product.slug}`}
                      className={`w-full inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full font-bold text-xs select-none transition-all duration-200 ${product.buttonClass}`}
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="relative z-10 py-16 md:py-20 bg-gradient-to-b from-transparent to-slate-50/80 border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <ScrollReveal>
            <div className="inline-block text-blue-600 text-xs font-bold tracking-widest uppercase mb-3">
              CONSULTATION
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0A1628] tracking-tight mb-4">
              Not Sure Which Product Fits Your Business?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Talk to our product specialists and we'll craft a custom communication suite designed specifically for your customer acquisition and retention goals.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/25">
                <Link href="/contact" className="flex items-center gap-2">
                  <span>Talk to an Expert</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold">
                <a href="tel:+919752045356">Call Now: +91 97520 45356</a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
