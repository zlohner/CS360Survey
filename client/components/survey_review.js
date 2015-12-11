var React = require("react")
var ReactRouter = require("react-router")
var Link = ReactRouter.Link
var $ = require("jquery")

var SurveyReview = React.createClass({

	getInitialState: function() {
		this.surveyId = this.props.params.id  
		this.getSurveyResult()
		return {} 		
	},

	getSurveyResult: function() {
		var self = this 
		$.ajax({
			url: "/api/survey/review/"+this.surveyId,
			type: "POST"
		}).done(function(data) {
				self.count= data.count   
				self.name = data.name 
				self.link = window.location.protocol+"//"+window.location.host+"/#/survey_respond/"+self.surveyId 
				self.forceUpdate() 
		}).error(function() {
			location.href = "#account_login"
		})
	},
	render: function() {
		if (!$.cookie("username"))
			location.href = "#account_login"
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
						<h1 className="panel-title">Survey Results for <strong>{this.name}</strong></h1> 
		    </div> 
				<div className="panel-body">
						<h4>Completed Responses: <strong>{this.count}</strong></h4> 
						<br/><br/>
						<h4>Survey Link: <strong>{this.link}</strong></h4> 
				</div>
			</div>
		)
	}
})

module.exports = SurveyReview 
