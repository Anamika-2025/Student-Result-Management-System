import React, { useState } from 'react';
import { getResultByRoll } from '../api';
import { Search, User, Book, Award, AlertTriangle } from 'lucide-react';

export default function SearchResult() {
  const [roll, setRoll] = useState('');
  const [resultData, setResultData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!roll) return;
    setLoading(true);
    try {
      const res = await getResultByRoll(roll);
      setResultData(res.data);
      setError('');
    } catch (err) {
      setResultData(null);
      setError('Student not found or no marks recorded.');
    }
    setLoading(false);
  };

  const isFailed = resultData?.summary?.grade === 'F';

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Search Result</h1>
      
      <div className="max-w-xl bg-white p-6 rounded-lg shadow-sm border mb-6">
        <form onSubmit={handleSearch} className="flex space-x-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Enter Student Roll Number (e.g. CS1001)" 
              value={roll} 
              onChange={e => setRoll(e.target.value)} 
              required 
              className="pl-10"
            />
          </div>
          <button type="submit" disabled={loading} className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 font-semibold transition-colors whitespace-nowrap disabled:opacity-50">
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-3 text-sm flex items-center"><AlertTriangle size={14} className="mr-1" /> {error}</p>}
      </div>

      {resultData && (
        <div className={`bg-white p-0 rounded-lg shadow-sm border overflow-hidden ${isFailed ? 'border-red-300' : ''}`}>
          
          {/* Header Section */}
          <div className={`p-6 border-b ${isFailed ? 'bg-red-50' : 'bg-gray-50'}`}>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{resultData.student.name}</h2>
                <div className="flex space-x-4 text-sm text-gray-600">
                  <span className="flex items-center"><User size={14} className="mr-1" /> Roll: {resultData.student.roll_no}</span>
                  <span className="flex items-center"><Book size={14} className="mr-1" /> {resultData.student.course} (Sem {resultData.student.semester})</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1 font-semibold uppercase tracking-wider">Overall Grade</p>
                <div className={`text-4xl font-black ${isFailed ? 'text-red-600' : 'text-green-600'}`}>
                  {resultData.summary.grade}
                </div>
              </div>
            </div>
          </div>

          {/* Marks Table */}
          <table className="w-full text-left table-auto">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Subject</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600 text-right">Max Marks</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600 text-right">Obtained</th>
              </tr>
            </thead>
            <tbody>
              {resultData.marks.map((m, i) => (
                <tr key={i} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 font-medium">{m.subject_name}</td>
                  <td className="px-6 py-3 text-right text-gray-500">{m.max_marks}</td>
                  <td className={`px-6 py-3 text-right font-bold ${m.marks_obtained < 40 ? 'text-red-600' : 'text-gray-900'}`}>
                    {m.marks_obtained}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer Summary */}
          <div className="p-6 bg-gray-50 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">Total Score</p>
              <p className="text-2xl font-bold text-gray-900">
                {resultData.summary.total_marks} <span className="text-lg text-gray-400">/ {resultData.summary.overall_max_marks}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">Percentage</p>
              <p className="text-2xl font-bold text-gray-900">
                {resultData.summary.percentage}%
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
