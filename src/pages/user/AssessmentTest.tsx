import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  muted: "#7A8090",
  bg: "#F8F5EF",
};

const TESTS_MAP = {
  addiction: "Addiction Assessment",
  adhd: "ADHD Assessment",
  "adjustment-disorder": "Adjustment Disorder",
  anxiety: "Anxiety Assessment",
  bipolar: "Bipolar Disorder",
  depression: "Depression Assessment",
  ocd: "OCD Assessment",
  ptsd: "PTSD Assessment",
  sleep: "Sleep Disorder",
  stress: "Stress Assessment",
};

const QUESTIONS = [
  "How often have you felt overwhelmed by daily activities?",
  "How often have you had trouble concentrating?",
  "How often have you felt hopeless or sad?",
  "How often have you had difficulty sleeping?",
  "How often have you felt anxious or worried?",
  "How often have you avoided social situations?",
  "How often have you had physical symptoms like headaches or fatigue?",
];

const OPTS = [
  { l: "Not at all", v: 0 },
  { l: "Several days", v: 1 },
  { l: "More than half the days", v: 2 },
  { l: "Nearly every day", v: 3 },
];

function scorelabel(score) {
  return score <= 4 ? "Minimal" : score <= 9 ? "Mild" : score <= 14 ? "Moderate" : "Severe";
}

function labelStyle(l) {
  const map = {
    Minimal: { bg: "rgba(74,122,82,0.1)", color: COLORS.sageDark, border: "rgba(74,122,82,0.2)" },
    Mild: { bg: "rgba(201,169,110,0.12)", color: "#8A6020", border: "rgba(201,169,110,0.3)" },
    Moderate: { bg: "rgba(200,100,30,0.1)", color: "#8A4010", border: "rgba(200,100,30,0.25)" },
    Severe: { bg: "rgba(200,50,50,0.1)", color: "#9A2020", border: "rgba(200,50,50,0.25)" },
  };
  return map[l] || map.Minimal;
}

