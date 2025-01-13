import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";

import connectDB from './config/mongodb.js'


const app = express(); //Created express app.
const port = process.env.PORT || 4000

connectDB();

app.use(express.json()); //All the request will be passed using json
app.use(cookieParser());
app.use(cors({credentials: true}))  //we can send the cookies in the response from the express app

app.get('/', (req, res)=> res.send("API Working")); //after this line, restart the server part terminal, then you can see the 'API Working'.

app.listen(port, () => console.log(`Server started on PORT:${port}`));
//open the server terminal -> node server.js 
//then you can see 'Server started on PORT:4000' 
//open the webbrowser -> localhost:4000
//then you can see 'Cannot GET /'


