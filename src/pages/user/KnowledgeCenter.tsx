import { motion } from "framer-motion";

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

const BLOGS = [
  { title: "5 Signs You May Need to Talk to a Therapist", author: "Dr. Sakshi Kochhar", date: "Oct 15, 2024", tag: "Mental Health", text: "Recognizing when professional help is needed is the first step to better mental health..." },
  { title: "Understanding Anxiety: Causes, Symptoms, and Treatment", author: "Ms. Siva Tharini", date: "Oct 12, 2024", tag: "Anxiety", text: "Anxiety disorders are among the most common mental health conditions worldwide..." },
  { title: "The Power of Mindfulness in Daily Life", author: "Ms. Sudipta Das", date: "Oct 8, 2024", tag: "Wellness", text: "Mindfulness is the practice of purposefully focusing your attention on the present moment..." },
];

const VIDEOS = [
  { title: "Introduction to Cognitive Behavioural Therapy", dur: "12:34", views: "2.4K" },
  { title: "Breathing Exercises for Anxiety Relief", dur: "8:20", views: "5.1K" },
  { title: "Understanding Depression: A Guide", dur: "15:45", views: "3.8K" },
  { title: "How to Build Mental Resilience", dur: "10:15", views: "1.9K" },
];

const TAG_COLORS = {
  "Mental Health": { bg: "rgba(139,175,142,0.12)", color: COLORS.sageDark, border: "rgba(139,175,142,0.28)" },
  Anxiety: { bg: "rgba(201,169,110,0.12)", color: "#8A6020", border: "rgba(201,169,110,0.28)" },
  Wellness: { bg: "rgba(74,122,82,0.1)", color: COLORS.sageDark, border: "rgba(74,122,82,0.22)" },
};

export default function KnowledgeCenter() {
  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "'DM Sans', sans-serif", padding: "48px 40px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        * { box-sizing: border-box; }
        .blog-card:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(26,31,46,0.1) !important; border-color: rgba(139,175,142,0.2) !important; }
        .blog-card { transition: all 0.35s cubic-bezier(0.25,0.46,0.45,0.94); }
        .video-card:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(26,31,46,0.1) !important; }
        .video-card:hover .play-overlay { opacity: 1 !important; }
        .video-card { transition: all 0.3s ease; }
        .play-overlay { transition: opacity 0.25s ease; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 50 }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageDark, fontWeight: 500, marginBottom: 12 }}>Learn & Grow</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 700, color: COLORS.deep, lineHeight: 1.1, marginBottom: 8 }}>
          Knowledge <em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Center</em>
        </h1>
        <p style={{ fontSize: 15, color: COLORS.muted, fontWeight: 300 }}>Articles, videos, and resources for your mental wellness journey.</p>
      </div>

      {/* Articles */}
      <section style={{ marginBottom: 60 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: COLORS.deep, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📖</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: COLORS.deep }}>Latest Articles</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {BLOGS.map((b, i) => {
            const tc = TAG_COLORS[b.tag] || TAG_COLORS["Mental Health"];
            return (
              <div key={b.title} className="blog-card" style={{ background: "white", borderRadius: 24, padding: 32, border: `1px solid rgba(26,31,46,0.07)`, boxShadow: "0 2px 16px rgba(26,31,46,0.04)", cursor: "pointer" }}>
                <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 100, fontSize: 11, fontWeight: 500, letterSpacing: "0.5px", background: tc.bg, color: tc.color, border: `1px solid ${tc.border}`, marginBottom: 18 }}>{b.tag}</span>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 700, color: COLORS.deep, lineHeight: 1.3, marginBottom: 12 }}>{b.title}</h3>
                <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.7, fontWeight: 300, marginBottom: 20, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{b.text}</p>
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 18, borderTop: `1px solid rgba(26,31,46,0.07)`, fontSize: 12, color: COLORS.muted }}>
                  <span>👤 {b.author}</span>
                  <span>📅 {b.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Videos */}
      <section>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: "linear-gradient(135deg, #C9A96E, #E8C98A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>▶</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: COLORS.deep }}>Videos</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
          {VIDEOS.map((v) => (
            <div key={v.title} className="video-card" style={{ background: "white", borderRadius: 20, overflow: "hidden", border: `1px solid rgba(26,31,46,0.07)`, boxShadow: "0 2px 16px rgba(26,31,46,0.04)", cursor: "pointer" }}>
              <div style={{ height: 140, background: `linear-gradient(135deg, ${COLORS.sageLight}, ${COLORS.sage})`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>▶</div>
                <div className="play-overlay" style={{ position: "absolute", inset: 0, background: "rgba(26,31,46,0.25)", opacity: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>▶</div>
                </div>
                <div style={{ position: "absolute", bottom: 10, right: 12, padding: "3px 10px", borderRadius: 6, background: "rgba(26,31,46,0.7)", fontSize: 11, color: "white", fontWeight: 500 }}>{v.dur}</div>
              </div>
              <div style={{ padding: "18px 18px 20px" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: COLORS.deep, lineHeight: 1.4, marginBottom: 12, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{v.title}</h3>
                <div style={{ display: "flex", gap: 14, fontSize: 12, color: COLORS.muted }}>
                  <span>⏱ {v.dur}</span>
                  <span>👁 {v.views} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}