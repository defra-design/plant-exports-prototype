const { registerPrompt } = require('inquirer');

module.exports = function(router) {
    
  // Load helper functions
  var RestClient = require('node-rest-client').Client;
  var client = new RestClient();
  var client2 = new RestClient();
  var client3 = new RestClient();

  // ADD extra routing here if needed.
  // require('./start-page.js')(router)

  // CHANGE VERSION each time you create a new version
  const version = 'dev/2-1';
  const base_url = version + "/";
  const file_url = version + "/dev";

  // Load any certificate within "app/data/certificates" folder
  const db = []

  function addCommodity(data, list) {
    console.log("adding commodity");

    var newCommodity = {}
    
    for (var k in data) {
      
      var o = {}
      var name = "";

      console.log(k);
      
      if (data.hasOwnProperty(k)) {

        var name = k;

      }

      newCommodity[name] = data[k]
    }
    list.push(newCommodity);
  }

  // MIDDLEWARE: Called every time a page is rendered
  router.use(function(req, res, next) {
    next();
  })

  function filterResults(r, q) {
    
    var list = []
    
    for (var i = 0; i < r.length; i++) {
      console.log("checking: " + r[i].lang);
      
      if (r[i].lang == 'en') {
        console.log('pushing ' + r[i].fullname.toUpperCase());
        list.push(r[i]);
      }

      if ((r[i].fullname.toUpperCase() == q.toUpperCase()) && r[i].lang == "en") {
        list = []
        list.push(r[i]);
        console.log('found match ' + r[i].fullname.toUpperCase());
        console.log('returning the one result');
        return list;
      }

    }

    console.log('returning the full list');
    return list;
  }

  function hasDuplicates(array, value) {
    console.log("hasDuplicate " + value);
    
    for (var i = 0; i < array.length; ++i) {
     
      if (array[i].eppocode == value) {
        return true;
      }

    }

    return false;
  }

  function getSpecies(code) {
    
    var rcl = new RestClient();
    
    return rcl.get("https://data.eppo.int/api/rest/1.0/taxon/" + code + "/taxonomy?authtoken=33b6eb122ffb617bd80ff8f33e191e3c", function(taxdata, response) {}).then(taxdata => {
      return taxdata;
    });
  }

  async function populateResults2(d){
    client.get("https://data.eppo.int/api/rest/1.0/tools/search?kw=" + q + "&searchfor=1&searchmode=3&typeorg=1&authtoken=33b6eb122ffb617bd80ff8f33e191e3c", function(data, response) {
    
    var list = []

    for (const item of d) {
      
      if (!hasDuplicates(list, item.eppocode)) {
        // if its latin then we can add.
        console.log("language is " + item.lang);

        if (item.lang == "la") {
          list.push(item);
        }
        else if (item.lang == "en") {
          
          var rcl = new RestClient();

          rcl.get("https://data.eppo.int/api/rest/1.0/taxon/" + item.eppocode + "/taxonomy?authtoken=33b6eb122ffb617bd80ff8f33e191e3c", 
          
          function(taxdata, response) {
            console.log("found taxom for " + item.eppocode);
          });

        }

      }

    }

    });
  }

  async function populateResults(d) {
    console.log("populateResults START -----");

    var list = []

    for (const item of d) {
      
      if (!hasDuplicates(list, item.eppocode)) {
        // if its latin then we can add.
        console.log("language is " + item.lang);

        if (item.lang == "la") {
          list.push(item);
        }
        else if (item.lang == "en") {
          
          var bar = new Promise((resolve, reject) => {
            
            var rcl = new RestClient();
            
            rcl.get("https://data.eppo.int/api/rest/1.0/taxon/" + code + "/taxonomy?authtoken=33b6eb122ffb617bd80ff8f33e191e3c", function(taxdata, response) {

              for (var j = 0; j < taxom.length; j++) {
                
                if (taxdata[j][7] && !hasDuplicates(taxdata[j][7].eppocode)) {
                  taxdata[j][7].genus = taxdata[j][6]
                  taxdata[j][7].fullname = taxdata[j][7].prefname
                  list.add(taxdata[j][7])
                }

              }

              resolve();
            });

          });

          bar.then(() => {
            console.log('All done!');
          });
        }

      }

    }

    console.log("populateResults END -----");
    return list;
  }

  // static inspector dashboad of tasks
  let tasks = [
    { ref:"PO24521GSI", name:"ABC TRADING LTD", address:"New Farm, Egg Lane, Sacrewell, Peterborough, Cambridgeshire, PO5 4GH", inspectionDate:"8 Jul 2021", dispatchDate: "8 Jul 2021", status:"completed", tag:"green"},
    { ref:"PO24522GSI", name:"ABC TRADING LTD", address:"New Farm, Egg Lane, Sacrewell, Peterborough, Cambridgeshire, PO5 4GH", inspectionDate:"8 Jul 2021", dispatchDate: "9 Jul 2021", status:"awaiting<br/>decision", tag:"blue"},
    { ref:"PO24523GSI", name:"ABC TRADING LTD", address:"New Farm, Egg Lane, Sacrewell, Peterborough, Cambridgeshire, PO5 4GH", inspectionDate:"8 Jul 2021", dispatchDate: "10 Jul 2021", status:"todo", tag:"grey"},
    { ref:"PO24524GSI", name:"ABC TRADING LTD", address:"New Farm, Egg Lane, Sacrewell, Peterborough, Cambridgeshire, PO5 4GH", inspectionDate:"8 Jul 2021", dispatchDate: "11 Jul 2021", status:"todo", tag:"grey"},
    { ref:"PO26624Australia", name:"GRAND FARM LTD", address:"Grand Farm, Farm Road, Wittering, Peterborough, Cambridgeshire, PO5 4GH", inspectionDate:"18 Jul 2021", dispatchDate: "21 Jul 2021", status:"todo", tag:"grey"},
    { ref:"PO26624 china", name:"GRAND FARM LTD", address:"Grand Farm, Farm Road, Wittering, Peterborough, Cambridgeshire, PO5 4GH", inspectionDate:"18 Jul 2021", dispatchDate: "21 Jul 2021", status:"todo", tag:"grey"},
    { ref:"PO26624 GFL", name:"GRAND FARM LTD", address:"Grand Farm, Farm Road, Wittering, Peterborough, Cambridgeshire, PO5 4GH", inspectionDate:"18 Jul 2021", dispatchDate: "21 Jul 2021", status:"todo", tag:"grey"},
    { ref:"PO 29300", name:"Rowell XP LTD", address:"Eye Farm, Boro Road, Peterborough, Cambridgeshire, PO5 4GH", inspectionDate:"18 Jul 2021", dispatchDate: "22 Jul 2021", status:"todo", tag:"grey"},
  ];
  let months = [null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // let timeLog = [{id:0, name:"Inspector X", date:"19 July 2021", admin:"15", travel:"", inspection:"", day:"19", month:"7", year:"2021"}];

  router.get('/' + base_url + '*' + 'inspector/time-entry', function(req, res) {
    console.log("id", req.query.id);
    
    let id = 0;
    
    if (req.query.id) {
      id = parseInt(req.query.id);
      times = req.session.data.timeLog[id];
    }
    else {
      times = {id:null, name:"", date:"", admin:"", travel:"", inspection:"", day:"", month:"", year:""}
    }

    console.log("times");
    console.log(times);
    res.render(base_url + req.params[0] + 'inspector/time-entry', {
      times
    });
  });

  router.all('/' + base_url + '*'+ 'inspector/check-answers', function(req, res) {
    console.log("default get routing page for cya: " + base_url + req.params[0])
    // add logged time to table

    let loggedDate = "20 July 2021";

    if (!req.session.data.timeLog) {
      req.session.data.timeLog = [];
      req.session.data.timeLog.push({id:0, name:"Inspector X", date:"19 July 2021", admin:"15", travel:"", inspection:"", day:"19", month:"7", year:"2021"} );
    }

    if (req.body.day && req.body.month && req.body.year) {
      loggedDate = req.body.day  + " " +  months[parseInt(req.body.month)] + " " + req.body.year;
      
      let obj = {
        id:null,
        name:req.body["inspector-name"][0],
        date:loggedDate,
        day:req.body.day,
        month:req.body.month,
        year:req.body.year,
        admin:req.body.admin,
        travel:req.body.travel,
        inspection:req.body.inspection
      };

      if (req.body.id) {
        console.log('update exisitng', req.body.id);
        obj.id = req.body.id;
        let idx = parseInt(req.body.id);
        req.session.data.timeLog[idx] = obj;
      }
      else {
        obj.id = req.session.data.timeLog.length;
        console.log(req.session.data.timeLog);
        console.log('add new item', obj.id);
        req.session.data.timeLog.push(obj);
      }

    }

    // Attempt to render a page in the current folder
    console.log("------- check-answers ------ ");
    // console.log(req.body);
    console.log(req.session.data.timeLog);

    res.render(base_url + req.params[0] + 'inspector/check-answers', {
      timeLog: req.session.data.timeLog
    });
  });

  router.get('/' + base_url + '*'+ 'inspector/dashboard', function(req, res) {
    console.log("default get routing page for: " + base_url + req.params[0]);
    // Attempt to render a page in the current folder
    console.log("------- inspector ------ ");
    console.log(req.body);

    res.render(base_url + req.params[0] + 'inspector/dashboard', {
      tasks
    });
  });

  router.get('/' + base_url + '*' + 'application/create/plant-lookup2', function(req, res) {
    
    var q = req.query.keyword || "Rosa";
    var eppocode;
    var results;

    // First get any code for the search
    client.get("https://data.eppo.int/api/rest/1.0/tools/search?kw=" + q + "&searchfor=1&searchmode=3&typeorg=1&authtoken=33b6eb122ffb617bd80ff8f33e191e3c", function(data, response) {
      // parsed response body as js object
      plants = populateResults2(data);
      console.log("------- plants output ------ ");
      console.log(plants);
      console.log("------- end plants output ------ ");
      
      res.render(base_url + req.params[0] + 'application/create/plant-lookup', {
        "query": req.query,
        "db": plants,
      });
    });

  });

  // **** POST TEMPLATE ***
  router.post('/' + base_url + '*/application/create/commodity-page*', function(req, res) {
    
    var page = req.query.return_url || '/' + base_url + req.params[0] + '/application/create/commodity-list'
    
    addCommodity(req.body, req.session.data.commodities);
    res.redirect(301, page);
  });

  // *******************************
  // Global page GET router
  // *******************************

  // This adds query to all pages and will be used if no other get routing exists to override this.
  router.get('/' + base_url + '*', function(req, res) {

    console.log("(dev_v2-1.js)");
    console.log("default global GET routing page for: " + base_url + " plus " + req.params[0]);
    
    var dir = req.params[0].split(/\/+/g);
    
    // Remove the main folder from URL
    dir.shift();
    
    var baseDir = "";
    
    dir.forEach(function(element) {
      var path = "/" + element;
      baseDir += path;
    });

    // console.log("baseDir = " + baseDir)
     
    // Clear previous session data if the user has selected commodity and certificate type
    if (baseDir === "/setup/what-export") {
      console.log("clearing data");
      req.session.data = {}
    }

    var page = base_url + req.params[0];

    // *******************************
    // CONFIG page
    // *******************************

    // Get the name of any prototype HTML file, called, that sits in the root of the version folder (e.g. config.html)
    var baseFile = req.params[0];

    // Chris Harding (17.04.23) - Added to allow smarter routing between the 3 core services (ePhyto, PHES and PHEATS)
    if (baseFile === "config-routing") {

      var service = req.session.data.service;
      var entryPoint = req.session.data.start_page;

      // Direct users to ePhyto pages, designs and content
      if (service == "ePhyto") {

        if (entryPoint == "Start") {
          return res.redirect("ephyto/start-page");
        }
        else if (entryPoint == "Gateway") {
          return res.redirect("ephyto/gateway/gov-sign-in");
        }
        else {
          return res.redirect("ephyto/dashboard-submitted");
        }

      }
      // Direct users to PHES pages, designs and content
      else if (service == "PHES") {

        if (entryPoint == "Start") {
          return res.redirect("start-page");
        }
        else if (entryPoint == "Gateway") {
          return res.redirect("gateway/gov-sign-in");
        }
        else {
          return res.redirect("dashboard-submitted");
        }
        
      }
      // Direct users to the PHEATS start page
      else {
        return res.redirect("pheats/start-page");
      }

    }
    
    // *******************************
    // PHES routing
    // *******************************

    // Chris Harding - USDA Bulbs: Decide whether to redirect users to the USDA page when they are exporting bulbs to the United States
    if (baseDir === "/setup/bulbs-declaration") {

      var commodity = req.session.data.commodity;
      var countrySelect = req.session.data.countrySelect[0];
      
      if (commodity == "bulbs") {

        if (countrySelect == "United States") {
          // Redirect users to the USDA page when they are exporting bulbs to the United States
          return res.redirect("usda");
        }
        else {
          // Continue to the declaration page
          return res.redirect("declaration");
        }

      }
      else {
        // Don't do the USDA check or change the page parameter
      }

    }

    // Chris Harding (06.01.23) - Copy application: Validate the copied date so we can either a) throw an error b) direct to the task list
    if (baseDir === "/create/inspection-dates-validation") {

      var day = req.session.data.inpection_date_day;
      var month = req.session.data.inpection_date_month;
      var year = Number(req.session.data.inpection_date_year);
      
      if (year < 2023) {
        return res.redirect("inspection-dates?error=true");
      }
      else {
        return res.redirect("task-list");
      }

    }

    // Chris Harding (18.01.23) - Re-issue: Error validation (how-to-identify) for the commodity page (re-issue)
    if (baseDir === "/re-issue/edit/how-to-identify-validation") {

      var return_url = req.session.data.return_url;
      var quantity = Number(req.session.data.quantity);
      var number_of_packages = Number(req.session.data.number_of_packages);
      
      if (quantity > 30 && number_of_packages > 120) {
        return res.redirect("how-to-identify?change=yes&error=true&error1=true&error2=true");
      }
      else if (quantity > 30) {
        return res.redirect("how-to-identify?change=yes&error=true&error1=true");
      }
      else if (number_of_packages > 120) {
        return res.redirect("how-to-identify?change=yes&error=true&error2=true");
      }
      else {

        if (return_url) {
          return res.redirect(return_url + "?reissue_certificate_data_pfp=draft");
        }
        else {
          return res.redirect("../amend-your-certificate?reissue_certificate_data_pfp=draft");
        }

      }

    }

    if (baseDir === "/re-issue/edit/how-to-identify-2-validation") {

      var return_url = req.session.data.return_url;
      var quantity = Number(req.session.data.quantity2);
      var number_of_packages = Number(req.session.data.number_of_packages2);
      
      if (quantity > 35 && number_of_packages > 140) {
        return res.redirect("how-to-identify-2?change=yes&error=true&error1=true&error2=true");
      }
      else if (quantity > 35) {
        return res.redirect("how-to-identify-2?change=yes&error=true&error1=true");
      }
      else if (number_of_packages > 140) {
        return res.redirect("how-to-identify-2?change=yes&error=true&error2=true");
      }
      else {

        if (return_url) {
          return res.redirect(return_url + "?reissue_certificate_data_pfp=draft");
        }
        else {
          return res.redirect("../amend-your-certificate?reissue_certificate_data_pfp=draft");
        }

      }

    }

    if (baseDir === "/re-issue/edit/how-to-identify-3-validation") {

      var return_url = req.session.data.return_url;
      var quantity = Number(req.session.data.quantity3);
      var number_of_packages = Number(req.session.data.number_of_packages3);
      
      if (quantity > 17 && number_of_packages > 68) {
        return res.redirect("how-to-identify-3?change=yes&error=true&error1=true&error2=true");
      }
      else if (quantity > 17) {
        return res.redirect("how-to-identify-3?change=yes&error=true&error1=true");
      }
      else if (number_of_packages > 68) {
        return res.redirect("how-to-identify-3?change=yes&error=true&error2=true");
      }
      else {

        if (return_url) {
          return res.redirect(return_url + "?reissue_certificate_data_pfp=draft");
        }
        else {
          return res.redirect("../amend-your-certificate?reissue_certificate_data_pfp=draft");
        }

      }

    }

    // Decide whether to redirect to import permit upload if they enter a permit number
    console.log(baseDir);
    console.log(req.session.data['consignee-import-permit']);
    
    // This is only triggered when the consignee page is submitted 
    if (baseDir === "/create/task-list") {

      if (req.session.data.build && req.session.data.build == "ux") {

        // ONly check when the consignee page is submitted
        if (res.locals.prevURL && res.locals.prevURL.indexOf("destination-consignee") >- 1) {

          if (req.session.data['consignee-import-permit']) {
            // Redirect the page to show true url 
            return res.redirect("upload-permit")
          }

        }

      }

    }

    // *******************************
    // EPHYTO routing (delete all of this when we merge ePhyto with PHES)
    // *******************************

    // Chris Harding - USDA Bulbs: Decide whether to redirect users to the USDA page when they are exporting bulbs to the United States
    if (baseDir === "/application/setup/bulbs-declaration") {

      var commodity = req.session.data.commodity;
      var countrySelect = req.session.data.countrySelect[0];
      
      if (commodity == "bulbs") {

        if (countrySelect == "United States") {
          // Redirect users to the USDA page when they are exporting bulbs to the United States
          return res.redirect("usda");
        }
        else {
          // Continue to the declaration page
          return res.redirect("declaration");
        }

      }
      else {
        // Don't do the USDA check or change the page parameter
      }

    }

    // Chris Harding (06.01.23) - Copy application: Validate the copied date so we can either a) throw an error b) direct to the task list
    if (baseDir === "/application/create/inspection-dates-validation") {

      var day = req.session.data.inpection_date_day;
      var month = req.session.data.inpection_date_month;
      var year = Number(req.session.data.inpection_date_year);
      
      if (year < 2023) {
        return res.redirect("inspection-dates?error=true");
      }
      else {
        return res.redirect("task-list");
      }

    }

    // Chris Harding (18.01.23) - Re-issue: Error validation (how-to-identify) for the commodity page (re-issue)
    if (baseDir === "/application/re-issue/edit/how-to-identify-validation") {

      var return_url = req.session.data.return_url;
      var quantity = Number(req.session.data.quantity);
      var number_of_packages = Number(req.session.data.number_of_packages);
      
      if (quantity > 30 && number_of_packages > 120) {
        return res.redirect("how-to-identify?change=yes&error=true&error1=true&error2=true");
      }
      else if (quantity > 30) {
        return res.redirect("how-to-identify?change=yes&error=true&error1=true");
      }
      else if (number_of_packages > 120) {
        return res.redirect("how-to-identify?change=yes&error=true&error2=true");
      }
      else {

        if (return_url) {
          return res.redirect(return_url + "?reissue_certificate_data_pfp=draft");
        }
        else {
          return res.redirect("../amend-your-certificate?reissue_certificate_data_pfp=draft");
        }

      }

    }

    if (baseDir === "/application/re-issue/edit/how-to-identify-2-validation") {

      var return_url = req.session.data.return_url;
      var quantity = Number(req.session.data.quantity2);
      var number_of_packages = Number(req.session.data.number_of_packages2);
      
      if (quantity > 35 && number_of_packages > 140) {
        return res.redirect("how-to-identify-2?change=yes&error=true&error1=true&error2=true");
      }
      else if (quantity > 35) {
        return res.redirect("how-to-identify-2?change=yes&error=true&error1=true");
      }
      else if (number_of_packages > 140) {
        return res.redirect("how-to-identify-2?change=yes&error=true&error2=true");
      }
      else {

        if (return_url) {
          return res.redirect(return_url + "?reissue_certificate_data_pfp=draft");
        }
        else {
          return res.redirect("../amend-your-certificate?reissue_certificate_data_pfp=draft");
        }

      }

    }

    if (baseDir === "/application/re-issue/edit/how-to-identify-3-validation") {

      var return_url = req.session.data.return_url;
      var quantity = Number(req.session.data.quantity3);
      var number_of_packages = Number(req.session.data.number_of_packages3);
      
      if (quantity > 17 && number_of_packages > 68) {
        return res.redirect("how-to-identify-3?change=yes&error=true&error1=true&error2=true");
      }
      else if (quantity > 17) {
        return res.redirect("how-to-identify-3?change=yes&error=true&error1=true");
      }
      else if (number_of_packages > 68) {
        return res.redirect("how-to-identify-3?change=yes&error=true&error2=true");
      }
      else {

        if (return_url) {
          return res.redirect(return_url + "?reissue_certificate_data_pfp=draft");
        }
        else {
          return res.redirect("../amend-your-certificate?reissue_certificate_data_pfp=draft");
        }

      }

    }

    // Decide whether to redirect to import permit upload if they enter a permit number
    console.log(baseDir);
    console.log(req.session.data['consignee-import-permit']);
    
    // This is only triggered when the consignee page is submitted 
    if (baseDir === "/application/create/task-list") {

      if (req.session.data.build && req.session.data.build == "ux") {

        // ONly check when the consignee page is submitted
        if (res.locals.prevURL && res.locals.prevURL.indexOf("destination-consignee") >- 1) {

          if (req.session.data['consignee-import-permit']) {
            // Redirect the page to show true url 
            return res.redirect("upload-permit")
          }

        }

      }

    }

    // *******************************
    // PHEATS routing
    // *******************************

    // Chris Harding (30.03.23) - Eligibility checker: Q1
    if (baseDir === "/eligibility-checker/1-validation") {

      var ecq1 = req.session.data.ecq1;
      
      // Force users to enter at least one value
      if (ecq1 == "" || ecq1 == null) {
        return res.redirect("1?error=true");
      }
      // Eligible: continue...
      else if (ecq1 == "Plants and fresh produce") {
        return res.redirect("2");
      }
      // Not eligible: end
      else {
        return res.redirect("not-eligible");
      }

    }

    if (baseDir === "/eligibility-checker/2-validation") {

      var ecq2 = req.session.data.ecq2;
      
      // Force users to enter at least one value
      if (ecq2 == "" || ecq2 == null) {
        return res.redirect("2?error=true");
      }
      // Not eligible: end
      else if (ecq2 == "EU,Rest of the world" || ecq2 == "Northern Ireland,Rest of the world" || ecq2 == "EU,Northern Ireland,Rest of the world" || ecq2 == "Rest of the world") {
        return res.redirect("not-eligible");
      }
      // Eligible: continue...
      else {
        return res.redirect("eligible");
      }

    }

    // Dave Haigh
    //commision date
    var today = new Date();
    req.session.data.todaysDateFormatted = today.getDate() + " " + ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][today.getMonth()] + " " + today.getFullYear()
    //page specific

    //SUBMITTED
    if (baseDir === "/pheats-confirmation") {
      req.session.data.addresses[0].pheats.status = "pending"
    }

    //PAUSED
    if (baseDir === "/pheats-confirmation-pause") {
      var _addressID = req.session.data.address || "1"
        for (var a = 0; a < req.session.data.addresses.length; a++) {
          var _address = req.session.data.addresses[a]
          if(_addressID.toString() == _address.id.toString()){
            _address.pheats.status = "paused"
          }
        }
    }

    //RESTARTED
    if (baseDir === "/pheats-confirmation-restart") {
      var _addressID = req.session.data.address || "1"
        for (var a = 0; a < req.session.data.addresses.length; a++) {
          var _address = req.session.data.addresses[a]
          if(_addressID.toString() == _address.id.toString()){
            _address.pheats.status = "pending"
          }
        }
    }

    //UPDATED
    if (baseDir === "/pheats-confirmation-update") {
      var _addressID = req.session.data.address || "1"
        for (var a = 0; a < req.session.data.addresses.length; a++) {
          var _address = req.session.data.addresses[a]
          if(_addressID.toString() == _address.id.toString()){
            _address.pheats.status = "updated"
          }
        }
    }


    // Attempt to render a page in the current folder
    res.render(page, {
      "query": req.query,
    }, function(err, html) {
      
      // If the page doesnt exist in current folder, attempt to render a page from the "core folder"
      // This reduces space of duplicating the whole folder
      if (err) {
        
        if (err.message.indexOf('template not found') !== -1) {
          console.log("No page in directory, attempting to load from core...");
          return res.render(file_url + baseDir, {
            "query": req.query,
            // More data to push to every page
          });
        }

        throw err;
      }

      res.send(html);
    });
  });

}