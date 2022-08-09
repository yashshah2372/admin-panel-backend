const BigPromise = require('../middlewares/BigPromise');
const Floorplan = require('../models/floorplan');
const CustomError = require('../utils/CustomError');
const cloudinary = require("cloudinary");



exports.addFloorplan = BigPromise(async(req, res, next) => {

    //declaring variable
    


    if(!req.files){
        return next(new CustomError('iamges are required', 401))
    }
    let result;
    if(req.files){
        
        ////---IMAGES ARE BEING UPLOADED -----------
         result = await cloudinary.v2.uploader.upload(req.files.floorimage.tempFilePath, {
            folder: "floorplan",
            
        });
    }

        const { floortype, carpetarea, pricepersqft, totalprice } = req.body;

        if(!floortype || !carpetarea || !pricepersqft || !totalprice) {
            return next(new CustomError("all fileds are required", 400));
        }


        const floorplan = await Floorplan.create({
            floortype,
            carpetarea,
            pricepersqft,
            totalprice,
            floorimage: {
                id: result.public_id,
                secure_url: result.secure_url,
            },
        });



        // req.body.floorimage = result;

        // const floorplan = await Floorplan.create(req.body)

        console.log(floorplan);
        res.status(200).json({
            success: true,
            floorplan
        });

})