const { Schema, Types } = require('mongoose'); // Importing necessary modules from Mongoose

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

// Defining the reaction schema
const reactionSchema = new Schema(
    {
        // Defining the structure of reactionId field
        reactionId: {
            type: Schema.Types.ObjectId, // Type is ObjectId
            default: () => new Types.ObjectId(), // Default value is a new ObjectId
        },
        // Defining the structure of reactionBody field
        reactionBody: {
            type: String, // Type is string
            required: true, // Required field
            maxLength: 280, // Maximum length is 280 characters
        },
        // Defining the structure of username field
        username: {
            type: String, // Type is string
            required: true, // Required field
        },
        // Defining the structure of createdAt field
        createdAt: {
            type: Date, // Type is date
            default: Date.now, // Default value is current date and time
            get: timestamp => dateFormat(timestamp) // Custom getter function to format date
        },
    },
    {
        // Configuring toJSON behavior
        toJSON: {
            getters: true // Including getters in JSON representation
        },
        // Disabling the _id field in the schema
        id: false
    }
);

module.exports = reactionSchema; // Exporting the reactionSchema
