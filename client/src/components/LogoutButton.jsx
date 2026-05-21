import React from 'react'
import API from '../../config/API.js'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await API.post('/users/logout')
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-1.5 sm:gap-2 bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-red-500 hover:bg-red-500/10 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span>Logout</span>
    </button>
  )
}

export default LogoutButton