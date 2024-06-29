module.exports=async function(req,res,proceed){
    const token=req.headers.token;
    const verify=await ChipherService.decodeToken(token);
    const userObject=await User.find({id:verify.uid});
    const taskid=req.params.taskId;
    const taskObject=await Tasks.find({id:taskid});
    if(taskObject.assignedToId==userObject.team){
        return proceed();
    }
    return res.forbidden();
}