/*

2 + 4 * 3 - 7
2 + (4 * 3) - 7
(2 + (4 * 3)) - 7

*/

// 2 + 12 - 7 = parse(2 + 4 * 3 - 7)
// 14 - 7 = parse(2 + 12 - 7)
// 7 = parse(14 - 7)

// function parse(eq) {
// 	const step = getNextStep()
// 	result = solve(step)
// 	replaceNextStep(eq, step, result)
// }

const inputElement = document.getElementById("equation")
const outputElement = document.getElementById("results")
const form = document.getElementById("equation-form")

const MULTIPLY_DIVIDE_REGEX =
	/(?<operand1>\S+)\s*(?<operation>[\*\/])\s*(?<operand2>\S+)/

const ADD_SUBTRACT_REGEX =
	/(?<operand1>\S+)\s*(?<operation>(?<!e)[\+\-])\s*(?<operand2>\S+)/

const POWER_REGEX = /(?<operand1>\S+)\s*(?<operation>\^)\s*(?<operand2>\S+)/

const PARANTHESIS_REGEX = /\((?<equation>[^\(\)]*)\)/

form.addEventListener("submit", (e) => {
	e.preventDefault()

	const result = parse(inputElement.value)
	outputElement.textContent = result
})

// 2 + 3 * 4 - 7
function parse(eq) {
	if (eq.match(PARANTHESIS_REGEX)) {
		const subEq = eq.match(PARANTHESIS_REGEX).groups.equation
		const result = parse(subEq)
		const newEq = eq.replace(PARANTHESIS_REGEX, result)
		return parse(newEq)
	} else if (eq.match(POWER_REGEX)) {
		const result = handleMath(eq.match(POWER_REGEX).groups)
		const newEq = eq.replace(POWER_REGEX, result)
		return parse(newEq)
	} else if (eq.match(MULTIPLY_DIVIDE_REGEX)) {
		const result = handleMath(eq.match(MULTIPLY_DIVIDE_REGEX).groups)
		const newEq = eq.replace(MULTIPLY_DIVIDE_REGEX, result)
		return parse(newEq)
	} else if (eq.match(ADD_SUBTRACT_REGEX)) {
		const result = handleMath(eq.match(ADD_SUBTRACT_REGEX).groups)
		const newEq = eq.replace(ADD_SUBTRACT_REGEX, result)
		return parse(newEq)
	} else {
		return parseFloat(eq)
	}
}

function handleMath({ operand1, operand2, operation }) {
	const num1 = parseFloat(operand1)
	const num2 = parseFloat(operand2)

	switch (operation) {
		case "*":
			return num1 * num2
		case "/":
			return num1 / num2
		case "+":
			return num1 + num2
		case "-":
			return num1 - num2
		case "^":
			return num1 ** num2
	}
}
