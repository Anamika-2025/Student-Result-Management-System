import React, { useState, useEffect } from 'react';
import { fetchSubjects, createSubject } from '../api';
import { BookPlus } from 'lucide-react';

export default function SubjectManager() {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ subject_name: '', max_marks: 100 });


  useEffect(() => { loadSubjects(); }, []);

  const loadSubjects = async () => {
    try {
      const res = await fetchSubjects();
      setSubjects(res.data);
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSubject(form);
      setForm({ subject_name: '', max_marks: 100 });
      loadSubjects();
    } catch (err) {
      console.error("Error saving subject:", err);
      alert("Error saving subject.");
    }
  };



  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Subject Manager</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
            <div className="flex items-center space-x-2 border-b pb-2 mb-4">
              <BookPlus className="text-red-600" size={20} />
              <h2 className="text-lg font-bold text-gray-800">Add Subject</h2>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-600">Subject Name</label>
              <input value={form.subject_name} onChange={e => setForm({ ...form, subject_name: e.target.value })} required placeholder="e.g. Mathematics" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-600">Max Marks</label>
              <input type="number" value={form.max_marks} onChange={e => setForm({ ...form, max_marks: e.target.value })} required placeholder="100" />
            </div>
            <button type="submit" className="w-full bg-red-600 text-white py-2 mt-4 rounded-md hover:bg-red-700 font-semibold transition-colors">
              Save Subject
            </button>
          </form>
        </div>

        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <table className="w-full text-left table-auto">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">ID</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Subject Name</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Max Marks</th>

                </tr>
              </thead>
              <tbody>
                {subjects.length > 0 ? subjects.map((s, idx) => (
                  <tr key={s.subject_id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-500">{idx + 1}</td>
                    <td className="px-4 py-3 font-medium">{s.subject_name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{s.max_marks}</td>

                  </tr>
                )) : (
                  <tr>
                    <td colSpan="3" className="px-4 py-8 text-center text-gray-500">No subjects found.</td>
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
