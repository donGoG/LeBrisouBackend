var Hapi = require('hapi'),
		server,
		options





module.exports = (function(){
	if(server){
		return {
			options : options,
		  server: server 
		}
	}

	options = [
			{
				'plugin': require('../plugins/hapi-sequelize'),
				'options' : {
	    		'dialect': 'sqlite',
	    		"storage":  __dirname + '/test.sqlite',
	    		"logging": false,//console.log
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
	  ]

	
	function getServer(){
		if(server){
			server.stop()
		}
		server = new Hapi.Server('localhost', 8000);

		server.pack.register(options, {
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
		})
		return server
	}

	return {
		options : options,
	  getServer: getServer 
	}
		
}())