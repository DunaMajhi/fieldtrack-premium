import { useState } from "react";

/* ─── DATA ─────────────────────────────────────────── */
const leads = [
  { id: 1, agent: "Sarah Okonkwo",   agentInitials: "SO", lead: "Meridian Logistics",  status: "Won",         stock: 24, location: "Chicago, IL",    time: "2 min ago"  },
  { id: 2, agent: "James Whitfield", agentInitials: "JW", lead: "Apex Distribution",   status: "In Progress", stock: 11, location: "Austin, TX",      time: "14 min ago" },
  { id: 3, agent: "Priya Nandal",    agentInitials: "PN", lead: "NorthStar Supply Co.", status: "Pending",     stock: 0,  location: "Boston, MA",      time: "31 min ago" },
  { id: 4, agent: "Carlos Reyes",    agentInitials: "CR", lead: "Fulcrum Industries",   status: "Lost",        stock: 7,  location: "Miami, FL",       time: "1 hr ago"   },
  { id: 5, agent: "Elena Marchetti", agentInitials: "EM", lead: "Vantage Procurement",  status: "In Progress", stock: 18, location: "Seattle, WA",     time: "1 hr ago"   },
  { id: 6, agent: "Daniel Osei",     agentInitials: "DO", lead: "Stratos Ventures",     status: "Won",         stock: 32, location: "New York, NY",    time: "2 hrs ago"  },
  { id: 7, agent: "Mia Kowalski",    agentInitials: "MK", lead: "ClearPath Wholesale",  status: "Pending",     stock: 3,  location: "Denver, CO",      time: "3 hrs ago"  },
  { id: 8, agent: "Ravi Subramaniam",agentInitials: "RS", lead: "Ironclad Partners",    status: "In Progress", stock: 9,  location: "Phoenix, AZ",     time: "3 hrs ago"  },
];

const statusMeta = {
  Won:           { bg: "bg-emerald-50",  text: "text-emerald-700",  border: "border-emerald-200", dot: "bg-emerald-500" },
  "In Progress": { bg: "bg-sky-50",      text: "text-sky-700",      border: "border-sky-200",     dot: "bg-sky-500"     },
  Pending:       { bg: "bg-amber-50",    text: "text-amber-700",    border: "border-amber-200",   dot: "bg-amber-400"   },
  Lost:          { bg: "bg-rose-50",     text: "text-rose-700",     border: "border-rose-200",    dot: "bg-rose-500"    },
};

const navItems = [
  {
    id: "command",
    label: "Command Center",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    id: "leads",
    label: "Leads CRM",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    id: "inventory",
    label: "Inventory Master",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
  },
  {
    id: "location",
    label: "Location Logs",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
];

const metrics = [
  {
    label: "Active Leads",
    value: "1,284",
    delta: "+18.4%",
    deltaDir: "up",
    sub: "vs last 30 days",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
    sparkline: [40, 55, 48, 62, 58, 72, 80, 76, 88, 95],
    color: "text-emerald-600",
    sparkColor: "#10b981",
  },
  {
    label: "Total Field Agents",
    value: "47",
    delta: "+3",
    deltaDir: "up",
    sub: "2 on-boarded this week",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    sparkline: [30, 30, 33, 33, 38, 40, 43, 43, 45, 47],
    color: "text-sky-600",
    sparkColor: "#0ea5e9",
  },
  {
    label: "Master Stock Remaining",
    value: "8,740",
    delta: "−6.2%",
    deltaDir: "down",
    sub: "units across all agents",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    sparkline: [95, 92, 90, 88, 85, 82, 79, 76, 72, 68],
    color: "text-amber-600",
    sparkColor: "#f59e0b",
  },
];

/* ─── SPARKLINE SVG ─────────────────────────────────── */
function Sparkline({ data, color }) {
  const w = 88, h = 36, pad = 2;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  });
  const fill = pts.map((p, i) => i === 0 ? `M${p}` : `L${p}`).join(" ");
  const area = `${fill} L${w - pad},${h - pad} L${pad},${h - pad} Z`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <path d={area} fill={color} fillOpacity="0.08" />
      <path d={fill} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle
        cx={pts[pts.length - 1].split(",")[0]}
        cy={pts[pts.length - 1].split(",")[1]}
        r="2.5"
        fill={color}
      />
    </svg>
  );
}

