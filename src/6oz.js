/**
 * v1.0.2
 * 6oz because coffee
      ( (
      ) )
    ........
    |      |]
    \      /
     `----'
 */

/*! loglevel - v1.4.1 - https://github.com/pimterry/loglevel - (c) 2016 Tim Perry - licensed MIT */
!function(a,b){"use strict";"function"==typeof define&&define.amd?define(b):"object"==typeof module&&module.exports?module.exports=b():a.log=b()}(this,function(){"use strict";function a(a){return typeof console===h?!1:void 0!==console[a]?b(console,a):void 0!==console.log?b(console,"log"):g}function b(a,b){var c=a[b];if("function"==typeof c.bind)return c.bind(a);try{return Function.prototype.bind.call(c,a)}catch(d){return function(){return Function.prototype.apply.apply(c,[a,arguments])}}}function c(a,b,c){return function(){typeof console!==h&&(d.call(this,b,c),this[a].apply(this,arguments))}}function d(a,b){for(var c=0;c<i.length;c++){var d=i[c];this[d]=a>c?g:this.methodFactory(d,a,b)}}function e(b,d,e){return a(b)||c.apply(this,arguments)}function f(a,b,c){function f(a){var b=(i[a]||"silent").toUpperCase();try{return void(window.localStorage[l]=b)}catch(c){}try{window.document.cookie=encodeURIComponent(l)+"="+b+";"}catch(c){}}function g(){var a;try{a=window.localStorage[l]}catch(b){}if(typeof a===h)try{var c=window.document.cookie,d=c.indexOf(encodeURIComponent(l)+"=");d&&(a=/^([^;]+)/.exec(c.slice(d))[1])}catch(b){}return void 0===k.levels[a]&&(a=void 0),a}var j,k=this,l="loglevel";a&&(l+=":"+a),k.levels={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,SILENT:5},k.methodFactory=c||e,k.getLevel=function(){return j},k.setLevel=function(b,c){if("string"==typeof b&&void 0!==k.levels[b.toUpperCase()]&&(b=k.levels[b.toUpperCase()]),!("number"==typeof b&&b>=0&&b<=k.levels.SILENT))throw"log.setLevel() called with invalid level: "+b;return j=b,c!==!1&&f(b),d.call(k,b,a),typeof console===h&&b<k.levels.SILENT?"No console available for logging":void 0},k.setDefaultLevel=function(a){g()||k.setLevel(a,!1)},k.enableAll=function(a){k.setLevel(k.levels.TRACE,a)},k.disableAll=function(a){k.setLevel(k.levels.SILENT,a)};var m=g();null==m&&(m=null==b?"WARN":b),k.setLevel(m,!1)}var g=function(){},h="undefined",i=["trace","debug","info","warn","error"],j=new f,k={};j.getLogger=function(a){if("string"!=typeof a||""===a)throw new TypeError("You must supply a name when creating a logger.");var b=k[a];return b||(b=k[a]=new f(a,j.getLevel(),j.methodFactory)),b};var l=typeof window!==h?window.log:void 0;return j.noConflict=function(){return typeof window!==h&&window.log===j&&(window.log=l),j},j});

var __escapeHTML = function (rawHTML) {
	if (!rawHTML) {
		return "";
	}

	if (typeof rawHTML != "string") {
		rawHTML = rawHTML.toString();
	}

	return rawHTML
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
};
var __unescapeHTML = function (rawValue) {
	if (!rawValue) {
		return "";
	}

	if (typeof rawValue != "string") {
		rawValue = rawValue.toString();
	}

	return rawValue
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, "\"")
		.replace(/&apos;/g, "'");
};

