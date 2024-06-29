module.exports=async function(req,res,proceed){
    console.log("At policies");
    const token=req.headers.token;
    const verify=await ChipherService.decodeToken(token);
    if(verify.usertype=='admin'){
        return proceed();
    }

    return res.forbidden();
};