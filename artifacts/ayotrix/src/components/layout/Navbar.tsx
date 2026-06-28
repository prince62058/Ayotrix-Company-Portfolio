import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import logoImg from "@assets/a_logo_(1)_1781854062528.png";
import { SERVICES, PRODUCTS, DM_SERVICES } from "@/lib/static-data";
import { useGetSiteSettings } from "@workspace/api-client-react";

const serviceLinks = SERVICES.map(s => ({ href: `/services/${s.slug}`, label: s.name, icon: s.icon }));
const productLinks = PRODUCTS.map(p => ({ href: `/products/${p.slug}`, label: p.name, icon: p.icon }));
const dmLinks = DM_SERVICES.map(d => ({ href: `/digital-marketing/${d.slug}`, label: d.name, icon: d.icon }));

interface DropdownItem { href: string; label: string; icon: string; }

function DropdownMenu({ items, onClose }: { items: DropdownItem[]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[240px] rounded-2xl overflow-hidden z-50"
      style={{
        background: "rgba(255,255,255,0.98)",
        border: "1px solid rgba(29,99,238,0.12)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(29,99,238,0.06)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="p-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group"
            style={{ color: "rgba(30,45,80,0.75)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(29,99,238,0.07)"; (e.currentTarget as HTMLElement).style.color = "#2563EB"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(30,45,80,0.75)"; }}
          >
            <span className="text-base w-6 text-center">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

export default function Navbar() {
  const { data: settings } = useGetSiteSettings();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const openDropdown = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(key);
  };
  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  const topLinks = [
    { key: "services", label: "Services", href: "/services", items: serviceLinks },
    { key: "products", label: "Products", href: "/products", items: productLinks },
    { key: "digital-marketing", label: "Digital Marketing", href: "/digital-marketing", items: dmLinks },
  ];

  const isActive = (href: string) => location === href || location.startsWith(href + "/");

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 pointer-events-none">
        <motion.nav
          className="pointer-events-auto flex items-center justify-between gap-2 px-3 py-2 w-full max-w-[1200px]"
          initial={{ y: -60, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            borderRadius: 9999,
            background: "rgba(255,255,255,0.95)",
            border: "1px solid rgba(29,99,238,0.15)",
            boxShadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 -1px 0 rgba(0,0,0,0.04) inset, 0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(29,99,238,0.08)",
            backdropFilter: "blur(24px)",
          }}
        >
          <Link href="/" className="flex items-center gap-2 px-3 py-1 group shrink-0">
            <motion.div
              className="relative w-14 h-14 flex items-center justify-center rounded-full overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(29,99,238,0.12), rgba(108,60,247,0.08))", border: "1.5px solid rgba(29,99,238,0.22)" }}
              whileHover={{ scale: 1.1, rotate: 8 }}
              transition={{ duration: 0.2 }}
            >
              <img src={settings?.logoUrl || logoImg} alt={settings?.companyName || "Ayotrix Infotech"} className="h-10 w-10 object-contain" />
            </motion.div>
            <div className="leading-none flex flex-col justify-center">
              <div className="text-[20px] font-black tracking-tight" style={{ color: "#0A1628", letterSpacing: "-0.03em" }}>
                {settings?.companyName ? settings.companyName.split(" ")[0] : "Ayotrix"}
              </div>
              <div className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: "#2563EB", marginTop: 1 }}>
                {settings?.companyName ? settings.companyName.split(" ").slice(1).join(" ") : "Infotech"}
              </div>
            </div>
          </Link>

          <div className="hidden md:block w-px h-5 shrink-0 mx-1" style={{ background: "rgba(0,0,0,0.08)" }} />

          <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            <Link
              href="/"
              className="relative px-3 py-2 text-[14px] font-semibold transition-all duration-200 rounded-full select-none whitespace-nowrap"
              style={{ color: location === "/" ? "#2563EB" : "rgba(30,45,80,0.65)", background: location === "/" ? "rgba(29,99,238,0.08)" : "transparent" }}
            >
              Home
            </Link>

            {topLinks.map(({ key, label, href, items }) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => openDropdown(key)}
                onMouseLeave={closeDropdown}
              >
                <Link
                  href={href}
                  className="relative flex items-center gap-1 px-3 py-2 text-[14px] font-semibold transition-all duration-200 rounded-full select-none whitespace-nowrap"
                  style={{ color: isActive(href) ? "#2563EB" : "rgba(30,45,80,0.65)", background: isActive(href) ? "rgba(29,99,238,0.08)" : "transparent" }}
                >
                  {label}
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" style={{ transform: activeDropdown === key ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
                </Link>
                <AnimatePresence>
                  {activeDropdown === key && (
                    <DropdownMenu items={items} onClose={() => setActiveDropdown(null)} />
                  )}
                </AnimatePresence>
              </div>
            ))}

            <Link
              href="/contact"
              className="relative px-3 py-2 text-[14px] font-semibold transition-all duration-200 rounded-full select-none whitespace-nowrap"
              style={{ color: isActive("/contact") ? "#2563EB" : "rgba(30,45,80,0.65)", background: isActive("/contact") ? "rgba(29,99,238,0.08)" : "transparent" }}
            >
              Contact
            </Link>
          </div>

          <div className="hidden md:block w-px h-5 shrink-0 mx-1" style={{ background: "rgba(0,0,0,0.08)" }} />

          <div className="flex items-center gap-1 px-1 shrink-0">
            <a
              href={`tel:${settings?.phone || "+919752045356"}`}
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold"
              style={{ color: "rgba(50,70,110,0.75)", background: "rgba(0,0,0,0.04)" }}
            >
              <Phone className="w-4 h-4" />
              {settings?.phone || "+91 97520 45356"}
            </a>
            <motion.div whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="hidden md:flex items-center px-5 py-2 rounded-full text-[14px] font-bold text-white select-none"
                style={{ background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)", boxShadow: "0 1px 0 rgba(255,255,255,0.30) inset, 0 4px 14px rgba(37,99,235,0.35)" }}
              >
                Get in Touch
              </Link>
            </motion.div>

            <motion.button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full"
              style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(220,228,245,0.80))", border: "1px solid rgba(29,99,238,0.14)" }}
              onClick={() => setMobileOpen(v => !v)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
            >
              <AnimatePresence mode="wait">
                {mobileOpen
                  ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="w-5 h-5" style={{ color: "#2563EB" }} /></motion.div>
                  : <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="w-5 h-5" style={{ color: "#555" }} /></motion.div>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="absolute top-[4.5rem] left-4 right-4 rounded-2xl overflow-hidden max-h-[80vh] overflow-y-auto"
              style={{ background: "rgba(255,255,255,0.98)", border: "1px solid rgba(29,99,238,0.12)", boxShadow: "0 20px 60px rgba(0,0,0,0.10)" }}
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <nav className="p-3 flex flex-col gap-1">
                <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold" style={{ color: location === "/" ? "#2563EB" : "rgba(30,45,80,0.65)" }}>
                  Home
                </Link>

                {topLinks.map(({ key, label, href, items }) => (
                  <div key={key}>
                    <button
                      className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold"
                      style={{ color: isActive(href) ? "#2563EB" : "rgba(30,45,80,0.65)" }}
                      onClick={() => setMobileExpanded(mobileExpanded === key ? null : key)}
                    >
                      {label}
                      <ChevronDown className="w-4 h-4 opacity-60" style={{ transform: mobileExpanded === key ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === key && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="pl-4 pb-2">
                            <Link href={href} onClick={() => setMobileOpen(false)} className="flex items-center px-3 py-2 rounded-lg text-xs font-bold text-primary mb-1">
                              View All {label}
                            </Link>
                            {items.map(item => (
                              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm" style={{ color: "rgba(30,45,80,0.65)" }}>
                                <span>{item.icon}</span> {item.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <Link href="/contact" onClick={() => setMobileOpen(false)} className="flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold" style={{ color: "rgba(30,45,80,0.65)" }}>
                  Contact
                </Link>

                <div className="mt-2 pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <Link href="/contact" onClick={() => setMobileOpen(false)} className="flex items-center justify-center py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)" }}>
                    Get in Touch
                  </Link>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
