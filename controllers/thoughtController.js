const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try{
            const thoughts = await Thought.find();
            res.json(thoughts)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try{
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');
            if (!thought) {
                return res.status(404).json({message: 'No Thought with that ID.'});
            }
            res.json(thought)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try{
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try{
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true});
            if (!thought) {
                return res.status(404).json({message: 'No Thought with that ID.'});
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try{
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId});
            if (!thought) {
                return res.status(404).json({message: 'No Thought with that ID.'});
            }
            res.json({ message: 'Thought successfully deleted.'});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        console.log('You are adding a Reaction');
        console.log(req.body);
        try{
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: {reactions: {reactionId: req.params.reactionId }}},
                { runValidators: true, new: true});
            if (!thought) {
                return res.status(404).json({message: 'No Thought with that ID.'});
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try{
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: {reactions: {reactionId: req.params.reactionId }}},
                { runValidators: true, new: true});
            if (!thought) {
                return res.status(404).json({message: 'No Thought with that ID.'});
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
}