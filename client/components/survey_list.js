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
			surveys: [
				{
					_id: 1,
					owner: 'Bob',
					published: true,
					closed: false,
					name: 'A Quick Questionaire',
					questions: [
						{
							type: 'text',
							prompt: 'What is your name?'
						},
						{
							type: 'number',
							prompt: 'How old are you?'
						},
						{
							type: 'grid',
							prompt: 'Please rate the following foods:',
							columns: [
								'EW GROSS', 'meh', 'pretty good', 'fantastic'
							],
							rows: [
								'burgers', 'fries', 'chicken teriyaki'
							]
						}
					]
				},
				{
					_id: 2,
					owner: 'Bob',
					published: false,
					closed: false,
					name: 'Another Survey',
					questions: [
						{
							type: 'text',
							prompt: 'What is your name?'
						}
					]
				}
			],
		}
	},

	componentDidMount: function() {
		this.setState(this.getSurveys)
	},

	reload: function() {
		this.setState(this.getSurveys)
	},

	getSurveys: function(status, data) {
		var self = this

		$.ajax({
			url: "/api/survey",
			type: "GET"
		}).done(function(data) {
			data.forEach(function(surveyID) {
				console.log(surveyID)
				console.log("/api/survey/" + surveyID)
				$.ajax({
					url: "/api/survey/" + surveyID,
					type: "GET"
				}).done(function(survey) {
					self.surveys.push(survey)
				}).error(function() {
					self.context.router.transitionTo("/login")
				})
			})
		}).error(function() {
			self.context.router.transitionTo("/login")
		})
	},

	render: function() {
		var list = this.state.surveys.map(function(survey) {
			return (
				<SurveyHeader name={this.name} key={survey._id} survey={survey} />
			)
		}.bind(this));

		return (
			<div className="view">
				<ul id="survey-list">
					{list}
				</ul>
			</div>
		)
	}
})

module.exports = SurveyList
