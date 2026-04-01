// import { useEffect, useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { therapistApi } from '../../api'
// import toast from 'react-hot-toast'
// import { FileText, Plus, X, Calendar, User, Pill, ClipboardList } from 'lucide-react'
//
// export default function TherapistPrescriptions() {
//   const [data, setData] = useState<any[]>([])
//   const [composing, setComposing] = useState(false)
//   const [f, setF] = useState({ sessionId: '', notes: '', medications: '', followUpDate: '' })
//   const [submitting, setSubmitting] = useState(false)
//
//   useEffect(() => { therapistApi.getPrescriptions().then(r => setData(r.data.data?.content || [])) }, [])
//
//   async function create(e: React.FormEvent) {
//     e.preventDefault()
//     setSubmitting(true)
//     try {
//       await therapistApi.createPrescription({
//         ...f,
//         sessionId: Number(f.sessionId),
//         followUpDate: f.followUpDate ? f.followUpDate + ':00' : undefined
//       })
//       toast.success('Prescription created')
//       setComposing(false)
//       setF({ sessionId: '', notes: '', medications: '', followUpDate: '' })
//       therapistApi.getPrescriptions().then(r => setData(r.data.data?.content || []))
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || 'Failed')
//     } finally {
//       setSubmitting(false)
//     }
//   }
//
//   const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-neon-pink/50 focus:ring-1 focus:ring-neon-pink/50 transition-all"
//   const labelClass = "block text-sm font-medium text-white/70 mb-2"
//
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="space-y-6"
//     >
//       <div className="flex items-center justify-between">
//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-3xl font-bold text-white"
//         >
//           Prescriptions
//         </motion.h1>
//         <motion.button
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(233,30,140,0.4)' }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => setComposing(true)}
//           className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple text-white font-semibold"
//         >
//           <Plus className="w-5 h-5" />
//           New Prescription
//         </motion.button>
//       </div>
//
//       <AnimatePresence>
//         {composing && (
//           <motion.div
//             initial={{ opacity: 0, y: -20, height: 0 }}
//             animate={{ opacity: 1, y: 0, height: 'auto' }}
//             exit={{ opacity: 0, y: -20, height: 0 }}
//             className="glass-card p-6 max-w-lg overflow-hidden"
//           >
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-lg font-bold text-white">Create Prescription</h2>
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => setComposing(false)}
//                 className="p-2 rounded-lg bg-white/5 text-white/50 hover:bg-white/10 transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </motion.button>
//             </div>
//             <form onSubmit={create} className="space-y-4">
//               <div>
//                 <label className={labelClass}>Session ID</label>
//                 <input className={inputClass} type="number" value={f.sessionId} onChange={e => setF(p => ({ ...p, sessionId: e.target.value }))} required />
//               </div>
//               <div>
//                 <label className={labelClass}>Notes</label>
//                 <textarea className={`${inputClass} resize-none`} rows={3} value={f.notes} onChange={e => setF(p => ({ ...p, notes: e.target.value }))} />
//               </div>
//               <div>
//                 <label className={labelClass}>Medications</label>
//                 <textarea className={`${inputClass} resize-none`} rows={2} value={f.medications} onChange={e => setF(p => ({ ...p, medications: e.target.value }))} />
//               </div>
//               <div>
//                 <label className={labelClass}>Follow-up Date</label>
//                 <input className={inputClass} type="datetime-local" value={f.followUpDate} onChange={e => setF(p => ({ ...p, followUpDate: e.target.value }))} />
//               </div>
//               <div className="flex gap-3 pt-2">
//                 <motion.button
//                   whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(233,30,140,0.4)' }}
//                   whileTap={{ scale: 0.98 }}
//                   type="submit"
//                   disabled={submitting}
//                   className="flex-1 py-3 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple text-white font-semibold"
//                 >
//                   {submitting ? 'Creating...' : 'Create Prescription'}
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   type="button"
//                   onClick={() => setComposing(false)}
//                   className="px-6 py-3 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 transition-colors"
//                 >
//                   Cancel
//                 </motion.button>
//               </div>
//             </form>
//           </motion.div>
//         )}
//       </AnimatePresence>
//
//       {data.length === 0 ? (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="glass-card p-16 text-center"
//         >
//           <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
//             <FileText className="w-10 h-10 text-white/30" />
//           </div>
//           <p className="text-white/50 text-lg">No prescriptions yet</p>
//           <p className="text-white/30 text-sm mt-2">Create your first prescription using the button above</p>
//         </motion.div>
//       ) : (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="space-y-4"
//         >
//           {data.map((p: any, i: number) => (
//             <motion.div
//               key={p.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.05 }}
//               className="glass-card p-6 hover:bg-white/[0.08] transition-all"
//             >
//               <div className="flex justify-between items-start">
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center">
//                       <User className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <div className="font-bold text-white">{p.user?.firstName} {p.user?.lastName}</div>
//                       <div className="text-sm text-white/50">Session #{p.session?.id}</div>
//                     </div>
//                   </div>
//
//                   {p.notes && (
//                     <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
//                       <ClipboardList className="w-4 h-4 text-white/50 mt-0.5" />
//                       <div>
//                         <div className="text-xs text-white/40 mb-1">Notes</div>
//                         <div className="text-sm text-white/80">{p.notes}</div>
//                       </div>
//                     </div>
//                   )}
//
//                   {p.medications && (
//                     <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
//                       <Pill className="w-4 h-4 text-white/50 mt-0.5" />
//                       <div>
//                         <div className="text-xs text-white/40 mb-1">Medications</div>
//                         <div className="text-sm text-white/80">{p.medications}</div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//
//                 <div className="text-right space-y-2">
//                   <div className="text-sm text-white/50">
//                     {new Date(p.createdAt).toLocaleDateString()}
//                   </div>
//                   {p.followUpDate && (
//                     <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 text-xs">
//                       <Calendar className="w-3 h-3" />
//                       Follow-up: {new Date(p.followUpDate).toLocaleDateString()}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       )}
//     </motion.div>
//   )
// }

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { therapistApi } from '../../api'
import toast from 'react-hot-toast'
import { FileText, Plus, X, Calendar, User, Pill, ClipboardList } from 'lucide-react'

