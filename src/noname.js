//COURTESEY OF moonjs.ga
var __lex = (function () {
	// Concatenation Symbol
	var concatenationSymbol = " + ";
	// Opening delimiter
	var openRE = /\{\{\s*/;
	// Closing delimiter
	var closeRE = /\s*\}\}/;
	// Whitespace character
	var whitespaceCharRE = /[\s\n]/;
	// All whitespace
	var whitespaceRE = /[\s\n]/g;
	// Start of a tag or comment
	var tagOrCommentStartRE = /<\/?(?:[A-Za-z]+\w*)|<!--/;
	// Dynamic expressions
	var expressionRE = /"[^"]*"|'[^']*'|\d+[a-zA-Z$_]\w*|\.[a-zA-Z$_]\w*|[a-zA-Z$_]\w*:|([a-zA-Z$_]\w*)(?:\s*\()?/g;
	// HTML Escapes
	var escapeRE = /(?:(?:&(?:amp|gt|lt|nbsp|quot);)|"|\\|\n)/g;
	var escapeMap = {
		"&amp;": '&',
		"&gt;": '>',
		"&lt;": '<',
		"&nbsp;": ' ',
		"&quot;": "\\\"",
		'\\': "\\\\",
		'"': "\\\"",
		'\n': "\\n"
	};
	// Global Variables/Keywords
	var globals = ["instance", "staticNodes", "true", "false", "undefined", "null", "NaN", "typeof", "in"];
	// Void and SVG Elements
	var VOID_ELEMENTS = ["area", "base", "br", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];
	var SVG_ELEMENTS = ["animate", "circle", "clippath", "cursor", "defs", "desc", "ellipse", "filter", "font-face", "foreignObject", "g", "glyph", "image", "line", "marker", "mask", "missing-glyph", "path", "pattern", "polygon", "polyline", "rect", "svg", "switch", "symbol", "text", "textpath", "tspan", "use", "view"];
	// Data Flags
	var FLAG_SVG = 1;
	var FLAG_STATIC = 1 << 1;
	// Trim Whitespace
	var trimWhitespace = function (value) {
		return value.replace(whitespaceRE, '');
	};

	return function (template) {
		var length = template.length;
		var tokens = [];
		var current = 0;
	  
		while (current < length) {
			var char = template[current];

			if (char === '<') {
				current++;

				if (template.substring(current, current + 3) === "!--") {
					// Comment
					current += 3;
					var endOfComment = template.indexOf("-->", current);

					if (endOfComment === -1) {
						current = length;
					} else {
						current = endOfComment + 3;
					}
				} else {
					// Tag
					var tagToken = {
						type: "Tag",
						value: ''
					}
			
					var tagType = '';
					var attributes = {};
					var closeStart = false;
					var closeEnd = false;
			
					char = template[current];
			
					// Exit starting closing slash
					if (char === '/') {
						char = template[++current];
						closeStart = true;
					}
			
					// Get tag name
					while ((current < length) && ((char !== '>') && (char !== '/') && (whitespaceCharRE.test(char) === false))) {
						tagType += char;
						char = template[++current];
					}
			
					// Iterate to end of tag
					while ((current < length) && ((char !== '>') && (char !== '/' || template[current + 1] !== '>'))) {
						if (whitespaceCharRE.test(char) === true) {
							// Skip whitespace
							char = template[++current];
						} else {
						// Find attribute name
							var attrName = '';
							var attrValue = '';

							while ((current < length) && ((char !== '=') && (whitespaceCharRE.test(char) === false) && ((char !== '>') && (char !== '/' || template[current + 1] !== '>')))) {
								attrName += char;
								char = template[++current];
							}
				
							// Find attribute value
							if (char === '=') {
								char = template[++current];
				
								var quoteType = ' ';

								if (char === '"' || char === '\'' || char === ' ' || char === '\n') {
									quoteType = char;
									char = template[++current];
								}
				
								// Iterate to end of quote type, or end of tag
								while ((current < length) && ((char !== '>') && (char !== '/' || template[current + 1] !== '>'))) {
									if (char === quoteType) {
										char = template[++current];
										break;
									} else {
										attrValue += char;
										char = template[++current];
									}
								}
							}
				
							var attrToken = {
								name: attrName,
								value: attrValue,
								argument: undefined,
								data: {}
							}
				
							var splitAttrName = attrName.split(':');

							if(splitAttrName.length === 2) {
								attrToken.name = splitAttrName[0];
								attrToken.argument = splitAttrName[1];
							}
				
							attributes[attrName] = attrToken;
						}
					}
			
					if (char === '/') {
						current += 2;
						closeEnd = true;
					} else {
						current++;
					}
			
					tagToken.value = tagType;
					tagToken.attributes = attributes;
					tagToken.closeStart = closeStart;
					tagToken.closeEnd = closeEnd;
					tokens.push(tagToken);
				}
			} else {
				// Text
				var textTail = template.substring(current);
				var endOfText = textTail.search(tagOrCommentStartRE);
				var text;

				if (endOfText === -1) {
					text = textTail;
					current = length;
				} else {
					text = textTail.substring(0, endOfText);
					current += endOfText;
				}

				if (trimWhitespace(text).length !== 0) {
					tokens.push({
						type: "Text",
						value: text.replace(escapeRE, function (match) {
							return escapeMap[match];
						})
					});
				}
			}
		}

		return tokens;
	} 
})();
var __stripHTML = function (rawHTML) {
	if (!rawHTML) {
		return "";
	}

	var cleanDiv = document.createElement("div");

	cleanDiv.innerHTML = rawHTML;
	return cleanDiv.innerText;
};
//COURTESEY OF MR. J. RESIG
var __tmpl = (function () {
	var cache = {};
	var DELIMITER = { "start": "<%", "end": "%>" };

	//private functions
	return function tmpl(str, data) {  // Simple JavaScript Templating || John Resig - http://ejohn.org/ - MIT Licensed
		// Figure out if we're getting a template, or if we need to
		// load the template - and be sure to cache the result.
		var fn = !/\W/.test(str) ?
		  cache[str] = cache[str] ||
			tmpl(document.getElementById(str).innerHTML) :

		// Generate a reusable function that will serve as a template
		// generator (and which will be cached).
		new Function("obj",
			"var p=[],print=function(){p.push.apply(p,arguments);};" +
			//PM - Added fix for issue where null obj throws an error
			"obj = obj || {};" +

			// Introduce the data as local variables using with(){}
			"with(obj){p.push('" +

			// Convert the template into pure JavaScript
			// Grabbed apostrophe fix from http://weblog.west-wind.com/posts/2008/Oct/13/Client-Templating-with-jQuery
			str
				.replace(/[\r\t\n]/g, " ")
				.replace(new RegExp("'(?=[^" + DELIMITER.end.substr(0, 1) + "]*" + DELIMITER.end + ")", "g"), "\t")
				.split("'").join("\\'")
				.split("\t").join("'")
				.replace(new RegExp(DELIMITER.start + ":(.+?)" + DELIMITER.end, "g"), "',__stripHTML($1),'")
				.replace(new RegExp(DELIMITER.start + "=(.+?)" + DELIMITER.end, "g"), "',$1,'")
				.split(DELIMITER.start).join("');")
				.split(DELIMITER.end).join("p.push('")
			+ "');}return p.join('');"
		);

		// Provide some basic currying to the user
		return data ? fn(data) : fn;
	}
})();

