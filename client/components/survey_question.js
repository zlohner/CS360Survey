var React = require("react")

var SurveyQuestion = React.createClass({
	getInitialState: function() {
		return {
			value: 0
		}
	},
	onChange: function(e) {
		question = this.props.question
		if (question.type == "text" || question.type == "number") {
			this.setState({
				value: e.target.value
			})
		}
		else if (question.type == "toggle") {
			if (e.target.id == "yes") {
				this.setState({
					value: true
				})
			} else if (e.target.id == "no"){
				this.setState({
					value: false
				})
			}
		}

	},
	render: function() {
		var self = this
		var question = this.props.question
		if (question.type == "text") {
			return (
				<div className="input-group">
					<span className="input-group-addon">{question.prompt}</span>
					<input id="answer" type="text" className="form-control" placeholder="type your answer here" onChange={this.onChange} />
				</div>
			)
		}
		else if (question.type == "number") {
			return (
				<div className="input-group">
					<span className="input-group-addon">{question.prompt}</span>
					<input id="answer" type="range" min={question.min} max={question.max} step="1" className="form-control" onChange={this.onChange} />
					<span className="input-group-addon">{this.state.value}</span>
				</div>
			)
		}
		else if (question.type == "toggle") {
				return (
					<div className="input-group">
						<span className="input-group-addon">{question.prompt}</span>
						<span className="input-group-addon">Yes</span>
						<span className="input-group-addon"><input id="yes" name="answer" type="radio" onChange={this.onChange} /></span>
						<span className="input-group-addon">No</span>
						<span className="input-group-addon"><input id="no" name="answer" type="radio" onChange={this.onChange} /></span>
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
