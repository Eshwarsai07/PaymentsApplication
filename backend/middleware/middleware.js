const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function authMiddleware(req,res,next){

    const token  = req.header('Authorization');
    console.log(token);
    if(!token || !token.startsWith('Bearer ')){
       return res.status(411).json({ msg : 'failed in bearer check'});
    }
    const actualToken = token.split(' ')[1];
     
    try{

        const decoded = jwt.verify(actualToken,JWT_SECRET);
        console.log(decoded);
        req.userId = decoded.userId;
        next();

    }catch(e){
        console.log(e);
        return res.status(411).json({ msg : 'failed to verify'});
    }
    
}

module.exports = {
    authMiddleware
}