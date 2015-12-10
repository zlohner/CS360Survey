var React = require("react")
var ReactRouter = require("react-router")

var Link = ReactRouter.Link

var SurveyHeader = React.createClass({
	render: function() {
		var survey = this.props.survey
		var published = "Not Published"
		if (survey.published) {
			published = "Published"
		}
		var status = ""
		if (survey.published) {
		status = "- Open"
			if (survey.closed) {
				status = "- Closed"
			}
		}
		return (
			<Link className="btn btn-primary" to={(survey.published?'survey_review':'survey_edit')+'/'+survey._id}>
			<b>{survey.name}</b> &nbsp; - &nbsp;
			<i> <b>Author:</b> {survey.owner} &nbsp; <b>Status:</b> {published} {status} &nbsp; <b>Question(s):</b> {survey.questions.length} </i>
			</Link>
		)
	}
})

module.exports = SurveyHeader
