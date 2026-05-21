export default function chatSocket(socket,io){
    socket.on('joinRoom',(chatRoomId)=>{
        socket.join(chatRoomId);
        console.log(`User ${socket.id} joined room ${chatRoomId}`);
    })
}