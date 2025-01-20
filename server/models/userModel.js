import mongoose from "mongoose";

//To store user data in mongoDB database

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    verifyOtp: {type: String, default: ''},
    verifyOtpExpireAt: {type: Number, default: 0},
    isAccountVerified: {type: Boolean, default: false},
    resetOtp: {type: String, default: ''},
    resetOtpExpireAt: {type: Number, default: 0},
})

const userModel = mongoose.models.user || mongoose.model('user', userSchema)
//if this userModel is available this userModel will use first option, if this's not available then it will creat this user model using userSchema.

export default userModel;