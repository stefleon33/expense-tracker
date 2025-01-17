const mongoose = require('mongoose');

const BlacklistSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            ref: "User",
        },
        createdAt: { 
            type: Date, 
            default: Date.now, 
            expires: 3600 },
    },

    { timestamps: true }
);

module.exports = mongoose.model("Blacklist", BlacklistSchema);