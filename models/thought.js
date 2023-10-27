const {Schema, model} = require('mongoose');

const thoughtSchema = Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length
})

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;