const COLORS = {
  sage: "#8BAF8E", sageLight: "#B8D4BB", sageDark: "#4A7A52",
  cream: "#F5F0E8", warmWhite: "#FDFAF5", deep: "#1A1F2E",
  charcoal: "#3D4454", gold: "#C9A96E", muted: "#7A8090", bg: "#F8F5EF",
  border: "rgba(26,31,46,0.08)", shadow: "0 4px 20px rgba(26,31,46,0.06)",
}

export default function TherapistPrescriptions() {
  const [data, setData] = useState<any[]>([])
  const [composing, setComposing] = useState(false)
  const [f, setF] = useState({ sessionId: '', notes: '', medications: '', followUpDate: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => { therapistApi.getPrescriptions().then(r => setData(r.data.data?.content || [])) }, [])

  async function create(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      await therapistApi.createPrescription({
        ...f,
        sessionId: Number(f.sessionId),
        followUpDate: f.followUpDate ? f.followUpDate + ':00' : undefined
      })
      toast.success('Prescription created')
      setComposing(false)
      setF({ sessionId: '', notes: '', medications: '', followUpDate: '' })
      therapistApi.getPrescriptions().then(r => setData(r.data.data?.content || []))
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed')
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: COLORS.warmWhite, border: `1px solid ${COLORS.border}`,
    borderRadius: 12, padding: '12px 16px', fontSize: 14, color: COLORS.deep,
    outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{ maxWidth: 820, margin: '0 auto', padding: '0 16px' }}
    >
      <style>{`
        .tp-input:focus { border-color: ${COLORS.sageDark} !important; box-shadow: 0 0 0 3px rgba(74,122,82,0.12) !important; }
        .tp-rx-card:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(26,31,46,0.1) !important; }
        .tp-rx-card { transition: all 0.25s ease; }
        .tp-btn-primary:hover { box-shadow: 0 8px 24px rgba(74,122,82,0.3) !important; transform: translateY(-1px); }
        .tp-btn-primary { transition: all 0.25s ease; }
      `}</style>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
        style={{ marginBottom: 32, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}
      >
        <div>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: COLORS.sageDark, fontWeight: 500, marginBottom: 8 }}>
            Therapist Portal
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 700, color: COLORS.deep, lineHeight: 1.1, marginBottom: 6 }}>
            <em style={{ fontStyle: 'italic', color: COLORS.sageDark }}>Prescriptions</em>
          </h1>
          <p style={{ fontSize: 14, color: COLORS.muted, fontWeight: 300 }}>Issue and manage patient prescriptions.</p>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setComposing(v => !v)}
          className="tp-btn-primary"
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '12px 24px', borderRadius: 14, border: 'none', cursor: 'pointer',
            background: COLORS.sageDark, color: 'white', fontSize: 14, fontWeight: 600,
          }}
        >
          <Plus size={16} />
          New Prescription
        </motion.button>
      </motion.div>

      {/* Compose Form */}
      <AnimatePresence>
        {composing && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -12 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            style={{ overflow: 'hidden', marginBottom: 28 }}
          >
            <div style={{
              background: 'white', borderRadius: 22, padding: '32px 36px',
              border: `1px solid ${COLORS.border}`, boxShadow: COLORS.shadow,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: COLORS.deep }}>
                  Create Prescription
                </div>
                <button
                  onClick={() => setComposing(false)}
                  style={{
                    border: 'none', cursor: 'pointer', padding: '8px', borderRadius: 10,
                    background: COLORS.bg, color: COLORS.muted, display: 'flex', alignItems: 'center',
                  }}
                >
                  <X size={16} />
                </button>
              </div>
              <form onSubmit={create} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: COLORS.muted, letterSpacing: 0.3 }}>Session ID</label>
                  <input className="tp-input" style={inputStyle} type="number" value={f.sessionId} onChange={e => setF(p => ({ ...p, sessionId: e.target.value }))} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: COLORS.muted, letterSpacing: 0.3 }}>Notes</label>
                  <textarea className="tp-input" style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }} rows={3} value={f.notes} onChange={e => setF(p => ({ ...p, notes: e.target.value }))} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: COLORS.muted, letterSpacing: 0.3 }}>Medications</label>
                  <textarea className="tp-input" style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }} rows={2} value={f.medications} onChange={e => setF(p => ({ ...p, medications: e.target.value }))} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: COLORS.muted, letterSpacing: 0.3 }}>Follow-up Date</label>
                  <input className="tp-input" style={inputStyle} type="datetime-local" value={f.followUpDate} onChange={e => setF(p => ({ ...p, followUpDate: e.target.value }))} />
                </div>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 8 }}>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="tp-btn-primary"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '12px 32px', borderRadius: 14, border: 'none', cursor: 'pointer',
                      background: COLORS.sageDark, color: 'white', fontSize: 14, fontWeight: 600,
                    }}
                  >
                    {submitting ? 'Creating...' : 'Create Prescription'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setComposing(false)}
                    style={{
                      padding: '12px 24px', borderRadius: 14, border: `1px solid ${COLORS.border}`,
                      background: 'transparent', color: COLORS.muted, fontSize: 14, cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {data.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            background: 'white', borderRadius: 22, padding: '64px 32px', textAlign: 'center',
            border: `1px solid ${COLORS.border}`, boxShadow: COLORS.shadow,
          }}
        >
          <div style={{
            width: 72, height: 72, borderRadius: '50%', background: COLORS.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <FileText size={32} style={{ color: COLORS.muted }} />
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: COLORS.deep, marginBottom: 8 }}>
            No Prescriptions Yet
          </div>
          <p style={{ fontSize: 14, color: COLORS.muted, fontWeight: 300 }}>Create your first prescription using the button above.</p>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {data.map((p: any, i: number) => (
            <motion.div
              key={p.id}
              className="tp-rx-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                background: 'white', borderRadius: 20, padding: '24px 28px',
                border: `1px solid ${COLORS.border}`, boxShadow: COLORS.shadow,
              }}
            >
              {/* Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: 14,
                    background: `rgba(74,122,82,0.1)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <User size={20} style={{ color: COLORS.sageDark }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: COLORS.deep }}>
                      {p.user?.firstName} {p.user?.lastName}
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>Session #{p.session?.id}</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 6 }}>
                    {new Date(p.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  {p.followUpDate && (
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      padding: '5px 12px', borderRadius: 8,
                      background: 'rgba(74,122,82,0.1)', color: COLORS.sageDark,
                      fontSize: 11, fontWeight: 600,
                    }}>
                      <Calendar size={11} />
                      Follow-up: {new Date(p.followUpDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {p.notes && (
                  <div style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px',
                    borderRadius: 12, background: COLORS.bg, border: `1px solid ${COLORS.border}`,
                  }}>
                    <ClipboardList size={15} style={{ color: COLORS.muted, marginTop: 1, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.muted, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>Notes</div>
                      <div style={{ fontSize: 13, color: COLORS.charcoal, lineHeight: 1.6 }}>{p.notes}</div>
                    </div>
                  </div>
                )}
                {p.medications && (
                  <div style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px',
                    borderRadius: 12, background: `rgba(201,169,110,0.07)`, border: `1px solid rgba(201,169,110,0.15)`,
                  }}>
                    <Pill size={15} style={{ color: COLORS.gold, marginTop: 1, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.gold, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>Medications</div>
                      <div style={{ fontSize: 13, color: COLORS.charcoal, lineHeight: 1.6 }}>{p.medications}</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
