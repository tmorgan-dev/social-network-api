const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            // TODO: Set default value to the current timestamp
            // TODO: Use a getter method to format the timestamp on query
        },
        username: {
            type: String,
            required: true,
        },
        // reactions: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'reaction',
        //     },
        // ],
    },
    {
        toJSON: {
            //TODO: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
            virtuals: true,
        },
        id: false,
    }
);

const Thought = mongoose.model('Thought', thoughtSchema);
module.exports = Thought;