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
		var status = "Open"
		if (survey.closed) {
			status = "Closed"
		}
		return (
			<header id="header">
				<div className="row">
					<div className="col-md-6">
						<Link className="btn btn-warning" to="survey_edit">{survey.name}</Link>
						<p>
							<span id="question-info" className="label label-default">
								<i><b>Author:</b> {survey.owner} <b>Status:</b> {published} - {status}</i> <strong>{survey.questions.length}</strong> question(s)
							</span>
						</p>
					</div>
				</div>
			</header>
		)
	}
})

module.exports = SurveyHeader
