// 1 install dependancies
// npm install --dev luxon fs webshot-node
// 2 config (see steps inline)
// 3 run the script
// node screenshot.js screenshots


/*
 * STEP 1
 * Set `domain` to the website you want to screenshot, eg localhost:3000
 */
//const domain = 'http://localhost:3000'
const domain = 'https://defra-plant-exports.herokuapp.com'
// option to take mobile screenshots (iphone 6/7/8)
const isMobile = false;

/*
 * STEP 2
 * Set `paths` to an array of named paths, for example:
 */
const paths = [
  // potatoes soil samples
  /*   
  { title: '01_Start', path: '/dev/1-26/application/setup/what-export'},
  { title: 'What do you need', path: '/dev/1-26/application/setup/pre-application-test'},
  { title: 'Which type of potato', path: '/dev/1-26/application/soil/setup/potato-type'},
  { title: 'Create a reference', path: '/dev/1-26/application/soil/create/reference'},
  { title: 'Apply for soil sampling', path: '/dev/1-26/application/soil/create/task-list'},
  { title: 'Sampling site details ', path: '/dev/1-26/application/soil/create/inspection'},
  { title: 'Field details', path: '/dev/1-26/application/soil/create/field'},
  { title: 'Variety details', path: '/dev/1-26/application/soil/create/varieties'},
  { title: 'Field and varieties', path: '/dev/1-26/application/soil/create/soil-commodity-list'},
  { title: 'Check your answers', path: '/dev/1-26/application/soil/create/check-your-answers-2'},
  { title: 'Confirmation', path: '/dev/1-26/application/soil/submit/confirmation'},
   */
  // potatoes GSI
  /*   
  { title: '01 Create reference', path: '/dev/1-26/application/gsi/create/reference'},
  { title: '02 Task list', path: '/dev/1-26/application/gsi/create/task-list'},
  { title: '03 Where is inspection', path: '/dev/1-26/application/gsi/create/inspection-addresses'},
  { title: '04 Confirm location', path: '/dev/1-26/application/gsi/create/confirm-inspection-address'},
  { title: '05 Inspection dates', path: '/dev/1-26/application/gsi/create/inspection-dates'},
  { title: '06 Task list', path: '/dev/1-26/application/gsi/create/task-list'},
  { title: '07 Crop location', path: '/dev/1-26/application/gsi/create/field'},
  { title: '08 How to identify crop', path: '/dev/1-26/application/gsi/create/how-to-identify'},
  { title: '09 Commodity list', path: '/dev/1-26/application/gsi/create/gsi-commodity-list'},
  { title: '10 Task list 2', path: '/dev/1-26/application/gsi/create/task-list-2'},
  { title: '11 Check your answers', path: '/dev/1-26/application/gsi/create/check-your-answers-2'},
  { title: '12 GSI confirmation', path: '/dev/1-26/application/gsi/submit/confirmation-gsi'},
  */
 // confirmation pages
 { title: '01 confirmation', path: '/dev/1-26/application/submit/confirmation'},
 { title: '02 plant products confirmation', path: '/dev/1-26/application/submit/confirmation-plant-products-hh91'},
 { title: '03 bulb confirmation', path: '/dev/1-26/application/submit/confirmation-bulbs-ko1'},
 { title: '04 grain confirmation', path: '/dev/1-26/application/submit/confirmation-grain-hh93'},
 { title: '05 plants confirmation', path: '/dev/1-26/application/submit/confirmation-plants-phe36'},
 { title: '06 potatoes confirmation', path: '/dev/1-26/application/submit/confirmation-potatoes-phe60'},
 { title: '07 potatoes amends confirmation', path: '/dev/1-26/application/submit/confirmation-potatoes-amend'},
 { title: '08 seeds confirmation', path: '/dev/1-26/application/submit/confirmation-seeds-phe90'},
 { title: '09 machinery confirmation', path: '/dev/1-26/application/submit/confirmation-machinery-HH36A'},
 { title: '10 both confirmation', path: '/dev/1-26/application/submit/confirmation-both'},
 { title: '11 conformity confirmation', path: '/dev/1-26/application/submit/confirmation-coc'}
]

/*
 * STEP 3
 * Run: node scripts/screenshot.js [name-of-directory], for example:
 *
 * node scripts/screenshot.js apply-for-teacher-training/name-of-directory
 */

// Dependencies
const { DateTime } = require('luxon')
const webshot = require('webshot-node')
const fs = require('fs')

// Arguments
const directoryName = process.argv.slice(-1)[0]
warnIfNoArguments()

const deepestDirectory = directoryName.split('/').pop()

let title = deepestDirectory.replace(/-/g, ' ')
title = title.charAt(0).toUpperCase() + title.slice(1)

const datestamp = DateTime.local().toFormat('yyyy-MM-dd')

const imageDirectory = `${directoryName}`
const postDirectory = `app/posts/${directoryName}`.replace('/' + deepestDirectory, '')

// Run
function start () {
  makeDirectories()
  decoratePaths()
  //generatePage()
  takeScreenshots()
}

function warnIfNoArguments (title) {
  // TODO: Use a better check for an argument
  if (directoryName.startsWith('/Users')) {
    console.log('No arguments set')
    console.log('Please set a directory name: `node scripts/screenshot.js "name-of-directory"`')
  }
}

function makeDirectories () {
  if (!fs.existsSync(imageDirectory)) {
    fs.mkdirSync(imageDirectory)
  }

/*   if (!fs.existsSync(postDirectory)) {
    fs.mkdirSync(postDirectory)
  } */
}

function decoratePaths () {
  paths.forEach(function (item, index) {
    item.id = item.title.replace(/ +/g, '-').toLowerCase()
    item.file = `${imageDirectory}/${item.id}.png`
    item.mobileFile = `${imageDirectory}/mob_${item.id}.png`
    item.src = item.file.replace('app/assets', '/public')
  })
}

function takeScreenshots () {
  // https://github.com/brenden/node-webshot
  const webshotOptions = {
    phantomConfig: {
      //'remote-debugger-port':'9000',
      //'ignore-ssl-errors': 'true'
    },
    windowSize: {
      width: 1200,
      height: 800
    },
    shotSize: {
      width: 'window',
      height: 'all'
    }
  }
  var mobileOptions = {
    screenSize: { //iphone 6/7/8
      width: 375
    , height: 667
    }
  , shotSize: {
      width: 375
    , height: 'all'
    }
  , userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
      + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
  };

  paths.forEach(function (item, index) {
     webshot(
      domain + item.path,
      item.file,
      webshotOptions,
      function () {
        console.error(`${domain + item.path} \n >> ${item.file}`)
      }
    );
  
    if(isMobile){
      webshot(
        domain + item.path,
        item.mobileFile,
        mobileOptions,
        function () {
          console.error(`${domain + item.path} \n >> ${item.file}`)
        }
      )
    }
  })
}

// used to generate an eleventy page for each 
function generatePage () {
  let template = ''
  const templateStart = `---
title: ${title}
description:
date: ${datestamp}
---
{% from "screenshots/macro.njk" import appScreenshots with context %}
{{ appScreenshots({
  items: [`

  const templateEnd = `
  ]
}) }}
`

  paths.forEach(function (item, index) {
    template += `${index > 0 ? ', ' : ''}
    {
      text: "${item.title}"
    }`
  })

  const filename = `${postDirectory}/${datestamp}-${deepestDirectory}.md`

  fs.writeFile(
    filename,
    templateStart + template + templateEnd,
    function (err) {
      if (err) {
        console.error(err)
      }
      console.log(`Page generated: ${filename}`)
    }
  )
}

start();
