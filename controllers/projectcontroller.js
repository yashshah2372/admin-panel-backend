const Project = require('../models/project');
const Floorplan = require('../models/floorplan');
const BigPromise = require('../middlewares/BigPromise');
const CustomError = require('../utils/CustomError');
const cloudinary = require("cloudinary");
const WhereClause = require('../utils/whereClause');
const floorplan = require('../models/floorplan');
const upload = require("express-fileupload");
const AWS = require("aws-sdk");
require("dotenv").config();


const express = require('express')
const app = express();
const PORT= process.env.PORT || 3000;
app.use(upload());
app.use(express.json());

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // your AWS access id
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // your AWS access key
  });

  async function uploadFile(file,folderName) {
      const params = {
        Bucket: process.env.AWS_BUCKET, // bucket you want to upload to
        Key: `${folderName}/-${Date.now()}.png`, // put all image to fileupload folder with name scanskill-${Date.now()}${file.name}`
        Body: file.data,
        ACL: "public-read",
      };
      const data = await s3.upload(params).promise();
      return data.Location; // returns the url location
    }




exports.addProject = BigPromise(async(req, res, next) => {
    //externalimages

    let externalimageArray =[]
    let internalimageArray =[]
    let amenitiesimageArray =[]
    let othersimageArray =[]


    if(!req.files){
        return next(new CustomError('iamges are required', 401))
    }

    if(req.files) {
        //instead of photos use builderimage,product image,etc
        for(let index = 0; index< req.files.externalimages.length; index++){
            let result = await uploadFile(req.files.externalimages[index],"externalimages")
            
            externalimageArray.push({
                // id: result.public_id,
                secure_url: result,
            });
        }

        for(let index = 0; index< req.files.internalimages.length; index++){
            let result = await uploadFile(req.files.internalimages[index],"internalimages")
            
            internalimageArray.push({
                // id: result.public_id,
                secure_url: result,
            });
        }

        for(let index = 0; index< req.files.amenitiesimages.length; index++){
            let result = await uploadFile(req.files.amenitiesimages[index],"amenitiesimages")
            
            amenitiesimageArray.push({
                // id: result.public_id,
                secure_url: result,
            });
        }

        //others image
        for(let index = 0; index< req.files.othersimages.length; index++){
            let result = await uploadFile(req.files.othersimages[index],"othersimages")
            
            othersimageArray.push({
                // id: result.public_id,
                secure_url: result,
            });
        }
    };
//-------HANDLE SINGLE IMAGE HERE -------
result = await uploadFile(req.files.builderimage,"project");
const obj2 = {
    id: result.public_id,
    secure_url: result,
}
req.body.builderimage = obj2;

result = await uploadFile(req.files.ccimage,"project");
const obj3 = {
    id: result.public_id,
    secure_url: result,
}
req.body.ccimage = obj3;


result = await uploadFile(req.files.ocimage,"project");
const obj4 = {
    id: result.public_id,
    secure_url: result,
}
req.body.ocimage = obj4;


//---NO NEED-----
// let floorplanarray = []

// const obj5 = {
//     id: req.body.floorplan
// }

// floorplanarray.push({obj5});

// req.body.floorplan = floorplanarray;




        //---

    req.body.externalimages = externalimageArray
    req.body.internalimages = internalimageArray
    req.body.amenitiesimages = amenitiesimageArray
    req.body.othersimages = othersimageArray
    // // req.body.user = req.user.id


    

    //----ISSUE WITH FLOORPLAN FIELD -------
    //------NOW I HAVE TO GET ID FROM obj AND PUSH INTO THIS floorplanarray ---------
    // -----AND THEN I HAVE TO OVERWRITE req.body.floorplan = floorplanarray ------
    // ----data in atlas should be whole object---
    //-- mapping both table --


    // const obj = await Floorplan.find();
    
    // let floorplanarray = [obj.map((abc) => abc['_id'])];
         
    // req.body.floorplan = floorplanarray;
    // console.log(floorplanarray);

    // for(let i=0;i<obj.length;i++){
    //     floorplanarray.push(obj[i]['_id'])
    // }
    
    
    //console.log(req.body.floorplan)
    // console.log(obj[0]['_id']);
    // console.log(public_id);

    // -SAVING OTHER DATA FIELDS IN Project COLLECTION-----
    const project = await Project.create(req.body);
    
    res.status(200).json({
        success: true,
        project
    });

});

exports.getAllProject = BigPromise(async(req, res, next) =>{

    const resultPerPage = 10;
    const totalcountProject = await Project.countDocuments();


    const projectsObj = new WhereClause(Project.find(), req.query).search().filter();

    let projects = await projectsObj.base;

    const filteredProjectNumber = projects.length

    //projects.limit().skip()

    projectsObj.pager(resultPerPage);
    projects = await projectsObj.base.clone();

    res.status(200).json({
        success: true,
        projects,
        filteredProjectNumber,
        totalcountProject
    })





})

// function getFloorplanById(id) {
//     const result = Floorplan.findById(id);
//     return result;
// }

exports.getProjectById = (req, res, next, id) => {
    
    Project.findById(id)
      .exec((err, project) => {
        if (err) {
          return res.status(400).json({
            error: "Project not found"
          });
        }
        
        req.project = project;
        next();
      });
  };


  exports.getProject = (req, res) =>{
    // req.product.photo =undefined //photo will be loaded in background
    return res.json(req.project)
  }

  exports.getFloorplanById = (id) => {
    Floorplan.findById(id)
      .exec((err, floorplan) => {
        if (err) {
          return res.status(400).json({
            error: "floorplan not found"
          });
        }
        req.floorplan = floorplan;
        //next();
      });
  };
  exports.getFloorplan = (req, res) =>{
    // req.product.photo =undefined //photo will be loaded in background
    return res.json(req.floorplan)
  };





//-------------------JUST FOR FUTURE REFERENCE ------------
//just trying to link two schemas : project and floorplan
//this code is currently not working
// exports.addFloorPlan = BigPromise(async(req,res)=>{

//     //console.log(JSON.stringify(req.body.floorplan));
//     //JSON.stringify(req.body.floorplan);
//     const toInsert = req.body.floorplan;
//     const newFloorPlan = await Floorplan.save();

// //     const shop = new Shop(req.body);
// // shop.save()

//     const id = newFloorPlan._id;
//     const pid = req.body.pid;

            
//               const query = await project.findByIdAndUpdate(
//                 { _id: pid},
//                 { $push: { floorplan: id } },
//                 { new: true }
//               );
//               return res.status(201).json("OK");
            
      
    

// });
