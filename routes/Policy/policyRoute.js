const express = require('express');
const { addPolicy } = require('../../controllers/Policy/addPolicy');
const { getPolicy } = require('../../controllers/Policy/getPolicy');

const router = express.Router();


router.post('/add', addPolicy);

router.get('/get', getPolicy)

module.exports = router;
