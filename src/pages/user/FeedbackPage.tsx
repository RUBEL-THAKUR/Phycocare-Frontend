import { useState } from "react";
import { userApi } from "../../api";
import toast from "react-hot-toast";

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

const SOURCES = ["Google", "Friend/Family", "Social Media", "App Store", "Doctor Referral", "Other"];

function StarRow({ val, onChange, label }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0", borderBottom: `1px solid rgba(26,31,46,0.07)` }}>
      <span style={{ fontSize: 14, fontWeight: 400, color: COLORS.charcoal }}>{label}</span>
      <div style={{ display: "flex", gap: 4 }}>
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s)}
            onMouseEnter={() => setHovered(s)}
            onMouseLeave={() => setHovered(0)}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 26, lineHeight: 1, color: s <= (hovered || val) ? COLORS.gold : "rgba(26,31,46,0.15)", transition: "color 0.15s, transform 0.1s", transform: s <= hovered ? "scale(1.15)" : "scale(1)" }}
          >★</button>
        ))}
      </div>
    </div>
  );
}

export default function FeedbackPage() {
  const [r, setR] = useState({ quality: 0, helpfulness: 0, clarity: 0 });
  const [source, setSource] = useState([]);
  const [comment, setComment] = useState("");
  const [anon, setAnon] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function toggleSource(s) {
    setSource((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
  }

  async function submit(e) {
    e.preventDefault();
    if (!r.quality || !r.helpfulness || !r.clarity) { toast.error("Please rate all three categories"); return; }
    setSubmitting(true);
    try {
      await userApi.submitFeedback({ qualityRating: r.quality, helpfulnessRating: r.helpfulness, clarityRating: r.clarity, source: source.join(", "), comment, isAnonymous: anon });
      toast.success("Thank you for your feedback!");
      setDone(true);
    } catch { toast.error("Failed to submit"); }
    finally { setSubmitting(false); }
  }

  if (done) return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "'DM Sans', sans-serif", padding: "48px 40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');`}</style>
      <div style={{ textAlign: "center", maxWidth: 420 }}>
        <div style={{ width: 88, height: 88, borderRadius: "50%", background: "linear-gradient(135deg, #B8D4BB, #8BAF8E)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, margin: "0 auto 28px" }}>✓</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: COLORS.deep, marginBottom: 14 }}>Feedback Received</h2>
        <p style={{ fontSize: 16, color: COLORS.muted, fontWeight: 300, lineHeight: 1.7 }}>Thank you for helping us improve PsychoCare. Your voice matters to us.</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "'DM Sans', sans-serif", padding: "48px 40px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        * { box-sizing: border-box; }
        .source-tag:hover { border-color: ${COLORS.sage} !important; background: rgba(139,175,142,0.08) !important; }
        .source-tag { transition: all 0.2s ease; }
        .submit-btn:hover { background: ${COLORS.sageDark} !important; transform: translateY(-2px); box-shadow: 0 12px 30px rgba(74,122,82,0.2) !important; }
        .submit-btn { transition: all 0.3s ease; }
        .textarea-styled:focus { outline: none; border-color: ${COLORS.sage} !important; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div style={{ maxWidth: 560 }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageDark, fontWeight: 500, marginBottom: 12 }}>Your Voice</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 700, color: COLORS.deep, lineHeight: 1.1, marginBottom: 8 }}>
            Give <em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Feedback</em>
          </h1>
          <p style={{ fontSize: 15, color: COLORS.muted, fontWeight: 300 }}>Help us make PsychoCare better for everyone.</p>
        </div>

        <form onSubmit={submit}>
          {/* Rating */}
          <div style={{ background: "white", borderRadius: 24, padding: 32, border: `1px solid rgba(26,31,46,0.07)`, boxShadow: "0 2px 16px rgba(26,31,46,0.04)", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>★</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: COLORS.deep }}>Rate Your Experience</h2>
            </div>
            <StarRow label="Quality of Sessions" val={r.quality} onChange={(v) => setR((p) => ({ ...p, quality: v }))} />
            <StarRow label="Helpfulness" val={r.helpfulness} onChange={(v) => setR((p) => ({ ...p, helpfulness: v }))} />
            <div style={{ borderBottom: "none" }}>
              <StarRow label="Clarity of Communication" val={r.clarity} onChange={(v) => setR((p) => ({ ...p, clarity: v }))} />
            </div>
          </div>

          {/* Source */}
          <div style={{ background: "white", borderRadius: 24, padding: 32, border: `1px solid rgba(26,31,46,0.07)`, boxShadow: "0 2px 16px rgba(26,31,46,0.04)", marginBottom: 20 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: COLORS.deep, marginBottom: 18 }}>How did you hear about us?</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {SOURCES.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="source-tag"
                  onClick={() => toggleSource(s)}
                  style={{ padding: "9px 20px", borderRadius: 100, fontSize: 13, fontWeight: 500, cursor: "pointer", border: `1.5px solid ${source.includes(s) ? COLORS.sageDark : "rgba(26,31,46,0.12)"}`, background: source.includes(s) ? "rgba(139,175,142,0.1)" : "transparent", color: source.includes(s) ? COLORS.sageDark : COLORS.charcoal, fontFamily: "'DM Sans', sans-serif" }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div style={{ background: "white", borderRadius: 24, padding: 32, border: `1px solid rgba(26,31,46,0.07)`, boxShadow: "0 2px 16px rgba(26,31,46,0.04)", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(139,175,142,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>💬</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: COLORS.deep }}>Comments <span style={{ color: COLORS.muted, fontWeight: 300, fontSize: 16 }}>(optional)</span></h2>
            </div>
            <textarea
              className="textarea-styled"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Share your experience in your own words..."
              style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: `1.5px solid rgba(26,31,46,0.12)`, background: COLORS.warmWhite, fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.deep, resize: "vertical", lineHeight: 1.6 }}
            />
          </div>

          {/* Anonymous */}
          <label style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, cursor: "pointer" }}>
            <div onClick={() => setAnon(!anon)} style={{ width: 22, height: 22, borderRadius: 7, border: `1.5px solid ${anon ? COLORS.sageDark : "rgba(26,31,46,0.2)"}`, background: anon ? COLORS.sageDark : "white", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", flexShrink: 0 }}>
              {anon && <span style={{ color: "white", fontSize: 12, lineHeight: 1 }}>✓</span>}
            </div>
            <span style={{ fontSize: 14, color: COLORS.charcoal, fontWeight: 400 }}>Submit anonymously</span>
          </label>

          <button
            type="submit"
            className="submit-btn"
            disabled={submitting}
            style={{ display: "flex", width: "100%", padding: "16px", borderRadius: 14, background: COLORS.deep, color: "white", border: "none", fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 20px rgba(26,31,46,0.12)" }}
          >
            {submitting
              ? <><div className="spin" style={{ width: 18, height: 18, border: "1.5px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%" }} /> Submitting...</>
              : <>📤 Submit Feedback</>}
          </button>
        </form>
      </div>
    </div>
  );
}