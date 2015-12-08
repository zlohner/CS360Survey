var React = require("react")
var ReactDOM = require("react-dom")
var ReactRouter = require("react-router")

var Router = ReactRouter.Router
var Route = ReactRouter.Route
var IndexRoute = ReactRouter.IndexRoute

var App = require("./app.js")
var AccountLogin = require("./account_login.js")
var AccountRegister = require("./account_register.js")
var SurveyCreate = require("./survey_edit.js")

require("../css/app.css")

var routes = (
	<Router>
		<Route name="app" path="/" component={App}>
			<IndexRoute component = {AccountLogin} />
			<Route name="account_login" path="/account_login" component={AccountLogin} />
			<Route name="account_register" path="/account_register" component={AccountRegister} />
			<Route name="survey_edit" path="/survey_edit" component={SurveyCreate} />
		</Route>
	</Router>
);

ReactDOM.render(routes, document.getElementById("content"))
