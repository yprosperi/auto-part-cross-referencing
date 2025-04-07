const express = require('express'); // Import Express
const mysql = require('mysql'); // Import MySQL
const app = express(); // Initialize the Express application

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'zarya',  // Make sure the password is specified
  database: 'auto_parts_db'  // Your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Database connected successfully!');
});

// Basic GET route to check if server is working
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// GET route to fetch all parts
app.get('/api/parts', (req, res) => {
  const query = 'SELECT * FROM parts';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching parts');
    }
    res.json(results);
  });
});

// POST route to add a new part
app.post('/api/parts', (req, res) => {
  const { part_number, description, location, cost } = req.body;
  const query = 'INSERT INTO parts (part_number, description, location, cost) VALUES (?, ?, ?, ?)';
  db.query(query, [part_number, description, location, cost], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error adding part');
    }
    res.status(201).send('Part added successfully');
  });
});

// PUT route to update an existing part by id
app.put('/api/parts/:id', (req, res) => {
  const { id } = req.params;
  const { part_number, description, location, cost } = req.body;
  const query = 'UPDATE parts SET part_number = ?, description = ?, location = ?, cost = ? WHERE id = ?';
  db.query(query, [part_number, description, location, cost, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error updating part');
    }
    res.send('Part updated successfully');
  });
});

// DELETE route to remove a part by id
app.delete('/api/parts/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM parts WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error deleting part');
    }
    res.send('Part deleted successfully');
  });
});

// Start the server on port 5000
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
