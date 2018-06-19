var mysql = require('mysql')
var config = require('./../../config')
var con = mysql.createConnection(config.mysql)
var md5 = require('md5')
exports.login = function(req,res){
	var data = req.body
		if (data.user && data.password){
		con.query('SELECT * FROM staff WHERE username = ?', [data.user],function(err,result){
		console.log(result)
			if (result[0].password == md5(data.password)){
				req.session.user = data.user
				req.session.auth = md5(data.user)
				if (req.query.redirect){
					res.redirect(req.query.redirect)
				}else{
					res.send("OK")
				}
			}
			else{
				res.status(403).send("Not Auth")
			}

		})
	}else{
		res.status(401).send("Bad Request")
	}
}
