import React, { useState, useEffect } from 'react';
import { fetchStudents, fetchSubjects, enterMarks } from '../api';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function MarksEntry() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ student_id: '', subject_id: '', marks_obtained: '' });
  const [status, setStatus] = useState(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [stRes, suRes] = await Promise.all([fetchStudents(), fetchSubjects()]);
      setStudents(stRes.data);
      setSubjects(suRes.data);
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await enterMarks(form);
      setStatus({ type: 'success', msg: 'Marks saved successfully!' });
      setTimeout(() => setStatus(null), 3000);
      setForm({ ...form, marks_obtained: '' });
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to save marks.' });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Marks Entry</h1>
      <div className="max-w-md bg-white p-6 rounded-lg shadow-sm border">
        
        {status && (
          <div className={`mb-4 p-3 rounded flex items-center space-x-2 text-sm ${status.type === 'success' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
            {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{status.msg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-600">Select Student</label>
            <select value={form.student_id} onChange={e => setForm({...form, student_id: e.target.value})} required>
              <option value="">-- Choose Student --</option>
              {students.map(s => <option key={s.student_id} value={s.student_id}>{s.roll_no} - {s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-600">Select Subject</label>
            <select value={form.subject_id} onChange={e => setForm({...form, subject_id: e.target.value})} required>
              <option value="">-- Choose Subject --</option>
              {subjects.map(s => <option key={s.subject_id} value={s.subject_id}>{s.subject_name} (Max: {s.max_marks})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-600">Marks Obtained</label>
            <input type="number" step="0.01" value={form.marks_obtained} onChange={e => setForm({...form, marks_obtained: e.target.value})} required placeholder="e.g. 85.50" />
          </div>
          <button type="submit" className="w-full bg-red-600 text-white py-2 mt-2 rounded-md hover:bg-red-700 font-semibold transition-colors">
            Save Record
          </button>
        </form>
      </div>
    </div>
  );
}
