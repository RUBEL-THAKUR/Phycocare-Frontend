import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../api";

const COLORS = {
  sage: "#8BAF8E",
  sageLight: "#B8D4BB",
  sageDark: "#4A7A52",
  cream: "#F5F0E8",
  warmWhite: "#FDFAF5",
  deep: "#1A1F2E",
  charcoal: "#3D4454",
  gold: "#C9A96E",
  muted: "#7A8090",
  bg: "#F8F5EF",
};

const TESTS = [
  { slug: "addiction", name: "Addiction Assessment", desc: "Evaluate substance use patterns and addiction risk." },
  { slug: "adhd", name: "ADHD Assessment", desc: "Screen for attention deficit and hyperactivity symptoms." },
  { slug: "adjustment-disorder", name: "Adjustment Disorder", desc: "Assess difficulty coping with life changes." },
  { slug: "anxiety", name: "Anxiety Assessment", desc: "Measure generalized anxiety disorder symptoms." },
  { slug: "bipolar", name: "Bipolar Disorder", desc: "Screen for mood swings and bipolar symptoms." },
  { slug: "depression", name: "Depression Assessment", desc: "Evaluate depressive episode severity." },
  { slug: "ocd", name: "OCD Assessment", desc: "Screen for obsessive-compulsive disorder patterns." },
  { slug: "ptsd", name: "PTSD Assessment", desc: "Assess post-traumatic stress disorder symptoms." },
  { slug: "sleep", name: "Sleep Disorder", desc: "Evaluate sleep quality and insomnia severity." },
  { slug: "stress", name: "Stress Assessment", desc: "Measure perceived stress levels in daily life." },
];

function labelStyle(l) {
  const map = {
    Minimal: { bg: "rgba(74,122,82,0.1)", color: COLORS.sageDark, border: "rgba(74,122,82,0.2)" },
    Mild: { bg: "rgba(201,169,110,0.12)", color: "#8A6020", border: "rgba(201,169,110,0.3)" },
    Moderate: { bg: "rgba(200,100,30,0.1)", color: "#8A4010", border: "rgba(200,100,30,0.25)" },
    Severe: { bg: "rgba(200,50,50,0.1)", color: "#9A2020", border: "rgba(200,50,50,0.25)" },
  };
  return map[l] || map.Minimal;
}

export default function AssessmentsPage() {
  const [tab, setTab] = useState("available");
  const [completed, setCompleted] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    userApi.getCompletedAssessments().then((r) => setCompleted(r.data.data || []));
  }, []);

  const doneSet = new Set(completed.map((a) => a.testSlug));

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "'DM Sans', sans-serif", padding: "48px 40px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        * { box-sizing: border-box; }
        .test-card:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(26,31,46,0.1) !important; border-color: rgba(139,175,142,0.25) !important; }
        .test-card { transition: all 0.35s cubic-bezier(0.25,0.46,0.45,0.94); }
        .begin-btn:hover { background: ${COLORS.sageDark} !important; }
        .begin-btn { transition: background 0.2s ease; }
        .tab-btn:hover { color: ${COLORS.deep} !important; }
        .tab-btn { transition: all 0.25s ease; }
        .completed-row:hover { box-shadow: 0 8px 30px rgba(26,31,46,0.08) !important; }
        .completed-row { transition: box-shadow 0.25s ease; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageDark, fontWeight: 500, marginBottom: 12 }}>Know Yourself</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 700, color: COLORS.deep, lineHeight: 1.1, marginBottom: 8 }}>
          Self <em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Assessment</em>
        </h1>
        <p style={{ fontSize: 15, color: COLORS.muted, fontWeight: 300 }}>Evidence-based mental health assessments designed by clinical psychologists.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 10, marginBottom: 36 }}>
        {[["available", "Available Tests"], ["completed", `Completed (${completed.length})`]].map(([key, label]) => (
          <button
            key={key}
            className="tab-btn"
            onClick={() => setTab(key)}
            style={{ padding: "10px 24px", borderRadius: 100, fontSize: 13, fontWeight: 500, border: `1.5px solid ${tab === key ? COLORS.sageDark : "rgba(26,31,46,0.12)"}`, background: tab === key ? COLORS.deep : "white", color: tab === key ? "white" : COLORS.charcoal, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Available Tests Grid */}
      {tab === "available" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
          {TESTS.map((t) => (
            <div
              key={t.slug}
              className="test-card"
              style={{ background: "white", borderRadius: 22, padding: 26, border: `1px solid rgba(26,31,46,0.07)`, boxShadow: "0 2px 16px rgba(26,31,46,0.04)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: `linear-gradient(135deg, ${COLORS.sageLight}, ${COLORS.sage})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📋</div>
                {doneSet.has(t.slug) && (
                  <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 100, background: "rgba(74,122,82,0.1)", color: COLORS.sageDark, border: `1px solid rgba(74,122,82,0.2)`, fontWeight: 500 }}>✓ Done</span>
                )}
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: COLORS.deep, marginBottom: 8, lineHeight: 1.3 }}>{t.name}</h3>
              <p style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.6, fontWeight: 300, marginBottom: 20, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{t.desc}</p>
              <button
                className="begin-btn"
                onClick={() => navigate(`/user/assessments/${t.slug}`)}
                style={{ display: "flex", width: "100%", padding: "11px", borderRadius: 12, background: COLORS.deep, color: "white", border: "none", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", alignItems: "center", justifyContent: "center", gap: 6 }}
              >
                {doneSet.has(t.slug) ? "Retake →" : "Begin →"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Completed Tab */}
      {tab === "completed" && (
        completed.length === 0 ? (
          <div style={{ background: "white", borderRadius: 24, padding: "80px 40px", textAlign: "center", border: `1px solid rgba(26,31,46,0.07)`, boxShadow: "0 2px 16px rgba(26,31,46,0.04)" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 72, color: "rgba(139,175,142,0.3)", marginBottom: 20, lineHeight: 1 }}>📋</div>
            <p style={{ fontSize: 16, color: COLORS.muted }}>No completed assessments yet</p>
            <p style={{ fontSize: 14, color: COLORS.muted, marginTop: 8, fontWeight: 300 }}>Take your first assessment to understand your mental health better.</p>
            <button
              onClick={() => setTab("available")}
              style={{ marginTop: 24, padding: "12px 28px", borderRadius: 100, background: COLORS.deep, color: "white", border: "none", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
            >
              Explore Tests →
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {completed.map((a) => {
              const ls = labelStyle(a.resultLabel);
              return (
                <div
                  key={a.id}
                  className="completed-row"
                  style={{ background: "white", borderRadius: 20, padding: "22px 28px", border: `1px solid rgba(26,31,46,0.07)`, boxShadow: "0 2px 12px rgba(26,31,46,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${COLORS.sageLight}, ${COLORS.sage})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🏆</div>
                    <div>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: COLORS.deep, marginBottom: 4 }}>{a.testName}</h3>
                      <p style={{ fontSize: 13, color: COLORS.muted, fontWeight: 300 }}>
                        📅 {new Date(a.takenAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    {a.score !== undefined && (
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 44, fontWeight: 600, color: COLORS.deep, lineHeight: 1, marginBottom: 6 }}>{a.score}</div>
                    )}
                    {a.resultLabel && (
                      <span style={{ fontSize: 12, padding: "4px 14px", borderRadius: 100, background: ls.bg, color: ls.color, border: `1px solid ${ls.border}`, fontWeight: 500 }}>
                        {a.resultLabel}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
}