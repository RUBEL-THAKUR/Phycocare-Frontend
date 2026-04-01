import { useEffect, useState } from "react";
import { userApi } from "../../api";
import toast from "react-hot-toast";

const COLORS = {
  sage: "#8BAF8E",
  sageLight: "#B8D4BB",
  sageDark: "#4A7A52",
  cream: "#F5F0E8",
  warmWhite: "#FDFAF5",
  deep: "#1A1F2E",
  deep2: "#252B3B",
  charcoal: "#3D4454",
  gold: "#C9A96E",
  muted: "#7A8090",
  bg: "#F8F5EF",
};

const TABS = ["ALL", "UPCOMING", "COMPLETED", "CANCELLED_BY_USER", "CANCELLED_BY_THERAPIST", "EXPIRED"];
const TAB_LABELS = { ALL: "All", UPCOMING: "Upcoming", COMPLETED: "Completed", CANCELLED_BY_USER: "Cancelled by Me", CANCELLED_BY_THERAPIST: "Cancelled by Therapist", EXPIRED: "Expired" };

const STATUS_CONFIG = {
  UPCOMING: { bg: "rgba(139,175,142,0.12)", color: COLORS.sageDark, border: "rgba(139,175,142,0.3)" },
  COMPLETED: { bg: "rgba(74,122,82,0.1)", color: COLORS.sageDark, border: "rgba(74,122,82,0.25)" },
  CANCELLED_BY_USER: { bg: "rgba(220,60,60,0.08)", color: "#C04040", border: "rgba(220,60,60,0.2)" },
  CANCELLED_BY_THERAPIST: { bg: "rgba(201,169,110,0.12)", color: "#8A6020", border: "rgba(201,169,110,0.3)" },
  EXPIRED: { bg: "rgba(122,128,144,0.1)", color: COLORS.muted, border: "rgba(122,128,144,0.2)" },
  IN_PROGRESS: { bg: "rgba(201,169,110,0.15)", color: "#7A5010", border: "rgba(201,169,110,0.35)" },
};

const MODE_ICONS = { CHAT: "💬", AUDIO: "📞", VIDEO: "🎥" };

