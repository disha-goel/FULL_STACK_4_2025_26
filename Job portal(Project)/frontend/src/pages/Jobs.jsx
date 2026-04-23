import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAllJobs } from '../services/api'
import JobCard from '../components/JobCard'
import styles from './Jobs.module.css'

export default function Jobs() {
  const [searchParams] = useSearchParams()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '')
  const [location, setLocation] = useState(searchParams.get('location') || '')

  const fetchJobs = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await getAllJobs(keyword, location)
      setJobs(res.data)
    } catch {
      setError('Failed to load jobs. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchJobs() }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchJobs()
  }

  return (
    <div className={styles.container}>
      <h2>Browse Jobs</h2>
      <form className={styles.filters} onSubmit={handleSearch}>
        <input
          placeholder="Keyword / Title"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Filter</button>
      </form>

      {loading && <p className={styles.msg}>Loading jobs...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && jobs.length === 0 && (
        <p className={styles.msg}>No jobs found.</p>
      )}

      <div className={styles.grid}>
        {jobs.map(job => <JobCard key={job.id} job={job} />)}
      </div>
    </div>
  )
}
