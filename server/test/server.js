const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Test server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Server setup
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Test server running on port ${PORT}`);
// });

// module.exports = app; // Export for testing