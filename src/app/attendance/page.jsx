"use client";
import { useEffect, useState } from "react";

export default function AttendanceHistory() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      const res = await fetch("/api/attendance/history");
      const data = await res.json();
      setRecords(data);
    }
    fetchHistory();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Attendance History</h1>

      {records.length === 0 ? (
        <p className="text-center text-gray-600">No attendance records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left">#</th>
                <th className="py-3 px-4 border-b text-left">User</th>
                <th className="py-3 px-4 border-b text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">
                    {record.userId?.name || "Unknown"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(record.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
