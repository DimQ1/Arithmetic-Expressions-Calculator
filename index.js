const Calculator = require('./src/Calculator');

const expression = '1 * 2 + ( 3 + 6 / 2 ) / 4 - 1 + 2 * ( 2 * 3 - 8 )';

const rpnCalculator = new Calculator();

const rpnExpression = rpnCalculator.convertToRPN(expression);
const calcResult = rpnCalculator.calculateRPNExpression(rpnExpression);

console.log(rpnExpression);
console.log(calcResult);
