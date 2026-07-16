import React from "react";
import { motion } from "framer-motion";
import { useGetTeamMembers, useGetStats, useGetSiteSettings } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollReveal, StaggerParent, StaggerChild } from "@/components/ui/scroll-reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { CheckCircle2, Target, Zap, Shield, Users } from "lucide-react";
import logoImg from "@assets/a_logo_(1)_1781854062528.png";
import SeoHead from "@/components/SeoHead";

const values = [
  { icon: Target, title: "Mission-Driven", desc: "Every line of code serves your business goals. We don't build features — we build outcomes." },
  { icon: Zap, title: "Agile & Fast", desc: "Rapid iteration, transparent communication, and on-time delivery — always. Speed without sacrificing quality." },
  { icon: Shield, title: "Enterprise Grade", desc: "Security, scalability, and reliability built into the foundation — not bolted on as an afterthought." },
  { icon: Users, title: "Partner, Not Vendor", desc: "We become part of your team. Long-term relationships built on trust, not just transactions." },
];

export default function About() {
  const { data: team, isLoading: loadingTeam } = useGetTeamMembers();
  const { data: stats } = useGetStats();
  const { data: settings } = useGetSiteSettings();

  return (
    <div className="min-h-screen pb-20">
      <SeoHead
        title="About Ayotrix Infotech | IT Company in Bhopal"
        description="Learn about Ayotrix Infotech — founded by Subham Pandey in Bhopal. Custom software, communication products, and digital marketing for 200+ businesses across India."
        path="/about"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Ayotrix Infotech",
          url: "https://ayotrix.com/about",
          mainEntity: {
            "@type": "Organization",
            name: "Ayotrix Infotech",
            founder: { "@type": "Person", name: "Subham Pandey" },
            address: {
              "@type": "PostalAddress",
              addressLocality: "Bhopal",
              addressRegion: "Madhya Pradesh",
              addressCountry: "IN",
            },
          },
        }}
      />
      {/* Hero */}
      <section className="hero-dark relative overflow-hidden py-28 border-b border-border">
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #8B5CF6, transparent)" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Who We Are</div>
            <h1 className="text-4xl md:text-7xl font-black text-foreground dark:text-white mb-6 leading-none">About Ayotrix Infotech</h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              A forward-thinking IT solutions company headquartered in Bhopal, Madhya Pradesh. We combine startup energy with enterprise-grade execution to deliver technology that actually moves the needle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-4 max-w-7xl py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="w-full aspect-square bg-card border border-border flex items-center justify-center">
                <img src={settings?.logoUrl || logoImg} alt={settings?.companyName || "Ayotrix"} className="w-48 h-48 object-contain" style={{ filter: "drop-shadow(0 0 40px rgba(37,99,235,0.4))" }} />
              </div>
              <motion.div
                className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-primary/30"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <div className="absolute -top-4 -left-4 w-24 h-24 border border-accent/20" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Our Story</div>
            <h2 className="text-4xl font-black text-foreground dark:text-white mb-6">Built to Empower Businesses</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Founded by Subham Pandey, Ayotrix Infotech was born from a simple belief: technology should be a business enabler, not a barrier. Too many companies were getting left behind because the right tech solutions were too expensive or too complex.</p>
              <p>We changed that. Based in Bhopal, we've built a team of elite engineers, designers, and strategists who deliver world-class software with the speed and agility of a startup.</p>
              <p>Today, Ayotrix Infotech powers hospitals, schools, retailers, HR teams, and enterprises across India — with solutions built to scale and built to last.</p>
            </div>
            <div className="mt-8 space-y-3">
              {["8+ years of software excellence", "500+ projects delivered successfully", "Trusted by 200+ businesses across India", "Full-cycle: design, develop, deploy, support"].map((item, i) => (
                <motion.div key={i} className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card/30 border-y border-border">
        <div className="container mx-auto px-4 max-w-7xl">
          <ScrollReveal className="text-center mb-14">
            <div className="text-accent text-xs font-bold uppercase tracking-widest mb-3">Our Principles</div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground dark:text-white">How We Work</h2>
          </ScrollReveal>
          <StaggerParent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <StaggerChild key={i}>
                <motion.div
                  className="p-8 bg-card border border-border group"
                  whileHover={{ y: -6, borderColor: "#2563EB" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                    <v.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground dark:text-white text-lg mb-3">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* Stats */}
      {stats && (
        <section className="container mx-auto px-4 max-w-7xl py-20">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl font-black text-foreground dark:text-white">By The Numbers</h2>
          </ScrollReveal>
          <StaggerParent className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { v: stats.projectsCompleted, s: "+", l: "Projects" },
              { v: stats.happyClients, s: "+", l: "Clients" },
              { v: stats.yearsExperience, s: "+", l: "Years" },
              { v: stats.teamMembers, s: "+", l: "Experts" },
            ].map((item, i) => (
              <StaggerChild key={i}>
                <div className="text-center p-8 bg-card border border-border">
                  <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                    <AnimatedCounter target={item.v} suffix={item.s} />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{item.l}</div>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>
        </section>
      )}

      {/* Team */}
      <section className="container mx-auto px-4 max-w-7xl pb-8">
        <ScrollReveal className="text-center mb-12">
          <div className="text-primary text-xs font-bold uppercase tracking-widest mb-3">The People</div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground dark:text-white">Meet Our Team</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Elite engineers, designers, and strategists committed to delivering exceptional results.</p>
        </ScrollReveal>
        <StaggerParent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {loadingTeam
            ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-72 rounded-2xl" />)
            : team?.map((member) => (
              <StaggerChild key={member.id}>
                <motion.div
                  className="group relative bg-card border border-border overflow-hidden"
                  whileHover={{ y: -6, borderColor: "#2563EB" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="aspect-square overflow-hidden relative">
                    <motion.img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-black text-foreground dark:text-white text-lg">{member.name}</h3>
                    <div className="text-primary text-xs font-bold uppercase tracking-widest mt-1">{member.role}</div>
                  </div>
                </motion.div>
              </StaggerChild>
            ))
          }
        </StaggerParent>
      </section>
    </div>
  );
}
