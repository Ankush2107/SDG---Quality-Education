import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, enum: ['article', 'video', 'course', 'documentation', 'tool'], required: true },
    topic: { type: String, required: true }, // e.g. React, Node.js
    description: { type: String },
    tags: [String],
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Admin who added it
  },
  { timestamps: true }
);

const Resource = mongoose.model('Resource', resourceSchema);
export default Resource;
