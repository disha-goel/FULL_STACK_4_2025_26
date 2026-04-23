import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getJobById, applyForJob } from '../services/api'
import styles from './JobDetail.module.css'

export default function JobDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ applicantName: '', email: '', phone: '', coverLetter: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    getJobById(id)
      .then(res => setJob(res.data))
      .catch(() => setError('Job not found.'))
      .finally(() => setLoading(false))
  }, [id])

  const handleApply = async (e) => {
    e.preventDefault()
    try {
      await applyForJob(id, form)
      setSubmitted(true)
      setShowForm(false)
    } catch {
      setError('Failed to submit application.')
    }
  }

  if (loading) return <p className={styles.msg}>Loading...</p>
  if (error) return <p className={styles.error}>{error}</p>

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate(-1)}>← Back</button>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <h1>{job.title}</h1>
            <p className={styles.company}>{job.company}</p>
          </div>
          <span className={styles.type}>{job.jobType}</span>
        </div>
        <div className={styles.meta}>
          <span>📍 {job.location}</span>
          <span>💰 {job.salary}</span>
          <span>📅 Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
        </div>
        <hr />
        <h3>Job Description</h3>
        <p className={styles.desc}>{job.description}</p>
        <h3>Requirements</h3>
        <p className={styles.desc}>{job.requirements}</p>

        {submitted ? (
          <div className={styles.success}>✅ Application submitted successfully!</div>
        ) : (
          <button className={styles.applyBtn} onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Apply Now'}
          </button>
        )}

        {showForm && (
          <form className={styles.form} onSubmit={handleApply}>
            <h3>Apply for this Job</h3>
            <input required placeholder="Full Name"
              value={form.applicantName}
              onChange={e => setForm({ ...form, applicantName: e.target.value })} />
            <input required type="email" placeholder="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Phone Number"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })} />
            <textarea placeholder="Cover Letter (optional)" rows={4}
              value={form.coverLetter}
              onChange={e => setForm({ ...form, coverLetter: e.target.value })} />
            <button type="submit">Submit Application</button>
          </form>
        )}
      </div>
    </div>
  )
}
