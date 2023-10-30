    const { Schema, model } = require('mongoose');

    function dateFormat(timestamp) {
        const date = new Date(timestamp);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const reactionSchema = Schema(
        {
            reactionId: {
                type: Schema.Types.ObjectId,
                default: () => new Types.ObjectId(),
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
                default: Date.now,
                get: timestamp => dateFormat(timestamp)
            },
        },
        {
            toJSON: {
                getters: true
            },
            id: false
        }
    );

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

    thoughtSchema.virtual("reactionCount").get(function () {
        return this.reactions.length;
    });

    const Thought = model('Thought', thoughtSchema);
    module.exports = Thought;