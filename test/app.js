/**
 * BASIC APP
 */
(function () {
	var templateData = {
		"data": {
			"paragraph": "This is a test paragraph",
			"heading": "Hello World",
			"now": new Date().toString(),
			"inputValue": "",
			"d": {
				"x": 0,
				"y": 0
			}
		},
		"functions": {
			"fireme": fireme,
			"datetime_update": datetime_update,
			"input_update": input_update,
			"d_mousedown": d_mousedown,
			"d_mousemove": d_mousemove,
			"d_mouseup": d_mouseup
		}
	};
	var template = '<div onmousedown="d_mousedown" onmousemove="d_mousemove" onmouseup="d_mouseup" style="position:absolute;transform:translate3d(<%=d.x %>,<%=d.y %>, 0);width:20px;height:20px;border-radius:50%;background-color:red;"></div><div class="true-stuff-class no-show"><h1><%:heading %></h1><input style="width: 400px;" type="text" onkeyup="input_update" value="<%:inputValue %>" placeholder="Hideho" /><p onclick="fireme"><%:paragraph %></p><div class="row" onmouseover="datetime_update">Row<div class="col">Col</div></div><pre>Time: <%:now %></pre></div>';

	__noname.applyToDOM(document.getElementById("basicApp"), template, templateData);

	function fireme(e) {
		alert("You're fired!");
	}

	function datetime_update() {
		templateData.data.now = new Date().toString();
		__noname.applyToDOM(document.getElementById("basicApp"), template, templateData);
	}

	function input_update(e) {
		templateData.data.inputValue = this.value;
		templateData.data.heading = this.value;
		__noname.applyToDOM(document.getElementById("basicApp"), template, templateData);
	}

	var startDragPos = {};
	var isMouseDown = false;

	function d_mousedown(e) {
		startDragPos = { "x": e.clientX, "y": e.clientY };
		isMouseDown = true;
		console.log("d_mousedown", e);
	}

	function d_mousemove(e) {
		console.log("d_mousemove", e);

		if (isMouseDown) {
			templateData.data.d.x = (e.clientX - startDragPos.x) + "px";
			templateData.data.d.y = (e.clientY - startDragPos.y) + "px";
			console.log(templateData.data.d);
			__noname.applyToDOM(document.getElementById("basicApp"), template, templateData);
		}
	}

	function d_mouseup(e) {
		isMouseDown = false;
		console.log("d_mouseup", e);
	}
})();

/**
 * TODO APP
 */
(function () {
	var templateData = {
		"data": {
			"heading": "My Todo App",
			"newTodoItem": "",
			"todoItems": {},
			"isChecked": false
		},
		"functions": {
			"add_click": add_click,
			"newTodoItem_blur": newTodoItem_blur,
			"todo_dblclick": todo_dblclick,
			"checkbox_click": checkbox_click
		}
	};
	var appMountEl = document.getElementById("todoApp");
	var _template = "";
	var _context;

	function newTodoItem_blur(e) {
		templateData.data.newTodoItem = this.value;
		_context.update(templateData);
	}

	function add_click(e) {
		console.log("add item", templateData.data.newTodoItem);
		templateData.data.todoItems[guid()] = { "name": templateData.data.newTodoItem, "isDone": false };
		templateData.data.newTodoItem = "";
		_context.update(templateData);
	}

	function todo_dblclick(e) {
		templateData.data.todoItems[this.attributes["data-todo-id"].value].isDone = !templateData.data.todoItems[this.attributes["data-todo-id"].value].isDone;
		_context.update(templateData);
	}

	function checkbox_click(e) {
		templateData.data.isChecked = this.checked;
		_context.update(templateData);
	}

	function guid() {
		function S4() {
			return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
		}
		 
		return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
	}

	function run() {
		fetch("todo.html").then(function(response) {
			return response.text();
		}).then(function (template) {
			_template = template;
			_context = __noname.applyToDOM(appMountEl, _template, templateData);
		}).catch(function (err) {
			console.error("Couldn't fetch todo template", err);
		});
	}

	run();
})();