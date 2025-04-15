const mongoose = require('mongoose');
const { assign } = require('nodemailer/lib/shared');

const taskManagementSchema = new mongoose.Schema({

    task_id: {
        type: String,
        default: 'TS20250001'
    },
    task_description: {
        type: String,
        required: true
    },

    create_date: {
        type: Date,
        required: true
    },

    complete_date: {
        type: Date,
        default: null
    },

    assign_task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User_Master',
        required: true

    },
    status: {
        type: String,
        enum: ['Ongoing', 'Completed', 'Pending'],
        default: 'Pending'
    }

},
    { timestamps: true }
)
module.exports = mongoose.model('task_Management', taskManagementSchema);