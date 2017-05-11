(function(window) {
	function BNF(string) {
		this.string = string;
		this.index = 0; // 指针
		this.varHash = {
			a: 123
		}
	}

	BNF.prototype = {
		command: function() {
			// if ()
		},
		sentence: function() {
			var varReg = /^[a-zA-Z]\w*/;
			var string = this.string;
			if (varReg.test(string)) {
				string = UT.trim(string.replace(varReg, "")); // 剪去左方已匹配的字符串
				if (string[0] == "=") {
					string = UT.trim(string.replace("=", ""));
					// var numReg = /(^\d+|\-\d+)(\.?)(\d*)/;
					// if (numReg.test(string)) {
					// 	return
					// }
					if (this.expr(string)) {

					} else if (/^\[\]$/.test(string)) { // []  删除变量

					} else {
						// 错误处理
					}

				} else {
					return false;
					// 错误
				}
			}
		},

		/*
		 *  expr -> ArithExpr
		 */
		expr: function(string) {
			var result = this.arithExpr(string);
			if (result) {
				// return 
				console.log(result);
			} else {
				// 错误处理
			}
		},

		/*
		 * ArithExpr -> Number  |  Variable  
		 * 					|  (  ArithExpr  )   |  ArithExpr  +  ArithExpr
		 *					|  ArithExpr  –  ArithExpr  |  ArithExpr  *  ArithExpr  
		 *					|  ArithExpr  –  ArithExpr  |  ArithExpr  ^  ArithExpr  
		 *					|  ArithExpr  /  ArithExpr  |  – ArithExpr 
		 *					|  BoolExpr  ?  ArithExpr  :  ArithExpr
		 *					|  SingleFunc  |  MultipleFunc 
		 */
		arithExpr: function(string) {
			var array = string.split("");
			var indexAdd = string.lastIndexOf("+");
			var indexSub = string.lastIndexOf("-");
			var indexMul = string.lastIndexOf("*");
			var indexDiv = string.lastIndexOf("/");

			if (/(^\d+|\-\d+)(\.?)(\d*)$/.test(string)) { // Number
				return parseFloat(string);

			} else if (/^[a-zA-Z]\w*$/.test(string)) { // Variable
				if (this.varHash.hasOwnProperty(string) && this.varHash[string]) {
					return this.varHash[string];
				} else {
					// 错误:未知变量
					return false;
				}
			} else if (array.shift() == "(" && array.pop() == ")") { // ( arithExpr )
				string = array.join("");
				var result = this.arithExpr(string);
				if (result) {
					return result;
				} else {
					return false; // 错误处理
				}

			} else if (indexAdd > 0) { // +
				var leftString = UT.trim(string.substring(0, indexAdd));
				var rightString = UT.trim(string.substring(indexAdd + 1));
				var leftResult = this.arithExpr(leftString);
				var rightResult = this.arithExpr(rightString);
				if (leftResult && rightResult) {
					return leftResult + rightResult;
				} else {
					return false;
				}

			} else if (indexSub > 0) { // - 
				var leftString = UT.trim(string.substring(0, indexSub));
				var rightString = UT.trim(string.substring(indexSub + 1));
				var leftResult = this.arithExpr(leftString);
				var rightResult = this.arithExpr(rightString);
				if (leftResult && rightResult) {
					return leftResult - rightResult;
				} else {
					return false;
				}

			} else if (indexMul > 0) { // *
				var leftString = UT.trim(string.substring(0, indexMul));
				var rightString = UT.trim(string.substring(indexMul + 1));
				var leftResult = this.arithExpr(leftString);
				var rightResult = this.arithExpr(rightString);
				if (leftResult && rightResult) {
					return leftResult * rightResult;
				} else {
					return false;
				}

			} else if (indexDiv > 0) { // /
				var leftString = UT.trim(string.substring(0, indexDiv));
				var rightString = UT.trim(string.substring(indexDiv + 1));
				var leftResult = this.arithExpr(leftString);
				var rightResult = this.arithExpr(rightString);
				if (leftResult && rightResult) {
					return leftResult / rightResult;
				} else {
					return false;
				}
			}
		}
	};
	window.BNF = BNF;
})(window);