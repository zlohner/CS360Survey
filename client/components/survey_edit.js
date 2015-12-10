var React = require("react")
var ReactRouter = require("react-router")

var SurveyHeader = require("./survey_header.js")
var Survey = require("./survey.js")

var $ = require("jquery")
require("../../node_modules/jquery.cookie/jquery.cookie.js")

var SurveyEdit = React.createClass({
	contextTypes: {
		router: React.PropTypes.func
	},

	getInitialState: function() {
		return {
			survey: {}
		}
	},

	componentDidMount: function() {
		this.state.survey = this.getSurvey() 
		if (!$.cookie("username")) {
			location.href = "#account_login"
		}
	},

	reload: function() {
		this.state.survey = this.getSurvey()
	},

	getSurvey: function() {
		return {
			_id: 1,
			owner: 'Bob',
			published: false,
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
				}
			]
		}
	},

	render: function() {
		this.state.survey = this.getSurvey()
		return (
			<div className="panel panel-default">
				<div className="panel-body">
					<SurveyHeader name={this.name} key={this.state.survey._id} survey={this.state.survey} />
				</div>
			</div>
		)
	}
})

module.exports = SurveyEdit
