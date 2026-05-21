import mongoose,{ Schema } from 'mongoose';

const chatRoomSchema = new Schema({
  incidentId: {
    type: Schema.Types.ObjectId,
    ref: 'Incident',
    required: true,
  },
    participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],     
  isActive : {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model('ChatRoom', chatRoomSchema);