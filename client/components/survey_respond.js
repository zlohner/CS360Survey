var React = require("react")
var ReactRouter = require("react-router")

var QuestionRespond = require("./question_respond.js")

var Link = ReactRouter.Link

var $ = require("jquery")

var SurveyRespond = React.createClass({
	getInitialState: function() {
		return {
			survey: {
				name: '',
				questions: []
			},
			submitted: false
		}
	},
	componentDidMount: function() {
		this.clearErrors()
		this.getSurvey()
		$('#user').focus()
	},
	reload: function() {
		this.getSurvey()
	},
	getSurvey: function(e) {
		var self = this
		if (e) {
			e.preventDefault()
			console.log(e.target[0].value)
			$.ajax({
				url: "/api/survey/:"+e.target[0].value,
				type: "GET"
			}).done(function(data) {
				self.setState({
					survey: data.survey,
					submitted: false
				})
			}).error(function(res) {
				switch(res.status) {
					case 404:
						self.appendError("Survey not found")
						break
					case 400:
						self.appendError("Bad Request")
						break
					default:
						self.appendError("Server error")
						break

				}
			})
		}
	},
	clearErrors: function() {
		$('#errorMessage').hide()
		$('#errorMessage').html('<strong>Oops!</strong><br/>')
	},
	appendError: function(newMsg) {
		$('#errorMessage').html($('#errorMessage').html()+newMsg+'<br/>')
		$('#errorMessage').show()
	},
	onSubmit: function(e) {
		var self = this
		e.preventDefault()
		this.clearErrors()
		var errors = false
		var response = []
		$.ajax({
			url: "/api/response/:"+self.state.survey._id,
			type: "POST",
			data: response
		}).done(function(){
			self.setState({
				submitted: true
			})
		}).error(function(res){
			console.log(res)
			switch(res.status) {
				case 404:
					self.appendError("Survey not found")
					break
				case 403:
					self.appendError("Survey not accepting responses")
					break
				case 400:
					self.appendError("Wrong number of fields")
					break
				default:
					self.appendError("Server error")
					break
			}
			self.setState({
				submitted: true
			})
		})
	},
	render: function() {
		if (!this.state.survey.id) {
			return(
				<div className="panel panel-default">
					<div className="panel-body">
						<form className="form-group" id="surveyIDForm" onSubmit={this.getSurvey}>
							<div className="input-group">
								<span className="input-group-addon" id="basic-addon3">Survey ID: </span>
								<input type="number" className="form-control" placeholder="Enter Survey ID Here" id="surveyID" aria-describedby="basic-addon1" />
							</div>
						</form>
					</div>
				</div>
			)
		}
		else if (!this.state.submitted) {
			console.log(this.state.survey)
			var question_list = this.state.survey.questions.map(function(question) {
				return (
					<div>
						<QuestionRespond question={question} /><br/>
					</div>
				)
			}.bind(this));
			return (
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">{this.state.survey.name}</h3>
					</div>
					<div className="panel-body">
						<form className="form-group" id="surveyForm" onSubmit={this.onSubmit}>
							{question_list}
							<input type="submit" className="btn btn-primary" value="Submit"/>
							<div className="alert-danger" id="errorMessage"></div>
						</form>
					</div>
				</div>
			)
		}
		else {
			return(
				<div className="panel panel-default">
					<div className="panel-heading">
						<Link className="btn btn-primary" to="account_login">
							Your response has been recorded - Thank you! (Click to be redirected to the home page)
						</Link>
					</div>
				</div>
			)
		}
	}
})

module.exports = SurveyRespond
