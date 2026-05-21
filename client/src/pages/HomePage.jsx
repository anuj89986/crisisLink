import React, { useContext, useEffect, useState } from 'react'
import API from '../../config/API.js'
import { useNavigate } from 'react-router-dom'


const HomePage = () => {

  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await API.get('/users/get-all-users');
        setAllUsers(res.data.data);
        console.log(res.data.data);
        
      } catch (error) {
        console.log(error);
      }
    }
    getAllUsers()
  }, []);

  const allAdmins = allUsers.filter(user=> user.role!='user');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'low',
    image: null,
    assignedTo: ''
  })
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  

  const navigate = useNavigate();
  

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, image: file }))
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const data = new FormData()
    data.append('title', formData.title)
    data.append('description', formData.description)
    data.append('severity', formData.severity)
    data.append('image', formData.image)
    data.append('assignedTo', formData.assignedTo)
    
    try {
      const res = await API.post('/incidents/report-incident', data)
      console.log(res.data.data._id);
      
      const chatRoomRes = await API.post('/chatRoom/create-chat-room', { incidentId: res.data.data._id })
      await API.post('/chatRoom/join-chat-room',{ chatRoomId : chatRoomRes.data.data._id, adminId: formData.assignedTo})

      navigate(`/chatRoom/${chatRoomRes.data.data._id}`);
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <div className="h-screen w-full bg-slate-900 p-3 sm:p-6 lg:p-8 overflow-y-auto">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Report Incident</h1>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-400">Fill out the form below to report a new incident</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg shadow-xl border border-slate-700 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-5 lg:space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5 sm:mb-2">
              Title <span className="text-blue-400">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter incident title"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5 sm:mb-2">
              Description <span className="text-blue-400">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe the incident in detail"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-slate-400"
            />
          </div>

          {/* Severity */}
          <div>
            <label htmlFor="severity" className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5 sm:mb-2">
              Severity
            </label>
            <select
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5 sm:mb-2">
              Choose Admin to Assign <span className="text-blue-400">*</span>
            </label>
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select an admin...</option>
              {allAdmins.map((admin) => (
                <option key={admin._id} value={admin._id}>
                  {admin.username}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="image" className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5 sm:mb-2">
              Image <span className="text-blue-400">*</span>
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm bg-slate-700 border border-slate-600 text-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-3 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
            {preview && (
              <div className="mt-2 sm:mt-3">
                <img src={preview} alt="Preview" className="w-full h-40 sm:h-48 lg:h-56 object-cover rounded-lg border border-slate-600" />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Submitting...' : 'Report Incident'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default HomePage