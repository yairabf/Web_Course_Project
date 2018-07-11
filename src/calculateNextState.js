

function calculateNextState(calculatorState, input) {
    let newCalculatorState = {};
    let display = null;
    console.log('hey calc');
    //if it's the first input to the program
    if (calculatorState === null || calculatorState === undefined) {
        // If the first input is a number
        if (isNumber(input)) {
            newCalculatorState = {savedInput: 0, currentInput: input, operator: null};
            display = input;
        } else if (isOperator(input)) {
            newCalculatorState = {savedInput: 0, currentInput: 0, operator: null};
            display = '';
        } else if (isEquals(input)) {
            newCalculatorState = {savedInput: 0, currentInput: 0, operator: null};
            display = '';
        }
    }

    //check if the input is a number
    else {
        const savedInput = calculatorState.calculatorState.savedInput;
        const currentInput = calculatorState.calculatorState.currentInput;
        const operator = calculatorState.calculatorState.operator;

        if (isNumber(input)) {
            newCalculatorState = {
                savedInput: isEquals(operator) ? 0 : savedInput,
                currentInput: isEquals(operator) ? input : parseInt(currentInput) * 10 + parseInt(input),
                operator: operator
            };
            display = isEquals(operator) ? parseInt(input) : parseInt(currentInput) * 10 + parseInt(input);
        }

        //check if the input is operation
        else if (isOperator(input)) {
            let res = operator ? isEquals(operator) ? savedInput : calculate(calculatorState) : parseInt(currentInput);
            newCalculatorState = {savedInput: res, currentInput: 0, operator: input};
            display = res;
        }

        else if (isEquals(input)) {
            const result = operator ? isEquals(operator) ? parseInt(currentInput) : calculate(calculatorState) : parseInt(currentInput);
            newCalculatorState = {savedInput: result, currentInput: 0, operator: input};
            display = result;
        }
    }

    return {
        calculatorState: newCalculatorState,
        display: display
    }
    //fixme handle different input (wrong inputs)
}

function calculate(calculatorState) {
    const savedInput = parseInt(calculatorState.calculatorState.savedInput);
    const currentInput = parseInt(calculatorState.calculatorState.currentInput);
    const operator = calculatorState.calculatorState.operator;

    switch (operator) {
        case '+':
            return savedInput + currentInput;
        case '-':
            return savedInput - currentInput;
        case '*':
            return savedInput * currentInput;
        case '/':
            return savedInput / currentInput;
        case '^':
            return Math.pow(savedInput, currentInput);
        default:
            return null;
    }
}

function isEquals(str) {
    return str === '=';
}

function isOperator(str) {
    return /^[+-/*^]$/.test(str);
}

function isNumber(str) {
    return !isNaN(str);
}

module.exports = calculateNextState;