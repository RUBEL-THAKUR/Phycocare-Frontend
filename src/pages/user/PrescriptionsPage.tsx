import { useEffect, useState } from "react";
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

export default function PrescriptionsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userApi
      .getPrescriptions()
      .then((r) => setData(r.data.data?.content || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "'DM Sans', sans-serif", padding: "48px 40px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        * { box-sizing: border-box; }
        .rx-row:hover { background: rgba(139,175,142,0.04) !important; }
        .rx-row { transition: background 0.2s ease; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageDark, fontWeight: 500, marginBottom: 12 }}>Medical Records</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 700, color: COLORS.deep, lineHeight: 1.1, marginBottom: 8 }}>
          Your <em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Prescriptions</em>
        </h1>
        <p style={{ fontSize: 15, color: COLORS.muted, fontWeight: 300 }}>Prescriptions issued by your therapists after sessions.</p>
      </div>

      {loading ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 200 }}>
          <div className="spin" style={{ width: 32, height: 32, border: `2px solid rgba(139,175,142,0.2)`, borderTopColor: COLORS.sage, borderRadius: "50%" }} />
        </div>
      ) : data.length === 0 ? (
        <div style={{ background: "white", borderRadius: 24, padding: "80px 40px", textAlign: "center", border: `1px solid rgba(26,31,46,0.07)`, boxShadow: "0 4px 30px rgba(26,31,46,0.04)" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 72, color: "rgba(139,175,142,0.3)", marginBottom: 20, lineHeight: 1 }}>Rx</div>
          <p style={{ fontSize: 16, color: COLORS.muted, fontWeight: 400 }}>No prescriptions yet</p>
          <p style={{ fontSize: 14, color: COLORS.muted, marginTop: 8, fontWeight: 300 }}>After your therapy sessions, prescriptions will appear here.</p>
        </div>
      ) : (
        <div style={{ background: "white", borderRadius: 24, overflow: "hidden", border: `1px solid rgba(26,31,46,0.07)`, boxShadow: "0 4px 30px rgba(26,31,46,0.05)" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: COLORS.cream, borderBottom: `1px solid rgba(26,31,46,0.08)` }}>
                  {[
                    { label: "Session", icon: "#" },
                    { label: "Therapist", icon: "👤" },
                    { label: "Date", icon: "📅" },
                    { label: "Notes", icon: null },
                    { label: "Follow-up", icon: null },
                  ].map(({ label, icon }) => (
                    <th key={label} style={{ textAlign: "left", padding: "16px 24px", fontSize: 11, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: COLORS.muted }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {icon && <span style={{ fontSize: 12 }}>{icon}</span>}
                        {label}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((p, i) => (
                  <tr key={p.id} className="rx-row" style={{ borderBottom: i < data.length - 1 ? `1px solid rgba(26,31,46,0.06)` : "none" }}>
                    <td style={{ padding: "18px 24px" }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 600, color: COLORS.sageDark }}>
                        #{p.session?.id}
                      </span>
                    </td>
                    <td style={{ padding: "18px 24px" }}>
                      <span style={{ fontSize: 14, fontWeight: 500, color: COLORS.deep }}>
                        {p.therapist?.firstName} {p.therapist?.lastName}
                      </span>
                    </td>
                    <td style={{ padding: "18px 24px", fontSize: 14, color: COLORS.muted }}>
                      {new Date(p.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td style={{ padding: "18px 24px", fontSize: 14, color: COLORS.charcoal, maxWidth: 220 }}>
                      <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {p.notes || <span style={{ color: COLORS.muted }}>—</span>}
                      </span>
                    </td>
                    <td style={{ padding: "18px 24px", fontSize: 14, color: COLORS.muted }}>
                      {p.followUpDate ? (
                        <span style={{ padding: "4px 12px", borderRadius: 100, background: "rgba(139,175,142,0.1)", border: `1px solid rgba(139,175,142,0.2)`, color: COLORS.sageDark, fontSize: 13, fontWeight: 500 }}>
                          {new Date(p.followUpDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}