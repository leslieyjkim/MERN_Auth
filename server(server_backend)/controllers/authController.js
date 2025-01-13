//All the controllers for 'register, login, logout, verify account, password reset' 

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

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
        })
        
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}