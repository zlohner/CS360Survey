var React = require("react")

var $ = require("jquery")

var Home = React.createClass({
	componentDidMount: function() {
		if($.cookie("username")) {
			location.href = "#survey_list"
		}
		else {
			location.href = "#account_login"
		}
	},
	render: function() {
		return <div/>
	}
})

module.exports = Home
