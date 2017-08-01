var webpack=require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin'); //html模板
var ExtractTextPlugin = require('extract-text-webpack-plugin');	//抽离css样式

module.exports={
	entry:{
		app:'./index.js',
		vendor:[
			'react',
			'react-dom',
			'react-router',
			'react-redux',
			'redux',
			'fetch'
		]
	},
	output:{
		path:__dirname+'/build',
		filename:'[name].[chunkhash:8].js',
		publicPath:'/'
	},
	resolve:{
		extensions:['','.js','.jsx']
	},
	module:{
		loaders:[
			{
				test:/\.(js|jsx)$/,
				exclude:/node_modules/,
				loader:'babel',
				query:{
					presets:['es2015','react'],
					plugins:['react-transform']
				}
			},{
				test:/\.sass/,
				exclude:/node_modules/,
				loader:ExtractTextPlugin.extract("style","css!postcss!sass")
			},{
				test:/\.css/,
				exclude:/node_modules/,
				loader:ExtractTextPlugin.extract("style","css!postcss")
			},{
				test:/\.(png|gif|jpg|jpeg|bmp)$/i, 
				loader:'url-loader?limit=5000&name=img/[name].[chunkhash:8].[ext]'
			},{
				test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, 
				loader:'url-loader?limit=5000&name=fonts/[name].[chunkhash:8].[ext]'
			}
		]
	},
	postcss:[
		require("autoprefixer")
	],
	plugins:[
		new webpack.BannerPlugin("autor CR"),
		new HtmlWebpackPlugin({
			template:__dirname+'/index.tmpl.html'
		}),
		new webpack.DefinePlugin({
			'process.env':{
				"NODE_ENV":JSON.stringify(process.env.NODE_ENV)
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress:{
				warnings:false
			}
		}),
		new ExtractTextPlugin('[name].[chunkhash:8].css'),
		new webpack.optimize.CommonsChunkPlugin({
			name:'vendor',
			filename:'[name].[chunkhash:8].js'
		}),
		new webpack.DefinePlugin({
			__DEV__:JSON.stringify(JSON.parse((process.env.NODE_ENV=='dev')||'false'))
		})
	]
}