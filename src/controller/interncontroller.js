const collegeModel=require("../model/collagemodel")
const interModel=require("../model/internmodel")
const {validName, validEmail}=require("../validation/valid")


const createIntern=async (req,res)=>{
    
    try{
        let data =req.body
          data.name=req.body.name.trim()
          data.collegeName=req.body.collegeName.trim()
          
        if(Object.keys(data)==0){return res.status(400).send({status:false,msg:"body is empty can not creat any thing"})}
        if(!data.name)return  res.status(400).send({status:false,msg:"name is empty input valid name"})
        if(!data.email)return  res.status(400).send({status:false,msg:"Email is empty input valid Email"})
        if(!data.mobile)return  res.status(400).send({status:false,msg:"Mobile No is empty input valid Mobile No"})
        if(!data.collegeName)return  res.status(400).send({status:false,msg:"college name is empty input valid college name"})

        if (validName.test(data.collegeName)) return res.status(400).send({ status: false, message: "please provide valid name" })
        if (validName.test(data.name)) return res.status(400).send({ status: false, message: "please provide valid name" })
        if (!validEmail.test(data.email)) return res.status(400).send({ status: false, message: "please provide valid Email" })
        if (data.mobile.length<10 || data.mobile.length>10) return res.status(400).send({ status: false, message: "please provide valid Mobilenumber" })
      

        let collegeId=await collegeModel.findOne({name:data.collegeName}).select({_id:1})
        if(!collegeId)return res.status(400).send({ status: false, message: "No college found with this name" })

        data.collegeId = collegeId._id;

        let students = await interModel.findOne({ $or: [{ email: data.email }, { mobile: data.mobile }] });
        if (students) return res.status(400).send({ status: false, message: "Email or Mobile number already exist" })
    
        let InterData = await interModel.create({name:data.name,email:data.email,mobile:data.mobile,collegeId:data.collegeId})
        res.status(201).send({ status: true, message: "Account created successfully", data: InterData })
    }
    catch(err){
        res.status(500).send({status:false,msg:err.message})
    }
}




module.exports=createIntern