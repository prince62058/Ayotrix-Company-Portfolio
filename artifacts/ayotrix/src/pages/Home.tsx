import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, CheckCircle2, ArrowUpRight, Smartphone, Star, ShieldCheck, Download, Copy, Check } from "lucide-react";
import { ScrollReveal, StaggerParent, StaggerChild } from "@/components/ui/scroll-reveal";
import { DM_SERVICES } from "@/lib/static-data";
import MessagingSection from "@/components/MessagingSection";
import GetStartedForm from "@/components/GetStartedForm";
import ServicesShowcaseSection from "@/components/sections/ServicesShowcaseSection";
import ProductsShowcaseSection from "@/components/sections/ProductsShowcaseSection";
import { useGetBanners, useGetServices, useGetSiteSettings } from "@workspace/api-client-react";
import SeoHead from "@/components/SeoHead";
import IconDisplay, { resolveIcon } from "@/components/IconDisplay";
import { useToast } from "@/hooks/use-toast";
import appIconImg from "@assets/marketingkart-icon.png";

const HERO_SLIDES = [
  {
    badge: "Official Mobile App",
    title: "Download MarketingKart",
    accent: "On Google Play Store",
    subtitle: "Launch WhatsApp & RCS marketing campaigns, track live software projects, and calculate instant quotes right from your smartphone.",
    cta: "Download on Google Play",
    ctaLink: "https://play.google.com/store/apps/details?id=com.marketingkart.app",
    tag: "4.9★ on Google Play Store",
    imageUrl: "",
  },
  {
    badge: "Application Development",
    title: "Build World-Class",
    accent: "Mobile & Web Apps",
    subtitle: "E-Commerce stores, Taxi booking apps, and Service marketplace platforms — custom-built for your exact business requirements.",
    cta: "Explore Services",
    ctaLink: "/services",
    tag: "150+ Apps Delivered",
    imageUrl: "",
  },
  {
    badge: "Communication Products",
    title: "Power Your Business with Smart",
    accent: "Communication Tools",
    subtitle: "WhatsApp Marketing, RCS Messaging, AI Agents, OTP Services — all in one platform. Connect with your customers at scale.",
    cta: "View Products",
    ctaLink: "/products",
    tag: "Trusted by 2000+ businesses",
    imageUrl: "",
  },
  {
    badge: "Digital Marketing",
    title: "Accelerate Growth with",
    accent: "Digital Marketing",
    subtitle: "Google Ads, Social Media, SEO, Graphic Design, UGC Reels — comprehensive digital marketing that drives real results.",
    cta: "Start Growing",
    ctaLink: "/digital-marketing",
    tag: "200% Average ROI",
    imageUrl: "",
  },
];

function HeroBanner() {
  const { data: dynamicBanners } = useGetBanners();
  const [current, setCurrent] = useState(0);
  const mX = useMotionValue(0.5);
  const mY = useMotionValue(0.5);
  const heroX = useSpring(useTransform(mX, [0, 1], [-8, 8]), { stiffness: 120, damping: 28 });
  const heroY = useSpring(useTransform(mY, [0, 1], [-5, 5]), { stiffness: 120, damping: 28 });

  const onHeroMouse = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mX.set((e.clientX - r.left) / r.width);
    mY.set((e.clientY - r.top) / r.height);
  }, [mX, mY]);

  const slides = dynamicBanners && dynamicBanners.length > 0 ? [
    HERO_SLIDES[0],
    ...dynamicBanners.map(b => ({
      badge: "Featured",
      title: b.title,
      accent: "",
      subtitle: b.subtitle,
      cta: b.ctaText,
      ctaLink: b.ctaLink,
      tag: "Updated live",
      imageUrl: b.imageUrl,
    }))
  ] : HERO_SLIDES;

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, [slides.length]);

  const slide = slides[current] || HERO_SLIDES[0];
  const isDefaultMedia = !slide.imageUrl || slide.imageUrl === "default";
  const isVideo = slide.imageUrl && (
    slide.imageUrl.startsWith("data:video/") ||
    slide.imageUrl.endsWith(".mp4") ||
    slide.imageUrl.endsWith(".webm") ||
    slide.imageUrl.endsWith(".mov") ||
    slide.imageUrl.includes(".mp4?")
  );

  return (
    <section
      className="relative w-full min-h-[92vh] overflow-hidden flex items-center"
      onMouseMove={onHeroMouse}
    >
      {!isDefaultMedia ? (
        isVideo ? (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={slide.imageUrl}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={slide.imageUrl}
            alt={slide.title}
          />
        )
      ) : (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/hero-banner.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      )}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(8,13,24,0.88) 0%, rgba(12,22,50,0.78) 40%, rgba(8,24,16,0.68) 100%)" }} />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(18,99,232,0.3), transparent)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(110,221,0,0.2), transparent)" }} />
      </div>

      <motion.div className="relative z-10 w-full" style={{ x: heroX, y: heroY }}>
        <div className="container mx-auto px-4 max-w-7xl py-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="max-w-3xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-sm font-semibold"
                style={{ background: "rgba(18,99,232,0.22)", border: "1px solid rgba(110,221,0,0.35)", color: "#A3E635" }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#6EDD00" }} />
                {slide.badge}
              </motion.div>

              <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white leading-tight mb-4">
                {slide.title}{" "}
                <span style={{ backgroundImage: "linear-gradient(90deg, #1A8FFF, #6EDD00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {slide.accent}
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-xl text-blue-100/80 max-w-2xl mb-10 leading-relaxed"
              >
                {slide.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <Button asChild size="lg" className="bg-white text-blue-900 font-bold px-8 py-6 text-base rounded-2xl hover:bg-blue-50 shadow-[0_0_30px_rgba(255,255,255,0.25)]">
                  <Link href={slide.ctaLink}>{slide.cta} <ArrowRight className="ml-2 w-5 h-5 shrink-0" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/25 text-white hover:bg-white/10 px-8 py-6 text-base rounded-2xl">
                  <a
                    href="#get-started"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById("get-started");
                      const lenis = (window as any).__lenis;
                      if (el && lenis) lenis.scrollTo(el, { offset: -20 });
                      else el?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    Get Free Quote <ChevronRight className="ml-1 w-4 h-4 shrink-0" />
                  </a>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#CBD5E1" }}
              >
                <CheckCircle2 className="w-4 h-4" style={{ color: "#6EDD00" }} />
                {slide.tag}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            style={{ background: i === current ? "#6EDD00" : "rgba(255,255,255,0.3)" }}
            className={`h-1 transition-all duration-300 rounded-full ${i === current ? "w-8" : "w-3"}`} />
        ))}
      </div>
    </section>
  );
}



