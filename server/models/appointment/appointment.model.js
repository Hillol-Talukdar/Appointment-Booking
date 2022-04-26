const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
    {
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        },
        course: {
            type: String,
            required: true,
        },
        agenda: {
            type: String,
            required: true,
            trim: true,
        },
        teacher: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        student: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
