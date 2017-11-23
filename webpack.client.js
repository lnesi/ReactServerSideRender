const path=require('path');
const merge = require('webpack-merge');
const baseConfig = require("./webpack.base.js");

const config={
	//Normally we use index.js here but for the course we will use client.js
	entry:'./src/client/client.js', 
	output:{
		filename:'bundle.js',
		path:path.resolve(__dirname,'public')
	}
}
module.exports = merge(baseConfig,config);