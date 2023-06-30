const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

const totalUsers = async () => {
    const numberOfUsers = await User.aggregate()
        .count('userCount');
    return totalUsers;
}

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            const userObj = {
                users,
                totalUsers: await totalUsers(),
            };
            res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');
            if (!user) {
                return res.status(404).json({ message: 'No User with that ID.'});
            }
            res.json(user)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'No User with that ID.'});
            }
            // Delete thoughts linked to deleted account
            res.json({ message: 'User Successfully Deleted.' });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true});
            if (!user) {
                return res.status(404).json({ message: 'No User with that ID.'});
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        console.log('You are adding a new Friend');
        console.log(req.body);
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: {friends: { friendId: req.params.friendId }}},
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No User with that ID.'});
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteFriend(req, res) {
        console.log('You are deleting a Friend');
        console.log(req.body);
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: {friends: { friendId: req.params.friendId }}},
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No User with that ID.'});
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};