var Hapi = require('hapi'),
		server

module.exports = function(){
	if(server){
		return server
	}
	
	server = new Hapi.Server('localhost', 8000);
	server.pack.register([
		{
			'plugin': require('../plugins/hapi-winston'),
			"options" : {
				'level': 'debug',
				'path': __dirname + '/logs',
				'json': false,
				'colorize': true,
				'timestamp': true
			}
		},
		{
			'plugin': require('../plugins/hapi-sequelize'),
			"options" : {
		    "dialect": "sqlite", // or 'sqlite', 'postgres', 'mariadb'
		    //port:    5432, // or 5432 (for postgres)
		    "storage":  __dirname + '/../plugins/dictionary-rdbms/LeBrisou.sqlite',
		    "sync": { "force" : true },
		    "logging": console.log,
		    "maxConcurrentQueries": 1,
		    "native": true,
		    "define": {
		      "underscored": false,
		      "freezeTableName": false,
		      "syncOnAssociation": true,
		      "charset": 'utf8',
		      "collate": 'utf8_general_ci',
		      // classMethods: {method1: function() {}},
		      // instanceMethods: {method2: function() {}},
		      "timestamps": true
		    }
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
  ], {
  	'route': {
			'prefix': '/api'
		}
  }, function (err) {
	   if (err) {
	       console.log('Failed loading plugin');
	   }
	});

	// server.start(function(err){
	// 	if(err){
	// 		console.log('Error ', err)
	// 		process.exit(1)
	// 	}
	// 	console.log('Server Ready')
	// })

	return server
	

}