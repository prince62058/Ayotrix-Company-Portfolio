import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Car, Wrench, MapPin, Check, Star } from "lucide-react";

export function EcommerceCardVisual() {
  return (
    <div className="relative w-full h-[180px] sm:h-[200px] flex items-center justify-center select-none overflow-hidden rounded-2xl bg-gradient-to-tr from-purple-50/60 via-indigo-50/40 to-white">
      {/* Background radial highlight */}
      <div className="absolute right-6 bottom-4 w-32 h-32 rounded-full bg-purple-300/20 blur-2xl pointer-events-none" />

      <div className="relative w-full h-full flex items-end justify-center pb-2 gap-2">
        {/* 3D Wire Shopping Cart filled with gifts */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: -2 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Bags inside cart */}
          <div className="relative w-28 h-20">
            {/* Orange shopping bag */}
            <div className="absolute left-1 bottom-1 w-10 h-14 bg-gradient-to-b from-orange-400 to-amber-500 rounded-lg shadow-md -rotate-6 flex flex-col items-center pt-1 border border-orange-300">
              <div className="w-5 h-2 rounded-t-full border-t-2 border-x-2 border-white/80" />
              <div className="w-2 h-2 rounded-full bg-white/40 mt-3" />
            </div>

            {/* Red gift box with bow */}
            <div className="absolute left-8 bottom-1 w-12 h-12 bg-gradient-to-tr from-rose-500 to-red-600 rounded-lg shadow-lg flex items-center justify-center border border-rose-400 z-10">
              <div className="w-full h-2.5 bg-amber-300 absolute" />
              <div className="h-full w-2.5 bg-amber-300 absolute" />
              <span className="text-amber-200 text-xs font-bold z-20">🎁</span>
            </div>

            {/* Cyan package */}
            <div className="absolute right-1 bottom-3 w-9 h-11 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-lg shadow-md rotate-12 flex items-center justify-center border border-cyan-300">
              <span className="text-white text-xs">🛍️</span>
            </div>

            {/* Wire Basket Overlay */}
            <div className="absolute inset-0 rounded-xl border-2 border-slate-400/60 bg-white/10 backdrop-blur-[1px] flex flex-col justify-around p-1 shadow-sm">
              <div className="w-full h-px bg-slate-300" />
              <div className="w-full h-px bg-slate-300" />
            </div>
          </div>

          {/* Cart Base & Wheels */}
          <div className="w-24 h-3 border-b-2 border-l-2 border-slate-400 rounded-bl-md relative flex justify-between px-2">
            <div className="w-3.5 h-3.5 rounded-full bg-slate-700 border-2 border-slate-300 shadow-sm" />
            <div className="w-3.5 h-3.5 rounded-full bg-slate-700 border-2 border-slate-300 shadow-sm" />
          </div>
        </motion.div>

        {/* Angled Smartphone showing product feed */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ duration: 0.2 }}
          className="relative z-20 w-[95px] h-[160px] rounded-[22px] p-1.5 bg-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.25)] border-2 border-slate-700 rotate-[4deg]"
        >
          <div className="w-full h-full rounded-[16px] bg-white overflow-hidden flex flex-col p-1.5 text-[8px]">
            {/* Notch */}
            <div className="w-8 h-2 bg-slate-900 rounded-b-md mx-auto mb-1 shrink-0" />
            {/* App mini header */}
            <div className="flex items-center justify-between pb-1 border-b border-slate-100 font-bold text-slate-800 text-[7px]">
              <span>Store</span>
              <span className="text-purple-600">● Live</span>
            </div>
            {/* Shoes item */}
            <div className="p-1 rounded-lg bg-purple-50/80 border border-purple-100 my-1 flex flex-col items-center">
              <span className="text-lg">👟</span>
              <span className="font-bold text-slate-800 text-[6.5px]">Air Sneaker</span>
              <span className="font-black text-purple-600 text-[7px]">₹2,499</span>
            </div>
            {/* Bag item */}
            <div className="p-1 rounded-lg bg-amber-50/80 border border-amber-100 flex items-center justify-between">
              <span className="text-sm">👜</span>
              <div className="leading-none text-right">
                <div className="font-bold text-[6px] text-slate-700">Tote Bag</div>
                <div className="font-bold text-[6.5px] text-amber-600">₹899</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Big Blue Shopping Bag next to cart */}
        <div className="relative z-10 w-12 h-16 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-xl shadow-lg -rotate-6 flex flex-col items-center pt-2 border border-blue-400">
          <div className="w-6 h-3 rounded-t-full border-t-2 border-x-2 border-white/90" />
          <div className="text-white text-xs font-bold mt-2">🛍️</div>
          <div className="w-4 h-1 rounded-full bg-white/40 mt-1" />
        </div>
      </div>
    </div>
  );
}

