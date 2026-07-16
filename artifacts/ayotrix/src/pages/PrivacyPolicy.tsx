import React from "react";
import { Link } from "wouter";
import SeoHead from "@/components/SeoHead";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pb-20 pt-28">
      <SeoHead
        title="Privacy Policy | Ayotrix Infotech"
        description="How Ayotrix Infotech collects, uses, and protects your personal information when you use ayotrix.com or our services."
        path="/privacy-policy"
      />
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ color: "#0A1628" }}>Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: July 16, 2026</p>
        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: "#0A1628" }}>1. Who we are</h2>
            <p>
              Ayotrix Infotech (&quot;we&quot;, &quot;us&quot;) operates <Link href="/" className="text-primary underline">ayotrix.com</Link> and related services
              from Bhopal, Madhya Pradesh, India. Contact:{" "}
              <a href="mailto:info@ayotrix.com" className="text-primary underline">info@ayotrix.com</a>,{" "}
              <a href="tel:+919752045356" className="text-primary underline">+91 97520 45356</a>.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: "#0A1628" }}>2. Information we collect</h2>
            <p>We may collect name, email, phone number, company name, and message content when you submit inquiry or contact forms. We may also collect basic technical data such as browser type, device, and pages visited for analytics and security.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: "#0A1628" }}>3. How we use information</h2>
            <p>We use your information to respond to inquiries, provide quotes and services, improve our website, and comply with legal obligations. We do not sell your personal data.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: "#0A1628" }}>4. Sharing</h2>
            <p>We may share data with trusted processors (hosting, email, analytics) who help us operate the business, or when required by law.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: "#0A1628" }}>5. Data retention & security</h2>
            <p>We retain inquiry data as long as needed for business and legal purposes. We apply reasonable technical and organizational measures to protect your information.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: "#0A1628" }}>6. Your rights</h2>
            <p>You may request access, correction, or deletion of your personal data by emailing info@ayotrix.com.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: "#0A1628" }}>7. Changes</h2>
            <p>We may update this policy from time to time. The latest version will always be posted on this page.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
