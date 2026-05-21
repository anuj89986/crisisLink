export function isUserOnline (onlineUsers, socket) {
    socket.on('otherUserStatus',(userId)=>{
        const status = onlineUsers.has(userId);
        socket.emit('userStatus', { userId, online: status });
    })
}