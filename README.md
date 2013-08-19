[![Stories in Ready](https://badge.waffle.io/wgoyer/DataGenerator.png)](http://waffle.io/wgoyer/DataGenerator)  
DataGenerator
=============

Building / Running
------------------

1.	git clone https://github.com/brandon-fryslie/DataGenerator.git
2.	cd DataGenerator
3.	npm install
4.	grunt server
5.  Create a file in this directory called credentials.js that looks like this:
	exports.baseURI = '127.0.0.1:7001';
	exports.credentials = [ 'ue@test.com', 'Password' ];