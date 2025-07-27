'use client'; // 🟢 REQUIRED for client-side navigation & cookie access

import { useRouter } from 'next/navigation';

export default function UserPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout');
    router.push('/login'); // or login page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-100 to-blue-200 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-teal-800 mb-4">User Dashboard</h1>
        <p className="text-lg text-gray-700 mb-6">Welcome, User! You can access your personal info and tasks here.</p>
        <button
          onClick={handleLogout}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
