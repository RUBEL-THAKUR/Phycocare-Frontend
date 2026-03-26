import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserData {
  userId: number
  firstName: string
  lastName: string
  emailId: string
  username: string
  walletBalance: number
  referralCode: string
  profileImage?: string
  gender?: string
  dateOfBirth?: string
  timezone?: string
  mobileNumber?: string
}

interface TherapistData {
  id: string
  firstName: string
  lastName: string
  emailId: string
  status: string
}

interface AuthState {
  token: string | null
  role: 'USER' | 'THERAPIST' | 'ADMIN' | null
  user: UserData | null
  therapist: TherapistData | null
  adminName: string | null
  setUserAuth: (token: string, user: UserData) => void
  setTherapistAuth: (token: string, therapist: TherapistData) => void
  setAdminAuth: (token: string, name: string) => void
  updateUser: (partial: Partial<UserData>) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      user: null,
      therapist: null,
      adminName: null,

      setUserAuth: (token, user) => {
        localStorage.setItem('token', token)
        set({ token, role: 'USER', user, therapist: null, adminName: null })
      },

      setTherapistAuth: (token, therapist) => {
        localStorage.setItem('token', token)
        set({ token, role: 'THERAPIST', therapist, user: null, adminName: null })
      },

      setAdminAuth: (token, name) => {
        localStorage.setItem('token', token)
        set({ token, role: 'ADMIN', adminName: name, user: null, therapist: null })
      },

      updateUser: (partial) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partial } : null
        })),

      logout: () => {
        localStorage.removeItem('token')
        set({ token: null, role: null, user: null, therapist: null, adminName: null })
      }
    }),
    { name: 'psychocare-auth' }
  )
)
