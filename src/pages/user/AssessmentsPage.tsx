import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { userApi } from '../../api'
import { ClipboardCheck, CheckCircle, ArrowRight, Trophy } from 'lucide-react'

const TESTS = [
  { slug: 'addiction', name: 'Addiction Assessment', desc: 'Evaluate substance use patterns and addiction risk.' },
  { slug: 'adhd', name: 'ADHD Assessment', desc: 'Screen for attention deficit and hyperactivity symptoms.' },
  { slug: 'adjustment-disorder', name: 'Adjustment Disorder', desc: 'Assess difficulty coping with life changes.' },
  { slug: 'anxiety', name: 'Anxiety Assessment', desc: 'Measure generalized anxiety disorder symptoms.' },
  { slug: 'bipolar', name: 'Bipolar Disorder', desc: 'Screen for mood swings and bipolar symptoms.' },
  { slug: 'depression', name: 'Depression Assessment', desc: 'Evaluate depressive episode severity.' },
  { slug: 'ocd', name: 'OCD Assessment', desc: 'Screen for obsessive-compulsive disorder patterns.' },
  { slug: 'ptsd', name: 'PTSD Assessment', desc: 'Assess post-traumatic stress disorder symptoms.' },
  { slug: 'sleep', name: 'Sleep Disorder', desc: 'Evaluate sleep quality and insomnia severity.' },
  { slug: 'stress', name: 'Stress Assessment', desc: 'Measure perceived stress levels in daily life.' }
]

export default function AssessmentsPage() {
  const [tab, setTab] = useState<'available' | 'completed'>('available')
  const [completed, setCompleted] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    userApi.getCompletedAssessments().then((r) => setCompleted(r.data.data || []))
  }, [])

  const doneSet = new Set(completed.map((a: any) => a.testSlug))

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Self Assessment</h1>
        <p className="text-text-secondary">Evidence-based mental health assessments</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-3 mb-6"
      >
        {(['available', 'completed'] as const).map((t) => (
          <motion.button
            key={t}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              tab === t
                ? 'bg-gradient-primary text-white shadow-glow-sm'
                : 'bg-dark-500/50 text-text-secondary hover:text-white border border-white/10'
            }`}
          >
            {t === 'available' ? 'Available Tests' : `Completed (${completed.length})`}
          </motion.button>
        ))}
      </motion.div>

      {/* Content */}
      {tab === 'available' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {TESTS.map((t, i) => (
            <motion.div
              key={t.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="glass-card-hover p-5 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-sm">
                  <ClipboardCheck className="w-5 h-5 text-white" />
                </div>
                {doneSet.has(t.slug) && (
                  <span className="flex items-center gap-1 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-lg border border-green-500/30">
                    <CheckCircle className="w-3 h-3" />
                    Done
                  </span>
                )}
              </div>
              <h3 className="font-bold text-white mb-2">{t.name}</h3>
              <p className="text-sm text-text-muted mb-4 line-clamp-2">{t.desc}</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/user/assessments/${t.slug}`)}
                className="w-full btn-primary py-2 text-sm flex items-center justify-center gap-2"
              >
                {doneSet.has(t.slug) ? 'Retake Test' : 'Begin Test'}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      ) : completed.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-16 text-center"
        >
          <ClipboardCheck className="w-16 h-16 mx-auto text-text-muted mb-4" />
          <p className="text-text-muted">No completed assessments yet</p>
          <p className="text-sm text-text-muted mt-2">Take your first assessment to track your mental health</p>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {completed.map((a: any, i: number) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-sm">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{a.testName}</h3>
                  <p className="text-sm text-text-muted">
                    {new Date(a.takenAt).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                {a.score !== undefined && (
                  <div className="text-3xl font-bold text-gradient">{a.score}</div>
                )}
                {a.resultLabel && <div className="text-sm text-text-muted">{a.resultLabel}</div>}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
