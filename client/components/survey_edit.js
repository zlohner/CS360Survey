var React = require("react")

var $ = require('jquery')

var SurveyEdit = React.createClass({
	getInitialState: function() {
		return {
			survey: {
				name: '',
				questions: []
			}
		}
	},

	componentDidMount: function() {
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
			<div className = "view">
				<h1>{survey.name}</h1>
				<ol>
					{questions}
				</ol>
			</div>
		)
	}
})

module.exports = SurveyEdit
