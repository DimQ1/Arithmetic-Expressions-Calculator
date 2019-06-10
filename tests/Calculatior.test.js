const Calculator = require('../src/Calculator');

describe('test expression calculator', () => {
    describe('testing, convertation to reverse polish notation', () => {
        describe('testing, when higth-level operator first added in the stack', () => {
            const inputStringExpression = '1 * 2 + ( 3 + 6 / 2 ) / 4 - 1 + 2 * ( 2 * 3 - 8 )';
            const expectedRPNExpression = '1 2 * 3 6 2 / + 4 / 1 - 2 2 3 * 8 - * + +';

            describe('converting expression from math notation to Reverse Polish Notation', () => {
                test(`input expression "${inputStringExpression}" to RPN "${expectedRPNExpression}"`, () => {
                    expect(new Calculator()
                        .convertToRPN(inputStringExpression))
                        .toBe(expectedRPNExpression);
                });
            });
        });

        describe('testing, when low-level operator first added in the stack', () => {
            const inputStringExpression = '1 + 2 * ( 3 + 6 / 2 ) / 4 - 1 + 2 + ( 2 * 3 - 8 )';
            const expectedRPNExpression = '1 2 3 6 2 / + * 4 / 1 - 2 + 2 3 * 8 - + +';

            describe('converting expression from math notation to Reverse Polish Notation', () => {
                test(`input expression "${inputStringExpression}" to RPN "${expectedRPNExpression}"`, () => {
                    expect(new Calculator()
                        .convertToRPN(inputStringExpression))
                        .toBe(expectedRPNExpression);
                });
            });


            describe('testing bad sequence', () => {
                const rpnExpression = '1/+';
                test(`bad sequence "${rpnExpression}" expected error`, () => {
                    expect(() => {
                        (new Calculator())
                            .convertToRPN(rpnExpression);
                    })
                        .toThrow();
                });
            });

            describe('testing negative number', () => {
                const rpnExpression = '-1 1 +';
                test(`negative number "${rpnExpression}" expected error`, () => {
                    expect(() => {
                        (new Calculator())
                            .convertToRPN(rpnExpression);
                    })
                        .toThrow();
                });
            });

            describe('testing Type input expression', () => {
                const rpnExpression = 1;
                test('if type expression is not a string that the result will expect an error', () => {
                    expect(() => {
                        (new Calculator())
                            .convertToRPN(rpnExpression);
                    })
                        .toThrow();
                });
            });
        });
    });

    describe('testing, calculation reverse polish notation', () => {
        const expectedRPNExpression = '1 2 3 6 2 / + * 4 / 1 - 2 + 2 3 * 8 - + +';
        const calculatedResult = 3;
        describe('calculate Reverse Polish Notation', () => {
            test(`calculate RPN expression "${expectedRPNExpression}" expected ${calculatedResult}`, () => {
                expect(new Calculator()
                    .calculateRPNExpression(expectedRPNExpression))
                    .toBe(calculatedResult);
            });
        });

        describe('testing divide by zero', () => {
            const rpnExpression = '1 0 /';
            test(`divide by zero "${rpnExpression}" expected error`, () => {
                expect(() => {
                    (new Calculator())
                        .calculateRPNExpression(rpnExpression);
                })
                    .toThrow();
            });
        });
    });
});
