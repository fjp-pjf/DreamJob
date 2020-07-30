const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const db = 'mongodb+srv://user_femin:femin4422@mycluster.vuxze.azure.mongodb.net/dreamjob?retryWrites=true&w=majority';

const PORT = 3000;
const api = require('./routes/api');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/resumes", express.static(path.join("./resumes")));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});
app.use('/api',api);


app.get('/',(req,res)=>{
    res.send("Hello from server");
})

mongoose.connect(db,(err)=>{
    if(err){
        console.error('error! '+err)
    }else{
        console.log('Connected to mongodb :)')
    }
});//connect to mongodb

app.listen(PORT,()=>{
    console.log(':) Server running on localhost ',PORT,':)');
})