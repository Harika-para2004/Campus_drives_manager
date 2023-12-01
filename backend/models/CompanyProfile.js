const mongoose = require('mongoose')

const CompanyProfileSchema = new mongoose.Schema({
    companyName: String,
    companyLogo: String,
    location: String,
    website: String,
    // applicationForm:String,
    email: String,
    contactInfo: String,
    employer:String,
})
const CompanyProfile = mongoose.model("CompanyProfile",CompanyProfileSchema)
module.exports = CompanyProfile
