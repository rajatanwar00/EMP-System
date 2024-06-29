const Redis=require('ioredis');
const redisConfig=sails.config.redis;
const redis=new Redis({
    host: redisConfig.host,
    port: redisConfig.port,
    // password:redisConfig.password
});

module.exports={
    

    async get(key){
        try{
            const value=await redis.get(key);
            //console.log('redis used',JSON.parse(value));
            return JSON.parse(value);
        }
        catch(err){
            console.error('Redis error',err);
        }
    },
    async set(key,value){
        try{
            //console.log({key,value});
           const setValue= await redis.set(key,JSON.stringify(value),'EX',3600);
           //console.log({setValue})
        }
        catch(err){
            console.error('Redis error',err);
        }
    },
    async del(key) {
        try{
            await redis.del(key);
        } 
        catch(err){
          console.error('Redis error',err);
        }
      },
}