(function () {
	"use strict";
	var isFunctionRE = /^\{%([^%\}]*)%\}$/;
	
	function fireme(e) {
		alert("You're fired!");
	}

	function datetime_update() {
		console.log("update datetime here");
	}

	//setInterval(function () {
		var templateData = {
			"data": {
				"paragraph": "This is a test paragraph",
				"heading": "Hello World",
				"now": new Date().toString()
			},
			"functions": {
				"fireme": fireme,
				"datetime_update": datetime_update
			}
		};
		var template = __tmpl(
			'<div class="true-stuff-class no-show"><h1><%:heading %></h1><p onclick="{%fireme%}"><%:paragraph %></p><div class="row" onmouseover="{%datetime_update%}">Row<div class="col">Col</div></div><pre>Time: <%:now %></pre></div>'
		, templateData.data);
		var lexResults = __lex(template);

		console.log(lexResults);

		var renderFunctionBody = [];

		for (var i = 0, l = lexResults.length; i < l; i++) {
			var cLex = lexResults[i];
			var cLexType = cLex.type;

			if (cLexType == "Tag") {
				if (cLex.closeStart) {
					renderFunctionBody.push('IncrementalDOM.elementClose("' + cLex.value + '");');
				} else {
					var attributes = cLex.attributes;
					var tagAttributes = [];

					if (Object.keys(attributes).length > 0) {
						for (var attributeKey in attributes) {
							var attribute = attributes[attributeKey];
							var attributeValue = attribute.value;
							var isFunctionResults = isFunctionRE.exec(attributeValue);
							var isFunction = !!isFunctionResults;

							tagAttributes.push('"' + attribute.name + '"');

							if (!!isFunction) {
								var functionName = isFunctionResults[1];
								var candidateFunction = templateData.functions[functionName];

								if (typeof(candidateFunction) === "function") {
									console.log("function found");
									tagAttributes.push("fn." + functionName);
								} else {
									console.log("function not found");
									tagAttributes.pop();
								}
							} else {
								tagAttributes.push('"' + attribute.value + '"');
							}
						}
					}

					renderFunctionBody.push('IncrementalDOM.elementOpen("' + cLex.value + '",null,null' + (tagAttributes.length > 0 ? ',' + tagAttributes.join(',') : "") + ');');
				}
			} else if (cLexType == "Text") {
				renderFunctionBody.push('IncrementalDOM.text("' + cLex.value + '");');
			}
		}

		var renderFunction = new Function("fn", renderFunctionBody.join(""));

		console.log(renderFunction);
		IncrementalDOM.patch(document.getElementById("app"), renderFunction, templateData.functions);
	//}, 250);
})();
