exports.home = function(req,res){
	if (req.session.login == true){
		res.redirect()
	}else{
		res.redirect(302,'')
	}
}
