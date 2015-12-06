var React = require("react")
var ReactRouter = require("react-router")
var History = ReactRouter.History

var app = React.createClass({
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
								<li><a href="#/survey_create">create</a></li>
								<li><a href="#/account_register">account</a></li>
							</ul>
						</div>
					</div>
				</nav>

				<div className="container">
					{this.props.children}
				</div>
			</div>
		);
	}
});

module.exports = app
