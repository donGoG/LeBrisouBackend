var Lab = require("lab"),
		Server = require("./test_srv"),
    fixtures = require('./fixtures'),
    headers = require('./fixtures/headers')


Lab.experiment("Add", function() {
  var options = {},
      server,
      delay = 0

  Lab.before(function (done) {
    server = new Server()

    // Wait 1 second
    setTimeout(function () { done() }, 5000)
  })

  Lab.beforeEach(function (done) {
    options = {}
    options.headers = headers
    done()
  })

  Lab.test("Ensure Correct word insertion without optional params", function (done) {
    options = fixtures.load('add/success-partial', options)

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result

      
      Lab.expect(result.success).to.be.true
      setTimeout(done, delay)
    
    })
  })

  Lab.test("Ensure Correct word insertion with all params", function (done) {
    options = fixtures.load('add/success', options)

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result
      var payload = options.payload
      
      Lab.expect(result.success).to.be.true
      setTimeout(done, delay)
    
    })
	})

  

  Lab.test("Raise Unknow Language", function (done) {
    options = fixtures.load('add/unknow-language', options)

    server.inject(options, function(response) {
      

      Lab.expect(response.statusCode).to.equal(20001)

      var result = response.result
      
      Lab.expect(result.message).to.equal("Unknown Language")

      setTimeout(done, delay)
    
    })
  })

  Lab.test("Raise Unknow Country", function (done) {
    options = fixtures.load('add/unknow-country', options)

    server.inject(options, function(response) {
      

      Lab.expect(response.statusCode).to.equal(20003)

      var result = response.result
      
      Lab.expect(result.message).to.equal("Unknown Country")

      setTimeout(done, delay)
    
    })
  })

  Lab.test("Raise duplicate hyperlink", function (done) {
    options = fixtures.load('add/duplicate-hyperlink', options)

    server.inject(options, function(response) {
      

      Lab.expect(response.statusCode).to.equal(19)

      var result = response.result
      
      setTimeout(done, delay)
    
    })
  })

  Lab.test("Raise duplicate definition", function (done) {
    options = fixtures.load('add/duplicate-definition', options)

    server.inject(options, function(response) {
      

      Lab.expect(response.statusCode).to.equal(19)

      var result = response.result
      

      setTimeout(done, delay)
    
    })
  })

  Lab.test("Raise unknow synonym", function (done) {
    options = fixtures.load('add/unknow-synonym', options)

    server.inject(options, function(response) {
      

      Lab.expect(response.statusCode).to.equal(20004)

      var result = response.result
      

      setTimeout(done, delay)
    
    })
  })

  Lab.test("Raise unknow antonym", function (done) {
    options = fixtures.load('add/unknow-antonym', options)

    server.inject(options, function(response) {
      

      Lab.expect(response.statusCode).to.equal(20005)

      var result = response.result
      

      setTimeout(done, delay)
    
    })
  })


  Lab.test("Raise unknow field", function (done) {
    options.method = "POST",
    options.url = '/add',
    options.payload = {
        word: "bonjour",
      }
    

    server.inject(options, function(response) {
      

      Lab.expect(response.statusCode).to.equal(400)

      var result = response.result

      setTimeout(done, delay)
    
    })
  })


})