const db = require('../config/db');

exports.addMarks = async (req, res) => {
    try {
        const { student_id, subject_id, marks_obtained } = req.body;
        const [result] = await db.query(
            `INSERT INTO Marks (student_id, subject_id, marks_obtained) 
             VALUES (?, ?, ?) 
             ON DUPLICATE KEY UPDATE marks_obtained = ?`,
            [student_id, subject_id, marks_obtained, marks_obtained]
        );
        res.status(200).json({ message: 'Marks saved successfully', mark_id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMarksByStudent = async (req, res) => {
    try {
        const [marks] = await db.query(
            `SELECT m.mark_id, sub.subject_name, sub.max_marks, m.marks_obtained 
             FROM Marks m 
             JOIN Subjects sub ON m.subject_id = sub.subject_id 
             WHERE m.student_id = ?`,
            [req.params.studentId]
        );
        res.status(200).json(marks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
