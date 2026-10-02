import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import StudentManager from './pages/StudentManager';
import SubjectManager from './pages/SubjectManager';
import MarksEntry from './pages/MarksEntry';
import SearchResult from './pages/SearchResult';
import { GraduationCap, Users, BookOpen, PenTool, Search } from 'lucide-react';

const NavLink = ({ to, icon: Icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link 
      to={to} 
      className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-red-50 text-red-600 font-semibold' : 'text-gray-600 hover:text-red-600 hover:bg-gray-50'}`}
    >
      <Icon size={18} />
      <span>{children}</span>
    </Link>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
        <nav className="bg-white shadow-sm border-b px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl text-red-600 tracking-tight">
            <GraduationCap size={28} />
            <span>SRMS</span>
          </Link>
          <div className="flex space-x-2 text-sm">
            <NavLink to="/" icon={GraduationCap}>Dashboard</NavLink>
            <NavLink to="/students" icon={Users}>Students</NavLink>
            <NavLink to="/subjects" icon={BookOpen}>Subjects</NavLink>
            <NavLink to="/marks" icon={PenTool}>Enter Marks</NavLink>
            <NavLink to="/search" icon={Search}>Search Result</NavLink>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto p-6 mt-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentManager />} />
            <Route path="/subjects" element={<SubjectManager />} />
            <Route path="/marks" element={<MarksEntry />} />
            <Route path="/search" element={<SearchResult />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
