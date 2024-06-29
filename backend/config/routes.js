/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // '/': { view: 'pages/homepage' },
  // '/api/users': { view: 'pages/users' },
  // '/api/users/tasks': { view: 'pages/tasks' },
  'POST /api/users': 'UserController.create',
  'GET /api/users': 'UserController.find',
  'GET /api/users/find' : 'UserController.findOne',
  'PUT /api/users' : 'UserController.update',
  'DELETE /api/users' : 'UserController.delete',
  'POST /api/users/login': 'UserController.login',

  'GET /api/tasks': 'TasksController.find',
  'DELETE /api/users/tasks/:taskid': 'UserController.tasksDelete',
  'POST /api/tasks': 'TasksController.notesp',
  'PUT /api/users/tasks' : 'UserController.statusUpdate',

  'GET /api/teams' : 'TeamsController.find',
  'POST /api/teams': 'TeamsController.create',
  'GET /api/teams/members/:teamid': 'TeamsController.teamMembers',
  'GET /api/teams/members/:teamname/admin': 'TeamsController.teamMembersAdmin',
  'GET /api/bulkadd': 'UserController.add',

  'GET /api/trial': 'UserController.trial'
  



  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
