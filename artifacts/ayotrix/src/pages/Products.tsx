import React from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import SeoHead from "@/components/SeoHead";
import ProductsShowcaseSection from "@/components/sections/ProductsShowcaseSection";

export default function Products() {
  return (
    <div className="min-h-screen bg-[#FAFCFF] pt-16 md:pt-20">
      <SeoHead
        title="Communication Products | WhatsApp Marketing, RCS, AI Agents & OTP | Ayotrix"
        description="Battle-tested communication products that connect, automate, and accelerate your business by Ayotrix Infotech."
        path="/products"
      />

      {/* Exact Mockup Products Section */}
      <ProductsShowcaseSection isPage={true} />

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
