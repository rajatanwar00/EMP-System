const jwt =require('jsonwebtoken');
module.exports={
    createToken:async function(user){
        try{
            const expiresIn=60*60*2;
            const token= await jwt.sign(user,'jwtTokenSecretKey',{expiresIn});
            return token;
        }
        catch(err){
            throw(err);
        }
        
    },
    decodeToken:async function(token){
        try{
            const verify= await  jwt.verify(token,'jwtTokenSecretKey');
            return verify;
        }
        catch(err){
            throw(err);
        }            
    }
}