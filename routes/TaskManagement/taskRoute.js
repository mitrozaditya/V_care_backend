const express = require('express');
const { createTask } = require('../../controllers/TaskManagement/createTask');
const { updateTask } = require('../../controllers/TaskManagement/updateTask');
const { deleteTaskt } = require('../../controllers/TaskManagement/deleteTask');
const { getAllTask } = require('../../controllers/TaskManagement/getAlltask');
const router = express.Router();

// create task
router.post('/createTask', createTask)

// update task
router.put('/updateTask/:id', updateTask)

// delete task 
router.delete('/deleteTask/:id', deleteTaskt)

// get all task
router.get('/getAllTask', getAllTask)

module.exports = router;
