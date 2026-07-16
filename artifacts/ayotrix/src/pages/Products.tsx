import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerParent, StaggerChild } from "@/components/ui/scroll-reveal";
import { PRODUCTS } from "@/lib/static-data";
import { useGetProducts } from "@workspace/api-client-react";
import SeoHead from "@/components/SeoHead";
import IconDisplay, { resolveIcon } from "@/components/IconDisplay";

export default function Products() {
  const { data: apiProducts } = useGetProducts();
  const products = apiProducts && apiProducts.length > 0 ? (apiProducts as any[]).filter(p => p.isActive !== false) : PRODUCTS;

  return (
    <div className="min-h-screen bg-white pt-24">
      <SeoHead
        title="WhatsApp Marketing, RCS, OTP & AI Agents | Ayotrix Products"
        description="Communication products from Ayotrix — WhatsApp marketing, RCS messaging, OTP services, AI agents, chatbots, Google Ads, and GMB optimization."
        path="/products"
      />
      {/* Hero */}
      <section className="relative overflow-hidden py-20 border-b border-gray-100" style={{ background: "linear-gradient(135deg, #0A1628 0%, #1E3A8A 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.3), transparent)" }} />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.2), transparent)" }} />
        </div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-4">Communication Suite</div>
            <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight text-white">
              Our Products
            </h1>
            <p className="text-xl text-blue-100/75 leading-relaxed max-w-2xl mb-10">
              A complete suite of communication and automation products — WhatsApp, RCS, OTP, AI Agents, and more. Built for Indian businesses at scale.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-blue-900 font-bold rounded-2xl px-8 hover:bg-blue-50">
                <Link href="/contact">Request Demo <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4" style={{ color: "#0A1628" }}>All Products</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Click any product to learn more and get a personalised quote for your business.</p>
          </ScrollReveal>

          <StaggerParent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <StaggerChild key={product.slug}>
                <Link href={`/products/${product.slug}`}>
                  <motion.div
                    className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white cursor-pointer h-full"
                    style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Color accent top bar */}
                    <div className="h-1 w-full" style={{ background: product.gradient }} />

                    <div className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl overflow-hidden" style={{ background: product.bgLight }}>
                          <IconDisplay icon={resolveIcon(product)} alt={product.name} imgClassName="w-8 h-8 object-contain" />
                        </div>
                        <motion.div
                          className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ background: product.color }}
                        >
                          <ArrowUpRight className="w-4 h-4 text-white" />
                        </motion.div>
                      </div>

                      <h3 className="text-xl font-black mb-3" style={{ color: "#0A1628" }}>{product.name}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{product.description}</p>

                      {/* Mini stats */}
                      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                        {product.stats.slice(0, 2).map((stat, i) => (
                          <div key={i}>
                            <div className="text-lg font-black" style={{ color: product.color }}>{stat.value}</div>
                            <div className="text-xs text-muted-foreground">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-gray-100" style={{ background: "#F8FAFF" }}>
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-black mb-4" style={{ color: "#0A1628" }}>Not sure which product fits?</h2>
            <p className="text-muted-foreground mb-8">Talk to our team and we'll recommend the right combination of products for your business needs.</p>
            <Button asChild size="lg" className="rounded-2xl px-10">
              <Link href="/contact">Talk to an Expert <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
