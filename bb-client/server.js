const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

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
        // Create a table if it does not exist
        db.run(`CREATE TABLE IF NOT EXISTS raspberry_pis (
                mac_address TEXT PRIMARY KEY,
                last_update TEXT,
                subdomain TEXT
            );`);
    }
});

// API route to get all Raspberry Pi entries
app.get('/api/rpis', async (req, res) => {
    try {
        const rows = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM raspberry_pis', [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        // Array to hold promises for fetching data from each URL
        const fetchPromises = rows.map(async (rpi) => {
            try {
                // Construct the URL to fetch data from the Raspberry Pi
                const url = `http://${rpi.subdomain}.gr9.codexenmo.no:8081/location`;
                console.log(`Fetching data from: ${url}`);

                // Make a GET request to the URL
                const response = await axios.get(url);

                // Combine the RPi data with the fetched data
                return {
                    ...rpi,
                    latitude: response.data.latitude,  // Assuming response data has latitude
                    longitude: response.data.longitude  // Assuming response data has longitude
                };
            } catch (error) {
                console.error(`Error fetching data from ${rpi.url}:`, error.message);
                return {
                    ...rpi,
                    fetchedData: null // Or handle errors as needed
                };
            }
        });

        // Wait for all fetch promises to resolve
        const combinedData = await Promise.all(fetchPromises);

        // Send the combined data as the response
        console.log('Combined data:', combinedData);
        res.json(combinedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
