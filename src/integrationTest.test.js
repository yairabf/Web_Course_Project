/* Integration tests
   Using sync request for testing purposes only.
   Using same tests as the unit tests but now we also checking the connection
   and routing through server.js.
   Thus we create an intertation tests.
*/
var request = require('sync-request');
var uri = "http://localhost:8000";
function sendInputs(inputs) {
    let s = null, res = null;

    for (let i = 0; i < inputs.length; ++i) {
        res = request('POST', uri + '/calculate', {
            json: {calculatorState: s,
                input: inputs[i]}
        });
        res = JSON.parse(res.getBody('utf8'));
        s = {calculatorState: res.calculatorState};
        if (res.display == "error")
            throw new Error("invalid char");
    }

    return res.display;
}

test('a + 2 = error', () => {
    // for jest to catch the error rather than exit on exception
    // need to wrap the code in a function
    expect(() => sendInputs(['a', '+', '2'])).toThrow();
});

test('2 + ! = error', () => {
    expect(() => sendInputs(['2', '+', '!'])).toThrow();
});

test('8 = 8, 9', () => {
    expect(sendInputs(['8', '=', '9'])).toBe(9);
});

test('8 = 8, 9 = 9', () => {
    expect(sendInputs(['8', '=', '9', '='])).toBe(9);
});

test('12 = 12 + 3 = 15', () => {
    expect(sendInputs(['1', '2', '=', '+', '3', '='])).toBe(15);
});

test('2 + 2 = 4', () => {
    expect(sendInputs(['2', '+', '2', '='])).toBe(4);
});

test('12 + 26 = 38', () => {
    expect(sendInputs(['1', '2', '+', '2', '6', '='])).toBe(38);
});

test('10 / 5 = 2', () => {
    expect(sendInputs(['1', '0', '/', '5', '='])).toBe(2);
});

test('5 * 6 + 3 = 33', () => {
    expect(sendInputs(['5', '*', '6', '+', '3', '='])).toBe(33);
});


test('6 = 6', () => {
    expect(sendInputs(['6', '='])).toBe(6);
});

test('6 + = 6', () => {
    expect(sendInputs(['6', '+', '='])).toBe(6);
});

test('7 = 7 + 3 = 10', () => {
    expect(sendInputs(['7', '=', '+', '3', '='])).toBe(10);
});

test('3 - => 3', () => {
    expect(sendInputs(['3', '-'])).toBe(3);
});

test('3 + 3 + => 6', () => {
    expect(sendInputs(['3', '+', '3', '+'])).toBe(6);
});

test('10 + 2 / 4 * 2 - 1 => 5', () => {
    expect(sendInputs(['1', '0', '+', '2', '/', '4', '*', '2', '-', '1', '='])).toBe(5);
});

test('= => "(empty)"', () => {
    expect(sendInputs(['='])).toBe('');
});

test('+ 3 => 3', () => {
    expect(sendInputs(['+', '3'])).toBe(3);
});

test('+ 2 + 2 + => 4', () => {
    expect(sendInputs(['+', '2', '+', '2', '+'])).toBe(4);
});

test('3 - 3 * 10 => 0', () => {
    expect(sendInputs(['3', '-', '3', '*', '1', '0', '='])).toBe(0);
});

test('15 + 5 = 20, 5 => 5', () => {
    expect(sendInputs(['1', '5', '+', '5', '=', '5'])).toBe(5);
});

test('1 + 2 + 8 = 11', () => {
    expect(sendInputs(['1', '+', '2', '+', '8', '='])).toBe(11);
});

test('1 + 2 = 3 + 7 = 10', () => {
    expect(sendInputs(['1', '+', '2', '=', '+', '7', '='])).toBe(10);
});

test('6 - 4 = 2 - 1 = 1', () => {
    expect(sendInputs(['6', '-', '4', '=', '-', '1', '='])).toBe(1);
});

test('10 - 20 = -10', () => {
    expect(sendInputs(['10', '-', '20', '='])).toBe(-10);
});
