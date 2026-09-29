import React from "react";
import { motion } from "framer-motion";
import { Check, CheckCheck, Lock, Shield, Bot, Star, MapPin, ArrowUpRight } from "lucide-react";

export function AdsVisual() {
  return (
    <div className="relative w-full h-[110px] flex items-center justify-center select-none overflow-hidden rounded-xl bg-gradient-to-tr from-purple-50/50 via-indigo-50/30 to-white">
      {/* 3D Target board with arrow */}
      <div className="relative flex items-center justify-center">
        {/* Outer Red Ring */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 to-red-600 flex items-center justify-center shadow-lg border-2 border-rose-400">
          {/* White Ring */}
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-inner">
            {/* Inner Red Ring */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500 to-red-600 flex items-center justify-center">
              {/* Gold Bullseye Center */}
              <div className="w-4 h-4 rounded-full bg-amber-300 shadow-sm border border-amber-400" />
            </div>
          </div>
        </div>

        {/* Golden Arrow in Center */}
        <div className="absolute -top-1 -right-2 text-2xl drop-shadow-md rotate-45">
          🎯
        </div>
      </div>

      {/* Ascending 3D Bar Chart */}
      <div className="ml-3 flex items-end gap-1.5 h-16 pb-1">
        <div className="w-3 h-8 bg-gradient-to-t from-purple-500 to-indigo-400 rounded-t-md shadow-sm" />
        <div className="w-3 h-11 bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-md shadow-sm" />
        <div className="w-3 h-14 bg-gradient-to-t from-pink-500 to-rose-400 rounded-t-md shadow-sm" />
      </div>
    </div>
  );
}

export function WhatsAppMarketingVisual() {
  return (
    <div className="relative w-full h-[110px] flex items-center justify-center select-none overflow-hidden rounded-xl bg-gradient-to-tr from-emerald-50/50 via-teal-50/30 to-white">
      {/* 3D Smartphone with WhatsApp UI */}
      <div className="relative w-16 h-24 rounded-2xl p-1 bg-slate-900 shadow-lg border-2 border-slate-700 -rotate-3">
        <div className="w-full h-full rounded-xl bg-emerald-50 overflow-hidden flex flex-col p-1 text-[6px]">
          <div className="w-5 h-1 bg-slate-900 rounded-b mx-auto mb-1" />
          <div className="w-full py-0.5 px-1 bg-[#075E54] text-white rounded font-bold">Ayotrix</div>
          <div className="p-1 rounded bg-[#DCF8C6] text-[5.5px] text-slate-800 shadow-xs mt-1">
            Bulk Offer Live! 🎉
          </div>
        </div>
      </div>

      {/* Big 3D WhatsApp Speech Bubble */}
      <motion.div
        animate={{ y: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        className="ml-2 w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 text-white flex items-center justify-center text-2xl shadow-xl shadow-green-500/25 border border-green-300"
      >
        💬
      </motion.div>
    </div>
  );
}

export function RcsVisual() {
  return (
    <div className="relative w-full h-[110px] flex items-center justify-center select-none overflow-hidden rounded-xl bg-gradient-to-tr from-blue-50/50 via-sky-50/30 to-white">
      {/* 3D Phone with Rich RCS Card */}
      <div className="relative w-16 h-24 rounded-2xl p-1 bg-slate-900 shadow-lg border-2 border-slate-700 rotate-2">
        <div className="w-full h-full rounded-xl bg-white overflow-hidden flex flex-col p-1 text-[6px]">
          <div className="w-5 h-1 bg-slate-900 rounded-b mx-auto mb-1" />
          {/* Rich Media Banner */}
          <div className="w-full h-7 rounded bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[7px] font-bold">
            RCS Card
          </div>
          <div className="font-bold text-[6px] text-slate-800 mt-1 truncate">Verified Brand</div>
          <div className="w-full py-0.5 rounded bg-blue-600 text-white font-bold text-[5.5px] text-center mt-auto">
            Action
          </div>
        </div>
      </div>

      {/* Floating RCS Badge */}
      <div className="ml-2 flex flex-col items-center gap-1">
        <div className="px-2 py-1 rounded-lg bg-blue-600 text-white font-black text-[9px] shadow-md border border-blue-400">
          RCS
        </div>
        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs">
          📡
        </div>
      </div>
    </div>
  );
}

export function OtpVisual() {
  return (
    <div className="relative w-full h-[110px] flex items-center justify-center select-none overflow-hidden rounded-xl bg-gradient-to-tr from-orange-50/50 via-amber-50/30 to-white">
      {/* 3D Phone with OTP input */}
      <div className="relative w-16 h-24 rounded-2xl p-1 bg-slate-900 shadow-lg border-2 border-slate-700 -rotate-2">
        <div className="w-full h-full rounded-xl bg-white overflow-hidden flex flex-col p-1 text-[6px] items-center justify-center">
          <div className="w-5 h-1 bg-slate-900 rounded-b mx-auto mb-2" />
          <div className="font-bold text-[6.5px] text-slate-800 mb-1">Enter OTP</div>
          {/* 4 digit boxes */}
          <div className="flex gap-0.5 mb-2">
            {["1", "2", "3", "4"].map((digit, i) => (
              <div key={i} className="w-2.5 h-3 rounded bg-amber-50 border border-amber-300 font-bold text-[6px] text-amber-700 flex items-center justify-center">
                {digit}
              </div>
            ))}
          </div>
          <div className="text-[5px] text-emerald-600 font-bold">Verified ✓</div>
        </div>
      </div>

      {/* Golden Shield & Lock */}
      <motion.div
        animate={{ y: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
        className="ml-2 w-12 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex flex-col items-center justify-center shadow-lg shadow-amber-500/25 border border-amber-300"
      >
        <Lock className="w-5 h-5 text-white" />
        <span className="text-[6.5px] font-black text-amber-950 mt-0.5">SECURE</span>
      </motion.div>
    </div>
  );
}

export function AiAgentsVisual() {
  return (
    <div className="relative w-full h-[110px] flex items-center justify-center select-none overflow-hidden rounded-xl bg-gradient-to-tr from-purple-50/50 via-pink-50/30 to-white">
      {/* Cute 3D AI Robot */}
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="relative flex flex-col items-center"
      >
        {/* Robot Head */}
        <div className="w-12 h-10 rounded-2xl bg-gradient-to-b from-slate-100 to-white border-2 border-slate-300 shadow-md flex items-center justify-center relative">
          {/* Blue Glowing Visor */}
          <div className="w-8 h-4 rounded-full bg-slate-900 flex items-center justify-around px-1 shadow-inner">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          {/* Antenna */}
          <div className="w-1 h-2 bg-slate-400 absolute -top-2 rounded-t" />
          <div className="w-2 h-2 rounded-full bg-cyan-400 absolute -top-3 shadow-xs" />
        </div>

        {/* Robot Body with AI Badge */}
        <div className="w-14 h-9 rounded-2xl bg-gradient-to-b from-slate-200 to-slate-100 border-2 border-slate-300 shadow-sm flex items-center justify-center -mt-1">
          <div className="w-6 h-4 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-[7px] flex items-center justify-center shadow-xs">
            AI
          </div>
        </div>
      </motion.div>

      {/* Floating Robot Speech Bubble */}
      <div className="ml-3 p-1.5 rounded-xl bg-white border border-purple-200 shadow-md text-[7px] font-semibold text-purple-700 max-w-[80px]">
        24/7 Smart Agent Ready! 🤖
      </div>
    </div>
  );
}

export function WhatsAppChatbotVisual() {
  return (
    <div className="relative w-full h-[110px] flex items-center justify-center select-none overflow-hidden rounded-xl bg-gradient-to-tr from-teal-50/50 via-emerald-50/30 to-white">
      {/* Chatbot Head */}
      <div className="relative flex flex-col items-center">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 text-white flex items-center justify-center text-xl shadow-lg shadow-teal-500/25 border border-teal-300">
          🤖
        </div>
      </div>

      {/* Phone with WhatsApp Chat Flow */}
      <div className="ml-2 relative w-16 h-24 rounded-2xl p-1 bg-slate-900 shadow-lg border-2 border-slate-700 rotate-2">
        <div className="w-full h-full rounded-xl bg-emerald-50 overflow-hidden flex flex-col p-1 text-[6px]">
          <div className="w-5 h-1 bg-slate-900 rounded-b mx-auto mb-1" />
          <div className="p-1 rounded bg-[#DCF8C6] text-[5.5px] text-slate-800 shadow-xs mb-1">
            How can I help?
          </div>
          <div className="p-1 rounded bg-white text-[5.5px] text-slate-800 shadow-xs">
            1. Track Order<br />2. Book Demo
          </div>
        </div>
      </div>
    </div>
  );
}

export function GmbVisual() {
  return (
    <div className="relative w-full h-[110px] flex items-center justify-center select-none overflow-hidden rounded-xl bg-gradient-to-tr from-blue-50/50 via-sky-50/30 to-white">
      {/* 3D Retail Storefront with Striped Canopy */}
      <div className="relative flex flex-col items-center">
        {/* Striped Canopy Awning */}
        <div className="w-18 h-5 rounded-t-md flex overflow-hidden shadow-sm">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`flex-1 ${i % 2 === 0 ? "bg-blue-600" : "bg-white"}`} />
          ))}
        </div>
        {/* Shop Window & Door */}
        <div className="w-16 h-10 bg-amber-50 rounded-b-md border-x border-b border-slate-300 flex items-center justify-around px-1 shadow-md">
          <div className="w-5 h-6 bg-sky-200 rounded border border-sky-300" />
          <div className="w-4 h-8 bg-blue-700 rounded-t border border-blue-800 mt-auto" />
        </div>
      </div>

      {/* Giant Red Google Map Pin */}
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="ml-2 flex flex-col items-center"
      >
        <span className="text-3xl drop-shadow-md">📍</span>
        <div className="w-5 h-5 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-[9px] font-black text-blue-600 -mt-2">
          G
        </div>
      </motion.div>
    </div>
  );
}

export function GoogleAdsVisual() {
  return (
    <div className="relative w-full h-[110px] flex items-center justify-center select-none overflow-hidden rounded-xl bg-gradient-to-tr from-amber-50/50 via-orange-50/30 to-white">
      {/* Ascending 3D Chart Bars */}
      <div className="flex items-end gap-1.5 h-16 pb-1">
        <div className="w-3.5 h-7 bg-gradient-to-t from-yellow-400 to-amber-300 rounded-t-md shadow-sm" />
        <div className="w-3.5 h-10 bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-md shadow-sm" />
        <div className="w-3.5 h-14 bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-md shadow-sm" />
      </div>

      {/* Google Ads Badge & Document */}
      <div className="ml-3 flex flex-col items-center">
        <div className="w-14 p-1.5 rounded-xl bg-white border border-slate-200 shadow-md flex flex-col items-center">
          <div className="text-xs font-black text-slate-800 flex items-center gap-0.5">
            <span className="text-blue-500">G</span>
            <span className="text-red-500">o</span>
            <span className="text-yellow-500">o</span>
            <span className="text-blue-500">g</span>
            <span className="text-green-500">l</span>
            <span className="text-red-500">e</span>
          </div>
          <div className="text-[7px] font-bold text-amber-600 bg-amber-50 px-1 rounded mt-0.5">
            Ads Live
          </div>
          <div className="text-[6.5px] font-black text-emerald-600 mt-0.5">+320% ROI</div>
        </div>
      </div>
    </div>
  );
}
