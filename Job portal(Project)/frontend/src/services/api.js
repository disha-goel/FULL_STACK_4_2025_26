import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

// Attach JWT token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('easyjobs_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Jobs
export const getAllJobs = (keyword = '', location = '') =>
  api.get('/jobs', { params: { keyword, location } })

export const getJobById = (id) =>
  api.get(`/jobs/${id}`)

export const postJob = (jobData) =>
  api.post('/jobs', jobData)

export const applyForJob = (jobId, applicationData) =>
  api.post(`/jobs/${jobId}/apply`, applicationData)

export const getMyApplications = () =>
  api.get('/jobs/my-applications')

// Auth
export const registerUser = (data) =>
  api.post('/auth/register', data)

export const loginUser = (data) =>
  api.post('/auth/login', data)
