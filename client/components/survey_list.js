var React = require("react")

var SurveyHeader = require("./survey_header.js")
var Survey = require("./survey.js")

var $ = require("jquery")

var SurveyList = React.createClass({
	contextTypes: {
		router: React.PropTypes.func
	},

	getInitialState: function() {
		return {
			surveys: [],
		}
	},

	componentDidMount: function() {
		this.reload
	},

	reload: function() {
		this.setState(this.listSet)
	},

	listSet: function(status, data) {
		$.ajax({
			url: "/api/survey",
			contentType: "application/json",
			type: "GET",
		}).done(function(data) {
			console.log("here")
			for (var i = 0; i < data.length; i++) {
				$.ajax({
					url: "/api/survey/" + data[i],
					contentType: "application/json",
					type: "GET",
				}).done(function(data) {
					$(this).surveys.push(data)
				}).error(function() {
					$(this).context.router.transitionTo("/login")
				})
			}
		}).error(function() {
			this.context.router.transitionTo("/login")
		})
	},

	render: function() {
		var list = this.props.surveys.map(function(survey) {
			return (
				<SurveyHeader name={this.name} key={survey.id} survey={survey} reload={this.props.reload}/>
			)
		}.bind(this));

		return (
			<ul id="survey-list">
				{list}
			</ul>
		)
	}
})

module.exports = SurveyList
