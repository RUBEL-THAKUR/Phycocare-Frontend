// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
//
// const COLORS = {
//   sage: "#8BAF8E",
//   sageLight: "#B8D4BB",
//   sageDark: "#4A7A52",
//   cream: "#F5F0E8",
//   warmWhite: "#FDFAF5",
//   deep: "#1A1F2E",
//   deep2: "#252B3B",
//   charcoal: "#3D4454",
//   gold: "#C9A96E",
//   goldLight: "#E8C98A",
//   muted: "#7A8090",
//   bg: "#F8F5EF",
// };
//
// const styles = {
//   body: {
//     fontFamily: "'DM Sans', sans-serif",
//     background: COLORS.bg,
//     color: COLORS.deep,
//     overflowX: "hidden" as const,
//     cursor: "none",
//     margin: 0,
//     padding: 0,
//   },
// };
//
// // ─── Custom Cursor ───────────────────────────────────────────────────
// function CustomCursor() {
//   const cursorRef = useRef<HTMLDivElement>(null);
//   const ringRef = useRef<HTMLDivElement>(null);
//   const mousePos = useRef({ x: 0, y: 0 });
//   const ringPos = useRef({ x: 0, y: 0 });
//   const rafRef = useRef<number | null>(null);
//
//   useEffect(() => {
//     const onMove = (e: MouseEvent) => {
//       mousePos.current = { x: e.clientX, y: e.clientY };
//       if (cursorRef.current) {
//         cursorRef.current.style.left = e.clientX + "px";
//         cursorRef.current.style.top = e.clientY + "px";
//       }
//     };
//     document.addEventListener("mousemove", onMove);
//
//     const animate = () => {
//       ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
//       ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;
//       if (ringRef.current) {
//         ringRef.current.style.left = ringPos.current.x + "px";
//         ringRef.current.style.top = ringPos.current.y + "px";
//       }
//       rafRef.current = requestAnimationFrame(animate);
//     };
//     rafRef.current = requestAnimationFrame(animate);
//
//     const hoverEls = document.querySelectorAll("a, button, [data-hover]");
//     const onEnter = () => {
//       if (cursorRef.current) cursorRef.current.style.transform = "translate(-50%,-50%) scale(2)";
//       if (ringRef.current) {
//         ringRef.current.style.transform = "translate(-50%,-50%) scale(1.5)";
//         ringRef.current.style.opacity = "0.5";
//       }
//     };
//     const onLeave = () => {
//       if (cursorRef.current) cursorRef.current.style.transform = "translate(-50%,-50%) scale(1)";
//       if (ringRef.current) {
//         ringRef.current.style.transform = "translate(-50%,-50%) scale(1)";
//         ringRef.current.style.opacity = "1";
//       }
//     };
//     hoverEls.forEach((el) => {
//       el.addEventListener("mouseenter", onEnter);
//       el.addEventListener("mouseleave", onLeave);
//     });
//
//     return () => {
//       document.removeEventListener("mousemove", onMove);
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//   }, []);
//
//   return (
//     <>
//       <div
//         ref={cursorRef}
//         style={{
//           width: 12, height: 12, background: COLORS.sageDark, borderRadius: "50%",
//           position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 99999,
//           transition: "transform 0.15s ease, opacity 0.2s", transform: "translate(-50%,-50%)",
//         }}
//       />
//       <div
//         ref={ringRef}
//         style={{
//           width: 40, height: 40, border: `1.5px solid ${COLORS.sage}`, borderRadius: "50%",
//           position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 99998,
//           transition: "transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.3s",
//           transform: "translate(-50%,-50%)",
//         }}
//       />
//     </>
//   );
// }
//
// // ─── Scroll Reveal Hook ───────────────────────────────────────────────
// function useReveal() {
//   const ref = useRef<HTMLDivElement>(null);
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, []);
//   return [ref, visible] as const;
// }
//
// function Reveal({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
//   const [ref, visible] = useReveal();
//   return (
//     <div
//       ref={ref}
//       style={{
//         opacity: visible ? 1 : 0,
//         transform: visible ? "translateY(0)" : "translateY(40px)",
//         transition: `opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`,
//         ...style,
//       }}
//     >
//       {children}
//     </div>
//   );
// }
//
// // ─── Navbar ───────────────────────────────────────────────────────────
// function Navbar({ getStartedRef }: { getStartedRef: React.RefObject<HTMLDivElement> }) {
//   const navigate = useNavigate();
//   const [scrolled, setScrolled] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [dropdownHighlight, setDropdownHighlight] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 60);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);
//
//   // Close dropdown on outside click
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);
//
//   // Expose highlight trigger via ref on window for Hero to call
//   useEffect(() => {
//     (window as any).__highlightGetStarted = () => {
//       setDropdownHighlight(true);
//       setDropdownOpen(true);
//       setTimeout(() => setDropdownHighlight(false), 1800);
//     };
//   }, []);
//
//   const Logo = () => (
//     <svg viewBox="0 0 40 40" fill="none" width="32" height="32">
//       <circle cx="20" cy="20" r="18" fill="#8BAF8E" opacity="0.2" />
//       <path d="M20 10 C14 10 10 14 10 19 C10 24 14 27 20 31 C26 27 30 24 30 19 C30 14 26 10 20 10Z" fill="#4A7A52" />
//       <circle cx="17" cy="18" r="2" fill="white" />
//       <circle cx="23" cy="18" r="2" fill="white" />
//       <path d="M15 24 Q20 28 25 24" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
//     </svg>
//   );
//
//   const dropdownItems = [
//     { label: "User", icon: "👤", route: "/signup", desc: "Patient / Client" },
//     { label: "Therapist", icon: "🩺", route: "/therapist/signup", desc: "Mental Health Professional" },
//     { label: "Admin", icon: "🛡️", route: "/admin/login", desc: "Platform Administrator" },
//   ];
//
//   return (
//     <nav
//       style={{
//         position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
//         display: "flex", alignItems: "center", justifyContent: "space-between",
//         padding: scrolled ? "16px 60px" : "22px 60px",
//         transition: "all 0.4s ease",
//         background: scrolled ? "rgba(248,245,239,0.92)" : "transparent",
//         backdropFilter: scrolled ? "blur(24px)" : "none",
//         borderBottom: scrolled ? `1px solid rgba(139,175,142,0.2)` : "none",
//       }}
//     >
//       <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//         <Logo />
//         <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: COLORS.deep, letterSpacing: "0.5px" }}>PsychoCare</span>
//       </div>
//
//       <ul style={{ display: "flex", gap: 40, listStyle: "none", margin: 0, padding: 0 }}>
//         {["Features", "Therapists", "How it Works", "Pricing", "FAQ"].map((item) => (
//           <li key={item}>
//             <a
//               href={`#${item.toLowerCase().replace(/ /g, "")}`}
//               style={{ textDecoration: "none", fontSize: 14, fontWeight: 400, color: COLORS.charcoal, letterSpacing: "0.3px" }}
//             >
//               {item}
//             </a>
//           </li>
//         ))}
//       </ul>
//
//       <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
//         {/* Sign In → goes to /login */}
//         <button
//           onClick={() => navigate("/login")}
//           style={{
//             fontSize: 14, color: COLORS.charcoal, background: "transparent",
//             border: "1px solid transparent", borderRadius: 100,
//             padding: "8px 20px", cursor: "none", transition: "all 0.3s",
//             fontFamily: "'DM Sans', sans-serif",
//           }}
//         >
//           Sign In
//         </button>
//
//         {/* Get Started → dropdown */}
//         <div ref={dropdownRef} style={{ position: "relative" }}>
//           <button
//             onClick={() => setDropdownOpen((v) => !v)}
//             style={{
//               fontSize: 14, color: "white",
//               background: dropdownHighlight
//                 ? `linear-gradient(135deg, ${COLORS.sageDark}, ${COLORS.sage})`
//                 : COLORS.deep,
//               border: dropdownHighlight ? `2px solid ${COLORS.goldLight}` : "2px solid transparent",
//               padding: "10px 26px", borderRadius: 100,
//               cursor: "none", letterSpacing: "0.3px",
//               transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
//               fontFamily: "'DM Sans', sans-serif",
//               boxShadow: dropdownHighlight ? `0 0 0 4px rgba(139,175,142,0.3), 0 8px 32px rgba(74,122,82,0.35)` : "none",
//               transform: dropdownHighlight ? "scale(1.06)" : "scale(1)",
//               display: "flex", alignItems: "center", gap: 6,
//             }}
//           >
//             Get Started
//             <span style={{
//               display: "inline-block",
//               transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
//               transition: "transform 0.3s ease",
//               fontSize: 10,
//             }}>▼</span>
//           </button>
//
//           {/* Dropdown Menu */}
//           {dropdownOpen && (
//             <div
//               style={{
//                 position: "absolute", top: "calc(100% + 12px)", right: 0,
//                 background: "white",
//                 borderRadius: 18,
//                 boxShadow: "0 20px 60px rgba(26,31,46,0.18), 0 4px 16px rgba(26,31,46,0.08)",
//                 border: `1px solid rgba(139,175,142,0.2)`,
//                 overflow: "hidden",
//                 minWidth: 230,
//                 animation: "dropdownIn 0.25s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
//                 zIndex: 2000,
//               }}
//             >
//               <div style={{ padding: "10px 0" }}>
//                 <div style={{ padding: "8px 20px 12px", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: COLORS.muted, borderBottom: `1px solid rgba(26,31,46,0.06)`, marginBottom: 6 }}>
//                   Register as
//                 </div>
//                 {dropdownItems.map((item) => (
//                   <button
//                     key={item.label}
//                     onClick={() => { setDropdownOpen(false); navigate(item.route); }}
//                     style={{
//                       width: "100%", display: "flex", alignItems: "center", gap: 14,
//                       padding: "12px 20px", background: "transparent", border: "none",
//                       cursor: "none", textAlign: "left", transition: "background 0.2s",
//                       fontFamily: "'DM Sans', sans-serif",
//                     }}
//                     onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(139,175,142,0.08)")}
//                     onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
//                   >
//                     <div style={{
//                       width: 38, height: 38, borderRadius: 12,
//                       background: "linear-gradient(135deg, rgba(139,175,142,0.15), rgba(74,122,82,0.08))",
//                       display: "flex", alignItems: "center", justifyContent: "center",
//                       fontSize: 18, flexShrink: 0,
//                     }}>
//                       {item.icon}
//                     </div>
//                     <div>
//                       <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.deep }}>{item.label}</div>
//                       <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 1 }}>{item.desc}</div>
//                     </div>
//                     <div style={{ marginLeft: "auto", color: COLORS.muted, fontSize: 12 }}>→</div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }
//
// // ─── Hero ─────────────────────────────────────────────────────────────
// function Hero() {
//   const navigate = useNavigate();
//
//   const handleBeginJourney = () => {
//     // Scroll to top smoothly so navbar "Get Started" is visible
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     // After scroll completes, trigger highlight
//     setTimeout(() => {
//       if ((window as any).__highlightGetStarted) {
//         (window as any).__highlightGetStarted();
//       }
//     }, 400);
//   };
//
//   return (
//     <section
//       style={{
//         minHeight: "100vh", display: "flex", flexDirection: "column",
//         justifyContent: "center", alignItems: "center", textAlign: "center",
//         padding: "160px 40px 100px", position: "relative", overflow: "hidden",
//       }}
//     >
//       <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,175,142,0.15) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(201,169,110,0.1) 0%, transparent 60%)" }} />
//
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
//         * { margin:0; padding:0; box-sizing:border-box; cursor:none !important; }
//         html { scroll-behavior: smooth; }
//         @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
//         @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
//         @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
//         @keyframes scrollLine { 0%{transform:scaleY(0);transform-origin:top} 50%{transform:scaleY(1);transform-origin:top} 51%{transform-origin:bottom} 100%{transform:scaleY(0);transform-origin:bottom} }
//         @keyframes dropdownIn { from{opacity:0;transform:translateY(-10px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
//         .anim-hero-tag { opacity:0; animation: fadeUp 0.8s ease 0.2s forwards; }
//         .anim-hero-h1 { opacity:0; animation: fadeUp 0.9s ease 0.4s forwards; }
//         .anim-hero-sub { opacity:0; animation: fadeUp 0.9s ease 0.6s forwards; }
//         .anim-hero-actions { opacity:0; animation: fadeUp 0.9s ease 0.8s forwards; }
//         .anim-hero-stats { opacity:0; animation: fadeUp 0.9s ease 1s forwards; }
//         .anim-scroll-ind { opacity:0; animation: fadeUp 1s ease 1.4s forwards; }
//         .pulse-dot { animation: pulse 2s infinite; }
//         .online-dot { width:8px;height:8px;background:#22C55E;border-radius:50%; animation:pulse 2s infinite; display:inline-block; }
//         .scroll-line { width:1px;height:50px;background:linear-gradient(to bottom, #8BAF8E, transparent); animation:scrollLine 2s ease-in-out infinite; }
//         .nav-link-hover:hover { color: #1A1F2E !important; }
//         .btn-dark-hover:hover { background:#4A7A52 !important; transform:translateY(-2px); box-shadow:0 20px 40px rgba(26,31,46,0.2); }
//         .btn-outline-hover:hover { border-color:#1A1F2E !important; background:rgba(26,31,46,0.04) !important; }
//         .feature-card-hover:hover { transform:translateY(-8px); box-shadow:0 40px 80px rgba(26,31,46,0.1); border-color:transparent !important; }
//         .feature-card-hover:hover .feature-top-bar { transform:scaleX(1) !important; }
//         .therapist-card-hover:hover { transform:translateY(-8px); box-shadow:0 30px 60px rgba(26,31,46,0.1); }
//         .testimonial-card-hover:hover { background:rgba(255,255,255,0.08) !important; transform:translateY(-4px); }
//         .pricing-card-hover:hover { transform:translateY(-6px); box-shadow:0 30px 60px rgba(26,31,46,0.08); }
//         .popular-card-hover:hover { transform:scale(1.04) translateY(-6px) !important; }
//         .video-card-hover:hover { transform:translateY(-4px); box-shadow:0 30px 60px rgba(0,0,0,0.3); }
//         .video-card-hover:hover .video-play-btn { opacity:1 !important; }
//         .step-hover:hover .step-num { background:#1A1F2E !important; color:white !important; }
//         .book-btn-hover:hover { background:#4A7A52 !important; }
//         .story-link-hover:hover { color:#4A7A52 !important; border-color:#4A7A52 !important; gap:16px !important; }
//         .btn-white-hover:hover { transform:translateY(-2px); box-shadow:0 20px 40px rgba(0,0,0,0.2); }
//         .btn-white-outline-hover:hover { background:rgba(255,255,255,0.1) !important; border-color:white !important; }
//         .footer-link-hover:hover { color:white !important; }
//         .plan-cta-outline:hover { border-color:#1A1F2E !important; background:rgba(26,31,46,0.04) !important; }
//         .plan-cta-solid:hover { background:#F5F0E8 !important; }
//         .plan-cta-dark:hover { background:#4A7A52 !important; }
//         .faq-item-cursor { cursor:none; }
//         .begin-btn:hover { background:#4A7A52 !important; transform:translateY(-2px); box-shadow:0 20px 40px rgba(26,31,46,0.2); }
//       `}</style>
//
//       <div
//         className="anim-hero-tag"
//         style={{
//           display: "inline-flex", alignItems: "center", gap: 8,
//           padding: "8px 20px", border: `1px solid rgba(139,175,142,0.4)`,
//           borderRadius: 100, fontSize: 12, fontWeight: 500, color: COLORS.sageDark,
//           letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 40,
//           background: "rgba(139,175,142,0.08)",
//         }}
//       >
//         <span className="pulse-dot" style={{ width: 6, height: 6, background: COLORS.sage, borderRadius: "50%", display: "inline-block" }} />
//         Trusted by 50,000+ people across India
//       </div>
//
//       <h1
//         className="anim-hero-h1"
//         style={{
//           fontFamily: "'Playfair Display', serif", fontSize: "clamp(52px, 8vw, 110px)",
//           fontWeight: 900, lineHeight: 1.0, color: COLORS.deep, maxWidth: 1000, position: "relative", zIndex: 1,
//         }}
//       >
//         Your Mind Deserves<br />
//         <em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Expert Care.</em>
//       </h1>
//
//       <p
//         className="anim-hero-sub"
//         style={{ fontSize: 18, color: COLORS.muted, maxWidth: 520, margin: "32px auto 0", lineHeight: 1.7, fontWeight: 300 }}
//       >
//         Connect with certified psychologists, therapists & counselors — privately, confidentially, from anywhere.
//       </p>
//
//       <div className="anim-hero-actions" style={{ display: "flex", gap: 16, marginTop: 52, position: "relative", zIndex: 1 }}>
//         {/* Begin Your Journey → scrolls up & highlights Get Started */}
//         <button
//           onClick={handleBeginJourney}
//           className="begin-btn"
//           style={{
//             padding: "16px 42px", borderRadius: 100, fontSize: 15, fontWeight: 500,
//             background: COLORS.deep, color: "white", border: "none",
//             transition: "all 0.3s", cursor: "none",
//             fontFamily: "'DM Sans', sans-serif",
//           }}
//         >
//           Begin Your Journey →
//         </button>
//
//         {/* Explore Therapists → goes to therapists section */}
//         <a
//           href="#therapists"
//           className="btn-outline-hover"
//           style={{
//             padding: "16px 42px", borderRadius: 100, fontSize: 15, fontWeight: 500,
//             textDecoration: "none", border: `1px solid rgba(26,31,46,0.2)`,
//             color: COLORS.deep, background: "transparent", transition: "all 0.3s", cursor: "none",
//           }}
//         >
//           Explore Therapists
//         </a>
//       </div>
//
//       <div className="anim-hero-stats" style={{ display: "flex", gap: 60, marginTop: 80 }}>
//         {[["50K+", "Lives Changed"], ["200+", "Certified Therapists"], ["4.9★", "Average Rating"], ["98%", "Would Recommend"]].map(([num, label], i) => (
//           <div key={i} style={{ display: "flex", alignItems: "center", gap: 60 }}>
//             {i > 0 && <div style={{ width: 1, height: 60, background: "linear-gradient(to bottom, transparent, rgba(26,31,46,0.15), transparent)" }} />}
//             <div style={{ textAlign: "center" }}>
//               <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 600, color: COLORS.deep }}>{num}</div>
//               <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 4, letterSpacing: "0.5px" }}>{label}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//
//       <div
//         className="anim-scroll-ind"
//         style={{
//           position: "absolute", bottom: 50, left: "50%", transform: "translateX(-50%)",
//           display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
//         }}
//       >
//         <span style={{ fontSize: 11, letterSpacing: 2, color: COLORS.muted, textTransform: "uppercase" }}>Scroll</span>
//         <div className="scroll-line" />
//       </div>
//     </section>
//   );
// }
//
// // ─── Marquee ──────────────────────────────────────────────────────────
// function Marquee() {
//   const items = ["Anxiety & Stress", "Depression Support", "Relationship Counseling", "Trauma & PTSD", "Marriage Therapy", "Child Psychology", "Career & Life Coaching", "Anger Management", "Sleep Disorders", "OCD & Phobias"];
//   const doubled = [...items, ...items];
//   return (
//     <div style={{ background: COLORS.deep, padding: "18px 0", overflow: "hidden", display: "flex" }}>
//       <div style={{ display: "flex", gap: 60, animation: "marquee 25s linear infinite", whiteSpace: "nowrap" }}>
//         {doubled.map((item, i) => (
//           <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontWeight: 300, color: "rgba(255,255,255,0.6)", letterSpacing: 1 }}>
//             <span style={{ width: 4, height: 4, background: COLORS.sage, borderRadius: "50%", flexShrink: 0, display: "inline-block" }} />
//             {item}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
//
// // ─── Video Section ────────────────────────────────────────────────────
// function VideoSection() {
//   return (
//     <section style={{ background: COLORS.deep, padding: "100px 60px", position: "relative", overflow: "hidden" }}>
//       <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%, rgba(139,175,142,0.12) 0%, transparent 60%)" }} />
//       <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
//         <Reveal style={{ textAlign: "center", marginBottom: 70 }}>
//           <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageLight, fontWeight: 500, marginBottom: 24 }}>Real Stories. Real Healing.</div>
//           <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 700, lineHeight: 1.1, color: "white", textAlign: "center" }}>Witness the <em style={{ fontStyle: "italic", color: COLORS.sageLight }}>Transformation</em></h2>
//         </Reveal>
//         <Reveal delay={0.1}>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
//             {[
//               { featured: true, tag: "Patient Story", title: '"I found peace I didn\'t know was possible"', src: "https://www.w3schools.com/html/mov_bbb.mp4" },
//               { featured: false, tag: "Therapist Insight", title: "Understanding anxiety in modern life", src: "https://www.w3schools.com/html/movie.mp4" },
//               { featured: false, tag: "Couples Therapy", title: "Rebuilding trust after hardship", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
//             ].map((v, i) => (
//               <div key={i} data-hover className="video-card-hover" style={{ borderRadius: 20, overflow: "hidden", position: "relative", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", transition: "transform 0.4s ease, box-shadow 0.4s ease", gridRow: v.featured ? "1/3" : "auto", gridColumn: v.featured ? "1/2" : "auto" }}>
//                 <video autoPlay muted loop playsInline style={{ width: "100%", display: "block", objectFit: "cover", height: v.featured ? 500 : 235 }}>
//                   <source src={v.src} type="video/mp4" />
//                 </video>
//                 <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,31,46,0.85) 0%, transparent 50%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 28 }}>
//                   <div style={{ display: "inline-block", padding: "4px 12px", background: "rgba(139,175,142,0.3)", border: "1px solid rgba(139,175,142,0.4)", borderRadius: 100, fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase", color: COLORS.sageLight, marginBottom: 10, width: "fit-content" }}>{v.tag}</div>
//                   <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "white", fontWeight: 400 }}>{v.title}</h3>
//                 </div>
//                 <div className="video-play-btn" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 60, height: 60, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", opacity: 0 }}>
//                   <svg viewBox="0 0 24 24" width="22" height="22" fill="white" style={{ marginLeft: 3 }}><path d="M8 5v14l11-7z" /></svg>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }
//
// // ─── How It Works ─────────────────────────────────────────────────────
// function HowItWorks() {
//   const steps = [
//     { n: "01", title: "Take the Assessment", desc: "Complete a 5-minute mental health questionnaire designed by clinical psychologists to understand your unique needs." },
//     { n: "02", title: "Get Matched", desc: "Our AI matches you with the most compatible therapist based on specialization, availability, and communication style." },
//     { n: "03", title: "Start Sessions", desc: "Connect via video, audio, or chat — on your schedule, from the comfort and privacy of your own space." },
//     { n: "04", title: "Track Your Growth", desc: "Monitor your mood, progress, and milestones with your therapist using our personalized wellness dashboard." },
//   ];
//   return (
//     <section id="howitworks" style={{ background: COLORS.warmWhite, padding: "130px 60px" }}>
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "center", maxWidth: 1200, margin: "0 auto" }}>
//         <div>
//           <Reveal><div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageDark, fontWeight: 500, marginBottom: 24 }}>Simple Process</div></Reveal>
//           <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 700, lineHeight: 1.1, color: COLORS.deep }}>Healing in <em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Four</em> Simple Steps</h2></Reveal>
//           <div style={{ marginTop: 60 }}>
//             {steps.map((s, i) => (
//               <Reveal key={i} delay={i * 0.1}>
//                 <div className="step-hover" style={{ display: "flex", gap: 28, padding: "32px 0", borderBottom: i < 3 ? `1px solid rgba(26,31,46,0.08)` : "none" }}>
//                   <div className="step-num" style={{ width: 48, height: 48, flexShrink: 0, border: `1.5px solid rgba(26,31,46,0.15)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: COLORS.deep, transition: "all 0.3s" }}>{s.n}</div>
//                   <div>
//                     <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: COLORS.deep, marginBottom: 8 }}>{s.title}</h3>
//                     <p style={{ fontSize: 15, color: COLORS.muted, lineHeight: 1.7 }}>{s.desc}</p>
//                   </div>
//                 </div>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//         <Reveal delay={0.2}>
//           <div style={{ background: "linear-gradient(135deg, #B8D4BB 0%, #8BAF8E 100%)", borderRadius: 28, height: 600, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
//             <div style={{ position: "absolute", width: 400, height: 400, background: "rgba(255,255,255,0.1)", borderRadius: "50%", top: -100, right: -100 }} />
//             <div style={{ position: "absolute", width: 200, height: 200, background: "rgba(255,255,255,0.08)", borderRadius: "50%", bottom: 40, left: 30 }} />
//             <div style={{ background: "white", borderRadius: 20, padding: 28, width: 300, boxShadow: "0 30px 60px rgba(26,31,46,0.15)", position: "relative", zIndex: 1 }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//                 <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg, #8BAF8E 0%, #4A7A52 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "white" }}>DR</div>
//                 <div>
//                   <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.deep }}>Dr. Rina Sharma</div>
//                   <div style={{ fontSize: 12, color: COLORS.muted }}>Clinical Psychologist</div>
//                 </div>
//               </div>
//               <div style={{ color: "#F59E0B", fontSize: 13, marginTop: 14 }}>★★★★★ 4.98 rating</div>
//               <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
//                 {[["them", "How have you been feeling this week?"], ["me", "Much better, I slept 8 hours last night!"], ["them", "That's wonderful progress. Let's build on that..."]].map(([who, msg], i) => (
//                   <div key={i} style={{ padding: "12px 16px", borderRadius: who === "me" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", fontSize: 13, lineHeight: 1.5, background: who === "me" ? COLORS.deep : "#F1F5F9", color: who === "me" ? "white" : COLORS.charcoal, alignSelf: who === "me" ? "flex-end" : "flex-start", maxWidth: "90%" }}>{msg}</div>
//                 ))}
//               </div>
//               <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: COLORS.sageDark, marginTop: 14 }}>
//                 <span className="online-dot" /> Dr. Rina is online now
//               </div>
//             </div>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }
//
// // ─── Features ─────────────────────────────────────────────────────────
// function Features() {
//   const cards = [
//     { icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />, title: "Video & Chat Sessions", desc: "Connect with your therapist through HD video, voice, or chat messaging — whatever feels most comfortable to you.", featured: false },
//     { icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />, title: <>AI-Powered <em style={{ color: COLORS.sageLight }}>Matching</em></>, desc: "Our proprietary algorithm analyzes 40+ factors — your personality, issues, therapist style, and preferences — to ensure your first match feels like the right match.", featured: true },
//     { icon: <path d="M18 20V10M12 20V4M6 20v-6" />, title: "Progress Tracking", desc: "Visualize your mental health journey with mood charts, session summaries, and milestone tracking.", featured: false },
//     { icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />, title: "100% Confidential", desc: "End-to-end encrypted sessions. Your conversations and data are never shared, stored, or sold to anyone.", featured: false },
//     { icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>, title: "24/7 Support", desc: "Mental health doesn't follow a schedule. Access crisis support and our wellness chatbot any time of day or night.", featured: false },
//     { icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>, title: "Group Therapy", desc: "Join moderated group sessions for shared challenges — anxiety, grief, relationships, and more in a safe community.", featured: false },
//   ];
//
//   return (
//     <section id="features" style={{ background: COLORS.bg, padding: "130px 60px" }}>
//       <div style={{ textAlign: "center", marginBottom: 80 }}>
//         <Reveal><div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageDark, fontWeight: 500, marginBottom: 24 }}>What We Offer</div></Reveal>
//         <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 700, lineHeight: 1.1, color: COLORS.deep, margin: "0 auto", textAlign: "center" }}>Everything Your <em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Mind Needs</em></h2></Reveal>
//         <Reveal delay={0.2}><p style={{ fontSize: 17, color: COLORS.muted, maxWidth: 520, margin: "20px auto 0", lineHeight: 1.7, fontWeight: 300 }}>A comprehensive mental wellness platform designed with compassion, built with science.</p></Reveal>
//       </div>
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, maxWidth: 1200, margin: "0 auto" }}>
//         {cards.map((c, i) => (
//           <Reveal key={i} delay={i * 0.1} style={{ gridColumn: c.featured ? 2 : "auto", gridRow: c.featured ? "1/3" : "auto" }}>
//             <div data-hover className="feature-card-hover" style={{ background: c.featured ? COLORS.deep : "white", borderRadius: 24, padding: c.featured ? "60px 48px" : "48px 40px", border: `1px solid rgba(26,31,46,0.06)`, transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)", position: "relative", overflow: "hidden", height: "100%" }}>
//               <div className="feature-top-bar" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 3, background: c.featured ? "linear-gradient(90deg,#B8D4BB,#E8C98A)" : "linear-gradient(90deg,#8BAF8E,#C9A96E)", transform: "scaleX(0)", transformOrigin: "left", transition: "transform 0.4s ease" }} />
//               <div style={{ width: 56, height: 56, borderRadius: 16, background: c.featured ? "rgba(139,175,142,0.2)" : "rgba(139,175,142,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
//                 <svg viewBox="0 0 24 24" width="26" height="26" stroke={c.featured ? COLORS.sageLight : COLORS.sageDark} fill="none" strokeWidth="1.5">{c.icon}</svg>
//               </div>
//               <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: c.featured ? 32 : 24, fontWeight: 700, color: c.featured ? "white" : COLORS.deep, marginBottom: 16 }}>{c.title}</h3>
//               <p style={{ fontSize: c.featured ? 16 : 15, color: c.featured ? "rgba(255,255,255,0.6)" : COLORS.muted, lineHeight: 1.75 }}>{c.desc}</p>
//             </div>
//           </Reveal>
//         ))}
//       </div>
//     </section>
//   );
// }
//
// // ─── Story Section ────────────────────────────────────────────────────
// function StorySection() {
//   return (
//     <section style={{ padding: 0 }}>
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "90vh", alignItems: "center" }}>
//         <div style={{ padding: "100px 80px" }}>
//           <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 120, fontWeight: 300, color: "rgba(139,175,142,0.15)", lineHeight: 1, marginBottom: -30 }}>01</div>
//           <Reveal><div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageDark, fontWeight: 500, marginBottom: 16 }}>Personal Therapy</div></Reveal>
//           <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, lineHeight: 1.1, color: COLORS.deep, marginBottom: 24 }}>Therapy That Fits <em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Your Life</em></h2></Reveal>
//           <Reveal delay={0.2}><p style={{ fontSize: 17, color: COLORS.muted, lineHeight: 1.8, fontWeight: 300, maxWidth: 440 }}>Whether you're dealing with anxiety, depression, life transitions, or simply want to grow — our therapists meet you exactly where you are. No judgment. No waiting rooms. No pressure.</p></Reveal>
//           <Reveal delay={0.3}><a href="#" className="story-link-hover" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 36, fontSize: 14, fontWeight: 500, color: COLORS.deep, textDecoration: "none", borderBottom: `1px solid ${COLORS.deep}`, paddingBottom: 4, transition: "all 0.3s" }}>Explore 1:1 Therapy →</a></Reveal>
//         </div>
//         <div style={{ height: "90vh", background: "linear-gradient(135deg,#E8F4E8,#C8E0CA)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
//           <div style={{ width: 340, position: "relative" }}>
//             <div style={{ background: "white", borderRadius: 24, padding: 32, boxShadow: "0 30px 60px rgba(26,31,46,0.12)" }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
//                 <div style={{ width: 46, height: 46, borderRadius: "50%", background: "linear-gradient(135deg,#A8D5A2,#5A9E65)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🧘</div>
//                 <div><div style={{ fontWeight: 600, fontSize: 15, color: COLORS.deep }}>Wellness Score</div><div style={{ fontSize: 12, color: COLORS.muted }}>Last 30 days</div></div>
//               </div>
//               {[["Mood Average", 82, "8.2", null], ["Sleep Quality", 74, "7.4", null], ["Anxiety Level", 28, "Low ↓", "#16A34A"]].map(([label, pct, val, color]) => (
//                 <div key={label as string} style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", borderTop: `1px solid rgba(26,31,46,0.06)`, alignItems: "center" }}>
//                   <div style={{ flex: 1 }}>
//                     <div style={{ fontSize: 13, color: COLORS.muted }}>{label as string}</div>
//                     <div style={{ height: 4, background: "rgba(26,31,46,0.08)", borderRadius: 100, marginTop: 6, overflow: "hidden" }}>
//                       <div style={{ height: "100%", borderRadius: 100, background: color ? `linear-gradient(90deg,#22C55E,#16A34A)` : `linear-gradient(90deg,${COLORS.sage},${COLORS.sageDark})`, width: `${pct}%` }} />
//                     </div>
//                   </div>
//                   <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: (color as string) || COLORS.deep, marginLeft: 16 }}>{val as string}</div>
//                 </div>
//               ))}
//             </div>
//             <div style={{ position: "absolute", top: -20, right: -30, background: "white", borderRadius: 16, padding: "14px 20px", boxShadow: "0 20px 40px rgba(26,31,46,0.12)", display: "flex", alignItems: "center", gap: 10 }}>
//               <span style={{ fontSize: 20 }}>🏆</span>
//               <div><div style={{ fontWeight: 600, fontSize: 13, color: COLORS.deep }}>4-Week Streak!</div><div style={{ fontSize: 11, color: COLORS.muted }}>Consistent sessions</div></div>
//             </div>
//           </div>
//         </div>
//       </div>
//
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "90vh", alignItems: "center" }}>
//         <div style={{ height: "90vh", background: "linear-gradient(135deg,#F5EDE0,#E8D4B8)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
//           <div style={{ width: 340, position: "relative" }}>
//             <div style={{ background: "white", borderRadius: 24, padding: 32, boxShadow: "0 30px 60px rgba(26,31,46,0.12)" }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 0 }}>
//                 <div style={{ width: 46, height: 46, borderRadius: "50%", background: "linear-gradient(135deg,#F5C882,#E0A030)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>💑</div>
//                 <div><div style={{ fontWeight: 600, fontSize: 15, color: COLORS.deep }}>Couples Session</div><div style={{ fontSize: 12, color: COLORS.muted }}>with Dr. Priya Mehta</div></div>
//               </div>
//               <div style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.6, padding: "14px 0", borderTop: `1px solid rgba(26,31,46,0.06)`, marginTop: 14 }}>"Today's focus: rebuilding emotional safety and communication patterns."</div>
//               <div style={{ display: "flex", gap: 8 }}>
//                 {[["Partner A", "84%"], ["Partner B", "79%"]].map(([p, v]) => (
//                   <div key={p} style={{ flex: 1, background: "#F0FDF4", borderRadius: 10, padding: 10, textAlign: "center" }}>
//                     <div style={{ fontSize: 11, color: "#16A34A", fontWeight: 500 }}>{p}</div>
//                     <div style={{ fontSize: 20, fontWeight: 600, color: COLORS.deep, fontFamily: "'Cormorant Garamond', serif" }}>{v}</div>
//                     <div style={{ fontSize: 11, color: COLORS.muted }}>Openness</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div style={{ position: "absolute", bottom: -20, left: -20, background: "white", borderRadius: 16, padding: "14px 20px", boxShadow: "0 20px 40px rgba(26,31,46,0.12)", display: "flex", alignItems: "center", gap: 10 }}>
//               <span style={{ fontSize: 20 }}>❤️</span>
//               <div><div style={{ fontWeight: 600, fontSize: 13, color: COLORS.deep }}>Together 2 months</div><div style={{ fontSize: 11, color: COLORS.muted }}>6 sessions completed</div></div>
//             </div>
//           </div>
//         </div>
//         <div style={{ padding: "100px 80px" }}>
//           <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 120, fontWeight: 300, color: "rgba(139,175,142,0.15)", lineHeight: 1, marginBottom: -30 }}>02</div>
//           <Reveal><div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageDark, fontWeight: 500, marginBottom: 16 }}>Relationship Therapy</div></Reveal>
//           <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, lineHeight: 1.1, color: COLORS.deep, marginBottom: 24 }}>Strengthen Every <em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Bond You Have</em></h2></Reveal>
//           <Reveal delay={0.2}><p style={{ fontSize: 17, color: COLORS.muted, lineHeight: 1.8, fontWeight: 300, maxWidth: 440 }}>Marriage stress, communication breakdowns, trust issues — our certified couples therapists help you navigate the complexities of relationships with evidence-based approaches.</p></Reveal>
//           <Reveal delay={0.3}><a href="#" className="story-link-hover" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 36, fontSize: 14, fontWeight: 500, color: COLORS.deep, textDecoration: "none", borderBottom: `1px solid ${COLORS.deep}`, paddingBottom: 4, transition: "all 0.3s" }}>Explore Couples Therapy →</a></Reveal>
//         </div>
//       </div>
//
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "90vh", alignItems: "center" }}>
//         <div style={{ padding: "100px 80px" }}>
//           <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 120, fontWeight: 300, color: "rgba(139,175,142,0.15)", lineHeight: 1, marginBottom: -30 }}>03</div>
//           <Reveal><div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageDark, fontWeight: 500, marginBottom: 16 }}>Self-Care Tools</div></Reveal>
//           <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, lineHeight: 1.1, color: COLORS.deep, marginBottom: 24 }}>Wellness Between <em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Every Session</em></h2></Reveal>
//           <Reveal delay={0.2}><p style={{ fontSize: 17, color: COLORS.muted, lineHeight: 1.8, fontWeight: 300, maxWidth: 440 }}>Access guided meditations, breathing exercises, mood journals, and CBT-based self-help tools — all personalized by your therapist to support your ongoing growth.</p></Reveal>
//           <Reveal delay={0.3}><a href="#" className="story-link-hover" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 36, fontSize: 14, fontWeight: 500, color: COLORS.deep, textDecoration: "none", borderBottom: `1px solid ${COLORS.deep}`, paddingBottom: 4, transition: "all 0.3s" }}>Explore Wellness Tools →</a></Reveal>
//         </div>
//         <div style={{ height: "90vh", background: "linear-gradient(135deg,#E8EDF5,#C8D4E8)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
//           <div style={{ width: 340 }}>
//             <div style={{ background: "white", borderRadius: 24, padding: 32, boxShadow: "0 30px 60px rgba(26,31,46,0.12)" }}>
//               <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.muted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 18 }}>Today's Check-In</div>
//               <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
//                 <div style={{ padding: "8px 14px", borderRadius: 100, background: "rgba(139,175,142,0.12)", border: `1px solid rgba(139,175,142,0.3)`, fontSize: 13, color: COLORS.sageDark }}>😌 Calm</div>
//                 <div style={{ padding: "8px 14px", borderRadius: 100, background: "#EFF6FF", border: "1px solid #BFDBFE", fontSize: 13, color: "#3B82F6" }}>🧠 Focused</div>
//                 <div style={{ padding: "8px 14px", borderRadius: 100, background: "#FFF7ED", border: "1px solid #FED7AA", fontSize: 13, color: "#EA580C" }}>😴 Tired</div>
//               </div>
//               <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 12 }}>Recommended for you:</div>
//               {[["🌿", "5-Min Breathing", "Box breathing technique", "linear-gradient(135deg,#E8F4E8,#C8E0CA)", COLORS.sageDark], ["📔", "Mood Journal", "3-min daily reflection", "linear-gradient(135deg,#EFF6FF,#DBEAFE)", "#3B82F6"]].map(([icon, title, sub, bg, subColor]) => (
//                 <div key={title as string} style={{ background: bg as string, borderRadius: 14, padding: 16, display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
//                   <span style={{ fontSize: 28 }}>{icon as string}</span>
//                   <div><div style={{ fontSize: 14, fontWeight: 600, color: COLORS.deep }}>{title as string}</div><div style={{ fontSize: 12, color: subColor as string }}>{sub as string}</div></div>
//                   <div style={{ marginLeft: "auto", width: 36, height: 36, background: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(26,31,46,0.1)" }}>▶</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
//
// // ─── Therapists ───────────────────────────────────────────────────────
// function Therapists() {
//   const navigate = useNavigate();
//   const therapists = [
//     { name: "Dr. Poonam Tyagi", specialty: "Clinical Psychology", rating: "4.98 (312 reviews)", tags: ["Anxiety", "Depression", "Trauma"], bg: "linear-gradient(135deg,#C8E0C8,#8BB88B)", emoji: "👩‍⚕️" },
//     { name: "Dr. Arjun Kapoor", specialty: "Couples & Family Therapy", rating: "4.95 (278 reviews)", tags: ["Marriage", "Relationships", "Grief"], bg: "linear-gradient(135deg,#E0D0C0,#C0A080)", emoji: "👨‍⚕️" },
//     { name: "Dr. Sneha Verma", specialty: "Child & Adolescent Psychology", rating: "4.97 (195 reviews)", tags: ["Children", "ADHD", "Teen Issues"], bg: "linear-gradient(135deg,#C8D4E8,#8898C8)", emoji: "👩‍⚕️" },
//     { name: "Dr. Rahul Mishra", specialty: "Cognitive Behavioral Therapy", rating: "4.96 (341 reviews)", tags: ["OCD", "Phobias", "Stress"], bg: "linear-gradient(135deg,#E0C8D8,#C090A8)", emoji: "👨‍⚕️" },
//   ];
//   return (
//     <section id="therapists" style={{ background: COLORS.cream, padding: "130px 60px" }}>
//       <div style={{ textAlign: "center", marginBottom: 70 }}>
//         <Reveal><div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageDark, fontWeight: 500, marginBottom: 24 }}>Our Experts</div></Reveal>
//         <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 700, lineHeight: 1.1, color: COLORS.deep, margin: "0 auto", textAlign: "center" }}>Meet Your <em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Healers</em></h2></Reveal>
//         <Reveal delay={0.2}><p style={{ fontSize: 17, color: COLORS.muted, marginTop: 16 }}>200+ licensed psychologists, therapists & counselors, each with 5+ years of clinical experience.</p></Reveal>
//       </div>
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, maxWidth: 1200, margin: "0 auto" }}>
//         {therapists.map((t, i) => (
//           <Reveal key={i} delay={i * 0.1}>
//             <div data-hover className="therapist-card-hover" style={{ background: "white", borderRadius: 24, overflow: "hidden", transition: "all 0.4s ease", border: `1px solid rgba(26,31,46,0.06)` }}>
//               <div style={{ height: 200, background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64, position: "relative" }}>
//                 <span>{t.emoji}</span>
//                 <div style={{ position: "absolute", top: 14, right: 14, background: "white", borderRadius: 100, padding: "4px 12px", fontSize: 11, color: COLORS.sageDark, fontWeight: 500, display: "flex", alignItems: "center", gap: 5 }}>
//                   <span style={{ width: 6, height: 6, background: "#22C55E", borderRadius: "50%", display: "inline-block" }} /> Online
//                 </div>
//               </div>
//               <div style={{ padding: 24 }}>
//                 <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: COLORS.deep }}>{t.name}</h3>
//                 <div style={{ fontSize: 13, color: COLORS.sageDark, fontWeight: 500, marginTop: 4 }}>{t.specialty}</div>
//                 <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 14, fontSize: 13, color: COLORS.muted }}>
//                   <span style={{ color: "#F59E0B" }}>★★★★★</span> {t.rating}
//                 </div>
//                 <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 14 }}>
//                   {t.tags.map((tag) => <span key={tag} style={{ padding: "4px 12px", borderRadius: 100, background: "rgba(139,175,142,0.1)", fontSize: 11, color: COLORS.sageDark, fontWeight: 500, border: `1px solid rgba(139,175,142,0.2)` }}>{tag}</span>)}
//                 </div>
//                 <button
//                   data-hover
//                   className="book-btn-hover"
//                   onClick={() => navigate("/signup")}
//                   style={{ display: "block", width: "100%", marginTop: 20, padding: 12, background: COLORS.deep, color: "white", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 500, cursor: "none", transition: "all 0.3s", fontFamily: "'DM Sans', sans-serif" }}
//                 >
//                   Book Session
//                 </button>
//               </div>
//             </div>
//           </Reveal>
//         ))}
//       </div>
//     </section>
//   );
// }
//
// // ─── Testimonials ─────────────────────────────────────────────────────
// function Testimonials() {
//   const testimonials = [
//     { text: "After struggling with anxiety for 6 years, I finally found a therapist who truly understands me. PsychoCare changed my life completely.", name: "Rohan Sharma", title: "Software Engineer, Delhi", emoji: "🧑", featured: false },
//     { text: "My husband and I were on the verge of separation. Three months of couples therapy on PsychoCare rebuilt everything we thought we had lost.", name: "Priya & Vikram Malhotra", title: "Married Couple, Mumbai", emoji: "👩", featured: true },
//     { text: "The self-care tools and journaling features kept me grounded between sessions. This platform truly cares about holistic healing.", name: "Ananya Singh", title: "College Student, Bengaluru", emoji: "👩", featured: false },
//   ];
//   return (
//     <section style={{ background: COLORS.deep, padding: "130px 60px" }}>
//       <div style={{ textAlign: "center", marginBottom: 80 }}>
//         <Reveal><div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageLight, fontWeight: 500, marginBottom: 24 }}>What People Say</div></Reveal>
//         <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 700, lineHeight: 1.1, color: "white", margin: "0 auto", textAlign: "center" }}>Stories of <em style={{ fontStyle: "italic", color: COLORS.sageLight }}>Real Healing</em></h2></Reveal>
//       </div>
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, maxWidth: 1200, margin: "0 auto" }}>
//         {testimonials.map((t, i) => (
//           <Reveal key={i} delay={i * 0.1}>
//             <div data-hover className="testimonial-card-hover" style={{ background: t.featured ? COLORS.sageDark : "rgba(255,255,255,0.05)", border: t.featured ? "none" : "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: 40, transition: "all 0.4s" }}>
//               <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>{[...Array(5)].map((_, j) => <span key={j} style={{ color: "#F59E0B", fontSize: 14 }}>★</span>)}</div>
//               <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 80, lineHeight: 0.5, color: "rgba(255,255,255,0.15)", marginBottom: 20, display: "block" }}>"</span>
//               <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: t.featured ? 22 : 20, lineHeight: 1.6, color: t.featured ? "white" : "rgba(255,255,255,0.85)", fontWeight: 300, fontStyle: "italic" }}>{t.text}</p>
//               <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 28, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
//                 <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{t.emoji}</div>
//                 <div><div style={{ fontSize: 14, fontWeight: 500, color: "white" }}>{t.name}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{t.title}</div></div>
//               </div>
//             </div>
//           </Reveal>
//         ))}
//       </div>
//     </section>
//   );
// }
//
// // ─── Pricing ──────────────────────────────────────────────────────────
// function Pricing() {
//   const navigate = useNavigate();
//   const plans = [
//     { name: "Starter", price: "999", features: ["2 Sessions per month", "Text & Audio sessions", "Mood tracker", "Self-help library"], disabled: ["Video sessions", "24/7 crisis support"], popular: false },
//     { name: "Growth", price: "2,499", features: ["8 Sessions per month", "Video, Audio & Chat", "Mood & Progress tracking", "Full self-help library", "Group therapy access", "24/7 crisis support"], disabled: [], popular: true },
//     { name: "Premium", price: "4,999", features: ["Unlimited sessions", "Video, Audio & Chat", "Dedicated therapist", "Family therapy included", "Priority matching", "24/7 crisis support"], disabled: [], popular: false },
//   ];
//   return (
//     <section id="pricing" style={{ background: COLORS.warmWhite, padding: "130px 60px" }}>
//       <div style={{ textAlign: "center", marginBottom: 70 }}>
//         <Reveal><div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageDark, fontWeight: 500, marginBottom: 24 }}>Transparent Pricing</div></Reveal>
//         <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 700, lineHeight: 1.1, color: COLORS.deep, margin: "0 auto", textAlign: "center" }}>Invest in Your <em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Mind</em></h2></Reveal>
//         <Reveal delay={0.2}><p style={{ fontSize: 17, color: COLORS.muted, marginTop: 16, fontWeight: 300 }}>No hidden fees. Cancel anytime. Flexible plans that fit your life and budget.</p></Reveal>
//       </div>
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, maxWidth: 1000, margin: "0 auto", alignItems: "start" }}>
//         {plans.map((p, i) => (
//           <Reveal key={i} delay={i * 0.1}>
//             <div data-hover className={p.popular ? "popular-card-hover" : "pricing-card-hover"} style={{ background: p.popular ? COLORS.deep : "white", borderRadius: 28, padding: "48px 40px", border: p.popular ? "none" : `1px solid rgba(26,31,46,0.08)`, transition: "all 0.4s", transform: p.popular ? "scale(1.04)" : "none" }}>
//               {p.popular && <div style={{ display: "inline-block", padding: "4px 14px", background: COLORS.sage, borderRadius: 100, fontSize: 11, color: "white", fontWeight: 500, letterSpacing: "0.5px", marginBottom: 24 }}>Most Popular</div>}
//               <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: p.popular ? "white" : COLORS.deep }}>{p.name}</div>
//               <div style={{ marginTop: 24, fontFamily: "'Cormorant Garamond', serif", fontSize: 56, fontWeight: 600, color: p.popular ? "white" : COLORS.deep, lineHeight: 1 }}>
//                 <sup style={{ fontSize: 24, verticalAlign: "top", marginTop: 14, display: "inline-block" }}>₹</sup>{p.price}<sub style={{ fontSize: 16, color: p.popular ? "rgba(255,255,255,0.5)" : COLORS.muted, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>/mo</sub>
//               </div>
//               <ul style={{ marginTop: 36, listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
//                 {p.features.map((f) => <li key={f} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: p.popular ? "rgba(255,255,255,0.8)" : COLORS.charcoal }}><span style={{ color: p.popular ? COLORS.sageLight : COLORS.sageDark, fontWeight: 600 }}>✓</span> {f}</li>)}
//                 {p.disabled.map((f) => <li key={f} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: COLORS.charcoal, opacity: 0.3 }}>✗ {f}</li>)}
//               </ul>
//               <button
//                 onClick={() => navigate("/signup")}
//                 style={{ display: "block", width: "100%", marginTop: 40, padding: 16, borderRadius: 14, fontSize: 15, fontWeight: 500, textAlign: "center", cursor: "none", transition: "all 0.3s", fontFamily: "'DM Sans', sans-serif", background: p.popular ? "white" : COLORS.deep, color: p.popular ? COLORS.deep : "white", border: "none", boxSizing: "border-box" }}
//               >
//                 Get Started
//               </button>
//             </div>
//           </Reveal>
//         ))}
//       </div>
//     </section>
//   );
// }
//
// // ─── Trust Badges ─────────────────────────────────────────────────────
// function TrustBadges() {
//   const items = [["🔐", "End-to-End Encrypted"], ["🏥", "RCI Licensed Therapists"], ["📋", "HIPAA Compliant"], ["⭐", "4.9★ App Store Rating"], ["🕐", "Available 24/7"], ["🇮🇳", "Proudly Made in India"]];
//   return (
//     <section style={{ background: COLORS.bg, padding: "80px 60px" }}>
//       <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px 80px" }}>
//         {items.map(([icon, label], i) => (
//           <Reveal key={i} delay={i * 0.05}>
//             <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//               <span style={{ fontSize: 28 }}>{icon}</span>
//               <span style={{ fontSize: 14, color: COLORS.charcoal, fontWeight: 500 }}>{label}</span>
//             </div>
//           </Reveal>
//         ))}
//       </div>
//     </section>
//   );
// }
//
// // ─── FAQ ──────────────────────────────────────────────────────────────
// function FAQ() {
//   const [open, setOpen] = useState<number | null>(null);
//   const faqs = [
//     { q: "Is my information completely private?", a: "Absolutely. All sessions are end-to-end encrypted. Your data is never shared with third parties, employers, or insurance companies. We are fully HIPAA compliant and adhere to India's data protection standards." },
//     { q: "How are therapists verified?", a: "Every therapist on PsychoCare holds a valid RCI (Rehabilitation Council of India) license or equivalent certification. They undergo background verification, clinical assessment, and continuous performance monitoring based on session quality and patient outcomes." },
//     { q: "Can I switch therapists if I'm not comfortable?", a: "Yes, always. The therapeutic relationship is deeply personal. You can switch to a different therapist at any time, for any reason, with no questions asked. We'll re-match you based on your updated preferences." },
//     { q: "What if I need help between sessions?", a: "All Growth and Premium plan users have access to our 24/7 crisis support chat, moderated by trained counselors. Additionally, our AI wellness companion is available round the clock for guided breathing, journaling prompts, and coping techniques." },
//     { q: "Is PsychoCare suitable for serious mental health conditions?", a: "Yes. Our platform supports a wide range of conditions including clinical depression, PTSD, OCD, bipolar disorder, and more. For severe psychiatric conditions requiring medication, we can coordinate with psychiatrists in our extended network." },
//   ];
//   return (
//     <section id="faq" style={{ background: COLORS.warmWhite, padding: "130px 60px" }}>
//       <div style={{ textAlign: "center", marginBottom: 70 }}>
//         <Reveal><div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageDark, fontWeight: 500, marginBottom: 24 }}>Questions</div></Reveal>
//         <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 700, lineHeight: 1.1, color: COLORS.deep, margin: "0 auto", textAlign: "center" }}>Frequently Asked <em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Questions</em></h2></Reveal>
//       </div>
//       <div style={{ maxWidth: 800, margin: "0 auto" }}>
//         {faqs.map((f, i) => (
//           <div key={i} data-hover className="faq-item-cursor" onClick={() => setOpen(open === i ? null : i)} style={{ borderBottom: `1px solid rgba(26,31,46,0.1)`, padding: "28px 0" }}>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 500, color: COLORS.deep }}>
//               {f.q}
//               <div style={{ width: 36, height: 36, border: `1px solid rgba(26,31,46,0.15)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: open === i ? "white" : COLORS.charcoal, flexShrink: 0, transition: "all 0.3s", background: open === i ? COLORS.deep : "transparent", transform: open === i ? "rotate(45deg)" : "none", borderColor: open === i ? COLORS.deep : "rgba(26,31,46,0.15)" }}>+</div>
//             </div>
//             <div style={{ fontSize: 15, color: COLORS.muted, lineHeight: 1.8, maxHeight: open === i ? 300 : 0, overflow: "hidden", transition: "max-height 0.4s ease, padding 0.3s ease", paddingTop: open === i ? 20 : 0 }}>{f.a}</div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
//
// // ─── CTA ──────────────────────────────────────────────────────────────
// function CTA() {
//   const navigate = useNavigate();
//   return (
//     <section style={{ background: "linear-gradient(135deg,#4A7A52 0%,#2D4A35 100%)", textAlign: "center", padding: "160px 60px", position: "relative", overflow: "hidden" }}>
//       <div style={{ position: "absolute", width: 600, height: 600, background: "rgba(255,255,255,0.05)", borderRadius: "50%", top: -200, right: -100 }} />
//       <div style={{ position: "absolute", width: 400, height: 400, background: "rgba(255,255,255,0.04)", borderRadius: "50%", bottom: -150, left: -50 }} />
//       <Reveal><div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageLight, fontWeight: 500, marginBottom: 24 }}>Take the First Step</div></Reveal>
//       <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px,6vw,80px)", fontWeight: 700, color: "white", maxWidth: 800, margin: "0 auto", lineHeight: 1.1 }}>Your Healing Journey<br />Begins <em style={{ fontStyle: "italic", color: COLORS.goldLight }}>Today.</em></h2></Reveal>
//       <Reveal delay={0.2}><p style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", maxWidth: 480, margin: "24px auto 0", fontWeight: 300, lineHeight: 1.7 }}>Join 50,000+ people who chose to invest in their mental health. Your first session is on us.</p></Reveal>
//       <Reveal delay={0.3}>
//         <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 52, position: "relative", zIndex: 1 }}>
//           <button
//             data-hover
//             onClick={() => navigate("/signup")}
//             className="btn-white-hover"
//             style={{ background: "white", color: COLORS.sageDark, padding: "16px 42px", borderRadius: 100, fontSize: 15, fontWeight: 500, border: "none", cursor: "none", transition: "all 0.3s", fontFamily: "'DM Sans', sans-serif" }}
//           >
//             Start Free Session →
//           </button>
//           <button
//             data-hover
//             onClick={() => navigate("/login")}
//             className="btn-white-outline-hover"
//             style={{ border: "1.5px solid rgba(255,255,255,0.4)", color: "white", padding: "16px 42px", borderRadius: 100, fontSize: 15, fontWeight: 500, background: "transparent", cursor: "none", transition: "all 0.3s", fontFamily: "'DM Sans', sans-serif" }}
//           >
//             Talk to an Expert
//           </button>
//         </div>
//       </Reveal>
//     </section>
//   );
// }
//
// // ─── Footer ───────────────────────────────────────────────────────────
// function Footer() {
//   const Logo = () => (
//     <svg viewBox="0 0 40 40" fill="none" width="28" height="28">
//       <circle cx="20" cy="20" r="18" fill="#8BAF8E" opacity="0.2" />
//       <path d="M20 10 C14 10 10 14 10 19 C10 24 14 27 20 31 C26 27 30 24 30 19 C30 14 26 10 20 10Z" fill="#4A7A52" />
//       <circle cx="17" cy="18" r="2" fill="white" />
//       <circle cx="23" cy="18" r="2" fill="white" />
//       <path d="M15 24 Q20 28 25 24" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
//     </svg>
//   );
//   const cols = [
//     { title: "Platform", links: ["How it Works", "Find a Therapist", "Group Sessions", "Self-Help Tools", "Pricing"] },
//     { title: "Specialties", links: ["Anxiety & Stress", "Depression", "Relationship Issues", "Child Psychology", "Trauma & PTSD"] },
//     { title: "Company", links: ["About Us", "Our Therapists", "Blog", "Careers", "Privacy Policy"] },
//   ];
//   return (
//     <footer style={{ background: COLORS.deep, padding: "80px 60px 40px", color: "rgba(255,255,255,0.6)" }}>
//       <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 60, paddingBottom: 60, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
//         <div>
//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Logo /><span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, color: "white" }}>PsychoCare</span></div>
//           <p style={{ marginTop: 16, fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.45)", maxWidth: 300 }}>Professional mental healthcare made accessible, affordable, and deeply personal — for everyone in India and beyond.</p>
//           <div style={{ marginTop: 24, fontSize: 14 }}>
//             <div style={{ marginBottom: 8 }}>📧 <a href="mailto:drpoonamtyagi@wred.com" style={{ color: COLORS.sageLight, textDecoration: "none" }}>drpoonamtyagi@wred.com</a></div>
//             <div style={{ marginBottom: 8 }}>📞 <a href="tel:+918218403266" style={{ color: COLORS.sageLight, textDecoration: "none" }}>+91 82184 03266</a></div>
//             <div>🏢 Wred Software Solutions Pvt. Ltd.</div>
//           </div>
//         </div>
//         {cols.map((col) => (
//           <div key={col.title}>
//             <h4 style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>{col.title}</h4>
//             <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
//               {col.links.map((link) => <li key={link}><a href="#" className="footer-link-hover" style={{ textDecoration: "none", fontSize: 14, color: "rgba(255,255,255,0.6)", transition: "color 0.3s" }}>{link}</a></li>)}
//             </ul>
//           </div>
//         ))}
//       </div>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 40, fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
//         <div>© 2026 PsychoCare. All rights reserved.</div>
//         <div style={{ color: "rgba(255,255,255,0.4)" }}>Designed & Developed by <strong style={{ color: "rgba(255,255,255,0.6)" }}>Wred Software Solutions Pvt. Ltd.</strong></div>
//         <div style={{ display: "flex", gap: 20 }}>
//           {["Privacy", "Terms", "Cookies"].map((l) => <a key={l} href="#" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{l}</a>)}
//         </div>
//       </div>
//     </footer>
//   );
// }
//
// // ─── Main Export ──────────────────────────────────────────────────────
// export default function LandingPage() {
//   const getStartedRef = useRef<HTMLDivElement>(null);
//
//   return (
//     <div style={styles.body}>
//       <CustomCursor />
//       <Navbar getStartedRef={getStartedRef} />
//       <Hero />
//       <Marquee />
//       <VideoSection />
//       <HowItWorks />
//       <Features />
//       <StorySection />
//       <Therapists />
//       <Testimonials />
//       <Pricing />
//       <TrustBadges />
//       <FAQ />
//       <CTA />
//       <Footer />
//     </div>
//   );
// }
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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

