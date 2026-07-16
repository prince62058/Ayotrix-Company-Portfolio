import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, CheckCircle2, ArrowUpRight } from "lucide-react";
import { ScrollReveal, StaggerParent, StaggerChild } from "@/components/ui/scroll-reveal";
import { Card3D } from "@/components/ui/card-3d";
import { SERVICES, PRODUCTS, DM_SERVICES } from "@/lib/static-data";
import MessagingSection from "@/components/MessagingSection";
import { useGetBanners, useGetServices, useGetProducts } from "@workspace/api-client-react";
import SeoHead from "@/components/SeoHead";
import IconDisplay, { resolveIcon } from "@/components/IconDisplay";

const HERO_SLIDES = [
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

  const slides = dynamicBanners && dynamicBanners.length > 0 ? dynamicBanners.map(b => ({
    badge: "Featured",
    title: b.title,
    accent: "",
    subtitle: b.subtitle,
    cta: b.ctaText,
    ctaLink: b.ctaLink,
    tag: "Updated live",
    imageUrl: b.imageUrl,
  })) : HERO_SLIDES;

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
                  <Link href="/contact">Get Free Quote <ChevronRight className="ml-1 w-4 h-4 shrink-0" /></Link>
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

function ServicesSection() {
  const { data: apiServices } = useGetServices();
  const services = apiServices && apiServices.length > 0 ? (apiServices as any[]).filter(s => s.category === "Application Development" && s.isActive !== false) : SERVICES;

  return (
    <section className="container mx-auto px-4 max-w-7xl py-8">
      <ScrollReveal className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 pb-6 border-b border-gray-100 gap-4">
        <div>
          <div className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Application Development</div>
          <h2 className="text-4xl md:text-5xl font-black" style={{ color: "#0A1628" }}>Our Services</h2>
          <p className="text-muted-foreground mt-3 max-w-xl">Custom app development tailored to your business — from e-commerce to on-demand platforms.</p>
        </div>
        <Button variant="ghost" asChild className="text-primary hover:text-foreground border border-primary/30 hover:border-primary hover:bg-primary/10 rounded-2xl px-6">
          <Link href="/services">View All <ArrowUpRight className="ml-2 w-4 h-4" /></Link>
        </Button>
      </ScrollReveal>

      <StaggerParent className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {services.map((service, index) => (
          <StaggerChild key={service.slug}>
            <Card3D
              className="group relative p-8 bg-white border border-gray-100 overflow-hidden cursor-pointer rounded-2xl"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <div className="absolute top-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-500" style={{ background: service.color }} />
              <div className="w-12 h-12 flex items-center justify-center mb-6 text-xl rounded-xl group-hover:scale-110 transition-transform duration-300 overflow-hidden"
                style={{ background: service.bgLight, border: `1px solid ${service.color}22` }}>
                <IconDisplay icon={resolveIcon(service)} alt={service.name} imgClassName="w-7 h-7 object-contain" />
              </div>
              <div className="absolute top-6 right-6 text-3xl font-black text-gray-100 font-mono">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: "#0A1628" }}>{service.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-5">{service.description}</p>
              <Link href={`/services/${service.slug}`} className="text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200" style={{ color: service.color }}>
                Learn more <ChevronRight className="w-4 h-4" />
              </Link>
            </Card3D>
          </StaggerChild>
        ))}
      </StaggerParent>
    </section>
  );
}

function ProductsSection() {
  const { data: apiProducts } = useGetProducts();
  const products = apiProducts && apiProducts.length > 0 ? (apiProducts as any[]).filter(p => p.isActive !== false) : PRODUCTS;

  return (
    <section className="py-20 border-y border-gray-100" style={{ background: "linear-gradient(180deg, #F5FBF0 0%, #EFF8E8 50%, #F5FBF0 100%)" }}>
      <div className="container mx-auto px-4 max-w-7xl">
        <ScrollReveal className="text-center mb-14">
          <div className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Communication Suite</div>
          <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: "#0A1628" }}>Our Products</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Battle-tested communication products that connect, automate, and accelerate your business.</p>
        </ScrollReveal>
        <StaggerParent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <StaggerChild key={product.slug}>
              <Link href={`/products/${product.slug}`}>
                <motion.div
                  className="relative overflow-hidden group bg-white border border-gray-100 rounded-2xl p-6 cursor-pointer h-full"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
                  whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.10)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-300 group-hover:opacity-100 opacity-0 rounded-t-2xl" style={{ background: product.color }} />
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 overflow-hidden" style={{ background: product.bgLight }}>
                    <IconDisplay icon={resolveIcon(product)} alt={product.name || product.shortName} imgClassName="w-7 h-7 object-contain" />
                  </div>
                  <h3 className="text-sm font-bold mb-2" style={{ color: "#0A1628" }}>{product.shortName}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{product.tagline}</p>
                  <span className="text-xs font-semibold inline-flex items-center gap-1" style={{ color: product.color }}>
                    Learn more <ArrowUpRight className="w-3 h-3" />
                  </span>
                </motion.div>
              </Link>
            </StaggerChild>
          ))}
        </StaggerParent>
        <ScrollReveal delay={0.3} className="text-center mt-10">
          <Button asChild variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 hover:border-primary rounded-2xl px-8">
            <Link href="/products">View All Products <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </ScrollReveal>
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

function CTASection() {
  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #070D18 0%, #0A1A10 50%, #071428 100%)" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(18,99,232,0.28), transparent)", transform: "translateY(-50%)" }} />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(110,221,0,0.18), transparent)", transform: "translateY(-50%)" }} />
      </div>
      <div className="container mx-auto px-4 max-w-4xl py-24 text-center relative z-10">
        <ScrollReveal>
          <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#A3E635" }}>Get Started Today</div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Ready to Build Something<br />
            <span style={{ backgroundImage: "linear-gradient(90deg, #1A8FFF, #6EDD00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Extraordinary?
            </span>
          </h2>
          <p className="text-xl max-w-xl mx-auto mb-10" style={{ color: "rgba(200,230,200,0.7)" }}>
            Join 2000+ companies that trust Ayotrix Infotech to power their digital transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button asChild size="lg" className="font-bold px-10 py-6 text-lg rounded-2xl"
                style={{ background: "linear-gradient(135deg, #1263E8, #6EDD00)", color: "#fff", boxShadow: "0 0 32px rgba(110,221,0,0.3)" }}>
                <Link href="/contact">Start Your Project <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button asChild variant="outline" size="lg" className="border-white/25 text-white hover:bg-white/10 px-10 py-6 text-lg rounded-2xl">
                <Link href="/products">View Products</Link>
              </Button>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-0">
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
      <ServicesSection />
      <ProductsSection />
      <MessagingSection />
      <DigitalMarketingSection />
      <CTASection />
    </div>
  );
}
