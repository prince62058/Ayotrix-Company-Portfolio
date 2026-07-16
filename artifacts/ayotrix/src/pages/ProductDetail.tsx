import React from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerParent, StaggerChild } from "@/components/ui/scroll-reveal";
import InquiryForm from "@/components/InquiryForm";
import { PRODUCTS } from "@/lib/static-data";
import type { InquiryFormType } from "@/components/InquiryForm";
import { useGetProducts } from "@workspace/api-client-react";
import SeoHead from "@/components/SeoHead";
import IconDisplay, { resolveIcon } from "@/components/IconDisplay";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: apiProducts } = useGetProducts();
  const product = apiProducts ? (apiProducts as any[]).find(p => p.slug === slug) : PRODUCTS.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-24">
        <SeoHead title="Product Not Found | Ayotrix" description="The requested product page was not found." path={`/products/${slug || ""}`} noindex />
        <div className="text-6xl mb-6">🔍</div>
        <h2 className="text-3xl font-bold mb-4" style={{ color: "#0A1628" }}>Product Not Found</h2>
        <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
        <Button asChild><Link href="/products">Back to Products</Link></Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <SeoHead
        title={`${product.name} | Ayotrix Infotech`}
        description={product.description || product.tagline || `${product.name} by Ayotrix Infotech.`}
        path={`/products/${product.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          brand: { "@type": "Brand", name: "Ayotrix Infotech" },
          url: `https://ayotrix.com/products/${product.slug}`,
        }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24" style={{ background: product.gradient }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-15" style={{ background: product.color }} />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10 bg-white" />
        </div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <Link href="/products" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to all products
          </Link>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-sm font-semibold" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.9)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Communication Product
            </div>
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-6 overflow-hidden" style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.25)" }}>
              <IconDisplay icon={resolveIcon(product)} alt={product.name} imgClassName="w-12 h-12 object-contain" />
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-tight mb-4">
              {product.name}
            </h1>
            <p className="text-xl text-white/75 max-w-2xl leading-relaxed">{product.tagline}</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14"
          >
            {product.stats.map((stat, i) => (
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
              <p className="text-muted-foreground leading-relaxed text-lg">{product.longDescription}</p>
            </ScrollReveal>

            {/* Features */}
            <ScrollReveal>
              <h2 className="text-3xl font-black mb-8" style={{ color: "#0A1628" }}>What's Included</h2>
              <StaggerParent className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {product.features.map((feature, i) => (
                  <StaggerChild key={i}>
                    <div
                      className="p-6 rounded-2xl border border-gray-100 bg-white transition-all duration-300"
                      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${product.color}20`; (e.currentTarget as HTMLElement).style.borderColor = `${product.color}30`; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; (e.currentTarget as HTMLElement).style.borderColor = "#F1F5F9"; }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: product.bgLight }}>
                          <Zap className="w-4 h-4" style={{ color: product.color }} />
                        </div>
                        <h3 className="font-bold" style={{ color: "#0A1628" }}>{feature.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </StaggerChild>
                ))}
              </StaggerParent>
            </ScrollReveal>

            {/* Use Cases */}
            <ScrollReveal>
              <h2 className="text-3xl font-black mb-8" style={{ color: "#0A1628" }}>Use Cases</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {product.useCases.map((useCase, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-white"
                    style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: product.color }} />
                    <span className="text-sm font-medium" style={{ color: "#374151" }}>{useCase}</span>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <InquiryForm formType={product.formType as InquiryFormType} serviceName={product.name} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
