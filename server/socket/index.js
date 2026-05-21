import chatSocket from "./chat.socket.js";
import { isUserOnline } from "./userStatus.socket.js";

let io;
let onlineUsers = new Map();

function initSocket(socketServer) {
  io = socketServer;
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log(`User connected with ID: ${userId}`);
    onlineUsers.set(userId, socket.id);
    socket.broadcast.emit("userStatusChanged", { userId, online: true });
    chatSocket(socket, io);
    console.log("a user connected: " + socket.id);
    console.log(io.engine.clientsCount);
    isUserOnline(onlineUsers, socket);
    socket.on("disconnect", () => {
      console.log(`User disconnected with ID: ${userId}`);
      onlineUsers.delete(userId);
      socket.broadcast.emit("userStatusChanged", { userId, online: false });
    });
  });
}

export default initSocket;
export const getIO = () => {
  if (!io) throw new Error("Socket not initialized");
  return io;
};
