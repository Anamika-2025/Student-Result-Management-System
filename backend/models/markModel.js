const db = require('../config/db');

class Mark {
    static async addOrUpdate(markData) {
        const { student_id, subject_id, marks_obtained, max_marks } = markData;
        const [existing] = await db.query(
            'SELECT * FROM marks WHERE student_id = ? AND subject_id = ?',
            [student_id, subject_id]
        );

        if (existing.length > 0) {
            await db.query(
                'UPDATE marks SET marks_obtained = ?, max_marks = ? WHERE id = ?',
                [marks_obtained, max_marks || 100, existing[0].id]
            );
            return existing[0].id;
        } else {
            const [result] = await db.query(
                'INSERT INTO marks (student_id, subject_id, marks_obtained, max_marks) VALUES (?, ?, ?, ?)',
                [student_id, subject_id, marks_obtained, max_marks || 100]
            );
            return result.insertId;
        }
    }

    static async getMarksByStudent(studentId) {
        const [rows] = await db.query(`
            SELECT m.*, s.subject_code, s.subject_name 
            FROM marks m 
            JOIN subjects s ON m.subject_id = s.id 
            WHERE m.student_id = ?
        `, [studentId]);
        return rows;
    }

    static async getSubjectAnalysis(subjectId) {
        const [rows] = await db.query(`
            SELECT m.*, st.name, st.roll_number, st.class_name 
            FROM marks m 
            JOIN students st ON m.student_id = st.id 
            WHERE m.subject_id = ?
            ORDER BY m.marks_obtained DESC
        `, [subjectId]);
        return rows;
    }
}

module.exports = Mark;
