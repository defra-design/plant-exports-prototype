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
  const version = 'dev/2-4';
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

    console.log("(dev_v2-4.js)");
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

      // Direct users to certificate checker pages, designs and content
      if (service == "Certificate checker") {
        return res.redirect("certificate-checker/start-page");
      }
      // Direct users to ePhyto pages, designs and content
      else if (service == "ePhyto") {

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
      // Direct users to the Microsoft Dynamics 365 mockup (part of ePhyto)
      else if (service == "Dynamics") {
        return res.redirect("ephyto/dynamics/work-orders/1760969293035/export");
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

    // Phytosanitary certificate: Decide whether to redirect to import permit upload if they enter a permit number
    // console.log(baseDir);
    // console.log(req.session.data['consignee-import-permit']);
    
    // This is only triggered when the consignee page is submitted 
    if (baseDir === "/create/task-list") {

      if (req.session.data.build && req.session.data.build == "ux") {

        // Only check when the consignee page is submitted
        if (res.locals.prevURL && res.locals.prevURL.indexOf("destination-consignee") >- 1) {

          if (req.session.data['consignee-import-permit']) {
            // Redirect the page to show true url 
            return res.redirect("upload-permit")
          }

        }

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

    // Chris Harding (09.08.23) - Phytosanitary certificate: Consignee address book routing (selection)
    if (baseDir === "/application/create/consignee-address-book-validation") {

      // Parameters passed into this journey
      var return_url = req.session.data.return_url;

      // Data objects to be retrieved and queried
      var consigneeAddress = req.session.data.select_consignee_address;

      // Error validation - make sure user enters data into required fields
      if (consigneeAddress == "" || consigneeAddress == null) {
        return res.redirect("consignee-address-book?error=true");
      }
      // Routing - decide where to direct users to
      else if (consigneeAddress == "new_consignee") {

        if (return_url) {
          return res.redirect("consignee-add?return_url=" + return_url);
        }
        else {
          return res.redirect("consignee-add");
        }

      }
      else {

        // Clear down any newly added consignee data
        req.session.data.consignee_name = "";
        req.session.data.consigneeAddressLine1 = "";
        req.session.data.consigneeAddressLine2 = "";
        req.session.data.consigneeAddressLine3 = "";
        req.session.data.consigneeAddressLine4 = "";
        req.session.data.consigneeAddressLine5 = "";

        if (return_url) {
          return res.redirect(return_url + "?return_url=");
        }
        else {
          return res.redirect("consignee-import-permit-number");
        }

      }

    }
    
    // Chris Harding (19.05.23) - Phytosanitary certificate: Consignee address book routing (add)
    if (baseDir === "/application/create/consignee-add-validation") {

      // Parameters passed into this journey
      var return_url = req.session.data.return_url;

      // Data objects to be retrieved and queried
      var name = req.session.data.consignee_name;
      var consigneeAddressLine1 = req.session.data.consigneeAddressLine1;
      var consigneeAddressLine3 = req.session.data.consigneeAddressLine3;
      var consigneeAddressLine5 = req.session.data.consigneeAddressLine5;

      // Logic and validation for routing
      var errorCount = 0;
      var error1 = "";
      var error2 = "";
      var error3 = "";
      var error4 = "";
      
      // Error validation - make sure user enters data into required fields
      if (name == "" || name == null) {
        errorCount++;
        error1 = "&error1=true";
      }

      if (consigneeAddressLine1 == "" || consigneeAddressLine1 == null) {
        errorCount++;
        error2 = "&error2=true";
      }

      if (consigneeAddressLine3 == "" || consigneeAddressLine3 == null) {
        errorCount++;
        error3 = "&error3=true";
      }

      if (consigneeAddressLine5 == "" || consigneeAddressLine5 == null) {
        errorCount++;
        error4 = "&error4=true";
      }

      // Routing - decide where to direct users to
      if (errorCount > 0) {
        return res.redirect("consignee-add?change=yes&error=true" + error1 + error2 + error3 + error4);
      }
      else if (return_url) {
        return res.redirect(return_url + "?consigneeAdded=true&return_url=");
      }
      else {
        return res.redirect("consignee-import-permit-number?consigneeAdded=true");
      }

    }

    // Chris Harding (19.05.23) - Phytosanitary certificate: Consignee address book routing (edit)
    if (baseDir === "/application/create/consignee-edit-validation") {

      var return_url = req.query.return_url;
      var name = req.session.data.consignee_name;
      var address = req.session.data.consignee_address;
      
      // Error validation - make sure user enters data into required fields
      if ((name == "" || name == null) && (address == "" || address == null)) {
        return res.redirect("consignee-edit?change=yes&error=true&error1=true&error2=true");
      }
      else if (name == "" || name == null) {
        return res.redirect("consignee-edit?change=yes&error=true&error1=true");
      }
      else if (address == "" || address == null) {
        return res.redirect("consignee-edit?change=yes&error=true&error2=true");
      }
      // Routing - decide where to direct users to
      else {

        if (return_url) {
          return res.redirect(return_url + "?consigneeEdited=true");
        }
        else {
          return res.redirect("consignee-manage-address-book?consigneeEdited=true");
        }

      }

    }

    // Chris Harding (04.08.23) - Phytosanitary certificate: Add a supporting document
    if (baseDir === "/application/create/attachments-add-validation") {

      // Data objects to be retrieved and queried
      var supportingDocument = req.session.data.supportingDocument;
      var fileDescription = req.session.data.fileDescription;
      var manualFileDescription = req.session.data.manualFileDescription;

      // Logic and validation for routing
      var errorCount = 0;
      var error1 = "";
      var error2 = "";
      var error3 = "";
      
      // Error validation - make sure user enters data into required fields
      if (supportingDocument == "" || supportingDocument == null) {
        errorCount++;
        error1 = "&error1=true";
      }

      if (fileDescription == "" || fileDescription == null) {
        errorCount++;
        error2 = "&error2=true";
      }
      else {

        if (fileDescription == "Something else" && (manualFileDescription == "" || manualFileDescription == null)) {
          errorCount++;
          error3 = "&error3=true";
        }

      }

      // Routing - decide where to direct users to
      if (errorCount > 0) {
        return res.redirect("attachments-add?error=true" + error1 + error2 + error3);
      }
      else {
        return res.redirect("attachments-view?supportingDocumentAdded=true&supportingDocumentsExist=true");
      }

    }

    // *******************************
    // MICROSOFT DYNAMICS 365 routing
    // *******************************

    // Chris Harding (21.06.23) - Microsoft Dynamics 365: Supporting documents (add)
    if (baseDir === "/dynamics/portal/supporting-documents/upload-validation") {

      // Parameters passed into this journey
      var return_url = req.session.data.return_url;

      // Data objects to be retrieved and queried
      var supportingDocument = req.session.data.supportingDocument;
      var fileDescription = req.session.data.fileDescription;
      var manualFileDescription = req.session.data.manualFileDescription;

      // Logic and validation for routing
      var errorCount = 0;
      var error1 = "";
      var error2 = "";
      var error3 = "";
      
      // Error validation - make sure user enters data into required fields
      if (supportingDocument == "" || supportingDocument == null) {
        errorCount++;
        error1 = "&error1=true";
      }

      if (fileDescription == "" || fileDescription == null) {
        errorCount++;
        error2 = "&error2=true";
      }
      else {

        if (fileDescription == "Something else" && (manualFileDescription == "" || manualFileDescription == null)) {
          errorCount++;
          error3 = "&error3=true";
        }

      }

      // Routing - decide where to direct users to
      if (errorCount > 0) {
        return res.redirect("upload?error=true" + error1 + error2 + error3);
      }
      else if (return_url) {
        return res.redirect(return_url + "?supportingDocumentAdded=true&supportingDocumentsExist=true&row1=true");
      }
      else {
        return res.redirect("view?supportingDocumentAdded=true&supportingDocumentsExist=true&row1=true");
      }

    }

    // Phytosanitary certificate: Decide whether to redirect to import permit upload if they enter a permit number
    // console.log(baseDir);
    // console.log(req.session.data['consignee-import-permit']);
    
    // This is only triggered when the consignee page is submitted 
    if (baseDir === "/application/create/task-list") {

      if (req.session.data.build && req.session.data.build == "ux") {

        // Only check when the consignee page is submitted
        if (res.locals.prevURL && res.locals.prevURL.indexOf("destination-consignee") >- 1) {

          if (req.session.data['consignee-import-permit']) {
            // Redirect the page to show true url 
            return res.redirect("upload-permit")
          }

        }

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

    // sort pheats addresses
    //Order addresses by status (draft first)
    req.session.data.addresses2.sort(function(a,b){

      var returnValue = 0;

      //DRAFT
      if(a.pheats.status == 'draft' && b.pheats.status != 'draft') {
        returnValue = -1
      } else if(a.pheats.status != 'draft' && b.pheats.status == 'draft') {
        returnValue = 1
      //WITH TRADER
      } else {
        if(a.pheats.status == 'withtrader' && b.pheats.status != 'withtrader') {
          returnValue = -1
        } else if(a.pheats.status != 'withtrader' && b.pheats.status == 'withtrader') {
          returnValue = 1
        //PENDING
        } else {
          if(a.pheats.status == 'pending' && b.pheats.status != 'pending') {
            returnValue = -1
          } else if(a.pheats.status != 'pending' && b.pheats.status == 'pending') {
            returnValue = 1
          //UPDATED
          } else {
            if(a.pheats.status == 'updated' && b.pheats.status != 'updated') {
              returnValue = -1
            } else if(a.pheats.status != 'updated' && b.pheats.status == 'updated') {
              returnValue = 1
            //REGISTERED
            } else {
              if(a.pheats.status == 'registered' && b.pheats.status != 'registered') {
                returnValue = -1
              } else if(a.pheats.status != 'registered' && b.pheats.status == 'registered') {
                returnValue = 1
              } else {
                //PAUSED
                if(a.pheats.status == 'paused' && b.pheats.status != 'paused') {
                  returnValue = -1
                } else if(a.pheats.status != 'paused' && b.pheats.status == 'paused') {
                  returnValue = 1
                } else {
                  //REJECTED
                  if(a.pheats.status == 'rejected' && b.pheats.status != 'rejected') {
                    returnValue = -1
                  } else if(a.pheats.status != 'rejected' && b.pheats.status == 'rejected') {
                    returnValue = 1
                  }
                }
              }
            }
          }
        }
      }

      

      return returnValue;

    });

    //commision date
    var today = new Date();
    req.session.data.todaysDateFormatted = today.getDate() + " " + ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][today.getMonth()] + " " + today.getFullYear()
    //page specific

    //SUBMITTED
    if (baseDir === "/pheats-confirmation") {
      req.session.data.addresses2[0].pheats.status = "pending"
    }

    //PAUSED
    if (baseDir === "/pheats-confirmation-pause") {
      var _addressID = req.session.data.address || "1"
        for (var a = 0; a < req.session.data.addresses2.length; a++) {
          var _address = req.session.data.addresses2[a]
          if(_addressID.toString() == _address.id.toString()){
            _address.pheats.status = "paused"
          }
        }
    }

    //RESTARTED
    if (baseDir === "/pheats-confirmation-restart") {
      var _amendments = req.session.data.pheatsChanges || "Yes"
      var _addressID = req.session.data.address || "1"
        for (var a = 0; a < req.session.data.addresses2.length; a++) {
          var _address = req.session.data.addresses2[a]
          if(_addressID.toString() == _address.id.toString()){
            if(_amendments == "No"){
              _address.pheats.status = "withtrader"
            } else {
              _address.pheats.status = "pending"
            }
            
          }
        }
    }

    //REAPPLIED
    if (baseDir === "/pheats-confirmation-reapply") {
      var _amendments = req.session.data.pheatsChanges || "Yes"
      var _addressID = req.session.data.address || "1"
        for (var a = 0; a < req.session.data.addresses2.length; a++) {
          var _address = req.session.data.addresses2[a]
          if(_addressID.toString() == _address.id.toString()){
            if(_amendments == "No"){
              _address.pheats.status = "withtrader"
            } else {
              _address.pheats.status = "pending"
            }
            
          }
        }
    }

    //UPDATED
    if (baseDir === "/pheats-confirmation-update") {
      var _addressID = req.session.data.address || "1"
        for (var a = 0; a < req.session.data.addresses2.length; a++) {
          var _address = req.session.data.addresses2[a]
          if(_addressID.toString() == _address.id.toString()){
            _address.pheats.status = "updated"
          }
        }
    }

    // *******************************
    // CERTIFICATE CHECKER routing
    // *******************************

    // Chris Harding (14.08.23) - Verification number: Error validation and routing
    if (baseDir === "/verification-number-validation") {

      var verificationNumber = req.session.data.verificationNumber;
      
      // Make sure user enters something
      if (verificationNumber == "") {
        return res.redirect("verification-number?error=true");
      }
      // User enters a valid phytosanitary certificate number
      else if (verificationNumber == "1103-2488-3517" || verificationNumber == "110324883517" || verificationNumber == "1103 2488 3517") {
        req.session.data.certificateValid = "yes";

        return res.redirect("certificate-number");
      }
      // Not a valid phytosanitary certificate number
      else {
        req.session.data.certificateValid = "no";

        return res.redirect("certificate-number");
      }

    }
   
    // Chris Harding (14.08.23) - Certificate number: Error validation and routing
    if (baseDir === "/certificate-number-validation") {

      // Linked parameters passed into this journey
      var certificateValid = req.session.data.certificateValid;

      // Data objects to be retrieved and queried
      var number = req.session.data.certificateNumber;
      var foundMatch = number.includes("2023/7800562125823");
      
      // Make sure user enters something
      if (number == "") {
        return res.redirect("certificate-number?error=true");
      }
      // FAIL: User has already entered a non-valid certificate number
      else if (certificateValid == "no") {
        return res.redirect("not-valid");
      }
      else {

        // SUCCESS: User enters the correct details and finds a valid certificate
        if (foundMatch == true) {
          return res.redirect("valid");
        }
        // FAIL: User enters a phytosanitary certificate number that doesn't match the certificate being checked
        else {
          return res.redirect("not-valid");
        }

      }

    }

    // Chris Harding (31.07.23) - Issue date: Error validation and routing
    if (baseDir === "/issue-date-validation") {

      // Linked parameters passed into this journey
      var certificateValid = req.session.data.certificateValid;

      // Data objects to be retrieved and queried
      var day = req.session.data.certificateIssuedDay;
      var month = req.session.data.certificateIssuedMonth;
      var year = req.session.data.certificateIssuedYear;

      // Logic and validation for routing
      var errorCount = 0;
      var error1 = "";
      var error2 = "";
      var error3 = "";

      // Error validation - make sure user enters data into required fields
      if (day == "") {
        errorCount++;
        error1 = "&error1=true";
      }

      if (month == "") {
        errorCount++;
        error2 = "&error2=true";
      }

      if (year == "") {
        errorCount++;
        error3 = "&error3=true";
      }

      // Routing - decide where to direct users to
      if (errorCount > 0) {
        return res.redirect("issue-date?error=true" + error1 + error2 + error3);
      }
      // FAIL: User has already entered a non-valid certificate number
      else if (certificateValid == "no") {
        return res.redirect("not-valid");
      }
      else {

        // SUCCESS: User enters the correct details and finds a valid certificate
        if ((day == "16") && (month == "6" || month == "06") && (year == "2023")) {
          return res.redirect("valid");
        }
        // FAIL: User enters an issue date that doesn't match the certificate being checked
        else {
          return res.redirect("not-valid");
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