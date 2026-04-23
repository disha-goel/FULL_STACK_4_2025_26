import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postJob } from '../services/api'
import styles from './PostJob.module.css'

const initialForm = {
  title: '', company: '', location: '', salary: '',
  jobType: 'Full-Time', description: '', requirements: ''
}

export default function PostJob() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await postJob(form)
      setSubmitted(true)
    } catch {
      setError('Failed to post job. Make sure the backend is running.')
    }
  }

  if (submitted) return (
    <div className={styles.container}>
      <div className={styles.success}>
        <h2>✅ Job Posted Successfully!</h2>
        <p>Your job listing is now live.</p>
        <button onClick={() => navigate('/jobs')}>Browse Jobs</button>
        <button onClick={() => { setForm(initialForm); setSubmitted(false) }}>Post Another</button>
      </div>
    </div>
  )

  return (
    <div className={styles.container}>
      <h2>Post a Job</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div>
            <label>Job Title *</label>
            <input name="title" required value={form.title} onChange={handleChange} placeholder="e.g. Software Engineer" />
          </div>
          <div>
            <label>Company Name *</label>
            <input name="company" required value={form.company} onChange={handleChange} placeholder="e.g. TechCorp Pvt Ltd" />
          </div>
        </div>
        <div className={styles.row}>
          <div>
            <label>Location *</label>
            <input name="location" required value={form.location} onChange={handleChange} placeholder="e.g. Hyderabad" />
          </div>
          <div>
            <label>Salary</label>
            <input name="salary" value={form.salary} onChange={handleChange} placeholder="e.g. ₹8-12 LPA" />
          </div>
        </div>
        <div>
          <label>Job Type</label>
          <select name="jobType" value={form.jobType} onChange={handleChange}>
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Remote</option>
            <option>Internship</option>
            <option>Contract</option>
          </select>
        </div>
        <div>
          <label>Job Description *</label>
          <textarea name="description" required rows={5} value={form.description}
            onChange={handleChange} placeholder="Describe the role and responsibilities..." />
        </div>
        <div>
          <label>Requirements</label>
          <textarea name="requirements" rows={4} value={form.requirements}
            onChange={handleChange} placeholder="Skills, experience, qualifications..." />
        </div>
        <button type="submit">Post Job</button>
      </form>
    </div>
  )
}
