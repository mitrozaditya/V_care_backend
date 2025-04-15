const Task = require('../../models/Task/taskManagement');

// get all task 

exports.getAllTask = async (req, res) => {
    try {
        const task = await Task.find();
        res.status(200).json({
            message: 'Task fetched successfully',
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