/* ─── MAIN COMPONENT ────────────────────────────────── */
export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("leads");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("All");
  const [hoveredRow, setHoveredRow] = useState(null);

  const toggleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const filtered = leads
    .filter(r => filterStatus === "All" || r.status === filterStatus)
    .sort((a, b) => {
      if (!sortCol) return 0;
      const av = a[sortCol], bv = b[sortCol];
      return sortDir === "asc" ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });

  const SortIcon = ({ col }) => (
    <span className={`ml-1 opacity-40 text-[10px] transition-opacity ${sortCol === col ? "opacity-100" : ""}`}>
      {sortCol === col ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
    </span>
  );

  return (
    <div className="flex h-screen bg-[#f7f7f6] overflow-hidden" style={{ fontFamily: "'Geist', 'IBM Plex Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

        * { font-family: 'IBM Plex Sans', sans-serif; }
        .mono { font-family: 'IBM Plex Mono', monospace; }

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-1 { animation: fadeSlideIn 0.35s ease both; animation-delay: 0.05s; }
        .anim-2 { animation: fadeSlideIn 0.35s ease both; animation-delay: 0.12s; }
        .anim-3 { animation: fadeSlideIn 0.35s ease both; animation-delay: 0.19s; }
        .anim-4 { animation: fadeSlideIn 0.35s ease both; animation-delay: 0.26s; }
        .anim-5 { animation: fadeSlideIn 0.35s ease both; animation-delay: 0.33s; }

        .row-hover:hover { background-color: #f0f0ee; }
        .row-hover { transition: background-color 0.12s ease; }

        .sidebar-tooltip {
          position: absolute; left: 56px; top: 50%;
          transform: translateY(-50%);
          background: #111; color: #fff;
          font-size: 11px; font-weight: 500;
          padding: 4px 10px; border-radius: 4px;
          white-space: nowrap; pointer-events: none;
          opacity: 0; transition: opacity 0.15s ease;
          letter-spacing: 0.02em;
        }
        .nav-item:hover .sidebar-tooltip { opacity: 1; }

        .export-btn:hover { background: #111; }
        .export-btn { transition: background 0.15s ease; }

        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #d4d4d4; border-radius: 99px; }

        .status-badge { letter-spacing: 0.02em; }
        .th-sortable { cursor: pointer; user-select: none; }
        .th-sortable:hover { color: #111; }
      `}</style>

      {/* ── SIDEBAR ── */}
      <aside
        className="flex flex-col bg-white border-r border-[#e5e5e3] z-20 transition-all duration-200"
        style={{ width: sidebarExpanded ? 200 : 56 }}
      >
        {/* Logo */}
        <div className="h-[56px] flex items-center justify-center border-b border-[#e5e5e3] flex-shrink-0 overflow-hidden">
          <button
            onClick={() => setSidebarExpanded(v => !v)}
            className="flex items-center gap-2.5 w-full px-3.5 hover:bg-[#f4f4f2] transition-colors h-full"
          >
            <div className="w-7 h-7 bg-gray-950 rounded-md flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            {sidebarExpanded && (
              <span className="text-[13px] font-700 text-gray-900 tracking-tight whitespace-nowrap" style={{ fontWeight: 700 }}>
                SalesOps
              </span>
            )}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 space-y-0.5 px-1.5 overflow-hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`nav-item relative w-full flex items-center gap-3 h-9 rounded-md transition-all duration-150 px-2.5
                ${activeNav === item.id
                  ? "bg-gray-950 text-white"
                  : "text-gray-500 hover:bg-[#f4f4f2] hover:text-gray-900"
                }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {sidebarExpanded ? (
                <span className="text-[12.5px] font-500 whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontWeight: 500 }}>
                  {item.label}
                </span>
              ) : (
                <span className="sidebar-tooltip">{item.label}</span>
              )}
              {activeNav === item.id && !sidebarExpanded && (
                <span className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1 h-4 rounded-full bg-white opacity-40" />
              )}
            </button>
          ))}
        </nav>

        {/* Bottom user */}
        <div className="border-t border-[#e5e5e3] p-2 flex-shrink-0">
          <button className="w-full flex items-center gap-2.5 px-1.5 py-2 rounded-md hover:bg-[#f4f4f2] transition-colors">
            <div className="w-6 h-6 rounded-full bg-gray-950 flex items-center justify-center flex-shrink-0">
              <span className="text-[9px] font-700 text-white" style={{ fontWeight: 700 }}>A</span>
            </div>
            {sidebarExpanded && (
              <div className="text-left overflow-hidden">
                <p className="text-[12px] font-600 text-gray-900 truncate" style={{ fontWeight: 600 }}>Admin</p>
                <p className="text-[10px] text-gray-400 truncate">ops@salescrm.io</p>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* ── TOP HEADER ── */}
        <header className="h-[56px] bg-white border-b border-[#e5e5e3] flex items-center justify-between px-6 flex-shrink-0 anim-1">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-[15px] font-700 text-gray-900 leading-none" style={{ fontWeight: 700 }}>
                Welcome back, Admin
              </h1>
              <p className="text-[11px] text-gray-400 mt-0.5 mono">
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Live indicator */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-emerald-50 border border-emerald-200">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"/>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"/>
              </span>
              <span className="text-[11px] font-600 text-emerald-700" style={{ fontWeight: 600 }}>Live</span>
            </div>

            {/* Notifications */}
            <button className="w-8 h-8 rounded-md border border-[#e5e5e3] flex items-center justify-center text-gray-500 hover:bg-[#f4f4f2] hover:text-gray-900 transition-colors relative">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
              </svg>
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-rose-500"/>
            </button>

            {/* Export */}
            <button className="export-btn flex items-center gap-2 h-8 px-3.5 rounded-md bg-gray-900 text-white text-[12px] font-600" style={{ fontWeight: 600 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export Report
            </button>
          </div>
        </header>

        {/* ── SCROLLABLE BODY ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* ── METRIC CARDS ── */}
          <div className="grid grid-cols-3 gap-4">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`bg-white border border-[#e5e5e3] rounded-lg p-5 flex flex-col justify-between anim-${i + 2}`}
                style={{ minHeight: 140 }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] font-600 text-gray-400 uppercase tracking-widest mb-2" style={{ fontWeight: 600, letterSpacing: "0.1em" }}>
                      {m.label}
                    </p>
                    <p className="text-[32px] font-700 text-gray-950 leading-none mono" style={{ fontWeight: 700 }}>
                      {m.value}
                    </p>
                  </div>
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center border border-[#e5e5e3] ${m.color} bg-white`}>
                    {m.icon}
                  </div>
                </div>
                <div className="flex items-end justify-between mt-3">
                  <div>
                    <span className={`text-[12px] font-600 mono ${m.deltaDir === "up" ? "text-emerald-600" : "text-rose-600"}`} style={{ fontWeight: 600 }}>
                      {m.delta}
                    </span>
                    <span className="text-[11px] text-gray-400 ml-1.5">{m.sub}</span>
                  </div>
                  <Sparkline data={m.sparkline} color={m.sparkColor} />
                </div>
              </div>
            ))}
          </div>

          {/* ── LEAD UPDATES TABLE ── */}
          <div className="bg-white border border-[#e5e5e3] rounded-lg overflow-hidden anim-5">
            {/* Table Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#e5e5e3]">
              <div>
                <h2 className="text-[13px] font-700 text-gray-900" style={{ fontWeight: 700 }}>Recent Lead Updates</h2>
                <p className="text-[11px] text-gray-400 mt-0.5">{filtered.length} entries · refreshed 2 min ago</p>
              </div>
              <div className="flex items-center gap-2">
                {/* Status filter */}
                <div className="flex items-center gap-1 bg-[#f4f4f2] rounded-md p-0.5">
                  {["All", "Won", "In Progress", "Pending", "Lost"].map(s => (
                    <button
                      key={s}
                      onClick={() => setFilterStatus(s)}
                      className={`px-2.5 py-1 rounded text-[11px] font-600 transition-all duration-150 ${
                        filterStatus === s
                          ? "bg-white text-gray-900 shadow-sm border border-[#e5e5e3]"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      style={{ fontWeight: 600 }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <button className="w-7 h-7 rounded-md border border-[#e5e5e3] flex items-center justify-center text-gray-500 hover:bg-[#f4f4f2] transition-colors">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#f7f7f6] border-b border-[#e5e5e3]">
                    {[
                      { key: "agent", label: "Agent Name" },
                      { key: "lead",  label: "Lead Name"  },
                      { key: "status", label: "Status"    },
                      { key: "stock", label: "Stock Used" },
                      { key: null,    label: "Last Location Update" },
                    ].map((col) => (
                      <th
                        key={col.label}
                        onClick={() => col.key && toggleSort(col.key)}
                        className={`text-left px-5 py-3 text-[11px] font-600 text-gray-500 uppercase tracking-widest whitespace-nowrap ${col.key ? "th-sortable" : ""}`}
                        style={{ fontWeight: 600, letterSpacing: "0.09em" }}
                      >
                        {col.label}
                        {col.key && <SortIcon col={col.key} />}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, idx) => {
                    const s = statusMeta[row.status];
                    return (
                      <tr
                        key={row.id}
                        className="row-hover border-b border-[#f0f0ee] last:border-0"
                        onMouseEnter={() => setHoveredRow(row.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        {/* Agent */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-gray-100 border border-[#e5e5e3] flex items-center justify-center flex-shrink-0">
                              <span className="text-[10px] font-700 text-gray-600 mono" style={{ fontWeight: 700 }}>
                                {row.agentInitials}
                              </span>
                            </div>
                            <span className="text-[13px] font-500 text-gray-900 whitespace-nowrap" style={{ fontWeight: 500 }}>
                              {row.agent}
                            </span>
                          </div>
                        </td>

                        {/* Lead */}
                        <td className="px-5 py-3.5">
                          <span className="text-[13px] font-400 text-gray-700">{row.lead}</span>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-3.5">
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border status-badge ${s.bg} ${s.border}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                            <span className={`text-[11px] font-600 ${s.text}`} style={{ fontWeight: 600 }}>
                              {row.status}
                            </span>
                          </div>
                        </td>

                        {/* Stock */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 max-w-[80px] h-1.5 rounded-full bg-gray-100 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gray-400 transition-all duration-300"
                                style={{ width: `${Math.min(row.stock / 35 * 100, 100)}%` }}
                              />
                            </div>
                            <span className="text-[12px] font-600 text-gray-700 mono whitespace-nowrap" style={{ fontWeight: 600 }}>
                              {row.stock} u
                            </span>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div>
                              <p className="text-[12.5px] font-400 text-gray-700">{row.location}</p>
                              <p className="text-[11px] text-gray-400 mono">{row.time}</p>
                            </div>
                            <a
                              href="#"
                              className="flex items-center gap-1 text-[11px] font-600 text-gray-950 border border-[#e5e5e3] px-2 py-0.5 rounded hover:bg-gray-950 hover:text-white hover:border-gray-950 transition-all duration-150 whitespace-nowrap ml-1"
                              style={{ fontWeight: 600 }}
                              onClick={e => e.preventDefault()}
                            >
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                              </svg>
                              View Map
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-[#e5e5e3] bg-[#f7f7f6]">
              <p className="text-[11px] text-gray-400 mono">
                Showing {filtered.length} of {leads.length} records
              </p>
              <div className="flex items-center gap-1">
                {["←", "1", "2", "3", "→"].map((p, i) => (
                  <button
                    key={i}
                    className={`w-6 h-6 rounded flex items-center justify-center text-[11px] transition-colors ${
                      p === "1"
                        ? "bg-gray-950 text-white font-600"
                        : "text-gray-500 hover:bg-[#eeeeed] font-400"
                    }`}
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── BOTTOM ROW: Activity + Quick Stats ── */}
          <div className="grid grid-cols-3 gap-4 pb-4">
            {/* Agent Activity */}
            <div className="col-span-2 bg-white border border-[#e5e5e3] rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-[13px] font-700 text-gray-900" style={{ fontWeight: 700 }}>Agent Activity</h3>
                  <p className="text-[11px] text-gray-400">Check-ins in the last 8 hours</p>
                </div>
                <span className="text-[11px] mono text-gray-400 bg-[#f4f4f2] px-2 py-1 rounded">Today</span>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Sarah Okonkwo",   pct: 92, count: 11 },
                  { name: "Daniel Osei",      pct: 78, count: 9  },
                  { name: "James Whitfield",  pct: 65, count: 8  },
                  { name: "Elena Marchetti",  pct: 50, count: 6  },
                  { name: "Priya Nandal",     pct: 33, count: 4  },
                ].map((a) => (
                  <div key={a.name} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-[8px] font-700 text-gray-600" style={{ fontWeight: 700 }}>
                        {a.name.split(" ").map(w => w[0]).join("")}
                      </span>
                    </div>
                    <span className="text-[12px] text-gray-700 w-32 flex-shrink-0 truncate">{a.name}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-[#f0f0ee] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gray-900 transition-all duration-700"
                        style={{ width: `${a.pct}%` }}
                      />
                    </div>
                    <span className="text-[11px] mono text-gray-500 w-12 text-right">{a.count} visits</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white border border-[#e5e5e3] rounded-lg p-5 flex flex-col gap-4">
              <div>
                <h3 className="text-[13px] font-700 text-gray-900" style={{ fontWeight: 700 }}>Pipeline Snapshot</h3>
                <p className="text-[11px] text-gray-400">Status breakdown · all agents</p>
              </div>
              {[
                { label: "Won",         count: 312, pct: 24, color: "bg-emerald-500" },
                { label: "In Progress", count: 489, pct: 38, color: "bg-sky-500"     },
                { label: "Pending",     count: 341, pct: 27, color: "bg-amber-400"   },
                { label: "Lost",        count: 142, pct: 11, color: "bg-rose-400"    },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-[11px] font-600 text-gray-500" style={{ fontWeight: 600 }}>{s.label}</span>
                    <span className="text-[12px] font-600 mono text-gray-900" style={{ fontWeight: 600 }}>{s.count}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#f0f0ee] overflow-hidden">
                    <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
              <div className="mt-auto pt-2 border-t border-[#f0f0ee]">
                <div className="flex justify-between">
                  <span className="text-[11px] text-gray-400">Total Leads</span>
                  <span className="text-[12px] font-700 mono text-gray-900" style={{ fontWeight: 700 }}>1,284</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[11px] text-gray-400">Conversion Rate</span>
                  <span className="text-[12px] font-700 mono text-emerald-700" style={{ fontWeight: 700 }}>24.3%</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
