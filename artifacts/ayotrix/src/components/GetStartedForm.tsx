import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send, Loader2, Phone } from "lucide-react";
import { useSubmitContact, useGetSiteSettings } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

const SERVICES = [
  "E-Commerce Development",
  "Taxi Booking App",
  "Service Provider Platform",
  "WhatsApp Marketing",
  "RCS Marketing",
  "OTP Services",
  "AI Agents",
  "WhatsApp Chatbot",
  "Google Ads",
  "Social Media Marketing",
  "SEO",
  "Graphic Designing",
  "UGC Reels",
  "Digital Marketing",
  "Other",
] as const;

const DEFAULT_PHONE = "+91 97520 45356";

function toTelHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

const fieldClass =
  "w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200 border border-gray-200 bg-gray-50/80 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15";

export default function GetStartedForm() {
  const { toast } = useToast();
  const { data: settings } = useGetSiteSettings();
  const mutation = useSubmitContact();
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const supportPhone = settings?.phone || DEFAULT_PHONE;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast({
        title: "Consent required",
        description: "Please agree to receive communication before submitting.",
        variant: "destructive",
      });
      return;
    }
    const messageBody = [
      form.service ? `Service: ${form.service}` : null,
      form.message?.trim() || "Interested in getting started. Please contact me.",
      "Consent: Agreed to receive newsletters, promotional content, offers, and events via SMS, RCS, and WhatsApp.",
    ]
      .filter(Boolean)
      .join("\n\n");

    mutation.mutate(
      {
        data: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          subject: form.service || "Get Started Inquiry",
          message: messageBody,
        },
      },
      {
        onSuccess: () => {
          setSubmitted(true);
          setAgreed(false);
          toast({
            title: "Inquiry sent!",
            description: "We'll get back to you within 24 hours.",
          });
        },
        onError: (err: any) => {
          const message =
            err?.response?.data?.error ||
            err?.data?.error ||
            err?.message ||
            "Something went wrong. Please try again.";
          const isBanned =
            err?.response?.status === 403 ||
            err?.status === 403 ||
            (typeof message === "string" && message.toLowerCase().includes("denied"));
          toast({
            title: isBanned ? "Access Restricted" : "Submission Failed",
            description: message,
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <div
      className="relative rounded-3xl overflow-hidden bg-white"
      style={{
        border: "1px solid rgba(15, 23, 42, 0.06)",
        boxShadow: "0 24px 64px rgba(8, 13, 24, 0.18), 0 4px 16px rgba(18, 99, 232, 0.08)",
      }}
    >
      <div className="px-6 sm:px-8 pt-7 pb-2 text-center">
        <h3 className="text-2xl font-black tracking-tight" style={{ color: "#0A1628" }}>
          Get Started Now
        </h3>
        <p className="text-sm mt-1.5" style={{ color: "#64748B" }}>
          Tell us what you need — we reply within 24 hours.
        </p>
      </div>

      <div className="px-6 sm:px-8 pb-7 pt-4">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center py-10"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                style={{ background: "linear-gradient(135deg, #1263E8, #6EDD00)" }}
              >
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-black mb-2" style={{ color: "#0A1628" }}>
                Request Received!
              </h4>
              <p className="text-sm max-w-xs leading-relaxed" style={{ color: "#64748B" }}>
                Thanks for reaching out. Our team will contact you shortly on WhatsApp or email.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setAgreed(false);
                  setForm({ name: "", email: "", phone: "", service: "", message: "" });
                }}
                className="mt-6 text-sm font-semibold text-primary hover:underline"
              >
                Submit another inquiry
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-3.5"
            >
              <input
                name="name"
                type="text"
                required
                value={form.name}
                onChange={onChange}
                placeholder="Enter Person Name"
                autoComplete="name"
                className={fieldClass}
              />
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={onChange}
                placeholder="Enter Email Here"
                autoComplete="email"
                className={fieldClass}
              />
              <input
                name="phone"
                type="tel"
                required
                value={form.phone}
                onChange={onChange}
                placeholder="Enter WhatsApp Number"
                autoComplete="tel"
                className={fieldClass}
              />
              <select
                name="service"
                required
                value={form.service}
                onChange={onChange}
                className={`${fieldClass} ${!form.service ? "text-gray-400" : "text-gray-900"}`}
              >
                <option value="" disabled>
                  Choose Service Here
                </option>
                {SERVICES.map((s) => (
                  <option key={s} value={s} className="text-gray-900">
                    {s}
                  </option>
                ))}
              </select>
              <textarea
                name="message"
                rows={3}
                value={form.message}
                onChange={onChange}
                placeholder="Enter message here"
                className={`${fieldClass} resize-none`}
              />

              <label className="flex items-start gap-2.5 cursor-pointer select-none py-0.5">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-primary accent-primary cursor-pointer"
                />
                <span className="text-xs leading-relaxed" style={{ color: "#64748B" }}>
                  I agree to receive communication on newsletters, promotional content, offers, and events through SMS, RCS, and WhatsApp.
                </span>
              </label>

              <motion.button
                type="submit"
                disabled={mutation.isPending || !agreed}
                whileHover={{ scale: mutation.isPending ? 1 : 1.015 }}
                whileTap={{ scale: mutation.isPending ? 1 : 0.985 }}
                className="mt-1 w-full py-3.5 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: mutation.isPending
                    ? "#93C5FD"
                    : "linear-gradient(135deg, #1263E8 0%, #0B4FC7 55%, #6EDD00 160%)",
                  boxShadow: mutation.isPending ? "none" : "0 8px 24px rgba(18, 99, 232, 0.35)",
                }}
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send
                  </>
                )}
              </motion.button>

              <a
                href={toTelHref(supportPhone)}
                className="mt-1 flex items-center justify-center gap-2 text-center text-xs sm:text-sm font-medium transition-colors hover:text-primary"
                style={{ color: "#64748B" }}
              >
                <Phone className="w-3.5 h-3.5 shrink-0 text-primary" />
                Call our team for any queries{" "}
                <span className="font-bold text-primary whitespace-nowrap">{supportPhone}</span>
              </a>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
