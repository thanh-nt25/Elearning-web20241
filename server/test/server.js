const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Test server is running!' });
});

// Basic error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Test server running on port ${PORT}`);
// });

// module.exports = app; // For testing purposes

// // Testing configurations
// if (process.env.NODE_ENV === 'test') {
//     // Test-specific middleware or configurations can be added here
//     app.set('env', 'test');
// }