import asyncHandler from "../utils/AsyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import User from "../models/user.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const createUser = asyncHandler(async (req, res) => {
  const { role, username, email } = req.body;

  if (!role || !username || !email) {
    throw new ApiError(400, "Role, Username and Email are required");
  }
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({
    role,
    username,
    email,
  });
  
  if(!user){
    throw new ApiError(500, "Failed to create user");
  };

  const token = user.generateJwtToken();

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  };

  res
  .cookie('AccessToken', token ,options)
  .status(200)
  .json(new ApiResponse(201,user, "User created successfully"))
  
});

const loginUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new ApiError(400, "Email is required");
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }   
    const token = user.generateJwtToken();

    const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  };
    res
    .cookie('AccessToken', token ,options)
    .status(201)
    .json(new ApiResponse(201,user, "User logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {

  const option = {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  };
  res
    .clearCookie('AccessToken', option)
    .status(200)
    .json(new ApiResponse(200, "User logged out successfully"));
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users =  await User.find();
  res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully"));
});

export { createUser, loginUser, logoutUser, getAllUsers };