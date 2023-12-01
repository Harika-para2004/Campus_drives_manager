const mongoose = require('mongoose')

const JobPostSchema = new mongoose.Schema({
    jobTitle: String,
    jobType: String,
    jobLocation: String,
    jobDescription: String,
    qualifications: String,
    skillsRequired: [{
        label:String,
        value:String
    }],
    salaryRange: Number,
    applicationDeadline: String,
    //applicationInstructions: String,
    jobPostingDate: String,
    jobExpirationDate: String,
    openPositions: Number,
    companyContact: String,
    benefits: String,
    remoteWorkOption: Boolean,
    // applied:{
    //     type:String,
    //     default:"not applied",
    // },
    employer:String
})

const JobPostModel = mongoose.model("JobPost",JobPostSchema)
module.exports = JobPostModel