const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '',  // Replace with your MySQL password
  database: 'auto_parts_db' // Your database name
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

// GET route to fetch all parts
router.get('/', (req, res) => {
  db.query('SELECT * FROM parts', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// POST route to add a new part
router.post('/', (req, res) => {
  const { part_number, description, location, cost } = req.body;
  const query = 'INSERT INTO parts (part_number, description, location, cost) VALUES (?, ?, ?, ?)';
  
  db.query(query, [part_number, description, location, cost], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Part added successfully', partId: result.insertId });
  });
});

// PUT route to update a part
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { description, location, cost } = req.body;
  const query = 'UPDATE parts SET description = ?, location = ?, cost = ? WHERE id = ?';
  
  db.query(query, [description, location, cost, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Part not found' });
    }
    res.json({ message: 'Part updated successfully' });
  });
});

// Export the router to use in server.js
module.exports = router;
