// Require schema and model from mongoose
const mongoose = require('mongoose');

// Construct a new instance of the schema class
const reactionSchema = new mongoose.Schema(
    {
        reactionId: {
            type: String,
        },
        reactionBody: {
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

// Using mongoose.model() to compile a model based on the schema 'reactionSchema'
const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;