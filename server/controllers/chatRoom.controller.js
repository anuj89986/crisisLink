import asyncHandler from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ChatRoom from "../models/chatRoom.model.js";

const createChatRoom = asyncHandler(async (req, res) => {
  const { incidentId } = req.body;
  const userId = req.user._id;
  if (!incidentId) {
    throw new ApiError(400, "Incident ID is required to create a chat room");
  }
  const chatRoom = await ChatRoom.create({
    incidentId,
    participants: [userId],
  });

  if (!chatRoom) {
    throw new ApiError(500, "Failed to create chat room");
  }

  res
    .status(201)
    .json(new ApiResponse(201, chatRoom, "Chat room created successfully"));
});

const getChatRooms = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const chatRooms = await ChatRoom.find({ participants: userId })
    .sort({ updatedAt: -1 })
    .populate("incidentId")
    .populate("participants", "username email");

  res
    .status(200)
    .json(new ApiResponse(200, chatRooms, "Chat rooms fetched successfully"));
});

const joinChatRoom = asyncHandler(async (req, res) => {
  const { chatRoomId,adminId } = req.body;

  const chatRoom = await ChatRoom.findById(chatRoomId);
  if (!chatRoom) {
    throw new ApiError(404, "Chat room not found");
  }

  if (!chatRoom.participants.includes(adminId)) {
    chatRoom.participants.push(adminId);
    await chatRoom.save();
  }

  res
    .status(200)
    .json(new ApiResponse(200, chatRoom, "Joined chat room successfully"));
});

export { createChatRoom, getChatRooms, joinChatRoom };
