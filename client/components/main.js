var React = require("react")
var ReactDOM = require("react-dom")
var ReactRouter = require("react-router")

var Router = ReactRouter.Router
var Route = ReactRouter.Route
var IndexRoute = ReactRouter.IndexRoute

var App = require("./app.js")
var Home = require("./home.js")
var AccountLogin = require("./account_login.js")
var AccountRegister = require("./account_register.js")
var SurveyList = require("./survey_list.js")
var SurveyEdit = require("./survey_edit.js")
var SurveyCreate = require("./survey_create.js")
var SurveyRespond = require("./survey_respond.js")

require("../css/app.css")

var routes = (
	<Router>
		<Route name="app" path="/" component={App}>
			<IndexRoute component = {Home} />
			<Route name="home" path="/home" component={Home} />
			<Route name="account_login" path="/account_login" component={AccountLogin} />
			<Route name="account_register" path="/account_register" component={AccountRegister} />
			<Route name="survey_list" path="/survey_list" component={SurveyList} />
			<Route name="survey_edit" path="/survey_edit/:id" component={SurveyEdit} />
			<Route name="survey_create" path="/survey_create" component={SurveyCreate} />
			<Route name="survey_respond" path="/survey_respond" component={SurveyRespond} />
			<Route name="survey_respond_id" path="/survey_respond/:id" component={SurveyRespond} />
		</Route>
	</Router>
);

ReactDOM.render(routes, document.getElementById("content"))
