const path=require('path');
const merge = require('webpack-merge');
const baseConfig = require("./webpack.base.js");
const webpackNodeExternals = require('webpack-node-externals');

const config={
	//Inform webpack that we are building a bundle for node js, rather than the browser
	target:'node',
	
	//Tell webpack the root file of our server application entry point
	entry:'./src/index.js',
	
	// Define output file that its generated
	output:{
		filename:'bundle.js',
		path:path.resolve(__dirname,'build')
	},
	//This will tell webpack not to bundle a library that is inside the node_modules folder.
	//We do not need to bundle libraries on server side because they can be loaded on runtime
	externals:[webpackNodeExternals()]	
}
module.exports = merge(baseConfig,config);