const { ObjectId } = require('mongoose').Types;
const User = require('./Users');
const Thought = require('./Thought');
const Reaction = require('./Reaction');

module.exports = { User, Thought, Reaction };