const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const jwt_decode = require('jwt-decode');
const cookieParser = require('cookie-parser')
const UserModel = require('./models/User')
const JobPostModel = require('./models/JobPost')
const StudentProfile = require('./models/StudentProfile.js')
const CompanyProfile = require('./models/CompanyProfile')
const ApplicationModel = require("./models/ApplicationModel")

const app = express()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000"],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}))
app.use(cookieParser())

const jwtSecretKey = 'secret-key';
app.set('jwtSecret', jwtSecretKey);

//middleware
const verifyUser = (req,res,next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json("Token is missing")
    } else {
        jwt.verify(token, "jwt-secret-key-for-se-project",(err, decoded) => {
            if(err){
                return res.json("Error with token")
            } else {
                if(decoded.role === "admin"){
                    next()
                } else {
                    return res.json("not admin")
                }
            }
        })
    }
}

const verifyStudent = (req,res,next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json("Token is missing")
    } else {
        jwt.verify(token, "jwt-secret-key-for-se-project",(err, decoded) => {
            if(err){
                return res.json("Error with token")
            } else {
                if(decoded.role === "student"){
                    next()
                } else {
                    return res.json("not admin")
                }
            }
        })
    }
}

const verifyEmployer = (req,res,next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json("Token is missing")
    } else {
        jwt.verify(token, "jwt-secret-key-for-se-project",(err, decoded) => {
            if(err){
                return res.json("Error with token")
            } else {
                if(decoded.role === "employer"){
                    next()
                } else {
                    return res.json("not admin")
                }
            }
        })
    }
}

app.get('/dash',verifyUser, (req, res) => {
    res.json("Success")
})

app.post('/register', (req, res) => {
    const {name, email, password,role} = req.body;
    bcrypt.hash(password, 10)
    .then(hash => {
        UserModel.create({name, email, password: hash,role })
        .then(user => res.json("success"))
        .catch(err => res.json(err))
    }).catch(err => res.json(err))
})

app.post('/login', (req,res) => {
    const {email, password} =req.body;
    UserModel.findOne({email:email})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, (err, response) => {
                if(response) {
                    const token = jwt.sign({email: user.email, role: user.role},"jwt-secret-key-for-se-project",{expiresIn: '1d'})
                        res.cookie('token', token)
                        return res.json({status: "success",token:token, role: user.role, id:user._id})
                }else{
                    return res.json({status: "not found"})
                }
            })
        } else{
            return res.json({status:"error"})
        }
    })
    .catch(err => res.json({status:"error"}))
})

// app.get('/user/emp', (req,res) => {
//     const token = req.body.token;

//     try{
//         const decodedToken = jwt.verify(token, 'secret-key');
//         const userId = decodedToken.id;

//         res.json({userId})
//     } catch(error){
//         console.log(error);
//         res.status(500).json({error: "Token verification failed"})
//     }
// })

// app.post('/userid', async (req,res) => {
//     const tokenMail = req.body;
//     console.log(tokenMail)
//     // return res.json({tokenMail})
//     const decodedTokenMail = jwt_decode(tokenMail, "jwt-secret-key-for-se-project");
//     const email = decodedTokenMail.email

//     const user = await UserModel.findOne({email: email})
//     if(user){
//         console.log(user._id)
//         res.json({userId:user._id});
//     }else{
//         res.status(404).json({error:"user not found"});
//     }
// })

app.post('/job-posts', (req, res) => {
      const jobData = req.body.formData;
      const id = req.body.id;
      const newJobListing = new JobPostModel({
        ...jobData,
        employer: id, 
      });
  
      newJobListing.save()
        .then((jobListing) => {
            console.log("success for jobpost")
            res.status(201).json("success"); // Return the created job listing as JSON
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: 'Failed to create job listing' });
        });
  });

app.post('/student-profiles', (req, res) => {
    const studentData = req.body.formData;
    const newStudentListing = new StudentProfile({
        ...studentData,
        sid: req.body.sid 
    });
    newStudentListing.save()
    .then((jobListing) => {
        console.log("success for jobpost")
        res.status(201).json("success"); 
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to create job listing' });
    });
})

