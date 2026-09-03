import React from "react";
import { Link } from "wouter";
import SeoHead from "@/components/SeoHead";
import { useGetSiteSettings } from "@workspace/api-client-react";

export default function TermsOfService() {
  const { data: settings } = useGetSiteSettings();
  const companyName = settings?.companyName || "Ayotrix Infotech";
  const email = settings?.email || "info@ayotrix.com";
  const phone = settings?.phone || "+91 97520 45356";
  const lastUpdated = settings?.termsOfServiceLastUpdated || "July 16, 2026";
  const customContent = settings?.termsOfServiceContent;

  return (
    <div className="min-h-screen pb-20 pt-28">
      <SeoHead
        title={`Terms of Service | ${companyName}`}
        description={`Terms governing use of our website and engagement with ${companyName} for app development, marketing, and communication products.`}
        path="/terms-of-service"
      />
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ color: "#0A1628" }}>Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: {lastUpdated}</p>

        {customContent ? (
          <div className="space-y-6 text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {customContent.split("\n\n").map((block, idx) => {
              const trimmed = block.trim();
              if (!trimmed) return null;
              if (/^[0-9A-Z\s#.:-]{3,60}$/m.test(trimmed.split("\n")[0]) && trimmed.split("\n").length === 1) {
                return (
                  <h2 key={idx} className="text-xl font-bold mt-8 mb-3" style={{ color: "#0A1628" }}>
                    {trimmed}
                  </h2>
                );
              }
              return (
                <p key={idx} className="leading-relaxed">
                  {trimmed}
                </p>
              );
            })}
          </div>
        ) : (
          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: "#0A1628" }}>1. Agreement</h2>
              <p>
                By using <Link href="/" className="text-primary underline">ayotrix.com</Link> or engaging {companyName} for services, you agree to these terms.
                Project-specific scopes, timelines, and fees are defined in separate proposals or contracts.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: "#0A1628" }}>2. Services</h2>
              <p>We provide software development, digital marketing, messaging products (WhatsApp, RCS, OTP), AI agents, and related consulting. Deliverables and warranties are as stated in the signed statement of work.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: "#0A1628" }}>3. Client responsibilities</h2>
              <p>You agree to provide accurate information, timely feedback, and any assets or access needed for delivery. Delays on your side may affect timelines.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: "#0A1628" }}>4. Intellectual property</h2>
              <p>Upon full payment, custom work product transfers as agreed in the contract. Pre-existing tools, frameworks, and third-party licenses remain with their owners.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: "#0A1628" }}>5. Payments</h2>
              <p>Invoices are due as per the proposal. Late payments may pause work. Fees are non-refundable except where required by law or written agreement.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: "#0A1628" }}>6. Limitation of liability</h2>
              <p>To the maximum extent permitted by law, {companyName} is not liable for indirect or consequential damages. Total liability is limited to fees paid for the specific engagement in the prior 3 months.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: "#0A1628" }}>7. Contact</h2>
              <p>
                Questions: <a href={`mailto:${email}`} className="text-primary underline">{email}</a> ·{" "}
                <a href={`tel:${phone}`} className="text-primary underline">{phone}</a>
              </p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
