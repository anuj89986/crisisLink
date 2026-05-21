import React, { useState } from 'react'
import API from '../../config/API'
import { Navigate,useNavigate } from 'react-router'
import { useContext } from 'react'
import UserContext from '../context/UserContext.jsx'

const Login = () => {
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: ''
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
        const res = await API.post('/users/login-user', formData);
        setUser(res.data.data);
        console.log(res.data.data);
        navigate('/')
    } catch (error) {
        console.log(error);
    } finally { 
        setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400 text-sm">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg shadow-xl border border-slate-700 p-6 sm:p-8 space-y-6">

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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-slate-700">
            <p className="text-slate-400 text-sm">
              Don't have an account?{' '}
              <a href="/register" className="text-blue-400 hover:text-blue-300 font-medium">
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login