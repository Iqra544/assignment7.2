"use client";
import AdminLayout from "@/components/AdminLayout"; 
import { useState } from "react";

export default function AddEmployee() {
  const [form, setForm] = useState({ name: "", email: "", department: "" });
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    // Optional: Basic validation
    if (!form.name || !form.email || !form.department) {
      alert("Please fill all fields!");
      return;
    }

    const res = await fetch("/api/employee/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSuccess(true);
      setForm({ name: "", email: "", department: "" }); // clear fields
      setTimeout(() => setSuccess(false), 3000); // hide alert after 3s
    }
  }

  return (
    <AdminLayout>
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Add New Employee</h2>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          ✅ Employee added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Name"
          className="border p-2 w-full rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          className="border p-2 w-full rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Department"
          className="border p-2 w-full rounded"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Employee
        </button>
      </form>
    </div>
    </AdminLayout>
  );
}
