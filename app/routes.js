const express = require('express')
const app = express()
const router = express.Router()
const radioButtonRedirect = require('radio-button-redirect')


router.use(radioButtonRedirect)

router.use('/', (req, res, next) => {
  req.session.data.version = "1-1"
  res.locals.currentURL = req.originalUrl; //current screen
  req.session.data.currentURL = req.path
  res.locals.prevURL = req.get('Referrer'); // previous screen
  console.log('previous page is: ' + res.locals.prevURL + " and current page is " + req.url + " " + res.locals.currentURL );
  next();
});



// GET SPRINT NAME - useful for relative templates


// Add your routes here - above the module.exports line
// custom code to load any file from
const fs = require('fs');
const route_path= "./routes/"
const normalizedPath = require("path").join(__dirname, "./routes/");
fs.readdirSync(normalizedPath).forEach(function(file) {
    //loads directory this didnt work. Make it work later

    var path = normalizedPath + file
    console.log(normalizedPath+file)
    // require('./routes/'+file)(router);
  });

const tools = require('./routes/tools.js')
require('./routes/routes.js')(router);
require('./routes/dev.js')(router);
module.exports = router
