// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // for local login (optional)
    picture: { type: String },

    // OAuth provider info
    googleId: { type: String },
    facebookId: { type: String },

    // Role-based access
    role: { type: String, enum: ['user', 'admin'], default: 'user' },

    // Timestamps for auditing
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
