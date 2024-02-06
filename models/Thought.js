const { Schema, model } = require('mongoose'); // Importing necessary modules from Mongoose
const reactionSchema = require("./Reaction"); // Importing the reaction schema

// Function to format date
function dateFormat(timestamp) {
    const date = new Date(timestamp);

    // Getting year, month, day, hours, minutes, seconds
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // Formatting date string
}

// Defining the thought schema
const thoughtSchema = new Schema(
    {
        // Defining the structure of thoughtText field
        thoughtText: {
            type: String, // Type is string
            required: true, // Required field
            minLength: 1, // Minimum length is 1 character
            maxLength: 280, // Maximum length is 280 characters
        },
        // Defining the structure of createdAt field
        createdAt: {
            type: Date, // Type is date
            default: Date.now, // Default value is current date and time
            get: timestamp => dateFormat(timestamp) // Custom getter function to format date
        },
        // Defining the structure of username field
        username: {
            type: String, // Type is string
            required: true, // Required field
        },
        // Defining the structure of reactions field as an array of reactionSchema
        reactions: [reactionSchema], // Nested schema
    },
    {
        // Configuring toJSON behavior
        toJSON: {
            getters: true, // Including getters in JSON representation
        },
        // Disabling the _id field in the schema
        id: false,
    }
);

// Adding a virtual field 'reactionCount' to calculate the number of reactions
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length; // Getting the length of reactions array
});

const Thought = model('Thought', thoughtSchema); // Creating the Thought model
module.exports = Thought; // Exporting the Thought model
