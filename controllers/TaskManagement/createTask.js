const Task = require("../../models/Task/taskManagement");
const Counter = require("../../models/Counter/counter");

// add task

exports.createTask = async (req, res) => {
    try {
        const counter = await Counter.findOneAndUpdate(
            { name: 'task' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        )
        const year = new Date().getFullYear();
        const task_id = `TS${year}${String(counter.seq).padStart(4, '0')}`;


        const {
            task_description,
            create_date,
            complete_date,
            assign_task
        } = req.body;

        const task = new Task({
            task_id,
            task_description,
            create_date,
            complete_date,
            assign_task,
            // status: 'Pending'

        })
        await task.save();

        res.status(201).json({
            message: 'Task added successfully',
            success: true,
            status: 'success',
            data: task

        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Server error',
            error
        })
    }
}