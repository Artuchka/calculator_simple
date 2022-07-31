const input = document.querySelector("input")
const answerField = document.querySelector("#answer")
const solveButton = document.querySelector("button")

solveButton.addEventListener("click", (e) => {
	const equation = input.value
	const result = parse(equation)
	answerField.textContent = result
})

const MULTIPLY_DIVIDE_REGEX =
	/(?<operand1>\S+)\s*(?<operation>[\*\/])\s*(?<operand2>\S+)/
const ADD_SUBTRACT_REGEX =
	/(?<operand1>\S+)\s*(?<operation>[\+\-])\s*(?<operand2>\S+)/
const EXPONENT_REGEX =
	/(?<operand1>\S+)\s*(?<operation>[\^])\s*(?<operand2>\S+)/

function parse(eq) {
	if (eq.match(EXPONENT_REGEX)) {
		const result = handleMath(eq.match(EXPONENT_REGEX).groups)
		const newEq = eq.replace(EXPONENT_REGEX, result)
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
