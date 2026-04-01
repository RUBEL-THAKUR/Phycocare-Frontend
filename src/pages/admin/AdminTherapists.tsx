import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { adminApi } from '../../api'
import toast from 'react-hot-toast'
import { UserCheck, Users, X, CheckCircle2, XCircle, Clock, FileText } from 'lucide-react'

const COLORS = {
  sage: "#8BAF8E", sageLight: "#B8D4BB", sageDark: "#4A7A52",
  cream: "#F5F0E8", warmWhite: "#FDFAF5", deep: "#1A1F2E",
  charcoal: "#3D4454", gold: "#C9A96E", goldLight: "#E8C98A",
  muted: "#7A8090", bg: "#F8F5EF",
}

const STATUS_CONFIG: Record<string, { color: string; bg: string; border: string; icon: any }> = {
  PENDING:   { color: '#8A6020', bg: 'rgba(201,169,110,0.12)', border: 'rgba(201,169,110,0.35)', icon: Clock },
  APPROVED:  { color: COLORS.sageDark, bg: 'rgba(74,122,82,0.10)', border: 'rgba(74,122,82,0.30)', icon: CheckCircle2 },
  REJECTED:  { color: '#B94A48', bg: 'rgba(185,74,72,0.08)', border: 'rgba(185,74,72,0.25)', icon: XCircle },
  SUSPENDED: { color: COLORS.muted, bg: 'rgba(122,128,144,0.08)', border: 'rgba(122,128,144,0.20)', icon: XCircle },
}

const FILTERS = ['ALL', 'PENDING', 'APPROVED', 'REJECTED']

