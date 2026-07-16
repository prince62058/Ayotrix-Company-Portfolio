import React, { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import IconDisplay, { isImageIcon } from "@/components/IconDisplay";

const EMOJI_OPTIONS = [
  "🛒", "🚕", "🔧", "📊", "💬", "📡", "🔐", "🤖", "📍", "🎯",
  "📱", "🎨", "🎬", "🚀", "⚡", "🌐", "📦", "💡", "🛠️", "📈",
  "🔔", "✉️", "📞", "🖥️", "☁️", "🛡️", "⭐", "🔥", "💼", "🤝",
];

type IconPickerProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
};

export default function IconPicker({ value, onChange, label = "Icon" }: IconPickerProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 512 * 1024) {
      alert("Icon image must be under 512KB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => onChange(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-xl border border-border bg-background flex items-center justify-center text-3xl overflow-hidden shrink-0">
          <IconDisplay icon={value} alt="Icon preview" imgClassName="w-10 h-10 object-contain" />
        </div>
        <div className="flex-1 space-y-2">
          <Input
            value={isImageIcon(value) ? "" : value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste emoji or type custom"
            className="bg-background rounded-2xl"
          />
          <div className="flex flex-wrap gap-2">
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
            <Button type="button" variant="outline" size="sm" className="rounded-xl" onClick={() => fileRef.current?.click()}>
              <Upload className="w-3.5 h-3.5 mr-1.5" /> Upload image
            </Button>
            {value && (
              <Button type="button" variant="ghost" size="sm" className="rounded-xl text-destructive" onClick={() => onChange("")}>
                <X className="w-3.5 h-3.5 mr-1" /> Clear
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-10 gap-1.5">
        {EMOJI_OPTIONS.map((emoji) => (
          <button
            key={emoji}
            type="button"
            onClick={() => onChange(emoji)}
            className="h-9 rounded-lg text-lg hover:bg-primary/15 transition-colors border border-transparent"
            style={value === emoji ? { background: "rgba(37,99,235,0.18)", borderColor: "rgba(37,99,235,0.35)" } : undefined}
          >
            {emoji}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">Pick an emoji, paste one, or upload a small PNG/SVG icon.</p>
    </div>
  );
}
