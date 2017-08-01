var webpack=require("webpack");
var HtmlWebpackPlugin=require('html-webpack-plugin');
var OpenBrowserPlugin=require("open-browser-webpack-plugin");

module.exports={
	entry:'./src/index.js',
	output:{
		path:__dirname+'/public',
		filename:'bundle.js'
	},
	module:{
		loaders:[
			{
				test:/\.(js|jsx)$/,
				exclude:/node_modules/,
				loader:'babel-loader',
				query:{
					presets:['react','es2015']/*,
					plugins:['react-transform']*/
				}
			},{
				test:/\.scss$/,
				exclude:/node_modules/,
				loader:'style-loader!css-loader!sass-loader'
			},{
				test:/\.css$/,
				exclude:/node_modules/,
				loader:'style-loader!css-loader'
			},{
				test:/\.(png|gif|jpg|jpeg|bmp)$/i, 
				loader:'url-loader?limit=5000'
			},{
				test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, 
				loader:'url-loader?limit=5000'
			}
		]
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin(),
		new OpenBrowserPlugin({
			url:'http://localhost:8080'
		}),
		new webpack.DefinePlugin({
        	__DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        })
	],
	devServer:{
		proxy:{
			'/api':{
				target:'http://localhost:3000',
				secure:false
			}
		},
		contentBase:'./public',
		historyApiFallback:true,
		inline:true,
		hot:true
	}
}