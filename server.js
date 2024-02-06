const express = require('express'); // Importing Express module
const db = require('./config/connection'); // Importing database connection
const routes = require('./routes'); // Importing routes

const PORT = 3001; // Port number
const app = express(); // Creating Express application

app.use(express.urlencoded({ extended: true })); // Middleware for parsing URL-encoded bodies
app.use(express.json()); // Middleware for parsing JSON bodies
app.use(routes); // Using routes for the application

// Listening for the database connection to open
db.once('open', () => {
    // Starting the Express server to listen on the specified port
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
