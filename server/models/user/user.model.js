const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        studentId: {
            type: String,
            required: false,
            trim: true,
        },
        department: {
            type: String,
            required: true,
            trim: true,
        },
        course: {
            type: String,
            required: false,
        },
        role: {
            type: String,
            enum: ['admin', 'teacher', 'student'],
            default: 'student',
        },
        isActivated: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
});

module.exports = mongoose.model('User', userSchema);
