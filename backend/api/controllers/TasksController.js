const dayjs=require('dayjs');
module.exports={
    async find(req, res){        
        var {task,status,teamname,cid:CI,ced:CE,uid:UI,ued:UE,limit,pageno,userType}=req.query;
        const user=await User.findOne({id:req.user.id}).populate("team");

        const filter = {};
        if(userType=='admin'){
          filter.createdBy=req.user.id
        }
        else{
          filter.assignedToId=user.team.id;
        }
        try{          
            if(task)filter.task={contains:task}
            if(status)filter.status={contains:status}
            if(teamname){
              const teamObject=await Teams.findOne({name:teamname})
              const teamId=teamObject.id;
              filter.assignedToId=teamId;
            }
            if(CI&&CE){
              filter.createdAt={'>=':dayjs(CI).startOf('days').toDate(),"<=":dayjs(CE).endOf('days').toDate()}
            }
            if(UI&&UE){
              filter.updatedAt={'>=':dayjs(UI).startOf('days').toDate(),"<=":dayjs(UE).endOf('days').toDate()}
            }

            if(limit>3){
              limit=3;
            }
            
            if(limit)
            var totalRecords= await Tasks.count(filter).meta({makeLikeModifierCaseInsensitive: true});

            var skip;
            if(limit){skip=(Number(pageno)-1)*limit;}
          
            var taskslist=[];
          
            if(limit){
                console.log(filter);
                taskslist= await Tasks.find(filter).populate('assignedToId').meta({makeLikeModifierCaseInsensitive: true}).limit(limit).skip(skip);
            }
                
            else{
              var ri=dayjs(UI).startOf('days').toDate();
              var re=dayjs(UE).endOf('days').toDate();
              console.log(ri,re);
              var db=Tasks.getDatastore().manager;
              taskslist=await db.collection('tasks').aggregate([ 
                {
                  $match:{
                    updatedAt:{$gte:ri,$lte:re}
                  },
                },             
                {
                                    
                  $group:{
                    _id:{updatedAt:{$substr:[{$dateToString:{date:"$updatedAt"}},0,10]},team:"$assignedToId"},

                    pending:{$sum:{$cond:{if:{$eq:['$status',"Pending"]},then:1.0,else:0.0}}},
                    done:{$sum:{$cond:{if:{$eq:['$status',"Done"]},then:1.0,else:0.0}}},
                    cmpltd:{$sum:{$cond:{if:{$eq:['$status',"Completed"]},then:1.0,else:0.0}}},
                  }
                },
                {
                  $lookup:{
                    from: "teams",
                    localField: "_id.team",
                    foreignField: "_id",
                    as: "team"
                  }
                },
                {
                  $unwind:{
                    path: "$team"
                  }
                },
                {
                  $project:{
                    "_id.team":0,"team.manager":0,"team.createdAt":0,"team.updatedAt":0
                  }
                }
              ]).toArray();
            }  
            
            if(limit){
              const tasksobject={
                taskslist:taskslist,
                totalRecords
              };
              
              res.json(tasksobject);
            }
            else{
              res.json(taskslist);
            }
            
         }
        catch(err){
            res.serverError(err);
        }
      },

      async notesp(req,res){
        try{
            if(req.user.usertype!='admin'){
              return res.status(401).json('Unauthorised');
            }
            const finalpost=await TasksController.post(req.user.id,req.body);
            res.json(finalpost);
        }
        catch(err){
            res.serverError(err);
        }
      },
    
    async post(userid,userpost){
        try{
            const assignedteam=await Teams.findOne({id:userpost.assignedToId});
            if(!assignedteam){
                return new Error('No such team exists');
            }
            const taskobject={
                createdBy:userid,
                task:userpost.task,
                status:"Pending",
                assignedToId:userpost.assignedToId
            }
            const finalpost=await Tasks.create(taskobject).fetch();
            return finalpost;
        }
        catch(err){
            throw err;
        }
    }
}