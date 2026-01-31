const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const os = require('os');

// Secure location for database
const DB_DIR = path.join(os.homedir(), '.tna'); // hidden folder in user home
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

const DB_PATH = path.join(DB_DIR, 'notes.db');

// Initialize DB
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) console.error('Database error:', err.message);
    else console.log('TNA database initialized at', DB_PATH);
});

// Create table if not exists (migrating to include title)
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    body TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

    db.run(`ALTER TABLE notes ADD COLUMN title TEXT`, (err) => {
        // ignore duplicate column error
    });
});

// Functions to access DB
function addNote(title, content, callback) {
    db.run(`INSERT INTO notes (title, content) VALUES (?, ?)`, [title, content], function (err) {
        callback(err, this?.lastID);
    });
}

function getNotes(callback) {
    db.all(`SELECT id, title, content, created_at FROM notes ORDER BY id`, [], callback);
}

function deleteNote(id, callback) {
    db.run(`DELETE FROM notes WHERE id = ?`, [id], callback);
}

module.exports = { addNote, getNotes, deleteNote, db };
