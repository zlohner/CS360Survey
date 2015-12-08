var React = require("react")
var ReactRouter = require("react-router");

var $ = require("jquery")

var Link = ReactRouter.Link;

var AccountLogin = React.createClass({
	render: function() {
		return (
			<div className="col-lg-10 col-md-10 col-sm-10 col-lg-offset-1 col-md-offset-1 col-sm-offset-1">
				<center><h1>Survey</h1></center>
				<form className="form-group col-lg-4 col-md-4 col-sm-4 col-lg-offset-2 col-md-offset-2 col-sm-offset-2" id="registerForm" onSubmit={this.onSubmit}>
					<label htmlFor="user">Username:</label>
					<input type="text" className="form-control registerElement" placeholder="username" id="user"/>

					<label htmlFor="pass">Password:</label>
					<input type="password" className="form-control registerElement" placeholder="password" id="pass"/>
					<input type="submit" className="btn btn-success" value="Log In"/> or <Link className="btn btn-default" to="account_register">Sign Up</Link>
					<div className="alert-danger" id="errorMessage"></div>
				</form>
			</div>
		)
	},
	clearErrors: function() {
		$('#errorMessage').hide();
		$('#errorMessage').html('<strong>Oops!</strong><br/>');
	},
	appendError: function(newMsg) {
		$('#errorMessage').html($('#errorMessage').html()+newMsg+'<br/>');
		$('#errorMessage').show();
	},
	componentDidMount: function() {
		this.clearErrors();
		$('#user').focus();
	},
	onSubmit: function(e) {
		this.appendError("actually logging in not implemented")
	}
})

module.exports = AccountLogin
