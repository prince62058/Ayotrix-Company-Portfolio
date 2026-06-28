import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollReveal, StaggerParent, StaggerChild } from "@/components/ui/scroll-reveal";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91 9752045356", sub: "Mon-Sat, 9AM - 7PM" },
  { icon: Mail, label: "Email", value: "info@ayotrix.com", sub: "We reply within 24 hours" },
  { icon: MapPin, label: "Office", value: "Bhopal, Madhya Pradesh", sub: "India" },
  { icon: Clock, label: "Hours", value: "Mon - Sat", sub: "9:00 AM - 7:00 PM IST" },
];

export default function Contact() {
  const { toast } = useToast();
  const mutation = useSubmitContact();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      { data: form },
      {
        onSuccess: () => {
          setSubmitted(true);
          toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
        },
        onError: () => {
          toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
        },
      }
    );
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <section className="hero-dark relative overflow-hidden py-28 border-b border-border">
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[300px] rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #2563EB, transparent)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.10, 0.18, 0.10] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Get In Touch</div>
            <h1 className="text-4xl md:text-7xl font-black text-foreground dark:text-white mb-6 leading-none">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Have a project in mind? Let's talk. We'll help you define it, scope it, and bring it to life — faster than you think.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-4 max-w-7xl py-16">
        <StaggerParent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {contactInfo.map((info, i) => (
            <StaggerChild key={i}>
              <motion.div
                className="p-6 bg-card border border-border group"
                whileHover={{ y: -5, borderColor: "#2563EB" }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <info.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{info.label}</div>
                <div className="font-bold text-foreground dark:text-white">{info.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{info.sub}</div>
              </motion.div>
            </StaggerChild>
          ))}
        </StaggerParent>

        {/* Form */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <ScrollReveal direction="left" className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full bg-card border border-accent/30 p-16 flex flex-col items-center justify-center text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-6"
                >
                  <CheckCircle2 className="w-10 h-10 text-accent" />
                </motion.div>
                <h3 className="text-2xl font-black text-foreground dark:text-white mb-3">Message Received!</h3>
                <p className="text-muted-foreground">Our team will get back to you within 24 hours.</p>
                <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-8 border-primary/40 text-primary hover:bg-primary/10 rounded-2xl">
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card border border-border p-8 md:p-10 space-y-5">
                <div>
                  <div className="text-foreground dark:text-white text-sm font-bold mb-6">Send Us a Message</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">Full Name *</label>
                    <Input
                      required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Rahul Kumar"
                      className="bg-background border-border text-foreground dark:text-white placeholder:text-muted-foreground/50 rounded-2xl focus-visible:ring-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">Email *</label>
                    <Input
                      required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="rahul@company.com"
                      className="bg-background border-border text-foreground dark:text-white placeholder:text-muted-foreground/50 rounded-2xl focus-visible:ring-primary"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">Phone *</label>
                    <Input
                      required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="bg-background border-border text-foreground dark:text-white placeholder:text-muted-foreground/50 rounded-2xl focus-visible:ring-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">Subject</label>
                    <Input
                      value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="Project Inquiry"
                      className="bg-background border-border text-foreground dark:text-white placeholder:text-muted-foreground/50 rounded-2xl focus-visible:ring-primary"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">Message *</label>
                  <Textarea
                    required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your project requirements..."
                    className="bg-background border-border text-foreground dark:text-white placeholder:text-muted-foreground/50 rounded-2xl resize-none focus-visible:ring-primary"
                  />
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit" disabled={mutation.isPending} size="lg"
                    className="w-full bg-primary text-white font-bold rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] transition-all duration-300"
                  >
                    {mutation.isPending ? "Sending..." : <><Send className="w-4 h-4 mr-2" /> Send Message</>}
                  </Button>
                </motion.div>
              </form>
            )}
          </ScrollReveal>

          <ScrollReveal direction="right" className="lg:col-span-2 space-y-5">
            <div className="bg-card border border-border p-8">
              <h3 className="font-black text-foreground dark:text-white text-lg mb-4">Why Choose Ayotrix Infotech?</h3>
              <div className="space-y-4">
                {[
                  "Free consultation & project scoping",
                  "Agile delivery with weekly updates",
                  "Source code ownership — always yours",
                  "Post-launch support & maintenance",
                  "Fixed price or time & material models",
                ].map((item, i) => (
                  <motion.div key={i} className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="bg-primary/5 border border-primary/20 p-8">
              <div className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Direct Line</div>
              <div className="text-3xl font-black text-foreground dark:text-white mb-1">+91 9752045356</div>
              <div className="text-muted-foreground text-sm">Subham Pandey, CEO — Ayotrix Infotech</div>
              <div className="text-muted-foreground text-xs mt-1">Bhopal, Madhya Pradesh</div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
