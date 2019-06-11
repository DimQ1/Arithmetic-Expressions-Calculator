/* eslint-disable no-console */
const readline = require('readline');
const Calculator = require('./src/Calculator');

const rpnCalculator = new Calculator();

const readeLineConsole = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

readeLineConsole.question('Input math expression for example "1 + 2 - 3 * ( 4 + 1 )". ', (expression) => {
    const rpnExpression = rpnCalculator.convertToRPN(expression);
    const calcResult = rpnCalculator.calculateRPNExpression(rpnExpression);
    console.log(`${expression} = ${calcResult}`);
    readeLineConsole.close();
});
