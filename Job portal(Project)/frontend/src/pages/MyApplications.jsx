import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyApplications } from '../services/api'
import { useAuth } from '../context/AuthContext'
import styles from './MyApplications.module.css'

const statusColor = {
  PENDING: '#f59e0b',
  REVIEWED: '#3b82f6',
  ACCEPTED: '#16a34a',
  REJECTED: '#dc2626'
}

export default function MyApplications() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    getMyApplications()
      .then(res => setApps(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user])

  return (
    <div className={styles.container}>
      <h2>My Applications</h2>
      <p className={styles.sub}>Logged in as <strong>{user?.email}</strong></p>

      {loading && <p className={styles.msg}>Loading...</p>}
      {!loading && apps.length === 0 && (
        <div className={styles.empty}>
          <p>You haven't applied to any jobs yet.</p>
          <button onClick={() => navigate('/jobs')}>Browse Jobs</button>
        </div>
      )}

      <div className={styles.list}>
        {apps.map(app => (
          <div key={app.id} className={styles.card}>
            <div className={styles.cardTop}>
              <div>
                <h3>{app.job?.title}</h3>
                <p>{app.job?.company} — {app.job?.location}</p>
              </div>
              <span className={styles.status}
                style={{ background: statusColor[app.status] + '22', color: statusColor[app.status] }}>
                {app.status}
              </span>
            </div>
            <div className={styles.meta}>
              <span>📅 Applied: {new Date(app.appliedDate).toLocaleDateString()}</span>
              <span>💰 {app.job?.salary}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
