const db = require('../config/db');

exports.getResultByRollNumber = async (req, res) => {
    try {
        const rollNo = req.params.rollNumber;
        const [studentRes] = await db.query('SELECT * FROM Students WHERE roll_no = ?', [rollNo]);
        
        if (studentRes.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        
        const student_id = studentRes[0].student_id;
        
        const [marks] = await db.query(
            `SELECT sub.subject_name, m.marks_obtained, sub.max_marks 
             FROM Marks m 
             JOIN Subjects sub ON m.subject_id = sub.subject_id 
             WHERE m.student_id = ?`,
            [student_id]
        );

        const [resultSummary] = await db.query(
            `SELECT 
                SUM(m.marks_obtained) AS total_marks,
                SUM(sub.max_marks) AS overall_max_marks,
                (SUM(m.marks_obtained) / SUM(sub.max_marks)) * 100 AS percentage,
                CASE
                    WHEN (SUM(m.marks_obtained) / SUM(sub.max_marks)) * 100 >= 90 THEN 'A'
                    WHEN (SUM(m.marks_obtained) / SUM(sub.max_marks)) * 100 >= 75 THEN 'B'
                    WHEN (SUM(m.marks_obtained) / SUM(sub.max_marks)) * 100 >= 50 THEN 'C'
                    ELSE 'F'
                END AS grade
             FROM Marks m
             JOIN Subjects sub ON m.subject_id = sub.subject_id
             WHERE m.student_id = ?`,
            [student_id]
        );

        res.status(200).json({
            student: studentRes[0],
            marks: marks,
            summary: resultSummary[0]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTopper = async (req, res) => {
    try {
        const [topper] = await db.query(
            `SELECT 
                s.student_id,
                s.name,
                s.roll_no,
                SUM(m.marks_obtained) AS total_marks
             FROM Students s
             JOIN Marks m ON s.student_id = m.student_id
             GROUP BY s.student_id, s.name, s.roll_no
             ORDER BY total_marks DESC
             LIMIT 1`
        );
        res.status(200).json(topper[0] || null);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSubjectAnalysis = async (req, res) => {
    try {
        const [analysis] = await db.query(
            `SELECT 
                sub.subject_name,
                ROUND(AVG(m.marks_obtained), 2) AS average_marks,
                MAX(m.marks_obtained) AS max_marks,
                MIN(m.marks_obtained) AS min_marks
             FROM Subjects sub
             JOIN Marks m ON sub.subject_id = m.subject_id
             GROUP BY sub.subject_id, sub.subject_name
             ORDER BY average_marks DESC`
        );
        res.status(200).json(analysis);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
