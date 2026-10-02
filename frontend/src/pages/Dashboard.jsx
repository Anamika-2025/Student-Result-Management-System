import React, { useState, useEffect } from 'react';
import { getTopper, getSubjectAnalysis } from '../api';
import { Trophy, TrendingUp, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const [topper, setTopper] = useState(null);
  const [analysis, setAnalysis] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const topRes = await getTopper();
      const analysisRes = await getSubjectAnalysis();
      setTopper(topRes.data);
      setAnalysis(analysisRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>
      
      {topper && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-red-500 mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Trophy className="text-red-500" size={24} />
              <h2 className="text-lg font-bold text-red-600">Class Topper</h2>
            </div>
            <p className="text-2xl font-bold">{topper.name}</p>
            <p className="text-sm text-gray-500">Roll No: {topper.roll_no}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Marks</p>
            <p className="text-3xl font-bold text-gray-900">{topper.total_marks}</p>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="text-gray-500" size={20} />
          <h2 className="text-lg font-bold">Subject-Wise Analysis</h2>
        </div>
        
        {analysis.length > 0 ? (
          <table className="w-full text-left table-auto border">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Subject</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Average</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Highest</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Lowest</th>
              </tr>
            </thead>
            <tbody>
              {analysis.map((s, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium">{s.subject_name}</td>
                  <td className="px-4 py-3">{s.average_marks}</td>
                  <td className="px-4 py-3 text-green-600 font-semibold">{s.max_marks}</td>
                  <td className={`px-4 py-3 font-semibold ${s.min_marks < 40 ? 'text-red-600' : 'text-gray-600'}`}>
                    {s.min_marks}
                    {s.min_marks < 40 && <AlertCircle size={14} className="inline ml-1 mb-1" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-gray-500">No analysis data available yet.</p>
        )}
      </div>
    </div>
  );
}
