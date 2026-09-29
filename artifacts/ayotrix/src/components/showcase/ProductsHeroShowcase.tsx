import React from "react";
import { motion } from "framer-motion";
import { Send, MessageSquare, Shield, CheckCheck, TrendingUp, BarChart3, Bot, Smartphone } from "lucide-react";

export default function ProductsHeroShowcase() {
  return (
    <div className="relative w-full max-w-[640px] mx-auto h-[480px] sm:h-[520px] flex items-center justify-center select-none">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-blue-300/30 via-indigo-200/25 to-emerald-200/25 blur-3xl" />
        <div className="absolute top-8 right-6 w-40 h-40 rounded-full bg-purple-300/20 blur-2xl" />
      </div>

      {/* Floating 3D Element 1: WhatsApp 3D Green Icon (Top-Center) */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
        className="absolute top-4 left-[48%] -translate-x-1/2 z-30 w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 text-white flex items-center justify-center shadow-lg shadow-green-500/30 border border-green-300"
      >
        <span className="text-xl">💬</span>
      </motion.div>

      {/* Floating 3D Element 2: Orange Bar Chart (Top-Left) */}
      <motion.div
        animate={{ y: [4, -4, 4] }}
        transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut" }}
        className="absolute top-14 left-6 z-30 w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 border border-amber-300"
      >
        <BarChart3 className="w-5 h-5 text-white" />
      </motion.div>

      {/* Floating 3D Element 3: Purple AI Pill Badge (Mid-Left) */}
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
        className="absolute bottom-28 left-4 z-30 px-3 py-1.5 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white font-black text-xs shadow-lg shadow-purple-500/30 border border-purple-400 flex items-center gap-1.5"
      >
        <span>AI</span>
      </motion.div>

      {/* Floating 3D Element 4: Blue Telegram Paper Plane (Top-Right) */}
      <motion.div
        animate={{ y: [3, -5, 3] }}
        transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut" }}
        className="absolute top-10 right-8 z-30 w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-sky-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 border border-sky-300"
      >
        <Send className="w-5 h-5 text-white -rotate-12" />
      </motion.div>

      {/* Floating 3D Element 5: Blue Chat Bubble (Mid-Right) */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ repeat: Infinity, duration: 3.1, ease: "easeInOut" }}
        className="absolute top-36 right-4 z-30 w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 border border-blue-400"
      >
        <MessageSquare className="w-4 h-4 text-white" />
      </motion.div>

      {/* Floating 3D Element 6: Cute Succulent Potted Plant (Bottom-Right) */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="absolute bottom-12 right-6 z-30 flex flex-col items-center"
      >
        <div className="text-3xl filter drop-shadow-md">🪴</div>
      </motion.div>

      {/* MAIN SHOWCASE: LAPTOP DISPLAY */}
      <div className="relative w-full max-w-[540px] flex items-center justify-center">
        {/* Laptop Frame */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 w-[420px] sm:w-[480px] bg-slate-900 rounded-t-[22px] p-2.5 pb-0 shadow-[0_25px_60px_rgba(15,23,42,0.35)] border-t border-x border-slate-700"
        >
          {/* Top Webcam Notch */}
          <div className="w-full flex items-center justify-center pb-1.5">
            <div className="w-2 h-2 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
              <div className="w-0.5 h-0.5 rounded-full bg-blue-500" />
            </div>
          </div>

          {/* Screen Content */}
          <div className="w-full h-[250px] sm:h-[280px] rounded-t-xl overflow-hidden bg-slate-50 flex text-[9px]">
            {/* Dark Sidebar */}
            <div className="w-24 bg-slate-950 text-slate-400 p-2 flex flex-col justify-between shrink-0">
              <div>
                {/* Brand */}
                <div className="flex items-center gap-1.5 text-white font-black text-[10px] mb-3 pb-1 border-b border-slate-800">
                  <div className="w-3.5 h-3.5 rounded-full bg-blue-600 flex items-center justify-center text-[7px]">A</div>
                  <span>Ayotrix</span>
                </div>
                {/* Nav Menu */}
                <div className="space-y-1">
                  <div className="px-1.5 py-1 rounded bg-blue-600/20 text-blue-400 font-bold flex items-center gap-1">
                    <span>📊</span> <span>Dashboard</span>
                  </div>
                  <div className="px-1.5 py-1 rounded hover:bg-slate-900 flex items-center gap-1">
                    <span>📢</span> <span>Campaigns</span>
                  </div>
                  <div className="px-1.5 py-1 rounded hover:bg-slate-900 flex items-center gap-1">
                    <span>👥</span> <span>Contacts</span>
                  </div>
                  <div className="px-1.5 py-1 rounded hover:bg-slate-900 flex items-center gap-1">
                    <span>⚡</span> <span>Automation</span>
                  </div>
                  <div className="px-1.5 py-1 rounded hover:bg-slate-900 flex items-center gap-1">
                    <span>📈</span> <span>Analytics</span>
                  </div>
                  <div className="px-1.5 py-1 rounded hover:bg-slate-900 flex items-center gap-1">
                    <span>⚙️</span> <span>Settings</span>
                  </div>
                </div>
              </div>
              <div className="text-[7.5px] text-slate-500">v2.4 Active</div>
            </div>

            {/* Dashboard Main Area */}
            <div className="flex-1 p-2.5 overflow-hidden flex flex-col bg-white">
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <div className="font-black text-slate-900 text-[11px]">Communication Overview</div>
                <div className="flex items-center gap-1.5">
                  <div className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[8px]">Search...</div>
                  <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[8px] font-bold">P</div>
                </div>
              </div>

              {/* 4 Stats Cards Row */}
              <div className="grid grid-cols-4 gap-1.5 mb-2">
                <div className="p-1.5 rounded-lg border border-slate-100 bg-slate-50/60">
                  <div className="text-[7px] text-slate-500">Total Messages</div>
                  <div className="text-[10px] font-black text-slate-900">1,24,500</div>
                </div>
                <div className="p-1.5 rounded-lg border border-slate-100 bg-slate-50/60">
                  <div className="text-[7px] text-slate-500">Delivery Rate</div>
                  <div className="text-[10px] font-black text-emerald-600">98.2%</div>
                </div>
                <div className="p-1.5 rounded-lg border border-slate-100 bg-slate-50/60">
                  <div className="text-[7px] text-slate-500">Active Campaigns</div>
                  <div className="text-[10px] font-black text-blue-600">24</div>
                </div>
                <div className="p-1.5 rounded-lg border border-slate-100 bg-slate-50/60">
                  <div className="text-[7px] text-slate-500">Total Contacts</div>
                  <div className="text-[10px] font-black text-slate-900">86,420</div>
                </div>
              </div>

              {/* Analytics Graph & Campaigns row */}
              <div className="grid grid-cols-5 gap-2 flex-1 overflow-hidden">
                {/* Bar Chart (3 cols) */}
                <div className="col-span-3 p-2 rounded-xl border border-slate-100 bg-slate-50/40 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[8px] text-slate-800">Message Volume</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[7px] font-bold">+42% Growth</span>
                  </div>
                  {/* Vertical bar chart bars */}
                  <div className="h-20 flex items-end justify-between px-2 pt-2 gap-1.5">
                    {[35, 48, 60, 42, 75, 88, 95].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t-sm bg-gradient-to-t from-blue-600 to-indigo-500"
                          style={{ height: `${height}%` }}
                        />
                        <span className="text-[6.5px] text-slate-400">
                          {["M", "T", "W", "T", "F", "S", "S"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Campaigns (2 cols) */}
                <div className="col-span-2 p-2 rounded-xl border border-slate-100 bg-slate-50/40 space-y-1.5">
                  <span className="font-bold text-[8px] text-slate-800 block">Recent Campaigns</span>
                  <div className="p-1 rounded bg-white border border-slate-100 flex items-center justify-between">
                    <span className="text-[7px] font-semibold text-slate-700 truncate">Promo Offer</span>
                    <span className="text-[6.5px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">Delivered</span>
                  </div>
                  <div className="p-1 rounded bg-white border border-slate-100 flex items-center justify-between">
                    <span className="text-[7px] font-semibold text-slate-700 truncate">Service Update</span>
                    <span className="text-[6.5px] font-bold text-blue-600 bg-blue-50 px-1 rounded">Ongoing</span>
                  </div>
                  <div className="p-1 rounded bg-white border border-slate-100 flex items-center justify-between">
                    <span className="text-[7px] font-semibold text-slate-700 truncate">Pay Reminder</span>
                    <span className="text-[6.5px] font-bold text-amber-600 bg-amber-50 px-1 rounded">Scheduled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Laptop Base Stand */}
        <div className="absolute -bottom-3 inset-x-0 mx-auto w-[480px] sm:w-[540px] h-3.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 rounded-b-xl shadow-xl flex items-center justify-center">
          <div className="w-16 h-1 bg-slate-600 rounded-full" />
        </div>

        {/* SMARTPHONE IN FRONT OF LAPTOP: WhatsApp Campaign Screen */}
        <motion.div
          initial={{ opacity: 0, y: 25, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          whileHover={{ y: -6, rotate: 0, transition: { duration: 0.2 } }}
          className="absolute -bottom-1 -left-2 sm:left-4 z-20 w-[125px] sm:w-[145px] h-[240px] sm:h-[270px] rounded-[30px] p-2 bg-slate-950 shadow-[0_20px_45px_rgba(0,0,0,0.35)] border-3 border-slate-800"
        >
          {/* Inner Phone Screen */}
          <div className="w-full h-full rounded-[22px] overflow-hidden bg-slate-100 flex flex-col text-[8px]">
            {/* Notch */}
            <div className="w-12 h-2.5 bg-slate-950 rounded-b-md mx-auto mb-1 shrink-0" />

            {/* WhatsApp Header */}
            <div className="px-2 py-1.5 bg-[#075E54] text-white flex items-center justify-between">
              <div className="flex items-center gap-1 font-bold text-[8.5px]">
                <span>💬</span>
                <span>WhatsApp API</span>
              </div>
              <span className="text-[7px] opacity-80">Online</span>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-1.5 space-y-1.5 bg-[#ECE5DD] overflow-hidden flex flex-col justify-end">
              {/* Incoming Bubble */}
              <div className="p-1.5 rounded-lg bg-white shadow-xs max-w-[85%] self-start text-[7px] text-slate-800">
                Hi! Need details about the bulk WhatsApp API.
              </div>

              {/* Outgoing Bubble */}
              <div className="p-1.5 rounded-lg bg-[#DCF8C6] shadow-xs max-w-[90%] self-end text-[7px] text-slate-800">
                <div className="font-bold text-[#075E54]">Ayotrix Communication</div>
                <div>Instant activation with verified green tick! 🚀</div>
                <div className="flex items-center justify-end gap-0.5 text-[5.5px] text-slate-500 mt-0.5">
                  <span>10:45 AM</span>
                  <CheckCheck className="w-2 h-2 text-blue-500" />
                </div>
              </div>
            </div>

            {/* Send Campaign Button */}
            <div className="p-1.5 bg-white border-t border-slate-200">
              <div className="w-full py-1 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-center text-[7.5px] shadow-sm">
                Send Campaign
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
