import React from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Clock, Users, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerParent, StaggerChild } from "@/components/ui/scroll-reveal";
import InquiryForm from "@/components/InquiryForm";
import { SERVICES } from "@/lib/static-data";
import type { InquiryFormType } from "@/components/InquiryForm";
import { useGetServices } from "@workspace/api-client-react";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: apiServices } = useGetServices();
  const service = apiServices ? (apiServices as any[]).find(s => s.slug === slug) : SERVICES.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-24">
        <div className="text-6xl mb-6">🔍</div>
        <h2 className="text-3xl font-bold mb-4" style={{ color: "#0A1628" }}>Service Not Found</h2>
        <p className="text-muted-foreground mb-8">The service you're looking for doesn't exist.</p>
        <Button asChild><Link href="/services">Back to Services</Link></Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24" style={{ background: service.gradient }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: service.color }} />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-10" style={{ background: "#fff" }} />
        </div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to all services
          </Link>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-sm font-semibold" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.9)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Application Development
            </div>
            <div className="flex items-center gap-5 mb-6">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl" style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.25)" }}>
                {service.icon}
              </div>
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-tight mb-4">
              {service.name}
            </h1>
            <p className="text-xl text-white/75 max-w-2xl leading-relaxed">{service.tagline}</p>
          </motion.div>

          {/* Stats Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14"
          >
            {service.stats.map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Content + Form */}
      <section className="container mx-auto px-4 max-w-6xl py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Content */}
          <div className="lg:col-span-2 space-y-14">
            {/* Overview */}
            <ScrollReveal>
              <h2 className="text-3xl font-black mb-6" style={{ color: "#0A1628" }}>Overview</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">{service.longDescription}</p>
            </ScrollReveal>

            {/* Features Grid */}
            <ScrollReveal>
              <h2 className="text-3xl font-black mb-8" style={{ color: "#0A1628" }}>Everything Included</h2>
              <StaggerParent className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {service.features.map((feature, i) => (
                  <StaggerChild key={i}>
                    <div className="p-6 rounded-2xl border border-gray-100 bg-white group hover:border-transparent transition-all duration-300" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${service.color}20`; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}
                    >
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: service.bgLight }}>
                        <CheckCircle2 className="w-5 h-5" style={{ color: service.color }} />
                      </div>
                      <h3 className="font-bold mb-2" style={{ color: "#0A1628" }}>{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </StaggerChild>
                ))}
              </StaggerParent>
            </ScrollReveal>

            {/* Process */}
            <ScrollReveal>
              <h2 className="text-3xl font-black mb-8" style={{ color: "#0A1628" }}>Our Process</h2>
              <div className="space-y-6">
                {service.process.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex gap-6 items-start p-6 rounded-2xl bg-white border border-gray-100"
                    style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                  >
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black shrink-0 text-white" style={{ background: service.gradient }}>
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-black text-lg mb-2" style={{ color: "#0A1628" }}>{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <InquiryForm formType={service.formType as InquiryFormType} serviceName={service.name} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