const styles = {
  body: {
    fontFamily: "'DM Sans', sans-serif",
    background: COLORS.bg,
    color: COLORS.deep,
    overflowX: "hidden" as const,
    cursor: "none",
    margin: 0,
    padding: 0,
  },
};

// ─── Custom Cursor ───────────────────────────────────────────────────
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    document.addEventListener("mousemove", onMove);

    const animate = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + "px";
        ringRef.current.style.top = ringPos.current.y + "px";
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const hoverEls = document.querySelectorAll("a, button, [data-hover]");
    const onEnter = () => {
      if (cursorRef.current) cursorRef.current.style.transform = "translate(-50%,-50%) scale(2)";
      if (ringRef.current) {
        ringRef.current.style.transform = "translate(-50%,-50%) scale(1.5)";
        ringRef.current.style.opacity = "0.5";
      }
    };
    const onLeave = () => {
      if (cursorRef.current) cursorRef.current.style.transform = "translate(-50%,-50%) scale(1)";
      if (ringRef.current) {
        ringRef.current.style.transform = "translate(-50%,-50%) scale(1)";
        ringRef.current.style.opacity = "1";
      }
    };
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} style={{ width: 12, height: 12, background: COLORS.sageDark, borderRadius: "50%", position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 99999, transition: "transform 0.15s ease, opacity 0.2s", transform: "translate(-50%,-50%)" }} />
      <div ref={ringRef} style={{ width: 40, height: 40, border: `1.5px solid ${COLORS.sage}`, borderRadius: "50%", position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 99998, transition: "transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.3s", transform: "translate(-50%,-50%)" }} />
    </>
  );
}

