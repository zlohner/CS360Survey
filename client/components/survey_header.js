var React = require("react")

var SurveyHeader = React.createClass({
	render: function() {
		return (
			<header id="header">
				<div className="row">
					<div className="col-md-6">
						<h1>{this.props.survey.title}</h1>
						<p><i>Author {this.props.name}</i></p>
						<p>
							<span id="question-count" className="label label-default">
								<strong>{this.props.survey.length}</strong> question(s)
							</span>
						</p>
						<p><i>Double-click to edit an item</i></p>
					</div>
				</div>
			</header>
		)
	}
})

module.exports = SurveyHeader
