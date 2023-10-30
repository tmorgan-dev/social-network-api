const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await User.collection.drop();
    await Thought.collection.drop();

    const userData = [
        {
            username: 'user1',
            email: 'user1@example.com',
        },
        {
            username: 'user2',
            email: 'user2@example.com',
        },

    ];

    await User.insertMany(userData);

    const thoughtData = [
        {
            thoughtText: 'Hello, world!',
            username: 'user1',
        },
        {
            thoughtText: 'Mongoose is great!',
            username: 'user2',
        },
    ];
    
    await Thought.insertMany(thoughtData);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});


