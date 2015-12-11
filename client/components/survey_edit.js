var React = require("react")

var $ = require('jquery')


function getFormData(form) {
	var data = {}
	form.serializeArray().forEach(function(entry) {
		data[entry.name] = entry.value
	})
	return data
}


var SurveyCreate = React.createClass({
	getInitialState: function() {
		if (!$.cookie("username"))
			location.href = "#account_login"
		else
			this.loadSurvey()

		return {
			editor: {
				active: false
			},
			survey: {
				name: '',
				questions: []
			}
		}
	},
	loadSurvey: function() {
		var self = this

		$.ajax({
			url: '/api/survey/'+this.props.params.id,
			method: 'GET'
		}).done(function(data) {
			if (data.published)
				location.href = '#survey_review/'+data._id
			else
				self.setState({survey: data})
		}).error(function() {
			location.href = '#survey_list'
		})
	},

	clickQuestion: function(index) {
		var self = this

		self.setState({editor: {
			active: true,
			type: 'question',
			data: self.state.survey.questions[index],
			listener: self,
			index: index
		}})
	},
	clickName: function() {
		var self = this

		self.setState({editor: {
			active: true,
			type: 'name',
			data: self.state.survey.name,
			listener: self
		}})
	},
	addQuestion: function() {
		var index = this.state.survey.questions.length
		this.state.survey.questions.push({
			type: 'text',
			prompt: ''
		})

		this.setState({editor: {
			active: true,
			type: 'question',
			data: this.state.survey.questions[index],
			listener: this,
			index: index
		}})
	},

	saveSurvey: function(cb) {
		$.ajax({
			url: '/api/survey/'+this.props.params.id,
			method: 'PUT',
			contentType: 'application/json',
			data: JSON.stringify(this.state.survey)
		}).done(function() {
			if (typeof(cb) == 'function')
				cb()
			else
				alert('Saved successfully.')
		}).error(function() {
			alert('There was a problem saving your changes!')
		})
	},
	publishSurvey: function() {
		if (!confirm('Once your survey is published, it cannot be edited!'))
			return

		var self = this

		self.saveSurvey(function(i) {
			$.ajax({
				url: '/api/survey/open/'+self.props.params.id,
				method: 'POST'
			}).done(function() {
				alert('Your survey has been published.')
				location.href = '#survey_list'
			}).error(function() {
				alert('There was a problem publishing your survey!')
			})
		})
	},

	editorChangeData: function(data) {
		this.state.editor.data = data

		this.forceUpdate()
	},
	editorClose: function() {
		this.setState({editor: {
			active: false
		}})
	},
	editorNameSave: function(data) {
		this.state.survey.name = data
		this.setState({editor: {active: false}})
	},
	editorQuestionSave: function(data) {
		this.state.survey.questions[this.state.editor.index] = data
		this.setState({editor: {active:false}})
	},
	editorQuestionDelete: function() {
		this.state.survey.questions.splice(this.state.editor.index, 1)
		this.setState({editor: {active:false}})
	},

	render: function() {
		var self = this
		var survey = self.state.survey

		var questions = []
		var i = 0
		survey.questions.forEach(function(question) {
			questions.push(
				<SurveyEditQuestion onClick={self.clickQuestion.bind(self, i)} key={i} data={question} />
			)
			i++
		})

		return (
			<div className = "view">
				<div className = "well">
					<button onClick={this.saveSurvey} className="btn btn-info">Save Changes</button>
					<span> </span>
					<button onClick={this.publishSurvey} className="btn btn-success">Publish Survey</button>
					<SurveyEditTitle onClick={self.clickName} name={survey.name} />
					<div className="form-horizontal">
						{questions}
						<div className="form-group">
							<button onClick={this.addQuestion} className="btn btn-warning">Add Question</button>
						</div>
					</div>
				</div>
				<SurveyEditWindow {...this.state.editor} />
			</div>
		)
	}
})



