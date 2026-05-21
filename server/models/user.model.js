import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  role:{
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  email: {
    type: String,
    required: true,
  },
}, { timestamps: true });

userSchema.methods.generateJwtToken = function(){
  return jwt.sign({id :this._id},process.env.JWT_SECRET)
}

export default mongoose.model('User', userSchema);