export default function AdminTherapists() {
  const [therapists, setTherapists] = useState<any[]>([])
  const [filter, setFilter] = useState('ALL')
  const [loading, setLoading] = useState(true)
  const [rejectTarget, setRejectTarget] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  useEffect(() => { load() }, [filter])

  async function load() {
    setLoading(true)
    try {
      const r = await adminApi.getTherapists(filter === 'ALL' ? undefined : filter)
      setTherapists(r.data.data || [])
    } finally { setLoading(false) }
  }

  async function approve(id: string) {
    try { await adminApi.approveTherapist(id); toast.success('Therapist approved'); load() }
    catch (err: any) { toast.error(err.response?.data?.message || 'Failed') }
  }

  async function reject() {
    if (!rejectTarget || !rejectReason.trim()) { toast.error('Enter rejection reason'); return }
    try {
      await adminApi.rejectTherapist(rejectTarget, rejectReason)
      toast.success('Therapist rejected')
      setRejectTarget(null); setRejectReason(''); load()
    } catch (err: any) { toast.error(err.response?.data?.message || 'Failed') }
  }

  // CV open karo browser mein — token ke saath authenticated URL
  function openCv(cvFileName: string) {
    const token = localStorage.getItem('token')
    const url = `http://localhost:9090/api/therapist/cv/${cvFileName}`
    if (token) {
      // Token ke saath fetch karo aur blob URL banao
      fetch(url, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          if (!res.ok) throw new Error('CV not found')
          return res.blob()
        })
        .then(blob => {
          const blobUrl = URL.createObjectURL(blob)
          window.open(blobUrl, '_blank')
        })
        .catch(() => toast.error('CV load nahi ho paya'))
    } else {
      window.open(url, '_blank')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{ maxWidth: 1100, margin: '0 auto', padding: '0 8px' }}
    >
      <style>{`
        .at-row:hover { background: rgba(139,175,142,0.06) !important; }
        .at-row { transition: background 0.2s; }
        .at-filter-btn { transition: all 0.25s cubic-bezier(0.25,0.46,0.45,0.94); }
        .at-filter-btn:hover { transform: translateY(-2px); }
        .at-action-btn { transition: all 0.2s; }
        .at-action-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(0,0,0,0.12); }
        .at-cv-btn:hover { background: rgba(201,169,110,0.25) !important; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(201,169,110,0.25); }
        .at-spin { animation: atSpin 1s linear infinite; }
        @keyframes atSpin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{ marginBottom: 32, position: 'relative', textAlign: 'center' }}
      >
        <div style={{ position: 'absolute', inset: '-20px -28px', background: 'radial-gradient(ellipse at 50% 50%, rgba(139,175,142,0.10) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: COLORS.gold, fontWeight: 500, marginBottom: 8 }}>
          Admin Panel
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: COLORS.deep, lineHeight: 1.1, marginBottom: 8 }}>
          Manage <em style={{ fontStyle: 'italic', color: COLORS.sageDark }}>Therapists</em>
        </h1>
        <p style={{ fontSize: 15, color: COLORS.muted, fontWeight: 300 }}>Review, approve and manage therapist applications.</p>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 28, flexWrap: 'wrap' }}
      >
        {FILTERS.map(f => (
          <button
            key={f}
            className="at-filter-btn"
            onClick={() => setFilter(f)}
            style={{
              padding: '9px 24px',
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: 0.5,
              cursor: 'pointer',
              border: filter === f ? `1.5px solid ${COLORS.sageDark}` : '1.5px solid rgba(26,31,46,0.12)',
              background: filter === f ? COLORS.sageDark : 'white',
              color: filter === f ? 'white' : COLORS.charcoal,
              boxShadow: filter === f ? '0 4px 14px rgba(74,122,82,0.22)' : '0 2px 8px rgba(26,31,46,0.05)',
            }}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* Reject Modal */}
      <AnimatePresence>
        {rejectTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setRejectTarget(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(26,31,46,0.45)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 16 }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              onClick={e => e.stopPropagation()}
              style={{ background: COLORS.warmWhite, borderRadius: 24, padding: '36px 32px', maxWidth: 440, width: '100%', boxShadow: '0 32px 80px rgba(26,31,46,0.18)', border: '1px solid rgba(26,31,46,0.08)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: COLORS.deep }}>
                  Reject Therapist
                </h2>
                <button
                  onClick={() => { setRejectTarget(null); setRejectReason('') }}
                  style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(26,31,46,0.06)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.muted }}
                >
                  <X size={16} />
                </button>
              </div>
              <textarea
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                rows={3}
                placeholder="Enter rejection reason..."
                style={{ width: '100%', background: 'rgba(26,31,46,0.04)', border: '1.5px solid rgba(26,31,46,0.10)', borderRadius: 14, padding: '12px 16px', fontSize: 14, color: COLORS.deep, resize: 'none', outline: 'none', marginBottom: 20, fontFamily: 'inherit', boxSizing: 'border-box' }}
              />
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  className="at-action-btn"
                  onClick={reject}
                  style={{ flex: 1, padding: '13px 0', borderRadius: 14, background: '#B94A48', border: 'none', color: 'white', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
                >
                  Reject
                </button>
                <button
                  className="at-action-btn"
                  onClick={() => { setRejectTarget(null); setRejectReason('') }}
                  style={{ flex: 1, padding: '13px 0', borderRadius: 14, background: 'white', border: '1.5px solid rgba(26,31,46,0.12)', color: COLORS.charcoal, fontWeight: 500, fontSize: 14, cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table / States */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
            <div className="at-spin" style={{ width: 36, height: 36, border: `2px solid rgba(201,169,110,0.2)`, borderTopColor: COLORS.gold, borderRadius: '50%' }} />
          </motion.div>
        ) : therapists.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            style={{ background: 'white', borderRadius: 22, padding: '64px 32px', textAlign: 'center', border: '1px solid rgba(26,31,46,0.07)', boxShadow: '0 4px 20px rgba(26,31,46,0.05)' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(139,175,142,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Users size={32} style={{ color: COLORS.sage }} />
            </div>
            <p style={{ color: COLORS.muted, fontSize: 16, fontWeight: 300 }}>No therapists found</p>
          </motion.div>
        ) : (
          <motion.div key="table" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ background: 'white', borderRadius: 22, border: '1px solid rgba(26,31,46,0.07)', boxShadow: '0 4px 20px rgba(26,31,46,0.05)', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(26,31,46,0.07)', background: COLORS.bg }}>
                    {['Name', 'Email', 'Mobile', 'Status', 'Registered', 'CV', 'Actions'].map(h => (
                      <th key={h} style={{ textAlign: 'center', padding: '14px 20px', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: COLORS.muted }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {therapists.map((t: any, i: number) => {
                    const sc = STATUS_CONFIG[t.status] || STATUS_CONFIG.SUSPENDED
                    const StatusIcon = sc.icon
                    return (
                      <motion.tr
                        key={t.id}
                        className="at-row"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        style={{ borderBottom: '1px solid rgba(26,31,46,0.05)' }}
                      >
                        {/* Name */}
                        <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                          <span style={{ fontWeight: 600, color: COLORS.deep, fontSize: 14 }}>{t.firstName} {t.lastName}</span>
                        </td>

                        {/* Email */}
                        <td style={{ padding: '16px 20px', color: COLORS.muted, fontSize: 13, textAlign: 'center' }}>{t.emailId}</td>

                        {/* Mobile */}
                        <td style={{ padding: '16px 20px', color: COLORS.muted, fontSize: 13, textAlign: 'center' }}>{t.mobileNumber}</td>

                        {/* Status */}
                        <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 5,
                            padding: '5px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600,
                            color: sc.color, background: sc.bg, border: `1px solid ${sc.border}`
                          }}>
                            <StatusIcon size={12} />
                            {t.status}
                          </span>
                        </td>

                        {/* Registered */}
                        <td style={{ padding: '16px 20px', color: COLORS.muted, fontSize: 13, textAlign: 'center' }}>
                          {t.createdAt ? new Date(t.createdAt).toLocaleDateString('en-IN') : '-'}
                        </td>

                        {/* CV Column */}
                        <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                          {t.cvFileName ? (
                            <button
                              className="at-action-btn at-cv-btn"
                              onClick={() => openCv(t.cvFileName)}
                              title={`${t.firstName} ki CV dekhein`}
                              style={{
                                width: 36,
                                height: 36,
                                borderRadius: 10,
                                background: 'rgba(201,169,110,0.12)',
                                border: '1px solid rgba(201,169,110,0.35)',
                                color: '#8A6020',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s',
                              }}
                            >
                              <FileText size={16} />
                            </button>
                          ) : (
                            <span style={{ color: COLORS.muted, fontSize: 12 }}>—</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
                            {t.status === 'PENDING' && (
                              <>
                                <button className="at-action-btn" onClick={() => approve(t.id)}
                                  style={{ padding: '7px 16px', borderRadius: 10, background: COLORS.sageDark, border: 'none', color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                                  Approve
                                </button>
                                <button className="at-action-btn" onClick={() => setRejectTarget(t.id)}
                                  style={{ padding: '7px 16px', borderRadius: 10, background: '#B94A48', border: 'none', color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                                  Reject
                                </button>
                              </>
                            )}
                            {t.status === 'APPROVED' && (
                              <span style={{ color: COLORS.sageDark, fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 5 }}>
                                <UserCheck size={15} /> Active
                              </span>
                            )}
                            {t.status === 'REJECTED' && (
                              <span style={{ color: '#B94A48', fontSize: 13, fontWeight: 500 }}>Rejected</span>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}