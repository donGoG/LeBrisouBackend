var Lab = require("lab"),
		Server = require("./test_srv"),
    fixtures = require('./fixtures'),
    headers = require('./fixtures/headers')


Lab.experiment("Get Random Word", function() {
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

    
  

  Lab.test("Random word", function (done) {
    options.url = '/api/word/random'

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result

      
      Lab.expect(result).to.be.Object
      Lab.expect(result.result).to.be.Object
      Lab.expect(result.result.createdAt).not.to.be.ok
      Lab.expect(result.result.id).to.be.ok

      setTimeout(done, delay)
    
    })
  })

  Lab.test("Random Word and extended", function (done) {
    options.url = '/api/word/random?extended=true'

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result

      
      Lab.expect(result).to.be.Object
      Lab.expect(result.result).to.be.Object
      Lab.expect(result.result.createdAt).to.be.ok
      setTimeout(done, delay)
    
    })
  })

})