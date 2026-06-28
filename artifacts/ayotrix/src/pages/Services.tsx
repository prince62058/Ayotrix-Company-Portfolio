import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerParent, StaggerChild } from "@/components/ui/scroll-reveal";
import { SERVICES } from "@/lib/static-data";
import { useGetServices } from "@workspace/api-client-react";

export default function Services() {
  const { data: apiServices } = useGetServices();
  const services = apiServices && apiServices.length > 0 ? (apiServices as any[]).filter(s => s.category === "Application Development" && s.isActive !== false) : SERVICES;

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 border-b border-gray-100" style={{ background: "linear-gradient(135deg, #EEF2FF 0%, #F8FAFF 60%, #fff 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(37,99,235,0.10), transparent 60%)" }} />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Application Development</div>
            <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight" style={{ color: "#0A1628" }}>
              Our Services
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
              End-to-end application development — from e-commerce platforms to on-demand service marketplaces. Built for scale, designed to convert.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-2xl px-8">
                <Link href="/contact">Get a Free Quote <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <StaggerParent className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "200+", label: "Projects Delivered" },
              { value: "8+", label: "Years Experience" },
              { value: "50+", label: "Expert Developers" },
              { value: "98%", label: "Client Satisfaction" },
            ].map((stat, i) => (
              <StaggerChild key={i}>
                <div className="text-center p-6 bg-white border border-gray-100 rounded-2xl" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
                  <div className="text-3xl md:text-4xl font-black mb-2" style={{ color: "#2563EB" }}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4" style={{ color: "#0A1628" }}>What We Build</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Three core application development services, each delivered with full project management and post-launch support.</p>
          </ScrollReveal>

          <div className="flex flex-col gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={service.slug} delay={index * 0.1}>
                <motion.div
                  className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 md:p-14"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full rounded-l-3xl" style={{ background: service.gradient }} />
                  <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: service.color }} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ background: service.bgLight, border: `1.5px solid ${service.color}33` }}>
                          {service.icon}
                        </div>
                        <div className="text-5xl font-black font-mono" style={{ color: "#F1F5F9" }}>
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>
                      <h3 className="text-3xl font-black mb-4" style={{ color: "#0A1628" }}>{service.name}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                      <div className="flex gap-3">
                        <Button asChild className="rounded-2xl px-6" style={{ background: service.color, border: "none" }}>
                          <Link href={`/services/${service.slug}`}>
                            Learn More <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        </Button>
                        <Button asChild variant="outline" className="rounded-2xl px-6" style={{ borderColor: `${service.color}33`, color: service.color }}>
                          <Link href="/contact">Get Quote</Link>
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: service.color }}>Key Features</h4>
                      <div className="space-y-3">
                        {service.features.slice(0, 5).map((f, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: service.color }} />
                            <div>
                              <span className="font-semibold text-sm" style={{ color: "#0A1628" }}>{f.title}</span>
                              <span className="text-muted-foreground text-sm"> — {f.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-gray-100" style={{ background: "#F8FAFF" }}>
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-black mb-4" style={{ color: "#0A1628" }}>Ready to Build Your App?</h2>
            <p className="text-muted-foreground mb-8">Tell us about your project and get a detailed proposal within 24 hours — completely free.</p>
            <Button asChild size="lg" className="rounded-2xl px-10">
              <Link href="/contact">Start Your Project <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
