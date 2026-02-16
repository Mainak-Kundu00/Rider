const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
    token: {
              type: String, 
              required: true 
           },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        index: { expires: '24h' } // TTL index: auto-delete after 24h
    }
});

const Blacklist = mongoose.model('Blacklist', blacklistSchema);

module.exports = Blacklist;