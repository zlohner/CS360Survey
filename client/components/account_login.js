var React = require("react")
var ReactRouter = require("react-router")

var $ = require("jquery")

var Link = ReactRouter.Link

var AccountLogin = React.createClass({
	render: function() {
		return (
			<div className="col-lg-10 col-md-10 col-sm-10 col-lg-offset-1 col-md-offset-1 col-sm-offset-1">
				<center><h1>Survey</h1></center>
				<form className="form-group col-lg-4 col-md-4 col-sm-4 col-lg-offset-2 col-md-offset-2 col-sm-offset-2" id="registerForm" onSubmit={this.onSubmit}>
					<label htmlFor="user">Username:</label>
					<div className="input-group registerElement">
							<span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
							<input type="text" className="form-control" placeholder="username" id="user"/>
					</div>
					<label htmlFor="pass">Password:</label>
					<div className="input-group registerElement">
						<span className="input-group-addon"><i className="glyphicon glyphicon-asterisk"></i></span>
						<input type="password" className="form-control" placeholder="password" id="pass"/>
				  </div>
					<input type="submit" className="btn btn-success" value="Log In"/> or <Link className="btn btn-default" to="account_register">Sign Up</Link>
					<div className="alert-danger" id="errorMessage"></div>
				</form>
			</div>
		)
	},
	clearErrors: function() {
		$('#errorMessage').hide()
		$('#errorMessage').html('<strong>Oops!</strong><br/>')
	},
	appendError: function(newMsg) {
		$('#errorMessage').html($('#errorMessage').html()+newMsg+'<br/>')
		$('#errorMessage').show()
	},
	componentDidMount: function() {
		this.clearErrors()
		$('#user').focus()
	},
	onSubmit: function(e) {
		e.preventDefault()
		this.clearErrors()
		var user = $('#user').val()
		var pass = $('#pass').val()
		var errors = false
		$('#user,#pass, #passConfirm').removeClass('alert-danger')
		$.ajax({
			url: '/api/account/login',
			dataType: 'applicat/json',
			type: 'POST',
			data: {
				username: user,
				password: pass
			},
			complete: function(xhr, statusText){
				var statusCode = xhr.status
				switch(statusCode) {
					case 200:
					//Log user in
					$('#loginStatus').html('logout')
					location.href='#survey_edit'
					break

					case 404:
					$('#user').focus()
					$('#user').addClass('alert-danger')
					$('#errorMessage').html($('#errorMessage').html()+'Invalid Username or Password')
					$('#errorMessage').show()
					break

					case 401:
					$('#pass').focus()
					$('#pass').addClass('alert-danger')
					$('#errorMessage').html($('#errorMessage').html()+'Invalid Username or Password')
					$('#errorMessage').show()
					break
				}
			}
		})
	}
})

module.exports = AccountLogin
