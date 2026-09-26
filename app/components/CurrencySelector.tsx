"use client";

import { Currency } from "@/lib/types";

const OPTIONS: { value: Currency; label: string }[] = [
  { value: "FCFA", label: "FCFA" },
  { value: "EUR", label: "EUR €" },
  { value: "USD", label: "USD $" },
];

export default function CurrencySelector({
  value,
  onChange,
  dark = false,
}: {
  value: Currency;
  onChange: (c: Currency) => void;
  dark?: boolean;
}) {
  return (
    <div
      className={`inline-flex rounded-full p-1 text-[11px] font-black uppercase tracking-widest ${
        dark ? "bg-white/10" : "bg-black/5"
      }`}
    >
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`px-3 py-1.5 rounded-full transition-all ${
            value === o.value
              ? "bg-[#8DC63F] text-[#1A2F15]"
              : dark
                ? "text-white/60 hover:text-white"
                : "text-[#1A2F15]/50 hover:text-[#1A2F15]"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
