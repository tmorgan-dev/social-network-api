const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Require models
const { User } = require('./models');
const { Reaction } = require('./models');
const { Thought } = require('./models');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server for ${activity} running on port ${PORT}!`);
    });
});  