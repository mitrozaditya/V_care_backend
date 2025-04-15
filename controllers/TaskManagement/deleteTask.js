const Task = require('../../models/Task/taskManagement');
// delete task

exports.deleteTaskt = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({
                message: 'Task not found',
                success: false,
                status: 'error'
            })

        }
  
      
        res.status(200).json({
            message: 'Task deleted successfully',
            success: true,
            status: 'success',
            

        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Server error',
            error
        })
    }
}