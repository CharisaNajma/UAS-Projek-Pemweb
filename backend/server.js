const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Buat koneksi database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webci4' // Pastikan ini sesuai dengan nama database Anda
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Import routes
const beritaRoutes = require('./routes/routes');

// Use routes
app.use('/berita', (req, res, next) => {
    req.db = db; // Tambahkan baris ini
    next();
}, beritaRoutes);

// Define a route for the root URL
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM berita';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
