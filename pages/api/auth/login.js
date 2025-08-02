import { connectDB } from '../../../lib/mongodb';
import User from '../../../models/User';
import { SignJWT } from 'jose';
import cookie from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  await connectDB();
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = await new SignJWT({ id: user._id.toString(), role: user.role }) // ✅ convert to string
  .setProtectedHeader({ alg: 'HS256' })
  .setExpirationTime('1h')
  .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  // 🔓 Allow access to token from client-side
  res.setHeader('Set-Cookie', cookie.serialize('token', token, {
    httpOnly: false, // ✅ Allow client-side access
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60, // 1 hour
  }));

  res.status(200).json({ role: user.role });
}
