//In req.body there's userId. 
//this userId is from token, and the token is in cookies.
//Here, we will create function that will find the token (to find the userId) from cookies.
 
import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next)=>{
    const {token} = req.cookies; //get token from cookies

    if(!token){
        return res.json({success:false, message:'Not Authorized. Login Again'});
    }
    try {

        //decode the token
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        //find id
        if(tokenDecode.id){
            req.body.userId = tokenDecode.id
        } else {
            return res.json({success:false, message:'Not Authorized. Login Again'});
        }

        next(); //then using 'next' function, it will call and execute controller functions.

    } catch(error) {
        res.json({success:false, message:error.message});
    }
}

export default userAuth;