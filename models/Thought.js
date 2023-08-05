const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const { ObjectId } = require('mongoose').Types;

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timeStamp => timeStamp // Convert to dayJS formatting
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },

        reactions: [reactionSchema],
    }
);

thoughtSchema.virtual('thoughtCount').get(function() {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;