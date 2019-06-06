const convertToRPN = require('../src/convertToRPN');

const expression = "2 * ( 3 + 6 / 2 ) / 4";
const expectedResult = "2 3 6 2 / + * 4 /";

test('convert expression "2 * ( 3 + 6 / 2 ) / 4" to RPN "2 3 6 2 / + * 4 /"', () => {
    expect(convertToRPN(expression)).toBe(expectedResult);
  });