import React, { useState } from 'react'
import API from '../../config/API.js'
import { Navigate, useNavigate } from 'react-router'
import { useContext } from 'react'
import UserContext from '../context/UserContext.jsx'

const SignUp = () => {
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'user'
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
        const res = await API.post('/users/create-user', formData)
        setUser(res.data.data)
        navigate('/')
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="min-h-screen w-full bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-slate-400 text-sm">Sign up to get started</p>
        </div>

        {/* SignUp Form */}
        <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg shadow-xl border border-slate-700 p-6 sm:p-8 space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Choose a username"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400"
            />
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-slate-300 mb-2">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-slate-700">
            <p className="text-slate-400 text-sm">
              Already have an account?{' '}
              <button onClick={()=> navigate("/")} className="text-blue-400 hover:text-blue-300 font-medium">
                Sign Up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
