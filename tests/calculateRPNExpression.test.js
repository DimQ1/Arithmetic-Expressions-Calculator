const calculateRPNExpression = require('../src/calculateRPNExpression');

const expression = '2 3 6 2 / + * 4 /';

test('calculate RPN expression "2 3 6 2 / + * 4 /" expected 3', () => {
    expect(calculateRPNExpression(expression))
        .toBe(3);
});
