const User = require('../models/user');
const BigPromise = require('../middlewares/BigPromise');
const CustomError = require('../utils/CustomError');
const cookieToken = require('../utils/cookieToken');
const fileupload = require('express-fileupload');
const cloudinary = require('cloudinary');
const mailHelper = require('../utils/emailHelper');
const crypto = require('crypto');

exports.signup = BigPromise(async (req, res, next) => {
    const {name, email, password, mobile} = req.body

    if(!email || !name || !password) {
        return next(new CustomError('name ,email and password are required', 400));
    }

    const user = await User.create({
        name,
        email,
        password,
        mobile
    })

   cookieToken(user, res);


});


exports.login = BigPromise(async (req, res, next) => {
    const {email, password} = req.body

    //check for presence of email and password 
    if (!email || !password) {
        return next(new CustomError('Please provide email and password', 400))
    }


    //get user from DB
    const user = await User.findOne({email}).select("+password")

    //if user not found in DB
    if (!user) {
        return next(new CustomError('Email or password does not match or exists', 400))

    }

    //match the password
    const isPasswordCorrect = await user.isValidatedPassword(password)


    //if password do not match 
    if (!isPasswordCorrect) {
        return next(new CustomError('Email or password does not match or exists', 400))

    }

    //if all goes good and we send the token
    cookieToken(user, res);
})


exports.logout = BigPromise(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logout success",
    });
});


exports.forgotPassword = BigPromise(async (req, res, next) => {
   const {email} = req.body


   const user = await User.findOne({email })

   if (!user) {
       return next(new CustomError('email not found as registered', 400))
   }

   const forgotToken = user.getForgetPasswordToken()

   await user.save({validateBeforeSave: false})


   const myUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${forgotToken}`

   const message = `Copy paste this link in your URL and hit enter \n\n ${myUrl}`

   try {
       await mailHelper({
           email: user.email,
            subject: "Metroghar- Password reset email ",
            message
       });
       res.status(200).json({
           success: true,
           message: "email sent successfully"
       });
   } catch (error) { //very important and tricky part
       user.forgotPasswordToken = undefined;
       user.forgotPasswordExpiry = undefined;

       await user.save({validateBeforeSave: false})

       return next(new CustomError(error.message, 500))
   }
});


exports.passwordReset = BigPromise(async (req, res, next) => {
   const token = req.params.token


   const encryToken = crypto.createHash('sha256').update(token).digest('hex');


   const user = await User.findOne({
       encryToken,
    //    forgotPasswordExpiry: {$gt: Date.now()}
    })

    if (!user) {
        return next(new CustomError('Token is invalid or expired', 400))
    }

    if (req.body.password !== req.body.confirmpassword) {
        return next(new CustomError('Password and confirmpassword do not match', 400))
    }

    user.password = req.body.password;

    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save();

    // send a JSON response OR send Token

 });