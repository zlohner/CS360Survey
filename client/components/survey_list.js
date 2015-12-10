var React = require("react")
var ReactRouter = require("react-router")

var SurveyHeader = require("./survey_header.js")
var Survey = require("./survey.js")

var Link = ReactRouter.Link

var $ = require("jquery")

var SurveyList = React.createClass({
	contextTypes: {
		router: React.PropTypes.func
	},

	getInitialState: function() {
		console.log(this)
		return {
			surveys: []
		}
	},

	componentDidMount: function() {
		this.getSurveys()
	},

	reload: function() {
		this.getSurveys()
	},

	getSurveys: function(status, data) {
		var self = this

		$.ajax({
			url: "/api/survey",
			type: "GET"
		}).done(function(data) {
			data.forEach(function(surveyID) {
				$.ajax({
					url: "/api/survey/" + surveyID,
					type: "GET"
				}).done(function(survey) {
					self.surveys.push(survey)
				}).error(function() {
					location.href = "#account_login"
				})
			})
		}).error(function() {
			location.href = "#account_login"
		})
	},
	createSurvey: function() {
		var self = this

		$.ajax({
			url: "/api/survey",
			type: "POST",
			data: {
				name: "New Survey",
				questions: []
			}
		}).done(function(data) {

		})
	},
	render: function() {
		var list = this.state.surveys.map(function(survey) {
			return (
				<SurveyHeader name={this.name} key={survey._id} survey={survey} />
			)
		}.bind(this));

		return (
			<div className="panel panel-default">
				<div className="panel-body">
					{list}
					<Link className="btn btn-primary" to="survey_edit" onClick={this.createSurvey}>Create New Survey</Link>
				</div>
			</div>
		)
	}
})

module.exports = SurveyList
