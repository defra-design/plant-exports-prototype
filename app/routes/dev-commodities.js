module.exports = function(router) {
  // Load helper functions
  var RestClient = require('node-rest-client').Client;

  var client = new RestClient();
  var client2 = new RestClient()
  var client3 = new RestClient()

  // ADD extra routing here if needed.
  require('./dev_v2-0.js')(router)
  require('./dev_v42.js')(router)
  require('./dev_v41.js')(router)
  require('./dev_v40.js')(router)
  require('./dev_v39.js')(router)
  require('./dev_v38.js')(router)
  require('./dev_v37.js')(router)
  require('./dev_v36.js')(router)
  require('./dev_v35.js')(router)
  require('./dev_v34.js')(router)
  require('./dev_v33.js')(router)

  // CHANGE VERSION each time you create a new version
  const version = 'dev'
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
    // this makes sure a certificate is loaded
    // if (req.query.certificate && req.session.database != req.query.certificate) {
    //   req.session.database = req.query.certificate
    //   req.session.db = tools.getDB(req.query.certificate, db).data
    // }
    // // if the certificate is does not exist get one.
    // req.session.db = req.session.db || tools.getDB(req.session.data.database, db).data
    // req.session.data.is_multiple = req.session.db.is_multiple
    // req.session.data.certificate_code = req.session.db.certificate_code
    next()
  })

  // ** GET template **
  // router.get('/' + base_url + '*/anypage', function(req, res) {
  //   res.render(base_url + req.params[0] + '/anypage', {
  //     "query": req.query
  //   }, function(err, html) {
  //     if (err) {
  //       if (err.message.indexOf('template not found') !== -1) {
  //         return res.render(file_url + '/anypage', {
  //           "query": req.query
  //         });
  //       }
  //       throw err;
  //     }
  //     res.send(html);
  //   })
  // });

  // **** POST TEMPLATE ***
  // router.post('/'+base_url+'*/clone', function(req, res) {
  //     res.redirect(301, '/' + base_url +req.params[0]+'/another page');
  // })
  //
  //
  // router.get('/poc/dev/index', function(req, res) {
  //   console.log("working")
  //   res.render('/poc/dev/index', {
  //     "query": req.query
  //   }, function(err, html) {
  //     if (err) {
  //       if (err.message.indexOf('template not found') !== -1) {
  //         return res.render('poc/dev/index', {
  //           "query": req.query
  //         });
  //       }
  //       throw err;
  //     }
  //     res.send(html);
  //   })
  // });
  function filterResults(r,q) {
    var list = []
    for (var i = 0; i < r.length; i++) {
      console.log("checking: "+r[i].lang)
      if(r[i].lang=='en'){
        console.log('pushing '+r[i].fullname.toUpperCase())
        list.push(r[i])
      }
      if((r[i].fullname.toUpperCase() == q.toUpperCase()) && r[i].lang == "en"){
        list = []
        list.push(r[i])
        console.log('found match '+r[i].fullname.toUpperCase())
        console.log('returning the one result')
        return list

      }
    }
    console.log('returning the full list')
    return list
  }
  router.get('/' + base_url + '*' + 'application/create/plant-lookup', function(req, res) {
    var q = req.query.keyword || "Rosa";
    var eppocode
    var results
    // First get any code for the search
      client.get("https://data.eppo.int/api/rest/1.0/tools/search?kw=" + q + "&searchfor=1&searchmode=3&typeorg=1&authtoken=33b6eb122ffb617bd80ff8f33e191e3c", function(data, response) {
      // parsed response body as js object

      if (data.length == 0) {
        res.render(base_url + req.params[0] + 'application/create/plant-lookup', {
          "query": req.query,
          "search_data": "none",
          "toplevel": "none",
          "taxonomy": "none"
        })
      } else {
        client3.get("https://data.eppo.int/api/rest/1.0/tools/search?kw=" + data[0].eppocode + "&searchfor=1searchmode=3typeorg=1&authtoken=33b6eb122ffb617bd80ff8f33e191e3c", function(newdata, response) {
          if (newdata.length == 0) {
            res.render(base_url + req.params[0] + 'application/create/plant-lookup', {
              "query": req.query,
              "search_data": newdata,
              "toplevel": "none",
              "taxonomy": "none"
            })
          } else {
            eppocode = newdata[0].eppocode
            results = filterResults(newdata,q)
            console.log(newdata)
            client2.get("https://data.eppo.int/api/rest/1.0/taxon/" + eppocode + "/taxonomy?authtoken=33b6eb122ffb617bd80ff8f33e191e3c", function(taxdata, response) {
              // console.log(taxdata);
              var toplevel = "species"
              if (taxdata.length != 0) {
                if (taxdata[taxdata.length - 1].eppocode.includes("1")) {
                  toplevel = "Genus"
                }
              }
              res.render(base_url + req.params[0] + 'application/create/plant-lookup', {
                "query": req.query,
                "search_data": results,
                "toplevel": toplevel,
                "taxonomy": taxdata
              })
            })

          }

        })
      }
    })

  });

  // **** POST TEMPLATE ***
  router.post('/' + base_url + '*/application/create/commodity-page*', function(req, res) {
    var page = req.query.return_url || '/' + base_url + req.params[0] + '/application/create/commodity-list'
    addCommodity(req.body, req.session.data.commodities)
    res.redirect(301, page);
  })

  // **** Apply to how to identify for seeds, grain, plants and fresh produce and plant products ***
  router.post('/' + base_url + '*/application/create/how-to-identify*', function(req, res) {
    var page = req.query.return_url || '/' + base_url + req.params[0] + '/application/create/commodity-list'
    addCommodity(req.body, req.session.data.commodities)
    res.redirect(301, page);
  })

  // **** GSI specific ***
  router.post('/' + base_url + '*/application/gsi/create/commodity-page*', function(req, res) {
    var page = req.query.return_url || '/' + base_url + req.params[0] + '/application/gsi/create/commodity-list'
    addCommodity(req.body, req.session.data.commodities)
    res.redirect(301, page);
  })

  router.post('/' + base_url + '*/application/gsi/create/how-to-identify*', function(req, res) {
    var page = req.query.return_url || '/' + base_url + req.params[0] + '/application/gsi/create/commodity-list'
    addCommodity(req.body, req.session.data.commodities)
    res.redirect(301, page);
  })

  // **** Soil sampling specific ***
  router.post('/' + base_url + '*/application/soil/create/commodity-page*', function(req, res) {
    var page = req.query.return_url || '/' + base_url + req.params[0] + '/application/soil/create/commodity-list'
    addCommodity(req.body, req.session.data.commodities)
    res.redirect(301, page);
  })

  router.post('/' + base_url + '*/application/soil/create/how-to-identify*', function(req, res) {
    var page = req.query.return_url || '/' + base_url + req.params[0] + '/application/soil/create/commodity-list'
    addCommodity(req.body, req.session.data.commodities)
    res.redirect(301, page);
  })

  // *******************************
  // Global page GET router
  // *******************************

  // this adds query to all pages and will be used if no other get routing exists to override this.
  router.get('/' + base_url + '*', function(req, res) {
    console.log("default get routing page for: " + base_url + req.params[0])
    var dir = req.params[0].split(/\/+/g);
    // Remove the main folder from URL
    dir.shift()
    var baseDir = ""
    dir.forEach(function(element) {
      var path = "/" + element
      baseDir += path

    })
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
