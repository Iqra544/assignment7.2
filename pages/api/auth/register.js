import { connectDB } from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, password, role } = req.body;

  await connectDB();
  const exists = await User.findOne({ email });

  if (exists) return res.status(400).json({ error: 'User already exists' });

  const user = await User.create({ name, email, password, role });
  res.status(200).json({ message: 'Registered successfully' });
}
