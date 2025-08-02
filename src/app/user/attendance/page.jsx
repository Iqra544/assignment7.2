"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function MarkAttendance() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    try {
      const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="));

      if (!cookie) {
        console.log("❌ Token not found in cookies");
        return;
      }

      const token = cookie.split("=")[1];
      const decoded = jwtDecode(token);

      console.log("✅ Decoded token:", decoded); // should show id and role

      if (decoded?.id) {
        setUserId(decoded.id);
      } else {
        console.log("❌ 'id' not found in token payload");
      }
    } catch (error) {
      console.error("❌ Error decoding token:", error);
    }
  }, []);

  async function handleMark() {
    if (!userId) {
      alert("User ID not found.");
      return;
    }

    const res = await fetch('/api/attendance/mark', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    
    const data = await res.json();
    
    if (res.status === 409) {
      alert(data.message); // Attendance already marked
    } else if (res.ok) {
      alert(data.message); // Successfully marked
    } else {
      alert('Something went wrong.');
    }
     
  }

  return (
    <div className="text-center mt-10">
      <button
        onClick={handleMark}
        className="bg-green-600 text-white px-6 py-3 rounded"
      >
        Mark Attendance
      </button>
    </div>
  );
}
