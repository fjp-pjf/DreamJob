const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const jobSchema = new Schema({
    jobId : Number,
    jobName : String,
    jobCompany:String,
    jobSalary:String,
    jobDate : String,
    jobDescription : String
})

const Job = mongoose.model('job',jobSchema,'jobs');
module.exports = Job;