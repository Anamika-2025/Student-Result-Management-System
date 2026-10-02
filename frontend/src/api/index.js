import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001/api' });

export const fetchStudents = () => API.get('/students');
export const createStudent = (data) => API.post('/students', data);
export const deleteStudent = (id) => API.delete(`/students/${id}`);

export const fetchSubjects = () => API.get('/subjects');
export const createSubject = (data) => API.post('/subjects', data);

export const enterMarks = (data) => API.post('/marks', data);

export const getResultByRoll = (roll) => API.get(`/results/${roll}`);
export const getTopper = () => API.get('/results/topper');
export const getSubjectAnalysis = () => API.get('/results/subject-analysis');