export function TaxiCardVisual() {
  return (
    <div className="relative w-full h-[180px] sm:h-[200px] flex items-center justify-center select-none overflow-hidden rounded-2xl bg-gradient-to-tr from-amber-50/60 via-orange-50/40 to-white">
      {/* Background radial glow */}
      <div className="absolute right-6 bottom-4 w-32 h-32 rounded-full bg-amber-300/20 blur-2xl pointer-events-none" />

      <div className="relative w-full h-full flex items-end justify-center pb-2 gap-2">
        {/* Smartphone showing live GPS Navigation */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: -2 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-[95px] h-[160px] rounded-[22px] p-1.5 bg-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.25)] border-2 border-slate-700 -rotate-[4deg]"
        >
          <div className="w-full h-full rounded-[16px] bg-sky-50 overflow-hidden flex flex-col relative text-[8px]">
            {/* Notch */}
            <div className="w-8 h-2 bg-slate-900 rounded-b-md mx-auto mb-1 shrink-0 z-10" />

            {/* GPS Road Map SVG */}
            <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 140" preserveAspectRatio="none">
              <path d="M 10 20 Q 50 40 90 20" stroke="#CBD5E1" strokeWidth="8" fill="none" />
              <path d="M 30 0 Q 40 70 50 140" stroke="#CBD5E1" strokeWidth="8" fill="none" />
              <path d="M 80 0 L 70 140" stroke="#CBD5E1" strokeWidth="6" fill="none" />
              {/* Route */}
              <path d="M 30 30 C 45 40, 50 80, 75 100" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 2" fill="none" />
            </svg>

            {/* Red destination pin */}
            <div className="absolute top-[65%] right-[20%] flex flex-col items-center">
              <span className="text-xs">📍</span>
            </div>

            {/* Little moving car icon */}
            <div className="absolute top-[40%] left-[38%] p-0.5 rounded-full bg-amber-400 border border-white shadow-xs">
              <Car className="w-2.5 h-2.5 text-slate-900" />
            </div>

            {/* Bottom mini status */}
            <div className="absolute bottom-1 inset-x-1 p-1 rounded-md bg-white/95 backdrop-blur-xs text-[6.5px] font-bold text-slate-800 shadow-xs flex items-center justify-between">
              <span>Arriving</span>
              <span className="text-amber-600 font-black">3 min</span>
            </div>
          </div>
        </motion.div>

        {/* 3D Yellow Taxi Car */}
        <motion.div
          whileHover={{ scale: 1.05, y: -4 }}
          transition={{ duration: 0.2 }}
          className="relative z-20 flex flex-col items-center"
        >
          {/* 3D Taxi Body */}
          <div className="relative w-36 h-20 flex flex-col items-center justify-end">
            {/* TAXI Roof Sign */}
            <div className="w-10 h-3.5 bg-slate-900 border border-amber-400 rounded-t-md flex items-center justify-center shadow-md">
              <span className="text-[7px] font-black text-amber-400 tracking-wider">TAXI</span>
            </div>

            {/* Cabin / Windshield */}
            <div className="w-24 h-8 bg-sky-200/90 rounded-t-xl border-2 border-amber-500 relative overflow-hidden flex items-center justify-center shadow-inner">
              <div className="w-1.5 h-full bg-amber-400" />
              <div className="absolute -left-2 top-0 w-8 h-8 rounded-full bg-white/40 blur-xs" />
            </div>

            {/* Main Car Body */}
            <div className="w-36 h-9 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-2xl shadow-lg border border-amber-300 relative flex items-center justify-between px-2">
              {/* Checkered Taxi Stripe */}
              <div className="absolute inset-x-2 top-1 h-2 flex overflow-hidden opacity-75">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className={`w-2.5 h-full ${i % 2 === 0 ? "bg-slate-900" : "bg-white"}`} />
                ))}
              </div>

              {/* Headlights */}
              <div className="w-2.5 h-3 bg-amber-100 rounded-l-md border border-amber-300 shadow-sm mt-2" />
              <div className="w-2.5 h-3 bg-rose-500 rounded-r-md border border-rose-600 shadow-sm mt-2" />
            </div>

            {/* 3D Wheels */}
            <div className="w-32 flex justify-between -mt-2 z-10 px-2">
              <div className="w-5 h-5 rounded-full bg-slate-900 border-2 border-slate-400 flex items-center justify-center shadow-md">
                <div className="w-2 h-2 rounded-full bg-slate-200" />
              </div>
              <div className="w-5 h-5 rounded-full bg-slate-900 border-2 border-slate-400 flex items-center justify-center shadow-md">
                <div className="w-2 h-2 rounded-full bg-slate-200" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Miniature taxi car in background */}
        <div className="relative z-0 w-16 h-10 opacity-70 scale-75 -mb-2">
          <div className="w-12 h-5 bg-amber-400 rounded-t-lg mx-auto" />
          <div className="w-16 h-5 bg-amber-400 rounded-md shadow-sm" />
        </div>
      </div>
    </div>
  );
}

