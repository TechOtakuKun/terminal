(function() {
	Vue.config.devtools = false;
	new Vue({
		el: 'body',
		data: {
			stringList: [],
			inputString: ''
		},
		ready: function() {
			this.splitString("are + aa234dddd");
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
			 * 切割后压入对应的栈
			 * 变量或数字压入varStack，运算符压入optStack
			 * return 字符串切割后的结果
			 */
			splitString: function(string) {
				var blankReg = /(^\s*)|(\s*$)/g; // 匹配首尾空格
				var optReg = /([\+\-\*\/\!\%\^\&\(\)])/; // 匹配运算符+-*/!%&左右括号
				var varReg = /(\w+)/; // 匹配变量 
				var optStack = []; // 运算符栈
				var varStack = []; // 变量栈
				while (string.length > 0) {

					string = string.replace(blankReg, ''); // 去除空格

					if (optReg.test(string[0])) { // 匹配结果为运算符
						optStack.push(string[0]);
						string = string.substring(1);

					} else if (varReg.test(string[0])) { // 变量
						var temp = string.match(varReg)[0];
						varStack.push(temp);
						string = string.replace(varReg, "")

					} else {
						console.log("ERROR - 无法处理的符号：" + string[0]);
						break;
					}
				}
				console.log(varStack)
				console.log(optStack)

			},

			/*
			 * 运算
			 * @param opt 运算符
			 * @param n1
			 * @param n1
			 * @return 
			 */
			calculate: function(opt, n1, n2) {
				switch (opt) {
					case "+":
						return n2 + n1;
					case "-":
						return n2 - n1;
					case "*":
						return n2 * n1;
					case "/":
						return n2 / n1;
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