import { useEffect, useState } from "react";
import { publicApi, userApi } from "../../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const COLORS = {
  sage: "#8BAF8E",
  sageLight: "#B8D4BB",
  sageDark: "#4A7A52",
  cream: "#F5F0E8",
  warmWhite: "#FDFAF5",
  deep: "#1A1F2E",
  charcoal: "#3D4454",
  gold: "#C9A96E",
  goldLight: "#E8C98A",
  muted: "#7A8090",
  bg: "#F8F5EF",
};

const MODE_CONFIG = {
  CHAT: { label: "Chat", icon: "💬" },
  AUDIO: { label: "Audio Call", icon: "📞" },
  VIDEO: { label: "Video Call", icon: "🎥" },
};

export default function BookSession() {
  const [therapists, setTherapists] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("CHAT");
  const [scheduledAt, setScheduledAt] = useState("");
  const [booking, setBooking] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    publicApi.listTherapists().then((r) => setTherapists(r.data.data || [])).finally(() => setLoading(false));
  }, []);

  const filtered = therapists.filter((t) =>
    !search || `${t.firstName} ${t.lastName} ${t.category || ""} ${(t.specializations || []).join(" ")}`.toLowerCase().includes(search.toLowerCase())
  );

  function fee(t) {
    return mode === "CHAT" ? t.consultationFeeChat : mode === "AUDIO" ? t.consultationFeeAudio : t.consultationFeeVideo;
  }

  async function book() {
    if (!scheduledAt) { toast.error("Please select a date and time"); return; }
    setBooking(true);
    try {
      await userApi.bookSession({ therapistId: selected.id, mode, scheduledAt: scheduledAt + ":00", durationMinutes: 60 });
      toast.success("Session booked successfully!");
      navigate("/user/sessions");
    } catch (err) { toast.error(err.response?.data?.message || "Booking failed"); }
    finally { setBooking(false); }
  }

  if (loading) return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ animation: "spin 1s linear infinite", width: 36, height: 36, border: `2px solid rgba(139,175,142,0.2)`, borderTopColor: COLORS.sage, borderRadius: "50%" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (selected) return (
    <div className="bs-booking-main" style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        * { box-sizing: border-box; }
        .bs-booking-main { padding: 48px 40px; }
        .bs-booking-card { background: white; border-radius: 24px; padding: 36px; border: 1px solid rgba(26,31,46,0.07); box-shadow: 0 4px 30px rgba(26,31,46,0.06); }
        .bs-back-btn { display: flex; align-items: center; gap: 6px; font-size: 13px; color: ${COLORS.sageDark}; border: none; background: none; cursor: pointer; margin-bottom: 32px; font-family: 'DM Sans', sans-serif; font-weight: 500; }
        .bs-therapist-info { display: flex; align-items: center; gap: 16px; margin-bottom: 30px; padding-bottom: 28px; border-bottom: 1px solid rgba(26,31,46,0.08); }
        .bs-avatar { width: 64px; height: 64px; border-radius: 20px; background: linear-gradient(135deg, ${COLORS.sageLight}, ${COLORS.sage}); display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 600; color: white; flex-shrink: 0; }
        .bs-name { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: ${COLORS.deep}; margin-bottom: 4px; }
        .bs-category { font-size: 13px; color: ${COLORS.sageDark}; font-weight: 500; margin-bottom: 6px; }
        .bs-rating { font-size: 13px; color: ${COLORS.muted}; }
        .bs-mode-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .bs-mode-btn { padding: 16px 10px; border-radius: 14px; border: 1.5px solid rgba(26,31,46,0.12); background: white; cursor: pointer; text-align: center; transition: all 0.2s; }
        .bs-mode-btn.selected { border-color: ${COLORS.sageDark}; background: rgba(139,175,142,0.08); }
        .bs-mode-icon { font-size: 22px; margin-bottom: 6px; }
        .bs-mode-label { font-size: 12px; margin-bottom: 4px; }
        .bs-mode-fee { font-size: 12px; }
        .bs-datetime-wrap { position: relative; }
        .bs-datetime-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 16px; }
        .bs-datetime-input { width: 100%; padding: 13px 16px 13px 44px; border-radius: 12px; border: 1.5px solid rgba(26,31,46,0.12); background: ${COLORS.warmWhite}; font-family: 'DM Sans', sans-serif; font-size: 14px; color: ${COLORS.deep}; outline: none; }
        .bs-datetime-input:focus { border-color: ${COLORS.sage}; }
        .bs-summary { background: ${COLORS.cream}; border-radius: 14px; padding: 18px 20px; margin-bottom: 24px; }
        .bs-summary-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; }
        .bs-summary-row:last-child { margin-bottom: 0; }
        .bs-summary-label { color: ${COLORS.muted}; }
        .bs-summary-value { color: ${COLORS.deep}; font-weight: 500; }
        .bs-summary-fee { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; color: ${COLORS.deep}; }
        .bs-book-btn { display: flex; width: 100%; padding: 16px; border-radius: 14px; background: ${COLORS.deep}; color: white; border: none; font-size: 15px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; align-items: center; justify-content: center; gap: 8px; }
        .bs-book-btn:disabled { background: rgba(26,31,46,0.3); cursor: not-allowed; }
        .bs-spinner { width: 18px; height: 18px; border: 1.5px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 767px) {
          .bs-booking-main { padding: 20px 16px; }
          .bs-booking-card { padding: 24px; }
          .bs-back-btn { margin-bottom: 24px; }
          .bs-therapist-info { gap: 12px; margin-bottom: 24px; padding-bottom: 20px; }
          .bs-avatar { width: 56px; height: 56px; font-size: 20px; }
          .bs-name { font-size: 20px; }
          .bs-category { font-size: 12px; }
          .bs-rating { font-size: 12px; }
          .bs-mode-btn { padding: 14px 8px; }
          .bs-mode-icon { font-size: 20px; }
          .bs-mode-label { font-size: 11px; }
          .bs-mode-fee { font-size: 11px; }
          .bs-datetime-input { padding: 12px 14px 12px 40px; font-size: 13px; }
          .bs-datetime-icon { left: 12px; font-size: 14px; }
          .bs-summary { padding: 16px 18px; }
          .bs-summary-row { font-size: 13px; }
          .bs-summary-fee { font-size: 18px; }
          .bs-book-btn { padding: 14px; font-size: 14px; }
        }
      `}</style>

      <button className="bs-back-btn" onClick={() => setSelected(null)}>← Back to therapists</button>

      <div style={{ maxWidth: 520 }}>
        <div className="bs-booking-card">
          {/* Therapist Info */}
          <div className="bs-therapist-info">
            <div className="bs-avatar">
              {selected.firstName[0]}{selected.lastName[0]}
            </div>
            <div>
              <h2 className="bs-name">{selected.firstName} {selected.lastName}</h2>
              <p className="bs-category">{selected.category}</p>
              <div className="bs-rating">⭐ {selected.rating?.toFixed(1)} · {selected.totalSessions} sessions</div>
            </div>
          </div>

          {/* Mode */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", color: COLORS.muted, marginBottom: 12 }}>Session Mode</label>
            <div className="bs-mode-grid">
              {(["CHAT", "AUDIO", "VIDEO"]).map((m) => {
                const f = m === "CHAT" ? selected.consultationFeeChat : m === "AUDIO" ? selected.consultationFeeAudio : selected.consultationFeeVideo;
                return (
                  <button
                    key={m}
                    className={`bs-mode-btn ${mode === m ? 'selected' : ''}`}
                    onClick={() => setMode(m)}
                  >
                    <div className="bs-mode-icon">{MODE_CONFIG[m].icon}</div>
                    <div className="bs-mode-label">{MODE_CONFIG[m].label}</div>
                    <div className="bs-mode-fee">₹{f || "N/A"}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DateTime */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", color: COLORS.muted, marginBottom: 10 }}>Date & Time</label>
            <div className="bs-datetime-wrap">
              <span className="bs-datetime-icon">📅</span>
              <input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} min={new Date().toISOString().slice(0, 16)} className="bs-datetime-input" />
            </div>
          </div>

          {/* Summary */}
          <div className="bs-summary">
            <div className="bs-summary-row">
              <span className="bs-summary-label">Session fee</span>
              <span className="bs-summary-fee">₹{fee(selected) || "N/A"}</span>
            </div>
            <div className="bs-summary-row">
              <span className="bs-summary-label">Duration</span>
              <span className="bs-summary-value">60 minutes</span>
            </div>
          </div>

          <button
            className="bs-book-btn"
            onClick={book}
            disabled={booking || !scheduledAt}
          >
            {booking ? <><div className="bs-spinner" /> Booking...</> : `Confirm & Pay ₹${fee(selected) || ""} →`}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bs-main" style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        * { box-sizing: border-box; }
        .bs-main { padding: 48px 40px; }
        .bs-hero { margin-bottom: 40px; }
        .bs-greeting { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: ${COLORS.sageDark}; font-weight: 500; margin-bottom: 12px; }
        .bs-title { font-family: 'Playfair Display', serif; font-size: 42px; font-weight: 700; color: ${COLORS.deep}; line-height: 1.1; margin-bottom: 8px; }
        .bs-title em { font-style: italic; color: ${COLORS.sageDark}; }
        .bs-subtitle { font-size: 15px; color: ${COLORS.muted}; font-weight: 300; }
        .bs-search-wrap { position: relative; max-width: 480px; margin-bottom: 36px; }
        .bs-search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); font-size: 16px; color: ${COLORS.muted}; }
        .bs-search-input { width: 100%; padding: 13px 16px 13px 46px; border-radius: 14px; border: 1.5px solid rgba(26,31,46,0.12); background: white; font-family: 'DM Sans', sans-serif; font-size: 14px; color: ${COLORS.deep}; outline: none; }
        .bs-search-input:focus { border-color: ${COLORS.sage}; }
        .bs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .bs-card { background: white; border-radius: 24px; overflow: hidden; border: 1px solid rgba(26,31,46,0.07); box-shadow: 0 2px 16px rgba(26,31,46,0.04); cursor: pointer; transition: all 0.35s cubic-bezier(0.25,0.46,0.45,0.94); }
        .bs-card:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(26,31,46,0.1); border-color: rgba(139,175,142,0.2); }
        .bs-card-top { padding: 28px 24px 0; }
        .bs-card-header { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
        .bs-card-avatar { width: 52px; height: 52px; border-radius: 16px; background: linear-gradient(135deg, ${COLORS.sageLight}, ${COLORS.sage}); display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; color: white; flex-shrink: 0; }
        .bs-card-info { flex: 1; min-width: 0; }
        .bs-card-name { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: ${COLORS.deep}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .bs-card-category { font-size: 12px; color: ${COLORS.sageDark}; font-weight: 500; }
        .bs-card-rating { font-size: 12px; color: ${COLORS.muted}; margin-top: 2px; }
        .bs-card-desc { font-size: 13px; color: ${COLORS.muted}; line-height: 1.6; font-weight: 300; margin-bottom: 14px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .bs-card-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px; }
        .bs-card-tag { padding: 3px 10px; border-radius: 100px; background: rgba(139,175,142,0.1); border: 1px solid rgba(139,175,142,0.2); font-size: 11px; color: ${COLORS.sageDark}; font-weight: 500; }
        .bs-card-bottom { padding: 16px 24px 24px; border-top: 1px solid rgba(26,31,46,0.07); display: flex; justify-content: space-between; align-items: center; }
        .bs-card-fee-label { font-size: 11px; color: ${COLORS.muted}; }
        .bs-card-fee { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; color: ${COLORS.deep}; }
        .bs-card-btn { padding: 10px 22px; border-radius: 100px; background: ${COLORS.deep}; color: white; border: none; font-size: 13px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; }
        .bs-empty { background: white; border-radius: 24px; padding: 80px 40px; text-align: center; border: 1px solid rgba(26,31,46,0.07); }
        .bs-empty-icon { font-size: 48px; margin-bottom: 16px; }
        .bs-empty-text { font-size: 15px; color: ${COLORS.muted}; }
        @media (max-width: 767px) {
          .bs-main { padding: 20px 16px; }
          .bs-hero { margin-bottom: 32px; }
          .bs-greeting { font-size: 10px; margin-bottom: 10px; }
          .bs-title { font-size: 32px; }
          .bs-subtitle { font-size: 14px; }
          .bs-search-wrap { max-width: 100%; margin-bottom: 28px; }
          .bs-search-input { padding: 12px 14px 12px 42px; font-size: 13px; }
          .bs-search-icon { left: 14px; font-size: 14px; }
          .bs-grid { grid-template-columns: 1fr; gap: 16px; }
          .bs-card { border-radius: 20px; }
          .bs-card-top { padding: 24px 20px 0; }
          .bs-card-header { gap: 12px; margin-bottom: 14px; }
          .bs-card-avatar { width: 48px; height: 48px; font-size: 18px; }
          .bs-card-name { font-size: 16px; }
          .bs-card-category { font-size: 11px; }
          .bs-card-rating { font-size: 11px; }
          .bs-card-desc { font-size: 12px; margin-bottom: 12px; }
          .bs-card-tags { gap: 4px; margin-bottom: 16px; }
          .bs-card-tag { font-size: 10px; padding: 2px 8px; }
          .bs-card-bottom { padding: 14px 20px 20px; }
          .bs-card-fee-label { font-size: 10px; }
          .bs-card-fee { font-size: 20px; }
          .bs-card-btn { padding: 9px 18px; font-size: 12px; }
          .bs-empty { padding: 60px 20px; }
          .bs-empty-icon { font-size: 40px; margin-bottom: 12px; }
          .bs-empty-text { font-size: 14px; }
        }
      `}</style>

      <div className="bs-hero">
        <div className="bs-greeting">Find Your Match</div>
        <h1 className="bs-title">
          Book a <em>Session</em>
        </h1>
        <p className="bs-subtitle">Choose from our 200+ certified therapists and counselors.</p>
      </div>

      {/* Search */}
      <div className="bs-search-wrap">
        <span className="bs-search-icon">🔍</span>
        <input
          className="bs-search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, specialization..."
        />
      </div>

      {filtered.length === 0 ? (
        <div className="bs-empty">
          <div className="bs-empty-icon">🔍</div>
          <p className="bs-empty-text">No therapists found</p>
        </div>
      ) : (
        <div className="bs-grid">
          {filtered.map((t) => (
            <div key={t.id} className="bs-card" onClick={() => setSelected(t)}>
              <div className="bs-card-top">
                <div className="bs-card-header">
                  <div className="bs-card-avatar">
                    {t.firstName[0]}{t.lastName[0]}
                  </div>
                  <div className="bs-card-info">
                    <h3 className="bs-card-name">{t.firstName} {t.lastName}</h3>
                    <p className="bs-card-category">{t.category}</p>
                    <div className="bs-card-rating">⭐ {t.rating?.toFixed(1)} · {t.totalSessions} sessions</div>
                  </div>
                </div>

                {t.briefDescription && <p className="bs-card-desc">{t.briefDescription}</p>}

                <div className="bs-card-tags">
                  {t.specializations?.slice(0, 3).map((s) => (
                    <span key={s} className="bs-card-tag">{s}</span>
                  ))}
                </div>
              </div>

              <div className="bs-card-bottom">
                <div>
                  <div className="bs-card-fee-label">Chat from</div>
                  <div className="bs-card-fee">₹{t.consultationFeeChat || "N/A"}</div>
                </div>
                <button
                  className="bs-card-btn"
                  onClick={(e) => { e.stopPropagation(); setSelected(t); }}
                >
                  Book →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

