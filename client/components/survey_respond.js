var React = require("react")

var QuestionRespond = require("./question_respond.js")



var SurveyRespond = React.createClass({
	getInitialState: function() {
		return {
			survey: {}
		}
	},
	componentDidMount: function() {
		//this.getSurvey(id)
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
