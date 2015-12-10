var React = require("react")
var ReactRouter = require("react-router")

var $ = require('jquery')

var $ = require("jquery")
require("../../node_modules/jquery.cookie/jquery.cookie.js")

var SurveyEdit = React.createClass({
	contextTypes: {
		router: React.PropTypes.func
	},

	getInitialState: function() {
		return {
			survey: {
				name: '',
				questions: []
			}
		}
	},

	componentDidMount: function() {
		if (!$.cookie("username"))
			location.href = "#account_login"
		else
			this.getSurvey()
	},

	reload: function() {
		this.getSurvey()
	},

	getSurvey: function() {
		var self = this

		$.ajax({
			url: '/api/survey/'+this.props.params.id,
			type: 'GET'
		}).done(function(data) {
			self.setState(data)
		}).error(function() {
			// redirect to /survey_list
		})
		// return {
		// 	_id: 1,
		// 	owner: 'ID was '+this.props.params.id,
		// 	published: false,
		// 	closed: false,
		// 	name: 'A Quick Questionaire',
		// 	questions: [
		// 		{
		// 			type: 'text',
		// 			prompt: 'What is your name?'
		// 		},
		// 		{
		// 			type: 'number',
		// 			prompt: 'How old are you?'
		// 		},
		// 		{
		// 			type: 'grid',
		// 			prompt: 'Please rate the following foods:',
		// 			columns: [
		// 				'EW GROSS', 'meh', 'pretty good', 'fantastic'
		// 			],
		// 			rows: [
		// 				'burgers', 'fries', 'chicken teriyaki'
		// 			]
		// 		}
		// 	]
		// }
	},

	render: function() {
		var survey = this.state.survey
		console.log(survey)

		var questions = []
		var i = 1
		survey.questions.forEach(function() {
			questions.push(<li>Question {i++}</li>)
		})

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
