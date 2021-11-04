const express = require('express')
const app = express()
const router = express.Router()
const radioButtonRedirect = require('radio-button-redirect')


router.use(radioButtonRedirect)

router.use('/', (req, res, next) => {
  req.session.data.version = req.session.data.version  || "1-29"
  req.session.data.version_list= req.session.data.version_list || ["1-29","1-28","1-27","1-26","1-25","1-24","1-23","1-22","1-21","1-20","1-19","1-18","1-17","1-16","1-15","1-14","1-13","1-12","1-11","1-10","1-9","1-8","1-7","1-6","1-5","1-4","1-3","1-2","1-1","1-0"]
  res.locals.currentURL = req.originalUrl; //current screen
  req.session.data.currentURL = req.path
  res.locals.prevURL = req.get('Referrer'); // previous screen
  console.log('(routes.js)');
  console.log('prevURL:    ' + res.locals.prevURL );
  console.log('currentURL: ' + res.locals.currentURL );
  //console.log('req.url: ' + req.url);
  next();
});



// GET SPRINT NAME - useful for relative templates


// Add your routes here - above the module.exports line
// custom code to load any file from
const fs = require('fs');
const route_path= "./routes/"
const normalizedPath = require("path").join(__dirname, "./routes/");
/* 
fs.readdirSync(normalizedPath).forEach(function(file) {
    //loads directory this didnt work. Make it work later

    var path = normalizedPath + file
    console.log(normalizedPath+file)
    // require('./routes/'+file)(router);
  });
 */
const tools = require('./routes/tools.js')
require('./routes/routes.js')(router);
// dev loads a specific version route in turn
// the version routes are processed before the global dev ones
require('./routes/dev.js')(router);
module.exports = router
