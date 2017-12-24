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
	var template = '<div onmousedown="d_mousedown" onmousemove="d_mousemove" onmouseup="d_mouseup" style="position:absolute;transform:translate3d(<%=d.x %>,<%=d.y %>, 0);width:20px;height:20px;border-radius:50%;background-color:red;"></div><div class="true-stuff-class no-show"><h1><%:heading %></h1><input type="text" onblur="input_update" value="<%:inputValue %>" placeholder="Hideho" /><p onclick="fireme"><%:paragraph %></p><div class="row" onmouseover="datetime_update">Row<div class="col">Col</div></div><pre>Time: <%:now %></pre></div>';

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
		startDragPos = {};
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
			"todoItems": []
		},
		"functions": {
			"add_click": add_click,
			"newTodoItem_blur": newTodoItem_blur
		}
	};
	var appMountEl = document.getElementById("todoApp");
	var template = '<h1><%:heading %></h1>' +
		'<div><input type="text" placeholder="Insert item here" value="<%=newTodoItem %>" onblur="newTodoItem_blur" /><input type="button" value="Add" onclick="add_click" /></div>' +
		'<ul><% for (var i = 0, l = todoItems.length; i < l; i++) { %><li><%:todoItems[i] %></li><% } %></ul>'
	;

	function newTodoItem_blur(e) {
		templateData.data.newTodoItem = this.value;
		__noname.applyToDOM(appMountEl, template, templateData);
	}

	function add_click(e) {
		console.log("add item", templateData.data.newTodoItem);
		templateData.data.todoItems.push(templateData.data.newTodoItem);
		templateData.data.newTodoItem = new String("");
		__noname.applyToDOM(appMountEl, template, templateData);
	}

	__noname.applyToDOM(appMountEl, template, templateData);
})();