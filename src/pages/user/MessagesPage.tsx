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
  charcoal: "#3D4454",
  gold: "#C9A96E",
  muted: "#7A8090",
  bg: "#F8F5EF",
};

const FOLDERS = [
  { key: "inbox", label: "Inbox", icon: "📥" },
  { key: "starred", label: "Starred", icon: "⭐" },
  { key: "important", label: "Important", icon: "🔔" },
  { key: "sent", label: "Sent", icon: "📤" },
  { key: "trash", label: "Trash", icon: "🗑️" },
];

const API_MAP = {
  inbox: (p) => userApi.getInbox(p),
  sent: (p) => userApi.getSentMessages(p),
  starred: (p) => userApi.getStarred(p),
  important: (p) => userApi.getImportant(p),
  trash: (p) => userApi.getTrash(p),
};

export default function MessagesPage() {
  const [folder, setFolder] = useState("inbox");
  const [msgs, setMsgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [composing, setComposing] = useState(false);
  const [compose, setCompose] = useState({ recipientEmail: "", subject: "", body: "" });
  const [selected, setSelected] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => { load(); }, [folder]);

  async function load() {
    setLoading(true);
    try {
      const r = await API_MAP[folder](0);
      setMsgs(r.data.data?.content || []);
    } finally { setLoading(false); }
  }

  async function send(e) {
    e.preventDefault();
    setSending(true);
    try {
      await userApi.composeMessage(compose);
      toast.success("Message sent!");
      setComposing(false);
      setCompose({ recipientEmail: "", subject: "", body: "" });
      if (folder === "sent") load();
    } catch { toast.error("Failed to send"); }
    finally { setSending(false); }
  }

  async function toggleStar(e, id) { e.stopPropagation(); await userApi.toggleStar(id); load(); }
  async function toggleImportant(e, id) { e.stopPropagation(); await userApi.toggleImportant(id); load(); }
  async function deleteMsg(e, id) { e.stopPropagation(); await userApi.deleteMessage(id); toast.success("Moved to trash"); load(); }

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "'DM Sans', sans-serif", padding: "48px 40px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        * { box-sizing: border-box; }
        .folder-btn:hover { color: ${COLORS.deep} !important; background: ${COLORS.cream} !important; }
        .folder-btn { transition: all 0.2s ease; }
        .msg-row:hover { background: rgba(139,175,142,0.04) !important; cursor: pointer; }
        .msg-row { transition: background 0.2s ease; }
        .icon-btn:hover { background: rgba(26,31,46,0.06) !important; }
        .icon-btn { transition: all 0.15s ease; }
        .compose-btn:hover { background: ${COLORS.sageDark} !important; transform: translateY(-1px); }
        .compose-btn { transition: all 0.25s ease; }
        .send-btn:hover { background: ${COLORS.sageDark} !important; }
        .send-btn { transition: all 0.2s ease; }
        .input-styled { width: 100%; padding: 12px 16px; border-radius: 12px; border: 1.5px solid rgba(26,31,46,0.12); background: ${COLORS.warmWhite}; font-family: 'DM Sans', sans-serif; font-size: 14px; color: ${COLORS.deep}; outline: none; }
        .input-styled:focus { border-color: ${COLORS.sage}; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 36 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sageDark, fontWeight: 500, marginBottom: 12 }}>Communication</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 700, color: COLORS.deep, lineHeight: 1.1, marginBottom: 8 }}>
            Your <em style={{ fontStyle: "italic", color: COLORS.sageDark }}>Messages</em>
          </h1>
          <p style={{ fontSize: 15, color: COLORS.muted, fontWeight: 300 }}>Stay connected with your therapists.</p>
        </div>
        <button className="compose-btn" onClick={() => setComposing(true)} style={{ padding: "12px 28px", borderRadius: 100, background: COLORS.deep, color: "white", border: "none", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
          ✏ Compose
        </button>
      </div>

      <div style={{ display: "flex", gap: 28 }}>
        {/* Sidebar */}
        <nav style={{ width: 180, flexShrink: 0 }}>
          <div style={{ background: "white", borderRadius: 20, padding: 10, border: `1px solid rgba(26,31,46,0.07)`, boxShadow: "0 2px 16px rgba(26,31,46,0.04)" }}>
            {FOLDERS.map((f) => (
              <button
                key={f.key}
                className="folder-btn"
                onClick={() => { setFolder(f.key); setSelected(null); }}
                style={{
                  display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "11px 14px",
                  borderRadius: 12, border: "none", cursor: "pointer", textAlign: "left", fontSize: 14,
                  fontWeight: folder === f.key ? 500 : 400,
                  background: folder === f.key ? COLORS.cream : "transparent",
                  color: folder === f.key ? COLORS.deep : COLORS.muted,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <span style={{ fontSize: 15 }}>{f.icon}</span> {f.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Main */}
        <div style={{ flex: 1 }}>
          {/* Compose */}
          {composing && (
            <div style={{ background: "white", borderRadius: 20, padding: 28, marginBottom: 20, border: `1px solid rgba(26,31,46,0.07)`, boxShadow: "0 4px 24px rgba(26,31,46,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: COLORS.deep }}>New Message</h2>
                <button className="icon-btn" onClick={() => setComposing(false)} style={{ width: 32, height: 32, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", fontSize: 18, color: COLORS.muted }}>✕</button>
              </div>
              <form onSubmit={send} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input className="input-styled" value={compose.recipientEmail} onChange={(e) => setCompose((c) => ({ ...c, recipientEmail: e.target.value }))} type="email" placeholder="To (email)" required />
                <input className="input-styled" value={compose.subject} onChange={(e) => setCompose((c) => ({ ...c, subject: e.target.value }))} placeholder="Subject" required />
                <textarea className="input-styled" value={compose.body} onChange={(e) => setCompose((c) => ({ ...c, body: e.target.value }))} placeholder="Write your message..." required style={{ minHeight: 120, resize: "vertical" }} />
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="send-btn" type="submit" disabled={sending} style={{ padding: "11px 24px", borderRadius: 12, background: COLORS.deep, color: "white", border: "none", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
                    {sending ? <div className="spin" style={{ width: 16, height: 16, border: "1.5px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%" }} /> : <>📤 Send</>}
                  </button>
                  <button type="button" onClick={() => setComposing(false)} style={{ padding: "11px 20px", borderRadius: 12, background: COLORS.cream, color: COLORS.charcoal, border: "none", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          {/* Message Detail */}
          {selected ? (
            <div style={{ background: "white", borderRadius: 20, padding: 32, border: `1px solid rgba(26,31,46,0.07)`, boxShadow: "0 2px 16px rgba(26,31,46,0.04)" }}>
              <button onClick={() => setSelected(null)} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: COLORS.sageDark, border: "none", background: "none", cursor: "pointer", marginBottom: 24, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>← Back to messages</button>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: COLORS.deep, marginBottom: 10 }}>{selected.subject}</h2>
              <div style={{ fontSize: 13, color: COLORS.muted, paddingBottom: 20, borderBottom: `1px solid rgba(26,31,46,0.08)`, marginBottom: 20 }}>
                From: <span style={{ color: COLORS.deep, fontWeight: 500 }}>{selected.senderName}</span> · {new Date(selected.createdAt).toLocaleString()}
              </div>
              <p style={{ fontSize: 15, color: COLORS.charcoal, lineHeight: 1.8, whiteSpace: "pre-wrap", fontWeight: 300 }}>{selected.body}</p>
            </div>
          ) : loading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 180 }}>
              <div className="spin" style={{ width: 32, height: 32, border: `2px solid rgba(139,175,142,0.2)`, borderTopColor: COLORS.sage, borderRadius: "50%" }} />
            </div>
          ) : msgs.length === 0 ? (
            <div style={{ background: "white", borderRadius: 20, padding: "64px 40px", textAlign: "center", border: `1px solid rgba(26,31,46,0.07)` }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
              <p style={{ fontSize: 15, color: COLORS.muted }}>No messages in {folder}</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {msgs.map((m) => (
                <div key={m.id} className="msg-row" onClick={() => setSelected(m)} style={{ background: "white", borderRadius: 16, padding: "16px 20px", border: `1px solid rgba(26,31,46,0.07)`, borderLeft: !m.isRead ? `3px solid ${COLORS.sageDark}` : `1px solid rgba(26,31,46,0.07)` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: !m.isRead ? 600 : 400, color: !m.isRead ? COLORS.deep : COLORS.charcoal, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.subject}</div>
                      <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.senderName} · {m.body?.slice(0, 60)}...</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                      <button className="icon-btn" onClick={(e) => toggleStar(e, m.id)} style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", fontSize: 14, color: m.isStarred ? "#C9A96E" : COLORS.muted }}>⭐</button>
                      <button className="icon-btn" onClick={(e) => toggleImportant(e, m.id)} style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", fontSize: 14, color: m.isImportant ? "#C04040" : COLORS.muted }}>🔔</button>
                      {folder !== "trash" && (
                        <button className="icon-btn" onClick={(e) => deleteMsg(e, m.id)} style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", fontSize: 14, color: COLORS.muted }}>🗑️</button>
                      )}
                      <span style={{ fontSize: 12, color: COLORS.muted, marginLeft: 6 }}>{new Date(m.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}