# 6oz.js

A JavaScript library using intuitive templating and Google's Incremental DOM library to efficiently update data changes to the real browser DOM.

## Getting Started

You will need to download and place both the Incremental DOM and 6oz.js JavaScript files on your website.  Load Incremental DOM first.  The copy of Incremental DOM in this repository has a bug fix that sets the elements actual properties for attributes like `value`, `checked`, `disabled`, etc.

```
<script type="text/javascript" src="incremental-dom-min.js"></script>
<script type="text/javascript" src="6oz.min.js"></script>
```

## Templating

Templating is done using code blocks.  Within the code blocks you can use normal JavaScript.  Simple!  The code blocks are inspired by and match to ASP.Net Web Forms code blocks.  To start a code block write `<%` and to close a code block write `%>`.


#### Rendering Data
To render data in your template that is not HTML encoded use the start block `<%=`.  Use this if you wish to write in HTML into the template.

To render data in your template that is HTML encoded use the start block `<%:`.  Use this if you wish to write in text into the template.

For the examples below we are using the following variable
```
var templateData = {
	"htmlText": "<p>Hello world</p>"
};
```
**Template 1**
```
<div><%=htmlText %></div>
```
*will yield*
```
<div><p>Hello world</p></div>
```
**Template 2**
```
<div><%:htmlText %></div>
```
*will yield*
```
<div>&lt;p&gt;Hello world&lt;p&gt;</div>
```

#### JavaScript In Your Template
You can run JavaScript right in your template.  This is useful to conditionally render and/or loop through data in your render logic.

For the example below we are using the following variable
```
var templateData = {
	"header": "My Example",
	"showHeader": true,
	"items": [
		"Hi there",
		"Hello mate",
		"Gidday",
		"Mate",
		"Dave"
	]
};
```
**Template**
```
<% if (showHeader) { %>
<h1><%:header %></h1>
<% } %>
<ul>
<% for (var i = 0, l = items.length; i < l; i++) { %>
	<li><%:items[i] %></li>
<% } %>
</ul>
```
*will yield*
```
<h1>My Example</h1>
<ul>
	<li>Hi there</li>
	<li>Hello mate</li>
	<li>Gidday</li>
	<li>Mate</li>
	<li>Dave</li>
</ul>
```
## Incremental DOM
6oz.js uses Google's Incremental DOM JavaScript library to efficiently patch rendered templates against the DOM.  The low level complexities are all handled by 6oz.js.

To start call the `applyToDOM(mountElement, templateOrTemplateID, data)` function with three arguments.  This will return a context to allow you to easily update the template with new/changed data.

```
var elMount = document.getElementById("app");
var template = '<div onclick="demoTemplate_click" class="demo-template"><%:text %></div>';
var demoTemplate_click = function () {
	alert("Demo template clicked!");
};
var templateData = {
	"data": {
		"text": "Hello world"
	},
	"functions": {
		"demoTemplate_click": demoTemplate_click
	}
};
var context = __6oz.applyToDOM(elMount, template, templateData);

templateData.data.text = "New text will be updated";
context.update(templateData);
```

##### Lists (key-id)
Within your templates you may have items that are repeated such as list items (li) or select options (option).  Incremental DOM can have a hard time discerning the differences when updating if the items are similar.  To aid the diffing process, add an attribute of `key-id` on your repeating element.  More about this here, http://google.github.io/incremental-dom/#conditional-rendering/array-of-items.

##### Props
Introduced in v1.0.1 you can now attach data properties to an element by using the attribute `props` on your element.  This is a special attribute for 6oz and it will attach the data to that element.  This should be used in place of storing literal values on the DOM itself.  You can store any JavaScript object using this.  i.e. string, bool, numbers, functions, object.

You can access the properties attached in any event function(s) on that element.  It is accessible via `this.props`.

_Below is template code_
```
<div id={elementID} props={myDivProperties} onclick={div_click}></div>
```
_Below is JavaScript code_
```
var data = {
	"elementID": "divHelloWorld",
	"myDivProperties": {
		"isTest": true,
		"myCustomFunction": function () {
			console.log("Hello world!");
		},
		"myInt": 1000
	},
	"div_click": function () {
		console.log("This is how you access your properties in events", this.props);
	}
};
```

##### Ignoring elements (skip-node)
When using external libraries that mutate the DOM, 6oz will need to ignore the parent element that the external library is contained in.  If this isn't applied, when 6oz updates the DOM it will override the changes to the DOM.  To ignore a DOM element, add `skip-node="true"` to the element.  It will ignore the element you apply the attribute to and all it's children.

```
<div>
	<h1>This is the header for the template</h1>
	<p><%:paragraphText %></p>
	<div class="external-lookup" skip-node="true"></div>
</div>
```

## Components
6oz.js allows you to create components which are templates that can be reused.  You can define components using the snippet below.  The component name must be kebab case and contain at least one hyphen.  The second parameter must be the template or the template ID.

```
__6oz.addComponent({
    "componentName": "my-custom-component-name",
    "template": "<h1>This is my template</div>",
    "controller": function (props) {
        this.myFunctionInsideComponent = function () {
            console.log("myFunctionInsideComponent controller function invoked");
        };
    } 
});
__6oz.addComponent({
    "componentName": "my-custom-component-name-2",
    "template": "myTemplateID"
});
```

Use the components in any of your templates (including component templates, components in components baby!) in your app by writing a tag with your component name.  You can pass data to be used in the components using attributes on the tag.  If it's not text, use curly braces to pass JavaScript objects/data through.

_Below is template code_
```
<% var templateDataInScope = {
    "arrayOfStuff": [1, 2, 3],
    "o": {
        "value": "Hello world"
    }
}; %>
<my-custom-component-name
    bodyText="This is an example of just passing a string in."
    customData={templateDataInScope}
    hardCodedData={{ "o": "Fixed data" }} />
```

Accessing the data passed into the component within the template is simple.  Just use the `props` object in the template to access the data.  You can also access the controller data and functions by using the `controller` object in the template.

```
<h1 onclick="controller.myControllerFunction">This is the my component template</h1>
<p><%=props.bodyText %></p>
<pre><%=props.customData.o.value %></pre>
<ul>
<% var arr = props.customData.arrayOfStuff;
for (var i = 0, l = arr.length; i < l; i++) { %>
<li><%=arr[i] %></li>
<% } %>
</ul>
```

## FAQ
### Unusual rendering and event bindings are occurring
This can occur when the Incremental DOM library cannot discern the difference between two elements in updates.  This can occur if the DOM structure is similar in two different templates.  To resolve this, place a key-id on the top level element that is having issues.  Refer to Lists (key-id) above in README.

## Authors

**Phillip Moon**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
