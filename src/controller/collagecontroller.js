const collegeModel = require("../model/collagemodel")
const internModel = require("../model/internmodel")
const { validName, validUrl } = require("../validation/valid")

const createcollege = async (req, res) => {

    try {
        let data = req.body
        if (Object.keys(data) == 0) { return res.status(400).send({ status: false, msg: "body is empty can not creat any thing" }) }

        let newarr = ["name", "fullName", "logoLink"]
        for (field of newarr) { if (!data[field]) return res.status(400).send({ status: false, msg: `${field} is empty input valid data` }) }

        data.name = req.body.name.trim()
        data.fullName = req.body.fullName.trim()
        data.logoLink = req.body.logoLink.trim()

        if (validName.test(data.name) || !data.name) return res.status(400).send({ status: false, msg: "please provide valid name " })
        if (validName.test(data.fullName) || !data.fullName) return res.status(400).send({ status: false, msg: "please provide valid fullName" })
        if (!validUrl.test(data.logoLink)) return res.status(400).send({ status: false, msg: "please provide valid logoLink" })

        let college = await collegeModel.findOne({ name: data.name })
        if (college) return res.status(400).send({ status: false, msg: "college already exist" })

        let creatcollege = await collegeModel.create(data)
        let collegedetails = creatcollege.toObject();

        ["_id", "createdAt", "__v", "updatedAt"].forEach(x => delete collegedetails[x])
        res.status(201).send({ status: true, Data: collegedetails })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

const getintern = async function (req, res) {
    try {
        let college = req.query
       
        if (!college.hasOwnProperty('collegeName') || Object.keys(college).length > 1) { return res.status(400).send({ status: false, msg: "enter valid query" }) }
       
        let result = await collegeModel.findOne({name:college.collegeName,isDeleted:false}).select({ name: 1, fullName: 1, logoLink: 1 }).lean()
        if (!result) { return res.status(404).send({ status: false, msg: "No collage found" }) }
        let allintern = await internModel.find({ collegeId: result._id, isdeleted: false }).select({ name: 1, email: 1, mobile: 1 })
        if (allintern.length < 1) return res.status(200).send({ status: true, msg: "No Intern from this college ", Data: { name: result.name, fullName: result.fullName, logoLink: result.logoLink, intern: allintern } })
        result.interns = allintern
        res.status(200).send({ status: true, Data: result })
    } catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

module.exports = { createcollege, getintern }
