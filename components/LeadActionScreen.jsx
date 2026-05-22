import { useState } from "react";

const statusOptions = ["Pending", "In Progress", "Won", "Lost"];

const statusColors = {
  Pending: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-400", border: "border-amber-200" },
  "In Progress": { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500", border: "border-blue-200" },
  Won: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", border: "border-emerald-200" },
  Lost: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500", border: "border-red-200" },
};

const NavIcon = ({ icon, label, active }) => (
  <button
    className={`flex flex-col items-center gap-1 px-5 py-2 transition-all duration-200 ${
      active ? "opacity-100" : "opacity-40"
    }`}
  >
    <span className={`text-xl ${active ? "scale-110" : ""} transition-transform duration-200`}>{icon}</span>
    <span
      className={`text-[10px] font-semibold tracking-widest uppercase ${
        active ? "text-gray-900" : "text-gray-500"
      }`}
      style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em" }}
    >
      {label}
    </span>
    {active && <span className="w-1 h-1 rounded-full bg-gray-900 mt-0.5" />}
  </button>
);

export default function LeadActionScreen() {
  const [status, setStatus] = useState("In Progress");
  const [stock, setStock] = useState(0);
  const [checkedIn, setCheckedIn] = useState(false);
  const [checking, setChecking] = useState(false);
  const [activeNav, setActiveNav] = useState("leads");
  const [saved, setSaved] = useState(false);

  const handleCheckIn = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      setCheckedIn(true);
    }, 1800);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const colors = statusColors[status];

  return (
    <div
      className="min-h-screen bg-white flex flex-col max-w-sm mx-auto relative overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Import fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');

        .haptic-press:active {
          transform: scale(0.975);
          transition: transform 0.1s ease;
        }
        .card-shadow {
          box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05);
        }
        .btn-shadow {
          box-shadow: 0 4px 14px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.15);
        }
        .btn-shadow:active {
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        }
        .select-arrow {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%23111' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        .pulse-ring { animation: pulse-ring 1.5s infinite; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-slow { animation: spin-slow 1s linear infinite; }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fade-up 0.4s ease forwards; }
      `}</style>

      {/* Status bar simulation */}
      <div className="flex justify-between items-center px-6 pt-4 pb-1">
        <span className="text-[12px] font-semibold text-gray-900" style={{ fontFamily: "'DM Mono', monospace" }}>
          9:41
        </span>
        <div className="flex items-center gap-1.5">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <rect x="0" y="6" width="3" height="6" rx="1" fill="#111" opacity="0.4"/>
            <rect x="4.5" y="4" width="3" height="8" rx="1" fill="#111" opacity="0.6"/>
            <rect x="9" y="1.5" width="3" height="10.5" rx="1" fill="#111" opacity="0.8"/>
            <rect x="13.5" y="0" width="2.5" height="12" rx="1" fill="#111"/>
          </svg>
          <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
            <path d="M7.5 2.5C9.5 2.5 11.3 3.3 12.6 4.6L14 3.2C12.3 1.5 9.9 0.5 7.5 0.5C5.1 0.5 2.7 1.5 1 3.2L2.4 4.6C3.7 3.3 5.5 2.5 7.5 2.5Z" fill="#111" opacity="0.4"/>
            <path d="M7.5 5C8.9 5 10.1 5.6 11 6.5L12.4 5.1C11.1 3.8 9.4 3 7.5 3C5.6 3 3.9 3.8 2.6 5.1L4 6.5C4.9 5.6 6.1 5 7.5 5Z" fill="#111" opacity="0.7"/>
            <circle cx="7.5" cy="9" r="2" fill="#111"/>
          </svg>
          <div className="flex items-center gap-0.5">
            <div className="w-5.5 h-3 rounded-[3px] border-[1.5px] border-gray-900 flex items-center px-0.5 gap-0.5">
              <div className="h-1.5 w-3.5 rounded-sm bg-gray-900" />
            </div>
          </div>
        </div>
      </div>

      {/* ── HEADER ── */}
      <header className="flex items-center justify-between px-5 pt-3 pb-4 border-b border-gray-100">
        <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-200 haptic-press transition-colors hover:bg-gray-100">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>

        <div className="text-center">
          <h1 className="text-[15px] font-700 text-gray-900 tracking-tight" style={{ fontWeight: 700 }}>
            Lead Details
          </h1>
          <p className="text-[11px] text-gray-400 font-medium tracking-wide uppercase" style={{ letterSpacing: "0.06em" }}>
            Field Visit
          </p>
        </div>

        <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-200 haptic-press transition-colors hover:bg-gray-100">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
          </svg>
        </button>
      </header>

      {/* ── SCROLLABLE BODY ── */}
      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-6 space-y-4" style={{ paddingBottom: "100px" }}>

        {/* ── CUSTOMER CARD ── */}
        <div className="rounded-2xl border border-gray-150 bg-white card-shadow p-5 fade-up" style={{ borderColor: "#e8e8e8" }}>
          {/* Priority tag */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${colors.bg} ${colors.border}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${colors.dot} ${status === "In Progress" ? "pulse-ring" : ""}`} />
                <span className={`text-[11px] font-600 ${colors.text}`} style={{ fontWeight: 600 }}>
                  {status}
                </span>
              </div>
            </div>
            <span className="text-[11px] text-gray-400 font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>
              #LD-2847
            </span>
          </div>

          {/* Name */}
          <div className="mb-5">
            <p className="text-[11px] font-600 text-gray-400 uppercase tracking-widest mb-1" style={{ fontWeight: 600, letterSpacing: "0.1em" }}>
              Customer
            </p>
            <h2 className="text-[26px] font-700 text-gray-900 leading-tight tracking-tight" style={{ fontWeight: 700 }}>
              Marcus Aldridge
            </h2>
            <p className="text-[13px] text-gray-400 mt-0.5">Senior Procurement Manager</p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 mb-4" />

          {/* Contact Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15.92z"/>
                </svg>
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-medium">Phone</p>
                <p className="text-[15px] font-600 text-gray-900" style={{ fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>
                  +1 (415) 882-3049
                </p>
              </div>
              <button className="ml-auto w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center haptic-press">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15.92z"/>
                </svg>
              </button>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[11px] text-gray-400 font-medium">Address</p>
                <p className="text-[14px] font-500 text-gray-900 leading-snug mt-0.5" style={{ fontWeight: 500 }}>
                  742 Evergreen Terrace,<br />Suite 4B, San Francisco, CA 94103
                </p>
              </div>
              <button className="mt-0.5 w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center haptic-press hover:bg-gray-100">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── CHECK-IN BUTTON ── */}
        <button
          onClick={handleCheckIn}
          disabled={checkedIn || checking}
          className={`
            w-full rounded-2xl py-4.5 flex items-center justify-center gap-3
            haptic-press transition-all duration-300 btn-shadow
            ${checkedIn
              ? "bg-emerald-600 border-0"
              : checking
              ? "bg-gray-800 border-0"
              : "bg-gray-950 border-0 active:scale-[0.975]"
            }
          `}
          style={{ paddingTop: "17px", paddingBottom: "17px" }}
        >
          {checking ? (
            <>
              <svg className="spin-slow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
              </svg>
              <span className="text-[15px] font-700 text-white tracking-tight" style={{ fontWeight: 700 }}>
                Acquiring GPS…
              </span>
            </>
          ) : checkedIn ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span className="text-[15px] font-700 text-white tracking-tight" style={{ fontWeight: 700 }}>
                Checked In — 9:41 AM
              </span>
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span className="text-[15px] font-700 text-white tracking-tight" style={{ fontWeight: 700 }}>
                Check-In Location &amp; Update
              </span>
            </>
          )}
        </button>

        {checkedIn && (
          <div className="fade-up flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <p className="text-[12px] font-600 text-emerald-700" style={{ fontWeight: 600 }}>
              Location verified · 742 Evergreen Terrace · 0.0 mi
            </p>
          </div>
        )}

        {/* ── UPDATE FORM ── */}
        <div className="rounded-2xl border bg-white card-shadow p-5 fade-up" style={{ borderColor: "#e8e8e8" }}>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1 h-5 rounded-full bg-gray-900" />
            <h3 className="text-[13px] font-700 text-gray-900 uppercase tracking-wider" style={{ fontWeight: 700, letterSpacing: "0.08em" }}>
              Update Lead
            </h3>
          </div>

          {/* Status Dropdown */}
          <div className="mb-4">
            <label className="block text-[11px] font-600 text-gray-500 uppercase tracking-widest mb-2" style={{ fontWeight: 600, letterSpacing: "0.1em" }}>
              Lead Status
            </label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="select-arrow w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 pr-10 text-[14px] font-600 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
              >
                {statusOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className={`mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${colors.bg} border ${colors.border}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
              <span className={`text-[11px] font-500 ${colors.text}`}>
                {{
                  Pending: "Awaiting first contact or response",
                  "In Progress": "Active negotiation underway",
                  Won: "Deal closed successfully",
                  Lost: "Opportunity no longer viable",
                }[status]}
              </span>
            </div>
          </div>

          {/* Stock Input */}
          <div>
            <label className="block text-[11px] font-600 text-gray-500 uppercase tracking-widest mb-2" style={{ fontWeight: 600, letterSpacing: "0.1em" }}>
              Inventory Stock Used
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setStock(Math.max(0, stock - 1))}
                className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-xl font-300 text-gray-700 haptic-press hover:bg-gray-100 transition-colors flex-shrink-0"
              >
                −
              </button>
              <div className="relative flex-1">
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 text-center text-[18px] font-700 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700 }}
                  min="0"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-gray-400 font-medium pointer-events-none">
                  units
                </span>
              </div>
              <button
                onClick={() => setStock(stock + 1)}
                className="w-12 h-12 rounded-xl bg-gray-900 border border-gray-900 flex items-center justify-center text-xl font-300 text-white haptic-press hover:bg-gray-800 transition-colors flex-shrink-0"
              >
                +
              </button>
            </div>
            {stock > 0 && (
              <p className="mt-2 text-[12px] text-gray-400 text-center fade-up">
                {stock} unit{stock !== 1 ? "s" : ""} logged against this lead
              </p>
            )}
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className={`mt-5 w-full h-11 rounded-xl flex items-center justify-center gap-2 haptic-press transition-all duration-200 ${
              saved
                ? "bg-emerald-50 border border-emerald-200"
                : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            {saved ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span className="text-[13px] font-600 text-emerald-700" style={{ fontWeight: 600 }}>Saved Successfully</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
                  <polyline points="17 21 17 13 7 13 7 21"/>
                  <polyline points="7 3 7 8 15 8"/>
                </svg>
                <span className="text-[13px] font-600 text-gray-700" style={{ fontWeight: 600 }}>Save Changes</span>
              </>
            )}
          </button>
        </div>

        {/* Visit Notes teaser */}
        <div className="rounded-2xl border bg-gray-50 p-4 flex items-center gap-3" style={{ borderColor: "#e8e8e8" }}>
          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-600 text-gray-700" style={{ fontWeight: 600 }}>Visit Notes</p>
            <p className="text-[11px] text-gray-400">Add observations from this visit</p>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </div>

      </div>

      {/* ── BOTTOM NAV ── */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t flex items-center justify-around pb-safe"
        style={{
          borderColor: "#e8e8e8",
          paddingBottom: "env(safe-area-inset-bottom, 16px)",
          paddingTop: "10px",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.06)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: "rgba(255,255,255,0.96)"
        }}
      >
        <NavIcon
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill={activeNav === "home" ? "#111" : "none"} stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" onClick={() => setActiveNav("home")}>
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          }
          label="Home"
          active={activeNav === "home"}
        />
        <NavIcon
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill={activeNav === "leads" ? "#111" : "none"} stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" onClick={() => setActiveNav("leads")}>
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          }
          label="My Leads"
          active={activeNav === "leads"}
        />
        <NavIcon
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill={activeNav === "profile" ? "#111" : "none"} stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" onClick={() => setActiveNav("profile")}>
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          }
          label="Profile"
          active={activeNav === "profile"}
        />
      </div>
    </div>
  );
}
