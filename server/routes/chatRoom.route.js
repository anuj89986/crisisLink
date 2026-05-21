import {Router} from 'express';
import {createChatRoom,getChatRooms,joinChatRoom} from '../controllers/chatRoom.controller.js';
import userAuth from '../middlewares/userAuth.middleware.js';

const chatRoomRouter = Router();

chatRoomRouter.post('/create-chat-room',userAuth, createChatRoom);
chatRoomRouter.get('/get-chat-rooms',userAuth, getChatRooms);
chatRoomRouter.post('/join-chat-room', joinChatRoom);

export default chatRoomRouter;
