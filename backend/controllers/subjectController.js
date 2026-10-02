const db = require('../config/db');

exports.addSubject = async (req, res) => {
    try {
        const { subject_name, max_marks } = req.body;
        const [result] = await db.query(
            'INSERT INTO Subjects (subject_name, max_marks) VALUES (?, ?)',
            [subject_name, max_marks || 100]
        );
        res.status(201).json({ message: 'Subject added successfully', subject_id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllSubjects = async (req, res) => {
    try {
        const [subjects] = await db.query('SELECT * FROM Subjects ORDER BY subject_name');
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateSubject = async (req, res) => {
    try {
        const { subject_name, max_marks } = req.body;
        const subjectId = req.params.id;
        await db.query(
            'UPDATE Subjects SET subject_name = ?, max_marks = ? WHERE subject_id = ?',
            [subject_name, max_marks, subjectId]
        );
        res.status(200).json({ message: 'Subject updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
