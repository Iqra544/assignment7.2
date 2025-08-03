'use client';

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Home,
  Calendar,
  DollarSign,
  UserPlus,
  LogOut,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // Define role state if you want to store role from localStorage
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    console.log("Stored role:", storedRole); // Debug info
    setRole(storedRole);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout');
    router.push('/login');
  };

  const menu = [
    { name: 'Dashboard', icon: <Home size={18} />, href: '/admin' },
    { name: 'Attendance', icon: <Calendar size={18} />, href: '/attendance' },
    { name: 'Payroll', icon: <DollarSign size={18} />, href: '/admin/payroll' },
    { name: 'Add Employee', icon: <UserPlus size={18} />, href: '/admin/employee' },
    { name: 'Logout', icon: <LogOut size={18} />, action: handleLogout },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 text-indigo-700 font-extrabold text-xl border-b border-gray-200">
          Admin Panel
        </div>
        <nav className="p-4 space-y-2">
          {menu.map((item, idx) => {
            const isActive = item.href && (
              pathname === item.href || pathname.startsWith(item.href + '/')
            );

            if (item.href) {
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className={`flex items-center w-full px-4 py-2 rounded-lg text-left transition ${
                    isActive ? 'bg-indigo-100 text-indigo-800' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              );
            }

            return (
              <button
                key={idx}
                onClick={item.action}
                className="flex items-center w-full px-4 py-2 rounded-lg text-left text-gray-700 hover:bg-red-100 transition"
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm">{children}</div>
      </main>
    </div>
  );
}
