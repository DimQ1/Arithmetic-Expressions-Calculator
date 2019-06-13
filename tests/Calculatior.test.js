const Calculator = require('../src/Calculator');

describe('test expression calculator', () => {
    test('check number type of input expression', () => {
        const inputExpression = 1;
        expect(() => {
            (new Calculator())
                .checkTypeInputExpression(inputExpression);
        })
            .toThrow();
    });

    test('check string type of input expression', () => {
        const inputExpression = 'string';
        expect(() => {
            (new Calculator())
                .checkTypeInputExpression(inputExpression);
        })
            .not.toThrow();
    });

    test('get pairOfValue from stack', () => {
        const firstValue = 2;
        const secondValue = 3;
        const stack = [20, 5, firstValue, secondValue];
        const pairOfValue = (new Calculator())
            .getCalculationPairOfValue(stack);
        expect(pairOfValue.firstValue)
            .toEqual(firstValue);
        expect(pairOfValue.secondValue)
            .toEqual(secondValue);
    });

    test('add number into output array', () => {
        const numberElement = 3;
        const outputArray = [1];
        (new Calculator())
            .addNumberInOutputArray(numberElement, outputArray);
        expect(outputArray)
            .toEqual([1, 3]);
    });

    test('add negative number into output array', () => {
        const numberElement = -3;
        const outputArray = [1];
        expect(() => {
            (new Calculator())
                .addNumberInOutputArray(numberElement, outputArray);
        })
            .toThrow();
    });

    test('add not a number type of value into output array', () => {
        const numberElement = 'e';
        const outputArray = [1];
        expect(() => {
            (new Calculator())
                .addNumberInOutputArray(numberElement, outputArray);
        })
            .toThrow();
    });



    describe('converting expression from math notation to Reverse Polish Notation', () => {
        describe('when higth-level operator first added in the stack', () => {
            const inputStringExpression = '1 * 2 + ( 3 + 6 / 2 ) / 4 - 1 + 2 * ( 2 * 3 - 8 )';
            const expectedRPNExpression = '1 2 * 3 6 2 / + 4 / 1 - 2 2 3 * 8 - * + +';

            test(`input expression "${inputStringExpression}" to RPN "${expectedRPNExpression}"`, () => {
                expect(new Calculator()
                    .convertToRPN(inputStringExpression))
                    .toBe(expectedRPNExpression);
            });
        });

        describe('when low-level operator first added in the stack', () => {
            const inputStringExpression = '1 + 2 * ( 3 + 6 / 2 ) / 4 - 1 + 2 + ( 2 * 3 - 8 )';
            const expectedRPNExpression = '1 2 3 6 2 / + * 4 / 1 - 2 + 2 3 * 8 - + +';

            test(`input expression "${inputStringExpression}" to RPN "${expectedRPNExpression}"`, () => {
                expect(new Calculator()
                    .convertToRPN(inputStringExpression))
                    .toBe(expectedRPNExpression);
            });


            describe('exceptions', () => {
                const rpnExpression = '1/+';
                test(`bad sequence "${rpnExpression}" expected error`, () => {
                    expect(() => {
                        (new Calculator())
                            .convertToRPN(rpnExpression);
                    })
                        .toThrow();
                });

                const negativeExpression = '-1 1 +';
                test(`negative number "${negativeExpression}" expected error`, () => {
                    expect(() => {
                        (new Calculator())
                            .convertToRPN(negativeExpression);
                    })
                        .toThrow();
                });

                const numberTypeExpression = 1;
                test('if type expression is not a string that the result will expect an error', () => {
                    expect(() => {
                        (new Calculator())
                            .convertToRPN(numberTypeExpression);
                    })
                        .toThrow();
                });
            });
        });
    });

    describe('calculation reverse polish notation', () => {
        const expectedRPNExpression = '1 2 * 3 2 * 3 6 2 / + 4 / 1 - 2 2 3 * 8 - * + + +';
        const calculatedResult = 1 * 2 + 3 * 2 + (3 + 6 / 2) / 4 - 1 + 2 * (2 * 3 - 8);

        test(`calculate RPN expression "${expectedRPNExpression}" expected ${calculatedResult}`, () => {
            expect(new Calculator()
                .calculateRPNExpression(expectedRPNExpression))
                .toBe(calculatedResult);
        });

        describe('exceptions', () => {
            const divideByZeroExpression = '1 0 /';
            test(`divide by zero "${divideByZeroExpression}" expected error`, () => {
                expect(() => {
                    (new Calculator())
                        .calculateRPNExpression(divideByZeroExpression);
                })
                    .toThrow();
            });

            const numberTypeExpression = 1;
            test('if type expression is not a string that the result will expect an error', () => {
                expect(() => {
                    (new Calculator())
                        .calculateRPNExpression(numberTypeExpression);
                })
                    .toThrow();
            });
        });
    });
});
