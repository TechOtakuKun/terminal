(function(window) {
	function BNF(string) {
		this.string = string;
		this.varHash = {
			a: 123
		}
	}

	BNF.prototype = {
		command: function() {
			// if ()
		},

		/*
		 * Sentence  ->  Variable = Expr  |  Variable = []  
		 *							|  Expr  |  IfSentence 
		 */
		sentence: function(string) {
			var string = UT.trim(string); // ####
			var indexEqual = string.indexOf("=");

			// ifSentence
			var indexIf = string.indexOf("if");
			var indexLParen = string.indexOf("(");
			var indexRParen = string.indexOf(")");
			var indexElse = string.lastIndexOf("else");
			var indexEnd = string.lastIndexOf("end");

			if (indexIf == 0 &&
				indexLParen > indexIf &&
				indexRParen > indexLParen &&
				indexElse > indexRParen &&
				indexEnd > indexElse) {
				// ifSenternce  ==>   if  (Expr)   Sentence  else  Sentence  end 

				var exprString = UT.trim(string.substring(2, indexLParen));
				var xSentence = UT.trim(string.substring(indexRParen + 1, indexElse));
				var ySentence = UT.trim(string.substring(indexElse + 1, indexEnd));
				if (this.expr(exprString)) {
					console.log(this.sentence(xSentence));
					return this.sentence(xSentence);

				} else {
					return this.sentence(ySentence);
				}

			} else if (indexEqual > 0) { // 包含"="号
				var leftString = UT.trim(string.substring(0, indexEqual));
				var rightString = UT.trim(string.substring(indexEqual + 1));

				if (!UT.isVariable(leftString)) return false;

				if (UT.isDel(rightString)) { // 删除语句  ==>  Variable = [] 
					this.varHash[leftString] = null;
					return true;

				} else { // 赋值语句  ==>  Variable = Expr
					var rightResult = this.expr(rightString);
					if (rightResult) {
						this.varHash[leftString] = rightResult;
						return true;

					} else {
						return false;
						// 错误处理
					}
				}

			} else { // 纯运算  =>  Expr 
				return this.expr(string);
			}
			console.log(this.varHash);
		},

		/*
		 *  expr -> ArithExpr
		 */
		expr: function(string) {
			var result = this.arithExpr(string);
			if (result) {
				// return 
				console.log(result);
				return result;
			} else {
				// 错误处理
				return false;
			}
		},

		/*
		 * ArithExpr -> Number  |  Variable |  (  ArithExpr  )   
		 *					|  ArithExpr  +  ArithExpr  |  ArithExpr  –  ArithExpr  
		 *					|  ArithExpr  *  ArithExpr  |  ArithExpr  –  ArithExpr  
		 *					|  ArithExpr  ^  ArithExpr  |  ArithExpr  /  ArithExpr  
		 *					|  – ArithExpr 
		 *					|  BoolExpr  ?  ArithExpr  :  ArithExpr
		 *					|  SingleFunc  |  MultipleFunc 
		 */
		arithExpr: function(string) {
			var array = string.split("");
			var indexPow = string.indexOf("^"); // 右结合
			var indexBin = string.indexOf("?"); // 右结合，故为indexOf
			var indexCol = string.lastIndexOf(":");

			var indexAdd = string.lastIndexOf("+"); // 左结合，故为lastIndexOf
			var indexSub = string.lastIndexOf("-");
			var indexMul = string.lastIndexOf("*");
			var indexDiv = string.lastIndexOf("/");

			// 递归是反向的，故按照运算符优先级从低到高排列
			if (UT.isNumber(string)) { // Number
				return parseFloat(string);

			} else if (UT.isVariable(string)) { // Variable
				// 查询存储变量的哈希表，若不存在则报错
				if (this.varHash.hasOwnProperty(string) && this.varHash[string]) {
					return this.varHash[string];

				} else {
					// 错误:未知变量
					return false;
				}
			} else if (indexBin > 0 && indexCol > indexBin) {
				var boolString = UT.trim(string.substring(0, indexBin));
				var leftString = UT.trim(string.substring(indexBin + 1, indexCol));
				var rightString = UT.trim(string.substring(indexCol + 1));
				var boolResult = this.boolExpr(boolString);
				var leftResult = this.arithExpr(leftResult);
				var rightResult = this.arithExpr(rightResult);
				if (boolResult && leftResult && rightResult) {
					return boolResult ? leftResult : rightResult;
				} else {
					return false; // 错误处理
				}

			} else if (indexAdd > 0) { // 加法 ==> ArithExpr + ArithExpr
				var leftString = UT.trim(string.substring(0, indexAdd));
				var rightString = UT.trim(string.substring(indexAdd + 1));
				var leftResult = this.arithExpr(leftString);
				var rightResult = this.arithExpr(rightString);
				if (leftResult && rightResult) {
					return leftResult + rightResult;
				} else {
					return false;
				}

			} else if (indexSub > 0) { // - 减法 ==> ArithExpr - ArithExpr
				var leftString = UT.trim(string.substring(0, indexSub));
				var rightString = UT.trim(string.substring(indexSub + 1));
				var leftResult = this.arithExpr(leftString);
				var rightResult = this.arithExpr(rightString);
				if (leftResult && rightResult) {
					return leftResult - rightResult;
				} else {
					return false;
				}

			} else if (indexMul > 0) { // 乘法 ==> ArithExpr * ArithExpr
				var leftString = UT.trim(string.substring(0, indexMul));
				var rightString = UT.trim(string.substring(indexMul + 1));
				var leftResult = this.arithExpr(leftString);
				var rightResult = this.arithExpr(rightString);
				if (leftResult && rightResult) {
					return leftResult * rightResult;
				} else {
					return false;
				}

			} else if (indexDiv > 0) { // 除法 ==> ArithExpr / ArithExpr
				var leftString = UT.trim(string.substring(0, indexDiv));
				var rightString = UT.trim(string.substring(indexDiv + 1));
				var leftResult = this.arithExpr(leftString);
				var rightResult = this.arithExpr(rightString);
				if (leftResult && rightResult) {
					return leftResult / rightResult;
				} else {
					return false;
				}

			} else if (indexPow > 0) { // n次方 ==> ArithExpr ^ ArithExpr
				var leftString = UT.trim(string.substring(0, indexPow));
				var rightString = UT.trim(string.substring(indexPow + 1));
				var leftResult = this.arithExpr(leftString);
				var rightResult = this.arithExpr(rightString);
				if (leftResult && rightResult) {
					return Math.pow(leftString, rightString);
				} else {
					return false;
				}

			} else if (indexSub == 0) { // 取负 ==> -ArithExpr
				var rightString = UT.trim(string.substring(1));
				rightResult = this.arithExpr(rightString);
				if (rightResult) {
					return -rightResult;
				} else {
					return false;
				}

			} else if (array.shift() == "(" && array.pop() == ")") { // 括号 ==> ( arithExpr )
				string = array.join("");
				var result = this.arithExpr(string);
				if (result) {
					return result;
				} else {
					return false; // 错误处理
				}

			}
		}
	};

	// 注册进全局对象window中
	window.BNF = BNF;

})(window);