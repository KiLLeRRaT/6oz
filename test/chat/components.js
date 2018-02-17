var _components = {
	"chat-header": {
		"url": "components/chat-header.html",
		"controller": function () {

		}
	},
	"chat-window": {
		"url": "components/chat-window.html",
		"controller": function () {
		}
	},
	"chat-message": {
		"url": "components/chat-message.html",
		"controller": function () {

		}
	},
	"chat-controls": {
		"url": "components/chat-controls.html",
		"controller": function (props) {
			var controllerProps = props;

			this.onKeyPress = function (e) {
				window.clearTimeout(this.typingIndicatorTimeout);
				window._data.data[controllerProps.visitor].visitorIsTyping = true;
				this.typingIndicatorTimeout = setTimeout(function () {
					window._data.data[controllerProps.visitor].visitorIsTyping = false;
					window._context.update(_data);
				}, 1000);

				if (e.charCode != 13) {
					window._context.update(_data);
					return;
				}

				window._data.data[controllerProps.visitor].visitorIsTyping = false;
				window.clearTimeout(this.typingIndicatorTimeout);
				controllerProps.messages.push({ "text": this.value, "userID": controllerProps.userID });
				this.value = "";
				window._context.update(_data);

				var chatWindows = document.getElementsByClassName("chat-window");

				for (var i = 0, l = chatWindows.length; i < l; i++) {
					chatWindows[i].scrollTop = 999999999;
				}
			}
		}
	},
	"chat-typing-indicator": {
		"url": "components/chat-typing-indicator.html",
		"controller": function () {

		}
	},
};