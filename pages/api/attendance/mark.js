import { connectDB } from '../../../lib/mongodb';
import Attendance from '../../../models/Attendance';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    await connectDB();

    const { userId } = req.body;

    // Validate ObjectId
    const validUserId = new ObjectId(userId);

    // Check if already marked for today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const alreadyMarked = await Attendance.findOne({
      userId: validUserId,
      date: { $gte: todayStart }
    });

    if (alreadyMarked) {
      return res.status(409).json({ message: 'Attendance already marked for today.' });
    }

    // If not marked, mark now
    const newAttendance = new Attendance({
      userId: validUserId,
      date: new Date()
    });

    await newAttendance.save();

    res.status(200).json({ message: 'Attendance marked successfully.' });

  } catch (err) {
    console.error('Attendance error:', err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
}
