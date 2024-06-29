module.exports=async function(req,res,proceed){
    const token=req.headers.token;
    const verify=await ChipherService.decodeToken(token);
    const findUser=await User.findOne({id:verify.uid});
    if(!findUser){
        return res.forbidden();
    }

    return proceed();
}