import mongoose ,{ Schema } from 'mongoose';

const messageSchema = new Schema({
    chatRoomId:{
    type: Schema.Types.ObjectId,
    ref: 'ChatRoom',
    required: true,
    },
    senderId:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    },
    message:{
    type: String,
    required: true,
    }
},{ timestamps: true });

export default mongoose.model('Message', messageSchema);