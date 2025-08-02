import { connectDB } from '../../../lib/mongodb';
import Attendance from '../../../models/Attendance';
import User from '../../../models/User';

export default async function handler(req, res) {
  await connectDB();

  const users = await User.find({ role: 'user' }); // get all employees
  const payrollData = [];

  for (const user of users) {
    const presentCount = await Attendance.countDocuments({ userId: user._id });
    const salaryPerDay = user.salaryPerDay || 1000; // fallback if not present
    const totalSalary = salaryPerDay * presentCount;

    payrollData.push({
      name: user.name,
      daysPresent: presentCount,
      salaryPerDay,
      totalSalary,
    });
  }

  res.status(200).json(payrollData);
}
