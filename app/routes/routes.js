module.exports = function(router) {
  // Load helper functions

  // ADD extra routing here if needed.
  // require('./start-page.js')(router)

  // CHANGE VERSION each time you create a new version
  const version = 'alpha1'
  const base_url = version + "/"
  const file_url = version + "/dev"

  // Load any certificate within "app/data/certificates" folder
  const db = []

  // MIDDLEWARE: Called every time a page is rendered
  router.use(function(req, res, next) {
    console.log("(app/routes/routes.js) working")
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

  // *******************************
  // Global page GET router
  // *******************************

  // this adds query to all pages and will be used if no other get routing exists to override this.
  router.get('/' + base_url + '*', function(req, res) {
    console.log("app/routes.js")
    console.log("default get routing page for: " + base_url + req.params[0])
    // Attempt to render a page in the current folder
    res.render(base_url + req.params[0], {
      "query": req.query,
    });
  })

}
