const collegeModel=require("../model/collagemodel")
const internModel=require("../model/internmodel")
const { validName, validUrl } = require("../validation/valid")

const createcollege=async (req,res)=>{
    
    try{
        let data =req.body
         
          let newarr=["name","fullName","logoLink"]
        if(Object.keys(data)==0){return res.status(400).send({status:false,msg:"body is empty can not creat any thing"})}
        for(field of newarr){
            if(!data[field])return  res.status(400).send({status:false,msg:`${field} is empty input valid name`})
        }
        data.name=req.body.name.trim()
        data.fullName=req.body.fullName.trim()
        if (validName.test(data.name)) return res.status(400).send({ status: false, msg: "please provide valid name " })
        if (validName.test(data.fullName)) return res.status(400).send({ status: false, msg: "please provide valid fullName" })
        if (!validUrl.test(data.logoLink)) return res.status(400).send({ status: false, msg: "please provide valid logoLink" })

        let college=await collegeModel.findOne({name:data.name})
        if(college)return res.status(400).send({status:false,msg:"college already exist"})

        let creatcollege=await collegeModel.create(data)
        let collegedetails=creatcollege.toObject();

        ["_id","createdAt","isDeleted","__v","updatedAt"].forEach(x=>delete collegedetails[x])
        res.status(201).send({status:true,Data:collegedetails})
    }
    catch(err){
        res.status(500).send({status:false,msg:err.message})
    }
}

const getintern = async function (req, res) {
    try {
      let collagename = req.query
      if(!collagename.hasOwnProperty('name') || Object.keys(collagename).length>1){return res.status(400).send({status:false,msg:"enter valid query"})}
      collagename.isdeleted=false

      if(!collagename){return res.status(400).send({status:false,msg:"no query is present"})}
      let result = await collegeModel.findOne(collagename).select({name:1,fullName:1,logoLink:1})
     
      if (!result) {return res.status(404).send({ status: false, msg: "No collage found" }) }
      let allintern=await internModel.find({collegeId:result._id})
      if (!allintern) return res.status(200).send({ status: true, message: "No interns available for this college",Data:{name:result.name,fullName:result.fullName,logoLink:result.logoLink,intern:allintern}})
       
      res.status(200).send({status:true,Data:{name:result.name,fullName:result.fullName,logoLink:result.logoLink,intern:allintern}}) 


 } catch (err) {
      res.status(500).send({ msg: "Error", error: err.message })
    }
  }

 


module.exports={createcollege,getintern}
