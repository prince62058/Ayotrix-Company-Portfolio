import React, { useState } from "react";
import { Copy, Check, ExternalLink, X, Smartphone } from "lucide-react";
import { useGetSiteSettings } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

export default function TopAppBanner() {
  const { data: settings } = useGetSiteSettings();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const playStoreUrl =
    (settings as any)?.playStoreUrl ||
    "https://play.google.com/store/apps/details?id=com.marketingkart.app";

  if (dismissed) return null;

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(playStoreUrl);
    setCopied(true);
    toast({
      title: "Play Store Link Copied!",
      description: "You can now paste and send it to your client.",
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <aside
      aria-label="App announcement"
      className="relative z-50 text-xs py-2 px-4 transition-all duration-300"
      style={{
        background: "linear-gradient(90deg, #0F172A 0%, #1E3A8A 50%, #0F172A 100%)",
        borderBottom: "1px solid rgba(59,130,246,0.25)",
        color: "#F8FAFC",
      }}
    >
      <div className="container mx-auto max-w-7xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] tracking-wide uppercase">
            <Smartphone className="w-3 h-3" /> Live
          </span>
          <p className="truncate font-medium text-[11px] sm:text-xs text-slate-200">
            <span className="font-bold text-white">MarketingKart App</span> is live on Google Play Store!
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-[11px] transition-colors shadow-sm"
          >
            <span>Play Store Link</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-[11px] border border-slate-700 transition-colors"
            title="Copy Google Play Store link"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-sky-400" />
                <span className="hidden sm:inline">Copy Link</span>
              </>
            )}
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors ml-1"
            title="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
