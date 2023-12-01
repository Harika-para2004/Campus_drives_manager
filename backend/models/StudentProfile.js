const mongoose = require('mongoose')

const StudentProfileSchema = new mongoose.Schema({
sid:String,
studentId: String,
name: String,
email: String,
branch: String,
year: Number,
skills: [{
    label:String,
    value:String
}],
jobPreferences: [{
    label:String,
    value:String
}],
profilePic: String,
dob:String,
gender:String,
grade:String,
})
const StudentProfile = mongoose.model("StudentProfile",StudentProfileSchema)
module.exports = StudentProfile