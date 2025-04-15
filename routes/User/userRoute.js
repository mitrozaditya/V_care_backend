const express = require('express');
const { registerUser } = require('../../controllers/User/auth/registerUser');
const { addUser } = require('../../controllers/User/addUser');
const { getAllUser } = require('../../controllers/User/getAllUser');
const { getUserById } = require('../../controllers/User/getUserById');
const { deleteUser } = require('../../controllers/User/deleteUser');
const { getAllSalesman } = require('../../controllers/User/Team/getAllSalesman');
const { getTechnicianList } = require('../../controllers/User/Team/getTechnicianList');
const { updateUser } = require('../../controllers/User/updateUser');
const router = express.Router();


// add user
// router.post('/register', registerUser);
router.post('/add',addUser )

// get all users\
router.get('/get', getAllUser);

// get user by id
router.get('/get/:id', getUserById);

// delete user
router.delete('/delete/:id', deleteUser);
// update user
router.put('/update/:id', updateUser);


// get all salesman
router.get('/salesman', getAllSalesman);

// get Technician List
router.get('/technician', getTechnicianList);

module.exports = router;