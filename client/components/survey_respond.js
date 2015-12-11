var React = require("react")
var ReactRouter = require("react-router")

var SurveyQuestion = require("./survey_question.js")

var Link = ReactRouter.Link

var $ = require("jquery")

var SurveyRespond = React.createClass({
	getInitialState: function() {
		return {
			survey: {
				_id: -1,
				name: '',
				questions: []
			},
			submitted: false
		}
	},
	componentDidMount: function() {
		if(this.props.params.id != this.state.survey._id)
			this.getSurvey(this.props.params.id)
		this.clearErrors()
		$('#surveyID').focus()
	},
	reload: function() {
		if(this.props.params.id != this.state.survey._id)
			this.getSurvey(this.props.params.id)
	},
	getSurvey: function(id) {
		var self = this
		$.ajax({
			url: "/api/survey/"+id,
			type: "GET"
		}).done(function(data) {
			self.setState({
				survey: data,
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
	},
	clearErrors: function() {
		$('#errorMessage').hide()
		$('#errorMessage').html('<strong>Oops!</strong><br/>')
	},
	appendError: function(newMsg) {
		$('#errorMessage').html($('#errorMessage').html()+newMsg+'<br/>')
		$('#errorMessage').show()
	},
	onSubmitID: function(e) {
		this.clearErrors()
		if(e) {
			e.preventDefault()
			if(e.target[0].value) {
				this.getSurvey(e.target[0].value)
			}
		}
	},
	onSubmit: function(e) {
		var self = this
		e.preventDefault()
		this.clearErrors()
		var errors = false
		var responses = []
		for (var i = 0; i < this.state.survey.questions.length; i++) {
			var nextAnswer = $("#answer"+i)[0]
			if (nextAnswer.type == "radio") {
				responses.push(nextAnswer.checked)
			}
			else {
				responses.push(nextAnswer.value)
			}
		}
		$.ajax({
			url: "/api/response/"+self.state.survey._id,
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify({data: responses})
		}).done(function(){
			self.setState({
				submitted: true
			})
		}).error(function(res){
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
		})
	},
	render: function() {
		if (this.state.survey._id == -1) {
			return(
				<div className="panel panel-default">
					<div className="panel-body">
						<form className="form-group" id="surveyIDForm" onSubmit={this.onSubmitID}>
							<div className="input-group">
								<span className="input-group-addon" id="basic-addon3">Survey ID: </span>
								<input type="text" className="form-control" placeholder="Enter Survey ID Here" id="surveyID" aria-describedby="basic-addon1" />
							</div>
						</form>
						<div className="alert-danger" id="errorMessage1"></div>
					</div>
				</div>
			)
		}
		else if (!this.state.submitted) {
			var question_list = []
			var i = 0
			this.state.survey.questions.forEach(function(question) {
				question_list.push(
					<div key={i}>
						<SurveyQuestion question={question} qnum={i} /><br/>
					</div>
				)
				i++
			})
			return (
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">{this.state.survey.name}</h3>
					</div>
					<div className="panel-body">
						<form className="form-group" id="surveyForm" onSubmit={this.onSubmit}>
							{question_list}
							<input type="submit" className="btn btn-primary" value="Submit"/>
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
