import api from './axios'

// ─────────────────────────────────────────────
// AUTH API  →  Login, Signup, OTP
// ─────────────────────────────────────────────
export const authApi = {
  // Create a new user account
  signup: (d: object) => api.post('/api/auth/signup', d),

  // Login with email/password
  login: (d: object) => api.post('/api/auth/login', d),

  // Send OTP to email or phone
  requestOtp: (identifier: string) => api.post('/api/auth/request-otp', { identifier }),

  // Verify the OTP that user entered
  verifyOtp: (identifier: string, otp: string) => api.post('/api/auth/verify-otp', { identifier, otp })
}

// ─────────────────────────────────────────────
// USER API  →  Everything a normal user can do
// ─────────────────────────────────────────────
export const userApi = {
  // Get logged-in user's profile info
  getProfile: () => api.get('/api/user/profile'),

  // Update profile details (name, photo, etc.)
  updateProfile: (d: object) => api.put('/api/user/profile', d),

  // Change account password
  changePassword: (d: object) => api.post('/api/user/change-password', d),

  // Get wallet balance
  getWallet: () => api.get('/api/user/wallet'),

  // Add money to wallet
  addMoney: (d: object) => api.post('/api/user/wallet/add', d),

  // Get wallet transaction history (10 per page)
  getTransactions: (page = 0) => api.get(`/api/user/wallet/transactions?page=${page}&size=10`),

  // Book a session with a therapist
  bookSession: (d: object) => api.post('/api/user/sessions/book', d),

  // Get list of sessions — optional filter by status (PENDING, COMPLETED, etc.)
  getSessions: (status?: string, page = 0) =>
    api.get(`/api/user/sessions?page=${page}&size=10${status ? `&status=${status}` : ''}`),

  // Cancel a booked session by session ID
  cancelSession: (id: number, reason = '') =>
    api.post(`/api/user/sessions/${id}/cancel?reason=${encodeURIComponent(reason)}`),

  // Submit feedback/rating after a session
  submitFeedback: (d: object) => api.post('/api/user/feedback', d),

  // Send a new message to someone
  composeMessage: (d: object) => api.post('/api/user/messages/compose', d),

  // Get inbox messages (received)
  getInbox: (page = 0) => api.get(`/api/user/messages/inbox?page=${page}`),

  // Get sent messages
  getSentMessages: (page = 0) => api.get(`/api/user/messages/sent?page=${page}`),

  // Get starred/saved messages
  getStarred: (page = 0) => api.get(`/api/user/messages/starred?page=${page}`),

  // Get messages marked as important
  getImportant: (page = 0) => api.get(`/api/user/messages/important?page=${page}`),

  // Get deleted messages (trash)
  getTrash: (page = 0) => api.get(`/api/user/messages/trash?page=${page}`),

  // Star or unstar a message by ID
  toggleStar: (id: number) => api.patch(`/api/user/messages/${id}/star`),

  // Mark or unmark a message as important
  toggleImportant: (id: number) => api.patch(`/api/user/messages/${id}/important`),

  // Delete a message permanently
  deleteMessage: (id: number) => api.delete(`/api/user/messages/${id}`),

  // Submit a mental health assessment test
  submitAssessment: (d: object) => api.post('/api/user/assessments', d),

  // Get all assessments user has completed
  getCompletedAssessments: () => api.get('/api/user/assessments/completed'),

  // Get prescriptions given by therapist
  getPrescriptions: (page = 0) => api.get(`/api/user/prescriptions?page=${page}`),

  // Get referral history (who you referred)
  getReferrals: (page = 0) => api.get(`/api/user/referrals?page=${page}`),

  // Get rewards/points earned by user
  getRewards: () => api.get('/api/user/rewards')
}

// ─────────────────────────────────────────────
// PUBLIC API  →  No login needed, open for all
// ─────────────────────────────────────────────
export const publicApi = {
  // Get list of all therapists (with optional search keyword)
  listTherapists: (search = '') =>
    api.get(`/api/therapists/public${search ? `?search=${encodeURIComponent(search)}` : ''}`),

  // Get details of one specific therapist by their ID
  getTherapist: (id: string) => api.get(`/api/therapists/public/${id}`)
}

// ─────────────────────────────────────────────
// THERAPIST AUTH API  →  Therapist login/signup
// ─────────────────────────────────────────────
export const therapistAuthApi = {
  // Therapist signup — sends form data (with CV/documents as file upload)
  signup: (fd: FormData) =>
    api.post('/api/therapist/signup', fd, { headers: { 'Content-Type': 'multipart/form-data' } }),

  // Therapist login with email/password
  login: (d: object) => api.post('/api/therapist/login', d)
}

