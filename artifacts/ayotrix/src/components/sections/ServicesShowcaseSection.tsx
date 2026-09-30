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
  Wrench 
} from "lucide-react";

interface ServicesShowcaseSectionProps {
  isPage?: boolean;
}

export default function ServicesShowcaseSection({ isPage = false }: ServicesShowcaseSectionProps) {
  const serviceCards = [
    {
      id: "01",
      slug: "ecommerce-development",
      title: "E-Commerce Development",
      description: "End-to-end e-commerce development — from storefront design to payment gateway, inventory management, and admin panel.",
      icon: ShoppingCart,
      iconBg: "bg-purple-600 text-white",
      buttonClass: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-500/25",
      checkColor: "bg-purple-600 text-white",
      numberColor: "text-purple-200",
      image: "/assets/showcase/service_ecommerce_pro.png",
      points: [
        "Custom E-commerce Apps",
        "Secure Payment Integration",
        "Inventory & Order Management",
        "User & Admin Panel"
      ]
    },
    {
      id: "02",
      slug: "taxi-booking-app",
      title: "Taxi Booking App Development",
      description: "Full-stack taxi booking app development with real-time GPS, driver app, customer app, and powerful admin panel.",
      icon: Car,
      iconBg: "bg-orange-500 text-white",
      buttonClass: "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md shadow-orange-500/25",
      checkColor: "bg-orange-500 text-white",
      numberColor: "text-orange-200",
      image: "/assets/showcase/service_taxi_pro.png",
      points: [
        "Real-time GPS Tracking",
        "Customer & Driver App",
        "Multiple Payment Options",
        "Promo Codes & Wallet System"
      ]
    },
    {
      id: "03",
      slug: "service-provider-platform",
      title: "Service Provider Platform Development",
      description: "Custom service marketplace platforms connecting customers with verified professionals — home services, beauty, repair, and more.",
      icon: Wrench,
      iconBg: "bg-emerald-600 text-white",
      buttonClass: "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-500/25",
      checkColor: "bg-emerald-600 text-white",
      numberColor: "text-emerald-200",
      image: "/assets/showcase/service_marketplace_pro.png",
      points: [
        "Multi-provider Marketplace",
        "Service Booking & Scheduling",
        "Provider Verification",
        "Ratings & Reviews"
      ]
    }
  ];

  return (
    <section className={`relative overflow-hidden ${isPage ? "pt-24 md:pt-28 pb-12 md:pb-16" : "pt-24 md:pt-28 pb-12 md:pb-16"} bg-[#FAFCFF]`}>
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 inset-x-0 h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[580px] bg-gradient-to-b from-blue-100/50 via-sky-50/40 to-transparent blur-3xl" />
        <div className="absolute top-10 right-[-8%] w-[500px] h-[500px] bg-purple-100/35 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-[-8%] w-[450px] h-[450px] bg-cyan-100/40 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* HERO AREA: Title, Feature Badges & 3D Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 md:mb-14">
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
              APPLICATION DEVELOPMENT
            </div>

            {/* Title with Blue Curve Underline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0A1628] tracking-tight leading-[1.1] mb-5">
              Our{" "}
              <span className="relative inline-block text-[#1D63EE]">
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
                    stroke="#1D63EE" 
                    strokeWidth="3.8" 
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
              Custom app development tailored to your business — from e-commerce to on-demand platforms.
            </p>

            {/* 4 Feature Badges in 2x2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-xl">
              {/* Badge 1 */}
              <div className="flex items-center gap-3 p-3 bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-purple-500/30">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-black text-slate-900 leading-tight">Custom Solutions</div>
                  <div className="text-[11px] text-slate-500 leading-snug">Tailored to your business needs</div>
                </div>
              </div>

              {/* Badge 2 */}
              <div className="flex items-center gap-3 p-3 bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-black text-slate-900 leading-tight">Scalable & Secure</div>
                  <div className="text-[11px] text-slate-500 leading-snug">Built for long-term growth</div>
                </div>
              </div>

              {/* Badge 3 */}
              <div className="flex items-center gap-3 p-3 bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all">
                <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-orange-500/30">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-black text-slate-900 leading-tight">Modern Technology</div>
                  <div className="text-[11px] text-slate-500 leading-snug">Latest tools & frameworks</div>
                </div>
              </div>

              {/* Badge 4 */}
              <div className="flex items-center gap-3 p-3 bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all">
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

          {/* Right Showcase: 3 Angled Phones Master 3D Showcase */}
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
                src="/assets/showcase/services_hero_showcase_pro.png" 
                alt="Ayotrix Services 3D Showcase"
                className="w-full h-auto object-contain drop-shadow-[0_20px_45px_rgba(37,99,235,0.18)]"
              />
            </motion.div>
          </div>
        </div>

        {/* 3 CORE SERVICES CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {serviceCards.map((service, index) => {
            const IconComp = service.icon;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-row overflow-hidden rounded-[2.25rem] bg-white border border-slate-100/90 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_48px_rgba(37,99,235,0.09)] transition-all duration-300"
              >
                {/* Watermark Number in Top-Right */}
                <span className={`text-4xl sm:text-5xl font-black font-mono select-none opacity-40 absolute top-5 right-6 z-0 ${service.numberColor}`}>
                  {service.id}
                </span>

                {/* Left Content Area */}
                <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between z-10">
                  <div>
                    {/* Top Icon */}
                    <div className="mb-4">
                      <div className={`w-12 h-12 rounded-2xl ${service.iconBg} flex items-center justify-center shadow-md`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Card Title */}
                    <h3 className="text-xl sm:text-2xl font-black text-[#0A1628] leading-tight mb-2.5">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                      {service.description}
                    </p>

                    {/* Checklist of 4 Points */}
                    <div className="space-y-2 mb-6">
                      {service.points.map((pt, i) => (
                        <div key={i} className="flex items-center gap-2">
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

                  {/* Learn More CTA */}
                  <div>
                    <Link
                      href={`/services/${service.slug}`}
                      className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm select-none transition-all duration-200 ${service.buttonClass}`}
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right Graphic Area: Master 3D Illustration */}
                <div className="w-[44%] relative overflow-hidden pointer-events-none select-none flex items-center justify-end z-10">
                  <img
                    src={service.image}
                    alt={service.title}
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
