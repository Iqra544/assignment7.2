'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Home,
  Calendar,
  DollarSign,
  UserPlus,
  LogOut,
  Users,
  CheckCircle,
  FileText
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [active, setActive] = useState('dashboard');

  const handleLogout = async () => {
    await fetch('/api/auth/logout');
    router.push('/login');
  };

  const menu = [
    { name: 'Dashboard', icon: <Home />, action: () => setActive('dashboard') },
    { name: 'Attendance', icon: <Calendar />, action: () => router.push('/attendance') },
    { name: 'Payroll', icon: <DollarSign />, action: () => router.push('/admin/payroll') },
    { name: 'Add Employee', icon: <UserPlus />, action: () => router.push('/admin/employee') },
    { name: 'Logout', icon: <LogOut />, action: handleLogout },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 text-indigo-700 font-extrabold text-xl border-b border-gray-200">
          Admin Panel
        </div>
        <nav className="p-4 space-y-2">
          {menu.map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className={`flex items-center w-full px-4 py-2 rounded-lg text-left transition ${
                active === item.name.toLowerCase() ? 'bg-indigo-100 text-indigo-800' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {active === 'dashboard' && (
          <div>
            <h1 className="text-3xl font-bold text-indigo-800 mb-2">Dashboard Overview</h1>
            <p className="text-gray-600 mb-6">Here is a summary of your HR system.</p>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
                <Users className="text-indigo-600 w-8 h-8" />
                <div>
                  <p className="text-xl font-bold text-gray-800">12</p>
                  <p className="text-sm text-gray-500">Total Employees</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
                <CheckCircle className="text-green-600 w-8 h-8" />
                <div>
                  <p className="text-xl font-bold text-gray-800">320</p>
                  <p className="text-sm text-gray-500">Attendances Marked</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
                <FileText className="text-yellow-600 w-8 h-8" />
                <div>
                  <p className="text-xl font-bold text-gray-800">₹ 120,000</p>
                  <p className="text-sm text-gray-500">Payroll Processed</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
