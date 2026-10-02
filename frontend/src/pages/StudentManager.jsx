import React, { useState, useEffect } from 'react';
import { Trash2, UserPlus, Edit2 } from 'lucide-react';

export default function StudentManager() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ roll_no: '', name: '', course: '', semester: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { loadStudents(); }, []);

  const loadStudents = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/students");
      const data = await res.json();
      setStudents(data);
    } catch (err) { console.error("Error fetching students:", err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await fetch(`http://localhost:5001/api/students/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
        
        if (res.ok) {
          alert("Updated successfully");
          setForm({ roll_no: '', name: '', course: '', semester: '' });
          setEditingId(null);
          loadStudents();
        } else {
          alert("Failed to update student.");
        }
      } else {
        const res = await fetch("http://localhost:5001/api/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
        
        if (res.ok) {
          alert("Student added successfully!");
          setForm({ roll_no: '', name: '', course: '', semester: '' });
          loadStudents();
        } else {
          alert("Failed to add student.");
        }
      }
    } catch (err) {
      console.error("Error saving student:", err);
      alert("Error saving student.");
    }
  };

  const handleEdit = (student) => {
    setForm({
      roll_no: student.roll_no,
      name: student.name,
      course: student.course,
      semester: student.semester
    });
    setEditingId(student.student_id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await fetch(`http://localhost:5001/api/students/${id}`, {
          method: "DELETE"
        });
        loadStudents();
      } catch (err) {
        console.error("Error deleting student:", err);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Student Manager</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
            <div className="flex items-center space-x-2 border-b pb-2 mb-4">
              <UserPlus className="text-red-600" size={20} />
              <h2 className="text-lg font-bold text-gray-800">{editingId ? 'Edit Student' : 'Add Student'}</h2>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-600">Roll Number</label>
              <input value={form.roll_no} onChange={e => setForm({...form, roll_no: e.target.value})} required placeholder="e.g. CS1001" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-600">Name</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="e.g. John Doe" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-600">Course</label>
              <input value={form.course} onChange={e => setForm({...form, course: e.target.value})} required placeholder="e.g. B.Tech CS" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-600">Semester</label>
              <input type="number" value={form.semester} onChange={e => setForm({...form, semester: e.target.value})} required placeholder="e.g. 3" />
            </div>
            <button type="submit" className="w-full bg-red-600 text-white py-2 mt-4 rounded-md hover:bg-red-700 font-semibold transition-colors">
              {editingId ? 'Update' : 'Save Student'}
            </button>
          </form>
        </div>
        
        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <table className="w-full text-left table-auto">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Roll No</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Course (Sem)</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {students && students.length > 0 ? students.map(s => (
                  <tr key={s.student_id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium">{s.roll_no}</td>
                    <td className="px-4 py-3">{s.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{s.course} (Sem {s.semester})</td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => handleEdit(s)} className="text-gray-400 hover:text-blue-600 transition-colors mr-3" title="Edit">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(s.student_id)} className="text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-8 text-center text-gray-500">No students found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
