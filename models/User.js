const { Schema, model } = require('mongoose'); // Importing necessary modules from Mongoose

// Defining the user schema
const userSchema = new Schema(
    {
        // Defining the structure of username field
        username: {
            type: String, // Type is string
            unique: true, // Field must be unique
            required: true, // Required field
            trim: true, // Trimming whitespace from the beginning and end of the string
        },
        // Defining the structure of email field
        email: {
            type: String, // Type is string
            required: true, // Required field
            unique: true, // Field must be unique
            match: [ // Field value must match the specified regular expression
                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, // Regular expression for email validation
                "must match an email" // Error message if validation fails
            ]
        },
        // Defining the structure of thoughts field as an array of Thought references
        thoughts: [
            {
                type: Schema.Types.ObjectId, // Type is ObjectId
                ref: 'Thought', // Reference to the 'Thought' model
            },
        ],
        // Defining the structure of friends field as an array of User references
        friends: [
            {
                type: Schema.Types.ObjectId, // Type is ObjectId
                ref: 'User', // Reference to the 'User' model
            },
        ],
    },
    {
        // Configuring toJSON behavior
        toJSON: {
            virtuals: true, // Including virtual fields in JSON representation
        },
        // Disabling the _id field in the schema
        id: false,
    }
);

// Adding a virtual field 'friendCount' to calculate the number of friends
userSchema.virtual("friendCount").get(function () {
    return this.friends.length; // Getting the length of friends array
});

const User = model('User', userSchema); // Creating the User model
module.exports = User; // Exporting the User model
