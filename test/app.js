var templateData = {
	"data": {
		"paragraph": "This is a test paragraph",
		"heading": "Hello World",
		"now": new Date().toString(),
		"inputValue": ""
	},
	"functions": {
		"fireme": fireme,
		"datetime_update": datetime_update,
		"input_update2": input_update
	}
};
var template = '<div class="true-stuff-class no-show"><h1><%:heading %></h1><input type="text" onblur="input_update" value="<%:inputValue %>" placeholder="Hideho" /><p onclick="fireme"><%:paragraph %></p><div class="row" onmouseover="datetime_update">Row<div class="col">Col</div></div><pre>Time: <%:now %></pre></div>';

__noname.applyToDOM(document.getElementById("app"), template, templateData);

function fireme(e) {
	alert("You're fired!");
}

function datetime_update() {
	templateData.data.now = new Date().toString();
	__noname.applyToDOM(document.getElementById("app"), template, templateData);
}

function input_update(e) {
	templateData.data.inputValue = this.value;
	__noname.applyToDOM(document.getElementById("app"), template, templateData);
}