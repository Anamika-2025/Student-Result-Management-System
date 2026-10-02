const db = require('../config/db');

exports.addStudent = async (req, res) => {
    try {
        const { name, roll_no, course, semester } = req.body;
        const [result] = await db.query(
            'INSERT INTO Students (name, roll_no, course, semester) VALUES (?, ?, ?, ?)',
            [name, roll_no, course, semester]
        );
        res.status(201).json({ message: 'Student added successfully', student_id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        const [students] = await db.query('SELECT * FROM Students ORDER BY roll_no ASC');
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const { name, roll_no, course, semester } = req.body;
        const studentId = req.params.id;
        await db.query(
            'UPDATE Students SET name = ?, roll_no = ?, course = ?, semester = ? WHERE student_id = ?',
            [name, roll_no, course, semester, studentId]
        );
        res.status(200).json({ message: 'Student updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        await db.query('DELETE FROM Students WHERE student_id = ?', [req.params.id]);
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