app.put('/student-profiles', async (req, res) => {
    try {
        const id = req.body.id;
        const ProfileData = req.body.formData;

        const updatedStudentProfile = await StudentProfile.findOneAndUpdate(
            {sid:id},
            { $set: ProfileData },
            { new: true }
        );

        if (!updatedStudentProfile) {
            return res.status(404).json({ message: 'Company profile not found' });
        }
        console.log("prof updated")
        res.status(200).json("success");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

app.get('/get-students', async (request,response) => {
    try{
        const profiles = await StudentProfile.find({});
        console.log("success")
        return response.status(200).json({
            count:profiles.length,
            data:profiles
        });

    } catch (err) {
        console.log("error occured");
        response.status(500).send({message: err.message})
    }
})

app.post("/getpostbyid", async (req, res) => {
    try {
        const { id } = req.body;
        const results = await JobPostModel.find({ employer: id });
        // console.log(results);
        res.json({results:results});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post("/employerposts", async (req,res) => {
    try {
        const {id} = req.body;
        const jobPosts = await JobPostModel.find({ employer: id });
        // console.log(jobPosts)
        return res.json({results:jobPosts});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

app.post('/company-profile', (req, res) => {
        const compProfileData = req.body.formData;
        const id = req.body.id;
        const newCompanyProfile = new CompanyProfile({
          ...compProfileData,
          employer: id, 
        });
    
        newCompanyProfile.save()
          .then((CompanyProfile) => {
              console.log("company profile successfully created")
              res.status(201).json("success"); 
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Failed to create job listing' });
          });
})

app.get('/company-profile/:id', async (request,response) => {
    try {
        const {id} = request.params;
        console.log(id);
        const res = await CompanyProfile.find({ employer: id });
        console.log("res")
        return response.json({results:res});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

// app.put('/company-profile', async (req, res) => {
//     const id = req.body.id;
//     const result = await CompanyProfile.findByIdAndUpdate(id, req.body.formData)
//       .then((result) => {
//           console.log("company profile successfully updated")
//           res.status(201).json("success"); 
//       })
//       .catch((err) => {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to create job listing' });
//       });
// })

app.put('/company-profile', async (req, res) => {
    try {
        const id = req.body.id;
        const compProfileData = req.body.formData;

        const updatedCompanyProfile = await CompanyProfile.findOneAndUpdate(
            {employer:id},
            { $set: compProfileData },
            { new: true }
        );

        if (!updatedCompanyProfile) {
            return res.status(404).json({ message: 'Company profile not found' });
        }
        console.log("prof updated")
        res.status(200).json("success");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

app.get('/getdrives', async (request,response) => {
    try{
        const jobdrives = await JobPostModel.find({});
        return response.status(200).json({
            count:jobdrives.length,
            data:jobdrives
        });
    } catch (err) {
        console.log("error occured");
        response.status(500).send({message: err.message})
    }
})

app.post('/apply',async (req,res) => {
    try{
        const { student, jobPost, employer } = req.body;
        const application = new ApplicationModel({
            student,
            jobPost,
            employer,
          });
          await application.save();

          res.status(201).json({ message: 'Application submitted successfully' });
    }catch(e){
        console.log("error:",e.message);
    }
})

app.get('/getapplications', async(req,res) => {
    const applications = await ApplicationModel.find({});
    return res.json({data:applications})
})

app.post('/getappliedstudents', async(req,res)=>{
    try {
        const { id } = req.body;
        const results = await ApplicationModel.find({ employer: id });
        res.json({results,count:results.length});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.post('/studentsBySid', async (req, res) => {
    try {
      const { uniqueSids } = req.body;
      if (!Array.isArray(uniqueSids) || uniqueSids.length === 0) {
        return res.status(400).json({ error: 'Invalid input' });
      }
  
      const students = await StudentProfile.find({ sid : { $in: uniqueSids }});
      console.log("fetching students")
      res.json(students);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.delete('/employerposts/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const result = await JobPostModel.findByIdAndDelete(id);
        if(!result){
         return response.status(404).json({ message: 'Post not found' })
        }
        console.log("deleted")
         return response.status(200).send({message: 'Post deleted successfully '})
    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message });
    }
  })

mongoose.connect('mongodb+srv://projectUser:am5aO9ZmARgahc8E@cluster0.jexbo2j.mongodb.net/employee?retryWrites=true&w=majority')
.then(() => {
    console.log('database connected')
    app.listen(5001,() => {
        console.log("server is running")
    })
})
.catch((e) => {
    console.log(e)
})


