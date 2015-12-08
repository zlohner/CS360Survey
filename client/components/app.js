var React = require("react")
var ReactRouter = require("react-router")
var History = ReactRouter.History

var $ = require('jquery')
require("../../node_modules/jquery.cookie/jquery.cookie.js")  

var App = React.createClass({
	render: function() {
		return (
			<div>
				<nav className="navbar navbar-inverse" role="navigation">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<a className="navbar-brand" href="/">Survey</a>
						</div>
						<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
							<ul className="nav navbar-nav">
								<li><a href="#/account_register">account</a></li>
								<li><a href="#/survey_edit">create</a></li>
							</ul>
							<ul className="nav navbar-nav pull-right" id="loginButton">
									<li><a href="" onClick={this.handleLoginStatus} id="loginStatus">{this.getLoginStatus()}</a></li>
							</ul> 
						</div>
					</div>
				</nav>

				<div className="container">
					{this.props.children}
				</div>
			</div>
		);
	},
	getLoginStatus: function() {
		var userCookie = $.cookie('username')
		if(userCookie) {
				return 'logout'
		} else {
				return 'login' 
		}

	},
	handleLoginStatus: function() {
		if(this.getLoginStatus() == 'login') {
				location.href = '#'
		} else if(this.getLoginStatus() == 'logout') {
				$.removeCookie('auth')
				$.removeCookie('username') 
				location.href = '#' 
		}  
		
		$('#loginStatus').html(this.getLoginStatus()) 
	} 
});

module.exports = App
