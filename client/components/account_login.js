var React = require("react")
var ReactRouter = require("react-router")

var $ = require("jquery")

var Link = ReactRouter.Link

var AccountLogin = React.createClass({
	render: function() {
		if ($.cookie("username"))
			location.href = "#survey_list"
		
		return (
			<div className="panel panel-default col-lg-6 col-md-6 col-lg-offset-3 col-md-offset-3">
				<div className="panel-heading">
					<h1 className="panel-title">Login</h1>
				</div>
				<div className="panel-body">
					<form className="form-group" id="loginForm" onSubmit={this.onSubmit}>
						<div className="input-group registerElement">
								<span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
								<input type="text" className="form-control" placeholder="username" id="user"/>
						</div>
						<div className="input-group registerElement">
							<span className="input-group-addon"><i className="glyphicon glyphicon-asterisk"></i></span>
							<input type="password" className="form-control" placeholder="password" id="pass"/>
						</div>
						<input type="submit" className="btn btn-primary" value="Log In"/> or <Link className="btn btn-default" to="account_register">Sign Up</Link>
						<div className="alert-danger" id="errorMessage"></div>
					</form>
				</div>
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
					location.href='#survey_list'
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
