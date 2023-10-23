// Require schema and model from mongoose
const mongoose = require('mongoose');

// Construct a new instance of the schema class
const thoughtSchema = new mongoose.Schema(
    {
        thoughtId: {
            type: String,
        },
        thoughtBody: {
            type: String,
        },
        username: {
            type: String,
        },
        createdAt: {
            type: String,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Using mongoose.model() to compile a model based on the schema 'thoughtSchema'
const Thought = mongoose.model('Thought', thoughtSchema);
module.exports = Thought;