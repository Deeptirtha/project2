const collegeModel = require("../model/collagemodel")
const interModel = require("../model/internmodel")
const { validName, validEmail, validMobile } = require("../validation/valid")


const createIntern = async (req, res) => {

    try {
        let data = req.body
        if (Object.keys(data) == 0) { return res.status(400).send({ status: false, msg: "body is empty can not creat any thing" }) }

        let newarr = ["name", "email", "mobile", "collegeName"]
        for (field of newarr) {
            if (!data[field]) return res.status(400).send({ status: false, msg: `${field} is empty input valid Data ` })
        }

        data.name = req.body.name.trim()
        data.collegeName = req.body.collegeName.trim()
        data.email = req.body.email.trim()
        data.mobile = req.body.mobile.trim()

        if (validName.test(data.collegeName) || !data.collegeName) return res.status(400).send({ status: false, message: "please provide valid collegename" })
        if (validName.test(data.name) || !data.name) return res.status(400).send({ status: false, message: "please provide valid name" })
        if (!validEmail.test(data.email) || !data.email) return res.status(400).send({ status: false, message: "please provide valid Email" })
        if (!validMobile.test(data.mobile) || !data.mobile) return res.status(400).send({ status: false, message: "please provide valid Mobilenumber" })

        let collegeId = await collegeModel.findOne({ name: data.collegeName ,isDeleted:false}).select({ _id: 1 })
        if (!collegeId) return res.status(404).send({ status: false, message: "No college found with this name" })

        data.collegeId = collegeId._id;

        let students = await interModel.findOne({ $or: [{ email: data.email }, { mobile: data.mobile }] });
        if (students) return res.status(400).send({ status: false, message: "Email or Mobile No already exist try different" })
        delete data.collegeName

        let intern = await interModel.create(data)
        let InterData = intern.toObject();

        ["_id", "__v"].forEach(x => delete InterData[x])
        res.status(201).send({ status: true, Data: InterData })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}
module.exports = createIntern