const db = require('../config/db');

class Student {
    static async create(studentData) {
        const { roll_number, name, class_name } = studentData;
        const [result] = await db.query(
            'INSERT INTO students (roll_number, name, class_name) VALUES (?, ?, ?)',
            [roll_number, name, class_name]
        );
        return result.insertId;
    }

    static async findAll() {
        const [rows] = await db.query('SELECT * FROM students ORDER BY class_name, roll_number');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM students WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByRollNumber(rollNumber) {
        const [rows] = await db.query('SELECT * FROM students WHERE roll_number = ?', [rollNumber]);
        return rows[0];
    }

    static async update(id, studentData) {
        const { roll_number, name, class_name } = studentData;
        await db.query(
            'UPDATE students SET roll_number = ?, name = ?, class_name = ? WHERE id = ?',
            [roll_number, name, class_name, id]
        );
    }

    static async delete(id) {
        await db.query('DELETE FROM students WHERE id = ?', [id]);
    }
}

module.exports = Student;
