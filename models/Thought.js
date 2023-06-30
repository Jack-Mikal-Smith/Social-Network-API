const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');


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
        userName: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    }
);

thoughtSchema.virtual('thoughtCount').get(function() {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

model.exports = Thought;