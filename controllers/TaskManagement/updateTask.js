const Task = require('../../models/Task/taskManagement');

// update task
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            task_description,
            create_date,
            complete_date,
            assign_task,
            status
        } = req.body;

        if(!task){
            return res.status(404).json({
                message: 'Task not found',
                success: false,
                status: 'error'
            })
        }


        const task = await Task.findByIdAndUpdate(
            id,
            {
                task_description,
                create_date,
                complete_date,
                assign_task,
                status
            },
            { new: true }
        )
        res.status(200).json({
            message: 'Task updated successfully',
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
   
