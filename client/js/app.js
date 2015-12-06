var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;

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

var registerErrorHtml = '<strong>Oops!<br/></strong>'; 

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
                     
                    <div className="alert-danger" id="errorMessage"></div>  
				</form>
			</div>
		);
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
    onSubmit:function(e) {
        e.preventDefault();
        this.clearErrors(); 
        var user = $('#user').val();
        var pass1 = $('#pass').val();
        var pass2 = $('#passConfirm').val(); 
        var errors = false; 
        $('#user,#pass, #passConfirm').removeClass('alert-danger');

        if (pass1 != pass2) {
            $('#pass, #passConfirm').addClass('alert-danger').val('');
            $('#pass').focus(); 
            this.appendError('Passwords do not match'); 
            errors = true; 
        } 
        if (pass1.length == 0) {
            $('#pass, #passConfirm').addClass('alert-danger').val('');
            this.appendError('Password cannot be empty');
            errors = true; 
        }
        if (user.length == 0) {
            $('#user').addClass('alert-danger');
            this.appendError('Username cannot be empty');
            $('#user').focus();
            errors = true; 
        } 
        if (!errors)    {
            $('#user,#pass, #passConfirm').removeClass('alert-danger');
            $.ajax({
                url: '/api/account',
                dataType: 'json',
                type: 'POST',
                data: {
                    username: user,
                    password: pass1
                },
                complete: function(xhr, statusText){
                    var statusCode = xhr.status; 
                    switch(statusCode) {
                        case 200:
                            //Redirect to home for now
                            location.href='#home';  
                            break; 
                        
                        case 409:
                            $('#user').focus();
                            $('#user').addClass('alert-danger'); 
                            $('#errorMessage').html($('#errorMessage').html()+'Username already in use<br/>');  
                            $('#errorMessage').show();  
                            break; 
                    }
                    
                
                }
                }); 
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

