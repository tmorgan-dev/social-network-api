// TODO: This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
const {Schema, Types} = require("mongoose")

const reactionSchema = Schema(
    {
        reactionId: { 
            type: Schema.Types.ObjectId, // Is this correct?
            default: Types.ObjectId, // Is this correct?
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
    {
        toJSON: {
            getters: true

        },
        id:false
    }
);

module.exports = reactionSchema;