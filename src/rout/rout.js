 const {createcollege,getintern} = require("../controller/collagecontroller");
 const internController = require("../controller/interncontroller")


const express = require("express")
const router = express.Router();




router.post('/functionup/colleges',createcollege)

router.post('/functionup/interns',internController)

 router.get('/functionup/collegeDetails',getintern)


module.exports = router
