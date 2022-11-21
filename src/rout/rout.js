//const internsontroller = require("../name/filename");
// if college api in anothrer folder
 const collegeController = require("../controller/collagecontroller");


const express = require("express")
const router = express.Router();



//college
router.post('/functionup/colleges',collegeController.createcollege)

// // interns
// router.post('/functionup/interns',)

// //get
// router.get('/functionup/collegeDetails')


module.exports = router
