const collegeModel=require("../model/collagemodel")
const interModel=require("../model/internmodel")
const {validName, validEmail}=require("../validation/valid")


const createIntern=async (req,res)=>{
    
    try{
        let data =req.body
         
          
        if(Object.keys(data)==0){return res.status(400).send({status:false,msg:"body is empty can not creat any thing"})}
        let newarr=["name","email","mobile","collegeName"]
        for(field of newarr){
            if(!data[field])return  res.status(400).send({status:false,msg:`${field} is empty input valid name`})}

            data.name=req.body.name.trim()
            data.collegeName=req.body.collegeName.trim()

        if (validName.test(data.collegeName)) return res.status(400).send({ status: false, message: "please provide valid name" })
        if (validName.test(data.name)) return res.status(400).send({ status: false, message: "please provide valid name" })
        if (!validEmail.test(data.email)) return res.status(400).send({ status: false, message: "please provide valid Email" })
        if (data.mobile.length<10 || data.mobile.length>10) return res.status(400).send({ status: false, message: "please provide valid Mobilenumber" })
      

        let collegeId=await collegeModel.findOne({name:data.collegeName}).select({_id:1})
        if(!collegeId)return res.status(400).send({ status: false, message: "No college found with this name" })

        data.collegeId = collegeId._id;

        let students = await interModel.findOne({ $or: [{ email: data.email }, { mobile: data.mobile }] });
        if (students) return res.status(400).send({ status: false, message: "Email or Mobile number already exist" })
    
        let intern = await interModel.create({name:data.name,email:data.email,mobile:data.mobile,collegeId:data.collegeId})
        let InterData=intern.toObject();

        ["_id","isdeleted","__v"].forEach(x=>delete InterData[x])
        res.status(201).send({ status: true, Data: InterData })
    }
    catch(err){
        res.status(500).send({status:false,msg:err.message})
    }
}




module.exports=createIntern