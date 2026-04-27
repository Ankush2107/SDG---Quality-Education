import mongoose from 'mongoose';

const savedProjectSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
    techStack: [String],
    estimatedTime: { type: String }
  },
  { timestamps: true }
);

const SavedProject = mongoose.model('SavedProject', savedProjectSchema);
export default SavedProject;
