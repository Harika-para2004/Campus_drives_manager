// const mongoose = require('mongoose');

// const ApplicationSchema = new mongoose.Schema({
//   studentsArray: [String],
//   employer: String,
//   selected:Boolean,
// });

// const ApplicationModel = mongoose.model('ApplicationModel', ApplicationSchema);
// module.exports = ApplicationModel;


const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
  jobPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPost', 
  },
  employer:String,
  status: String,
  applicationDate: {
    type: Date,
    default: Date.now,
  },
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);
module.exports = JobApplication;
