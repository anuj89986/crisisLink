import jwt from 'jsonwebtoken';
import  User from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import asyncHandler from '../utils/AsyncHandler.js';

const userAuth = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.AccessToken || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        throw new ApiError(401, 'Authentication token is missing');
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified.id);
        if (!user) {
            throw new ApiError(401, 'User not found');
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, 'Invalid authentication token');
    }
});

export default userAuth;