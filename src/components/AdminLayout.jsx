'use client';

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Calendar,
  DollarSign,
  UserPlus,
  LogOut,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch('/api/auth/logout');
    router.push('/login');
  };

  const navItems = [
    { name: 'Attendance History', href: '/attendance', icon: <Calendar size={18} /> },
    { name: 'Payroll', href: '/admin/payroll', icon: <DollarSign size={18} /> },
    { name: 'Add Employee', href: '/admin/employee', icon: <UserPlus size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 border-b pb-3">Admin Panel</h2>
        
        <nav className="flex-1 space-y-2">
          {navItems.map((item, idx) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={idx}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium ${
                  isActive
                    ? "bg-indigo-100 text-indigo-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-6 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm">{children}</div>
      </main>
    </div>
  );
}
