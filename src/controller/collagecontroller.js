const collegeModel=require("../model/collagemodel")
const internModel=require("../model/internmodel")
const { validName, validUrl } = require("../validation/valid")

const createcollege=async (req,res)=>{
    
    try{
        let data =req.body
          data.name=req.body.name.trim()
          data.fullName=req.body.fullName.trim()
        if(Object.keys(data)==0){return res.status(400).send({status:false,msg:"body is empty can not creat any thing"})}
        if(!data.name)return  res.status(400).send({status:false,msg:"name is empty input valid name"})
        if(!data.fullName)return  res.status(400).send({status:false,msg:"fullName is empty input valid full name"})
        if(!data.logoLink)return  res.status(400).send({status:false,msg:"logoLink is empty provide valid Logo Link"})

        if (validName.test(data.name)) return res.status(400).send({ status: false, message: "please provide valid name " })
        if (validName.test(data.fullName)) return res.status(400).send({ status: false, message: "please provide valid fullName" })
        if (!validUrl.test(data.logoLink)) return res.status(400).send({ status: false, message: "please provide valid logoLink" })

        let college=await collegeModel.findOne({name:data.name})
        if(college)return res.status(400).send({status:false,msg:"college already exist"})

        let creatcollege=await collegeModel.create(data)
        res.status(201).send({status:true,msg:creatcollege})
    }
    catch(err){
        res.status(500).send({status:false,msg:err.message})
    }
}

const getintern = async function (req, res) {
    try {
      let collagename = req.query;
      collagename.isdeleted=false

      console.log(collagename)
       
      if(!collagename){return res.status(400).send({status:false,msg:"no query is present"})}
      let result = await collegeModel.findOne(collagename).select({name:1,fullName:1,logoLink:1})
      if (!result) {return res.status(404).send({ status: false, msg: "No collage found" }) }
      let intern=await internModel.find({collegeId:result._id}).select({ name: 1, email: 1, mobile: 1 })
      if (!intern) return res.status(404).send({ status: false, message: "No interns available for this college" })
       
      res.status(200).send({status:true,data:{name:result.name,fullName:result.fullName,logoLink:result.logoLink,interndata:intern}}) 


 } catch (err) {
      res.status(500).send({ msg: "Error", error: err.message })
    }
  }

 


module.exports={createcollege,getintern}
