// /app/api/auth/login/route.js (for app/ directory based project)
// OR
// /pages/api/auth/login.js (for pages/ directory based project)

import { connectDB } from '../../../lib/mongodb';
import User from '../../../models/User';
import { SignJWT } from 'jose';
import { serialize } from 'cookie'; // ✅ proper import

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  try {
    await connectDB();

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // ✅ Create token using jose
    const token = await new SignJWT({ id: user._id.toString(), role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    // ✅ Serialize and set cookie (with httpOnly off for client access)
    res.setHeader('Set-Cookie', serialize('token', token, {
      httpOnly: false,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour
    }));

    return res.status(200).json({ role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
