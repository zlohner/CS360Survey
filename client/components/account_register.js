var React = require("react")
var ReactRouter = require("react-router")

var $ = require("jquery")

var Link = ReactRouter.Link

var account_register = React.createClass({
	render: function() {
		if ($.cookie("username"))
			location.href = "#survey_list"
		
		return (
			<div className="panel panel-default col-lg-6 col-md-6 col-lg-offset-3 col-md-offset-3">
				<div className="panel-heading">
					<h1 className="panel-title">Register</h1>
				</div>
				<div className="panel-body">
					<form className="form-group" id="registerForm" onSubmit={this.onSubmit}>
						<div className="input-group registerElement">
							<span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
							<input type="text" className="form-control" placeholder="username" autocomplete="off" id="user"/>
						</div>
						<div className="input-group registerElement">
								<span className="input-group-addon"><i className="glyphicon glyphicon-asterisk"></i></span>
								<input type="password" className="form-control" placeholder="password" autocomplete="off" id="pass"/>
						</div>
						<div className="input-group registerElement">
								<span className="input-group-addon"><i className="glyphicon glyphicon-asterisk"></i></span>
								<input type="password" className="form-control" placeholder="confirm password" autocomplete="off" id="passConfirm"/>
						</div>
						<input type="submit" className="btn btn-primary" value="Sign Up"/> or <Link className="btn btn-default" to="account_login">Log In</Link>
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
	onSubmit:function(e) {
		e.preventDefault()
		this.clearErrors()
		var user = $('#user').val()
		var pass1 = $('#pass').val()
		var pass2 = $('#passConfirm').val()
		var errors = false
		$('#user,#pass, #passConfirm').removeClass('alert-danger')

		if (pass1 != pass2) {
			$('#pass, #passConfirm').addClass('alert-danger').val('')
			$('#pass').focus()
			this.appendError('Passwords do not match')
			errors = true
		}
		if (pass1.length == 0) {
			$('#pass, #passConfirm').addClass('alert-danger').val('')
			this.appendError('Password cannot be empty')
			errors = true
		}
		if (user.length == 0) {
			$('#user').addClass('alert-danger')
			this.appendError('Username cannot be empty')
			$('#user').focus()
			errors = true
		}
		if (!errors) {
			$('#user,#pass, #passConfirm').removeClass('alert-danger')
			$.ajax({
				url: '/api/account',
				dataType: 'json',
				type: 'POST',
				data: {
					username: user,
					password: pass1
				},
				complete: function(xhr, statusText){
					var statusCode = xhr.status
					switch(statusCode) {
						case 200:
						//Redirect to home for now
						location.href='#survey_edit'
						break

						case 409:
						$('#user').focus()
						$('#user').addClass('alert-danger')
						$('#errorMessage').html($('#errorMessage').html()+'Username is already in use')
						$('#errorMessage').show()
						break
					}
				}
			})
		}
	}
})

module.exports = account_register
