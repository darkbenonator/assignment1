/**
 * res.login([inputs])
 *
 * @param {String} inputs.username
 * @param {String} inputs.password
 *
 * @description :: Calls the attemptLogin function on the USer Model and passes the inputs from the login.
 *  if The user is null it will return invalid response and if the user isn't null it returns the succesful redirect and sets the session id to the users id
 */
module.exports = function login(inputs) {
	inputs = inputs || {};
	var req = this.req;
	var res = this.res;
	Users.attemptLogin({
		Username: inputs.Username,
		password: inputs.password,
		Salt : inputs.Salt
	}, 
	function (user) {
		if (!user) {
		  return res.redirect(inputs.invalidRedirect);
		}
		req.session.me = user.userid;
		return res.redirect(inputs.successRedirect);
	});
};



