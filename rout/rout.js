const internsontroller = require("../name/filename");
// if college api in anothrer folder
 const collegeController = require("../name/filename");

// if middleware 
//const MW = require("../Middlewares/auth");
const express = require("express")
const router = express.Router();

// interns
router.post('/functionup/interns',internsontroller.function)
//college
router.post('/functionup/colleges'collegeController.funtion)
//get
router.get('/functionup/collegeDetails'key)


module.exports = router
