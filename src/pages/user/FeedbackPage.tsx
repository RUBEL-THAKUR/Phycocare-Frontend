import { useState } from 'react'
import { motion } from 'framer-motion'
import { userApi } from '../../api'
import toast from 'react-hot-toast'
import { MessageCircle, Star, Check, Send } from 'lucide-react'

function Stars({
  val,
  onChange,
  label
}: {
  val: number
  onChange: (v: number) => void
  label: string
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <span className="text-sm font-medium text-text-secondary">{label}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((s) => (
          <motion.button
            key={s}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => onChange(s)}
            className="p-1"
          >
            <Star
              className={`w-6 h-6 transition-colors ${
                s <= val ? 'text-accent-gold fill-accent-gold' : 'text-white/20'
              }`}
            />
          </motion.button>
        ))}
      </div>
    </div>
  )
}

const SOURCES = ['Google', 'Friend/Family', 'Social Media', 'App Store', 'Doctor Referral', 'Other']

export default function FeedbackPage() {
  const [r, setR] = useState({ quality: 0, helpfulness: 0, clarity: 0 })
  const [source, setSource] = useState<string[]>([])
  const [comment, setComment] = useState('')
  const [anon, setAnon] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function toggleSource(s: string) {
    setSource((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!r.quality || !r.helpfulness || !r.clarity) {
      toast.error('Rate all three categories')
      return
    }
    setSubmitting(true)
    try {
      await userApi.submitFeedback({
        qualityRating: r.quality,
        helpfulnessRating: r.helpfulness,
        clarityRating: r.clarity,
        source: source.join(', '),
        comment,
        isAnonymous: anon
      })
      toast.success('Feedback submitted! Thank you.')
      setR({ quality: 0, helpfulness: 0, clarity: 0 })
      setSource([])
      setComment('')
      setAnon(false)
    } catch {
      toast.error('Failed to submit')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Give Feedback</h1>
        <p className="text-text-secondary">Help us improve PsychoCare</p>
      </motion.div>

      <form onSubmit={submit}>
        {/* Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 mb-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-gold to-yellow-500 flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <h2 className="font-bold text-white">Rate Your Experience</h2>
          </div>
          <Stars label="Quality" val={r.quality} onChange={(v) => setR((p) => ({ ...p, quality: v }))} />
          <Stars label="Helpfulness" val={r.helpfulness} onChange={(v) => setR((p) => ({ ...p, helpfulness: v }))} />
          <Stars label="Clarity" val={r.clarity} onChange={(v) => setR((p) => ({ ...p, clarity: v }))} />
        </motion.div>

        {/* Source */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 mb-4"
        >
          <h2 className="font-bold text-white mb-4">How did you hear about us?</h2>
          <div className="flex flex-wrap gap-2">
            {SOURCES.map((s) => (
              <motion.button
                key={s}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => toggleSource(s)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  source.includes(s)
                    ? 'bg-accent-purple text-white shadow-glow-sm'
                    : 'bg-dark-500/50 text-text-secondary hover:text-white border border-white/10'
                }`}
              >
                {s}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Comments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 mb-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h2 className="font-bold text-white">Comments (optional)</h2>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="input-field resize-y"
            placeholder="Share your experience..."
          />
        </motion.div>

        {/* Anonymous */}
        <motion.label
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-3 mb-6 cursor-pointer group"
        >
          <div className="relative">
            <input
              type="checkbox"
              checked={anon}
              onChange={(e) => setAnon(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-5 h-5 rounded border border-white/20 bg-dark-500/50 peer-checked:bg-accent-purple peer-checked:border-accent-purple transition-all flex items-center justify-center">
              {anon && <Check className="w-3 h-3 text-white" />}
            </div>
          </div>
          <span className="text-sm text-text-secondary group-hover:text-white transition-colors">
            Submit anonymously
          </span>
        </motion.label>

        {/* Submit */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={submitting}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {submitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit Feedback
            </>
          )}
        </motion.button>
      </form>
    </div>
  )
}
