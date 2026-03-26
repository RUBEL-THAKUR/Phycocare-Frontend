import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { userApi } from '../../api'
import toast from 'react-hot-toast'
import { ArrowLeft, CheckCircle2, Calendar, Sparkles } from 'lucide-react'

const TESTS_MAP: Record<string, string> = {
  addiction: 'Addiction Assessment',
  adhd: 'ADHD Assessment',
  'adjustment-disorder': 'Adjustment Disorder',
  anxiety: 'Anxiety Assessment',
  bipolar: 'Bipolar Disorder',
  depression: 'Depression Assessment',
  ocd: 'OCD Assessment',
  ptsd: 'PTSD Assessment',
  sleep: 'Sleep Disorder',
  stress: 'Stress Assessment'
}

const QUESTIONS = [
  'How often have you felt overwhelmed by daily activities?',
  'How often have you had trouble concentrating?',
  'How often have you felt hopeless or sad?',
  'How often have you had difficulty sleeping?',
  'How often have you felt anxious or worried?',
  'How often have you avoided social situations?',
  'How often have you had physical symptoms like headaches or fatigue?'
]

const OPTS = [
  { l: 'Not at all', v: 0 },
  { l: 'Several days', v: 1 },
  { l: 'More than half the days', v: 2 },
  { l: 'Nearly every day', v: 3 }
]

function label(score: number) {
  return score <= 4 ? 'Minimal' : score <= 9 ? 'Mild' : score <= 14 ? 'Moderate' : 'Severe'
}

function labelColor(l: string) {
  switch (l) {
    case 'Minimal': return 'from-emerald-500 to-teal-500'
    case 'Mild': return 'from-yellow-500 to-orange-500'
    case 'Moderate': return 'from-orange-500 to-red-500'
    case 'Severe': return 'from-red-500 to-pink-500'
    default: return 'from-neon-pink to-neon-purple'
  }
}

export default function AssessmentTest() {
  const { slug } = useParams<{ slug: string }>()
  const name = TESTS_MAP[slug || ''] || 'Assessment'
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ score: number; label: string } | null>(null)
  const navigate = useNavigate()

  async function submit() {
    if (Object.keys(answers).length < QUESTIONS.length) {
      toast.error('Answer all questions')
      return
    }
    const score = Object.values(answers).reduce((s, v) => s + v, 0)
    const l = label(score)
    setSubmitting(true)
    try {
      await userApi.submitAssessment({
        testName: name,
        testSlug: slug,
        score,
        resultLabel: l,
        answers: JSON.stringify(answers)
      })
      setResult({ score, label: l })
      toast.success('Assessment saved!')
    } catch {
      toast.error('Failed to save')
    } finally {
      setSubmitting(false)
    }
  }

  if (result)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto"
      >
        <div className="glass-card p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center"
          >
            <CheckCircle2 className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-2xl font-bold text-white mb-2">Assessment Complete</h2>
          <p className="text-white/60 mb-8">{name}</p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`rounded-2xl p-6 mb-8 bg-gradient-to-br ${labelColor(result.label)} bg-opacity-20`}
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <div className="text-xs text-white/50 uppercase tracking-wider mb-2">Your Score</div>
            <div className={`text-5xl font-black bg-gradient-to-r ${labelColor(result.label)} bg-clip-text text-transparent`}>
              {result.score}
            </div>
            <div className="text-lg font-semibold text-white mt-2">{result.label}</div>
          </motion.div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/user/assessments')}
              className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 transition-all font-medium"
            >
              Back to Assessments
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(233,30,140,0.4)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/user/book-session')}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple text-white font-semibold flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book Session
            </motion.button>
          </div>
        </div>
      </motion.div>
    )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto"
    >
      <motion.button
        whileHover={{ x: -5 }}
        onClick={() => navigate('/user/assessments')}
        className="flex items-center gap-2 text-neon-pink hover:text-neon-purple transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Assessments</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">{name}</h1>
        </div>

        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-pink to-neon-purple rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(Object.keys(answers).length / QUESTIONS.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 100 }}
          />
        </div>
        <div className="text-sm text-white/50 mt-2">
          {Object.keys(answers).length} of {QUESTIONS.length} questions answered
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {QUESTIONS.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-5 mb-4"
          >
            <p className="font-semibold text-white mb-4">
              <span className="text-neon-pink mr-2">{i + 1}.</span>
              {q}
            </p>
            <div className="space-y-2">
              {OPTS.map(o => (
                <motion.label
                  key={o.v}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    answers[i] === o.v
                      ? 'bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 border border-neon-pink/50'
                      : 'bg-white/5 border border-transparent hover:bg-white/10'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      answers[i] === o.v ? 'border-neon-pink bg-neon-pink' : 'border-white/30'
                    }`}
                  >
                    {answers[i] === o.v && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-white"
                      />
                    )}
                  </div>
                  <input
                    type="radio"
                    name={`q${i}`}
                    checked={answers[i] === o.v}
                    onChange={() => setAnswers(a => ({ ...a, [i]: o.v }))}
                    className="sr-only"
                  />
                  <span className={`text-sm ${answers[i] === o.v ? 'text-white' : 'text-white/70'}`}>
                    {o.l}
                  </span>
                </motion.label>
              ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.button
        whileHover={{
          scale: Object.keys(answers).length < QUESTIONS.length ? 1 : 1.02,
          boxShadow: Object.keys(answers).length < QUESTIONS.length ? 'none' : '0 0 30px rgba(233,30,140,0.4)'
        }}
        whileTap={{ scale: Object.keys(answers).length < QUESTIONS.length ? 1 : 0.98 }}
        onClick={submit}
        disabled={submitting || Object.keys(answers).length < QUESTIONS.length}
        className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${
          Object.keys(answers).length < QUESTIONS.length
            ? 'bg-white/10 cursor-not-allowed opacity-50'
            : 'bg-gradient-to-r from-neon-pink to-neon-purple cursor-pointer'
        }`}
      >
        {submitting ? (
          <span className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            />
            Submitting...
          </span>
        ) : (
          'Submit Assessment'
        )}
      </motion.button>
    </motion.div>
  )
}
