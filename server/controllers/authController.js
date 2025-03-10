//All the controllers for 'register, login, logout, verify account, password reset' 

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from '../config/emailTemplates.js';

//Register
export const register = async (req, res)=>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.json({success: false, message: 'Missing Details'})
    }

    try {

        //before bcrypt password, we should check first this email is existing user or not. 
        const existingUser = await userModel.findOne({email})

        if(existingUser) {
            return res.json({success:false, message: "User already exists"}); 
        }

        const hashedPassword = await bcrypt.hash(password, 10); //if this is not existed user, the hashed password made here.

        const user = new userModel({name, email, password: hashedPassword});
        await user.save(); //Now, this new user will be stored in mongoDB

        //Next, we generate 1 token for authentication, and send this token using the cookies.
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', //As we already put 'development' in .env file, so this line would be false.
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days converted in miliseconds
        });

        //Sending Welcome Email
        //.env: sender's email should be same with the login email in Brevo
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to LesliePart',
            text: `Welcome to LesliePart website. Your account has been created with email id: ${email}`
        }

        await transporter.sendMail(mailOptions);

        return res.json({success:true}); //successfull registered. 
        
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}



//Login
export const login = async (req, res)=>{
    const {email, password} = req.body;

    //let's validate email & password
    if(!email || !password){
        return res.json({success:false, message: 'Email and Password are required'})
    }

    try {

        const user = await userModel.findOne({email}); //find the user w/ specific that email

        if(!user){
            return res.json({success:false, message: 'Invalid email'})
        }

        //check password 
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({success:false, message: 'Invalid password'})
        }

        //generate one token to login
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        //send this token in the response 
        res.cookie('token', token, { //cookie name is 'token', and value is token
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', //As we already put 'development' in .env file, so this line would be false.
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days converted in miliseconds for cookie
        });

        return res.json({success:true}); //user successfully logged in. 



    } catch (error) {
        return res.json({success:false, message: error.message})
    }
}



//Logout
export const logout = async (req, res)=>{
    try {

        res.clearCookie('token', {  //remove that name of token
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        return res.json({success:true, message: "Logged Out"})

    } catch (error) {
        return res.json({success:false, message: error.message})
    }
}



// Send Verification OTP to the User's Email
export const sendVerifyOtp = async (req, res)=>{
    try {

        const {userId} = req.body;

        const user = await userModel.findById(userId);

        if(user.isAccountVerified){
            return res.json({success:false, message: "Account Already Verified"})
        }
        //then if the account is not verified => generate one OTP will be sent to user's email
        const otp = String(Math.floor(100000 + Math.random() * 900000)); //generate 6 digits numbers and convert into string

        //save into database
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000   //added 1 day expired date
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            // text: `Your OTP is ${otp}. Verify your account using this OTP.`,
            html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        }
        await transporter.sendMail(mailOptions);

        res.json({success: true, message: 'Verification OTP Sent on Email'});

    } catch (error) {
        res.json({success: false, message: error.message})
    }
} 



//Verify the Email using the OTP 
export const verifyEmail = async (req, res)=>{
    const {userId, otp} = req.body;

    //need to check the userId/otp is available
    if(!userId || !otp) {
        return res.json({success:false, message: 'Missing Details'});      
    }
    try {
        //find user with userId
        const user = await userModel.findById(userId);

        if(!user) {
            return res.json({success:false, message:'User not found'});
        }

        if(user.verifyOtp === '' || user.verifyOtp !== otp) { //first:that user is stored in database, second:otp that is entered by user is not matching
            return res.json({success:false, message: 'Invalid OTP'});
        }
        //now the otp is valid, then we need to check the expiry date
        if(user.verifyOtpExpireAt < Date.now()) { //already expired
            return res.json({success:false, message: 'OTP Expired'});
        }
        //now the otp is not expired, then we need to verify user's account
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();
        return res.json({success:true, message:'Email verified successfully'});

    } catch (error) {
        return res.json({success:false, message: error.message});
    }
}


//Check if the user is authenticated or not.
export const isAuthenticated = async (req, res)=>{
    try {
        return res.json({success:true});

    } catch (error) {
        res.json({success:false, message: error.message});
    }
}


//Send Password Reset OTP
export const sendResetOtp = async (req, res)=>{
 //get the email 
    const {email} = req.body;

    if(!email){
        return res.json({success:false, message:'Email is required'})
    }

    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:'User not found'});
        }
        //now, suppose this user is available with this email ID,
        //then we will generate OTP, and  OTP will be saved in database
        const otp = String(Math.floor(100000 + Math.random() * 900000)); //generate 6 digits numbers and convert into string
        //save into database
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000  
        //save the user
        await user.save();
        //send the email including OTP
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            // text: `Your OTP for resetting your password is ${otp}. Use this OTP to proceed with resetting your password.`,
            //We have to replace the {otp} and {email} in the emailTemplates.js, into actual values.
            html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        };

        await transporter.sendMail(mailOptions);

        return res.json({success:true, message: 'OTP sent to your email'});


    } catch (error) {
        return res.json({success:false, message: error.message})
    }
}



//Reset User Password
//how the OTP is being stored, retrieved, or validated.
export const resetPassword = async (req, res)=>{
    const {email, otp, newPassword} = req.body;

    if(!email || !otp || !newPassword){
        return res.json({success:false, message:'Email, OTP, and new password are required'});    
    }

    try {

        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:'User not found'});
        }
        //then, now if the user was found -> then we check the opt belong to that user 
        if(user.resetOtp === "" || user.resetOtp !== otp){ //if the otp is empty or if the otp provided from user is different with otp was stored in database.
            return res.json({success:false, message:'Invalid OTP'});
        }
        //Now, if the opt is matching, then we gotta check expiry date.
        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success:false, message:'OTP Expired'});
        }
        //Now, here we know the OTP is valid. Update user's password and store the new password. 
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.json({success:true, message: 'Password has been reset successfully'});
    
    } catch(error) {
        return res.json({success:false, message:error.message});
    }
}