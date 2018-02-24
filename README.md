### start
一开始我想整一个项目，测试一下eslint是怎么玩的，然后我想要基于webpack，因为大部分项目我们是基于webpack来创建的。

于是我新建了一个项目，npm init,一直enter下去，生成了一个package.json，这个文件用来记录需要的node模块。

然后我开始安装需要的node模块，首先是webpack，npm install webpack --save-dev。

然后我开始查找eslint 和webpack如何结合？

在eslint的官网，http://eslint.cn/docs/user-guide/integrations，我发现了Build Systems --》Webpack: [eslint-loader](https://www.npmjs.org/package/eslint-loader)。

我开始按照eslint-loader的说明安装， npm install eslint-loader --save-dev，同时当然需要安装eslint了，npm install eslint --save-dev。

然后我们来配置一下webpack.config.js也就是webpack的配置文件,HtmlWebpackPlugin是用来生成对应index.html入口文件，默认加载我们编译好的js。

```
const path = require('path'); 
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'eslint.bundle.js'
	},
	plugins:[
		new HtmlWebpackPlugin(),
	]
};
```

在package.json加入scripts的运行命令

```
"beta": "webpack --env=beta"
```

然后npm run beta，我们发现编译成功，出现了一个dist目录，以及对应的生成的eslint.bundle.js。

下一步就是配置eslint-loader了，

```
const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'eslint.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "eslint-loader",
				options: {
		            // eslint options (if necessary) 
		            // fix : true
		        }
		    },
	    ],
	},
	plugins:[
		new HtmlWebpackPlugin(),
	]
};
```

然后尝试一下，在文件根目录创建一个index.js，然后npm run beta 运行，
```
class EslintDemo{
  func1(){
    console.log('ddddd')
  };
};

var EslintDemoSample = new EslintDemo();
EslintDemoSample.func1();
```
你会发现报错了webpack No ESLint configuration found

这是告诉我们还没有配置通过什么规则来对我们的代码进行校验，参照[eslint入门](https://eslint.org/docs/user-guide/getting-started)，我们执行./node_modules/.bin/eslint --init这个命令就可以了，选择需要的校验规则，这里我选择的是standard模板。

然后，npm run beta，就会发现报错信息了，提示你哪些代码写的是不对的。

但是这样不适合我们的开发模式，需要不断运行npm run beta，所以我们引入webpack-dev-server。

同样是npm install webpack-dev-server --save-dev，然后配置devserver配置项。

```
const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './index.js',

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'eslint.bundle.js'
	},

	devServer:{
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 9000
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "eslint-loader",
				options: {
		            // eslint options (if necessary) 
		            // fix : true
		        }
		    },
	    ],
	},

	plugins:[
		new HtmlWebpackPlugin(),
	]
};
```

在package.json的scripts中加入
```
"start": "webpack-dev-server",
```

至此，npm start 启动项目。然后在网页中打开http://localhost:9000就可以访问本页面了。