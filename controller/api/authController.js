var md5 = require('md5')
exports.check = function(){

	if (req.session.user && req.session.auth){
	
		if ( md5(req.session.user) == req.session.auth){
			return true
		}else{
			return false
		}
	}else{
		return false
	}
}
exports.status = function(req,res){
	console.log(req.session)
	if (req.session.user && req.session.auth){
	
		if ( md5(req.session.user) == req.session.auth){
			res.send("OK")
		}else{
			res.status(403).send("Not Auth")
		}
	}else{
		res.status(403).send("Not Auth")
	}
}
