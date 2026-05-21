import mongoose,{Schema} from "mongoose";

const incidentSchema = new Schema({
    title: {
    type: String,
    required: true,
  },
    description: {
    type: String,
    required: true,
  },
  imageUrl:{
    type: String,
    required:true
  },
  severity:{
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low',
  },
  status:{
    type: String,
    enum: ['open', 'in_progress', 'resolved'],
    default: 'open',
  },
  reportedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

export default mongoose.model('Incident', incidentSchema);