var SurveyEditWindow = React.createClass({
	componentDidMount: function() {
		var el = $('.lightbox')
		el.find('input').first().focus()
	},


	blockClose: function() {
		return false
	},
	handleClose: function() {
		this.props.listener.editorClose()
	},

	nameSave: function(e) {
		e.preventDefault()
		var data = getFormData($(e.target))
		this.props.listener.editorNameSave(data.name)
	},

	questionChangeType: function(e) {
		var data

		switch (e.target.value) {
		case 'text':
			data = {
				type: 'text',
				prompt: ''
			}
			break
		case 'number':
			data = {
				type: 'number',
				prompt: '',
				min: 1,
				max: 10
			}
			break
		case 'toggle':
			data = {
				type: 'toggle',
				prompt: ''
			}
			break
		}

		this.props.listener.editorChangeData(data)
	},
	questionSave: function(e) {
		e.preventDefault()
		var data = getFormData($(e.target))
		this.props.listener.editorQuestionSave(data)
	},
	questionDelete: function(e) {
		this.props.listener.editorQuestionDelete()
		return false
	},

	render: function() {
		var contentPane
		switch (this.props.type) {
		case 'question':
			var questionPane
			switch (this.props.data.type) {
			case 'text':
			case 'toggle':
				questionPane = (
					<div>
						<div className="form-group">
							<label className="control-label">Prompt</label>
							<input name="prompt" type="text" className="form-control" defaultValue={this.props.data.prompt} />
						</div>
					</div>
				)
				break
			case 'number':
				questionPane = (
					<div>
						<div className="form-group">
							<label className="control-label">Prompt</label>
							<input name="prompt" type="text" className="form-control" defaultValue={this.props.data.prompt} />
						</div>
						<div className="form-group">
							<label className="control-label">Minimum</label>
							<input name="min" type="number" className="form-control" defaultValue={this.props.data.min} />
						</div>
						<div className="form-group">
							<label className="control-label">Maximum</label>
							<input name="max" type="number" className="form-control" defaultValue={this.props.data.max} />
						</div>
					</div>
				)
				break
			}
			contentPane = (
				<form className="form-horizontal" onSubmit={this.questionSave}>
					<h2>Edit Question</h2>
					<div className="form-group">
						<label className="control-label">Type</label>
						<select onChange={this.questionChangeType} name="type" className="form-control" value={this.props.data.type}>
							<option value="text">Text</option>
							<option value="number">Number</option>
							<option value="toggle">Yes/No</option>
						</select>
					</div>
					{questionPane}
					<div className="form-group">
						<button type="submit" className="btn btn-info">Save</button>
						<button onClick={this.questionDelete} className="btn btn-danger">Delete</button>
					</div>
				</form>
			)
			break
		case 'name':
			contentPane = (
				<form className="form-horizontal" onSubmit={this.nameSave}>
					<h2>Edit Survey Name</h2>
					<div className="form-group">
						<label className="control-label">Survey Title</label>
						<input name="name" type="text" className="form-control" defaultValue={this.props.data} />
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-info">Save</button>
					</div>
				</form>
			)
			break
		}

		return (
			<div className={'lightbox'+(this.props.active?' active':'')}>
				<div className="backdrop" onClick={this.handleClose}></div>
				<div className="content" onClick={this.blockClose}>{contentPane}</div>
			</div>
		)
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
		case 'number':
			return (
				<div onClick={this.props.onClick} className="form-group">
					<label className="control-label">{data.prompt}</label>
					<input type="range" min={data.min} max={data.max} step="1" className="form-control" />
				</div>
			)
		case 'toggle':
			return (
				<div onClick={this.props.onClick} className="form-group">
					<label className="control-label">{data.prompt}</label>
					<input type="radio" className="form-control" />
					<span>Yes</span>
					<input type="radio" className="form-control" />
					<span>No</span>
				</div>
			)
		}
	}
})

module.exports = SurveyCreate
