import { connectDB } from '../../../lib/mongodb';
import Employee from '../../../models/Employee';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  await connectDB();
  const { name, email, department } = req.body;

  const employee = await Employee.create({ name, email, department });
  res.status(201).json(employee);
}
