'use client';

import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout');
    router.push('/login'); // or login page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-200 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-indigo-800 mb-4">Admin Dashboard</h1>
        <p className="text-lg text-gray-700 mb-6">Welcome, Admin! You have full access to the system.</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
