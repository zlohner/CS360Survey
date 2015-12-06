var React = require("react")
var ReactDOM = require("react-dom")
var ReactRouter = require("react-router")

var Router = ReactRouter.Router
var Route = ReactRouter.Route
var IndexRoute = ReactRouter.IndexRoute

var app = require("./app.js")
var home = require("./home.js")
var account_register = require("./account_register.js")
var survey_create = require("./survey_create.js")

require("../../node_modules/bootstrap/dist/css/bootstrap.min.css")
require("../css/app.css")

var routes = (
	<Router>
		<Route name="app" path="/" component={app}>
			<IndexRoute component = {home} />
			<Route name="home" path="/home" component={home} />
			<Route name="survey_create" path="/survey_create" component={survey_create} />
			<Route name="account_register" path="/account_register" component={account_register} />
		</Route>
	</Router>
);

ReactDOM.render(routes, document.getElementById("content"))
