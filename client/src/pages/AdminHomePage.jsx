import React, { useEffect, useState } from 'react'
import API from '../../config/API.js'
import { useNavigate } from 'react-router-dom'
import LogoutButton from '../components/LogoutButton.jsx'

const AdminHomePage = () => {
  const [chatRooms, setChatRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const getChatRooms = async () => {
      try {
        const res = await API.get('/chatRoom/get-chat-rooms')
        setChatRooms(res.data.data)
        console.log(res.data.data)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    getChatRooms()
  }, [])

  const severityColor = (severity) => {
    if (severity === 'high') return 'text-red-400 bg-red-400/10 border-red-400/20'
    if (severity === 'medium') return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
    return 'text-green-400 bg-green-400/10 border-green-400/20'
  }

  return (
    <div className="h-screen w-full bg-slate-900 p-3 sm:p-6 lg:p-8 overflow-y-auto">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-4 sm:mb-6 lg:mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Assigned Incidents</h1>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-400">View and respond to incidents assigned to you</p>
          </div>
          <LogoutButton />
        </div>

        {/* Chat Rooms List */}
        <div className="bg-slate-800 rounded-lg shadow-xl border border-slate-700 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-5">
          {loading ? (
            <p className="text-center text-slate-400 text-sm py-8">Loading incidents...</p>
          ) : chatRooms.length === 0 ? (
            <p className="text-center text-slate-400 text-sm py-8">No incidents assigned to you.</p>
          ) : (
            chatRooms.map((room) => (
              <div
                key={room._id}
                className="bg-slate-700 border border-slate-600 rounded-lg p-4 sm:p-5 space-y-3 hover:border-blue-500 transition-colors"
              >
                {/* Incident Image */}
                {room.incidentId?.image && (
                  <img
                    src={room.incidentId.image}
                    alt="Incident"
                    className="w-full h-40 sm:h-48 object-cover rounded-lg border border-slate-600"
                  />
                )}

                {/* Title */}
                <div>
                  <h2 className="text-sm sm:text-base font-semibold text-white">
                    {room.incidentId?.title || 'Untitled Incident'}
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-slate-400 line-clamp-2">
                    {room.incidentId?.description || 'No description provided.'}
                  </p>
                </div>

                {/* Severity & Reported By */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${severityColor(room.incidentId?.severity)}`}>
                    {room.incidentId?.severity?.charAt(0).toUpperCase() + room.incidentId?.severity?.slice(1) || 'Low'} Severity
                  </span>
                  <span className="text-xs text-slate-400">
                    Reported by: <span className="text-slate-300">{room.incidentId?.reportedBy?.username || 'Unknown'}</span>
                  </span>
                </div>

                {/* Open Chat Button */}
                <button
                  onClick={() => navigate(`/chatRoom/${room._id}`)}
                  className="w-full bg-blue-600 text-white py-2 sm:py-2.5 px-4 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-700 transition-colors"
                >
                  Open Chat
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminHomePage