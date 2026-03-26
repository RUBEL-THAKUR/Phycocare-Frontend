import api from './axios'

export const authApi = {
  signup: (d: object) => api.post('/api/auth/signup', d),
  login: (d: object) => api.post('/api/auth/login', d),
  requestOtp: (identifier: string) => api.post('/api/auth/request-otp', { identifier }),
  verifyOtp: (identifier: string, otp: string) => api.post('/api/auth/verify-otp', { identifier, otp })
}

export const userApi = {
  getProfile: () => api.get('/api/user/profile'),
  updateProfile: (d: object) => api.put('/api/user/profile', d),
  changePassword: (d: object) => api.post('/api/user/change-password', d),
  getWallet: () => api.get('/api/user/wallet'),
  addMoney: (d: object) => api.post('/api/user/wallet/add', d),
  getTransactions: (page = 0) => api.get(`/api/user/wallet/transactions?page=${page}&size=10`),
  bookSession: (d: object) => api.post('/api/user/sessions/book', d),
  getSessions: (status?: string, page = 0) =>
    api.get(`/api/user/sessions?page=${page}&size=10${status ? `&status=${status}` : ''}`),
  cancelSession: (id: number, reason = '') =>
    api.post(`/api/user/sessions/${id}/cancel?reason=${encodeURIComponent(reason)}`),
  submitFeedback: (d: object) => api.post('/api/user/feedback', d),
  composeMessage: (d: object) => api.post('/api/user/messages/compose', d),
  getInbox: (page = 0) => api.get(`/api/user/messages/inbox?page=${page}`),
  getSentMessages: (page = 0) => api.get(`/api/user/messages/sent?page=${page}`),
  getStarred: (page = 0) => api.get(`/api/user/messages/starred?page=${page}`),
  getImportant: (page = 0) => api.get(`/api/user/messages/important?page=${page}`),
  getTrash: (page = 0) => api.get(`/api/user/messages/trash?page=${page}`),
  toggleStar: (id: number) => api.patch(`/api/user/messages/${id}/star`),
  toggleImportant: (id: number) => api.patch(`/api/user/messages/${id}/important`),
  deleteMessage: (id: number) => api.delete(`/api/user/messages/${id}`),
  submitAssessment: (d: object) => api.post('/api/user/assessments', d),
  getCompletedAssessments: () => api.get('/api/user/assessments/completed'),
  getPrescriptions: (page = 0) => api.get(`/api/user/prescriptions?page=${page}`),
  getReferrals: (page = 0) => api.get(`/api/user/referrals?page=${page}`),
  getRewards: () => api.get('/api/user/rewards')
}

export const publicApi = {
  listTherapists: (search = '') =>
    api.get(`/api/therapists/public${search ? `?search=${encodeURIComponent(search)}` : ''}`),
  getTherapist: (id: string) => api.get(`/api/therapists/public/${id}`)
}

export const therapistAuthApi = {
  signup: (fd: FormData) =>
    api.post('/api/therapist/signup', fd, { headers: { 'Content-Type': 'multipart/form-data' } }),
  login: (d: object) => api.post('/api/therapist/login', d)
}

export const therapistApi = {
  getProfile: () => api.get('/api/therapist/profile/basic-info'),
  saveProfile: (d: object) => api.post('/api/therapist/profile/basic-info', d),
  getQualifications: () => api.get('/api/therapist/profile/qualifications'),
  addQualification: (d: object) => api.post('/api/therapist/profile/qualifications', d),
  deleteQualification: (id: number) => api.delete(`/api/therapist/profile/qualifications/${id}`),
  getExperiences: () => api.get('/api/therapist/profile/experience'),
  addExperience: (d: object) => api.post('/api/therapist/profile/experience', d),
  deleteExperience: (id: number) => api.delete(`/api/therapist/profile/experience/${id}`),
  getSpecializations: () => api.get('/api/therapist/profile/specializations'),
  addSpecialization: (d: object) => api.post('/api/therapist/profile/specializations', d),
  deleteSpecialization: (id: number) => api.delete(`/api/therapist/profile/specializations/${id}`),
  getExpertise: () => api.get('/api/therapist/profile/expertise'),
  addExpertise: (d: object) => api.post('/api/therapist/profile/expertise', d),
  deleteExpertise: (id: number) => api.delete(`/api/therapist/profile/expertise/${id}`),
  getAwards: () => api.get('/api/therapist/profile/awards'),
  addAward: (d: object) => api.post('/api/therapist/profile/awards', d),
  deleteAward: (id: number) => api.delete(`/api/therapist/profile/awards/${id}`),
  getMemberships: () => api.get('/api/therapist/profile/memberships'),
  addMembership: (d: object) => api.post('/api/therapist/profile/memberships', d),
  deleteMembership: (id: number) => api.delete(`/api/therapist/profile/memberships/${id}`),
  getBankDetails: () => api.get('/api/therapist/profile/bank-details'),
  saveBankDetails: (d: object) => api.post('/api/therapist/profile/bank-details', d),
  getSessions: (status?: string, page = 0) =>
    api.get(`/api/therapist/profile/sessions?page=${page}${status ? `&status=${status}` : ''}`),
  completeSession: (id: number) => api.post(`/api/therapist/profile/sessions/${id}/complete`),
  cancelSession: (id: number, reason = '') =>
    api.post(`/api/therapist/profile/sessions/${id}/cancel?reason=${encodeURIComponent(reason)}`),
  getPrescriptions: (page = 0) => api.get(`/api/therapist/profile/prescriptions?page=${page}`),
  createPrescription: (d: object) => api.post('/api/therapist/profile/prescriptions', d)
}

export const adminApi = {
  login: (d: object) => api.post('/api/admin/auth/login', d),
  getStats: () => api.get('/api/admin/stats'),
  getTherapists: (status?: string) =>
    api.get(`/api/admin/therapists${status ? `?status=${status}` : ''}`),
  approveTherapist: (id: string) => api.put(`/api/admin/therapists/${id}/approve`),
  rejectTherapist: (id: string, reason: string) =>
    api.put(`/api/admin/therapists/${id}/reject?reason=${encodeURIComponent(reason)}`),
  getUsers: () => api.get('/api/admin/users')
}

export const chatApi = {
  getHistory: (sessionId: number) => api.get(`/api/chat/history/${sessionId}`)
}
