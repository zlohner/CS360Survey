var React = require("react")
var ReactRouter = require("react-router")

var SurveyQuestion = require("./survey_question.js")

var Link = ReactRouter.Link

var $ = require("jquery")

var SurveyRespond = React.createClass({
	getInitialState: function() {
		if(this.props.params.id)
			this.getSurvey(this.props.params.id)

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
		$('#surveyID').focus()
	},
	reload: function() {
		if(this.props.params.id)
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
		// self.setState({
		// 	survey: {
		// 		_id: 12345,
		// 		owner: '',
		// 		published: false,
		// 		closed: false,
		// 		name: 'A Quick Questionaire',
		// 		questions: [
		// 			{
		// 				type: 'text',
		// 				prompt: 'What is your name?'
		// 			},
		// 			{
		// 				type: 'number',
		// 				prompt: 'How old are you?'
		// 			},
		// 			{
		// 				type: 'check',
		// 				prompt: 'Do you like bleu cheese?'
		// 			}
		// 		]
		// 	},
		// 	submitted: false
		// })
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
		var response = [false]
		$.ajax({
			url: "/api/response/"+self.state.survey._id,
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify({data: response})
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
		if (!this.state.survey._id) {
			return(
				<div className="panel panel-default">
					<div className="panel-body">
						<form className="form-group" id="surveyIDForm" onSubmit={this.onSubmitID}>
							<div className="input-group">
								<span className="input-group-addon" id="basic-addon3">Survey ID: </span>
								<input type="text" className="form-control" placeholder="Enter Survey ID Here" id="surveyID" aria-describedby="basic-addon1" />
							</div>
						</form>
						<div className="alert-danger" id="errorMessage"></div>
					</div>
				</div>
			)
		}
		else if (!this.state.submitted) {
			console.log("here")
			console.log(this.state.survey)
			var question_list = []
			var i = 0
			this.state.survey.questions.forEach(function(question) {
				question_list.push(
					<div>
						<SurveyQuestion key={i++} question={question} /><br/>
					</div>
				)
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
