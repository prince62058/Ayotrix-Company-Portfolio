import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Phone, Mail, MapPin, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import logoImg from "@assets/a_logo_(1)_1781854062528.png";
import { SERVICES, PRODUCTS, DM_SERVICES } from "@/lib/static-data";
import { useGetSiteSettings } from "@workspace/api-client-react";

const social = [
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Instagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  const { data: settings } = useGetSiteSettings();
  return (
    <footer style={{ background: "linear-gradient(180deg, #F8FAFF 0%, #EEF2FF 100%)", borderTop: "1px solid rgba(29,99,238,0.08)" }}>
      <div style={{ background: "linear-gradient(90deg, rgba(29,99,238,0.06), rgba(108,60,247,0.05))", borderBottom: "1px solid rgba(29,99,238,0.10)" }}>
        <div className="container mx-auto max-w-7xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black" style={{ color: "#0A1628" }}>Ready to start your digital journey?</h3>
            <p className="text-sm mt-1" style={{ color: "#64748B" }}>Talk to our experts — completely free, no strings attached.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href={`tel:${settings?.phone || "+919752045356"}`} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 hover:scale-105" style={{ background: "rgba(29,99,238,0.08)", border: "1px solid rgba(29,99,238,0.22)", color: "#2563EB" }}>
              <Phone className="w-4 h-4" /> {settings?.phone || "+91 97520 45356"}
            </a>
            <Link href="/contact" className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:scale-105" style={{ background: "#2563EB", boxShadow: "0 4px 16px rgba(29,99,238,0.28)" }}>
              Get Free Quote <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="relative w-11 h-11 flex items-center justify-center rounded-xl overflow-hidden" style={{ background: "rgba(29,99,238,0.07)", border: "1px solid rgba(29,99,238,0.16)" }}>
                <img src={settings?.logoUrl || logoImg} alt={settings?.companyName || "Ayotrix Infotech"} className="h-7 w-7 object-contain" />
              </div>
              <div>
                <div className="text-xl font-black tracking-tight" style={{ color: "#0A1628", letterSpacing: "-0.03em" }}>
                  {settings?.companyName ? settings.companyName.split(" ")[0] : "Ayotrix"}
                </div>
                <div className="text-[9px] font-bold uppercase tracking-[0.12em]" style={{ color: "#2563EB", lineHeight: 1 }}>
                  {settings?.companyName ? settings.companyName.split(" ").slice(1).join(" ") : "Infotech"}
                </div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#64748B" }}>
              End-to-end digital solutions — app development, communication products, and performance marketing. Built in Bhopal, trusted across India.
            </p>
            <div className="space-y-3">
              {[
                { Icon: Phone, val: settings?.phone || "+91 97520 45356", href: `tel:${settings?.phone || "+919752045356"}` },
                { Icon: Mail, val: settings?.email || "info@ayotrix.com", href: `mailto:${settings?.email || "info@ayotrix.com"}` },
                { Icon: MapPin, val: settings?.address || "Bhopal, Madhya Pradesh", href: "#" },
              ].map(({ Icon, val, href }) => (
                <a key={val} href={href} className="flex items-center gap-2.5 group">
                  <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ background: "rgba(29,99,238,0.07)" }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: "#2563EB" }} />
                  </div>
                  <span className="text-sm" style={{ color: "#64748B" }}>{val}</span>
                </a>
              ))}
            </div>
            <div className="flex gap-2 mt-6">
              {social.map(({ Icon, href, label }) => (
                <motion.a key={label} href={href} title={label} whileHover={{ scale: 1.12, y: -2 }} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200" style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.07)", color: "#64748B" }}>
                  <Icon className="w-3.5 h-3.5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-5" style={{ color: "#0A1628" }}>App Development</h4>
            <ul className="space-y-2.5">
              {SERVICES.map(s => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="flex items-center gap-1.5 text-sm group transition-all duration-200" style={{ color: "#64748B" }}>
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "#CBD5E1" }} />
                    <span className="group-hover:translate-x-1 transition-transform duration-200 group-hover:text-primary">{s.shortName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-5" style={{ color: "#0A1628" }}>Products</h4>
            <ul className="space-y-2.5">
              {PRODUCTS.slice(0, 8).map(p => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="flex items-center gap-1.5 text-sm group transition-all duration-200" style={{ color: "#64748B" }}>
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "#CBD5E1" }} />
                    <span className="group-hover:translate-x-1 transition-transform duration-200 group-hover:text-primary">{p.shortName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-5" style={{ color: "#0A1628" }}>Digital Marketing</h4>
            <ul className="space-y-2.5 mb-8">
              {DM_SERVICES.map(d => (
                <li key={d.slug}>
                  <Link href={`/digital-marketing/${d.slug}`} className="flex items-center gap-1.5 text-sm group" style={{ color: "#64748B" }}>
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "#CBD5E1" }} />
                    <span className="group-hover:translate-x-1 transition-transform duration-200 group-hover:text-primary">{d.shortName}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-sm font-black uppercase tracking-widest mb-4" style={{ color: "#0A1628" }}>Quick Links</h4>
            <ul className="space-y-2.5">
              {[{ label: "Home", href: "/" }, { label: "All Services", href: "/services" }, { label: "All Products", href: "/products" }, { label: "Contact Us", href: "/contact" }].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="flex items-center gap-1.5 text-sm group" style={{ color: "#64748B" }}>
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "#CBD5E1" }} />
                    <span className="group-hover:translate-x-1 transition-transform duration-200 group-hover:text-primary">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="container mx-auto max-w-7xl px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "#94A3B8" }}>
            © {new Date().getFullYear()} {settings?.companyName || "Ayotrix Infotech Pvt. Ltd."} All rights reserved. | Made with ❤️ in Bhopal
          </p>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Service"].map(t => (
              <a key={t} href="#" className="text-xs transition-colors hover:text-primary" style={{ color: "#94A3B8" }}>{t}</a>
            ))}
            <a
              href="/admin"
              className="text-xs transition-colors"
              style={{ color: "transparent", userSelect: "none" }}
              title=""
              aria-hidden="true"
            >·</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
