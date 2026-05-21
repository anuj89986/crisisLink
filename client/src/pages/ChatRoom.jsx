import React, { useEffect, useRef, useState } from "react";
import API from "../../config/API";
import { useParams } from "react-router";
import { useContext } from "react";
import UserContext from "../context/UserContext.jsx";
import WSocket from "../WSocket.js";

const ChatRoom = () => {
  const messagesEndRef = useRef(null);
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [otherParticipantId, setOtherParticipantId] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(()=>{
    setOtherParticipantId(null);
    const getChatRooms = async()=>{
      try {
        const res = await API.get('chatRoom/get-chat-rooms');
        const chatRooms = res.data.data;
        const currentChatRoom = chatRooms.find(room=>room._id===id);
        const otherParticipant = currentChatRoom.participants.find(participant=>participant._id!==user._id);
        setOtherParticipantId(otherParticipant._id);
      } catch (error) {
        console.log(error);
      }
    }
    getChatRooms();
  },[id,user._id]);

  useEffect(()=>{
    if(!id) return;
    WSocket.emit("joinRoom", id);
  },[id]);

  useEffect(() => {
    if (!otherParticipantId) return;

    const statusChangedHandler = (data)=>{
      if(data.userId===otherParticipantId){
        setConnectionStatus(data.online)
      }
    }
    const dataHandler = (data)=>{
      setConnectionStatus(data.online);
    }
    WSocket.on("userStatus",dataHandler);
    WSocket.on('userStatusChanged',statusChangedHandler)
    WSocket.emit("otherUserStatus", otherParticipantId);
    return () => {
      WSocket.off("userStatus",dataHandler);
      WSocket.off('userStatusChanged',statusChangedHandler)
    };
  }, [otherParticipantId]);

  useEffect(() => {
    setMessages([]);
    const allMessages = async () => {
      try {
        const allMessages = await API.get(`/messages/get-messages/${id}`);
        setMessages(allMessages.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    allMessages();
  }, [id]);


  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const optimisticMessage = {
      _id: Date.now(),
      message: newMessage,
      senderId: {
        _id: user._id,
        username: user.username,
      },
      createdAt: new Date().toISOString(),
      chatRoomId: id,
    };

    // setMessages((prev) => [...prev, optimisticMessage]);
    setNewMessage("");

    try {
      await API.post("/messages/set-message", {
        chatRoomId: id,
        message: optimisticMessage.message,
      });
    } catch (error) {
      console.log(error);
      setMessages((prev) =>
        prev.filter((msg) => msg._id !== optimisticMessage._id),
      );
      setNewMessage(optimisticMessage.message); // Restore message
    }
  };

  useEffect(() => {
    const handleIncomingMessage = (message) => {
      setMessages((prev) => {
        const exists = prev.some((msg) => msg._id === message._id);
        if (exists) return prev;

        return [...prev, message];
      });
    };
    WSocket.on("newMessage", handleIncomingMessage);

    return () => {
      WSocket.off("newMessage", handleIncomingMessage);
    };
  }, []);

  return (
    <div className="h-screen w-full bg-slate-100 flex items-center justify-center p-0 sm:p-4">
      <div className="flex h-full w-full max-w-4xl flex-col bg-white sm:h-[calc(100vh-2rem)] sm:rounded-xl sm:border sm:border-slate-200 sm:shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 sm:rounded-t-xl">
          <div>
            <h1 className="text-base font-semibold text-slate-900 sm:text-lg">
              Chat Room
            </h1>
          </div>
          {connectionStatus ? (<span className="inline-flex items-center gap-2 text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Online
          </span>) : (<span className="inline-flex items-center gap-2 text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            Offline
          </span>)}
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-5">
          <div className="space-y-3">
            {messages.map((message) => {
              const isMe = message.senderId._id === user._id;
              return (
                <div
                  key={message._id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 sm:max-w-md ${
                      isMe
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200 text-slate-900"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <p
                        className={`text-xs font-medium ${isMe ? "text-blue-100" : "text-slate-600"}`}
                      >
                        {message.senderId.username}
                      </p>
                      <p
                        className={`text-[10px] ${isMe ? "text-blue-100" : "text-slate-500"}`}
                      >
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed">
                      {message.message}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <form
          onSubmit={handleSendMessage}
          className="border-t border-slate-200 p-3 sm:p-4"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
