const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || ''
        });

        const sqlScript = fs.readFileSync(path.join(__dirname, 'database.sql'), 'utf-8');
        const statements = sqlScript.split(';').filter(stmt => stmt.trim());

        for (const statement of statements) {
            await connection.query(statement);
        }

        console.log('Database and tables created successfully!');
        await connection.end();
    } catch (error) {
        console.error('Error setting up database:', error);
    }
}

setupDatabase();
