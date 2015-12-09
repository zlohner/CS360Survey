var React = require("react")

var SurveyHeader = require("./survey_header.js")
var Survey = require("./survey.js")

var SurveyEdit = React.createClass({
	getInitialState: function() {
		return {
			survey: {
				_id: 1,
				owner: 'Bob',
				published: true,
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
						type: 'grid',
						prompt: 'Please rate the following foods:',
						columns: [
							'EW GROSS', 'meh', 'pretty good', 'fantastic'
						],
						rows: [
							'burgers', 'fries', 'chicken teriyaki'
						]
					}
				]
			}
		}
	},

	render: function() {
		return (
			<div className = "view">
				<SurveyHeader name={this.name} key={this.state.survey._id} survey={this.state.survey} />
			</div>
		)
	}
})

module.exports = SurveyEdit
