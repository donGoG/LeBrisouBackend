var	Promise = require('bluebird'),
		assert = require("assert"),
		XLSX = require('xlsx'),
		fs = require('fs')

var internals = {}


internals.options = {
	cellStyles: true,
	bookDeps: true,
	write: false
}

internals.toJson = function(workbook){
	var result = {};
	workbook.SheetNames.forEach(function(sheetName) {
		var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
		if(roa.length > 0){
			result[sheetName] = roa;
		}
	});
	return result;
}

internals.getWorkBook = function (filename, options){
	var workbook = XLSX.readFile(filename, options)
	var json_workbook = internals.toJson(workbook)
	if(options.write){
		fs.writeFile(__dirname + '/output/excel_dump.json', JSON.stringify(json_workbook) , {}, function(err){
			if(err) throw err
			console.log('It \'s saved !')
		})
	}

	return json_workbook
}

	
internals.next = function (cell){
	var options = {
			'headers': {
				'Content-Type': 'application/json',
				'X-CSRFToken': 'RD8X6VV8V8WgBgRit7NLlwtLfH73Kcvz',
				'Authorization': 'Basic dGVzdDp0ZXN0'
			},
			'method': 'PUT',
		  'url': '/api'
			},
			word = {}

	if(!cell.LEMA || !cell.POS ){
		return Promise.resolve()
	}

	word.lema = cell.LEMA
	word.pos = cell.POS

	//if no definition continue
	var index = 1
	if(!cell['DEF' + index]){
		return Promise.resolve()
	}

	word.definitions = []
	
	do {
		var _def = {}
		
		_def.definition = cell['DEF' + index].toString().replace(/\"/g,'""')
		
		if(cell['EX' + index]){
			_def.examples = []

			var _ex = cell['EX' + index]
			if(_ex.toString().indexOf('"')){
				_ex = _ex.toString().replace(/\"/g,'""')
			}

			_def.examples.push(_ex)
		}
		word.definitions.push(_def)
		index++;
	} while(cell['DEF'+index])


	/*Add Extra information required to insert any word 
	* IT WILL HAVE TO APPEAR IN THE EXCEL FILE */
	word.countries = []
	var _country = {}
	_country.country = 'Spain'
	word.countries.push(_country)

	word.language = 'Spanish'

	/* END IMPORTANT DATA */

	options.payload = word

	return Promise.resolve({payload : word})

}


var Https = require('https')


internals.inject = function(connector, workbook, sheets) {
	var options = {
	  hostname: '127.0.0.1',
	  port: 8081,
	  path: '/api',
	  method: 'PUT',
	  rejectUnauthorized: false,
    requestCert: true,
	  agent:false
	};
	for (var i = 0; i < sheets.length; i++){
		var sheet = workbook[sheets[i]];
	
		Promise.reduce(sheet, function(cb, cell){
			return internals.next(cell)
			.delay(1000)
			.then(function(args){
				
				if(!args) return
		    
		    return new Promise(function(resolve, reject){
		    	var req = Https.request(options, function(response) {
		        try {
							assert.equal(response.statusCode, 200, "response.statusCode = 200")
						} catch(err){
							resolve()
							console.error(args.payload + ' generated ' + err.message )
						}
	          
	          resolve()
	        })

	        req.write(JSON.stringify(args.payload))
	        req.end()


	        // Handle errors
	        req.on('error', function(error) {
	          console.log('Problem with request:', error.message)
	          reject(error)
	        })

	        
				})
			})
			.then(function(){
				console.log('Cell inserted')
			})
		})
	}
}

exports.register  = function(plugin, options, next){
	if(!options.inject){
		plugin.log(['dictionary-parser'], 'Not Processing Input files, Go on !')
		return next()
	}

	if(!options.input || !options.output || !options.sheets){
		plugin.log(['dictionary-parser', 'error'], 'input, output and sheets to parse required')
	}


	var workbook = internals.getWorkBook(options.input, internals.options),
			server = plugin.select('dictionary-api')
	
	
	plugin.events.once('start', function () {
		setTimeout( function(){
			internals.inject(server, workbook, options.sheets)
		}, 1000)	
	})
		
	next()
}, {
	after: 'dictionary-rdbms'
}

exports.register.attributes = {
  name: 'dictionary-parser',
  pkg: require('./package.json')
}
