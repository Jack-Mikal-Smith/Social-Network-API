const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // Matching Validation
        },
        thoughts: [{type: Schema.Types.ObjectId, ref: 'Thought'}],
        friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
    }
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.lenght;
});

const User = model('user', userSchema);

module.exports = User;