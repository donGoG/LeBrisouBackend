module.exports = {
	"pack" : {
		"cache" : "catbox-memory"
	},
	"servers" : [
		{
			"port" : 8081,
			// "host" : "dic.local",
			"options": {
	      "labels": "dictionary-api",
	      "cors": true
	    }
		},
		{
			"port" : 8080,
			"options": {
	      "labels": "dictionary-web",
	    }
		}
	],
	"plugins" : {
		"../../../node_modules/good" : {
			"console" : 											 ["request", "log", "error"],
			
      '/logs/':                      ['request', 'log', 'error'],
      
		},
		"../../../node_modules/lout": { 
			"endpoint": "/docs" 
		},
		"../../../node_modules/tv" : {
		  "endpoint": "/debug/console",
		  "queryKey": "debug"
		},
		"../../../plugins/hapi-winston" : [
			{
				"options" : {
					'level': 'debug',
					'path': __dirname + '/logs',
					'json': true,
					'colorize': true,
					'timestamp': true
				}
			}
		],
		"../../../plugins/hapi-sequelize" : [
			{
				"options" : {
					"ready_timeout": 0,
			    "dialect": "sqlite", // or 'sqlite', 'postgres', 'mariadb'
			    //port:    5432, // or 5432 (for postgres)
			    "storage":  __dirname + '/plugins/dictionary-rdbms/LeBrisou.sqlite',
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
			    },
			    "pool": { "maxConnections": 1, "maxIdleTime": 30}, //currently useless for sqlite maybe in another version
				},
				"select" : ["dictionary-api"]
			}
		],
		"../../../plugins/dictionary-rdbms" : [
			{
				"options" : {
					"drop": true
				},
				"select" : ["dictionary-api"]
			}
		],
		"../../../plugins/dictionary-api" : [
			{
				"select" : ["dictionary-api"],
				"route": {
					"prefix" : "/dic",
					// "vhost" : "dic.local"
				}
			}
		],
		"../../../plugins/dictionary-web" : [
			{
				"select" : ["dictionary-web"]
			}
		],
		
	}
}