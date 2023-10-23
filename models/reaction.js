// TODO: This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema(
    {
        reactionId: {
            // TODO: Use Mongoose's ObjectId data type
            // TODO: Default value is set to a new ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            // TODO: Set default value to the current timestamp
            // TODO: Use a getter method to format the timestamp on query
        },
    },
);

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;