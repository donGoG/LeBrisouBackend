var Lab = require("lab"),
		Server = require("./test_srv"),
    fixtures = require('./fixtures'),
    headers = require('./fixtures/headers')

Lab.experiment("Path", function() {
  var options = {}, 
      server,
      delay = 0

  Lab.before(function (done) {
    server = new Server.getServer()

    options.headers = headers
    // Wait 1 second
    setTimeout(function () { done() }, 1000)
  })

  Lab.beforeEach(function (done) {
    options = {}
    options.headers = headers
    done()
  })

  // Lab.test("Authentication Error", function (done) {
  //   options = fixtures.load('path/methodForbidden')

  //   server.inject(options, function(response) {

  //     Lab.expect(response.statusCode).to.equal(401)

  //     setTimeout(done, delay)
    
  //   })
  // })

  Lab.test("notFound error", function (done) {
    options = fixtures.load('path/notFound', options)

    server.inject(options, function(response) {
      
      Lab.expect(response.statusCode).to.equal(404)

      setTimeout(done, delay)
    
    })
	})

  // Lab.test("methodForbidden error", function (done) {
  //   options = fixtures.load('path/methodForbidden', options)

  //   server.inject(options, function(response) {
  //     console.log(response)

  //     Lab.expect(response.statusCode).to.equal(400)

  //     setTimeout(done, delay)
    
  //   })
  // })
})

