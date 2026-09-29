import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Car, Wrench, Grid, Search, Star, MapPin, Navigation, Sparkles, CheckCircle2 } from "lucide-react";

export default function ServicesHeroShowcase() {
  return (
    <div className="relative w-full max-w-[620px] mx-auto h-[480px] sm:h-[520px] flex items-center justify-center select-none">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-blue-300/30 via-indigo-200/20 to-teal-200/30 blur-3xl" />
        <div className="absolute -top-6 right-10 w-44 h-44 rounded-full bg-purple-300/20 blur-2xl" />
      </div>

      {/* Curved connecting dotted lines for floating tags */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden sm:block" viewBox="0 0 600 500" fill="none">
        {/* Connector from E-Commerce to left phone */}
        <path d="M 120 70 Q 150 110 180 150" stroke="#F97316" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
        {/* Connector from On-Demand to center phone */}
        <path d="M 110 380 Q 180 370 230 350" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
      </svg>

      {/* Floating Tag 1: E-Commerce (Top-Left) */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-2 left-2 sm:left-4 z-30 flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs sm:text-sm px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-lg shadow-orange-500/30"
      >
        <div className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center">
          <ShoppingCart className="w-3.5 h-3.5 text-white" />
        </div>
        <span>E-Commerce</span>
      </motion.div>

      {/* Floating Tag 2: On-Demand (Bottom-Left) */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute bottom-6 left-2 sm:left-6 z-30 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs sm:text-sm px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-lg shadow-blue-500/30"
      >
        <div className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center">
          <Car className="w-3.5 h-3.5 text-white" />
        </div>
        <span>On-Demand</span>
      </motion.div>

      {/* Floating Tag 3: Services (Top-Right) */}
      <motion.div
        initial={{ opacity: 0, x: 20, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute top-4 right-2 sm:right-4 z-30 flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs sm:text-sm px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-lg shadow-purple-500/30"
      >
        <div className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center">
          <Wrench className="w-3.5 h-3.5 text-white" />
        </div>
        <span>Services</span>
      </motion.div>

      {/* Floating Tag 4: Custom Apps (Bottom-Right) */}
      <motion.div
        initial={{ opacity: 0, x: 20, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute bottom-10 right-2 sm:right-6 z-30 flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs sm:text-sm px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-lg shadow-emerald-500/30"
      >
        <div className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center">
          <Grid className="w-3.5 h-3.5 text-white" />
        </div>
        <span>Custom Apps</span>
      </motion.div>

      {/* 3 PHONES SHOWCASE CONTAINER */}
      <div className="relative w-full max-w-[560px] h-full flex items-center justify-center">
        {/* PHONE 1 (LEFT): E-Commerce */}
        <motion.div
          initial={{ opacity: 0, x: -30, rotate: -12 }}
          animate={{ opacity: 1, x: 0, rotate: -7 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          whileHover={{ y: -6, rotate: -4, transition: { duration: 0.2 } }}
          className="absolute left-[3%] sm:left-[8%] top-1/2 -translate-y-[48%] z-10 w-[185px] sm:w-[210px] h-[375px] sm:h-[420px] rounded-[38px] p-2.5 bg-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.28)] border-4 border-slate-800"
        >
          {/* Inner Phone Screen */}
          <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-white flex flex-col text-[10px]">
            {/* Notch */}
            <div className="w-20 h-4 bg-slate-900 rounded-b-xl mx-auto flex items-center justify-center mb-1 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800 mr-1.5" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500/80" />
            </div>

            {/* App Header */}
            <div className="px-2.5 py-1 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-1 font-black text-slate-800 text-[11px]">
                <span className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[8px] font-bold">A</span>
                <span>Ayotrix</span>
              </div>
              <div className="p-1 rounded-full bg-slate-100 text-slate-600">
                <Search className="w-2.5 h-2.5" />
              </div>
            </div>

            {/* Screen Content */}
            <div className="p-2 space-y-2 flex-1 overflow-hidden">
              {/* Promo Banner */}
              <div className="rounded-xl p-2.5 bg-gradient-to-r from-rose-500 to-orange-400 text-white relative overflow-hidden">
                <div className="text-[8px] font-bold tracking-wider uppercase opacity-90">Special Deal</div>
                <div className="text-xs font-black leading-tight">Trendy Collection</div>
                <div className="text-[8px] opacity-80 mt-0.5">Up to 60% Off</div>
                {/* Decorative circle */}
                <div className="absolute -right-3 -bottom-3 w-14 h-14 rounded-full bg-white/20 blur-xs" />
              </div>

              {/* Categories */}
              <div>
                <div className="text-[9px] font-bold text-slate-700 mb-1">Categories</div>
                <div className="grid grid-cols-4 gap-1 text-center">
                  {[
                    { label: "Fashion", emoji: "👗", bg: "bg-pink-50 text-pink-600" },
                    { label: "Electro", emoji: "📱", bg: "bg-blue-50 text-blue-600" },
                    { label: "Home", emoji: "🛋️", bg: "bg-amber-50 text-amber-600" },
                    { label: "More", emoji: "⚡", bg: "bg-purple-50 text-purple-600" },
                  ].map((cat, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-xl ${cat.bg} flex items-center justify-center text-xs shadow-xs`}>
                        {cat.emoji}
                      </div>
                      <span className="text-[8px] text-slate-600 font-medium mt-0.5">{cat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flash Sale Product Row */}
              <div className="pt-1">
                <div className="flex items-center justify-between text-[9px] font-bold mb-1">
                  <span className="text-slate-800">Flash Sale</span>
                  <span className="text-orange-500 text-[8px]">02:45:10</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="p-1.5 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col">
                    <div className="h-14 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-lg">
                      👟
                    </div>
                    <div className="font-bold text-[9px] text-slate-800 mt-1 truncate">Running Shoes</div>
                    <div className="text-[8px] font-black text-blue-600">₹1,499</div>
                  </div>
                  <div className="p-1.5 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col">
                    <div className="h-14 rounded-lg bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center text-lg">
                      👜
                    </div>
                    <div className="font-bold text-[9px] text-slate-800 mt-1 truncate">Leather Bag</div>
                    <div className="text-[8px] font-black text-blue-600">₹2,199</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom App Nav */}
            <div className="h-8 border-t border-slate-100 px-3 flex items-center justify-around text-slate-400">
              <span className="text-blue-600 font-bold text-[10px]">🏠</span>
              <span>🔍</span>
              <span>🛍️</span>
              <span>👤</span>
            </div>
          </div>
        </motion.div>

        {/* PHONE 2 (CENTER / HERO): Taxi Booking App */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
          className="relative z-20 w-[205px] sm:w-[230px] h-[410px] sm:h-[455px] rounded-[42px] p-2.5 bg-slate-950 shadow-[0_25px_65px_rgba(37,99,235,0.25),0_15px_35px_rgba(0,0,0,0.3)] border-4 border-slate-800"
        >
          {/* Inner Phone Screen */}
          <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-white flex flex-col text-[10px]">
            {/* Notch */}
            <div className="w-24 h-4 bg-slate-950 rounded-b-xl mx-auto flex items-center justify-center mb-1 shrink-0">
              <div className="w-2 h-2 rounded-full bg-slate-800 mr-2" />
              <div className="w-2 h-2 rounded-full bg-blue-600" />
            </div>

            {/* Header */}
            <div className="px-3 py-1 flex items-center justify-between border-b border-slate-100 bg-white">
              <div className="font-black text-slate-900 text-xs">Book a Ride</div>
              <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px]">🔔</div>
            </div>

            {/* Pickup / Dropoff inputs */}
            <div className="p-2.5 bg-slate-50 border-b border-slate-100 space-y-1.5">
              <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-slate-200/80">
                <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                <span className="text-[9px] text-slate-700 font-semibold truncate">Pickup: MG Road Metro</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-slate-200/80">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <span className="text-[9px] text-slate-700 font-semibold truncate">Drop: Tech Park Gate 3</span>
              </div>
            </div>

            {/* Live GPS Map Area */}
            <div className="relative flex-1 bg-sky-50 overflow-hidden">
              {/* Map road grid simulation */}
              <svg className="w-full h-full" viewBox="0 0 200 160" preserveAspectRatio="none">
                {/* Background roads */}
                <path d="M 0 40 Q 90 60 200 30" stroke="#E2E8F0" strokeWidth="12" fill="none" />
                <path d="M 40 0 Q 60 80 80 160" stroke="#E2E8F0" strokeWidth="10" fill="none" />
                <path d="M 160 0 L 140 160" stroke="#E2E8F0" strokeWidth="10" fill="none" />
                <path d="M 0 120 Q 100 90 200 130" stroke="#E2E8F0" strokeWidth="12" fill="none" />
                {/* Active Route Path */}
                <path d="M 40 45 C 70 50, 90 100, 150 115" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 3" fill="none" />
              </svg>

              {/* Start Pin */}
              <div className="absolute top-[28%] left-[16%] flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[7px] font-bold shadow-md">A</div>
              </div>

              {/* Destination Pin */}
              <div className="absolute top-[68%] right-[22%] flex flex-col items-center animate-bounce">
                <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[9px] shadow-lg">📍</div>
              </div>

              {/* Moving Taxi Car on Path */}
              <div className="absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2 bg-amber-400 p-1 rounded-full shadow-md border-2 border-white">
                <Car className="w-3.5 h-3.5 text-slate-900" />
              </div>

              {/* ETA Badge */}
              <div className="absolute bottom-2 left-2 bg-slate-900/90 backdrop-blur-xs text-white px-2 py-0.5 rounded-md text-[8px] font-bold">
                ETA: 8 mins
              </div>
            </div>

            {/* Ride options bottom drawer */}
            <div className="p-2 bg-white border-t border-slate-100">
              <div className="grid grid-cols-3 gap-1 mb-2">
                <div className="p-1 rounded-lg border border-slate-200 text-center bg-slate-50">
                  <div className="text-[8px] font-bold text-slate-700">Mini</div>
                  <div className="text-[9px] font-black text-blue-600">₹89</div>
                </div>
                <div className="p-1 rounded-lg border-2 border-blue-600 text-center bg-blue-50/50 shadow-xs">
                  <div className="text-[8px] font-black text-blue-900">Sedan</div>
                  <div className="text-[9px] font-black text-blue-600">₹129</div>
                </div>
                <div className="p-1 rounded-lg border border-slate-200 text-center bg-slate-50">
                  <div className="text-[8px] font-bold text-slate-700">SUV</div>
                  <div className="text-[9px] font-black text-blue-600">₹179</div>
                </div>
              </div>

              {/* Book Now Button */}
              <div className="w-full py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-center text-[10px] shadow-md shadow-blue-500/30">
                Book Ride Now
              </div>
            </div>
          </div>
        </motion.div>

        {/* PHONE 3 (RIGHT): Home Services App */}
        <motion.div
          initial={{ opacity: 0, x: 30, rotate: 12 }}
          animate={{ opacity: 1, x: 0, rotate: 7 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          whileHover={{ y: -6, rotate: 4, transition: { duration: 0.2 } }}
          className="absolute right-[3%] sm:right-[8%] top-1/2 -translate-y-[48%] z-10 w-[185px] sm:w-[210px] h-[375px] sm:h-[420px] rounded-[38px] p-2.5 bg-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.28)] border-4 border-slate-800"
        >
          {/* Inner Phone Screen */}
          <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-white flex flex-col text-[10px]">
            {/* Notch */}
            <div className="w-20 h-4 bg-slate-900 rounded-b-xl mx-auto flex items-center justify-center mb-1 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800 mr-1.5" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
            </div>

            {/* App Header */}
            <div className="px-2.5 py-1 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-1 font-black text-slate-800 text-[11px]">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[8px] font-bold">A</span>
                <span>Home Services</span>
              </div>
              <div className="text-[10px]">⭐ 4.9</div>
            </div>

            {/* Content */}
            <div className="p-2 space-y-2 flex-1 overflow-hidden">
              <div className="text-[10px] font-black text-slate-900 leading-tight">
                Home Services<br />At Your Doorstep
              </div>

              {/* 6 Category Icons */}
              <div className="grid grid-cols-3 gap-1.5 text-center">
                {[
                  { label: "Cleaning", icon: "🧹", color: "bg-teal-50 text-teal-600" },
                  { label: "Electrician", icon: "💡", color: "bg-amber-50 text-amber-600" },
                  { label: "Plumber", icon: "🔧", color: "bg-blue-50 text-blue-600" },
                  { label: "Beauty", icon: "💄", color: "bg-pink-50 text-pink-600" },
                  { label: "AC Repair", icon: "❄️", color: "bg-sky-50 text-sky-600" },
                  { label: "More", icon: "➕", color: "bg-purple-50 text-purple-600" },
                ].map((s, i) => (
                  <div key={i} className="p-1 rounded-xl border border-slate-100 bg-slate-50 flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-lg ${s.color} flex items-center justify-center text-xs mb-0.5`}>
                      {s.icon}
                    </div>
                    <span className="text-[7.5px] font-semibold text-slate-700 truncate w-full">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Pro Handyman Highlight Card */}
              <div className="p-2 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-between">
                <div>
                  <div className="text-[8px] font-bold uppercase tracking-wider opacity-90">Verified Experts</div>
                  <div className="text-[10px] font-black leading-tight mt-0.5">Book Trusted Plumber</div>
                  <div className="mt-1 inline-block bg-white text-emerald-700 font-bold text-[7.5px] px-2 py-0.5 rounded-full">
                    Instant Arrival
                  </div>
                </div>
                {/* 3D Worker Character emoji */}
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner">
                  👨‍🔧
                </div>
              </div>
            </div>

            {/* Bottom Nav */}
            <div className="h-8 border-t border-slate-100 px-3 flex items-center justify-around text-slate-400">
              <span className="text-emerald-600 font-bold text-[10px]">🏠</span>
              <span>📅</span>
              <span>💬</span>
              <span>👤</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