function DigitalMarketingSection() {
  const { data: apiServices } = useGetServices();
  const dmServices = apiServices && apiServices.length > 0 ? (apiServices as any[]).filter(s => s.category === "Digital Marketing" && s.isActive !== false) : DM_SERVICES;

  return (
    <section className="container mx-auto px-4 max-w-7xl py-8">
      <ScrollReveal className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 pb-6 border-b border-gray-100 gap-4">
        <div>
          <div className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Grow Online</div>
          <h2 className="text-4xl md:text-5xl font-black" style={{ color: "#0A1628" }}>Digital Marketing</h2>
          <p className="text-muted-foreground mt-3 max-w-xl">Full-funnel digital marketing — social media, SEO, ads, and design that drives real business growth.</p>
        </div>
        <Button variant="ghost" asChild className="text-primary hover:text-foreground border border-primary/30 hover:border-primary hover:bg-primary/10 rounded-2xl px-6">
          <Link href="/digital-marketing">View All <ArrowUpRight className="ml-2 w-4 h-4" /></Link>
        </Button>
      </ScrollReveal>

      <StaggerParent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {dmServices.map((dm, index) => (
          <StaggerChild key={dm.slug}>
            <Link href={`/digital-marketing/${dm.slug}`}>
              <motion.div
                className="group relative overflow-hidden rounded-2xl p-8 h-full cursor-pointer"
                style={{ background: dm.gradient, boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25 }}
              >
                <div className="text-3xl mb-4 overflow-hidden w-12 h-12 flex items-center justify-center">
                  <IconDisplay icon={resolveIcon(dm)} alt={dm.name} imgClassName="w-8 h-8 object-contain" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{dm.name}</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">{dm.tagline}</p>
                <span className="text-white/90 text-xs font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ArrowUpRight className="w-3 h-3" />
                </span>
                <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20" style={{ background: dm.color }} />
              </motion.div>
            </Link>
          </StaggerChild>
        ))}
      </StaggerParent>
    </section>
  );
}

