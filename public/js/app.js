webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(158);
	var ReactRouter = __webpack_require__(159);

	var Router = ReactRouter.Router;
	var Route = ReactRouter.Route;
	var IndexRoute = ReactRouter.IndexRoute;

	var App = __webpack_require__(208);
	var AccountLogin = __webpack_require__(209);
	var AccountRegister = __webpack_require__(211);
	var SurveyCreate = __webpack_require__(212);

	__webpack_require__(215);

	var routes = React.createElement(
		Router,
		null,
		React.createElement(
			Route,
			{ name: "app", path: "/", component: App },
			React.createElement(IndexRoute, { component: AccountLogin }),
			React.createElement(Route, { name: "account_login", path: "/account_login", component: AccountLogin }),
			React.createElement(Route, { name: "account_register", path: "/account_register", component: AccountRegister }),
			React.createElement(Route, { name: "survey_edit", path: "/survey_edit", component: SurveyCreate })
		)
	);

	ReactDOM.render(routes, document.getElementById("content"));

/***/ },

/***/ 158:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(3);


/***/ },

/***/ 208:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ReactRouter = __webpack_require__(159);
	var History = ReactRouter.History;

	var App = React.createClass({
		displayName: "App",

		render: function () {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"nav",
					{ className: "navbar navbar-inverse", role: "navigation" },
					React.createElement(
						"div",
						{ className: "container" },
						React.createElement(
							"div",
							{ className: "navbar-header" },
							React.createElement(
								"button",
								{ type: "button", className: "navbar-toggle", "data-toggle": "collapse", "data-target": "#bs-example-navbar-collapse-1" },
								React.createElement(
									"span",
									{ className: "sr-only" },
									"Toggle navigation"
								),
								React.createElement("span", { className: "icon-bar" }),
								React.createElement("span", { className: "icon-bar" }),
								React.createElement("span", { className: "icon-bar" })
							),
							React.createElement(
								"a",
								{ className: "navbar-brand", href: "/" },
								"Survey"
							)
						),
						React.createElement(
							"div",
							{ className: "collapse navbar-collapse", id: "bs-example-navbar-collapse-1" },
							React.createElement(
								"ul",
								{ className: "nav navbar-nav" },
								React.createElement(
									"li",
									null,
									React.createElement(
										"a",
										{ href: "#/account_register" },
										"account"
									)
								),
								React.createElement(
									"li",
									null,
									React.createElement(
										"a",
										{ href: "#/survey_edit" },
										"create"
									)
								)
							)
						)
					)
				),
				React.createElement(
					"div",
					{ className: "container" },
					this.props.children
				)
			);
		}
	});

	module.exports = App;

/***/ },

