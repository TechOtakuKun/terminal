(function(window) {
	var optPriority = {
		"?:": {
			prio: 1, // 优先级
			isLeftCombine: false // 是否满足左结合
		},
		"||": {
			prio: 2,
			isLeftCombine: true
		},
		"&&": {
			prio: 3,
			isLeftCombine: true
		},
		"!": {
			prio: 4,
			isLeftCombine: false
		},
		"==": {
			prio: 5,
			isLeftCombine: true
		},
		"!=": {
			prio: 5,
			isLeftCombine: true
		},
		"<": {
			prio: 5,
			isLeftCombine: true
		},
		"<=": {
			prio: 5,
			isLeftCombine: true
		},
		">": {
			prio: 5,
			isLeftCombine: true
		},
		">=": {
			prio: 5,
			isLeftCombine: true
		},
		"+": {
			prio: 6,
			isLeftCombine: true
		},
		"-": {
			prio: 6,
			isLeftCombine: true
		},
		"*": {
			prio: 7,
			isLeftCombine: true
		},
		"/": {
			prio: 7,
			isLeftCombine: true
		},
		"^": {
			prio: 8,
			isLeftCombine: false
		}
	};
	window.OP = optPriority;

})(window);