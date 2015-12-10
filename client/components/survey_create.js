var React = require("react")

var SurveyCreate = React.createClass({
	getInitialState: function() {
		this.editor = (<SurveyEditWindow />)

		return {
			survey: {
				name: 'New Survey',
				questions: [
					{
						type: 'text',
						prompt: 'What is your favorite color?'
					}
				]
			}
		}
	},

	editQuestion: function(index) {
		var self = this

		self.editor.editQuestion(self.state.survey.questions[index], function(data) {
			self.state.survey.questions[index] = data
			self.forceUpdate()
		})
	},
	editName: function() {
		var self = this

		console.log(self.editor)

		self.editor.editName(self.state.survey.name, function(data) {
			self.state.survey.name = data
			self.forceUpdate()
		})
	},

	render: function() {
		var self = this
		var survey = self.state.survey

		var questions = []
		var i = 0
		survey.questions.forEach(function(question) {
			questions.push(
				<SurveyEditQuestion onClick={self.editQuestion.bind(self, i)} data={question} key={i} />
			)
			i++
		})

		return (
			<div className = "view">
				{self.editor}
				<div className = "well">
					<SurveyEditTitle onClick={self.editName} name={survey.name} />
					<div className="form-horizontal">
						{questions}
					</div>
				</div>
			</div>
		)
	}
})

var SurveyEditWindow = React.createClass({
	getInitialState: function() {
		this.inner = (
			<div className="inner"></div>
		)
		this.container = (
			<div className="lightbox">
				<div className="outer" onClick={this.handleClose}></div>
				{this.inner}
			</div>
		)

		return {
			active: false
		}
	},

	editQuestion: function(question, cb) {

	},
	editName: function(name, cb) {
		console.log(this.inner)
	},

	handleClose: function() {
		var self = this

		// fade out this.container
		setTimeout(function() {
			self.setState({active: false})
		})
	},
	render: function() {
		if (this.state.active)
			return this.container
		else
			return (<div></div>)
	}
})

var SurveyEditTitle = React.createClass({
	render: function() {
		return (
			<h1 onClick={this.props.onClick}>{this.props.name}</h1>
		)
	}
})
var SurveyEditQuestion = React.createClass({
	render: function() {
		var data = this.props.data

		switch (data.type) {
		case 'text':
			return (
				<div onClick={this.props.onClick} className="form-group">
					<label className="control-label">{data.prompt}</label>
					<input type="text" className="form-control" />
				</div>
			)
		}
	}
})

module.exports = SurveyCreate
