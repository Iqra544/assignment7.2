'use client';

import { useRouter } from 'next/navigation';

export default function UserPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-100 to-blue-200 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-teal-800 mb-2">User Dashboard</h1>
        <p className="text-lg text-gray-700 mb-6">
          Welcome, User! You can access your personal info and tasks here.
        </p>

        {/* Menu Buttons */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <button
            onClick={() => router.push('/user/attendance')}
            className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Mark Attendance
          </button>
          <button
            onClick={() => router.push('/attendance')}
            className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            View Attendance History
          </button>
        </div>

        {/* Logout */}
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