export default function AssessmentTest() {
  const { slug } = useParams();
  const name = TESTS_MAP[slug || ""] || "Assessment";
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  async function submit() {
    if (Object.keys(answers).length < QUESTIONS.length) {
      toast.error("Please answer all questions");
      return;
    }
    const score = Object.values(answers).reduce((s, v) => s + v, 0);
    const l = scorelabel(score);
    setSubmitting(true);
    try {
      await userApi.submitAssessment({
        testName: name,
        testSlug: slug,
        score,
        resultLabel: l,
        answers: JSON.stringify(answers),
      });
      setResult({ score, label: l });
      toast.success("Assessment saved!");
    } catch {
      toast.error("Failed to save");
    } finally {
      setSubmitting(false);
    }
  }

  const progress = (Object.keys(answers).length / QUESTIONS.length) * 100;

  if (result) {
    const ls = labelStyle(result.label);
    return (
      <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "'DM Sans', sans-serif", padding: "48px 40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
          * { box-sizing: border-box; }
          .result-back-btn:hover { background: ${COLORS.cream} !important; }
          .result-back-btn { transition: background 0.2s ease; }
          .result-book-btn:hover { background: ${COLORS.sageDark} !important; transform: translateY(-1px); }
          .result-book-btn { transition: all 0.25s ease; }
        `}</style>
        <div style={{ maxWidth: 440, width: "100%", textAlign: "center" }}>
          <div style={{ width: 90, height: 90, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.sageLight}, ${COLORS.sage})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, margin: "0 auto 28px", boxShadow: "0 12px 40px rgba(139,175,142,0.3)" }}>✓</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: COLORS.deep, marginBottom: 8 }}>
            Assessment <em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Complete</em>
          </h2>
          <p style={{ fontSize: 14, color: COLORS.muted, marginBottom: 32, fontWeight: 300 }}>{name}</p>

          <div style={{ background: "white", borderRadius: 24, padding: 36, border: `1px solid rgba(26,31,46,0.07)`, boxShadow: "0 4px 30px rgba(26,31,46,0.06)", marginBottom: 20 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: COLORS.muted, marginBottom: 16, fontWeight: 600 }}>Your Score</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 88, fontWeight: 600, color: COLORS.deep, lineHeight: 1, marginBottom: 16 }}>{result.score}</div>
            <div style={{ display: "inline-block", padding: "9px 26px", borderRadius: 100, background: ls.bg, color: ls.color, border: `1px solid ${ls.border}`, fontSize: 15, fontWeight: 600 }}>{result.label}</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <button
              className="result-back-btn"
              onClick={() => navigate("/user/assessments")}
              style={{ padding: "14px", borderRadius: 14, border: `1.5px solid rgba(26,31,46,0.12)`, background: "white", color: COLORS.charcoal, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
            >
              ← Back
            </button>
            <button
              className="result-book-btn"
              onClick={() => navigate("/user/book-session")}
              style={{ padding: "14px", borderRadius: 14, background: COLORS.deep, color: "white", border: "none", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
            >
              📅 Book Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "'DM Sans', sans-serif", padding: "48px 40px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        * { box-sizing: border-box; }
        .opt-label:hover { border-color: ${COLORS.sage} !important; background: rgba(139,175,142,0.05) !important; }
        .opt-label { transition: all 0.2s ease; cursor: pointer; }
        .submit-btn:hover:not(:disabled) { background: ${COLORS.sageDark} !important; transform: translateY(-2px); box-shadow: 0 12px 30px rgba(74,122,82,0.2) !important; }
        .submit-btn { transition: all 0.3s ease; }
        .back-link:hover { color: ${COLORS.deep} !important; }
        .back-link { transition: color 0.2s ease; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div style={{ maxWidth: 700 }}>
        {/* Back */}
        <button
          className="back-link"
          onClick={() => navigate("/user/assessments")}
          style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: COLORS.sageDark, border: "none", background: "none", cursor: "pointer", marginBottom: 32, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
        >
          ← Back to Assessments
        </button>

        {/* Progress Card */}
        <div style={{ background: "white", borderRadius: 24, padding: 28, border: `1px solid rgba(26,31,46,0.07)`, boxShadow: "0 2px 16px rgba(26,31,46,0.04)", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: `linear-gradient(135deg, ${COLORS.sageLight}, ${COLORS.sage})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>✦</div>
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: COLORS.deep }}>{name}</h1>
              <p style={{ fontSize: 12, color: COLORS.muted, fontWeight: 300, marginTop: 2 }}>Answer all questions honestly for accurate results</p>
            </div>
          </div>
          <div style={{ height: 6, background: "rgba(26,31,46,0.06)", borderRadius: 100, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 100, background: `linear-gradient(90deg, ${COLORS.sage}, ${COLORS.sageDark})`, width: `${progress}%`, transition: "width 0.4s cubic-bezier(0.25,0.46,0.45,0.94)" }} />
          </div>
          <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 10, fontWeight: 300 }}>
            {Object.keys(answers).length} of {QUESTIONS.length} questions answered
          </div>
        </div>

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
          {QUESTIONS.map((q, i) => (
            <div
              key={i}
              style={{ background: "white", borderRadius: 20, padding: "26px 28px", border: `1px solid ${answers[i] !== undefined ? "rgba(139,175,142,0.2)" : "rgba(26,31,46,0.07)"}`, boxShadow: "0 2px 12px rgba(26,31,46,0.03)", transition: "border-color 0.2s ease" }}
            >
              <p style={{ fontSize: 15, fontWeight: 500, color: COLORS.deep, marginBottom: 18, lineHeight: 1.6 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: COLORS.sageDark, marginRight: 8 }}>{i + 1}.</span>
                {q}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {OPTS.map((o) => (
                  <label
                    key={o.v}
                    className="opt-label"
                    style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", borderRadius: 12, border: `1.5px solid ${answers[i] === o.v ? COLORS.sageDark : "rgba(26,31,46,0.1)"}`, background: answers[i] === o.v ? "rgba(139,175,142,0.08)" : "transparent" }}
                  >
                    <div style={{ width: 20, height: 20, borderRadius: "50%", border: `1.5px solid ${answers[i] === o.v ? COLORS.sageDark : "rgba(26,31,46,0.2)"}`, background: answers[i] === o.v ? COLORS.sageDark : "white", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", flexShrink: 0 }}>
                      {answers[i] === o.v && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "white" }} />}
                    </div>
                    <input
                      type="radio"
                      name={`q${i}`}
                      checked={answers[i] === o.v}
                      onChange={() => setAnswers((a) => ({ ...a, [i]: o.v }))}
                      style={{ display: "none" }}
                    />
                    <span style={{ fontSize: 14, color: answers[i] === o.v ? COLORS.deep : COLORS.charcoal, fontWeight: answers[i] === o.v ? 500 : 400 }}>{o.l}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit */}
        <button
          className="submit-btn"
          onClick={submit}
          disabled={submitting || Object.keys(answers).length < QUESTIONS.length}
          style={{ display: "flex", width: "100%", padding: "17px", borderRadius: 14, background: Object.keys(answers).length < QUESTIONS.length ? "rgba(26,31,46,0.22)" : COLORS.deep, color: "white", border: "none", fontSize: 15, fontWeight: 500, cursor: Object.keys(answers).length < QUESTIONS.length ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif", alignItems: "center", justifyContent: "center", gap: 8 }}
        >
          {submitting
            ? <><div className="spin" style={{ width: 18, height: 18, border: "1.5px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%" }} /> Submitting...</>
            : "Submit Assessment →"}
        </button>
      </div>
    </div>
  );
}