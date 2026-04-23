import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.brand}>💼 EasyJobs</Link>
      <div className={styles.links}>
        <Link to="/jobs">Browse Jobs</Link>
        {user && <Link to="/my-applications">My Applications</Link>}
        {!user ? (
          <>
            <Link to="/login" className={styles.loginBtn}>Login</Link>
            <Link to="/register" className={styles.postBtn}>Register</Link>
          </>
        ) : (
          <>
            <span className={styles.userName}>👤 {user.name}</span>
            <Link to="/post-job" className={styles.postBtn}>Post a Job</Link>
            <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  )
}
