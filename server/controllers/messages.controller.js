import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/AsyncHandler.js";
import Message from "../models/Message.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getIO } from "../socket/index.js";

const setMessage = asyncHandler(async (req, res) => {
    const { chatRoomId, message} = req.body;
    const senderId = req.user._id;
    if(!senderId || !chatRoomId || !message){
        throw new ApiError(400, "senderId, chatRoomId and message are required");
    }
    const newMessage = await Message.create({senderId, chatRoomId, message});
    if(!newMessage){
        throw new ApiError(500, "Failed to send message");
    }
    const io = getIO();
    io.to(chatRoomId).emit('newMessage',{
        _id: newMessage._id,
        message: newMessage.message,
        chatRoomId: newMessage.chatRoomId,
        senderId:{
            _id:req.user._id,
            username:req.user.username
        },
        createdAt: newMessage.createdAt
    })

    res
    .status(201)
    .json(new ApiResponse(201, newMessage, "Message sent successfully"));
});

const getMessages = asyncHandler(async (req, res) => {
    const { chatRoomId } = req.params;

    const messages = await Message.find({ chatRoomId }).sort({ createdAt: 1 }).populate('senderId', 'username email');

    res
    .status(200)
    .json(new ApiResponse(200, messages, "Messages fetched successfully"));
});

export { setMessage, getMessages };