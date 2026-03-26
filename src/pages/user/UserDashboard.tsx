import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'
import {
  Calendar,
  Video,
  Wallet,
  ClipboardCheck,
  MessageSquare,
  Star,
  Heart,
  BookOpen,
  Users,
  Gift,
  User,
  FileText,
  Award,
  ArrowRight
} from 'lucide-react'

const CARDS = [
  {
    title: 'Book a Session',
    desc: 'Connect with a therapist',
    to: '/user/book-session',
    icon: Calendar,
    gradient: 'from-accent-purple to-accent-blue'
  },
  {
    title: 'Online Sessions',
    desc: 'View your sessions',
    to: '/user/sessions',
    icon: Video,
    gradient: 'from-accent-blue to-accent-cyan'
  },
  {
    title: 'Add Money',
    desc: 'Top up your wallet',
    to: '/user/wallet',
    icon: Wallet,
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Assessment',
    desc: 'Take a self-assessment',
    to: '/user/assessments',
    icon: ClipboardCheck,
    gradient: 'from-accent-cyan to-blue-500'
  },
  {
    title: 'View Messages',
    desc: 'Check your inbox',
    to: '/user/messages',
    icon: MessageSquare,
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    title: 'Give Review',
    desc: 'Share your feedback',
    to: '/user/feedback',
    icon: Star,
    gradient: 'from-orange-500 to-red-500'
  },
  {
    title: 'Self Care Tools',
    desc: 'Mood tracker & habits',
    to: '/user/self-care',
    icon: Heart,
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    title: 'Knowledge Center',
    desc: 'Blogs & videos',
    to: '/user/knowledge-center',
    icon: BookOpen,
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    title: 'Community',
    desc: 'Join our community',
    to: '/user/dashboard',
    icon: Users,
    gradient: 'from-rose-500 to-pink-500'
  },
  {
    title: 'Refer & Earn',
    desc: 'Earn wallet credits',
    to: '/user/refer-earn',
    icon: Gift,
    gradient: 'from-accent-gold to-yellow-500'
  },
  {
    title: 'Update Profile',
    desc: 'Manage your info',
    to: '/user/profile',
    icon: User,
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    title: 'Prescription',
    desc: 'View prescriptions',
    to: '/user/prescriptions',
    icon: FileText,
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    title: 'Rewards',
    desc: 'Claim your rewards',
    to: '/user/rewards',
    icon: Award,
    gradient: 'from-violet-500 to-purple-500'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
}

export default function UserDashboard() {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, <span className="text-gradient">{user?.firstName}</span>
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-text-secondary">
            Your mental health journey continues here
          </p>
          <div className="glass-card px-4 py-2 flex items-center gap-2">
            <Wallet className="w-4 h-4 text-accent-gold" />
            <span className="text-sm text-text-secondary">Balance:</span>
            <span className="text-sm font-bold text-gradient-gold">
              Rs. {(user?.walletBalance || 0).toFixed(2)}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {CARDS.map((card) => {
          const Icon = card.icon

          return (
            <motion.div
              key={card.title}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => navigate(card.to)}
              className="group cursor-pointer"
            >
              <div className="glass-card-hover p-5 h-full relative overflow-hidden">
                {/* Gradient glow on hover */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${card.gradient}`}
                />

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-glow transition-shadow duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-base font-semibold text-white mb-1 group-hover:text-gradient transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-text-muted mb-4">{card.desc}</p>

                {/* Action */}
                <div className="flex items-center gap-2 text-sm text-accent-purple group-hover:text-white transition-colors">
                  <span className="font-medium">Get Started</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="glass-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-sm text-text-muted">Sessions Completed</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-gold to-yellow-500 flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-sm text-text-muted">Reward Points</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Good</p>
              <p className="text-sm text-text-muted">Wellness Score</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
