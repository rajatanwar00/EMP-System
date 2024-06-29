
module.exports={
    attributes:{
        name:{type:'string', required: true},
        manager:{model:"user", required: true},
        
    }
}