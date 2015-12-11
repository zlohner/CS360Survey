var React = require("react")

var SurveyQuestion = React.createClass({
	getInitialState: function() {
		return {
			value: 0
		}
	},
	componentDidMount: function() {

	},
	reload: function() {

	},
	onChange: function(e) {
		this.setState({
			value: e.target.value
		})
	},
	render: function() {
		var self = this
		var question = this.props.question
		if (question.type == "text") {
			return (
				<div className="input-group">
					<span className="input-group-addon">{question.prompt}</span>
					<input id="answer" type="text" className="form-control" placeholder="type your answer here" />
				</div>
			)
		}
		else if (question.type == "number") {
			return (
				<div className="input-group">
					<span className="input-group-addon">{question.prompt}</span>
					<input id="answer" type="range" min={question.min} max={question.max} step="1" className="form-control" onChange={this.onChange}/>
					<span className="input-group-addon">{this.state.value}</span>
				</div>
			)
		}
		else if (question.type == "toggle") {
			return (
				<div className="input-group">
					<span className="input-group-addon">{question.prompt}</span>
					<span className="input-group-addon"><input id="answer" type="checkbox" /></span>
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
