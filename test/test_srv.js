var Hapi = require('hapi'),
		server

module.exports = function(){
	if(server){
		return server
	}
	
	server = new Hapi.Server('localhost', 8000);
	server.pack.register([
		{
			'plugin': require('../plugins/hapi-sequelize'),
			'options' : {
    		'dialect': 'sqlite',
    		"storage":  __dirname + '/test.sqlite',
    		"logging": false
    	}
		},
    {
    	'plugin': require('../plugins/dictionary-rdbms'),
    	"options" : {
				"drop": true,
				'sync': {'force': true }
			}
		},
    {
    	'plugin': require('../plugins/dictionary-api'),
		},
		{
    	'plugin': require('../plugins/dictionary-error'),
		},
  ], {
  	'route': {
			'prefix': '/api'
		}
  }, function (err) {
	   if (err) {
	       console.log('Failed loading plugin');
	   }
	});

	server.start(function(err){
		if(err){
			console.log('Error ', err)
			process.exit(1)
		}
		console.log('Server Ready')
	})

	return server
	

}