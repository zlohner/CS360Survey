webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(158);
	var ReactRouter = __webpack_require__(159);

	var Router = ReactRouter.Router;
	var Route = ReactRouter.Route;
	var IndexRoute = ReactRouter.IndexRoute;

	var app = __webpack_require__(210);
	var home = __webpack_require__(211);
	var account_register = __webpack_require__(212);
	var survey_create = __webpack_require__(213);

	__webpack_require__(214);
	__webpack_require__(223);

	var routes = React.createElement(
		Router,
		null,
		React.createElement(
			Route,
			{ name: "app", path: "/", component: app },
			React.createElement(IndexRoute, { component: home }),
			React.createElement(Route, { name: "home", path: "/home", component: home }),
			React.createElement(Route, { name: "survey_create", path: "/survey_create", component: survey_create }),
			React.createElement(Route, { name: "account_register", path: "/account_register", component: account_register })
		)
	);

	ReactDOM.render(routes, document.getElementById("content"));

/***/ },

/***/ 158:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(3);


/***/ },

/***/ 210:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ReactRouter = __webpack_require__(159);
	var History = ReactRouter.History;

	var app = React.createClass({
		displayName: "app",

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
										{ href: "#/survey_create" },
										"create"
									)
								),
								React.createElement(
									"li",
									null,
									React.createElement(
										"a",
										{ href: "#/account_register" },
										"account"
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

	module.exports = app;

/***/ },

/***/ 211:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);

	var home = React.createClass({
		displayName: "home",

		render: function () {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"h1",
					null,
					"Home"
				),
				React.createElement(
					"p",
					null,
					"Put your home page here"
				)
			);
		}
	});

	module.exports = home;

/***/ },

/***/ 212:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);

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
						"Account Registration"
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
					React.createElement("input", { type: "text", className: "form-control registerElement", placeholder: "username", id: "user" }),
					React.createElement(
						"label",
						{ htmlFor: "pass" },
						"Password:"
					),
					React.createElement("input", { type: "password", className: "form-control registerElement", placeholder: "password", id: "pass" }),
					React.createElement(
						"label",
						{ htmlFor: "passConfirm" },
						"Confirm Password:"
					),
					React.createElement("input", { type: "password", className: "form-control registerElement", placeholder: "password again", id: "passConfirm" }),
					React.createElement("input", { type: "submit", className: "btn btn-success", value: "Sign Up" }),
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
								location.href = '#home';
								break;

							case 409:
								$('#user').focus();
								$('#user').addClass('alert-danger');
								$('#errorMessage').html($('#errorMessage').html() + 'Username already in use<br/>');
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

/***/ 213:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);

	var survey_create = React.createClass({
		displayName: "survey_create",

		render: function () {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"h1",
					null,
					"Create"
				),
				React.createElement(
					"p",
					null,
					"Create a survey here"
				)
			);
		}
	});

	module.exports = survey_create;

/***/ },

/***/ 214:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 223:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});