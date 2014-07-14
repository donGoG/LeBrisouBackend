module.exports = {
	load : function (file, options) {
		var temp = options || {}
		
		var options = JSON.parse( require('fs').readFileSync( __dirname + '/' + file + '.json', 'utf8'))
		
    for(var i in temp) {
       options[i] = temp[i]
    }
		return options
	}
}