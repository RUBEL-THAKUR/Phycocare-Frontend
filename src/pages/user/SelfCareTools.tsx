import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Check, Dumbbell, Brain, BookOpen, Wind, TreePine, Apple, Moon } from 'lucide-react'

const MOODS = [
  { e: 'Happy', icon: '😊', color: 'from-yellow-500 to-orange-500' },
  { e: 'Neutral', icon: '😐', color: 'from-gray-400 to-gray-500' },
  { e: 'Sad', icon: '😔', color: 'from-blue-400 to-blue-500' },
  { e: 'Anxious', icon: '😰', color: 'from-purple-400 to-purple-500' },
  { e: 'Angry', icon: '😡', color: 'from-red-400 to-red-500' },
  { e: 'Tired', icon: '😴', color: 'from-indigo-400 to-indigo-500' }
]

const HABITS = [
  { name: 'Exercise', icon: Dumbbell },
  { name: 'Meditation', icon: Brain },
  { name: 'Journaling', icon: BookOpen },
  { name: 'Reading', icon: BookOpen },
  { name: 'Deep Breathing', icon: Wind },
  { name: 'Nature Walk', icon: TreePine },
  { name: 'Healthy Eating', icon: Apple },
  { name: 'Adequate Sleep', icon: Moon }
]

export default function SelfCareTools() {
  const [mood, setMood] = useState<string | null>(null)
  const [habits, setHabits] = useState<string[]>([])
  const [saved, setSaved] = useState(false)

  function toggleHabit(h: string) {
    setHabits((p) => (p.includes(h) ? p.filter((x) => x !== h) : [...p, h]))
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Self Care Tools</h1>
        <p className="text-text-secondary">Track your mood and healthy habits</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mood Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-white">Mood Tracker</h2>
              <p className="text-sm text-text-muted">How are you feeling today?</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {MOODS.map((m) => (
              <motion.button
                key={m.e}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMood(m.e)}
                className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                  mood === m.e
                    ? 'border-accent-purple bg-accent-purple/10'
                    : 'border-white/10 bg-dark-500/50 hover:border-white/20'
                }`}
              >
                <span className="text-3xl mb-2">{m.icon}</span>
                <span
                  className={`text-xs font-medium ${mood === m.e ? 'text-white' : 'text-text-muted'}`}
                >
                  {m.e}
                </span>
              </motion.button>
            ))}
          </div>

          {mood && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-3 rounded-xl bg-gradient-to-r from-accent-purple/20 to-accent-blue/10 border border-accent-purple/30"
            >
              <span className="text-sm text-accent-purple font-medium">
                Current mood: <span className="text-white">{mood}</span>
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Health Habits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-white">Health Habits</h2>
              <p className="text-sm text-text-muted">Which habits did you practice today?</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {HABITS.map((h) => {
              const Icon = h.icon
              const isSelected = habits.includes(h.name)
              return (
                <motion.button
                  key={h.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleHabit(h.name)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-green-500/50 bg-green-500/10'
                      : 'border-white/10 bg-dark-500/50 hover:border-white/20'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                      isSelected ? 'bg-green-500 text-white' : 'bg-white/10'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-green-400' : 'text-text-muted'}`} />
                  <span
                    className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-text-secondary'}`}
                  >
                    {h.name}
                  </span>
                </motion.button>
              )
            })}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSaved(true)}
            className={`w-full py-3 rounded-xl font-semibold transition-all ${
              saved
                ? 'bg-green-500 text-white'
                : 'bg-gradient-primary text-white shadow-glow-sm hover:shadow-glow'
            }`}
          >
            {saved ? 'Saved for Today!' : 'Save for Today'}
          </motion.button>
        </motion.div>
      </div>

      {/* Summary */}
      {(mood || habits.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 mt-6"
        >
          <h2 className="font-bold text-white mb-4">Today's Summary</h2>
          <div className="flex flex-wrap gap-3">
            {mood && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-purple/10 border border-accent-purple/30">
                <span className="text-lg">{MOODS.find((m) => m.e === mood)?.icon}</span>
                <span className="text-sm text-white font-medium">{mood}</span>
              </div>
            )}
            {habits.map((h) => {
              const habit = HABITS.find((hab) => hab.name === h)
              const Icon = habit?.icon || Check
              return (
                <div
                  key={h}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/30"
                >
                  <Icon className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-white font-medium">{h}</span>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}
    </div>
  )
}
