/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
*/
const Joi=require('joi');
const axios=require('axios');
const customValidators=require('./customValidators');
const file=require('../services/fakeUsersData');
const dayjs=require('dayjs');


module.exports = {
      
      async create(req, res) {
        try {
          const checkfileds=Joi.object({
            username:Joi.string().required().custom(customValidators.uniqueUsername),
            email:Joi.string().required().custom(customValidators.uniqueEmail),
            password:Joi.string().required(),
            phonenumber:Joi.number().required().custom(customValidators.uniquePhonenumber),
          })

          const {error,value}=checkfileds.validate(req.body);
          if(error){
            return res.status(400).json({error:'Unique fields required'});
          }    
          else{
            const userObject=req.body;
            userObject.usertype='employee';
            const newuser=await MongoServices.createUser(req.body);
            //res.status(200).json(newuser);

            const userobject={
              uid:newuser.id,
              usertype:newuser.usertype,
            }
            const token=await ChipherService.createToken(userobject);
            res.status(200).json({token,usertype:userobject.usertype});
          }
        } catch (err) {
          res.serverError(err);
        }
      },
      async find(req, res) {
        try {
          const users = await User.find();
          res.status(200).json(users);
        } catch (err) {
          res.serverError(err);
        }
      },
      async findOne(req,res) {
        try{
            res.status(200).json(req.user);
        }
        catch(err){
            res.serverError(err);
        }
      },
      async update(req,res){
        try{
            const rusername=req.body.username;
            if(req.user.username==rusername||req.user.usertype=='admin'){
              const user=await User.updateOne({username:rusername}).set(req.body);
              res.status(200).json(user);
            }   
            else
              res.status(401).json({error:'unauthorized'});
        }
        catch(err){
            res.serverError(err);
        }
      },
      async delete(req,res){
        try{
            const userid=req.body.userid;
            const findUser=await User.findOne({id:userid}).populate("team");
            if(req.user.usertype!='admin'){
              return res.json('Not Authorised');
            }
            if(findUser.usertype=='admin'){
              return res.json("Not Permitted");
            }
            if(findUser.team.manager==findUser.id){
              return res.json("Change Manager first");
            }
            
            const user=await User.destroyOne({id:userid});
            res.status(200);
        }
        catch(err){
            res.serverError(err);
        }
      },
      async login(req,res){
        try{
            console.log({body:req.body});
            const uname=req.body.username;
            const pwd=req.body.password;
            if(uname==null||pwd==null){
                res.status(400).json({error:"fill all fields"});
            }
            const checkuser=await MongoServices.loginUser(req.body);
            if(checkuser==null){
                return res.status(400).json({error:"Invalid Credentials"});
            }

            const userobject={
              uid:checkuser.id,
              usertype:checkuser.usertype,
            }
            const token=await ChipherService.createToken(userobject);
            res.status(200).json({token,usertype:userobject.usertype});
        }
        catch(err){
            res.serverError(err);
        }
      },
      
      async statusUpdate(req,res){
        try{
          const taskid=req.body.taskid;
          const teamId=await Tasks.findOne({id:taskid}).populate('assignedToId');
          if(req.user.usertype!='admin'||req.user.team!=teamId){
            return res.status(401).json('Not Authorised');
          }
          const task=await Tasks.updateOne({id:taskid}).set(req.body.status);
          res.status(200).json(task);      
        }
        catch(err){
          res.serverError(err);
        }
      },
      async tasksDelete(req,res){
        if(req.user.usertype!="admin"){
          return res.status(401).json('Not Authorised');
        }
        const taskid=req.params.taskid;
        await Tasks.destroyOne({id:taskid});
        res.status(200);
      },
      async add(){
        if(req.user.usertype=='employee'){
          return ;
        }
        file.addRecords()
        .then(async (response)=>{
          console.log(response);
          for(var i=0;i<response.data.length;i++){
            const object=await User.findOne({username:response.data[i].username});
            if(!object)   
            await MongoServices.createUser(response.data[i]);
          }
        })
        .catch((err)=>{
          console.log(err);
        })
      },
      async exec1(){
        const initial= Date.now();
        console.log(initial);
         const result= await User.findOne({username:"Sandra"});
         const final= Date.now();
         console.log(final-initial);
      },
      async trial(req,res){
        //await Student.addToCollection("665979ef4b387e94ffc05e19",'course',"665976354b387e94ffc05e16");
        //await Student.removeFromCollection("6659760d4b387e94ffc05e15",'course',"665976354b387e94ffc05e16");
        //await Student.destroyOne({id:"665979ef4b387e94ffc05e19"});
        const object=await Student.find({id:"66597aeb4b387e94ffc05e1c"}).populate('course')
        //.populate('course');

        return res.json({message:"success",object});
      }
      
};

