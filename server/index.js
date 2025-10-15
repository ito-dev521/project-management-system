const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

async function createPool() {
    return mysql.createPool({
        host: process.env.MYSQL_HOST || 'localhost',
        port: Number(process.env.MYSQL_PORT || 3306),
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DATABASE || 'project_management',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
}

let poolPromise = createPool();

// ヘルスチェック
app.get('/api/health', async (req, res) => {
    try {
        const pool = await poolPromise;
        const [rows] = await pool.query('SELECT 1 AS ok');
        res.json({ status: 'ok', db: rows[0].ok === 1 });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message || 'unknown', code: err.code, sqlState: err.sqlState });
    }
});

// 初回用: テーブル作成（簡易）
app.post('/api/setup', async (req, res) => {
    try {
        const pool = await poolPromise;
        await pool.query(`
            CREATE TABLE IF NOT EXISTS projects (
                id INT AUTO_INCREMENT PRIMARY KEY,
                project_number VARCHAR(50) NOT NULL,
                project_name VARCHAR(255) NOT NULL,
                start_date DATE NOT NULL,
                end_date DATE NOT NULL,
                contract_amount INT NOT NULL,
                manager VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content VARCHAR(255) NOT NULL,
                deadline DATE NOT NULL,
                estimated_days INT NOT NULL,
                description TEXT,
                assignee VARCHAR(100) DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);

        res.json({ ok: true });
    } catch (err) {
        res.status(500).json({ ok: false, message: err.message || 'unknown', code: err.code, sqlState: err.sqlState });
    }
});

// Projects API
app.get('/api/projects', async (req, res) => {
    try {
        const pool = await poolPromise;
        const [rows] = await pool.query('SELECT * FROM projects ORDER BY id DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message || 'unknown', code: err.code, sqlState: err.sqlState });
    }
});

app.post('/api/projects', async (req, res) => {
    try {
        const { projectNumber, projectName, startDate, endDate, contractAmount, manager } = req.body;
        const pool = await poolPromise;
        const [result] = await pool.execute(
            'INSERT INTO projects (project_number, project_name, start_date, end_date, contract_amount, manager) VALUES (?, ?, ?, ?, ?, ?)',
            [projectNumber, projectName, startDate, endDate, contractAmount, manager]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ message: err.message || 'unknown', code: err.code, sqlState: err.sqlState });
    }
});

// Tasks API
app.get('/api/tasks', async (req, res) => {
    try {
        const pool = await poolPromise;
        const [rows] = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/tasks', async (req, res) => {
    try {
        const { project, content, deadline, estimatedDays, description, assignee } = req.body;
        const pool = await poolPromise;
        const [result] = await pool.execute(
            'INSERT INTO tasks (title, content, deadline, estimated_days, description, assignee) VALUES (?, ?, ?, ?, ?, ?)',
            [project, content, deadline, Number(estimatedDays), description || null, assignee || null]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`API server listening on http://localhost:${port}`);
});


