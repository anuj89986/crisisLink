import {Router} from 'express';
import { createUser,loginUser,logoutUser,getAllUsers } from '../controllers/user.controller.js';
import userAuth from '../middlewares/userAuth.middleware.js';
import { ApiResponse } from '../utils/ApiResponse.js';


const userRouter = Router();

userRouter.get('/get-all-users',getAllUsers);
userRouter.post('/create-user',createUser);
userRouter.post('/login-user',loginUser);
userRouter.get('/check-auth',userAuth,(req,res)=>{
    res.status(200).json(new ApiResponse(201,req.user,'User authenticated successfully'));
})
userRouter.post('/logout',logoutUser);


export default userRouter;