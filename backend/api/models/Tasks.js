
module.exports={
    attributes:{
        createdBy:{model:'user', required: true},
        task:{type:'string', required:true},
        status:{type:'string', required:true},
        assignedToId:{model:'teams', required:true}
    }
}