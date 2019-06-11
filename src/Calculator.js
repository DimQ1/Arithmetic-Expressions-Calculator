const operations = {
    '+': ({ firstValue, secondValue }) => firstValue + secondValue,
    '-': ({ firstValue, secondValue }) => firstValue - secondValue,
    '*': ({ firstValue, secondValue }) => firstValue * secondValue,
    '/': ({ firstValue, secondValue }) => {
        if (secondValue === 0) throw Error('It is impossible to divide by zero');

        return firstValue / secondValue;
    }
};

const getCalculationPairOfValue = (operationStack) => {
    const secondValue = +operationStack.pop();
    const firstValue = +operationStack.pop();

    return { firstValue, secondValue };
};

const addNumberInOutputArray = (element, outputArray) => {
    const numberElement = Number(element);

    if (Number.isNaN(numberElement)) {
        const errorText = `you used ${element}, but you mast use only number!`;
        throw Error(errorText);
    }

    if (numberElement < 0) {
        throw Error(`you used ${element}, but you must use only a positive number!`);
    }
    outputArray.push(numberElement);
};

const processLowPriorityOperator = (operator, operationStack, outputArray) => {
    if (operationStack.length === 0) {
        operationStack.push(operator);
    } else {
        switch (operationStack[operationStack.length - 1]) {
            case '+':
            case '-':
            case '/':
            case '*':
                outputArray.push(operationStack.pop());
                operationStack.push(operator);
                break;
            default:
                operationStack.push(operator);
                break;
        }
    }
};

const processHigthPriorityOperator = (operator, operationStack, outputArray) => {
    if (operationStack.length === 0) {
        operationStack.push(operator);
    } else {
        const lastItemInStack = operationStack[operationStack.length - 1];
        switch (lastItemInStack) {
            case '+':
            case '-':
                operationStack.push(operator);
                break;
            case '/':
            case '*':
                outputArray.push(operationStack.pop());
                operationStack.push(operator);
                break;
            default:
                operationStack.push(operator);
                break;
        }
    }
};

function checkTypeInputExpression(expression) {
    if (typeof (expression) !== 'string') throw new Error('The expression must be a string type');
}

module.exports = class Calculator {
    calculateRPNExpression(expression) {
        checkTypeInputExpression(expression);
        const inputArray = expression.split(' ');
        const operationStack = [];
        inputArray.forEach((element) => {
            switch (element) {
                case '+':
                case '-':
                case '/':
                case '*':
                    operationStack.push(operations[element](getCalculationPairOfValue(operationStack)));
                    break;
                default:
                    operationStack.push(element);
                    break;
            }
        });

        return operationStack.pop();
    }

    convertToRPN(expression) {
        checkTypeInputExpression(expression);
        const outputArray = [];
        const operationStack = [];
        const inputArray = expression.split(' ');

        inputArray.forEach((element) => {
            switch (element) {
                case '+':
                case '-':
                    processLowPriorityOperator(element, operationStack, outputArray);
                    break;
                case '/':
                case '*':
                    processHigthPriorityOperator(element, operationStack, outputArray);
                    break;
                case '(':
                    operationStack.push(element);
                    break;
                case ')':
                    while (operationStack.length > 0) {
                        const lastItemStack = operationStack.pop();
                        if (lastItemStack === '(') {
                            break;
                        } else {
                            outputArray.push(lastItemStack);
                        }
                    }
                    break;
                default:
                    addNumberInOutputArray(element, outputArray);
                    break;
            }
        });
        outputArray.push(...operationStack.reverse());

        return outputArray.join(' ');
    }
};
