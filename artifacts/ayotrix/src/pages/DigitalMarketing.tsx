import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerParent, StaggerChild } from "@/components/ui/scroll-reveal";
import { DM_SERVICES } from "@/lib/static-data";
import { useGetServices } from "@workspace/api-client-react";
import SeoHead from "@/components/SeoHead";
import IconDisplay, { resolveIcon } from "@/components/IconDisplay";

export default function DigitalMarketing() {
  const { data: apiServices } = useGetServices();
  const dmServices = apiServices && apiServices.length > 0 ? (apiServices as any[]).filter(s => s.category === "Digital Marketing" && s.isActive !== false) : DM_SERVICES;

  return (
    <div className="min-h-screen bg-white pt-24">
      <SeoHead
        title="Digital Marketing Agency in Bhopal | SEO, Social Media & UGC | Ayotrix"
        description="Full-funnel digital marketing by Ayotrix Infotech — social media, SEO, graphic design, and UGC reels that turn browsers into buyers."
        path="/digital-marketing"
      />
      {/* Hero */}
      <section className="relative overflow-hidden py-20 border-b border-gray-100" style={{ background: "linear-gradient(135deg, #1A0020 0%, #500730 40%, #831843 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: "#EC4899" }} />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-15" style={{ background: "#F59E0B" }} />
        </div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-pink-300 text-xs font-bold uppercase tracking-widest mb-4">Grow Your Brand</div>
            <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight text-white">
              Digital Marketing
            </h1>
            <p className="text-xl text-white/75 leading-relaxed max-w-2xl mb-10">
              Full-funnel digital marketing that drives real results — social media, SEO, graphic design, and UGC content that turns browsers into buyers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-pink-900 font-bold rounded-2xl px-8 hover:bg-pink-50">
                <Link href="/contact">Get Free Strategy Call <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Digital Marketing Stats */}
      <section className="py-16 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <StaggerParent className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "10K+", label: "Accounts Managed" },
              { value: "500+", label: "Campaigns Launched" },
              { value: "180%", label: "Avg. Traffic Growth" },
              { value: "3×", label: "Avg. ROI" },
            ].map((stat, i) => (
              <StaggerChild key={i}>
                <div className="text-center p-6 bg-white border border-gray-100 rounded-2xl" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
                  <div className="text-3xl md:text-4xl font-black mb-2" style={{ color: "#EC4899" }}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4" style={{ color: "#0A1628" }}>Our Services</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Four focused digital marketing services, each with dedicated strategists and monthly reporting.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dmServices.map((dm, index) => (
              <ScrollReveal key={dm.slug} delay={index * 0.1}>
                <Link href={`/digital-marketing/${dm.slug}`}>
                  <motion.div
                    className="group relative overflow-hidden rounded-3xl cursor-pointer h-full"
                    style={{ background: dm.gradient, minHeight: 320 }}
                    whileHover={{ y: -5, scale: 1.01 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "rgba(255,255,255,0.05)" }} />
                    <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20" style={{ background: dm.color }} />

                    <div className="relative z-10 p-10 h-full flex flex-col">
                      <div className="text-4xl mb-6 w-14 h-14 flex items-center justify-center overflow-hidden">
                        <IconDisplay icon={resolveIcon(dm)} alt={dm.name} imgClassName="w-10 h-10 object-contain" />
                      </div>
                      <h3 className="text-2xl font-black text-white mb-3">{dm.name}</h3>
                      <p className="text-white/70 text-sm leading-relaxed mb-6 flex-1">{dm.description}</p>

                      <div className="space-y-2 mb-8">
                        {dm.features.slice(0, 3).map((f, i) => (
                          <div key={i} className="flex items-center gap-2 text-white/80 text-sm">
                            <CheckCircle2 className="w-4 h-4 shrink-0 text-white/60" />
                            {f.title}
                          </div>
                        ))}
                      </div>

                      <div className="inline-flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all">
                        Learn more & enquire <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-gray-100" style={{ background: "#F8FAFF" }}>
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-black mb-4" style={{ color: "#0A1628" }}>Ready to Grow Your Brand?</h2>
            <p className="text-muted-foreground mb-8">Book a free strategy session with our digital marketing team and get a custom growth plan for your business.</p>
            <Button asChild size="lg" className="rounded-2xl px-10">
              <Link href="/contact">Book Free Strategy Call <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
