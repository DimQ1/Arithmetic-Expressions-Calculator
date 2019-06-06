function convertExpression(expression) {
    const outputArray = [];
    const operationStack = [];
    const inputArray = expression.split(' ');
    inputArray.forEach((element) => {
        switch (element) {
            case '+':
            case '-':
                if (operationStack.length === 0) {
                    operationStack.push(element);
                } else {
                    const lastItemStack = operationStack.pop();
                    switch (lastItemStack) {
                        case '+':
                        case '-':
                        case '/':
                        case '*':
                            outputArray.push(lastItemStack);
                            operationStack.push(element);
                            break;
                        default:
                            operationStack.push(lastItemStack);
                            operationStack.push(element);
                            break;
                    }
                }
                break;
            case '/':
            case '*':
                if (operationStack.length === 0) {
                    operationStack.push(element);
                } else {
                    const lastItemStack = operationStack.pop();
                    switch (lastItemStack) {
                        case '+':
                        case '-':
                            operationStack.push(lastItemStack);
                            operationStack.push(element);
                            break;
                        case '/':
                        case '*':
                            outputArray.push(lastItemStack);
                            operationStack.push(element);
                            break;
                        default:
                            operationStack.push(lastItemStack);
                            operationStack.push(element);
                            break;
                    }
                }
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
                // eslint-disable-next-line no-case-declarations
                const numberElement = Number.parseInt(element, 10);

                if (isNaN(numberElement)) {
                    const e = new Error(`you used ${element}, but you mast use only number!`);
                    e.name = 'BadSequenceError';
                    throw e;
                }

                if (numberElement < 0) {
                    const e = new Error(`you used ${element}, but you must use only a positive number!`);
                    e.name = 'BadSequenceError';
                    throw e;
                }
                outputArray.push(numberElement);
                break;
        }
    });

    while (operationStack.length > 0) {
        const lastItemStack = operationStack.pop();
        outputArray.push(lastItemStack);
    }

    return outputArray.join(' ');
}

module.exports = (expression) => {
    return convertExpression(expression);
};