function PlayStoreAppSection() {
  const { data: settings } = useGetSiteSettings();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const playStoreUrl =
    (settings as any)?.playStoreUrl ||
    "https://play.google.com/store/apps/details?id=com.marketingkart.app";

  const handleCopy = () => {
    navigator.clipboard.writeText(playStoreUrl);
    setCopied(true);
    toast({
      title: "Play Store Link Copied!",
      description: "Direct link copied to clipboard. You can now share it.",
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative overflow-hidden py-20" style={{ background: "linear-gradient(180deg, #070D18 0%, #0D1B2A 100%)" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full blur-[120px]" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.2), transparent)" }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.15), transparent)" }} />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-8 md:p-14 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Available on Google Play Store
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                Get the Official{" "}
                <span className="bg-gradient-to-r from-red-500 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                  MarketingKart.ai App
                </span>
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-lg">
                Track your software projects, launch high-ROI WhatsApp & RCS campaigns, calculate instant quotes, and receive 24/7 dedicated support right from your phone.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>4.9★</span>
                </div>
                <span>•</span>
                <span className="text-slate-300 font-medium">10,000+ Downloads</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">Verified by Google Play Protect</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <a
                  href={playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all hover:scale-105"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-.61-.92L3 2.734c0-.342.22-.683.609-.92zm11.303 11.304l2.585 2.585-11.75 6.78 9.165-9.365zm2.585-2.236l-2.585 2.585L5.747 4.102l11.75 6.78zm1.18 1.118l3.14 1.812a1.002 1.002 0 0 1 0 1.734l-3.14 1.812-2.146-2.679 2.146-2.679z" />
                  </svg>
                  <div className="text-left leading-tight">
                    <div className="text-[9px] uppercase tracking-wider font-semibold opacity-80">Get it on</div>
                    <div className="text-base font-black tracking-tight">Google Play</div>
                  </div>
                </a>

                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="rounded-2xl border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-white text-xs font-semibold py-3.5 h-auto gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      Link Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-sky-400" />
                      Copy Play Store Link
                    </>
                  )}
                </Button>

                <Button asChild variant="ghost" className="text-blue-400 hover:text-white hover:bg-blue-500/10 text-xs font-semibold rounded-2xl">
                  <Link href="/app">
                    App Details <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[300px] rounded-[32px] p-2.5 bg-gradient-to-b from-slate-700 to-slate-900 border border-slate-700/60 shadow-2xl">
                <div className="rounded-[24px] bg-slate-950 p-5 space-y-4 border border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl p-1.5 bg-gradient-to-tr from-red-500/20 via-orange-500/20 to-amber-500/10 border border-orange-500/30 flex items-center justify-center bg-white/5 shadow-lg">
                      <img
                        src={appIconImg}
                        alt="MarketingKart.ai Logo"
                        className="w-full h-full object-contain drop-shadow"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        MarketingKart<span className="text-orange-500">.ai</span> App
                      </h4>
                      <p className="text-[11px] text-emerald-400 font-medium">Verified by Google Play</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-center">
                    <p className="text-[11px] font-semibold text-slate-300">Scan QR to install directly</p>
                    <div className="mx-auto w-28 h-28 bg-white p-1.5 rounded-lg flex items-center justify-center">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(playStoreUrl)}`}
                        alt="QR code to download MarketingKart.ai app"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono truncate">{playStoreUrl}</p>
                  </div>

                  <div className="space-y-1.5 text-left text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Live project tracking on mobile</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Direct WhatsApp / RCS manager</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const highlights = [
    "Free consultation within 24 hours",
    "Custom quote for your exact use case",
    "Apps, WhatsApp, RCS & digital growth",
  ];

  return (
    <section
      id="get-started"
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #070D18 0%, #0A1A10 50%, #071428 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(18,99,232,0.28), transparent)", transform: "translateY(-50%)" }}
        />
        <div
          className="absolute top-1/2 right-1/5 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(110,221,0,0.18), transparent)", transform: "translateY(-50%)" }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-20 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal>
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#A3E635" }}>
              Get Started Today
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-black text-white mb-5 leading-tight">
              Ready to Build Something{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #1A8FFF, #6EDD00)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Extraordinary?
              </span>
            </h2>
            <p className="text-lg md:text-xl max-w-lg mb-8 leading-relaxed" style={{ color: "rgba(200,230,200,0.72)" }}>
              Join 2000+ companies that trust Ayotrix Infotech. Share a few details and our team will reach out with the right plan.
            </p>
            <ul className="space-y-3 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm md:text-base" style={{ color: "rgba(226,232,240,0.9)" }}>
                  <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: "#6EDD00" }} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" size="lg" className="border-white/25 text-white hover:bg-white/10 rounded-2xl px-6">
                <Link href="/products">View Products</Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="text-blue-300 hover:text-white hover:bg-white/5 rounded-2xl px-6">
                <Link href="/contact">
                  Full contact page <ArrowRight className="ml-1.5 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <GetStartedForm />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col gap-0 pb-0">
      <SeoHead
        title="Ayotrix Infotech | App Development, WhatsApp Marketing & Digital Growth in Bhopal"
        description="Build e-commerce apps, taxi booking platforms, WhatsApp/RCS marketing, AI agents, and digital marketing with Ayotrix Infotech — Bhopal's end-to-end IT partner."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Ayotrix Infotech",
          url: "https://ayotrix.com/",
          description:
            "App development, WhatsApp marketing, AI agents, and digital marketing by Ayotrix Infotech in Bhopal.",
          publisher: {
            "@type": "Organization",
            name: "Ayotrix Infotech",
            url: "https://ayotrix.com",
          },
        }}
      />
      <HeroBanner />
      <ServicesShowcaseSection isPage={false} />
      <ProductsShowcaseSection isPage={false} />
      <MessagingSection />
      <DigitalMarketingSection />
      <PlayStoreAppSection />
      <CTASection />
    </div>
  );
}
