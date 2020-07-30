const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const candidateSchema = new Schema({
    fullname : String,
    email : String,
    resume :String
})

const Candata = mongoose.model('candata',candidateSchema,'candatas');
module.exports = Candata;