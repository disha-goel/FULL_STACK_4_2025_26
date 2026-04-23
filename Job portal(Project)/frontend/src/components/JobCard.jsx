import React from 'react'
import { Link } from 'react-router-dom'
import styles from './JobCard.module.css'

export default function JobCard({ job }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{job.title}</h3>
        <span className={styles.type}>{job.jobType}</span>
      </div>
      <p className={styles.company}>{job.company}</p>
      <p className={styles.location}>📍 {job.location}</p>
      <p className={styles.salary}>💰 {job.salary}</p>
      <p className={styles.desc}>{job.description?.substring(0, 100)}...</p>
      <Link to={`/jobs/${job.id}`} className={styles.applyBtn}>View & Apply</Link>
    </div>
  )
}