export default function OnlineSessions() {
  const [tab, setTab] = useState("ALL");
  const [sessions, setSessions] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);

  useEffect(() => { load(); }, [tab, page]);

  async function load() {
    setLoading(true);
    try {
      const r = await userApi.getSessions(tab === "ALL" ? undefined : tab, page);
      setSessions(r.data.data?.content || []);
      setTotalPages(r.data.data?.totalPages || 0);
    } finally { setLoading(false); }
  }

  async function cancel(id) {
    if (!confirm("Cancel this session? Amount will be refunded.")) return;
    setCancelling(id);
    try {
      await userApi.cancelSession(id, "Cancelled by user");
      toast.success("Session cancelled & refunded");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    } finally { setCancelling(null); }
  }

  function fmt(dt) {
    if (!dt) return "—";
    const d = Array.isArray(dt) ? new Date(dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0) : new Date(dt);
    return d.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  const statusStyle = (s) => STATUS_CONFIG[s] || STATUS_CONFIG.EXPIRED;

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "'DM Sans', sans-serif", padding: "48px 40px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        * { box-sizing: border-box; }
        .tab-btn:hover { color: ${COLORS.deep} !important; border-color: rgba(26,31,46,0.2) !important; }
        .session-card:hover { box-shadow: 0 12px 40px rgba(26,31,46,0.08) !important; transform: translateY(-2px); }
        .session-card { transition: all 0.3s ease; }
        .cancel-btn:hover { background: rgba(200,50,50,0.12) !important; }
        .cancel-btn { transition: all 0.2s ease; }
        .pg-btn:hover:not(:disabled) { background: ${COLORS.cream} !important; }
        .pg-btn { transition: all 0.2s ease; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageDark, fontWeight: 500, marginBottom: 12 }}>Your Journey</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 700, color: COLORS.deep, lineHeight: 1.1, marginBottom: 8 }}>
          Online <em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Sessions</em>
        </h1>
        <p style={{ fontSize: 15, color: COLORS.muted, fontWeight: 300 }}>Manage and review your therapy sessions.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
        {TABS.map((t) => (
          <button
            key={t}
            className="tab-btn"
            onClick={() => { setTab(t); setPage(0); }}
            style={{
              padding: "9px 20px", borderRadius: 100, fontSize: 13, fontWeight: 500,
              border: `1.5px solid ${tab === t ? COLORS.sageDark : "rgba(26,31,46,0.12)"}`,
              background: tab === t ? COLORS.deep : "white",
              color: tab === t ? "white" : COLORS.charcoal,
              cursor: "pointer", transition: "all 0.25s", whiteSpace: "nowrap",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200 }}>
          <div className="spin" style={{ width: 32, height: 32, border: `2px solid rgba(139,175,142,0.2)`, borderTopColor: COLORS.sage, borderRadius: "50%" }} />
        </div>
      ) : sessions.length === 0 ? (
        <div style={{ background: "white", borderRadius: 24, padding: "80px 40px", textAlign: "center", border: `1px solid rgba(26,31,46,0.07)`, boxShadow: "0 4px 30px rgba(26,31,46,0.04)" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 72, color: "rgba(139,175,142,0.3)", marginBottom: 20, lineHeight: 1 }}>📅</div>
          <p style={{ fontSize: 16, color: COLORS.muted }}>No sessions found</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {sessions.map((s) => {
            const ss = statusStyle(s.status);
            return (
              <div key={s.id} className="session-card" style={{ background: "white", borderRadius: 20, padding: "24px 28px", border: `1px solid rgba(26,31,46,0.07)`, boxShadow: "0 2px 16px rgba(26,31,46,0.04)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                    <span style={{ padding: "4px 14px", borderRadius: 100, fontSize: 12, fontWeight: 500, background: ss.bg, color: ss.color, border: `1px solid ${ss.border}` }}>
                      {s.status.replace(/_/g, " ")}
                    </span>
                    <span style={{ padding: "4px 14px", borderRadius: 100, fontSize: 12, color: COLORS.muted, background: COLORS.cream, border: `1px solid rgba(26,31,46,0.08)` }}>
                      {MODE_ICONS[s.mode] || "🎥"} {s.mode}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: COLORS.deep, marginBottom: 8 }}>{s.therapistName}</h3>
                  <div style={{ display: "flex", gap: 20, fontSize: 13, color: COLORS.muted }}>
                    <span>📅 {fmt(s.scheduledAt)}</span>
                    <span>⏱ {s.durationMinutes} min</span>
                  </div>
                  {s.cancellationReason && <p style={{ marginTop: 8, fontSize: 13, color: "#C04040" }}>Reason: {s.cancellationReason}</p>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 600, color: COLORS.deep, lineHeight: 1 }}>₹{s.amountPaid}</div>
                    <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>Amount paid</div>
                  </div>
                  {s.status === "UPCOMING" && (
                    <button
                      className="cancel-btn"
                      onClick={() => cancel(s.id)}
                      disabled={cancelling === s.id}
                      style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 12, color: "#C04040", background: "rgba(200,50,50,0.07)", border: "1.5px solid rgba(200,50,50,0.2)", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {cancelling === s.id
                        ? <div className="spin" style={{ width: 16, height: 16, border: "1.5px solid rgba(200,50,50,0.2)", borderTopColor: "#C04040", borderRadius: "50%" }} />
                        : <><span>✕</span> Cancel</>}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginTop: 32 }}>
          <button className="pg-btn" onClick={() => setPage((p) => p - 1)} disabled={page === 0} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 100, border: `1px solid rgba(26,31,46,0.12)`, background: "white", color: COLORS.charcoal, fontSize: 13, fontWeight: 500, cursor: page === 0 ? "not-allowed" : "pointer", opacity: page === 0 ? 0.4 : 1, fontFamily: "'DM Sans', sans-serif" }}>
            ← Prev
          </button>
          <span style={{ fontSize: 13, color: COLORS.muted }}>Page {page + 1} of {totalPages}</span>
          <button className="pg-btn" onClick={() => setPage((p) => p + 1)} disabled={page >= totalPages - 1} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 100, border: `1px solid rgba(26,31,46,0.12)`, background: "white", color: COLORS.charcoal, fontSize: 13, fontWeight: 500, cursor: page >= totalPages - 1 ? "not-allowed" : "pointer", opacity: page >= totalPages - 1 ? 0.4 : 1, fontFamily: "'DM Sans', sans-serif" }}>
            Next →
          </button>
        </div>
      )}
    </div>
  );
}