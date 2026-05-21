import { io } from 'socket.io-client';

const wsBase = import.meta.env.VITE_WS_URL || 'http://localhost:3000';
const WSocket = io(wsBase, {
  withCredentials: true,
  autoConnect: false,
});

export default WSocket;