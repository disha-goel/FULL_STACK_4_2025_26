import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'

export default function Home() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = React.useState('')
  const [location, setLocation] = React.useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/jobs?keyword=${keyword}&location=${location}`)
  }

  return (
    <div>
      <section className={styles.hero}>
        <h1>Find Your Dream Job</h1>
        <p>Thousands of jobs from top companies — all in one place</p>
        <form className={styles.searchBar} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Job title, skills..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button type="submit">Search Jobs</button>
        </form>
      </section>

      <section className={styles.categories}>
        <h2>Popular Categories</h2>
        <div className={styles.catGrid}>
          {['Software', 'Design', 'Marketing', 'Finance', 'Healthcare', 'Education'].map(cat => (
            <div key={cat} className={styles.catCard}
              onClick={() => navigate(`/jobs?keyword=${cat}`)}>
              {cat}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
