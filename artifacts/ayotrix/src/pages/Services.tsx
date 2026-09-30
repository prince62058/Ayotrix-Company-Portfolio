import React from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import SeoHead from "@/components/SeoHead";
import ServicesShowcaseSection from "@/components/sections/ServicesShowcaseSection";

export default function Services() {
  return (
    <div className="min-h-screen bg-[#FAFCFF] pt-20 md:pt-24 relative overflow-hidden">
      <SeoHead
        title="App Development Services | E-Commerce, Taxi & Marketplace Apps | Ayotrix"
        description="Custom app development tailored to your business — from e-commerce to on-demand platforms by Ayotrix Infotech."
        path="/services"
      />

      <ServicesShowcaseSection isPage={true} />

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