// ─────────────────────────────────────────────
// THERAPIST API  →  Everything a therapist can do
// ─────────────────────────────────────────────
export const therapistApi = {
  // Get therapist's own basic profile info
  getProfile: () => api.get('/api/therapist/profile/basic-info'),

  // Save/update basic profile info
  saveProfile: (d: object) => api.post('/api/therapist/profile/basic-info', d),

  // Get list of qualifications (degrees, certifications)
  getQualifications: () => api.get('/api/therapist/profile/qualifications'),

  // Add a new qualification
  addQualification: (d: object) => api.post('/api/therapist/profile/qualifications', d),

  // Delete a qualification by ID
  deleteQualification: (id: number) => api.delete(`/api/therapist/profile/qualifications/${id}`),

  // Get work experience list
  getExperiences: () => api.get('/api/therapist/profile/experience'),

  // Add a new experience entry
  addExperience: (d: object) => api.post('/api/therapist/profile/experience', d),

  // Delete an experience entry by ID
  deleteExperience: (id: number) => api.delete(`/api/therapist/profile/experience/${id}`),

  // Get list of therapy specializations (e.g. anxiety, depression)
  getSpecializations: () => api.get('/api/therapist/profile/specializations'),

  // Add a new specialization
  addSpecialization: (d: object) => api.post('/api/therapist/profile/specializations', d),

  // Delete a specialization by ID
  deleteSpecialization: (id: number) => api.delete(`/api/therapist/profile/specializations/${id}`),

  // Get list of expertise areas
  getExpertise: () => api.get('/api/therapist/profile/expertise'),

  // Add a new expertise area
  addExpertise: (d: object) => api.post('/api/therapist/profile/expertise', d),

  // Delete an expertise by ID
  deleteExpertise: (id: number) => api.delete(`/api/therapist/profile/expertise/${id}`),

  // Get list of awards/achievements
  getAwards: () => api.get('/api/therapist/profile/awards'),

  // Add a new award
  addAward: (d: object) => api.post('/api/therapist/profile/awards', d),

  // Delete an award by ID
  deleteAward: (id: number) => api.delete(`/api/therapist/profile/awards/${id}`),

  // Get professional memberships (associations, councils)
  getMemberships: () => api.get('/api/therapist/profile/memberships'),

  // Add a new membership
  addMembership: (d: object) => api.post('/api/therapist/profile/memberships', d),

  // Delete a membership by ID
  deleteMembership: (id: number) => api.delete(`/api/therapist/profile/memberships/${id}`),

  // Get saved bank account details
  getBankDetails: () => api.get('/api/therapist/profile/bank-details'),

  // Save or update bank details for payouts
  saveBankDetails: (d: object) => api.post('/api/therapist/profile/bank-details', d),

  // Get therapist's session list — optional filter by status
  getSessions: (status?: string, page = 0) =>
    api.get(`/api/therapist/profile/sessions?page=${page}${status ? `&status=${status}` : ''}`),

  // Mark a session as completed
  completeSession: (id: number) => api.post(`/api/therapist/profile/sessions/${id}/complete`),

  // Cancel a session with a reason
  cancelSession: (id: number, reason = '') =>
    api.post(`/api/therapist/profile/sessions/${id}/cancel?reason=${encodeURIComponent(reason)}`),

  // Get all prescriptions therapist has written
  getPrescriptions: (page = 0) => api.get(`/api/therapist/profile/prescriptions?page=${page}`),

  // Create a new prescription for a user
  createPrescription: (d: object) => api.post('/api/therapist/profile/prescriptions', d)
}

// ─────────────────────────────────────────────
// ADMIN API  →  Only admin can use these
// ─────────────────────────────────────────────
export const adminApi = {
  // Admin login
  login: (d: object) => api.post('/api/admin/auth/login', d),

  // Get dashboard stats (total users, sessions, revenue, etc.)
  getStats: () => api.get('/api/admin/stats'),

  // Get all therapists — optional filter by status (PENDING, APPROVED, REJECTED)
  getTherapists: (status?: string) =>
    api.get(`/api/admin/therapists${status ? `?status=${status}` : ''}`),

  // Approve a therapist application by their ID
  approveTherapist: (id: string) => api.put(`/api/admin/therapists/${id}/approve`),

  // Reject a therapist with a reason
  rejectTherapist: (id: string, reason: string) =>
    api.put(`/api/admin/therapists/${id}/reject?reason=${encodeURIComponent(reason)}`),

  // Get list of all registered users
  getUsers: () => api.get('/api/admin/users')
}

// ─────────────────────────────────────────────
// CHAT API  →  Session chat messages
// ─────────────────────────────────────────────
export const chatApi = {
  // Get full chat history of a session by session ID
  getHistory: (sessionId: number) => api.get(`/api/chat/history/${sessionId}`)
}

