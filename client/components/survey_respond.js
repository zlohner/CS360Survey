var React = require("react")

var QuestionRespond = require("./question_respond.js")

var SurveyRespond = React.createClass({
	getInitialState: function() {
		return {
			// the current editing survey (cookie?)
			survey: {
				_id: 12345,
				owner: '',
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
					},
					{
						type: 'check',
						prompt: 'Check if Zac copped out on the grid questions: ',
					}
				]
			}
		}
	},
	render: function() {
		var question_list = this.state.survey.questions.map(function(question) {
			return (
				<QuestionRespond question={question} />
			)
		}.bind(this));
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title">{this.state.survey.name}</h3>
				</div>
				<div className="panel-body">
					<form className="form-group" id="surveyForm" onSubmit={this.onSubmit}>
						{question_list}
					</form>
				</div>
			</div>
		)
	}
})

module.exports = SurveyRespond
