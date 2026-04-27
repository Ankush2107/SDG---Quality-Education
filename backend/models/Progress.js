import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    roadmap: { type: mongoose.Schema.Types.ObjectId, ref: 'Roadmap', required: true },
    completedSteps: [{ type: Number }], // Array of completed stepNumbers
    percentComplete: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now },
    streak: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// Method to calculate percent complete
progressSchema.methods.updatePercent = async function() {
  const roadmap = await mongoose.model('Roadmap').findById(this.roadmap);
  if (!roadmap || roadmap.steps.length === 0) return 0;
  
  const total = roadmap.steps.length;
  const completed = this.completedSteps.length;
  this.percentComplete = (completed / total) * 100;
  return this.percentComplete;
};

const Progress = mongoose.model('Progress', progressSchema);
export default Progress;
