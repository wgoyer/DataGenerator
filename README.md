[![Stories in Ready](https://badge.waffle.io/wgoyer/DataGenerator.png)](http://waffle.io/wgoyer/DataGenerator)  
DataGenerator
=============

Building / Running
------------------

1.	git clone https://github.com/wgoyer/DataGenerator.git
2.	cd DataGenerator
3.	npm install
4.	Create ignore directory
5.  Add two files to ignore directory called: 


		baseURI.js
		rallyAuth.js


6.	baseURI should look like this:


		var baseURI = '<server>/slm/webservice/v2.0';
		module.exports = baseURI;


7.	rallyAuth should look like this:


		var rallyAuth = ["user@rallydev.com", "password"];
		module.exports = rallyAuth;


8.  node app.js

To Do
=============

1.  Create ability to randomize each artifact type starting with user stories: 
	1.	Design a schema for user stories.
	2.  Create array of 5 objects to randomize from in JS.
	3.  Add randomize option to jade file.
		1.  Use a tick box
		2.  Grey out all other fields when clicked
		3.  Same submit button
	4.  Create JSON file template for mongo import
	5.  Modify JS files to use mongo driver to randomize data instead of array of objects

2.  Fix status so that response posts a linked formatted ID to the status DIV
	