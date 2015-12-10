var React = require("react")

var SurveyQuestion = React.createClass({
	getQuestion: function() {
		return this.props.question
	},
	render: function() {
		var self = this
		var question = this.props.question
		if (question.type == "text" || question.type == "number") {
			return (
				<div className="input-group">
					<span className="input-group-addon" id="basic-addon3">{question.prompt}</span>
					<input type={question.type} className="form-control" placeholder="type your answer here" aria-describedby="basic-addon1" />
				</div>
			)
		}
		else if (question.type == "toggle") {
			return (
				<div className="input-group">
					<span className="input-group-addon" id="basic-addon3">{question.prompt}</span>
					<span className="input-group-addon"><input type="checkbox" aria-label="..." /></span>
				</div>
			)
		}
		else if (question.type == "grid") {
			// implement this later
			return <div/>
		}
		// others
	}
})

module.exports = SurveyQuestion
