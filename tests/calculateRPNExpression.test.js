const calculateRPNExpression = require('../src/calculateRPNExpression');

const expression = '2 3 6 2 / + * 4 /';

test('convert expression "2 * ( 3 + 6 / 2 ) / 4" to RPN "2 3 6 2 / + * 4 /"', () => {
    expect(calculateRPNExpression(expression))
        .toBe(3);
});
