import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  name: String,
  department: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);
