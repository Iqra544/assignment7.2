import { connectDB } from '../../../lib/mongodb';
import Attendance from '../../../models/Attendance';
import User from '../../../models/User'; // ✅ Register the schema
import { jwtVerify } from 'jose';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  let payload;
  try {
    payload = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }

  const { id, role } = payload.payload;

  await connectDB();

  let records;

  if (role === 'admin') {
    records = await Attendance.find().populate('userId', 'name email');
  } else {
    records = await Attendance.find({ userId: id }).populate('userId', 'name');
  }

  res.status(200).json(records);
}