/***/ 209:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ReactRouter = __webpack_require__(159);

	var $ = __webpack_require__(210);

	var Link = ReactRouter.Link;

	var AccountLogin = React.createClass({
		displayName: "AccountLogin",

		render: function () {
			return React.createElement(
				"div",
				{ className: "col-lg-10 col-md-10 col-sm-10 col-lg-offset-1 col-md-offset-1 col-sm-offset-1" },
				React.createElement(
					"center",
					null,
					React.createElement(
						"h1",
						null,
						"Survey"
					)
				),
				React.createElement(
					"form",
					{ className: "form-group col-lg-4 col-md-4 col-sm-4 col-lg-offset-2 col-md-offset-2 col-sm-offset-2", id: "registerForm", onSubmit: this.onSubmit },
					React.createElement(
						"label",
						{ htmlFor: "user" },
						"Username:"
					),
					React.createElement(
						"div",
						{ className: "input-group registerElement" },
						React.createElement(
							"span",
							{ className: "input-group-addon" },
							React.createElement("i", { className: "glyphicon glyphicon-user" })
						),
						React.createElement("input", { type: "text", className: "form-control", placeholder: "username", id: "user" })
					),
					React.createElement(
						"label",
						{ htmlFor: "pass" },
						"Password:"
					),
					React.createElement(
						"div",
						{ className: "input-group registerElement" },
						React.createElement(
							"span",
							{ className: "input-group-addon" },
							React.createElement("i", { className: "glyphicon glyphicon-asterisk" })
						),
						React.createElement("input", { type: "password", className: "form-control", placeholder: "password", id: "pass" })
					),
					React.createElement("input", { type: "submit", className: "btn btn-success", value: "Log In" }),
					" or ",
					React.createElement(
						Link,
						{ className: "btn btn-default", to: "account_register" },
						"Sign Up"
					),
					React.createElement("div", { className: "alert-danger", id: "errorMessage" })
				)
			);
		},
		clearErrors: function () {
			$('#errorMessage').hide();
			$('#errorMessage').html('<strong>Oops!</strong><br/>');
		},
		appendError: function (newMsg) {
			$('#errorMessage').html($('#errorMessage').html() + newMsg + '<br/>');
			$('#errorMessage').show();
		},
		componentDidMount: function () {
			this.clearErrors();
			$('#user').focus();
		},
		onSubmit: function (e) {
			e.preventDefault();
			this.clearErrors();
			var user = $('#user').val();
			var pass = $('#pass').val();
			var errors = false;
			$('#user,#pass, #passConfirm').removeClass('alert-danger');
			$.ajax({
				url: '/api/account/login',
				dataType: 'json',
				type: 'POST',
				data: {
					username: user,
					password: pass
				},
				complete: function (xhr, statusText) {
					var statusCode = xhr.status;
					switch (statusCode) {
						case 200:
							//Log user in
							location.href = '#survey_edit';
							break;

						case 404:
							$('#user').focus();
							$('#user').addClass('alert-danger');
							$('#errorMessage').html($('#errorMessage').html() + 'Invalid Username or Password');
							$('#errorMessage').show();
							break;

						case 401:
							$('#pass').focus();
							$('#pass').addClass('alert-danger');
							$('#errorMessage').html($('#errorMessage').html() + 'Invalid Username or Password');
							$('#errorMessage').show();
							break;
					}
				}
			});
		}
	});

	module.exports = AccountLogin;

/***/ },

