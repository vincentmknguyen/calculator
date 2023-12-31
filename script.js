function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, operator, b) {
    if (operator === '+') {
        return add(a, b);
    } else if (operator === '-') {
        return subtract(a, b);
    } else if (operator === '*') {
        return multiply(a, b);
    } else if (operator === '/') {
        return divide(a, b);
    }
}

let numberA = [];
let a = 0;
let numberB = [];
let b = 0;
let sign = '+';
let finalValue = 0;

const display = document.querySelector('.display');

const decimalButton = document.querySelector('.decimalButton');

const calculatorButtons = document.querySelectorAll('.calculator-button');
calculatorButtons.forEach((calculatorButton) => {
    calculatorButton.addEventListener('click', () => {
        if ( // if there is no value in a and number
            a === 0 && calculatorButton.id === 'zero' ||
            a === 0 && calculatorButton.id === '1' ||
            a === 0 && calculatorButton.id === '2' ||
            a === 0 && calculatorButton.id === '3' ||
            a === 0 && calculatorButton.id === '4' ||
            a === 0 && calculatorButton.id === '5' ||
            a === 0 && calculatorButton.id === '6' ||
            a === 0 && calculatorButton.id === '7' ||
            a === 0 && calculatorButton.id === '8' ||
            a === 0 && calculatorButton.id === '9' ||
            a === 0 && calculatorButton.id === '.' ||
            a === 0 && calculatorButton.id === 'delete' ||
            a === 0 && calculatorButton.id === 'negative' ) {
                if (calculatorButton.id === 'negative') {
                    if (numberA[0] === '-') {
                        delete numberA[0];
                        display.innerHTML = arrayToNum(numberA);
                    } else {
                        numberA.unshift('-');
                        if (numberA.length > 1) {
                            display.innerHTML = arrayToNum(numberA);
                        }
                        
                    }
                } else if (calculatorButton.id === 'zero') {
                    numberA.push('0');
                    display.innerHTML = arrayToNum(numberA);
                } else if (calculatorButton.id === 'delete') {
                    del(numberA);
                } else {
                    numberA.push(calculatorButton.id);
                    display.innerHTML = arrayToNum(numberA);
                    if (calculatorButton.id === '.') {
                        if (numberA[0] === '.' || numberA[0] === '-' && numberA[1] === '.') {
                            numberA.unshift(0);
                        }
                        display.innerHTML = arrayToNum(numberA) +'.';
                        decimalButton.disabled = true;
                    }
                }
        } else if ( //operator 
            calculatorButton.id === '+' ||
            calculatorButton.id === '-' ||
            calculatorButton.id === '*' ||
            calculatorButton.id === '/') {
                decimalButton.disabled = false;
                if (numberA.length === 0) {
                    alert("You haven't inputed anything yet!");
                    clear();
                    display.innerHTML = "";
                } else if (numberB.length != 0) { //instead of pressing = we want to do more numbers
                    b = arrayToNum(numberB);
                    finalValue = operate(a,sign,b);
                    display.innerHTML = Math.round((finalValue + Number.EPSILON) * 1000) / 1000;
                    clear();
                    a = finalValue;
                    sign = calculatorButton.id;
                } else { //after first number we want to select operator
                    a = arrayToNum(numberA);
                    sign = calculatorButton.id;
                }

        } else if ( // if there is value in in a and number (value goes to b)
            calculatorButton.id === 'zero' ||
            calculatorButton.id === '1' ||
            calculatorButton.id === '2' ||
            calculatorButton.id === '3' ||
            calculatorButton.id === '4' ||
            calculatorButton.id === '5' ||
            calculatorButton.id === '6' ||
            calculatorButton.id === '7' ||
            calculatorButton.id === '8' ||
            calculatorButton.id === '9' ||
            calculatorButton.id === '.' ||
            calculatorButton.id === 'delete' ||
            calculatorButton.id === 'negative' ) {
            if (calculatorButton.id === 'negative') {
                if (numberB[0] === '-') {
                    delete numberB[0];
                    display.innerHTML = arrayToNum(numberB);
                } else {
                    numberB.unshift('-');
                    if (numberB.length > 1) {
                        display.innerHTML = arrayToNum(numberB);
                    }                      
                }
            } else if (calculatorButton.id === 'zero') {
                numberB.push('0');
                display.innerHTML = arrayToNum(numberB);
            } else if (calculatorButton.id === 'delete') {
                del(numberB);
            } else {
                numberB.push(calculatorButton.id);
                display.innerHTML = arrayToNum(numberB);
                if (calculatorButton.id === '.') {
                    if (numberB[0] === '.' || numberB[0] === '-' && numberB[1] === '.') {
                        numberB.unshift(0);
                    }
                    display.innerHTML = arrayToNum(numberB) +'.';
                    decimalButton.disabled = true;

                }
            }
        } else if (calculatorButton.id === '='){ // after equal sign
            decimalButton.disabled = false;
            if (sign === '/' && numberB[0] === '0') { //if user tries to divide by 0
                clear()
                display.innerHTML = "Error";
            } else if (numberB.length === 0){ //if user didn't complete operation
                clear()
                display.innerHTML = "";
                alert("Complete the expression before pressing =. Try Again.")
            } else {
                b = arrayToNum(numberB);
                finalValue = operate(a,sign,b);
                display.innerHTML = Math.round((finalValue + Number.EPSILON) * 1000) / 1000;
                clear()
                finalValue = 0;
            }

        } else if (calculatorButton.id === 'clear') { //wipe and start fresh
            clear()
            display.innerHTML = "";
            finalValue = 0;
        }
    });
});

function arrayToNum(array) {
    return parseFloat(array.join(""));
}

function del(array) {
    array.pop();
    if (array.length === 0) {
        display.innerHTML = "";
    } else {
        display.innerHTML = arrayToNum(array);
    }
}

function clear() {
    a = 0;
    b = 0;
    numberA = [];
    numberB = [];
    sign = '+';
    decimalButton.disabled = false;
}
