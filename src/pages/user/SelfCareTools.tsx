import { useState } from "react";

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
  goldLight: "#E8C98A",
  muted: "#7A8090",
  bg: "#F8F5EF",
};

const MOODS = [
  { e: "Happy", icon: "😊" },
  { e: "Neutral", icon: "😐" },
  { e: "Sad", icon: "😔" },
  { e: "Anxious", icon: "😰" },
  { e: "Angry", icon: "😡" },
  { e: "Tired", icon: "😴" },
];

const HABITS = [
  { name: "Exercise", icon: "🏃" },
  { name: "Meditation", icon: "🧘" },
  { name: "Journaling", icon: "📔" },
  { name: "Reading", icon: "📚" },
  { name: "Deep Breathing", icon: "🌬️" },
  { name: "Nature Walk", icon: "🌿" },
  { name: "Healthy Eating", icon: "🥗" },
  { name: "Adequate Sleep", icon: "🌙" },
];

export default function SelfCareTools() {
  const [mood, setMood] = useState(null);
  const [habits, setHabits] = useState([]);
  const [saved, setSaved] = useState(false);

  function toggleHabit(h) {
    setHabits((p) => (p.includes(h) ? p.filter((x) => x !== h) : [...p, h]));
  }

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "'DM Sans', sans-serif", padding: "48px 40px" }}>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageDark, fontWeight: 500, marginBottom: 12 }}>
          Your Wellness
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 700, color: COLORS.deep, lineHeight: 1.1, marginBottom: 8 }}>
          Self-Care <em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Tools</em>
        </h1>

        <p style={{ fontSize: 15, color: COLORS.muted, fontWeight: 300 }}>
          Track your mood and healthy habits every day.
        </p>
      </div>

      {/* 🔥 GRID CENTER FIX */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 28,
        maxWidth: 900,
        margin: "0 auto"   // ✅ CENTER
      }}>

        {/* Mood Tracker */}
        <div style={{ background: "white", borderRadius: 24, padding: 36, border: `1px solid rgba(26,31,46,0.07)`, boxShadow: "0 4px 30px rgba(26,31,46,0.05)" }}>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(139,175,142,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>♡</div>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: COLORS.deep }}>Mood Tracker</h2>
              <p style={{ fontSize: 13, color: COLORS.muted, fontWeight: 300 }}>How are you feeling today?</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
            {MOODS.map((m) => (
              <button
                key={m.e}
                onClick={() => setMood(m.e)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "16px 8px",
                  borderRadius: 16,
                  border: `1.5px solid ${mood === m.e ? COLORS.sageDark : "rgba(26,31,46,0.1)"}`,
                  background: mood === m.e ? "rgba(139,175,142,0.1)" : "transparent",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 28, marginBottom: 6 }}>{m.icon}</span>
                <span style={{ fontSize: 12, fontWeight: mood === m.e ? 600 : 400, color: mood === m.e ? COLORS.sageDark : COLORS.muted }}>
                  {m.e}
                </span>
              </button>
            ))}
          </div>

          {mood && (
            <div style={{ padding: "14px 20px", borderRadius: 14, background: "rgba(139,175,142,0.08)", border: `1px solid rgba(139,175,142,0.25)`, textAlign: "center" }}>
              <span style={{ fontSize: 13, color: COLORS.sageDark, fontWeight: 500 }}>
                Current mood: <strong style={{ color: COLORS.deep }}>{mood}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Health Habits */}
        <div style={{ background: "white", borderRadius: 24, padding: 36, border: `1px solid rgba(26,31,46,0.07)`, boxShadow: "0 4px 30px rgba(26,31,46,0.05)" }}>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(201,169,110,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>✓</div>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: COLORS.deep }}>Health Habits</h2>
              <p style={{ fontSize: 13, color: COLORS.muted, fontWeight: 300 }}>Which habits did you practice today?</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            {HABITS.map((h) => {
              const isSelected = habits.includes(h.name);
              return (
                <button
                  key={h.name}
                  onClick={() => toggleHabit(h.name)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 14px",
                    borderRadius: 14,
                    border: `1.5px solid ${isSelected ? COLORS.sage : "rgba(26,31,46,0.1)"}`,
                    background: isSelected ? "rgba(139,175,142,0.08)" : "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: 14 }}>{h.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: isSelected ? 500 : 400, color: isSelected ? COLORS.deep : COLORS.muted }}>
                    {h.name}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setSaved(true)}
            style={{
              display: "block",
              width: "100%",
              padding: "14px",
              borderRadius: 14,
              background: saved ? COLORS.sageDark : COLORS.deep,
              color: "white",
              border: "none",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {saved ? "✓  Saved for Today!" : "Save for Today"}
          </button>
        </div>
      </div>

      {/* 🔥 SUMMARY CENTER FIX */}
      {(mood || habits.length > 0) && (
        <div style={{
          marginTop: 28,
          background: "white",
          borderRadius: 24,
          padding: 32,
          border: `1px solid rgba(26,31,46,0.07)`,
          boxShadow: "0 4px 30px rgba(26,31,46,0.05)",
          maxWidth: 900,
          margin: "28px auto 0"  // ✅ CENTER
        }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: COLORS.deep, marginBottom: 18 }}>
            Today's Summary
          </h2>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {mood && <span>{mood}</span>}
            {habits.map((h) => <span key={h}>{h}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}