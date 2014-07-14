var Hapi = require('hapi')

module.exports = function(){
	var server = new Hapi.Server('localhost', 8000);
	server.pack.register([
    
    require('../plugins/dictionary-api'),
  ], function (err) {

	   if (err) {
	       console.log('Failed loading plugin');
	   }
	});

	return server

}