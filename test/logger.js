var Lab = require("lab")

Lab.experiment("Logger", function() {
	
  Lab.test("Ensure logger is initialized", function(done) {
  	var logger = require('../logger')
	  Lab.assert.isObject(logger, 'logger is an object')
	  Lab.expect(logger).to.not.be.a('null')
	  Lab.assert.isFunction(logger.info, 'logger.info is a function')
	  Lab.assert.isFunction(logger.warn, 'logger.warn is a function')
	  Lab.assert.isFunction(logger.debug, 'logger.debug is a function')
	  Lab.assert.isFunction(logger.error, 'logger.error is a function')

	  done()

	})
})