var React = require("react")

var QuestionRespond = React.createClass({
	getInitialState: function() {
		return {
			question: this.props.question
		}
	},
	componentDidMount: function() {
		this.getQuestion()
	},

	reload: function() {
		this.getQuestion()
	},

	getQuestion: function(status, data) {
		var i = 2
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
		else if (question.type == "check") {
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

module.exports = QuestionRespond
