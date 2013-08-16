[![Stories in Ready](https://badge.waffle.io/wgoyer/DataGenerator.png)](http://waffle.io/wgoyer/DataGenerator)  
DataGenerator
=============

Building / Running
------------------

1.	git clone https://github.com/brandon-fryslie/DataGenerator.git
2.	cd DataGenerator
3.	npm install
4.	grunt server
5.  Create ignore directory
6.  Add the files: baseURI.js and rallyAuth.js to the ignore directory
7.  baseURI template is:
	var baseURI = 'https://<server>/slm/webservice/v2.0';
	module.exports = baseURI;
8.  rallyAuth template is:
	var rallyAuth = ["<username@domain.123>", "<password>"];
	module.exports = rallyAuth;