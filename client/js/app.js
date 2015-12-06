var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;

//location.href='#home'
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
							<a className="navbar-brand" href="#home">Survey</a>
						</div>
						<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
							<ul className="nav navbar-nav">
								<li><Link to="create">create</Link></li>
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
			<div className="col-lg-10 col-md-10 col-sm-10 col-lg-offset-1 col-md-offset-1 col-sm-offset-1">
				<center><h1>Account Registration</h1></center>
				<form className="form-group col-lg-4 col-md-4 col-sm-4 col-lg-offset-2 col-md-offset-2 col-sm-offset-2" id="registerForm" onSubmit={this.onSubmit}>
					<label htmlFor="user">Username:</label>
					<input type="text" className="form-control registerElement" placeholder="username" id="user"/>

					<label htmlFor="pass">Password:</label>
					<input type="password" className="form-control registerElement" placeholder="password" id="pass"/>

					<label htmlFor="passConfirm">Confirm Password:</label>
					<input type="password" className="form-control registerElement" placeholder="password again" id="passConfirm"/>

					<input type="submit" className="btn btn-success" value="Sign Up"/>
				</form>
			</div>
		);
    }, 
    onSubmit:function(e) {
        e.preventDefault();
        var user = $('#user').val();
        var pass1 = $('#pass').val();
        var pass2 = $('#passConfirm').val(); 
        if (pass1 != pass2) {
            $('#pass, #passConfirm').addClass("alert-danger").val('');
            alert("Passwords don't match"); 
        } else if (pass1.length == 0) {
            $('#pass, #passConfirm').addClass("alert-danger").val('');
            alert("Password cannot be empty");
        } else {
            $('#user,#pass, #passConfirm').removeClass("alert-danger");
            $.ajax({
                url: '/api/account',
                dataType: 'json',
                type: 'POST',
                data: {
                    username: user,
                    password: pass1
                }
            }); 
            alert("created");
        } 
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

