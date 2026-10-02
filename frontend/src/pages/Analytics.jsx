import React, { useState, useEffect } from 'react';
import { fetchSubjects, getSubjectAnalysis, getClassRankings } from '../api';

export default function Analytics() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [analysisData, setAnalysisData] = useState([]);

  const [className, setClassName] = useState('');
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    const res = await fetchSubjects();
    setSubjects(res.data);
  };

  const handleSubjectAnalysis = async (e) => {
    e.preventDefault();
    if (!selectedSubject) return;
    const res = await getSubjectAnalysis(selectedSubject);
    setAnalysisData(res.data);
  };

  const handleClassRanking = async (e) => {
    e.preventDefault();
    if (!className) return;
    const res = await getClassRankings(className);
    setRankings(res.data);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Analytics & Rankings</h1>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Subject Analysis Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Subject-wise Analysis</h2>
          <form onSubmit={handleSubjectAnalysis} className="flex space-x-2 mb-4">
            <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)} required>
              <option value="">Select Subject</option>
              {subjects.map(s => <option key={s.id} value={s.id}>{s.subject_name}</option>)}
            </select>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Go</button>
          </form>
          
          {analysisData.length > 0 && (
            <table className="w-full text-left table-auto border text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-2 py-2">Rank</th>
                  <th className="px-2 py-2">Name</th>
                  <th className="px-2 py-2">Marks</th>
                </tr>
              </thead>
              <tbody>
                {analysisData.map((d, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-2 py-2">{i + 1}</td>
                    <td className="px-2 py-2">{d.name} ({d.roll_number})</td>
                    <td className="px-2 py-2">{d.marks_obtained}/{d.max_marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Class Ranking Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Class Rankings</h2>
          <form onSubmit={handleClassRanking} className="flex space-x-2 mb-4">
            <input 
              type="text" 
              placeholder="Enter Class Name (e.g. 10A)" 
              value={className} 
              onChange={e => setClassName(e.target.value)} 
              required 
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Go</button>
          </form>

          {rankings.length > 0 && (
            <table className="w-full text-left table-auto border text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-2 py-2">Rank</th>
                  <th className="px-2 py-2">Name</th>
                  <th className="px-2 py-2">Total Marks</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((r, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-2 py-2">{i + 1}</td>
                    <td className="px-2 py-2">{r.student.name} ({r.student.roll_number})</td>
                    <td className="px-2 py-2 font-bold">{r.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
