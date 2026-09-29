import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Check, 
  Settings, 
  ShieldCheck, 
  Zap, 
  Users, 
  ShoppingCart, 
  Car, 
  Wrench,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerParent, StaggerChild } from "@/components/ui/scroll-reveal";
import SeoHead from "@/components/SeoHead";
import ServicesHeroShowcase from "@/components/showcase/ServicesHeroShowcase";
import { EcommerceCardVisual, TaxiCardVisual, MarketplaceCardVisual } from "@/components/showcase/ServicesCardVisuals";

export default function Services() {
  const serviceCards = [
    {
      id: "01",
      slug: "ecommerce-development",
      title: "E-Commerce Development",
      description: "End-to-end e-commerce development — from storefront design to payment gateway, inventory management, and admin panel.",
      icon: ShoppingCart,
      iconBg: "bg-purple-600 text-white",
      numberColor: "text-purple-200",
      checkColor: "bg-purple-600 text-white",
      buttonClass: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-500/25",
      points: [
        "Custom E-commerce Apps",
        "Secure Payment Integration",
        "Inventory & Order Management",
        "User & Admin Panel"
      ],
      Visual: EcommerceCardVisual
    },
    {
      id: "02",
      slug: "taxi-booking-app",
      title: "Taxi Booking App Development",
      description: "Full-stack taxi booking app development with real-time GPS, driver app, customer app, and powerful admin panel.",
      icon: Car,
      iconBg: "bg-orange-500 text-white",
      numberColor: "text-orange-200",
      checkColor: "bg-orange-500 text-white",
      buttonClass: "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md shadow-orange-500/25",
      points: [
        "Real-time GPS Tracking",
        "Customer & Driver App",
        "Multiple Payment Options",
        "Promo Codes & Wallet System"
      ],
      Visual: TaxiCardVisual
    },
    {
      id: "03",
      slug: "service-provider-platform",
      title: "Service Provider Platform Development",
      description: "Custom service marketplace platforms connecting customers with verified professionals — home services, beauty, repair, and more.",
      icon: Wrench,
      iconBg: "bg-emerald-600 text-white",
      numberColor: "text-emerald-200",
      checkColor: "bg-emerald-600 text-white",
      buttonClass: "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-500/25",
      points: [
        "Multi-provider Marketplace",
        "Service Booking & Scheduling",
        "Provider Verification",
        "Ratings & Reviews"
      ],
      Visual: MarketplaceCardVisual
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFCFF] pt-20 md:pt-24 relative overflow-hidden">
      <SeoHead
        title="App Development Services | E-Commerce, Taxi & Marketplace Apps | Ayotrix"
        description="Custom app development tailored to your business — from e-commerce to on-demand platforms by Ayotrix Infotech."
        path="/services"
      />

      {/* Decorative ambient background glows */}
      <div className="absolute top-0 inset-x-0 h-[650px] pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[580px] bg-gradient-to-b from-blue-100/50 via-sky-50/40 to-transparent blur-3xl" />
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-purple-100/30 rounded-full blur-3xl" />
        <div className="absolute top-40 left-[-10%] w-[450px] h-[450px] bg-cyan-100/35 rounded-full blur-3xl" />
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
                APPLICATION DEVELOPMENT
              </div>

              {/* Title with Blue Curve Underline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0A1628] tracking-tight leading-[1.1] mb-5">
                Our{" "}
                <span className="relative inline-block text-[#0A1628]">
                  Services
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
                Custom app development tailored to your business — from e-commerce to on-demand platforms.
              </p>

              {/* 4 Feature Pills in a responsive 2x2 or 4-row layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
                {/* Pill 1 */}
                <div className="flex items-center gap-3 p-3 bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-purple-500/30">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-black text-slate-900 leading-tight">Custom Solutions</div>
                    <div className="text-[11px] text-slate-500 leading-snug">Tailored to your business needs</div>
                  </div>
                </div>

                {/* Pill 2 */}
                <div className="flex items-center gap-3 p-3 bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/30">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-black text-slate-900 leading-tight">Scalable & Secure</div>
                    <div className="text-[11px] text-slate-500 leading-snug">Built for long-term growth</div>
                  </div>
                </div>

                {/* Pill 3 */}
                <div className="flex items-center gap-3 p-3 bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-orange-500/30">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-black text-slate-900 leading-tight">Modern Technology</div>
                    <div className="text-[11px] text-slate-500 leading-snug">Latest tools & frameworks</div>
                  </div>
                </div>

                {/* Pill 4 */}
                <div className="flex items-center gap-3 p-3 bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/30">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-black text-slate-900 leading-tight">End-to-End Support</div>
                    <div className="text-[11px] text-slate-500 leading-snug">From idea to launch</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Showcase: 3 Angled Phones & Floating Badges */}
            <div className="lg:col-span-6 flex justify-center">
              <ServicesHeroShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* 3 CORE SERVICES CARDS SECTION */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {serviceCards.map((service, index) => {
              const IconComp = service.icon;
              const VisualComp = service.Visual;
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -6 }}
                  className="group relative flex flex-col justify-between rounded-[2.25rem] bg-white border border-slate-100/90 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_48px_rgba(37,99,235,0.08)] transition-all duration-300"
                >
                  {/* Top Header Row with Icon and Large Number */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-2xl ${service.iconBg} flex items-center justify-center shadow-md`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <div className={`text-4xl sm:text-5xl font-black font-mono tracking-tight select-none opacity-80 ${service.numberColor}`}>
                        {service.id}
                      </div>
                    </div>

                    {/* Card Title */}
                    <h3 className="text-xl sm:text-2xl font-black text-[#0A1628] leading-tight mb-3">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Checklist of 4 Points */}
                    <div className="space-y-2.5 mb-6">
                      {service.points.map((pt, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <div className={`w-4 h-4 rounded-full ${service.checkColor} flex items-center justify-center shrink-0`}>
                            <Check className="w-2.5 h-2.5" />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-slate-800">
                            {pt}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Area: Visual Illustration & Learn More CTA */}
                  <div className="mt-2">
                    {/* Rich 3D Visual Render Component */}
                    <div className="mb-6">
                      <VisualComp />
                    </div>

                    {/* CTA Button */}
                    <Link
                      href={`/services/${service.slug}`}
                      className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-bold text-sm select-none transition-all duration-200 ${service.buttonClass}`}
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
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
              START YOUR PROJECT
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0A1628] tracking-tight mb-4">
              Ready to Build Your Custom Application?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Tell us your requirements and our expert engineering team will deliver a comprehensive blueprint and quote within 24 hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/25">
                <Link href="/contact" className="flex items-center gap-2">
                  <span>Get in Touch</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold">
                <a href="tel:+919752045356">Schedule a Call</a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
