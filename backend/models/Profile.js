import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    learningGoal: { type: String, required: true },
    currentLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    weeklyHours: { type: Number, required: true },
    interests: [String]
  },
  { timestamps: true }
);

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
