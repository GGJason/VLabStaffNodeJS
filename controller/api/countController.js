var config = require('./../../config.js')
var mysql = require('mysql')
var con = mysql.createConnection(config.mysql)

exports.getAll = function(req,res){
	con.connect(function(err){
		if (err) throw err;
		
		con.query("SELECT * FROM count",function(err,result){
			if (err) throw err;
			
			res.send(result);
		})
	})
	
}
exports.getByDate = function(req,res){
	con.query("SELECT * FROM count WHERE date = ?",[req.params.date],function(err,result){
		if (err) throw err;
		
		if (result.length == 1){
			
			res.send(result[0].count);
		}else{
		 	res.send('No Record');
		}
		
	})
	
}


exports.getLatest = function(req,res){
	con.query("SELECT * FROM count WHERE 1 ORDER BY date DESC",[req.params.date],function(err,result){
		if (err) throw err;
		
		if (result.length > 0){
			res.send(result[0]);
		}else{
		 	res.send({date:'No Record'});
		}
		
	})
	
}
exports.check = function(req,res){
	con.query("SELECT MAX(date) AS date FROM count ",function(err,result){
	
		if (err) throw err;
		
		if (result.length > 0){
			res.send(result[0]);
		}else{
		 	res.send({date:'No Record'});
		}
	})

}

