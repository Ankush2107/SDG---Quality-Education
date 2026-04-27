import mongoose from 'mongoose';

const roadmapStepSchema = new mongoose.Schema({
  stepNumber: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true }, // e.g. "2 weeks"
  resources: [String] // Optional keywords or links
});

const roadmapSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    goal: { type: String, required: true },
    level: { type: String, required: true },
    weeklyHours: { type: Number },
    steps: [roadmapStepSchema],
    estimatedDuration: { type: String },
    aiGenerated: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Roadmap = mongoose.model('Roadmap', roadmapSchema);
export default Roadmap;
