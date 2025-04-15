// const { nanoid } = require('nanoid');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    // uid: { type: String, default: () => nanoid(), unique: true },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: false
    },
    // otp: { type: String },
    // otp_expiry: { type: Date },
}, { timestamps: true });

// Hash password before saving
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('Admin', adminSchema);