// import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useAuthStore } from '../../store/authStore'
// import {
//   LayoutDashboard,
//   Calendar,
//   Video,
//   Wallet,
//   MessageSquare,
//   Heart,
//   BookOpen,
//   ClipboardCheck,
//   MessageCircle,
//   Gift,
//   User,
//   FileText,
//   Award,
//   LogOut,
//   Sparkles,
//   ChevronRight
// } from 'lucide-react'
//
// const NAV = [
//   { to: '/user/dashboard', label: 'Dashboard', icon: LayoutDashboard },
//   { to: '/user/book-session', label: 'Book A Session', icon: Calendar },
//   { to: '/user/sessions', label: 'Online Sessions', icon: Video },
//   { to: '/user/wallet', label: 'Wallet', icon: Wallet },
//   { to: '/user/messages', label: 'Messages', icon: MessageSquare },
//   { to: '/user/self-care', label: 'Self Care Tools', icon: Heart },
//   { to: '/user/knowledge-center', label: 'Knowledge Center', icon: BookOpen },
//   { to: '/user/assessments', label: 'Assessment', icon: ClipboardCheck },
//   { to: '/user/feedback', label: 'Feedback', icon: MessageCircle },
//   { to: '/user/refer-earn', label: 'Refer & Earn', icon: Gift },
//   { to: '/user/profile', label: 'Profile', icon: User },
//   { to: '/user/prescriptions', label: 'Prescriptions', icon: FileText },
//   { to: '/user/rewards', label: 'Rewards', icon: Award },
// ]
//
// export default function UserLayout() {
//   const { user, logout } = useAuthStore()
//   const navigate = useNavigate()
//   const location = useLocation()
//
//   return (
//     <div className="flex h-screen overflow-hidden bg-dark-900">
//       {/* Sidebar */}
//       <aside className="w-64 bg-dark-800/50 backdrop-blur-xl border-r border-white/5 flex flex-col flex-shrink-0">
//         {/* Logo */}
//         <div className="p-5 border-b border-white/5">
//           <div className="flex items-center gap-2">
//             <Sparkles className="w-7 h-7 text-accent-purple" />
//             <div>
//               <div className="text-xl font-bold text-gradient">PsychoCare</div>
//               <div className="text-[10px] text-text-muted uppercase tracking-wider">Mental Health Platform</div>
//             </div>
//           </div>
//         </div>
//
//         {/* User Profile */}
//         <div className="p-4 border-b border-white/5">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold text-sm shadow-glow-sm flex-shrink-0">
//               {user?.firstName?.[0]}{user?.lastName?.[0]}
//             </div>
//             <div className="overflow-hidden flex-1">
//               <div className="text-sm font-semibold text-white truncate">
//                 {user?.firstName} {user?.lastName}
//               </div>
//               <div className="text-xs text-text-muted truncate">
//                 {user?.emailId}
//               </div>
//             </div>
//           </div>
//         </div>
//
//         {/* Navigation */}
//         <nav className="flex-1 p-3 overflow-y-auto">
//           <div className="space-y-1">
//             {NAV.map((item) => {
//               const Icon = item.icon
//               const isActive = location.pathname === item.to
//
//               return (
//                 <NavLink
//                   key={item.to}
//                   to={item.to}
//                   className="block"
//                 >
//                   <motion.div
//                     whileHover={{ x: 4 }}
//                     className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
//                       isActive
//                         ? 'bg-gradient-to-r from-accent-purple/20 to-accent-blue/10 text-white font-medium'
//                         : 'text-text-secondary hover:text-white hover:bg-white/5'
//                     }`}
//                   >
//                     {isActive && (
//                       <motion.div
//                         layoutId="activeIndicator"
//                         className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-primary rounded-r-full"
//                       />
//                     )}
//                     <Icon className={`w-4 h-4 ${isActive ? 'text-accent-purple' : ''}`} />
//                     <span className="flex-1">{item.label}</span>
//                     {isActive && <ChevronRight className="w-3 h-3 text-accent-purple" />}
//                   </motion.div>
//                 </NavLink>
//               )
//             })}
//           </div>
//         </nav>
//
//         {/* Logout Button */}
//         <div className="p-4 border-t border-white/5">
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => {
//               logout()
//               navigate('/login')
//             }}
//             className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-red-500/20 to-red-600/10 text-red-400 font-medium text-sm hover:from-red-500/30 hover:to-red-600/20 transition-all border border-red-500/20"
//           >
//             <LogOut className="w-4 h-4" />
//             Logout
//           </motion.button>
//         </div>
//       </aside>
//
//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto">
//         <div className="p-6 lg:p-8">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={location.pathname}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.2 }}
//             >
//               <Outlet />
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </main>
//     </div>
//   )
// }

import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'

export default function UserLayout() {
  const location = useLocation()

  return (
    <div style={{ minHeight: '100vh', background: '#F8F5EF' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}