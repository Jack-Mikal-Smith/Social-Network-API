const { Schema, model } = require('mongoose');
const { ObjectId } = require('mongoose').Types;

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 280,
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timeStamp => timeStamp
        },
        thoughtId: {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        },
    }
);

module.exports = reactionSchema;