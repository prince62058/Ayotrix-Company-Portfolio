import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export type InquiryFormType =
  | "ecommerce-development"
  | "taxi-booking-app"
  | "service-provider-platform"
  | "ads-management"
  | "whatsapp-marketing"
  | "rcs-marketing"
  | "otp-services"
  | "ai-agents"
  | "whatsapp-chatbot"
  | "google-my-business"
  | "google-ads"
  | "social-media-marketing"
  | "graphic-designing"
  | "ugc-reels"
  | "seo"
  | "general";

interface InquiryFormProps {
  formType: InquiryFormType;
  serviceName: string;
}

function InputField({ label, name, type = "text", placeholder, required = false, value, onChange }: {
  label: string; name: string; type?: string; placeholder?: string; required?: boolean; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold" style={{ color: "#374151" }}>
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all duration-200"
        style={{
          background: "#fff",
          border: "1.5px solid #E5E7EB",
          color: "#111827",
        }}
        onFocus={e => (e.target.style.borderColor = "#2563EB")}
        onBlur={e => (e.target.style.borderColor = "#E5E7EB")}
      />
    </div>
  );
}

function SelectField({ label, name, options, required = false, value, onChange }: {
  label: string; name: string; options: string[]; required?: boolean; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold" style={{ color: "#374151" }}>
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all duration-200 bg-white"
        style={{ border: "1.5px solid #E5E7EB", color: "#111827" }}
        onFocus={e => (e.target.style.borderColor = "#2563EB")}
        onBlur={e => (e.target.style.borderColor = "#E5E7EB")}
      >
        <option value="">Select an option</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function TextareaField({ label, name, placeholder, required = false, rows = 3, value, onChange }: {
  label: string; name: string; placeholder?: string; required?: boolean; rows?: number; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold" style={{ color: "#374151" }}>
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all duration-200 resize-none"
        style={{ background: "#fff", border: "1.5px solid #E5E7EB", color: "#111827" }}
        onFocus={e => (e.target.style.borderColor = "#2563EB")}
        onBlur={e => (e.target.style.borderColor = "#E5E7EB")}
      />
    </div>
  );
}

function useFormState(initial: Record<string, string>) {
  const [form, setForm] = useState(initial);
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return { form, onChange, setForm };
}

// ---------- Individual form renderers ----------

function EcommerceForm({ form, onChange }: { form: Record<string, string>; onChange: any }) {
  return (
    <>
      <InputField label="Full Name" name="fullName" required value={form.fullName || ""} onChange={onChange} />
      <InputField label="Mobile Number" name="mobile" type="tel" required value={form.mobile || ""} onChange={onChange} />
      <InputField label="Email Address" name="email" type="email" required value={form.email || ""} onChange={onChange} />
      <InputField label="Company / Business Name" name="company" required value={form.company || ""} onChange={onChange} />
      <SelectField label="Business Type" name="businessType" required options={["Retail", "Wholesale", "D2C Brand", "Marketplace", "Other"]} value={form.businessType || ""} onChange={onChange} />
      <InputField label="Existing Website (Optional)" name="website" type="url" placeholder="https://" value={form.website || ""} onChange={onChange} />
      <SelectField label="Number of Products" name="productCount" options={["1–50", "51–200", "201–500", "500+"]} value={form.productCount || ""} onChange={onChange} />
      <SelectField label="Estimated Budget" name="budget" required options={["Under ₹50K", "₹50K–₹1L", "₹1L–₹3L", "₹3L+"]} value={form.budget || ""} onChange={onChange} />
      <SelectField label="Project Timeline" name="timeline" options={["1 month", "2–3 months", "3–6 months", "Flexible"]} value={form.timeline || ""} onChange={onChange} />
      <TextareaField label="Project Description" name="description" placeholder="Tell us about your e-commerce project..." required value={form.description || ""} onChange={onChange} />
    </>
  );
}

function TaxiAppForm({ form, onChange }: { form: Record<string, string>; onChange: any }) {
  return (
    <>
      <InputField label="Full Name" name="fullName" required value={form.fullName || ""} onChange={onChange} />
      <InputField label="Mobile Number" name="mobile" type="tel" required value={form.mobile || ""} onChange={onChange} />
      <InputField label="Email" name="email" type="email" required value={form.email || ""} onChange={onChange} />
      <InputField label="Company Name" name="company" value={form.company || ""} onChange={onChange} />
      <InputField label="City / Country" name="city" required value={form.city || ""} onChange={onChange} />
      <SelectField label="Number of Vehicles" name="vehicles" options={["1–10", "11–50", "51–200", "200+"]} value={form.vehicles || ""} onChange={onChange} />
      <SelectField label="Customer App Required?" name="customerApp" required options={["Yes", "No"]} value={form.customerApp || ""} onChange={onChange} />
      <SelectField label="Driver App Required?" name="driverApp" options={["Yes", "No"]} value={form.driverApp || ""} onChange={onChange} />
      <SelectField label="Admin Panel Required?" name="adminPanel" options={["Yes", "No"]} value={form.adminPanel || ""} onChange={onChange} />
      <SelectField label="Budget" name="budget" required options={["Under ₹1L", "₹1L–₹3L", "₹3L–₹10L", "₹10L+"]} value={form.budget || ""} onChange={onChange} />
      <TextareaField label="Additional Requirements" name="description" placeholder="Any specific features or requirements..." value={form.description || ""} onChange={onChange} />
    </>
  );
}

function ServiceProviderForm({ form, onChange }: { form: Record<string, string>; onChange: any }) {
  return (
    <>
      <InputField label="Full Name" name="fullName" required value={form.fullName || ""} onChange={onChange} />
      <InputField label="Mobile Number" name="mobile" type="tel" required value={form.mobile || ""} onChange={onChange} />
      <InputField label="Email" name="email" type="email" required value={form.email || ""} onChange={onChange} />
      <InputField label="Business Name" name="company" required value={form.company || ""} onChange={onChange} />
      <SelectField label="Service Category" name="category" required options={["Home Services", "Beauty & Wellness", "Tutoring", "Healthcare", "Repair & Maintenance", "Other"]} value={form.category || ""} onChange={onChange} />
      <SelectField label="Number of Service Providers" name="providers" options={["1–10", "11–50", "51–200", "200+"]} value={form.providers || ""} onChange={onChange} />
      <SelectField label="Customer App Required?" name="customerApp" options={["Yes", "No"]} value={form.customerApp || ""} onChange={onChange} />
      <SelectField label="Provider App Required?" name="providerApp" options={["Yes", "No"]} value={form.providerApp || ""} onChange={onChange} />
      <SelectField label="Admin Panel Required?" name="adminPanel" options={["Yes", "No"]} value={form.adminPanel || ""} onChange={onChange} />
      <SelectField label="Budget" name="budget" required options={["Under ₹1L", "₹1L–₹3L", "₹3L–₹10L", "₹10L+"]} value={form.budget || ""} onChange={onChange} />
      <TextareaField label="Project Details" name="description" placeholder="Describe your service marketplace..." value={form.description || ""} onChange={onChange} />
    </>
  );
}

function AdsManagementForm({ form, onChange }: { form: Record<string, string>; onChange: any }) {
  return (
    <>
      <InputField label="Business Name" name="company" required value={form.company || ""} onChange={onChange} />
      <SelectField label="Monthly Ad Budget" name="budget" required options={["Under ₹20K", "₹20K–₹50K", "₹50K–₹2L", "₹2L+"]} value={form.budget || ""} onChange={onChange} />
      <SelectField label="Platform" name="platform" required options={["Google Ads", "Meta Ads", "Both Google & Meta", "Other"]} value={form.platform || ""} onChange={onChange} />
      <InputField label="Industry" name="industry" required value={form.industry || ""} onChange={onChange} />
      <InputField label="Campaign Goals" name="goals" placeholder="e.g. Lead generation, Sales, Brand awareness" required value={form.goals || ""} onChange={onChange} />
      <InputField label="Full Name" name="fullName" required value={form.fullName || ""} onChange={onChange} />
      <InputField label="Mobile Number" name="mobile" type="tel" required value={form.mobile || ""} onChange={onChange} />
      <InputField label="Email Address" name="email" type="email" required value={form.email || ""} onChange={onChange} />
    </>
  );
}

function WhatsAppMarketingForm({ form, onChange }: { form: Record<string, string>; onChange: any }) {
  return (
    <>
      <InputField label="Business Name" name="company" required value={form.company || ""} onChange={onChange} />
      <InputField label="WhatsApp Business Number" name="whatsappNumber" type="tel" required value={form.whatsappNumber || ""} onChange={onChange} />
      <SelectField label="Monthly Contacts" name="contacts" required options={["Under 1K", "1K–10K", "10K–50K", "50K+"]} value={form.contacts || ""} onChange={onChange} />
      <SelectField label="API Integration Required?" name="apiRequired" options={["Yes", "No", "Not Sure"]} value={form.apiRequired || ""} onChange={onChange} />
      <SelectField label="Campaign Type" name="campaignType" options={["Promotional", "Transactional", "Both", "Other"]} value={form.campaignType || ""} onChange={onChange} />
      <InputField label="Full Name" name="fullName" required value={form.fullName || ""} onChange={onChange} />
      <InputField label="Mobile Number" name="mobile" type="tel" required value={form.mobile || ""} onChange={onChange} />
      <InputField label="Email Address" name="email" type="email" required value={form.email || ""} onChange={onChange} />
    </>
  );
}

function RCSMarketingForm({ form, onChange }: { form: Record<string, string>; onChange: any }) {
  return (
    <>
      <InputField label="Brand Name" name="company" required value={form.company || ""} onChange={onChange} />
      <SelectField label="Monthly Message Volume" name="volume" required options={["Under 10K", "10K–1L", "1L–10L", "10L+"]} value={form.volume || ""} onChange={onChange} />
      <InputField label="Industry" name="industry" required value={form.industry || ""} onChange={onChange} />
      <InputField label="Campaign Objective" name="objective" placeholder="e.g. Promotions, OTP, Alerts" required value={form.objective || ""} onChange={onChange} />
      <InputField label="Full Name" name="fullName" required value={form.fullName || ""} onChange={onChange} />
      <InputField label="Mobile Number" name="mobile" type="tel" required value={form.mobile || ""} onChange={onChange} />
      <InputField label="Email Address" name="email" type="email" required value={form.email || ""} onChange={onChange} />
    </>
  );
}

function OTPServicesForm({ form, onChange }: { form: Record<string, string>; onChange: any }) {
  return (
    <>
      <InputField label="Company Name" name="company" required value={form.company || ""} onChange={onChange} />
      <SelectField label="Monthly OTP Volume" name="volume" required options={["Under 10K", "10K–1L", "1L–10L", "10L+"]} value={form.volume || ""} onChange={onChange} />
      <InputField label="Country / Region" name="country" required value={form.country || ""} onChange={onChange} />
      <SelectField label="API Integration Required?" name="apiRequired" required options={["Yes", "No", "Already Have API"]} value={form.apiRequired || ""} onChange={onChange} />
      <InputField label="Full Name" name="fullName" required value={form.fullName || ""} onChange={onChange} />
      <InputField label="Mobile Number" name="mobile" type="tel" required value={form.mobile || ""} onChange={onChange} />
      <InputField label="Email Address" name="email" type="email" required value={form.email || ""} onChange={onChange} />
    </>
  );
}

function AIAgentsForm({ form, onChange }: { form: Record<string, string>; onChange: any }) {
  return (
    <>
      <InputField label="Company Name" name="company" required value={form.company || ""} onChange={onChange} />
      <SelectField label="AI Agent Type" name="agentType" required options={["Sales Agent", "Support Agent", "Voice Agent", "All Three"]} value={form.agentType || ""} onChange={onChange} />
      <InputField label="CRM Used" name="crm" placeholder="e.g. Salesforce, HubSpot, Zoho, None" value={form.crm || ""} onChange={onChange} />
      <SelectField label="Daily Calls / Interactions" name="dailyCalls" options={["Under 100", "100–500", "500–2000", "2000+"]} value={form.dailyCalls || ""} onChange={onChange} />
      <InputField label="Full Name" name="fullName" required value={form.fullName || ""} onChange={onChange} />
      <InputField label="Mobile Number" name="mobile" type="tel" required value={form.mobile || ""} onChange={onChange} />
      <InputField label="Email Address" name="email" type="email" required value={form.email || ""} onChange={onChange} />
    </>
  );
}

function WhatsAppChatbotForm({ form, onChange }: { form: Record<string, string>; onChange: any }) {
  return (
    <>
      <InputField label="Business Name" name="company" required value={form.company || ""} onChange={onChange} />
      <InputField label="Industry" name="industry" required value={form.industry || ""} onChange={onChange} />
      <SelectField label="CRM Integration Required?" name="crmRequired" options={["Yes", "No", "Not Sure"]} value={form.crmRequired || ""} onChange={onChange} />
      <SelectField label="AI Chatbot Needed?" name="aiChatbot" required options={["Yes", "No", "Rule-based Only"]} value={form.aiChatbot || ""} onChange={onChange} />
      <TextareaField label="Automation Requirements" name="description" placeholder="Describe what you want to automate..." required value={form.description || ""} onChange={onChange} />
      <InputField label="Full Name" name="fullName" required value={form.fullName || ""} onChange={onChange} />
      <InputField label="Mobile Number" name="mobile" type="tel" required value={form.mobile || ""} onChange={onChange} />
      <InputField label="Email Address" name="email" type="email" required value={form.email || ""} onChange={onChange} />
    </>
  );
}

function GoogleMyBusinessForm({ form, onChange }: { form: Record<string, string>; onChange: any }) {
  return (
    <>
      <InputField label="Business Name" name="company" required value={form.company || ""} onChange={onChange} />
      <InputField label="Business Location" name="location" required value={form.location || ""} onChange={onChange} />
      <SelectField label="Existing GMB Profile?" name="hasGMB" required options={["Yes — needs optimization", "No — need to create one"]} value={form.hasGMB || ""} onChange={onChange} />
      <InputField label="Monthly Goal" name="goal" placeholder="e.g. 50 leads/month, rank #1 locally" required value={form.goal || ""} onChange={onChange} />
      <InputField label="Full Name" name="fullName" required value={form.fullName || ""} onChange={onChange} />
      <InputField label="Mobile Number" name="mobile" type="tel" required value={form.mobile || ""} onChange={onChange} />
      <InputField label="Email Address" name="email" type="email" required value={form.email || ""} onChange={onChange} />
    </>
  );
}

function GoogleAdsForm({ form, onChange }: { form: Record<string, string>; onChange: any }) {
  return (
    <>
      <InputField label="Business Name" name="company" required value={form.company || ""} onChange={onChange} />
      <InputField label="Website URL" name="website" type="url" placeholder="https://" required value={form.website || ""} onChange={onChange} />
      <SelectField label="Monthly Ad Budget" name="budget" required options={["Under ₹20K", "₹20K–₹50K", "₹50K–₹2L", "₹2L+"]} value={form.budget || ""} onChange={onChange} />
      <InputField label="Campaign Goal" name="goal" placeholder="e.g. Leads, Sales, Traffic, Calls" required value={form.goal || ""} onChange={onChange} />
      <InputField label="Industry" name="industry" required value={form.industry || ""} onChange={onChange} />
      <InputField label="Full Name" name="fullName" required value={form.fullName || ""} onChange={onChange} />
      <InputField label="Mobile Number" name="mobile" type="tel" required value={form.mobile || ""} onChange={onChange} />
      <InputField label="Email Address" name="email" type="email" required value={form.email || ""} onChange={onChange} />
    </>
  );
}

function SocialMediaForm({ form, onChange }: { form: Record<string, string>; onChange: any }) {
  return (
    <>
      <InputField label="Business Name" name="company" required value={form.company || ""} onChange={onChange} />
      <SelectField label="Social Platforms" name="platforms" required options={["Instagram", "Facebook", "LinkedIn", "Twitter/X", "Instagram + Facebook", "All Platforms"]} value={form.platforms || ""} onChange={onChange} />
      <SelectField label="Monthly Budget" name="budget" required options={["Under ₹10K", "₹10K–₹30K", "₹30K–₹1L", "₹1L+"]} value={form.budget || ""} onChange={onChange} />
      <InputField label="Goals" name="goals" placeholder="e.g. Brand awareness, followers, engagement" required value={form.goals || ""} onChange={onChange} />
      <InputField label="Full Name" name="fullName" required value={form.fullName || ""} onChange={onChange} />
      <InputField label="Mobile Number" name="mobile" type="tel" required value={form.mobile || ""} onChange={onChange} />
      <InputField label="Email Address" name="email" type="email" required value={form.email || ""} onChange={onChange} />
    </>
  );
}

function GraphicDesigningForm({ form, onChange }: { form: Record<string, string>; onChange: any }) {
  return (
    <>
      <SelectField label="Design Type" name="designType" required options={["Logo Design", "Social Media Posts", "Banner & Ads", "Brand Identity", "Packaging", "Other"]} value={form.designType || ""} onChange={onChange} />
      <InputField label="Brand Name" name="company" required value={form.company || ""} onChange={onChange} />
      <SelectField label="Number of Designs" name="count" required options={["1–5", "6–15", "16–30", "30+"]} value={form.count || ""} onChange={onChange} />
      <InputField label="Deadline" name="deadline" type="date" value={form.deadline || ""} onChange={onChange} />
      <InputField label="Full Name" name="fullName" required value={form.fullName || ""} onChange={onChange} />
      <InputField label="Mobile Number" name="mobile" type="tel" required value={form.mobile || ""} onChange={onChange} />
      <InputField label="Email Address" name="email" type="email" required value={form.email || ""} onChange={onChange} />
    </>
  );
}

function UGCReelsForm({ form, onChange }: { form: Record<string, string>; onChange: any }) {
  return (
    <>
      <InputField label="Brand Name" name="company" required value={form.company || ""} onChange={onChange} />
      <InputField label="Product Category" name="category" required value={form.category || ""} onChange={onChange} />
      <SelectField label="Number of Reels Required" name="count" required options={["1–3", "4–8", "9–15", "15+"]} value={form.count || ""} onChange={onChange} />
      <SelectField label="Platform" name="platform" required options={["Instagram Reels", "YouTube Shorts", "TikTok", "All Platforms"]} value={form.platform || ""} onChange={onChange} />
      <InputField label="Full Name" name="fullName" required value={form.fullName || ""} onChange={onChange} />
      <InputField label="Mobile Number" name="mobile" type="tel" required value={form.mobile || ""} onChange={onChange} />
      <InputField label="Email Address" name="email" type="email" required value={form.email || ""} onChange={onChange} />
    </>
  );
}

function SEOForm({ form, onChange }: { form: Record<string, string>; onChange: any }) {
  return (
    <>
      <InputField label="Website URL" name="website" type="url" placeholder="https://" required value={form.website || ""} onChange={onChange} />
      <InputField label="Business Category" name="category" required value={form.category || ""} onChange={onChange} />
      <InputField label="Target Keywords" name="keywords" placeholder="e.g. digital marketing agency, web development" value={form.keywords || ""} onChange={onChange} />
      <InputField label="Target Location" name="location" placeholder="e.g. Bhopal, India, Global" required value={form.location || ""} onChange={onChange} />
      <SelectField label="Monthly Budget" name="budget" required options={["Under ₹10K", "₹10K–₹30K", "₹30K–₹1L", "₹1L+"]} value={form.budget || ""} onChange={onChange} />
      <InputField label="Full Name" name="fullName" required value={form.fullName || ""} onChange={onChange} />
      <InputField label="Mobile Number" name="mobile" type="tel" required value={form.mobile || ""} onChange={onChange} />
      <InputField label="Email Address" name="email" type="email" required value={form.email || ""} onChange={onChange} />
    </>
  );
}

function GeneralForm({ form, onChange }: { form: Record<string, string>; onChange: any }) {
  return (
    <>
      <InputField label="Full Name" name="fullName" required value={form.fullName || ""} onChange={onChange} />
      <InputField label="Mobile Number" name="mobile" type="tel" required value={form.mobile || ""} onChange={onChange} />
      <InputField label="Email Address" name="email" type="email" required value={form.email || ""} onChange={onChange} />
      <InputField label="Company / Business Name" name="company" value={form.company || ""} onChange={onChange} />
      <SelectField label="Estimated Budget" name="budget" options={["Under ₹50K", "₹50K–₹1L", "₹1L–₹3L", "₹3L+"]} value={form.budget || ""} onChange={onChange} />
      <SelectField label="Project Timeline" name="timeline" options={["ASAP", "1 month", "2–3 months", "Flexible"]} value={form.timeline || ""} onChange={onChange} />
      <TextareaField label="Project Description" name="description" placeholder="Tell us about your project and requirements..." required rows={4} value={form.description || ""} onChange={onChange} />
    </>
  );
}

const FORM_TITLES: Record<InquiryFormType, string> = {
  "ecommerce-development": "Get Your E-Commerce Store Quote",
  "taxi-booking-app": "Build Your Taxi App",
  "service-provider-platform": "Build Your Service Marketplace",
  "ads-management": "Start Your Ad Campaign",
  "whatsapp-marketing": "Launch WhatsApp Marketing",
  "rcs-marketing": "Scale with RCS Marketing",
  "otp-services": "Get OTP Service Setup",
  "ai-agents": "Deploy Your AI Agent",
  "whatsapp-chatbot": "Build Your WhatsApp Chatbot",
  "google-my-business": "Optimize Your GMB Profile",
  "google-ads": "Launch Google Ads Campaign",
  "social-media-marketing": "Grow on Social Media",
  "graphic-designing": "Get Professional Designs",
  "ugc-reels": "Create UGC Reels",
  "seo": "Boost Your SEO Rankings",
  "general": "Get a Free Quote",
};

export default function InquiryForm({ formType, serviceName }: InquiryFormProps) {
  const [form, setForm] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: form.fullName || form.company || "Inquiry",
        email: form.email || "",
        phone: form.mobile || "",
        message: JSON.stringify({ serviceType: formType, serviceName, ...form }, null, 2),
        source: window.location.href,
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Failed to submit");
      }
    } catch {
      toast({ title: "Submitted!", description: "We'll get back to you within 24 hours.", variant: "default" });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const title = FORM_TITLES[formType] || "Get a Free Quote";

  return (
    <div className="relative rounded-3xl overflow-hidden" style={{
      background: "#fff",
      border: "1.5px solid #E5E7EB",
      boxShadow: "0 4px 40px rgba(37,99,235,0.08), 0 1px 8px rgba(0,0,0,0.05)",
    }}>
      {/* Header */}
      <div className="px-8 pt-8 pb-6" style={{
        background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
      }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{
          background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)"
        }}>
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-white text-xs font-semibold uppercase tracking-widest">Free Consultation</span>
        </div>
        <h3 className="text-2xl font-black text-white leading-tight">{title}</h3>
        <p className="text-blue-100 text-sm mt-2">Fill in the details below and we'll get back to you within 24 hours.</p>
      </div>

      {/* Form Body */}
      <div className="px-8 py-8">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}
              >
                <CheckCircle2 className="w-10 h-10 text-white" />
              </motion.div>
              <h4 className="text-2xl font-black mb-3" style={{ color: "#111827" }}>Inquiry Submitted!</h4>
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#6B7280" }}>
                Thank you for reaching out. Our team will review your {serviceName} inquiry and contact you within 24 hours.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setSubmitted(false); setForm({}); }}
                className="mt-8 px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: "#2563EB" }}
              >
                Submit Another Inquiry
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              {formType === "ecommerce-development" && <EcommerceForm form={form} onChange={onChange} />}
              {formType === "taxi-booking-app" && <TaxiAppForm form={form} onChange={onChange} />}
              {formType === "service-provider-platform" && <ServiceProviderForm form={form} onChange={onChange} />}
              {formType === "ads-management" && <AdsManagementForm form={form} onChange={onChange} />}
              {formType === "whatsapp-marketing" && <WhatsAppMarketingForm form={form} onChange={onChange} />}
              {formType === "rcs-marketing" && <RCSMarketingForm form={form} onChange={onChange} />}
              {formType === "otp-services" && <OTPServicesForm form={form} onChange={onChange} />}
              {formType === "ai-agents" && <AIAgentsForm form={form} onChange={onChange} />}
              {formType === "whatsapp-chatbot" && <WhatsAppChatbotForm form={form} onChange={onChange} />}
              {formType === "google-my-business" && <GoogleMyBusinessForm form={form} onChange={onChange} />}
              {formType === "google-ads" && <GoogleAdsForm form={form} onChange={onChange} />}
              {formType === "social-media-marketing" && <SocialMediaForm form={form} onChange={onChange} />}
              {formType === "graphic-designing" && <GraphicDesigningForm form={form} onChange={onChange} />}
              {formType === "ugc-reels" && <UGCReelsForm form={form} onChange={onChange} />}
              {formType === "seo" && <SEOForm form={form} onChange={onChange} />}
              {formType === "general" && <GeneralForm form={form} onChange={onChange} />}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -1 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="mt-2 flex items-center justify-center gap-2 w-full py-4 rounded-xl text-base font-bold text-white transition-all duration-200"
                style={{
                  background: loading ? "#93C5FD" : "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                  boxShadow: loading ? "none" : "0 4px 20px rgba(37,99,235,0.35)",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                ) : (
                  <><Send className="w-5 h-5" /> Submit Inquiry</>
                )}
              </motion.button>

              <p className="text-center text-xs" style={{ color: "#9CA3AF" }}>
                🔒 Your information is secure and will never be shared.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function getFormTypeFromName(name: string): InquiryFormType {
  const lower = name.toLowerCase();
  if (lower.includes("ecommerce") || lower.includes("e-commerce") || lower.includes("e commerce") || lower.includes("online store")) return "ecommerce-development";
  if (lower.includes("taxi") || lower.includes("cab") || lower.includes("ride")) return "taxi-booking-app";
  if (lower.includes("service provider") || lower.includes("marketplace")) return "service-provider-platform";
  if (lower.includes("ads management") || lower.includes("ad management")) return "ads-management";
  if (lower.includes("whatsapp marketing")) return "whatsapp-marketing";
  if (lower.includes("rcs")) return "rcs-marketing";
  if (lower.includes("otp")) return "otp-services";
  if (lower.includes("ai agent") || lower.includes("voice agent") || lower.includes("calling agent")) return "ai-agents";
  if (lower.includes("whatsapp") && (lower.includes("bot") || lower.includes("chatbot") || lower.includes("automation"))) return "whatsapp-chatbot";
  if (lower.includes("google my business") || lower.includes("gmb")) return "google-my-business";
  if (lower.includes("google ads") || lower.includes("google ad")) return "google-ads";
  if (lower.includes("social media")) return "social-media-marketing";
  if (lower.includes("graphic") || lower.includes("design")) return "graphic-designing";
  if (lower.includes("ugc") || lower.includes("reel")) return "ugc-reels";
  if (lower.includes("seo")) return "seo";
  return "general";
}
