const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const { User } = require('./models/user');
const { Thought } = require('./models/thought');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// TODO: Turn on routes when ready to code and test them
// app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});  