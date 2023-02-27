const mongoose = require("mongoose")

const collegeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
          
        },
        fullName: {
            type: String,
            required: true,
        },
        logoLink: {
            type: String,
            required: true,
           
        },
        isDeleted:{
            type:Boolean,
            default: false
        }
    });


module.exports = mongoose.model('College', collegeSchema)
