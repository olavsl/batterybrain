const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
  });
  

// Specify the path to the SQLite database outside the root directory
const dbPath = path.join(process.env.HOME, 'RPIs.db');
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, ''); // Create an empty file
    console.log(`Created database file: ${dbPath}`);
}
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database: ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Create a table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS raspberry_pis (
                mac_address TEXT PRIMARY KEY,
                last_update TEXT,
                subdomain TEXT
            );`);
    }
});

// API route to get all Raspberry Pi entries
app.get('/api/rpis', (req, res) => {
    db.all('SELECT * FROM raspberry_pis', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows); // Send the rows directly
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
