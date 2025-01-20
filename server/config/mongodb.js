import mongoose from "mongoose";

const connectDB = async ()=>{

    mongoose.connection.on('connected', ()=>console.log("Database Connected"));

    await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`); //in MongoDB website, on cluster0, the project folder name assigned as 'mern-auth'.
};

export default connectDB;