export function MarketplaceCardVisual() {
  return (
    <div className="relative w-full h-[180px] sm:h-[200px] flex items-center justify-center select-none overflow-hidden rounded-2xl bg-gradient-to-tr from-emerald-50/60 via-teal-50/40 to-white">
      {/* Background radial glow */}
      <div className="absolute right-6 bottom-4 w-32 h-32 rounded-full bg-emerald-300/20 blur-2xl pointer-events-none" />

      <div className="relative w-full h-full flex items-end justify-center pb-2 gap-3">
        {/* Friendly 3D Handyman / Technician Character */}
        <motion.div
          whileHover={{ scale: 1.05, y: -4 }}
          transition={{ duration: 0.2 }}
          className="relative z-20 flex flex-col items-center"
        >
          {/* Character Head & Cap */}
          <div className="relative flex flex-col items-center">
            {/* Blue work cap */}
            <div className="w-10 h-4 bg-blue-600 rounded-t-full border border-blue-500 shadow-sm relative">
              <div className="w-8 h-1.5 bg-blue-700 rounded-full absolute -bottom-0.5 -right-1" />
            </div>
            {/* Face */}
            <div className="w-9 h-9 bg-amber-100 rounded-full border border-amber-200 flex flex-col items-center justify-center shadow-sm relative -mt-1">
              {/* Eyes & friendly smile */}
              <div className="flex gap-2 mb-0.5">
                <div className="w-1 h-1 rounded-full bg-slate-800" />
                <div className="w-1 h-1 rounded-full bg-slate-800" />
              </div>
              <div className="w-3 h-1.5 border-b-2 border-slate-700 rounded-full" />
              {/* Ears */}
              <div className="w-1.5 h-2 rounded-l-full bg-amber-200 absolute -left-1" />
              <div className="w-1.5 h-2 rounded-r-full bg-amber-200 absolute -right-1" />
            </div>
          </div>

          {/* Blue Overalls Body */}
          <div className="w-14 h-14 bg-gradient-to-b from-blue-600 to-indigo-700 rounded-2xl shadow-lg border border-blue-500 relative flex flex-col items-center pt-1 -mt-1">
            {/* Overall Straps & Buttons */}
            <div className="w-10 flex justify-between px-1">
              <div className="w-1 h-1 rounded-full bg-amber-300" />
              <div className="w-1 h-1 rounded-full bg-amber-300" />
            </div>
            {/* Chest Pocket with tool */}
            <div className="w-6 h-4 bg-blue-800 rounded-b-md border-t border-blue-500 mt-1 flex items-center justify-center">
              <span className="text-[7px]">⚡</span>
            </div>
          </div>

          {/* Big Silver Wrench held in hand */}
          <motion.div
            animate={{ rotate: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="absolute -left-3 bottom-4 text-2xl drop-shadow-md z-30"
          >
            🔧
          </motion.div>
        </motion.div>

        {/* Smartphone showing Home Services app */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-[95px] h-[160px] rounded-[22px] p-1.5 bg-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.25)] border-2 border-slate-700 rotate-[4deg]"
        >
          <div className="w-full h-full rounded-[16px] bg-white overflow-hidden flex flex-col p-1.5 text-[8px]">
            {/* Notch */}
            <div className="w-8 h-2 bg-slate-900 rounded-b-md mx-auto mb-1 shrink-0" />
            {/* Title */}
            <div className="font-black text-slate-800 text-[7px] leading-tight mb-1">
              Home Services
            </div>
            {/* Mini service grid */}
            <div className="grid grid-cols-2 gap-1 mb-1">
              <div className="p-1 rounded-md bg-teal-50 border border-teal-100 flex flex-col items-center">
                <span>🧹</span>
                <span className="text-[5.5px] font-bold text-slate-700">Cleaning</span>
              </div>
              <div className="p-1 rounded-md bg-amber-50 border border-amber-100 flex flex-col items-center">
                <span>💡</span>
                <span className="text-[5.5px] font-bold text-slate-700">Electric</span>
              </div>
            </div>
            {/* Top Verified badge */}
            <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-200 mt-auto">
              <div className="flex items-center gap-0.5 text-emerald-700 font-bold text-[6px]">
                <Check className="w-2 h-2 text-emerald-600" />
                <span>Verified Pro</span>
              </div>
              <div className="text-[5.5px] text-slate-500">100% Guaranteed</div>
            </div>
          </div>
        </motion.div>

        {/* Blue Toolbox on right */}
        <div className="relative z-10 w-12 h-10 bg-gradient-to-b from-blue-700 to-indigo-800 rounded-lg shadow-md border border-blue-500 flex flex-col items-center pt-1">
          <div className="w-5 h-1.5 rounded-t-md border-t-2 border-x-2 border-slate-300" />
          <div className="w-full h-1 bg-amber-400 mt-1" />
          <span className="text-[8px] text-white mt-0.5">🧰</span>
        </div>
      </div>
    </div>
  );
}
