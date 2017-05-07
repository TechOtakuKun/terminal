(function() {
	Vue.config.devtools = false;
	new Vue({
		el: 'body',
		data: {
			optStack: [], // 运算符栈
			numStack: [], // 数字栈
			varHash: {}, // 存放变量的哈希表
			stringList: [],
			inputString: ''
		},
		ready: function() {
			this.splitString("234.324 + 5");
		},
		methods: {

			/*
			 * 当输入字符串后，
			 * 对数据结构stringList进行条目的添加
			 * 添加的条目是词法分析和语法分析后的结果
			 */
			pushData: function() {
				var prevList = this.stringList;
				prevList.push({
					stringOrigin: this.inputString,
					stringResult: this.inputString,
					type: 'success'
				});
				this.$set('stringList', prevList);
				this.$set('inputString', '');
			},

			/*
			 * @param 输入的字符串
			 * 对输入的字符串进行切割
			 * 切割的同时分析字符串是否合法
			 * 切割后压入对应的栈
			 * 变量或数字压入numStack，运算符压入optStack
			 * return
			 */
			splitString: function(string) {
				var blankReg = /(^\s*)|(\s*$)/g; // 匹配首尾空格
				var optReg = /(^[\+\-\*\/\!\%\^\&\(\)])/; // 匹配运算符+-*/!%&左右括号
				var numReg = /(^\d+)(\.?)(\d*)/; // 匹配数字（包括int、double） 
				var varReg = /(^\w+)/; // 匹配变量 
				var optStack = []; // 运算符栈
				var numStack = []; // 数字栈
				var validSymbol = ''; // 合法的字符
				while (string.length > 0) {

					string = string.replace(blankReg, ''); // 去除空格

					if (optReg.test(string)) { // 匹配结果为运算符
						optStack.push(string[0]);
						string = string.substring(1);

					} else if (numReg.test(string)) { // 数字
						var temp = parseFloat(string.match(numReg)[0]);
						numStack.push(temp);
						string = string.replace(numReg, "");

					} else if (varReg.test(string)) { // 变量
						var temp = string.match(varReg)[0];
						numStack.push(temp);
						string = string.replace(varReg, "");

					} else {
						console.log("ERROR - 无法处理的符号：" + string[0] + "(来自" + string + ")");
						break;
					}
				}
				console.log(this.calculate(optStack.pop(), numStack.pop(), numStack.pop()));
			},

			/*
			 * 栈的计算
			 */
			formatStack: function() {
				t
			},

			/*
			 * 运算
			 * @param opt 运算符
			 * @param n1
			 * @param n1
			 * @return 
			 */
			calculate: function(opt, n2, n1) {
				switch (opt) {
					case "+":
						return n1 + n2;
					case "-":
						return n1 - n2;
					case "*":
						return n1 * n2;
					case "/":
						return n1 / n2;
					default:
						throw new Error("unexpected operator:" + opt);
				}
			},

			/*
			 * 检查string是否为数字
			 */
			isNumber: function(string) {

			}
		}
	});
})();