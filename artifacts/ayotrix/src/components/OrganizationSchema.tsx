import { useEffect } from "react";
import { SITE_URL } from "./SeoHead";

const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ayotrix Infotech",
  alternateName: "Ayotrix Technology Pvt. Ltd.",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  description:
    "Ayotrix Infotech delivers custom app development, WhatsApp & RCS marketing, AI agents, OTP services, and digital marketing for businesses across India.",
  foundingLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bhopal",
      addressRegion: "Madhya Pradesh",
      addressCountry: "IN",
    },
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bhopal",
    addressRegion: "Madhya Pradesh",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-97520-45356",
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  ],
  email: "info@ayotrix.com",
  sameAs: [],
  areaServed: {
    "@type": "Country",
    name: "India",
  },
};

export default function OrganizationSchema() {
  useEffect(() => {
    let script = document.getElementById("org-jsonld") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "org-jsonld";
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(ORGANIZATION_LD);
  }, []);

  return null;
}
