var Lab = require("lab"),
		Server = require("./test_srv"),
    fixtures = require('./fixtures'),
    headers = require('./fixtures/headers')


Lab.experiment("Get Languages", function() {
  var options = {},
      server,
      delay = 0

  Lab.before(function (done) {
    //don't drop previous inserted data
    
    Server.options[1].options.drop = false

    server = new Server.getServer()

    options.method = 'GET'
    options.headers = headers
    // Wait 1 second
    setTimeout(function () { done() }, 1000)
  })

  Lab.beforeEach(function (done) {
    options = {}
    options.headers = headers
    done()
  })

  
  Lab.test("All Languages", function (done) {
    options.url = '/api/languages'

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result

      
      Lab.expect(result).to.be.Object
      Lab.expect(result.result).to.be.Array
      Lab.expect(result.result.length).to.be.ok
      Lab.expect(result.result[0].createdAt).not.to.be.ok

      setTimeout(done, delay)
    
    })
  })

  Lab.test("All languages with limit", function (done) {
    options.url = '/api/countries?limit=1'

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result

      
      Lab.expect(result).to.be.Object
      Lab.expect(result.result).to.be.Array
      Lab.expect(result.result[0].createdAt).not.to.be.ok
      Lab.expect(result.result.length).to.equal(1)

      setTimeout(done, delay)
    
    })
  })

  Lab.test("All languages extended", function (done) {
    options.url = '/api/languages?extended=true'

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result

      
      Lab.expect(result).to.be.Object
      Lab.expect(result.result).to.be.Array
      Lab.expect(result.result[0].createdAt).to.be.ok
      setTimeout(done, delay)
    
    })
  })

  Lab.test("All languages extended and limit ", function (done) {
    options.url = '/api/languages?extended=true&limit=1'

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result

      
      Lab.expect(result).to.be.Object
      Lab.expect(result.result).to.be.Array
      Lab.expect(result.result[0].createdAt).to.be.ok
      Lab.expect(result.result.length).to.equal(1)
      setTimeout(done, delay)
    
    })
  })


})