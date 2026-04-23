import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('easyjobs_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = (userData) => {
    localStorage.setItem('easyjobs_user', JSON.stringify(userData))
    localStorage.setItem('easyjobs_token', userData.token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('easyjobs_user')
    localStorage.removeItem('easyjobs_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
