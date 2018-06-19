module.exports = function(){
	var localStrategy = new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      },function(username,password,done){
		
	user = users[ username ];
 
      if ( user == null ) {
        return done( null, false, { message: 'Invalid user' } );
      };
 
      if ( user.password !== password ) {
        return done( null, false, { message: 'Invalid password' } );
      };
 
      done( null, user );
	})
}
