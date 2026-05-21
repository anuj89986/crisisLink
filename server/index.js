import express from 'express';
import {createServer} from 'http';

import cors from 'cors';
import connectDB from './config/mongoDb.js';
import incidentRouter from './routes/incident.route.js';
import chatRoomRouter from './routes/chatRoom.route.js';
import userRouter from './routes/user.route.js';
import messagesRouter from './routes/messages.route.js';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import initSocket from './socket/index.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000

const server = createServer(app);
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const io = new Server(server, {
    cors: {
        origin: CLIENT_URL,
        credentials: true,
    }
});

initSocket(io);

app.use(cors({
    origin: CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());


connectDB();

app.use('/api/v1/incidents',incidentRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/messages',messagesRouter);
app.use('/api/v1/chatRoom',chatRoomRouter);




app.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});