/***/ 211:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ReactRouter = __webpack_require__(159);

	var $ = __webpack_require__(210);

	var Link = ReactRouter.Link;

	var account_register = React.createClass({
		displayName: "account_register",

		render: function () {
			return React.createElement(
				"div",
				{ className: "col-lg-10 col-md-10 col-sm-10 col-lg-offset-1 col-md-offset-1 col-sm-offset-1" },
				React.createElement(
					"center",
					null,
					React.createElement(
						"h1",
						null,
						"Register"
					)
				),
				React.createElement(
					"form",
					{ className: "form-group col-lg-4 col-md-4 col-sm-4 col-lg-offset-2 col-md-offset-2 col-sm-offset-2", id: "registerForm", onSubmit: this.onSubmit },
					React.createElement(
						"label",
						{ htmlFor: "user" },
						"Username:"
					),
					React.createElement(
						"div",
						{ className: "input-group registerElement" },
						React.createElement(
							"span",
							{ className: "input-group-addon" },
							React.createElement("i", { className: "glyphicon glyphicon-user" })
						),
						React.createElement("input", { type: "text", className: "form-control", placeholder: "username", id: "user" })
					),
					React.createElement(
						"label",
						{ htmlFor: "pass" },
						"Password:"
					),
					React.createElement(
						"div",
						{ className: "input-group registerElement" },
						React.createElement(
							"span",
							{ className: "input-group-addon" },
							React.createElement("i", { className: "glyphicon glyphicon-asterisk" })
						),
						React.createElement("input", { type: "password", className: "form-control", placeholder: "password", id: "pass" })
					),
					React.createElement(
						"label",
						{ htmlFor: "passConfirm" },
						"Confirm Password:"
					),
					React.createElement(
						"div",
						{ className: "input-group registerElement" },
						React.createElement(
							"span",
							{ className: "input-group-addon" },
							React.createElement("i", { className: "glyphicon glyphicon-asterisk" })
						),
						React.createElement("input", { type: "password", className: "form-control", placeholder: "password again", id: "passConfirm" })
					),
					React.createElement("input", { type: "submit", className: "btn btn-success", value: "Sign Up" }),
					" or ",
					React.createElement(
						Link,
						{ className: "btn btn-default", to: "account_login" },
						"Log In"
					),
					React.createElement("div", { className: "alert-danger", id: "errorMessage" })
				)
			);
		},
		clearErrors: function () {
			$('#errorMessage').hide();
			$('#errorMessage').html('<strong>Oops!</strong><br/>');
		},
		appendError: function (newMsg) {
			$('#errorMessage').html($('#errorMessage').html() + newMsg + '<br/>');
			$('#errorMessage').show();
		},
		componentDidMount: function () {
			this.clearErrors();
			$('#user').focus();
		},
		onSubmit: function (e) {
			e.preventDefault();
			this.clearErrors();
			var user = $('#user').val();
			var pass1 = $('#pass').val();
			var pass2 = $('#passConfirm').val();
			var errors = false;
			$('#user,#pass, #passConfirm').removeClass('alert-danger');

			if (pass1 != pass2) {
				$('#pass, #passConfirm').addClass('alert-danger').val('');
				$('#pass').focus();
				this.appendError('Passwords do not match');
				errors = true;
			}
			if (pass1.length == 0) {
				$('#pass, #passConfirm').addClass('alert-danger').val('');
				this.appendError('Password cannot be empty');
				errors = true;
			}
			if (user.length == 0) {
				$('#user').addClass('alert-danger');
				this.appendError('Username cannot be empty');
				$('#user').focus();
				errors = true;
			}
			if (!errors) {
				$('#user,#pass, #passConfirm').removeClass('alert-danger');
				$.ajax({
					url: '/api/account',
					dataType: 'json',
					type: 'POST',
					data: {
						username: user,
						password: pass1
					},
					complete: function (xhr, statusText) {
						var statusCode = xhr.status;
						switch (statusCode) {
							case 200:
								//Redirect to home for now
								location.href = '#survey_edit';
								break;

							case 409:
								$('#user').focus();
								$('#user').addClass('alert-danger');
								$('#errorMessage').html($('#errorMessage').html() + 'Username is already in use');
								$('#errorMessage').show();
								break;
						}
					}
				});
			}
		}
	});

	module.exports = account_register;

/***/ },

/***/ 212:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);

	var SurveyHeader = __webpack_require__(213);
	var Survey = __webpack_require__(214);

	var SurveyEdit = React.createClass({
		displayName: "SurveyEdit",

		getInitialState: function () {
			return {
				survey: { title: "A Survey", length: 9 }
			};
		},

		render: function () {
			return React.createElement(
				"div",
				{ className: "view" },
				React.createElement(SurveyHeader, { name: "Zac", survey: this.state.survey })
			);
		}
	});

	module.exports = SurveyEdit;

/***/ },

/***/ 213:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);

	var SurveyHeader = React.createClass({
		displayName: "SurveyHeader",

		render: function () {
			return React.createElement(
				"header",
				{ id: "header" },
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "col-md-6" },
						React.createElement(
							"h1",
							null,
							this.props.survey.title
						),
						React.createElement(
							"p",
							null,
							React.createElement(
								"i",
								null,
								"Author ",
								this.props.name
							)
						),
						React.createElement(
							"p",
							null,
							React.createElement(
								"span",
								{ id: "question-count", className: "label label-default" },
								React.createElement(
									"strong",
									null,
									this.props.survey.length
								),
								" question(s)"
							)
						),
						React.createElement(
							"p",
							null,
							React.createElement(
								"i",
								null,
								"Double-click to edit an item"
							)
						)
					)
				)
			);
		}
	});

	module.exports = SurveyHeader;

/***/ },

/***/ 214:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);

	var Survey = React.createClass({
		displayName: "Survey",

		render: function () {
			return React.createElement("div", { className: "view" });
		}
	});

	module.exports = Survey;

/***/ },

/***/ 215:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});