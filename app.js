var next = function(err, pack){
	var stop = function(err){
	  if(err){
	  	console.log(err)
	    pack.log(['error'], err.stack)
	  }
	  pack.stop(function(){
	    pack.log(['info'], 'Hapi servers going to sleep')  
	    process.exit(1)
	  })
	}

	process.on('SIGTERM', stop)
  process.on('SIGINT', stop)
  process.on('uncaughtException', stop)

  

 	pack.start(function(err){
		pack.log(['info'], 'Servers started')
	})
}

var Hapi = require('hapi'),
		manifest = require('./manifest')

new Hapi.Pack.compose(
	manifest,
	
	{ pack : { requirePath : __dirname }},

	next
)