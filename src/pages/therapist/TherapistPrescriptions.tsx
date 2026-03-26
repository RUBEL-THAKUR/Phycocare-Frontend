import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { therapistApi } from '../../api'
import toast from 'react-hot-toast'
import { FileText, Plus, X, Calendar, User, Pill, ClipboardList } from 'lucide-react'

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

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-neon-pink/50 focus:ring-1 focus:ring-neon-pink/50 transition-all"
  const labelClass = "block text-sm font-medium text-white/70 mb-2"

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white"
        >
          Prescriptions
        </motion.h1>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(233,30,140,0.4)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setComposing(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple text-white font-semibold"
        >
          <Plus className="w-5 h-5" />
          New Prescription
        </motion.button>
      </div>

      <AnimatePresence>
        {composing && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="glass-card p-6 max-w-lg overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Create Prescription</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setComposing(false)}
                className="p-2 rounded-lg bg-white/5 text-white/50 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            <form onSubmit={create} className="space-y-4">
              <div>
                <label className={labelClass}>Session ID</label>
                <input className={inputClass} type="number" value={f.sessionId} onChange={e => setF(p => ({ ...p, sessionId: e.target.value }))} required />
              </div>
              <div>
                <label className={labelClass}>Notes</label>
                <textarea className={`${inputClass} resize-none`} rows={3} value={f.notes} onChange={e => setF(p => ({ ...p, notes: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Medications</label>
                <textarea className={`${inputClass} resize-none`} rows={2} value={f.medications} onChange={e => setF(p => ({ ...p, medications: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Follow-up Date</label>
                <input className={inputClass} type="datetime-local" value={f.followUpDate} onChange={e => setF(p => ({ ...p, followUpDate: e.target.value }))} />
              </div>
              <div className="flex gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(233,30,140,0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple text-white font-semibold"
                >
                  {submitting ? 'Creating...' : 'Create Prescription'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setComposing(false)}
                  className="px-6 py-3 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 transition-colors"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {data.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-16 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
            <FileText className="w-10 h-10 text-white/30" />
          </div>
          <p className="text-white/50 text-lg">No prescriptions yet</p>
          <p className="text-white/30 text-sm mt-2">Create your first prescription using the button above</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {data.map((p: any, i: number) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-6 hover:bg-white/[0.08] transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-white">{p.user?.firstName} {p.user?.lastName}</div>
                      <div className="text-sm text-white/50">Session #{p.session?.id}</div>
                    </div>
                  </div>

                  {p.notes && (
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                      <ClipboardList className="w-4 h-4 text-white/50 mt-0.5" />
                      <div>
                        <div className="text-xs text-white/40 mb-1">Notes</div>
                        <div className="text-sm text-white/80">{p.notes}</div>
                      </div>
                    </div>
                  )}

                  {p.medications && (
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                      <Pill className="w-4 h-4 text-white/50 mt-0.5" />
                      <div>
                        <div className="text-xs text-white/40 mb-1">Medications</div>
                        <div className="text-sm text-white/80">{p.medications}</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-right space-y-2">
                  <div className="text-sm text-white/50">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </div>
                  {p.followUpDate && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 text-xs">
                      <Calendar className="w-3 h-3" />
                      Follow-up: {new Date(p.followUpDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
