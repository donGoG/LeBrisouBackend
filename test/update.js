var Lab = require("lab"),
    Server = require("./test_srv"),
    fixtures = require('./fixtures'),
    headers = require('./fixtures/headers')


Lab.experiment("Update", function() {
  var options = {},
      server,
      delay = 0

  Lab.before(function (done) {
    Server.options[1].options.drop = false 
    
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

  Lab.test("Definition", function(done) {
    options = fixtures.load('update/definition', options)

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result
      var payload = options.payload
      
      Lab.expect(result.success).to.be.true
      setTimeout(done, delay)
    
    })
	})

  Lab.test("Definition & Examples", function(done) {
    options = fixtures.load('update/definition-examples', options)

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result
      var payload = options.payload
      
      Lab.expect(result.success).to.be.true
      setTimeout(done, delay)
    
    })
  })

  Lab.test("Definition not Found", function(done) {
    options = fixtures.load('update/unknow-definition', options)

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(20002)

      var result = response.result
      var payload = options.payload
      
      Lab.expect(result.error).to.be.equal('Bad Request')
      setTimeout(done, delay)
    
    })
  })

  Lab.test("Countries", function(done) {
    options = fixtures.load('update/countries', options)

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result
      var payload = options.payload
      
      Lab.expect(result.success).to.be.true
      setTimeout(done, delay)
    
    })
  })

  Lab.test("Hyperlinks", function(done) {
    options = fixtures.load('update/hyperlinks', options)

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result
      var payload = options.payload
      
      Lab.expect(result.success).to.be.true
      setTimeout(done, delay)
    
    })
  })

   Lab.test("Unknow Hyperlinks", function(done) {
    options = fixtures.load('update/unknow-hyperlinks', options)

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(20008)

      var result = response.result
      var payload = options.payload
      
      Lab.expect(result.error).to.be.equal('Bad Request')
      setTimeout(done, delay)
    
    })
  })


  Lab.test("Language", function(done) {
    options = fixtures.load('update/language', options)

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result
      var payload = options.payload
      
      Lab.expect(result.success).to.be.true
      setTimeout(done, delay)
    
    })
  })

  Lab.test("Unknow Language", function(done) {
    options = fixtures.load('update/unknow-language', options)

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(20001)

      var result = response.result
      var payload = options.payload
      
      Lab.expect(result.error).to.be.equal('Bad Request')
      setTimeout(done, delay)
    
    })
  })

  Lab.test("Unknow Synonym", function(done) {
    options = fixtures.load('update/unknow-synonym', options)

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(20004)

      var result = response.result
      var payload = options.payload
      
      Lab.expect(result.error).to.be.equal('Bad Request')
      setTimeout(done, delay)
    
    })
  })

  Lab.test("Synonym", function(done) {
    options = fixtures.load('update/synonym', options)

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result
      var payload = options.payload
      
      Lab.expect(result.success).to.be.true
      setTimeout(done, delay)
    
    })
  })

  Lab.test("Unknow Relatives", function(done) {
    options = fixtures.load('update/unknow-relatives', options)

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(20004)

      var result = response.result
      var payload = options.payload
      
      Lab.expect(result.error).to.be.equal('Bad Request')
      setTimeout(done, delay)
    
    })
  })

  Lab.test("Relatives", function(done) {
    options = fixtures.load('update/relatives', options)

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result

      
      Lab.expect(result.success).to.be.true
      setTimeout(done, delay)
    
    })
  })

  // Lab.test("Unknow Antonym", function(done) {
  //   options = fixtures.load('update/unknow-antonym')

  //   server.inject(options, function(response) {

  //     Lab.expect(response.statusCode).to.equal(20005)

  //     var result = response.result
  //     var payload = options.payload
      
  //     Lab.expect(result.error).to.be.true
  //     setTimeout(done, delay)
    
  //   })
  // })

  // Lab.test("Antonym", function(done) {
  //   options = fixtures.load('update/antonym')

  //   server.inject(options, function(response) {

  //     Lab.expect(response.statusCode).to.equal(200)

  //     var result = response.result
  //     var payload = options.payload
      
  //     Lab.expect(result.success).to.be.true
  //     setTimeout(done, delay)
    
  //   })
  // })
})