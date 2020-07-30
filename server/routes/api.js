const express = require('express');
const multer = require('multer');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const User = require('../models/user');
const Job = require('../models/job');
const Candata = require('../models/candata');



router.get('/',(req,res)=>{
    res.send("hello from api route")
})

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "application/pdf":"pdf"
};
  
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid mime type");
      if (isValid) {
        error = null;
      }
      cb(error, "./resumes");
    },
    filename: (req, file, cb) => {
      const name = file.originalname
        .toLowerCase()
        .split(" ")
        .join("-");
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + "-" + Date.now() + "." + ext);
    }
});

// function verifyToken(req,res,next){
//     if(!req.headers.authorization){
//     return res.status(401).send('Unauthorized request')
//  }
//     let token = req.headers.authorization.split(' ')[1]
//     if(token === 'null'){
//         return res.status(401).send('Unauthorized request')
//     }
//     let payload = jwt.verify(token,'secretkey')
//     if(!payload){
//      return res.status(401).send('Unauthorized request')
//     }
//     req.userId = payload.subject
//     next()
//  }

router.post('/register',(req,res)=>{
    let userData = req.body
    let user = new User(userData)
    user.save((err,registeredUser)=>{
        if(err){
            console.log(err)
        }else{
            let payload = { subject:registeredUser._id}
            let token = jwt.sign(payload,'secretkey')
            res.status(200).send({token})
        }
    })
})//register form

router.post('/login',(req,res)=>{
    let userData = req.body
    User.findOne({email:userData.email},(err,user)=>{
        if(err){
            console.log(err)
        }else{
            if(!user){
                res.status(401).send('Invalid email')
            }else
                if(user.password !== userData.password){
                    res.status(401).send('Invalid password')
                }else{
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload,'secretkey')
                    res.status(200).send({token})
                }
        }
    })
})//login form

router.post('/admin',(req,res)=>{
    console.log('entered')
    let adminData= req.body
    if(req.body.username=="admin" && req.body.password=="12345"){
        // console.log("admin")
        let payload = { subject: adminData }
        let token = jwt.sign(payload,'secretKey')
        return res.status(200).send({token,userType:'admin'})
    }
    else{
        return res.status(401).send('Unauthorized Request')
    }
})

router.get('/jobs',(req, res, next)=>{
    Job.find()
    .then((jobs)=>{
        console.log(jobs);
        res.send(jobs);
    })
});//get all products

router.post('/insert',(req,res)=>{
    console.log(req.body);
    var job = {
        jobId : req.body.job.jobId,
        jobName : req.body.job.jobName,
        jobCompany:req.body.job.jobCompany,
        jobSalary : req.body.job.jobSalary,
        jobDate : req.body.job.jobDate,
        jobDescription : req.body.job.jobDescription
    }
    var job = new Job(job);
    job.save();
});//add job

//edit (p)
router.get('/read/:id',(req,res)=>{
    const id = req.params.id;
    Job.findOne({_id:id})
    .then((job)=>{
        console.log(job);
        res.send(job);
    })
})

router.get('/singleJob/:pid',(req,res)=>{
    let pid = req.params.pid;
    console.log(pid,typeof pid,pid.length);
    Job.findById(pid)
    .then((job)=>{
      console.log('single job found',job);
      res.status(200).json({job});
    //   res.send(job);
    })
})//get single job

router.put('/update',(req,res)=>{
    console.log(req.body);
    let pid = req.body.pid;
    //let pid = req.params.pid;
    var job = {
        jobId : req.body.job.jobId,
        jobName : req.body.job.jobName,
        jobCompany:req.body.job.jobCompany,
        jobSalary : req.body.job.jobSalary,
        jobDate : req.body.job.jobDate,
        jobDescription : req.body.job.jobDescription
    }
    Job.findByIdAndUpdate(pid,job)
    .then((job)=>{
        job.save()
        console.log('Updated successfully')
    })
    .catch((err)=>{
        console.log("Error is: ",err)
    })
});//edit product

router.delete('/jobs/:id',(req, res) => {
    Job.findByIdAndRemove(req.params.id)
    .then(()=>{
        console.log('Deleted')
    })
    .catch((err)=>{
        console.log('Error is: ',err)
    })
})//delete product

router.post('/apply',multer({ storage: storage }).single("resume"),(req, res)=>{
    const url = req.protocol + "://" + req.get("host");
    //let userData = req.body
    console.log("inside post router.");
   console.log(req.body);
    var candata = {
       fullname: req.body.fullname,
       email: req.body.email,
       resume: url + "/resumes/" + req.file.filename
   }
  var candata = new Candata(candata);
  candata.save().then((ress)=>{
    console.log('profile added successfully',ress);
    res.status(200).send({message:'sheldon cooper&penny'})
  })
  .catch((err)=>{
      console.log('error adding profile',err);
  });
});//get all products
  


module.exports = router;