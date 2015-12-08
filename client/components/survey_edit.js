var React = require("react")

var SurveyHeader = require("./survey_header.js")
var Survey = require("./survey.js")

var SurveyEdit = React.createClass({
	getInitialState: function() {
		return {
			survey: {title: "A Survey", length: 9},
		}
	},

	render: function() {
		return (
			<div className = "view">
				<SurveyHeader name={"Zac"} survey={this.state.survey} />
			</div>
		)
	}
})

module.exports = SurveyEdit
