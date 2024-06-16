const express = require('express');
const router = express.Router();

// Tambah Berita
router.post('/add', (req, res) => {
    const newBerita = {
        title: req.body.title,
        content: req.body.content
    };
    const sql = 'INSERT INTO berita SET ?';
    req.db.query(sql, newBerita, (err, result) => {
        if (err) throw err;
        res.send('Berita added...');
    });
});

// Dapatkan Semua Berita
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM berita';
    req.db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Update Berita
router.put('/update/:id', (req, res) => {
    const updatedBerita = {
        title: req.body.title,
        content: req.body.content
    };
    const sql = `UPDATE berita SET ? WHERE id = ${mysql.escape(req.params.id)}`;
    req.db.query(sql, updatedBerita, (err, result) => {
        if (err) throw err;
        res.send('Berita updated...');
    });
});

// Hapus Berita
router.delete('/delete/:id', (req, res) => {
    const sql = `DELETE FROM berita WHERE id = ${mysql.escape(req.params.id)}`;
    req.db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Berita deleted...');
    });
});

module.exports = router;
