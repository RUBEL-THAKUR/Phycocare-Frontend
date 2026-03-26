import { motion } from 'framer-motion'
import { BookOpen, Play, Clock, Eye, User, Calendar } from 'lucide-react'

const BLOGS = [
  {
    title: '5 Signs You May Need to Talk to a Therapist',
    author: 'Dr. Sakshi Kochhar',
    date: 'Oct 15, 2024',
    tag: 'Mental Health',
    text: 'Recognizing when professional help is needed is the first step to better mental health...'
  },
  {
    title: 'Understanding Anxiety: Causes, Symptoms, and Treatment',
    author: 'Ms. Siva Tharini',
    date: 'Oct 12, 2024',
    tag: 'Anxiety',
    text: 'Anxiety disorders are among the most common mental health conditions worldwide...'
  },
  {
    title: 'The Power of Mindfulness in Daily Life',
    author: 'Ms. Sudipta Das',
    date: 'Oct 8, 2024',
    tag: 'Wellness',
    text: 'Mindfulness is the practice of purposefully focusing your attention on the present moment...'
  }
]

const VIDEOS = [
  { title: 'Introduction to Cognitive Behavioural Therapy', dur: '12:34', views: '2.4K' },
  { title: 'Breathing Exercises for Anxiety Relief', dur: '8:20', views: '5.1K' },
  { title: 'Understanding Depression: A Guide', dur: '15:45', views: '3.8K' },
  { title: 'How to Build Mental Resilience', dur: '10:15', views: '1.9K' }
]

export default function KnowledgeCenter() {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Knowledge Center</h1>
        <p className="text-text-secondary">Articles, videos, and resources for your mental wellness journey</p>
      </motion.div>

      {/* Latest Articles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-bold text-white">Latest Articles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BLOGS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              whileHover={{ y: -4 }}
              className="glass-card-hover p-5 cursor-pointer group"
            >
              <span className="inline-block text-xs bg-accent-purple/20 text-accent-purple px-3 py-1 rounded-full font-medium border border-accent-purple/30 mb-3">
                {b.tag}
              </span>
              <h3 className="font-bold text-white mb-2 line-clamp-2 group-hover:text-gradient transition-colors">
                {b.title}
              </h3>
              <p className="text-sm text-text-muted mb-4 line-clamp-2">{b.text}</p>
              <div className="flex items-center justify-between text-xs text-text-muted pt-3 border-t border-white/10">
                <span className="flex items-center gap-1.5">
                  <User className="w-3 h-3" />
                  {b.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {b.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Videos */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
            <Play className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-bold text-white">Videos</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VIDEOS.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              whileHover={{ y: -4 }}
              className="glass-card-hover overflow-hidden cursor-pointer group"
            >
              {/* Thumbnail */}
              <div className="relative h-32 bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent-purple/80 transition-colors"
                >
                  <Play className="w-6 h-6 text-white ml-1" />
                </motion.div>
                <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/60 text-xs text-white font-medium">
                  {v.dur}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-white text-sm mb-3 line-clamp-2 group-hover:text-accent-purple transition-colors">
                  {v.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {v.dur}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {v.views} views
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
