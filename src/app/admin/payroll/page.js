"use client";
import AdminLayout from "@/components/AdminLayout"; 
import { useEffect, useState } from "react";

export default function PayrollPage() {
  const [payrollData, setPayrollData] = useState([]);

  useEffect(() => {
    fetch("/api/payroll/calculate")
      .then((res) => res.json())
      .then((data) => setPayrollData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <AdminLayout>
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Payroll Summary</h1>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left text-gray-700 bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3">Employee Name</th>
              <th className="px-6 py-3">Days Present</th>
              <th className="px-6 py-3">Salary/Day</th>
              <th className="px-6 py-3">Total Salary</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No payroll data found.
                </td>
              </tr>
            ) : (
              payrollData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.daysPresent}</td>
                  <td className="px-6 py-4">Rs. {item.salaryPerDay}</td>
                  <td className="px-6 py-4 font-semibold text-green-600">
                    Rs. {item.totalSalary.toFixed(0)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    </AdminLayout>
  );
}
