module.exports = function(app){
	//express
	
	var authController = require('./../controller/api/authController')
	
	app.route('/api/auth/')
	.get(authController.status);
	
	var userController = require('./../controller/api/userController')
	
	app.route('/api/user/login')
	.post(userController.login);
	
	
	var countController = require('./../controller/api/countController')
	app.route('/api/count/')
	.get(countController.getAll);
	app.route('/api/count/latest')
	.get(countController.getLatest);
	app.route('/api/count/check')
	.get(countController.check);
	app.route('/api/count/:date')
	.get(countController.getByDate);
	
	console.log('Default Router Applied')
}
/*var router = express.Router()

router.get('/', function (req, res) {
	res.send('Hello World!');
});
router.get('/api/user/login', function (req, res) {
	res.send('Hello World!');
});

router.get('/router/',function(req,res){

})


module.exports = router*/
