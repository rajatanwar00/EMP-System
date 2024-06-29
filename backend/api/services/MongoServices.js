
module.exports={
    createUser:async function(user){
        try{
            const newuser=await User.create(user).fetch();           
            return newuser;
        }
        catch(error){
            throw error;
        }        
    },

    loginUser: async function(user){
        try{
            const findUser=await User.findOne({
                username: user.username
            });
            if(user.password==findUser.password){
                return findUser;
            }
            else
            return null;
        }
        catch(error){
            throw error;
        }
    }
}