(function () {
	"use strict";
	/**
	 * EXTERNAL LIBS/HELPERS
	 */
	//COURTESY OF moonjs.ga
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
		var escapeRE = /(?:(?:&(?:amp|gt|lt|nbsp|quot|apos|#39);)|'|"|\\|\n)/g;
		var escapeMap = {
			"&amp;": '&',
			"&gt;": '>',
			"&lt;": '<',
			"&nbsp;": ' ',
			"&quot;": "\\\"",
			"&apos;": "\\\'",
			"&#39;": "\\\'",
			"'": "\\\'",
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
						};
				
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
									var isScopedValue = false;
									var openBraceCount = 0;

									if (char === '"' || char === '\'' || char === ' ' || char === '\n' || char === '{') {
										isScopedValue = char === '{';
										quoteType = isScopedValue ? '}' : char;
										char = template[++current];
									}

									if (isScopedValue) {
										attrValue += '{';
									}

									// Iterate to end of quote type, or end of tag
									while ((current < length) && ((char !== '>') && (char !== '/' || template[current + 1] !== '>'))) {
										if ((!isScopedValue || (isScopedValue && openBraceCount <= 0)) && char === quoteType) {
											if (isScopedValue) {
												attrValue += '}';
											}

											char = template[++current];
											break;
										} else {
											attrValue += char;
											
											if (char === '{') {
												openBraceCount++;
											} else if (char === '}') {
												openBraceCount--;
											}

											char = template[++current];
										}
									}
								}
					
								var attrToken = {
									name: attrName,
									value: __unescapeHTML(attrValue),
									argument: undefined,
									data: {}
								};
					
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
	//COURTESY OF MR. J. RESIG
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
						.replace(new RegExp("=\{(.+?(\}+)?)\}", "g"), "=',__6oz.registerData($1),'")
						.split("\t").join("'")
						.replace(new RegExp(DELIMITER.start + ":(.+?)" + DELIMITER.end, "g"), "',__escapeHTML($1),'")
						.replace(new RegExp(DELIMITER.start + "=(.+?)" + DELIMITER.end, "g"), "',$1,'")
						.split(DELIMITER.start).join("');")
						.split(DELIMITER.end).join("p.push('")
					+ "');}return p.join('');"
				);

			// Provide some basic currying to the user
			return data ? fn(data) : fn;
		};
	})();

	/**
	 * LIBRARY STARTS HERE
	 */
	var isFunctionRE = /^on[a-z]+$/i;
	var isPropRE = /^props$/i;
	var PARAM_NAME = "__data";
	var LOG_PREFIX = ">>[6oz.js] ";
	var _lib = {};
	var _logger = log.getLogger("6oz logger");
	var _components = {};
	var _dataRegister = {};
	var _componentProps = {};
	var _dataToIncrementalDOM = {};

	function applyToDOM(el, template, templateData) {
		var renderedTemplate = __tmpl(template, templateData.data);
		var lexResults = __lex(renderedTemplate);
		var renderFunctionBody = processLexTemplate(lexResults, templateData.functions, PARAM_NAME + ".__fn");
		var renderFunction = new Function(PARAM_NAME, renderFunctionBody.join(""));

		_dataToIncrementalDOM.__fn = templateData.functions;
		IncrementalDOM.patch(el, renderFunction, _dataToIncrementalDOM);
		_dataRegister = {};
		_dataToIncrementalDOM = {};
		return {
			"update": function (updateTemplateData) {
				applyToDOM(el, template, updateTemplateData);
			}
		};
	}
	function processLexTemplate(lexResults, templateFunctions, functionPrefix) {
		var renderFunctionBody = [];
		var isComponentTag = function (tagName) {
			return tagName && tagName.indexOf("-") > -1;
		};
		var nodeLevel = 0;
		var weAreSkippingNodes = false;

		for (var i = 0, l = lexResults.length; i < l; i++) {
			var cLex = lexResults[i];
			var cLexType = cLex.type;
			var cLexValue = cLex.value;
			var thisIsComponentTag = isComponentTag(cLexValue);
			var isSkipNode = cLex.attributes && cLex.attributes["skip-node"] && cLex.attributes["skip-node"].value == "true";
			var getTagDetails = function (c, t, f) {
				var results = processTag(c, t, f);

				results.elementKeyID = results.elementKeyID == null ? "null" : JSON.stringify(results.elementKeyID);
				return results;
			};
			var tagDetails;

			if (cLexType == "ComponentStart") {
				_dataToIncrementalDOM[cLex.attributes.componentID] = templateFunctions;
				renderFunctionBody.push('(function (o) {');
			} else if (cLexType == "ComponentEnd") {
				renderFunctionBody.push('})(' + PARAM_NAME + '["' + cLex.attributes.componentID + '"]);');
			} else if (cLexType == "Tag") {
				if (!cLex.closeStart && isSkipNode && !weAreSkippingNodes) {
					tagDetails = getTagDetails(cLex, templateFunctions, functionPrefix);
					renderFunctionBody.push('IncrementalDOM.' + tagDetails.elementType + '("' + cLexValue + '",' + tagDetails.elementKeyID + ',null' + tagDetails.tagAttributesString + ');');
					renderFunctionBody.push("IncrementalDOM.skip();");
					weAreSkippingNodes = true;
					nodeLevel = 0;
				} else if (cLex.closeStart && !thisIsComponentTag) {
					if (nodeLevel-- == 0) {
						weAreSkippingNodes = false;
					}

					if (!weAreSkippingNodes) {
						renderFunctionBody.push('IncrementalDOM.elementClose("' + cLexValue + '");');
					}
				} else if (thisIsComponentTag && !weAreSkippingNodes) {
					var componentResults = processComponent(cLex);

					if (componentResults === false) {
						continue;
					}

					renderFunctionBody = renderFunctionBody.concat(componentResults);
				} else if (!thisIsComponentTag) {
					nodeLevel++;

					if (!weAreSkippingNodes) {
						tagDetails = getTagDetails(cLex, templateFunctions, functionPrefix);
						renderFunctionBody.push('IncrementalDOM.' + tagDetails.elementType + '("' + cLexValue + '",' + tagDetails.elementKeyID + ',null' + tagDetails.tagAttributesString + ');');
					}
				}
			} else if (cLexType == "Text" && !weAreSkippingNodes) {
				renderFunctionBody.push('IncrementalDOM.text("' + cLexValue.replace(/(?:\r\n|\r|\n)/g, "") + '");');
			}
		}

		return renderFunctionBody;
	}
	function processTag(cLex, templateFunctions, functionPrefix) {
		if (!cLex) {
			return false;
		}

		var attributes = cLex.attributes;
		var tagAttributes = [];
		var tagAttributesString = "";
		var elementType = cLex.closeEnd ? "elementVoid" : "elementOpen";
		var elementKeyID = null;
		var checkForFunction = function (templateFunctions, fnName) {
			if (fnName.indexOf(".") == -1) {
				return templateFunctions[fnName];
			}

			var fnNameSplit = fnName.split(".");
			var fnFound = templateFunctions;
			var madeItToEnd = true;

			for (var i = 0, l = fnNameSplit.length; i < l; i++) {
				var currentFn = fnFound[fnNameSplit[i]];

				if (!currentFn) {
					madeItToEnd = false;
					break;
				}

				fnFound = currentFn;
			}

			if (madeItToEnd) {
				return fnFound;
			}
		};

		if (Object.keys(attributes).length > 0) {
			for (var attributeKey in attributes) {
				var attribute = attributes[attributeKey];
				var attributeName = attribute.name;
				var attributeValue = attribute.value.replace(/(?:\r\n|\r|\n)/g, "");
				var isEventAttribute = isFunctionRE.test(attributeName);
				var isPropAttribute = isPropRE.test(attributeName);

				if (attributeName.toLowerCase() == "key-id") {
					elementKeyID = attributeValue;
					continue;
				}

				tagAttributes.push(JSON.stringify(attribute.name));

				if (isEventAttribute) {
					var candidateFunction = checkForFunction(templateFunctions, attributeValue);

					if (typeof(candidateFunction) === "function") {
						tagAttributes.push(functionPrefix + "." + attributeValue);
					} else {
						_logger.warn(LOG_PREFIX + "Could not find the function " + attributeValue + " so event was not bound.");
						tagAttributes.pop();
					}
				} else if (isPropAttribute) {
					if (!_dataToIncrementalDOM.attributeProps) {
						_dataToIncrementalDOM.attributeProps = {};
					}
					
					var attributeFinalValue = JSON.stringify(attribute.value);
					var attributeGUID = /\{([a-zA-Z0-9\-]+)\}/.exec(attributeValue);

					if (attributeGUID && attributeGUID.length > 1) {
						attributeGUID = attributeGUID[1];
						_dataToIncrementalDOM.attributeProps[attributeGUID] = _dataRegister[attributeGUID];
						attributeFinalValue = PARAM_NAME + ".attributeProps['" + attributeGUID + "']";
					}

					tagAttributes.push(attributeFinalValue);
				} else {
					tagAttributes.push(JSON.stringify(attributeValue));
				}
			}
		}

		tagAttributesString = tagAttributes.length > 0 ? ',' + tagAttributes.join(',') : "";
		return { "elementType": elementType, "tagAttributesString": tagAttributesString, "elementKeyID": elementKeyID };
	}
	function processComponent(cLex) {
		var componentName = cLex.value.toLowerCase();
		var componentDetails = _components[componentName];
		
		if (!componentDetails) {
			return false;
		}

		var cLexAttributes = cLex.attributes;
		var attributes = {};
		var checkForScopedValue = function (value) {
			return value && /^\{(.*)\}$/.exec(value);
		};

		for (var key in cLexAttributes) {
			var attributeValue = cLexAttributes[key].value;
			var scopedValueResult = checkForScopedValue(attributeValue);

			if (scopedValueResult && scopedValueResult.length > 1 && scopedValueResult[1]) {
				var scopedValue = scopedValueResult[1];
				
				if (_dataRegister[scopedValue]) {
					attributes[key] = _dataRegister[scopedValue];
				} else {
					attributes[key] = undefined;
				}
			} else {
				attributes[key] = attributeValue;
			}
		}

		var componentController;
		var templateData = {
			"props": attributes
		};

		if (componentDetails.controller !== undefined) {
			componentController = new componentDetails.controller(attributes);
			templateData.controller = componentController;
		}

		var renderedTemplate = __tmpl(componentDetails.template, templateData);
		var lexResults = __lex(renderedTemplate);
		var componentID = guid();

		lexResults.unshift({ "type": "ComponentStart", "attributes": { "componentID": componentID } });
		lexResults.push({ "type": "ComponentEnd", "attributes": { "componentID": componentID } });
		attributes.props = {};

		for (var attributeName in attributes) {
			attributes.props[attributeName] = attributes[attributeName];
		}

		if (componentController !== undefined) {
			attributes.controller = componentController;
		}

		return processLexTemplate(lexResults, attributes, "o");
	}
	function addComponent(o) {
		o = o || {};

		if (!o.componentName || !o.template) {
			_logger.warn(LOG_PREFIX + "You must provide a componentName and template.");
			return false;
		}

		var componentName = o.componentName.toLowerCase();
		var controller = o.controller;
		var controllerToLoad;

		if (!/-[a-zA-Z0-9]+[^-]?$/.test(componentName)) {
			_logger.warn(LOG_PREFIX + "You must provide a valid component name [" + componentName + "].  It must be kebab case, must contain at least one hyphen, and must not end with a hyphen.");
			return;
		}

		if (_components[componentName]) {
			_logger.warn(LOG_PREFIX + "A component with name " + componentName + " has already been added.");
			return;
		}

		if (controller !== undefined && typeof(controller) === "function") {
			controllerToLoad = controller;
		}

		_components[componentName] = {
			"template": o.template,
			"controller": controllerToLoad
		};
		return true;
	}
	function registerData(data) {
		var dataKey = guid();

		_dataRegister[dataKey] = data;
		return "{" + dataKey + "}";
	}
	function guid() {
		function S4() {
			return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
		}

		return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
	}

	_lib.applyToDOM = applyToDOM;
	_lib.addComponent = addComponent;
	_lib.registerData = registerData;

	window.__6oz = _lib;

	IncrementalDOM.attributes.props = function (el, name, value) {
		el[name] = value;
	};
})();
