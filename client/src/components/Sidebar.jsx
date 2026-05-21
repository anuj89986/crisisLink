import React, { useContext, useEffect, useState } from 'react'
import LogoutButton from './LogoutButton.jsx'
import API from '../../config/API.js'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext.jsx'

function Sidebar() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [chatRooms, setChatRooms] = useState([]);
    useEffect(() => {
        const getChatRooms = async () => {
            try {
               const res = await API.get('/chatRoom/get-chat-rooms');
                setChatRooms(res.data.data);
                console.log(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getChatRooms();
    },[])

    const handleChange = (id)=>{
        navigate(`/chatRoom/${id}`);
    }

    
return (

    <div className="w-56 sm:w-60 lg:w-64 h-screen flex flex-col bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800">
        <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-800">
            <button className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 hover:cursor-pointer" onClick={()=>navigate('/')}>
                CrisisLink
            </button>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 sm:mt-1">
                Recent conversations
            </p>
        </div>

        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
            <h3 className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 sm:mb-3 uppercase tracking-wider">
                Recent Chats
            </h3>

            <div className="space-y-1.5 sm:space-y-2">
                {chatRooms.map((chatroom)=>(
                    <button onClick={() => handleChange(chatroom._id)} key={chatroom._id} className="w-full p-2.5 sm:p-3 rounded-lg bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition cursor-pointer text-left">
                    <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                        Incident: {chatroom.incidentId?.title}
                    </p>
                    <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 truncate mt-0.5">
                        Last message...
                    </p>
                </button>
                ))}
            </div>
        </div>

        <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 border-t border-slate-200 dark:border-slate-800">
            <LogoutButton />
            {user.role === "user" && (
                <button onClick={() => navigate('/')} className="w-full py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500/40 shadow-sm">
                Report Incident
            </button>)}
        </div>
    </div>
)
}

export default Sidebar