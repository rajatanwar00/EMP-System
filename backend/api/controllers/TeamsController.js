
module.exports={
    async create(req,res){
        try{            
            if(req.user.usertype=='admin'){
                const manager=await User.findOne({username:req.body.manager});
                const teamObject={
                    name:req.body.name,
                    manager:manager.id
                }
                const newteam=await TeamService.createTeam(teamObject);
                var updateduser=await User.updateOne({username:req.body.manager}).set({team:newteam.id}); 
                res.status(200).json(newteam);
            }
            else{
                res.json('Not Authorised');
            }            
        }
        catch(err){
            throw err;
        }
    },
    async find(req,res){
        try{
            if(req.user.usertype=='admin'){
                const teams=await Teams.find().populate("manager");
                res.json(teams).status(200);
            }
            else{
                if(!req.user.team)
                    return res.json('Invalid Request');
                else{
                    res.json(req.user.team).status(200);
                }
                
            }
        }
        catch(err){
            throw err;
        }
    },
    async teamMembers(req,res){
        //console.log('here');
        const teamId=req.params.teamid;
        if(req.user.team.id!=teamId){
            return res.status(401).json('Not Authorised');
        }
        const members=await User.find({where:{team:teamId},select:['username']});
        const teamObject=await Teams.findOne({id:teamId});
        //console.log("here2",{members:members,name:teamObject.name});
        res.json({members:members,name:teamObject.name}).status(200);
    },
    async teamMembersAdmin(req,res){
        if(req.user.usertype=='admin'){
            const teamName=req.params.teamname;
            const teamObject=await Teams.findOne({name:teamName});
            const teamId=teamObject.id;
            const members=await User.find({where:{team:teamId},select:['username']});
            res.json(members).status(200);
        }
        else{
            res.json('Not Authorized');
        }
    }
}