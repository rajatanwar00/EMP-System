module.exports={
    createTeam:async function(team){
        try{
            const newteam= await Teams.create(team).fetch();
            const returnteam= await Teams.findOne({name:newteam.name}).populate("manager");
            return returnteam;
        }
        catch(error){
            throw error;
        }        
    },

}