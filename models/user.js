const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // TODO: Must match a valid email address (look into Mongoose's matching validation)
        },
        // thoughts: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'thought',
        //     },
        // ],
        // friends: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'user',
        //     },
        // ],
    },
    {
        toJSON: {
            // TODO: Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
            virtuals: true,
        },
        id: false,
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;