import { useEffect } from "react";

const SITE_URL = "https://ayotrix.com";
const DEFAULT_OG = `${SITE_URL}/og-image.jpg`;

export interface SeoHeadProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = url;
}

function setJsonLd(data: Record<string, unknown> | Record<string, unknown>[] | undefined) {
  const existing = document.getElementById("page-jsonld");
  if (existing) existing.remove();
  if (!data) return;
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = "page-jsonld";
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

export default function SeoHead({
  title,
  description,
  path = "/",
  image = DEFAULT_OG,
  type = "website",
  noindex = false,
  jsonLd,
}: SeoHeadProps) {
  useEffect(() => {
    const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setCanonical(url);

    setMeta("property", "og:type", type);
    setMeta("property", "og:url", url);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", image);
    setMeta("property", "og:site_name", "Ayotrix Infotech");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);

    setJsonLd(jsonLd);
  }, [title, description, path, image, type, noindex, jsonLd]);

  return null;
}

export { SITE_URL };
