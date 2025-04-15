const express = require('express');
const { createChallan } = require('../../controllers/Challan/createChallan');
const { updateChallan } = require('../../controllers/Challan/updateChallan');
const { getChallanById } = require('../../controllers/Challan/getChallanById');
const { getChallans } = require('../../controllers/Challan/getChallan');
const { deleteChallan } = require('../../controllers/Challan/deleteChallan');
const { getChallanByEnquiryId } = require('../../controllers/Challan/getChallanByEnquiryId');
const router = express.Router();

// create challan
router.post('/add',createChallan)

// update challan
router.put('/update/:id',updateChallan)

// get challan by id
router.get('/get/:id',getChallanById)

// get all challans
router.get('/get',getChallans)

// delete challan
router.delete('/delete/:id',deleteChallan)

// get challan by enquiry id
router.get('/get/enquiry/:enquiryId', getChallanByEnquiryId);


module.exports = router;