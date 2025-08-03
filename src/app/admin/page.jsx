'use client';

import AdminLayout from "@/components/AdminLayout"; 
import {
  Users,
  CheckCircle,
  FileText
} from 'lucide-react';

export default function AdminDashboard() {
  return (
    <AdminLayout>
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
    </AdminLayout>
  );
}
