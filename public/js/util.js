(function(window, undefined) {
	var util = {
		/*
		 * 去除字符串两边的空格
		 * return string
		 */
		trim: function(string) {
			var blankReg = /(^\s*)|(\s*$)/g; // 匹配首尾空格
			return string.replace(blankReg, "");
		},

		/*
		 * 判断字符串是否为数字
		 * return: true | false
		 */
		isNumber: function(string) {
			var numReg = /^\d+$/; // 匹配数字
			string = this.trim(string);
			return numReg.test(string);
		},

		/*
		 * 判断字符串是否为合法变量名
		 * return: true | false
		 */
		isVariable: function(string) {
			var numReg = /^\d/; // 匹配开头数字
			var varReg = /^\w+$/;
			string = UT.trim(string);
			if (numReg.test(string)) return false;
			return varReg.test(string);
		},

		/*
		 * 去除引号内容后，检查整个字符串是否含非法字符@#$等
		 * @paran string
		 * return true: 合法
		 *				false: 非法
		 */
		isValid: function(string) {
			var validReg = /^[\w\s\!\%\^\&\*\(\)\-\=\+\/]+$/; // 合法的所有字符
			// 返回字符串是否合法
			return validReg.test(string);
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
					return;
			}
		},

		/*
		 * 生成随机字符串
		 * return 随机string
		 */
		getRandString: function() {
			var string = "" + Math.random();
			string = string.substring(2);
			return "x" + string;
		}
	}

	// 注册进全局 window 对象中
	window.UT = util;

})(window);