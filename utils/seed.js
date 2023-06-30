const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUsername, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
        let thoughtCheck = await connection.db.listCollections({ name: 'thoughts'}).toArray();
        if (thoughtCheck.length) {
            await connection.dropCollection('thoughts');
        }

        let usersCheck = await connection.db.listCollections({ name: 'users'}).toArray();
        if (usersCheck.length) {
            await connection.dropCollection('users');
        }

    const users = [];

    for (let i = 0; i < 20; i++) {
        const exampleUsers = getRandomUsername(20);
        const exampleThoughts = getRandomThoughts(20);
        users.push({ exampleUsers, exampleThoughts});

    }

    await User.collection.insertMany(users);

    console.table(users);
    console.info('Seeding Complete!');
    process.exit(0);
});