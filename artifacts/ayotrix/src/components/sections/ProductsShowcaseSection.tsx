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
  TrendingUp
} from "lucide-react";

interface ProductsShowcaseSectionProps {
  isPage?: boolean;
}

export default function ProductsShowcaseSection({ isPage = false }: ProductsShowcaseSectionProps) {
  const productCards = [
    {
      id: "01",
      slug: "ads-management",
      title: "Ads Management",
      description: "Ad spend that actually converts.",
      icon: BarChart3,
      iconBg: "bg-purple-600 text-white",
      numberColor: "text-purple-300",
      checkColor: "bg-purple-600 text-white",
      buttonClass: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-sm shadow-purple-500/20",
      image: "/assets/showcase/card_ads_pro.png",
      points: [
        "Meta, Google & LinkedIn Ads",
        "High ROI Campaigns",
        "Audience Targeting & Optimization"
      ]
    },
    {
      id: "02",
      slug: "whatsapp-marketing",
      title: "WhatsApp Marketing",
      description: "98% open rate. No other channel comes close.",
      icon: MessageSquare,
      iconBg: "bg-emerald-500 text-white",
      numberColor: "text-emerald-300",
      checkColor: "bg-emerald-500 text-white",
      buttonClass: "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-sm shadow-emerald-500/20",
      image: "/assets/showcase/card_whatsapp_pro.png",
      points: [
        "Bulk Messaging",
        "Personalized Campaigns",
        "Automation & Scheduling"
      ]
    },
    {
      id: "03",
      slug: "rcs-marketing",
      title: "RCS Marketing",
      description: "SMS evolved — rich, interactive, verified.",
      icon: MessageSquare,
      iconBg: "bg-blue-600 text-white",
      numberColor: "text-blue-300",
      checkColor: "bg-blue-600 text-white",
      buttonClass: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-sm shadow-blue-500/20",
      image: "/assets/showcase/card_rcs_pro.png",
      points: [
        "Rich Media Messaging",
        "Verified Brand Identity",
        "Higher Engagement Rate"
      ]
    },
    {
      id: "04",
      slug: "otp-services",
      title: "OTP Services",
      description: "Secure. Instant. Reliable. Every time.",
      icon: ShieldCheck,
      iconBg: "bg-orange-500 text-white",
      numberColor: "text-orange-300",
      checkColor: "bg-orange-500 text-white",
      buttonClass: "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-sm shadow-orange-500/20",
      image: "/assets/showcase/card_otp_pro.png",
      points: [
        "Transactional OTP",
        "High Delivery Rate",
        "Enterprise Grade Security"
      ]
    },
    {
      id: "05",
      slug: "ai-agents",
      title: "AI Agents",
      description: "Your 24/7 AI workforce — never sleeps, never tires.",
      icon: Bot,
      iconBg: "bg-pink-600 text-white",
      numberColor: "text-pink-300",
      checkColor: "bg-pink-600 text-white",
      buttonClass: "bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white shadow-sm shadow-pink-500/20",
      image: "/assets/showcase/card_ai_agents_pro.png",
      points: [
        "Automate Customer Support",
        "Lead Generation & Qualification",
        "AI-Powered Responses"
      ]
    },
    {
      id: "06",
      slug: "whatsapp-chatbot",
      title: "WhatsApp Chatbot",
      description: "Automate 80% of customer conversations on WhatsApp.",
      icon: Bot,
      iconBg: "bg-teal-600 text-white",
      numberColor: "text-teal-300",
      checkColor: "bg-teal-600 text-white",
      buttonClass: "bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white shadow-sm shadow-teal-500/20",
      image: "/assets/showcase/card_chatbot_pro.png",
      points: [
        "Smart Chat Flows",
        "Lead Capture & Nurturing",
        "Integrations with CRM"
      ]
    },
    {
      id: "07",
      slug: "google-my-business",
      title: "GMB Optimization",
      description: "Dominate local search. Own your area.",
      icon: MapPin,
      iconBg: "bg-blue-600 text-white",
      numberColor: "text-blue-300",
      checkColor: "bg-blue-600 text-white",
      buttonClass: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-sm shadow-blue-500/20",
      image: "/assets/showcase/card_gmb_pro.png",
      points: [
        "Google Business Profile Setup",
        "Local SEO Optimization",
        "More Calls, Visits & Leads"
      ]
    },
    {
      id: "08",
      slug: "google-ads",
      title: "Google Ads",
      description: "Show up exactly when customers are searching.",
      icon: TrendingUp,
      iconBg: "bg-amber-500 text-white",
      numberColor: "text-amber-300",
      checkColor: "bg-amber-500 text-white",
      buttonClass: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-sm shadow-amber-500/20",
      image: "/assets/showcase/card_google_ads_pro.png",
      points: [
        "Search, Display & YouTube Ads",
        "Keyword Research & Bidding",
        "Performance Tracking"
      ]
    }
  ];

  return (
    <section className={`relative overflow-hidden ${isPage ? "pt-24 md:pt-28 pb-12 md:pb-16" : "py-12 md:py-16 border-t border-slate-100"} bg-[#FAFCFF]`}>
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 inset-x-0 h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[580px] bg-gradient-to-b from-blue-100/40 via-sky-50/30 to-transparent blur-3xl" />
        <div className="absolute top-10 left-[-5%] w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[-5%] w-[450px] h-[450px] bg-emerald-100/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* HERO AREA: Title, Feature Badges & 3D Master Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 md:mb-12">
          {/* Left Content */}
          <motion.div 
            className="lg:col-span-6 flex flex-col items-start"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Category Pill Tag */}
            <div className="inline-block text-[#2563EB] text-xs sm:text-[13px] font-black tracking-[0.18em] uppercase mb-3">
              COMMUNICATION SUITE
            </div>

            {/* Title with Blue Curve Underline */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0A1628] tracking-tight leading-[1.1] mb-5">
              Our{" "}
              <span className="relative inline-block text-[#1D63EE]">
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
                    stroke="#1D63EE" 
                    strokeWidth="3.8" 
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mb-6">
              Battle-tested communication products that connect, automate, and accelerate your business.
            </p>

            {/* 4 Feature Badges in a Row / 2x2 grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-2xl mb-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-sm rounded-xl border border-slate-100 shadow-xs">
                <div className="w-7 h-7 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 truncate">All-in-One Platform</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-sm rounded-xl border border-slate-100 shadow-xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 truncate">Easy Integration</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-sm rounded-xl border border-slate-100 shadow-xs">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 truncate">Scalable Solutions</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-sm rounded-xl border border-slate-100 shadow-xs">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                  <Headphones className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 truncate">24/7 Support</span>
              </div>
            </div>
          </motion.div>

          {/* Right Showcase: Exact 3D Master Composition */}
          <div className="lg:col-span-6 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.25 } }}
              className="relative select-none w-full max-w-[580px]"
            >
              <img 
                src="/assets/showcase/products_hero_showcase_pro.png" 
                alt="Ayotrix Communication Suite Products Showcase"
                className="w-full h-auto object-contain drop-shadow-[0_20px_45px_rgba(37,99,235,0.18)]"
              />
            </motion.div>
          </div>
        </div>

        {/* 8 PRODUCTS CARDS GRID (4x2 on Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {productCards.map((product, index) => {
            const IconComp = product.icon;
            return (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group relative flex flex-row overflow-hidden rounded-[2rem] bg-white border border-slate-100/90 shadow-[0_6px_28px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.09)] transition-all duration-300"
              >
                {/* Watermark Number in Top-Right */}
                <span className={`text-3xl sm:text-4xl font-black font-mono select-none opacity-40 absolute top-3.5 right-4 z-0 ${product.numberColor}`}>
                  {product.id}
                </span>

                {/* Left Content Area (58% width) */}
                <div className="flex-1 p-5 sm:p-5 flex flex-col justify-between z-10 min-w-0">
                  <div>
                    {/* Top Row: Icon */}
                    <div className="mb-3">
                      <div className={`w-10 h-10 rounded-xl ${product.iconBg} flex items-center justify-center shadow-xs`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Card Title */}
                    <h3 className="text-base sm:text-lg font-black text-[#0A1628] leading-tight mb-1.5 truncate">
                      {product.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-500 text-xs leading-relaxed mb-3.5 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Checklist of 3 Points */}
                    <div className="space-y-1.5 mb-4">
                      {product.points.map((pt, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <div className={`w-3.5 h-3.5 rounded-full ${product.checkColor} flex items-center justify-center shrink-0`}>
                            <Check className="w-2 h-2" />
                          </div>
                          <span className="text-[11px] font-semibold text-slate-800 leading-snug truncate">
                            {pt}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learn More CTA */}
                  <div>
                    <Link
                      href={`/products/${product.slug}`}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs select-none transition-all duration-200 ${product.buttonClass}`}
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right Graphic Area: Master 3D Illustration */}
                <div className="w-[42%] relative overflow-hidden pointer-events-none select-none flex items-center justify-end z-10">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover object-right group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
