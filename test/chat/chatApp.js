(function () {
	window._context;
	window._data = {
		"data": {
			"messages": [
				{ "text": "Hello, this is the first message.", "userID": 1 },
				{ "text": "Second one eh?", "userID": 1 },
				{ "text": "Hi!", "userID": 2 },
			],
			"chat1": {
				"header": {
					"heading": "Chat Window 1"
				},
				"visitorUser": "chat2",
				"userID": 1,
				"visitorIsTyping": false,
				"message_keyPress": function (e) {
					if (e.charCode != 13) {
						return;
					}

					_data.data.messages.push({ "text": this.value, "userID": 1 });
					this.value = "";
					_context.update(_data);

					var chatWindows = document.getElementsByClassName("chat-window");

					for (var i = 0, l = chatWindows.length; i < l; i++) {
						chatWindows[i].scrollTop = 999999999;
					}
				}
			},
			"chat2": {
				"header": {
					"heading": "Chat Window 2"
				},
				"visitorUser": "chat1",
				"userID": 2,
				"visitorIsTyping": false,
				"message_keyPress": function (e) {
					if (e.charCode != 13) {
						return;
					}

					_data.data.messages.push({ "text": this.value, "userID": 2 });
					this.value = "";
					_context.update(_data);

					var chatWindows = document.getElementsByClassName("chat-window");

					for (var i = 0, l = chatWindows.length; i < l; i++) {
						chatWindows[i].scrollTop = 999999999;
					}
				}
			}
		},
		"functions": {
		}
	};
	var _appMountEl = document.getElementById("app");
	var _appTemplate;

	function getComponents(componentsData, callback) {
		var fetchList = [];
		var components = {};
		
		for (var componentName in componentsData) {
			var component = componentsData[componentName];

			fetchList.push(
				fetch(component.url).then(function (res) {
					return res.text();
				}).then((function (a, b) {
					return function (template) {
						components[b] = {
							"componentName": b,
							"template": template,
							"controller": a.controller
						};
					};
				})(component, componentName))
			);
		}

		Promise.all(fetchList)
			.then(function () {
				callback(components);
			}).catch(function () {
				console.log(arguments);
				alert("Error fetching all components");
			});
	}

	function loadComponents(components) {
		for (var componentName in components) {
			__6oz.addComponent(components[componentName]);
		}

		startApp();
	}

	function startApp() {
		window._context = __6oz.applyToDOM(_appMountEl, _appTemplate, window._data);
	}

	function run() {
		fetch("app.html").then(function (res) {
			return res.text();
		}).then(function (template) {
			_appTemplate = template;
			getComponents(_components, loadComponents);
		}).catch(function () {
			console.log(arguments);
		});
	}

	run();
})();