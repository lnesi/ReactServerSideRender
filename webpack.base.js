module.exports={
	//Tell webpack to run babel on every file it runs through to decode jsx and es6
	module:{
		rules:[
			{
				// Test a reg to all files to make sure is js file
				test:/\.js?$/,
				loader:'babel-loader',
				//reg ex of fodler to exclude
				exclude: /node_modules/,
				options:{
					presets:[
					'react',
					'stage-0',
					['env',{targets:{browsers:['last 2 versions']}}]
					]
				}

			}
		]
	}
}