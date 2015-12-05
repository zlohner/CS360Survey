var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;

var App = React.createClass({
	render: function() {
		return (
			<div>
				<nav className="navbar navbar-default" role="navigation">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<a className="navbar-brand" href="*">Survey</a>
						</div>
						<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
							<ul className="nav navbar-nav">
								<li><Link to="create">create</Link></li>
							</ul>
							<ul className="nav navbar-nav">
								<li><Link to="account">account</Link></li>
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

var Home = React.createClass({
	render: function() {
		return (
			<div>
				<h1>Home</h1>
				<p>Put your home page here</p>
			</div>
		);
	}
});

var Create = React.createClass({
	render: function() {
		return (
			<div>
				<h1>Create</h1>
				<p>Create a survey here</p>
			</div>
		);
	}
});

var Account = React.createClass({
	render: function() {
		return (
			<div>
				<h1>Account</h1>
				<p>Create an account here</p>
			</div>
		);
	}
})

// Run the routes
var routes = (
	<Router>
		<Route name="app" path="/" component={App}>
			<Route name="create" path="/create" component={Create} />
			<Route name="account" path="/account" component={Account} />
			<Route path="*" component={Home}/>
		</Route>
	</Router>
);

ReactDOM.render(routes, document.body);
