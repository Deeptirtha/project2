const mongoose=require('mongoose');
const objectId=mongoose.Schema.Types.ObjectId
const internSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase: true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    collegeId:{
        type:objectId,
        required:true
    },
    isdeleted:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('intern', internSchema)