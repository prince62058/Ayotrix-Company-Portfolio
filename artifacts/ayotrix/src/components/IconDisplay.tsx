import React from "react";

export function isImageIcon(value?: string | null): boolean {
  if (!value) return false;
  return (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("/") ||
    value.startsWith("data:image")
  );
}

/** Prefer explicit icon; fall back to imageUrl when it is an emoji (legacy product admin). */
export function resolveIcon(item: { icon?: string | null; imageUrl?: string | null } | null | undefined, fallback = "📦"): string {
  if (item?.icon) return item.icon;
  if (item?.imageUrl && !isImageIcon(item.imageUrl)) return item.imageUrl;
  return fallback;
}

type IconDisplayProps = {
  icon?: string | null;
  alt?: string;
  className?: string;
  imgClassName?: string;
};

export default function IconDisplay({ icon, alt = "", className = "", imgClassName = "w-full h-full object-contain" }: IconDisplayProps) {
  if (!icon) return <span className={className}>📦</span>;
  if (isImageIcon(icon)) {
    return (
      <img
        src={icon}
        alt={alt}
        className={`${imgClassName} ${className}`.trim()}
        loading="lazy"
      />
    );
  }
  return <span className={className}>{icon}</span>;
}
