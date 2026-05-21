import {Router} from 'express';
import { getMessages,setMessage } from '../controllers/messages.controller.js';
import userAuth from '../middlewares/userAuth.middleware.js';

const messagesRouter = Router();

messagesRouter.post('/set-message',userAuth, setMessage);
messagesRouter.get('/get-messages/:chatRoomId', getMessages);

export default messagesRouter;