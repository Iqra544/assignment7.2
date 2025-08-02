import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);
