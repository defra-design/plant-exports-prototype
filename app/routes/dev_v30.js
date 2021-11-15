const { registerPrompt } = require('inquirer');

module.exports = function(router) {
    // Load helper functions
    var RestClient = require('node-rest-client').Client;

    var client = new RestClient();
    var client2 = new RestClient()
    var client3 = new RestClient()

    // ADD extra routing here if needed.
    // require('./start-page.js')(router)



    // CHANGE VERSION each time you create a new version
    const version = 'dev/1-30'
    const base_url = version + "/"
    const file_url = version + "/dev"

    // Load any certificate within "app/data/certificates" folder
    const db = []

    function addCommodity(data, list) {
      console.log("adding commodity")
      var newCommodity = {}
      for (var k in data) {
        var o = {}
        var name = ""
        console.log(k)
        if (data.hasOwnProperty(k)) {
          var name = k;

        }

        newCommodity[name] = data[k]
      }
      list.push(newCommodity)
    }

    // MIDDLEWARE: Called every time a page is rendered
    router.use(function(req, res, next) {
      next()
    })

   function filterResults(r, q) {
      var list = []
      for (var i = 0; i < r.length; i++) {
        console.log("checking: " + r[i].lang)
        if (r[i].lang == 'en') {
          console.log('pushing ' + r[i].fullname.toUpperCase())
          list.push(r[i])
        }
        if ((r[i].fullname.toUpperCase() == q.toUpperCase()) && r[i].lang == "en") {
          list = []
          list.push(r[i])
          console.log('found match ' + r[i].fullname.toUpperCase())
          console.log('returning the one result')
          return list

        }
      }
      console.log('returning the full list')
      return list
    }

    function hasDuplicates(array, value) {
      console.log("hasDuplicate " + value)
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
        return taxdata
      })
    }

    async function populateResults2(d){
      client.get("https://data.eppo.int/api/rest/1.0/tools/search?kw=" + q + "&searchfor=1&searchmode=3&typeorg=1&authtoken=33b6eb122ffb617bd80ff8f33e191e3c", function(data, response) {
      var list = []
        for (const item of d) {
          if (!hasDuplicates(list, item.eppocode)) {
            // if its latin then we can add.
            console.log("language is " + item.lang)
            if (item.lang == "la") {
              list.push(item)
            } else if (item.lang == "en") {
              var rcl = new RestClient();
              rcl.get("https://data.eppo.int/api/rest/1.0/taxon/" + item.eppocode + "/taxonomy?authtoken=33b6eb122ffb617bd80ff8f33e191e3c", function(taxdata, response) {
                console.log("found taxom for "+item.eppocode)
              })
            }

          }
        }
      })
    }
    async function populateResults(d) {
      console.log("populateResults START -----")

      var list = []
      for (const item of d) {
        if (!hasDuplicates(list, item.eppocode)) {
          // if its latin then we can add.
          console.log("language is " + item.lang)
          if (item.lang == "la") {
            list.push(item)
          } else if (item.lang == "en") {
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
                resolve()
              })
            });

            bar.then(() => {
              console.log('All done!');
            });
          }
        }
      }
        console.log("populateResults END -----")
        return list
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
      //let timeLog = [{id:0, name:"Inspector X", date:"19 July 2021", admin:"15", travel:"", inspection:"", day:"19", month:"7", year:"2021"}];


      router.get('/' + base_url + '*'+ 'inspector/time-entry', function(req, res) {
        console.log("id", req.query.id);
        let id = 0;
        if(req.query.id){
          id = parseInt(req.query.id);
          times = req.session.data.timeLog[id];
        }else{
          times = {id:null, name:"", date:"", admin:"", travel:"", inspection:"", day:"", month:"", year:""}
        }
        console.log("times");
        console.log(times);
        res.render(base_url + req.params[0] + 'inspector/time-entry', {
          times
        })
      })


      router.all('/' + base_url + '*'+ 'inspector/check-answers', function(req, res) {
        console.log("default get routing page for cya: " + base_url + req.params[0])
        // add logged time to table
        let loggedDate = "20 July 2021";
        if(!req.session.data.timeLog){
          req.session.data.timeLog = [];
          req.session.data.timeLog.push({id:0, name:"Inspector X", date:"19 July 2021", admin:"15", travel:"", inspection:"", day:"19", month:"7", year:"2021"} );
        }
        if(req.body.day && req.body.month && req.body.year){
          loggedDate = req.body.day  +" "+  months[parseInt(req.body.month)] +" "+ req.body.year;
          let obj  = {
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
          if(req.body.id){
            console.log('update exisitng', req.body.id);
            obj.id = req.body.id;
            let idx = parseInt(req.body.id);
            req.session.data.timeLog[idx] = obj;
          }else{
            obj.id = req.session.data.timeLog.length;
            console.log(req.session.data.timeLog);
            console.log('add new item', obj.id);
            req.session.data.timeLog.push(obj);
          }
        }
        // Attempt to render a page in the current folder
        console.log("------- check-answers ------ ")
        //console.log(req.body);
        console.log(req.session.data.timeLog);
        res.render(base_url + req.params[0] + 'inspector/check-answers', {
          timeLog: req.session.data.timeLog
        })
      })

      router.get('/' + base_url + '*'+ 'inspector/dashboard', function(req, res) {
        console.log("default get routing page for: " + base_url + req.params[0])

        // Attempt to render a page in the current folder
        console.log("------- inspector ------ ")
        console.log(req.body)
        res.render(base_url + req.params[0] + 'inspector/dashboard', {
          tasks
        })
      })

      router.get('/' + base_url + '*' + 'application/create/plant-lookup2', function(req, res) {
        var q = req.query.keyword || "Rosa";
        var eppocode
        var results
        // First get any code for the search
        client.get("https://data.eppo.int/api/rest/1.0/tools/search?kw=" + q + "&searchfor=1&searchmode=3&typeorg=1&authtoken=33b6eb122ffb617bd80ff8f33e191e3c", function(data, response) {
          // parsed response body as js object

          plants = populateResults2(data)
          console.log("------- plants output ------ ")
          console.log(plants)
          console.log("------- end plants output ------ ")
          res.render(base_url + req.params[0] + 'application/create/plant-lookup', {
            "query": req.query,
            "db": plants,
          })
        })



      });

      // **** POST TEMPLATE ***
      router.post('/' + base_url + '*/application/create/commodity-page*', function(req, res) {
        var page = req.query.return_url || '/' + base_url + req.params[0] + '/application/create/commodity-list'
        addCommodity(req.body, req.session.data.commodities)
        res.redirect(301, page);
      })


      // *******************************
      // Global page GET router
      // *******************************

      // this adds query to all pages and will be used if no other get routing exists to override this.
      router.get('/' + base_url + '*', function(req, res) {
        console.log("(dev_v30.js)");
/*         for (item in req.query){
          console.log(item + ": " + req.query[item])
        } */
        console.log("default global GET routing page for: " + base_url +" plus "+ req.params[0])
        var dir = req.params[0].split(/\/+/g);
        // Remove the main folder from URL
        dir.shift()
        var baseDir = ""
        dir.forEach(function(element) {
          var path = "/" + element
          baseDir += path

        })
        //console.log("base dir:", baseDir);
        // clear previous session data if the user has selected commodity and cert type
        if(baseDir==="/setup/what-export"){
          console.log("clearing data")
          req.session.data = {}
        }

        // Attempt to render a page in the current folder
        res.render(base_url + req.params[0], {
          "query": req.query,
        }, function(err, html) {
          // If the page doesnt exist in current folder, attempt to render a page from the "core folder"
          // This reduces space of duplicating the whole folder
          if (err) {
            if (err.message.indexOf('template not found') !== -1) {
              console.log("No page in directory.attempting to load from core")
              return res.render(file_url + baseDir, {
                "query": req.query,
                // and more data to push to every page
              });
            }
            throw err;
          }
          res.send(html);
        });
      })

    }


