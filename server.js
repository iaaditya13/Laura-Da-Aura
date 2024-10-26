const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // Make sure to serve your static files (index.html, css, js)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Simple route for testing
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Ensure correct path to index.html
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
