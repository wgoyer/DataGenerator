[![Stories in Ready](https://badge.waffle.io/wgoyer/DataGenerator.png)](http://waffle.io/wgoyer/DataGenerator)  
DataGenerator
=============

Building / Running
------------------

1.	git clone https://github.com/wgoyer/DataGenerator.git
2.	cd DataGenerator
3.	npm install
4.	grunt server
5.	Create ignore directory
6.  Add two files to ignore directory called: 


		baseURI.js
		rallyAuth.js


7.	baseURI should look like this:


		var baseURI = '<server>/slm/webservice/v2.0';
		module.exports = baseURI;


8.	rallyAuth should look like this:


		var rallyAuth = ["user@rallydev.com", "password"];
		module.exports = rallyAuth;