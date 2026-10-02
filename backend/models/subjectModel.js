const db = require('../config/db');

class Subject {
    static async create(subjectData) {
        const { subject_code, subject_name } = subjectData;
        const [result] = await db.query(
            'INSERT INTO subjects (subject_code, subject_name) VALUES (?, ?)',
            [subject_code, subject_name]
        );
        return result.insertId;
    }

    static async findAll() {
        const [rows] = await db.query('SELECT * FROM subjects ORDER BY subject_code');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM subjects WHERE id = ?', [id]);
        return rows[0];
    }

    static async update(id, subjectData) {
        const { subject_code, subject_name } = subjectData;
        await db.query(
            'UPDATE subjects SET subject_code = ?, subject_name = ? WHERE id = ?',
            [subject_code, subject_name, id]
        );
    }

    static async delete(id) {
        await db.query('DELETE FROM subjects WHERE id = ?', [id]);
    }
}

module.exports = Subject;
