const collegeModel=require("../model/collagemodel")
const interModel=require("../model/internmodel")

const createcollege=async (req,res)=>{
    
    try{
        let data =req.body
      
        if(Object.keys(data)==0){return res.status(400).send({status:false,msg:"body is empty can not creat any thing"})}
        if(!data.name)return  res.status(400).send({status:false,msg:"name is empty input valid name"})
        if(!data.fullName)return  res.status(400).send({status:false,msg:"fullName is empty input valid name"})
        if(!data.logoLink)return  res.status(400).send({status:false,msg:"logoLink is empty input valid name"})

        let college=await collegeModel.findOne({fullName:data.fullName})
        if(college)return res.status(400).send({status:false,msg:"college is already exist"})

        let creatcollege=await collegeModel.create(req.body)
        res.status(201).send({status:true,msg:creatcollege})
    }
    catch(err){
        res.status(500).send({status:false,msg:err.message})
    }
}

module.exports.createcollege=createcollege