const express = require('express')
const router = express.Router()
const radioButtonRedirect = require('radio-button-redirect')


router.use(radioButtonRedirect)

router.use('/', (req, res, next) => {
  res.locals.currentURL = req.originalUrl; //current screen
  res.locals.prevURL = req.get('Referrer'); // previous screen
  console.log('previous page is: ' + res.locals.prevURL + " and current page is " + req.url + " " + res.locals.currentURL );
  next();
});
// GET SPRINT NAME - useful for relative templates

// Add your routes here - above the module.exports line

module.exports = router
