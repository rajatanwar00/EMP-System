/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

// const { verify } = require("jsonwebtoken");

// const ChipherService = require("../api/services/ChipherService");

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Sails/Express middleware to run for every HTTP request.                   *
  * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
  *                                                                           *
  * https://sailsjs.com/documentation/concepts/middleware                     *
  *                                                                           *
  ****************************************************************************/

  middleware: {

    /***************************************************************************
    *                                                                          *
    * The order in which middleware should be run for HTTP requests.           *
    * (This Sails app's routes are handled by the "router" middleware below.)  *
    *                                                                          *
    ***************************************************************************/

    order: [
      //'cookieParser',
      //'session',
      'bodyParser',
      'parseUser',
      'compress',
    //  'poweredBy',
      'router',
      'www',
    //  'favicon',
    ],


    /***************************************************************************
    *                                                                          *
    * The body parser that will handle incoming multipart HTTP requests.       *
    *                                                                          *
    * https://sailsjs.com/config/http#?customizing-the-body-parser             *
    *                                                                          *
    ***************************************************************************/

    // bodyParser: (function _configureBodyParser(){
    //   var skipper = require('skipper');
    //   var middlewareFn = skipper({ strict: true });
    //   return middlewareFn;
    // })(),

    parseUser: async function(req,res,next){
      const url=req.path;
      if(req.method=='OPTIONS'){
        return next();
      }
      if(url=='/api/users/login'|| (url=='/api/users'&&req.method!='PUT'&&req.method!='DELETE')){
        return next();
      }      
      
      const token=req.headers.token;
      if(!token){
        return res.status(401).json({message:"Unauthorized"});
      }
      const verifyUser=await ChipherService.decodeToken(token);
      //const redisFind=await RedisService.get(verifyUser.uid);
      //if(!redisFind){
        const findUser=await User.findOne({id:verifyUser.uid}).populate('team');
        if(!findUser){
          return res.json('User Not Found');
        }
        //await RedisService.set(verifyUser.uid,findUser);
        req.user=findUser;
      //}
      //else{
        //req.user=redisFind;
      //}
      
      next();
    }

  },

};
