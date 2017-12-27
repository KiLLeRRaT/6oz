# noname.js

A JavaScript library using easy templating and Google's Incremental DOM library to efficiently update data changes to the real browser DOM.

## Getting Started

You will need to download and place both the Incremental DOM and noname.js JavaScript files on your website.  Load Incremental DOM first.  The copy of Incremental DOM in this repository has a bug fix that sets the elements actual properties for attributes like `value`, `checked`, `disabled`, etc.

```
<script type="text/javascript" src="incremental-dom-min.js"></script>
<script type="text/javascript" src="noname.min.js"></script>
```

### Templating

Templating is done using code blocks.  Within the code blocks you can use normal JavaScript.  Simple!  The code blocks are inspired by and match to ASP.Net Web Forms code blocks.  To start a code block write `<%` and to close a code block write `%>`.


#### Rendering Data
To render data in your template that is not HTML encoded use the start block `<%=`.  Use this if you wish to write in HTML into the template.

To render data in your template that is HTML encoded use the start block `<%:`.  Use this if you wish to write in HTML into the template.

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
You can run JavaScript right in your template.  This is useful to conditionally and loop through data in your render logic.

For the example below we are using the following variable
```
var templateData = {
	"header": "My Example",
	"items": [
		"Hi there",
		"Hello mate",
		"Gidday",
		"Mate",
		"Dave"
	]
};
```

```
<h1><%:header %></h1>
```







### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
