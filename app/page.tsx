"use client";
import { useState } from "react";
import LeadActionScreen from "@/components/LeadActionScreen";
import FieldSalesCRMDashboard from "@/components/FieldSalesCRMDashboard";

export default function Home() {
  const [view, setView] = useState("admin");

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col font-sans">
      {/* Premium Dark Toggle Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-white flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <span className="text-white font-bold tracking-tight text-lg">Option B</span>
          </div>

          <div className="flex items-center p-1 bg-white/5 rounded-lg border border-white/10">
            <button
              onClick={() => setView("admin")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                view === "admin"
                  ? "bg-white text-black shadow-lg"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              Admin View
            </button>
            <button
              onClick={() => setView("mobile")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                view === "mobile"
                  ? "bg-white text-black shadow-lg"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              Mobile Agent View
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-[#f7f7f6]">
        {view === "admin" ? (
          <div className="flex-1">
            <FieldSalesCRMDashboard />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center py-10 bg-zinc-100">
            {/* Mobile device frame simulation */}
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-[2.5rem] h-[800px] w-[375px] shadow-2xl overflow-hidden ring-1 ring-black/5 transform">
              <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20"></div>
              <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[11px] top-[72px] rounded-l-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[11px] top-[124px] rounded-l-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[11px] top-[178px] rounded-l-lg"></div>
              <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[11px] top-[142px] rounded-r-lg"></div>
              <div className="h-full w-full bg-white overflow-y-auto overflow-x-hidden relative">
                 <LeadActionScreen />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