// ─── Scroll Reveal Hook ───────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}

function Reveal({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

// ─── useIsMobile hook ─────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

function useIsTablet(breakpoint = 1024) {
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const check = () => setIsTablet(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isTablet;
}

// ─── Navbar ───────────────────────────────────────────────────────────
function Navbar({ getStartedRef }: { getStartedRef: React.RefObject<HTMLDivElement> }) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownHighlight, setDropdownHighlight] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile(768);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    (window as any).__highlightGetStarted = () => {
      setDropdownHighlight(true);
      setDropdownOpen(true);
      setTimeout(() => setDropdownHighlight(false), 1800);
    };
  }, []);

  const Logo = () => (
    <svg viewBox="0 0 40 40" fill="none" width="32" height="32">
      <circle cx="20" cy="20" r="18" fill="#8BAF8E" opacity="0.2" />
      <path d="M20 10 C14 10 10 14 10 19 C10 24 14 27 20 31 C26 27 30 24 30 19 C30 14 26 10 20 10Z" fill="#4A7A52" />
      <circle cx="17" cy="18" r="2" fill="white" />
      <circle cx="23" cy="18" r="2" fill="white" />
      <path d="M15 24 Q20 28 25 24" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );

  const dropdownItems = [
    { label: "User", icon: "👤", route: "/signup", desc: "Patient / Client" },
    { label: "Therapist", icon: "🩺", route: "/therapist/signup", desc: "Mental Health Professional" },
    { label: "Admin", icon: "🛡️", route: "/admin/login", desc: "Platform Administrator" },
  ];

  return (
    <>
      <style>{`
        @keyframes dropdownIn { from{opacity:0;transform:translateY(-10px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        .mob-menu-link { display:block; padding:14px 0; font-size:16px; font-weight:400; color:${COLORS.charcoal}; text-decoration:none; border-bottom:1px solid rgba(26,31,46,0.07); transition:color 0.2s; }
        .mob-menu-link:hover { color:${COLORS.sageDark}; }
      `}</style>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "space-between", padding: scrolled ? `16px ${isMobile ? "20px" : "60px"}` : `22px ${isMobile ? "20px" : "60px"}`, transition: "all 0.4s ease", background: scrolled ? "rgba(248,245,239,0.92)" : mobileMenuOpen ? "rgba(248,245,239,0.98)" : "transparent", backdropFilter: scrolled || mobileMenuOpen ? "blur(24px)" : "none", borderBottom: scrolled ? `1px solid rgba(139,175,142,0.2)` : "none" }}>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: COLORS.deep, letterSpacing: "0.5px" }}>PsychoCare</span>
        </div>

        {/* Desktop nav links */}
        {!isMobile && (
          <ul style={{ display: "flex", gap: 40, listStyle: "none", margin: 0, padding: 0 }}>
            {["Features", "Therapists", "How it Works", "Pricing", "FAQ"].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase().replace(/ /g, "")}`} style={{ textDecoration: "none", fontSize: 14, fontWeight: 400, color: COLORS.charcoal, letterSpacing: "0.3px" }}>{item}</a>
              </li>
            ))}
          </ul>
        )}

        {/* Desktop CTA */}
        {!isMobile ? (
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <button onClick={() => navigate("/login")} style={{ fontSize: 14, color: COLORS.charcoal, background: "transparent", border: "1px solid transparent", borderRadius: 100, padding: "8px 20px", cursor: "none", transition: "all 0.3s", fontFamily: "'DM Sans', sans-serif" }}>Sign In</button>
            <div ref={dropdownRef} style={{ position: "relative" }}>
              <button onClick={() => setDropdownOpen((v) => !v)} style={{ fontSize: 14, color: "white", background: dropdownHighlight ? `linear-gradient(135deg, ${COLORS.sageDark}, ${COLORS.sage})` : COLORS.deep, border: dropdownHighlight ? `2px solid ${COLORS.goldLight}` : "2px solid transparent", padding: "10px 26px", borderRadius: 100, cursor: "none", letterSpacing: "0.3px", transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)", fontFamily: "'DM Sans', sans-serif", boxShadow: dropdownHighlight ? `0 0 0 4px rgba(139,175,142,0.3), 0 8px 32px rgba(74,122,82,0.35)` : "none", transform: dropdownHighlight ? "scale(1.06)" : "scale(1)", display: "flex", alignItems: "center", gap: 6 }}>
                Get Started
                <span style={{ display: "inline-block", transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease", fontSize: 10 }}>▼</span>
              </button>
              {dropdownOpen && (
                <div style={{ position: "absolute", top: "calc(100% + 12px)", right: 0, background: "white", borderRadius: 18, boxShadow: "0 20px 60px rgba(26,31,46,0.18), 0 4px 16px rgba(26,31,46,0.08)", border: `1px solid rgba(139,175,142,0.2)`, overflow: "hidden", minWidth: 230, animation: "dropdownIn 0.25s cubic-bezier(0.25,0.46,0.45,0.94) forwards", zIndex: 2000 }}>
                  <div style={{ padding: "10px 0" }}>
                    <div style={{ padding: "8px 20px 12px", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: COLORS.muted, borderBottom: `1px solid rgba(26,31,46,0.06)`, marginBottom: 6 }}>Register as</div>
                    {dropdownItems.map((item) => (
                      <button key={item.label} onClick={() => { setDropdownOpen(false); navigate(item.route); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "12px 20px", background: "transparent", border: "none", cursor: "none", textAlign: "left", transition: "background 0.2s", fontFamily: "'DM Sans', sans-serif" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(139,175,142,0.08)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                        <div style={{ width: 38, height: 38, borderRadius: 12, background: "linear-gradient(135deg, rgba(139,175,142,0.15), rgba(74,122,82,0.08))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.deep }}>{item.label}</div>
                          <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 1 }}>{item.desc}</div>
                        </div>
                        <div style={{ marginLeft: "auto", color: COLORS.muted, fontSize: 12 }}>→</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Mobile hamburger */
          <button onClick={() => setMobileMenuOpen(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: COLORS.deep, padding: "4px 8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        )}
      </nav>

      {/* Mobile menu drawer */}
      {isMobile && mobileMenuOpen && (
        <div style={{ position: "fixed", top: 64, left: 0, right: 0, bottom: 0, background: "rgba(248,245,239,0.98)", backdropFilter: "blur(24px)", zIndex: 999, padding: "24px 24px", overflowY: "auto" }}>
          <div style={{ marginBottom: 28 }}>
            {["Features", "Therapists", "How it Works", "Pricing", "FAQ"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, "")}`} className="mob-menu-link" onClick={() => setMobileMenuOpen(false)}>{item}</a>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button onClick={() => { navigate("/login"); setMobileMenuOpen(false); }} style={{ padding: "14px", borderRadius: 100, fontSize: 15, fontWeight: 500, background: "transparent", border: `1.5px solid rgba(26,31,46,0.2)`, color: COLORS.deep, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Sign In</button>
            <div style={{ height: 1, background: "rgba(26,31,46,0.08)", margin: "4px 0" }} />
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: COLORS.muted, marginBottom: 4 }}>Register as</div>
            {dropdownItems.map((item) => (
              <button key={item.label} onClick={() => { navigate(item.route); setMobileMenuOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: "white", border: `1px solid rgba(139,175,142,0.2)`, borderRadius: 16, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", textAlign: "left" }}>
                <div style={{ width: 38, height: 38, borderRadius: 12, background: "linear-gradient(135deg, rgba(139,175,142,0.15), rgba(74,122,82,0.08))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.deep }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: COLORS.muted }}>{item.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────
function Hero() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleBeginJourney = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      if ((window as any).__highlightGetStarted) (window as any).__highlightGetStarted();
    }, 400);
  };

  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: isMobile ? "140px 24px 80px" : "160px 40px 100px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,175,142,0.15) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(201,169,110,0.1) 0%, transparent 60%)" }} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; cursor:none !important; }
        html { scroll-behavior: smooth; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes scrollLine { 0%{transform:scaleY(0);transform-origin:top} 50%{transform:scaleY(1);transform-origin:top} 51%{transform-origin:bottom} 100%{transform:scaleY(0);transform-origin:bottom} }
        .anim-hero-tag { opacity:0; animation: fadeUp 0.8s ease 0.2s forwards; }
        .anim-hero-h1 { opacity:0; animation: fadeUp 0.9s ease 0.4s forwards; }
        .anim-hero-sub { opacity:0; animation: fadeUp 0.9s ease 0.6s forwards; }
        .anim-hero-actions { opacity:0; animation: fadeUp 0.9s ease 0.8s forwards; }
        .anim-hero-stats { opacity:0; animation: fadeUp 0.9s ease 1s forwards; }
        .anim-scroll-ind { opacity:0; animation: fadeUp 1s ease 1.4s forwards; }
        .pulse-dot { animation: pulse 2s infinite; }
        .online-dot { width:8px;height:8px;background:#22C55E;border-radius:50%; animation:pulse 2s infinite; display:inline-block; }
        .scroll-line { width:1px;height:50px;background:linear-gradient(to bottom, #8BAF8E, transparent); animation:scrollLine 2s ease-in-out infinite; }
        .btn-dark-hover:hover { background:#4A7A52 !important; transform:translateY(-2px); box-shadow:0 20px 40px rgba(26,31,46,0.2); }
        .btn-outline-hover:hover { border-color:#1A1F2E !important; background:rgba(26,31,46,0.04) !important; }
        .feature-card-hover:hover { transform:translateY(-8px); box-shadow:0 40px 80px rgba(26,31,46,0.1); border-color:transparent !important; }
        .feature-card-hover:hover .feature-top-bar { transform:scaleX(1) !important; }
        .therapist-card-hover:hover { transform:translateY(-8px); box-shadow:0 30px 60px rgba(26,31,46,0.1); }
        .testimonial-card-hover:hover { background:rgba(255,255,255,0.08) !important; transform:translateY(-4px); }
        .pricing-card-hover:hover { transform:translateY(-6px); box-shadow:0 30px 60px rgba(26,31,46,0.08); }
        .popular-card-hover:hover { transform:scale(1.04) translateY(-6px) !important; }
        .video-card-hover:hover { transform:translateY(-4px); box-shadow:0 30px 60px rgba(0,0,0,0.3); }
        .video-card-hover:hover .video-play-btn { opacity:1 !important; }
        .step-hover:hover .step-num { background:#1A1F2E !important; color:white !important; }
        .book-btn-hover:hover { background:#4A7A52 !important; }
        .story-link-hover:hover { color:#4A7A52 !important; border-color:#4A7A52 !important; gap:16px !important; }
        .btn-white-hover:hover { transform:translateY(-2px); box-shadow:0 20px 40px rgba(0,0,0,0.2); }
        .btn-white-outline-hover:hover { background:rgba(255,255,255,0.1) !important; border-color:white !important; }
        .footer-link-hover:hover { color:white !important; }
        .plan-cta-outline:hover { border-color:#1A1F2E !important; background:rgba(26,31,46,0.04) !important; }
        .plan-cta-solid:hover { background:#F5F0E8 !important; }
        .plan-cta-dark:hover { background:#4A7A52 !important; }
        .faq-item-cursor { cursor:none; }
        .begin-btn:hover { background:#4A7A52 !important; transform:translateY(-2px); box-shadow:0 20px 40px rgba(26,31,46,0.2); }
      `}</style>

      <div className="anim-hero-tag" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", border: `1px solid rgba(139,175,142,0.4)`, borderRadius: 100, fontSize: 12, fontWeight: 500, color: COLORS.sageDark, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 40, background: "rgba(139,175,142,0.08)" }}>
        <span className="pulse-dot" style={{ width: 6, height: 6, background: COLORS.sage, borderRadius: "50%", display: "inline-block" }} />
        {isMobile ? "Trusted by 50,000+ in India" : "Trusted by 50,000+ people across India"}
      </div>

      <h1 className="anim-hero-h1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 8vw, 110px)", fontWeight: 900, lineHeight: 1.0, color: COLORS.deep, maxWidth: 1000, position: "relative", zIndex: 1 }}>
        Your Mind Deserves<br /><em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Expert Care.</em>
      </h1>

      <p className="anim-hero-sub" style={{ fontSize: isMobile ? 16 : 18, color: COLORS.muted, maxWidth: 520, margin: "32px auto 0", lineHeight: 1.7, fontWeight: 300, padding: isMobile ? "0 8px" : 0 }}>
        Connect with certified psychologists, therapists & counselors — privately, confidentially, from anywhere.
      </p>

      <div className="anim-hero-actions" style={{ display: "flex", gap: 12, marginTop: 52, position: "relative", zIndex: 1, flexWrap: "wrap", justifyContent: "center" }}>
        <button onClick={handleBeginJourney} className="begin-btn" style={{ padding: isMobile ? "14px 28px" : "16px 42px", borderRadius: 100, fontSize: 15, fontWeight: 500, background: COLORS.deep, color: "white", border: "none", transition: "all 0.3s", cursor: "none", fontFamily: "'DM Sans', sans-serif" }}>
          Begin Your Journey →
        </button>
        <a href="#therapists" className="btn-outline-hover" style={{ padding: isMobile ? "14px 28px" : "16px 42px", borderRadius: 100, fontSize: 15, fontWeight: 500, textDecoration: "none", border: `1px solid rgba(26,31,46,0.2)`, color: COLORS.deep, background: "transparent", transition: "all 0.3s", cursor: "none" }}>
          Explore Therapists
        </a>
      </div>

      {/* Stats */}
      <div className="anim-hero-stats" style={{ display: "flex", gap: isMobile ? 24 : 60, marginTop: 80, flexWrap: "wrap", justifyContent: "center", padding: isMobile ? "0 16px" : 0 }}>
        {[["50K+", "Lives Changed"], ["200+", "Certified Therapists"], ["4.9★", "Average Rating"], ["98%", "Would Recommend"]].map(([num, label], i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: isMobile ? 24 : 60 }}>
            {i > 0 && !isMobile && <div style={{ width: 1, height: 60, background: "linear-gradient(to bottom, transparent, rgba(26,31,46,0.15), transparent)" }} />}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 30 : 42, fontWeight: 600, color: COLORS.deep }}>{num}</div>
              <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 4, letterSpacing: "0.5px" }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="anim-scroll-ind" style={{ position: "absolute", bottom: 50, left: "50%", transform: "translateX(-50%)", display: isMobile ? "none" : "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 11, letterSpacing: 2, color: COLORS.muted, textTransform: "uppercase" }}>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────
function Marquee() {
  const items = ["Anxiety & Stress", "Depression Support", "Relationship Counseling", "Trauma & PTSD", "Marriage Therapy", "Child Psychology", "Career & Life Coaching", "Anger Management", "Sleep Disorders", "OCD & Phobias"];
  const doubled = [...items, ...items];
  return (
    <div style={{ background: COLORS.deep, padding: "18px 0", overflow: "hidden", display: "flex" }}>
      <div style={{ display: "flex", gap: 60, animation: "marquee 25s linear infinite", whiteSpace: "nowrap" }}>
        {doubled.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontWeight: 300, color: "rgba(255,255,255,0.6)", letterSpacing: 1 }}>
            <span style={{ width: 4, height: 4, background: COLORS.sage, borderRadius: "50%", flexShrink: 0, display: "inline-block" }} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Video Section ────────────────────────────────────────────────────
function VideoSection() {
  const isMobile = useIsMobile();
  return (
    <section style={{ background: COLORS.deep, padding: isMobile ? "60px 24px" : "100px 60px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%, rgba(139,175,142,0.12) 0%, transparent 60%)" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 70 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageLight, fontWeight: 500, marginBottom: 24 }}>Real Stories. Real Healing.</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,5vw,64px)", fontWeight: 700, lineHeight: 1.1, color: "white", textAlign: "center" }}>Witness the <em style={{ fontStyle: "italic", color: COLORS.sageLight }}>Transformation</em></h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20 }}>
            {[
              { featured: !isMobile, tag: "Patient Story", title: '"I found peace I didn\'t know was possible"', src: "https://www.w3schools.com/html/mov_bbb.mp4" },
              { featured: false, tag: "Therapist Insight", title: "Understanding anxiety in modern life", src: "https://www.w3schools.com/html/movie.mp4" },
              { featured: false, tag: "Couples Therapy", title: "Rebuilding trust after hardship", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
            ].map((v, i) => (
              <div key={i} data-hover className="video-card-hover" style={{ borderRadius: 20, overflow: "hidden", position: "relative", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", transition: "transform 0.4s ease, box-shadow 0.4s ease", gridRow: v.featured ? "1/3" : "auto", gridColumn: v.featured ? "1/2" : "auto" }}>
                <video autoPlay muted loop playsInline style={{ width: "100%", display: "block", objectFit: "cover", height: isMobile ? 220 : v.featured ? 500 : 235 }}>
                  <source src={v.src} type="video/mp4" />
                </video>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,31,46,0.85) 0%, transparent 50%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 28 }}>
                  <div style={{ display: "inline-block", padding: "4px 12px", background: "rgba(139,175,142,0.3)", border: "1px solid rgba(139,175,142,0.4)", borderRadius: 100, fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase", color: COLORS.sageLight, marginBottom: 10, width: "fit-content" }}>{v.tag}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "white", fontWeight: 400 }}>{v.title}</h3>
                </div>
                <div className="video-play-btn" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 60, height: 60, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", opacity: 0 }}>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="white" style={{ marginLeft: 3 }}><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────
function HowItWorks() {
  const isMobile = useIsMobile();
  const steps = [
    { n: "01", title: "Take the Assessment", desc: "Complete a 5-minute mental health questionnaire designed by clinical psychologists to understand your unique needs." },
    { n: "02", title: "Get Matched", desc: "Our AI matches you with the most compatible therapist based on specialization, availability, and communication style." },
    { n: "03", title: "Start Sessions", desc: "Connect via video, audio, or chat — on your schedule, from the comfort and privacy of your own space." },
    { n: "04", title: "Track Your Growth", desc: "Monitor your mood, progress, and milestones with your therapist using our personalized wellness dashboard." },
  ];
  return (
    <section id="howitworks" style={{ background: COLORS.warmWhite, padding: isMobile ? "80px 24px" : "130px 60px" }}>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 60 : 100, alignItems: "center", maxWidth: 1200, margin: "0 auto" }}>
        <div>
          <Reveal><div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageDark, fontWeight: 500, marginBottom: 24 }}>Simple Process</div></Reveal>
          <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,5vw,64px)", fontWeight: 700, lineHeight: 1.1, color: COLORS.deep }}>Healing in <em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Four</em> Simple Steps</h2></Reveal>
          <div style={{ marginTop: 60 }}>
            {steps.map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="step-hover" style={{ display: "flex", gap: 28, padding: "32px 0", borderBottom: i < 3 ? `1px solid rgba(26,31,46,0.08)` : "none" }}>
                  <div className="step-num" style={{ width: 48, height: 48, flexShrink: 0, border: `1.5px solid rgba(26,31,46,0.15)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: COLORS.deep, transition: "all 0.3s" }}>{s.n}</div>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: COLORS.deep, marginBottom: 8 }}>{s.title}</h3>
                    <p style={{ fontSize: 15, color: COLORS.muted, lineHeight: 1.7 }}>{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        {!isMobile && (
          <Reveal delay={0.2}>
            <div style={{ background: "linear-gradient(135deg, #B8D4BB 0%, #8BAF8E 100%)", borderRadius: 28, height: 600, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", width: 400, height: 400, background: "rgba(255,255,255,0.1)", borderRadius: "50%", top: -100, right: -100 }} />
              <div style={{ position: "absolute", width: 200, height: 200, background: "rgba(255,255,255,0.08)", borderRadius: "50%", bottom: 40, left: 30 }} />
              <div style={{ background: "white", borderRadius: 20, padding: 28, width: 300, boxShadow: "0 30px 60px rgba(26,31,46,0.15)", position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg, #8BAF8E 0%, #4A7A52 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "white" }}>DR</div>
                  <div><div style={{ fontSize: 15, fontWeight: 600, color: COLORS.deep }}>Dr. Rina Sharma</div><div style={{ fontSize: 12, color: COLORS.muted }}>Clinical Psychologist</div></div>
                </div>
                <div style={{ color: "#F59E0B", fontSize: 13, marginTop: 14 }}>★★★★★ 4.98 rating</div>
                <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
                  {[["them", "How have you been feeling this week?"], ["me", "Much better, I slept 8 hours last night!"], ["them", "That's wonderful progress. Let's build on that..."]].map(([who, msg], i) => (
                    <div key={i} style={{ padding: "12px 16px", borderRadius: who === "me" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", fontSize: 13, lineHeight: 1.5, background: who === "me" ? COLORS.deep : "#F1F5F9", color: who === "me" ? "white" : COLORS.charcoal, alignSelf: who === "me" ? "flex-end" : "flex-start", maxWidth: "90%" }}>{msg}</div>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: COLORS.sageDark, marginTop: 14 }}>
                  <span className="online-dot" /> Dr. Rina is online now
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────
function Features() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const cards = [
    { icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />, title: "Video & Chat Sessions", desc: "Connect with your therapist through HD video, voice, or chat messaging — whatever feels most comfortable to you.", featured: false },
    { icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />, title: <>AI-Powered <em style={{ color: COLORS.sageLight }}>Matching</em></>, desc: "Our proprietary algorithm analyzes 40+ factors — your personality, issues, therapist style, and preferences — to ensure your first match feels like the right match.", featured: true },
    { icon: <path d="M18 20V10M12 20V4M6 20v-6" />, title: "Progress Tracking", desc: "Visualize your mental health journey with mood charts, session summaries, and milestone tracking.", featured: false },
    { icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />, title: "100% Confidential", desc: "End-to-end encrypted sessions. Your conversations and data are never shared, stored, or sold to anyone.", featured: false },
    { icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>, title: "24/7 Support", desc: "Mental health doesn't follow a schedule. Access crisis support and our wellness chatbot any time of day or night.", featured: false },
    { icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>, title: "Group Therapy", desc: "Join moderated group sessions for shared challenges — anxiety, grief, relationships, and more in a safe community.", featured: false },
  ];

  const gridCols = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";

  return (
    <section id="features" style={{ background: COLORS.bg, padding: isMobile ? "80px 24px" : "130px 60px" }}>
      <div style={{ textAlign: "center", marginBottom: 80 }}>
        <Reveal><div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageDark, fontWeight: 500, marginBottom: 24 }}>What We Offer</div></Reveal>
        <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,5vw,64px)", fontWeight: 700, lineHeight: 1.1, color: COLORS.deep, margin: "0 auto", textAlign: "center" }}>Everything Your <em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Mind Needs</em></h2></Reveal>
        <Reveal delay={0.2}><p style={{ fontSize: 17, color: COLORS.muted, maxWidth: 520, margin: "20px auto 0", lineHeight: 1.7, fontWeight: 300 }}>A comprehensive mental wellness platform designed with compassion, built with science.</p></Reveal>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: 24, maxWidth: 1200, margin: "0 auto" }}>
        {cards.map((c, i) => (
          <Reveal key={i} delay={i * 0.1} style={{ gridColumn: !isMobile && !isTablet && c.featured ? 2 : "auto", gridRow: !isMobile && !isTablet && c.featured ? "1/3" : "auto" }}>
            <div data-hover className="feature-card-hover" style={{ background: c.featured ? COLORS.deep : "white", borderRadius: 24, padding: c.featured ? "60px 48px" : "48px 40px", border: `1px solid rgba(26,31,46,0.06)`, transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)", position: "relative", overflow: "hidden", height: "100%" }}>
              <div className="feature-top-bar" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 3, background: c.featured ? "linear-gradient(90deg,#B8D4BB,#E8C98A)" : "linear-gradient(90deg,#8BAF8E,#C9A96E)", transform: "scaleX(0)", transformOrigin: "left", transition: "transform 0.4s ease" }} />
              <div style={{ width: 56, height: 56, borderRadius: 16, background: c.featured ? "rgba(139,175,142,0.2)" : "rgba(139,175,142,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
                <svg viewBox="0 0 24 24" width="26" height="26" stroke={c.featured ? COLORS.sageLight : COLORS.sageDark} fill="none" strokeWidth="1.5">{c.icon}</svg>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: c.featured ? 32 : 24, fontWeight: 700, color: c.featured ? "white" : COLORS.deep, marginBottom: 16 }}>{c.title}</h3>
              <p style={{ fontSize: c.featured ? 16 : 15, color: c.featured ? "rgba(255,255,255,0.6)" : COLORS.muted, lineHeight: 1.75 }}>{c.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Story Section ────────────────────────────────────────────────────
function StorySection() {
  const isMobile = useIsMobile();

  return (
    <section style={{ padding: 0 }}>
      {/* Story 1 */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", minHeight: isMobile ? "auto" : "90vh", alignItems: "center" }}>
        <div style={{ padding: isMobile ? "60px 24px" : "100px 80px" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 80 : 120, fontWeight: 300, color: "rgba(139,175,142,0.15)", lineHeight: 1, marginBottom: isMobile ? -20 : -30 }}>01</div>
          <Reveal><div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageDark, fontWeight: 500, marginBottom: 16 }}>Personal Therapy</div></Reveal>
          <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,4vw,52px)", fontWeight: 700, lineHeight: 1.1, color: COLORS.deep, marginBottom: 24 }}>Therapy That Fits <em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Your Life</em></h2></Reveal>
          <Reveal delay={0.2}><p style={{ fontSize: 17, color: COLORS.muted, lineHeight: 1.8, fontWeight: 300, maxWidth: 440 }}>Whether you're dealing with anxiety, depression, life transitions, or simply want to grow — our therapists meet you exactly where you are. No judgment. No waiting rooms. No pressure.</p></Reveal>
          <Reveal delay={0.3}><a href="#" className="story-link-hover" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 36, fontSize: 14, fontWeight: 500, color: COLORS.deep, textDecoration: "none", borderBottom: `1px solid ${COLORS.deep}`, paddingBottom: 4, transition: "all 0.3s" }}>Explore 1:1 Therapy →</a></Reveal>
        </div>
        {!isMobile && (
          <div style={{ height: "90vh", background: "linear-gradient(135deg,#E8F4E8,#C8E0CA)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <div style={{ width: 340, position: "relative" }}>
              <div style={{ background: "white", borderRadius: 24, padding: 32, boxShadow: "0 30px 60px rgba(26,31,46,0.12)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
                  <div style={{ width: 46, height: 46, borderRadius: "50%", background: "linear-gradient(135deg,#A8D5A2,#5A9E65)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🧘</div>
                  <div><div style={{ fontWeight: 600, fontSize: 15, color: COLORS.deep }}>Wellness Score</div><div style={{ fontSize: 12, color: COLORS.muted }}>Last 30 days</div></div>
                </div>
                {[["Mood Average", 82, "8.2", null], ["Sleep Quality", 74, "7.4", null], ["Anxiety Level", 28, "Low ↓", "#16A34A"]].map(([label, pct, val, color]) => (
                  <div key={label as string} style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", borderTop: `1px solid rgba(26,31,46,0.06)`, alignItems: "center" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: COLORS.muted }}>{label as string}</div>
                      <div style={{ height: 4, background: "rgba(26,31,46,0.08)", borderRadius: 100, marginTop: 6, overflow: "hidden" }}>
                        <div style={{ height: "100%", borderRadius: 100, background: color ? `linear-gradient(90deg,#22C55E,#16A34A)` : `linear-gradient(90deg,${COLORS.sage},${COLORS.sageDark})`, width: `${pct}%` }} />
                      </div>
                    </div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: (color as string) || COLORS.deep, marginLeft: 16 }}>{val as string}</div>
                  </div>
                ))}
              </div>
              <div style={{ position: "absolute", top: -20, right: -30, background: "white", borderRadius: 16, padding: "14px 20px", boxShadow: "0 20px 40px rgba(26,31,46,0.12)", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>🏆</span>
                <div><div style={{ fontWeight: 600, fontSize: 13, color: COLORS.deep }}>4-Week Streak!</div><div style={{ fontSize: 11, color: COLORS.muted }}>Consistent sessions</div></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Story 2 */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", minHeight: isMobile ? "auto" : "90vh", alignItems: "center" }}>
        {!isMobile && (
          <div style={{ height: "90vh", background: "linear-gradient(135deg,#F5EDE0,#E8D4B8)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <div style={{ width: 340, position: "relative" }}>
              <div style={{ background: "white", borderRadius: 24, padding: 32, boxShadow: "0 30px 60px rgba(26,31,46,0.12)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 0 }}>
                  <div style={{ width: 46, height: 46, borderRadius: "50%", background: "linear-gradient(135deg,#F5C882,#E0A030)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>💑</div>
                  <div><div style={{ fontWeight: 600, fontSize: 15, color: COLORS.deep }}>Couples Session</div><div style={{ fontSize: 12, color: COLORS.muted }}>with Dr. Priya Mehta</div></div>
                </div>
                <div style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.6, padding: "14px 0", borderTop: `1px solid rgba(26,31,46,0.06)`, marginTop: 14 }}>"Today's focus: rebuilding emotional safety and communication patterns."</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[["Partner A", "84%"], ["Partner B", "79%"]].map(([p, v]) => (
                    <div key={p} style={{ flex: 1, background: "#F0FDF4", borderRadius: 10, padding: 10, textAlign: "center" }}>
                      <div style={{ fontSize: 11, color: "#16A34A", fontWeight: 500 }}>{p}</div>
                      <div style={{ fontSize: 20, fontWeight: 600, color: COLORS.deep, fontFamily: "'Cormorant Garamond', serif" }}>{v}</div>
                      <div style={{ fontSize: 11, color: COLORS.muted }}>Openness</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ position: "absolute", bottom: -20, left: -20, background: "white", borderRadius: 16, padding: "14px 20px", boxShadow: "0 20px 40px rgba(26,31,46,0.12)", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>❤️</span>
                <div><div style={{ fontWeight: 600, fontSize: 13, color: COLORS.deep }}>Together 2 months</div><div style={{ fontSize: 11, color: COLORS.muted }}>6 sessions completed</div></div>
              </div>
            </div>
          </div>
        )}
        <div style={{ padding: isMobile ? "60px 24px" : "100px 80px" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 80 : 120, fontWeight: 300, color: "rgba(139,175,142,0.15)", lineHeight: 1, marginBottom: isMobile ? -20 : -30 }}>02</div>
          <Reveal><div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageDark, fontWeight: 500, marginBottom: 16 }}>Relationship Therapy</div></Reveal>
          <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,4vw,52px)", fontWeight: 700, lineHeight: 1.1, color: COLORS.deep, marginBottom: 24 }}>Strengthen Every <em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Bond You Have</em></h2></Reveal>
          <Reveal delay={0.2}><p style={{ fontSize: 17, color: COLORS.muted, lineHeight: 1.8, fontWeight: 300, maxWidth: 440 }}>Marriage stress, communication breakdowns, trust issues — our certified couples therapists help you navigate the complexities of relationships with evidence-based approaches.</p></Reveal>
          <Reveal delay={0.3}><a href="#" className="story-link-hover" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 36, fontSize: 14, fontWeight: 500, color: COLORS.deep, textDecoration: "none", borderBottom: `1px solid ${COLORS.deep}`, paddingBottom: 4, transition: "all 0.3s" }}>Explore Couples Therapy →</a></Reveal>
        </div>
      </div>

      {/* Story 3 */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", minHeight: isMobile ? "auto" : "90vh", alignItems: "center" }}>
        <div style={{ padding: isMobile ? "60px 24px" : "100px 80px" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 80 : 120, fontWeight: 300, color: "rgba(139,175,142,0.15)", lineHeight: 1, marginBottom: isMobile ? -20 : -30 }}>03</div>
          <Reveal><div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageDark, fontWeight: 500, marginBottom: 16 }}>Self-Care Tools</div></Reveal>
          <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,4vw,52px)", fontWeight: 700, lineHeight: 1.1, color: COLORS.deep, marginBottom: 24 }}>Wellness Between <em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Every Session</em></h2></Reveal>
          <Reveal delay={0.2}><p style={{ fontSize: 17, color: COLORS.muted, lineHeight: 1.8, fontWeight: 300, maxWidth: 440 }}>Access guided meditations, breathing exercises, mood journals, and CBT-based self-help tools — all personalized by your therapist to support your ongoing growth.</p></Reveal>
          <Reveal delay={0.3}><a href="#" className="story-link-hover" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 36, fontSize: 14, fontWeight: 500, color: COLORS.deep, textDecoration: "none", borderBottom: `1px solid ${COLORS.deep}`, paddingBottom: 4, transition: "all 0.3s" }}>Explore Wellness Tools →</a></Reveal>
        </div>
        {!isMobile && (
          <div style={{ height: "90vh", background: "linear-gradient(135deg,#E8EDF5,#C8D4E8)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <div style={{ width: 340 }}>
              <div style={{ background: "white", borderRadius: 24, padding: 32, boxShadow: "0 30px 60px rgba(26,31,46,0.12)" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.muted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 18 }}>Today's Check-In</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
                  <div style={{ padding: "8px 14px", borderRadius: 100, background: "rgba(139,175,142,0.12)", border: `1px solid rgba(139,175,142,0.3)`, fontSize: 13, color: COLORS.sageDark }}>😌 Calm</div>
                  <div style={{ padding: "8px 14px", borderRadius: 100, background: "#EFF6FF", border: "1px solid #BFDBFE", fontSize: 13, color: "#3B82F6" }}>🧠 Focused</div>
                  <div style={{ padding: "8px 14px", borderRadius: 100, background: "#FFF7ED", border: "1px solid #FED7AA", fontSize: 13, color: "#EA580C" }}>😴 Tired</div>
                </div>
                <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 12 }}>Recommended for you:</div>
                {[["🌿", "5-Min Breathing", "Box breathing technique", "linear-gradient(135deg,#E8F4E8,#C8E0CA)", COLORS.sageDark], ["📔", "Mood Journal", "3-min daily reflection", "linear-gradient(135deg,#EFF6FF,#DBEAFE)", "#3B82F6"]].map(([icon, title, sub, bg, subColor]) => (
                  <div key={title as string} style={{ background: bg as string, borderRadius: 14, padding: 16, display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
                    <span style={{ fontSize: 28 }}>{icon as string}</span>
                    <div><div style={{ fontSize: 14, fontWeight: 600, color: COLORS.deep }}>{title as string}</div><div style={{ fontSize: 12, color: subColor as string }}>{sub as string}</div></div>
                    <div style={{ marginLeft: "auto", width: 36, height: 36, background: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(26,31,46,0.1)" }}>▶</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Therapists ───────────────────────────────────────────────────────
function Therapists() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const therapists = [
    { name: "Dr. Poonam Tyagi", specialty: "Clinical Psychology", rating: "4.98 (312 reviews)", tags: ["Anxiety", "Depression", "Trauma"], bg: "linear-gradient(135deg,#C8E0C8,#8BB88B)", emoji: "👩‍⚕️" },
    { name: "Dr. Arjun Kapoor", specialty: "Couples & Family Therapy", rating: "4.95 (278 reviews)", tags: ["Marriage", "Relationships", "Grief"], bg: "linear-gradient(135deg,#E0D0C0,#C0A080)", emoji: "👨‍⚕️" },
    { name: "Dr. Sneha Verma", specialty: "Child & Adolescent Psychology", rating: "4.97 (195 reviews)", tags: ["Children", "ADHD", "Teen Issues"], bg: "linear-gradient(135deg,#C8D4E8,#8898C8)", emoji: "👩‍⚕️" },
    { name: "Dr. Rahul Mishra", specialty: "Cognitive Behavioral Therapy", rating: "4.96 (341 reviews)", tags: ["OCD", "Phobias", "Stress"], bg: "linear-gradient(135deg,#E0C8D8,#C090A8)", emoji: "👨‍⚕️" },
  ];

  const gridCols = isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(4, 1fr)";

  return (
    <section id="therapists" style={{ background: COLORS.cream, padding: isMobile ? "80px 24px" : "130px 60px" }}>
      <div style={{ textAlign: "center", marginBottom: 70 }}>
        <Reveal><div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageDark, fontWeight: 500, marginBottom: 24 }}>Our Experts</div></Reveal>
        <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,5vw,64px)", fontWeight: 700, lineHeight: 1.1, color: COLORS.deep, margin: "0 auto", textAlign: "center" }}>Meet Your <em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Healers</em></h2></Reveal>
        <Reveal delay={0.2}><p style={{ fontSize: 17, color: COLORS.muted, marginTop: 16 }}>200+ licensed psychologists, therapists & counselors, each with 5+ years of clinical experience.</p></Reveal>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: 24, maxWidth: 1200, margin: "0 auto" }}>
        {therapists.map((t, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div data-hover className="therapist-card-hover" style={{ background: "white", borderRadius: 24, overflow: "hidden", transition: "all 0.4s ease", border: `1px solid rgba(26,31,46,0.06)` }}>
              <div style={{ height: 200, background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64, position: "relative" }}>
                <span>{t.emoji}</span>
                <div style={{ position: "absolute", top: 14, right: 14, background: "white", borderRadius: 100, padding: "4px 12px", fontSize: 11, color: COLORS.sageDark, fontWeight: 500, display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 6, height: 6, background: "#22C55E", borderRadius: "50%", display: "inline-block" }} /> Online
                </div>
              </div>
              <div style={{ padding: 24 }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: COLORS.deep }}>{t.name}</h3>
                <div style={{ fontSize: 13, color: COLORS.sageDark, fontWeight: 500, marginTop: 4 }}>{t.specialty}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 14, fontSize: 13, color: COLORS.muted }}>
                  <span style={{ color: "#F59E0B" }}>★★★★★</span> {t.rating}
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 14 }}>
                  {t.tags.map((tag) => <span key={tag} style={{ padding: "4px 12px", borderRadius: 100, background: "rgba(139,175,142,0.1)", fontSize: 11, color: COLORS.sageDark, fontWeight: 500, border: `1px solid rgba(139,175,142,0.2)` }}>{tag}</span>)}
                </div>
                <button data-hover className="book-btn-hover" onClick={() => navigate("/signup")} style={{ display: "block", width: "100%", marginTop: 20, padding: 12, background: COLORS.deep, color: "white", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 500, cursor: "none", transition: "all 0.3s", fontFamily: "'DM Sans', sans-serif" }}>
                  Book Session
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────
function Testimonials() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const testimonials = [
    { text: "After struggling with anxiety for 6 years, I finally found a therapist who truly understands me. PsychoCare changed my life completely.", name: "Rohan Sharma", title: "Software Engineer, Delhi", emoji: "🧑", featured: false },
    { text: "My husband and I were on the verge of separation. Three months of couples therapy on PsychoCare rebuilt everything we thought we had lost.", name: "Priya & Vikram Malhotra", title: "Married Couple, Mumbai", emoji: "👩", featured: true },
    { text: "The self-care tools and journaling features kept me grounded between sessions. This platform truly cares about holistic healing.", name: "Ananya Singh", title: "College Student, Bengaluru", emoji: "👩", featured: false },
  ];

  const gridCols = isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)";

  return (
    <section style={{ background: COLORS.deep, padding: isMobile ? "80px 24px" : "130px 60px" }}>
      <div style={{ textAlign: "center", marginBottom: 80 }}>
        <Reveal><div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageLight, fontWeight: 500, marginBottom: 24 }}>What People Say</div></Reveal>
        <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,5vw,64px)", fontWeight: 700, lineHeight: 1.1, color: "white", margin: "0 auto", textAlign: "center" }}>Stories of <em style={{ fontStyle: "italic", color: COLORS.sageLight }}>Real Healing</em></h2></Reveal>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: 24, maxWidth: 1200, margin: "0 auto" }}>
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div data-hover className="testimonial-card-hover" style={{ background: t.featured ? COLORS.sageDark : "rgba(255,255,255,0.05)", border: t.featured ? "none" : "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: 40, transition: "all 0.4s" }}>
              <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>{[...Array(5)].map((_, j) => <span key={j} style={{ color: "#F59E0B", fontSize: 14 }}>★</span>)}</div>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 80, lineHeight: 0.5, color: "rgba(255,255,255,0.15)", marginBottom: 20, display: "block" }}>"</span>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: t.featured ? 22 : 20, lineHeight: 1.6, color: t.featured ? "white" : "rgba(255,255,255,0.85)", fontWeight: 300, fontStyle: "italic" }}>{t.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 28, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{t.emoji}</div>
                <div><div style={{ fontSize: 14, fontWeight: 500, color: "white" }}>{t.name}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{t.title}</div></div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────
function Pricing() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const plans = [
    { name: "Starter", price: "999", features: ["2 Sessions per month", "Text & Audio sessions", "Mood tracker", "Self-help library"], disabled: ["Video sessions", "24/7 crisis support"], popular: false },
    { name: "Growth", price: "2,499", features: ["8 Sessions per month", "Video, Audio & Chat", "Mood & Progress tracking", "Full self-help library", "Group therapy access", "24/7 crisis support"], disabled: [], popular: true },
    { name: "Premium", price: "4,999", features: ["Unlimited sessions", "Video, Audio & Chat", "Dedicated therapist", "Family therapy included", "Priority matching", "24/7 crisis support"], disabled: [], popular: false },
  ];

  const gridCols = isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)";

  return (
    <section id="pricing" style={{ background: COLORS.warmWhite, padding: isMobile ? "80px 24px" : "130px 60px" }}>
      <div style={{ textAlign: "center", marginBottom: 70 }}>
        <Reveal><div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageDark, fontWeight: 500, marginBottom: 24 }}>Transparent Pricing</div></Reveal>
        <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,5vw,64px)", fontWeight: 700, lineHeight: 1.1, color: COLORS.deep, margin: "0 auto", textAlign: "center" }}>Invest in Your <em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Mind</em></h2></Reveal>
        <Reveal delay={0.2}><p style={{ fontSize: 17, color: COLORS.muted, marginTop: 16, fontWeight: 300 }}>No hidden fees. Cancel anytime. Flexible plans that fit your life and budget.</p></Reveal>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: 24, maxWidth: 1000, margin: "0 auto", alignItems: "start" }}>
        {plans.map((p, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div data-hover className={p.popular ? "popular-card-hover" : "pricing-card-hover"} style={{ background: p.popular ? COLORS.deep : "white", borderRadius: 28, padding: isMobile ? "36px 28px" : "48px 40px", border: p.popular ? "none" : `1px solid rgba(26,31,46,0.08)`, transition: "all 0.4s", transform: p.popular && !isMobile ? "scale(1.04)" : "none" }}>
              {p.popular && <div style={{ display: "inline-block", padding: "4px 14px", background: COLORS.sage, borderRadius: 100, fontSize: 11, color: "white", fontWeight: 500, letterSpacing: "0.5px", marginBottom: 24 }}>Most Popular</div>}
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: p.popular ? "white" : COLORS.deep }}>{p.name}</div>
              <div style={{ marginTop: 24, fontFamily: "'Cormorant Garamond', serif", fontSize: 56, fontWeight: 600, color: p.popular ? "white" : COLORS.deep, lineHeight: 1 }}>
                <sup style={{ fontSize: 24, verticalAlign: "top", marginTop: 14, display: "inline-block" }}>₹</sup>{p.price}<sub style={{ fontSize: 16, color: p.popular ? "rgba(255,255,255,0.5)" : COLORS.muted, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>/mo</sub>
              </div>
              <ul style={{ marginTop: 36, listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {p.features.map((f) => <li key={f} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: p.popular ? "rgba(255,255,255,0.8)" : COLORS.charcoal }}><span style={{ color: p.popular ? COLORS.sageLight : COLORS.sageDark, fontWeight: 600 }}>✓</span> {f}</li>)}
                {p.disabled.map((f) => <li key={f} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: COLORS.charcoal, opacity: 0.3 }}>✗ {f}</li>)}
              </ul>
              <button onClick={() => navigate("/signup")} style={{ display: "block", width: "100%", marginTop: 40, padding: 16, borderRadius: 14, fontSize: 15, fontWeight: 500, textAlign: "center", cursor: "none", transition: "all 0.3s", fontFamily: "'DM Sans', sans-serif", background: p.popular ? "white" : COLORS.deep, color: p.popular ? COLORS.deep : "white", border: "none", boxSizing: "border-box" }}>
                Get Started
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Trust Badges ─────────────────────────────────────────────────────
function TrustBadges() {
  const isMobile = useIsMobile();
  const items = [["🔐", "End-to-End Encrypted"], ["🏥", "RCI Licensed Therapists"], ["📋", "HIPAA Compliant"], ["⭐", "4.9★ App Store Rating"], ["🕐", "Available 24/7"], ["🇮🇳", "Proudly Made in India"]];
  return (
    <section style={{ background: COLORS.bg, padding: isMobile ? "60px 24px" : "80px 60px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: isMobile ? "28px 40px" : "40px 80px" }}>
        {items.map(([icon, label], i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 28 }}>{icon}</span>
              <span style={{ fontSize: 14, color: COLORS.charcoal, fontWeight: 500 }}>{label}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const faqs = [
    { q: "Is my information completely private?", a: "Absolutely. All sessions are end-to-end encrypted. Your data is never shared with third parties, employers, or insurance companies. We are fully HIPAA compliant and adhere to India's data protection standards." },
    { q: "How are therapists verified?", a: "Every therapist on PsychoCare holds a valid RCI (Rehabilitation Council of India) license or equivalent certification. They undergo background verification, clinical assessment, and continuous performance monitoring based on session quality and patient outcomes." },
    { q: "Can I switch therapists if I'm not comfortable?", a: "Yes, always. The therapeutic relationship is deeply personal. You can switch to a different therapist at any time, for any reason, with no questions asked. We'll re-match you based on your updated preferences." },
    { q: "What if I need help between sessions?", a: "All Growth and Premium plan users have access to our 24/7 crisis support chat, moderated by trained counselors. Additionally, our AI wellness companion is available round the clock for guided breathing, journaling prompts, and coping techniques." },
    { q: "Is PsychoCare suitable for serious mental health conditions?", a: "Yes. Our platform supports a wide range of conditions including clinical depression, PTSD, OCD, bipolar disorder, and more. For severe psychiatric conditions requiring medication, we can coordinate with psychiatrists in our extended network." },
  ];
  return (
    <section id="faq" style={{ background: COLORS.warmWhite, padding: isMobile ? "80px 24px" : "130px 60px" }}>
      <div style={{ textAlign: "center", marginBottom: 70 }}>
        <Reveal><div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageDark, fontWeight: 500, marginBottom: 24 }}>Questions</div></Reveal>
        <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,5vw,64px)", fontWeight: 700, lineHeight: 1.1, color: COLORS.deep, margin: "0 auto", textAlign: "center" }}>Frequently Asked <em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Questions</em></h2></Reveal>
      </div>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {faqs.map((f, i) => (
          <div key={i} data-hover className="faq-item-cursor" onClick={() => setOpen(open === i ? null : i)} style={{ borderBottom: `1px solid rgba(26,31,46,0.1)`, padding: "28px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 16 : 18, fontWeight: 500, color: COLORS.deep, gap: 16 }}>
              <span>{f.q}</span>
              <div style={{ width: 36, height: 36, border: `1px solid rgba(26,31,46,0.15)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: open === i ? "white" : COLORS.charcoal, flexShrink: 0, transition: "all 0.3s", background: open === i ? COLORS.deep : "transparent", transform: open === i ? "rotate(45deg)" : "none", borderColor: open === i ? COLORS.deep : "rgba(26,31,46,0.15)" }}>+</div>
            </div>
            <div style={{ fontSize: 15, color: COLORS.muted, lineHeight: 1.8, maxHeight: open === i ? 300 : 0, overflow: "hidden", transition: "max-height 0.4s ease, padding 0.3s ease", paddingTop: open === i ? 20 : 0 }}>{f.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────
function CTA() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <section style={{ background: "linear-gradient(135deg,#4A7A52 0%,#2D4A35 100%)", textAlign: "center", padding: isMobile ? "100px 24px" : "160px 60px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 600, height: 600, background: "rgba(255,255,255,0.05)", borderRadius: "50%", top: -200, right: -100 }} />
      <div style={{ position: "absolute", width: 400, height: 400, background: "rgba(255,255,255,0.04)", borderRadius: "50%", bottom: -150, left: -50 }} />
      <Reveal><div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageLight, fontWeight: 500, marginBottom: 24 }}>Take the First Step</div></Reveal>
      <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,6vw,80px)", fontWeight: 700, color: "white", maxWidth: 800, margin: "0 auto", lineHeight: 1.1 }}>Your Healing Journey<br />Begins <em style={{ fontStyle: "italic", color: COLORS.goldLight }}>Today.</em></h2></Reveal>
      <Reveal delay={0.2}><p style={{ fontSize: isMobile ? 16 : 18, color: "rgba(255,255,255,0.7)", maxWidth: 480, margin: "24px auto 0", fontWeight: 300, lineHeight: 1.7 }}>Join 50,000+ people who chose to invest in their mental health. Your first session is on us.</p></Reveal>
      <Reveal delay={0.3}>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 52, position: "relative", zIndex: 1, flexWrap: "wrap", padding: isMobile ? "0 16px" : 0 }}>
          <button data-hover onClick={() => navigate("/signup")} className="btn-white-hover" style={{ background: "white", color: COLORS.sageDark, padding: isMobile ? "14px 28px" : "16px 42px", borderRadius: 100, fontSize: 15, fontWeight: 500, border: "none", cursor: "none", transition: "all 0.3s", fontFamily: "'DM Sans', sans-serif" }}>
            Start Free Session →
          </button>
          <button data-hover onClick={() => navigate("/login")} className="btn-white-outline-hover" style={{ border: "1.5px solid rgba(255,255,255,0.4)", color: "white", padding: isMobile ? "14px 28px" : "16px 42px", borderRadius: 100, fontSize: 15, fontWeight: 500, background: "transparent", cursor: "none", transition: "all 0.3s", fontFamily: "'DM Sans', sans-serif" }}>
            Talk to an Expert
          </button>
        </div>
      </Reveal>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────
function Footer() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const Logo = () => (
    <svg viewBox="0 0 40 40" fill="none" width="28" height="28">
      <circle cx="20" cy="20" r="18" fill="#8BAF8E" opacity="0.2" />
      <path d="M20 10 C14 10 10 14 10 19 C10 24 14 27 20 31 C26 27 30 24 30 19 C30 14 26 10 20 10Z" fill="#4A7A52" />
      <circle cx="17" cy="18" r="2" fill="white" />
      <circle cx="23" cy="18" r="2" fill="white" />
      <path d="M15 24 Q20 28 25 24" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
  const cols = [
    { title: "Platform", links: ["How it Works", "Find a Therapist", "Group Sessions", "Self-Help Tools", "Pricing"] },
    { title: "Specialties", links: ["Anxiety & Stress", "Depression", "Relationship Issues", "Child Psychology", "Trauma & PTSD"] },
    { title: "Company", links: ["About Us", "Our Therapists", "Blog", "Careers", "Privacy Policy"] },
  ];

  const gridCols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "2fr 1fr 1fr 1fr";

  return (
    <footer style={{ background: COLORS.deep, padding: isMobile ? "60px 24px 32px" : "80px 60px 40px", color: "rgba(255,255,255,0.6)" }}>
      <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: isMobile ? 40 : 60, paddingBottom: 60, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Logo /><span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, color: "white" }}>PsychoCare</span></div>
          <p style={{ marginTop: 16, fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.45)", maxWidth: 300 }}>Professional mental healthcare made accessible, affordable, and deeply personal — for everyone in India and beyond.</p>
          <div style={{ marginTop: 24, fontSize: 14 }}>
            <div style={{ marginBottom: 8 }}>📧 <a href="mailto:drpoonamtyagi@wred.com" style={{ color: COLORS.sageLight, textDecoration: "none" }}>drpoonamtyagi@wred.com</a></div>
            <div style={{ marginBottom: 8 }}>📞 <a href="tel:+918218403266" style={{ color: COLORS.sageLight, textDecoration: "none" }}>+91 82184 03266</a></div>
            <div>🏢 Wred Software Solutions Pvt. Ltd.</div>
          </div>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <h4 style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>{col.title}</h4>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {col.links.map((link) => <li key={link}><a href="#" className="footer-link-hover" style={{ textDecoration: "none", fontSize: 14, color: "rgba(255,255,255,0.6)", transition: "color 0.3s" }}>{link}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", paddingTop: 40, fontSize: 13, color: "rgba(255,255,255,0.3)", gap: isMobile ? 12 : 0 }}>
        <div>© 2026 PsychoCare. All rights reserved.</div>
        <div style={{ color: "rgba(255,255,255,0.4)" }}>Designed & Developed by <strong style={{ color: "rgba(255,255,255,0.6)" }}>Wred Software Solutions Pvt. Ltd.</strong></div>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy", "Terms", "Cookies"].map((l) => <a key={l} href="#" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{l}</a>)}
        </div>
      </div>
    </footer>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────
export default function LandingPage() {
  const getStartedRef = useRef<HTMLDivElement>(null);

  return (
    <div style={styles.body}>
      <CustomCursor />
      <Navbar getStartedRef={getStartedRef} />
      <Hero />
      <Marquee />
      <VideoSection />
      <HowItWorks />
      <Features />
      <StorySection />
      <Therapists />
      <Testimonials />
      <Pricing />
      <TrustBadges />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}