var React = require("react")
var ReactRouter = require("react-router")
var History = ReactRouter.History
var Link = ReactRouter.Link

var $ = require('jquery')
require("../../node_modules/jquery.cookie/jquery.cookie.js")

var App = React.createClass({
	render: function() {
		var navLeft = []
		var navRight = []
		var i = 0

		if (this.checkLoggedIn()) {
			navLeft.push(
				<li key={i++}><Link to="survey_list">my surveys</Link></li>
			)
			navLeft.push(
				<li key={i++}><Link to="survey_respond">respond</Link></li>
			)
			navRight.push(
				<li key={i++}><a>welcome, {$.cookie('username')}</a></li>
			)
			navRight.push(
				<li key={i++}><Link to="account_login" onClick={this.handleLogout}>logout</Link></li>
			)
		} else {
			navLeft.push(
				<li key={i++}><Link to="survey_respond">respond</Link></li>
			)
			navRight.push(
				<li key={i++}><Link to="account_register">register</Link></li>
			)
			navRight.push(
				<li key={i++}><Link to="account_login">login</Link></li>
			)
		}

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
							<a className="navbar-brand" href="#">Home</a>
						</div>
						<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
							<ul className="nav navbar-nav">
								{navLeft}
							</ul>
							<ul className="nav navbar-nav pull-right" id="loginButton">
								{navRight}
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
	checkLoggedIn: function() {
		var userCookie = $.cookie('username')
		if(userCookie) {
			return true
		} else {
			return false
		}

	},
	handleLogout: function() {
		$.removeCookie('auth')
		$.removeCookie('username')
		location.href = '#'
	}
});

module.exports = App
