let currentNumber = '';
let firstNumber = '0';
let operator = '';
let secondNumber = '';

const calculatorFunctions = {
    '+': (a, b) => +a + +b,
    '-': (a, b) => +a - +b,
    '*': (a, b) => +a * +b,
    '/': (a, b) => {
        if (b === '0') return 'Oops! Div 0';
        return +a / +b;
    },
    'xy': (a, b) => Math.pow(+a, +b),
    '√X': a => Math.sqrt(+a),
    '%': a => +a / 100,
    'R0': a => Math.round(+a),
    'R2': a => +(+a).toFixed(2),
};

const allowedInputArray = 
['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    '.', '+', '-', '/', '*', '=',
    '%', '√X', 'π', 'R0', 'R2', 'xy', '+/-',
    'Backspace', 'Escape', 'Enter'
];

const inputText = document.querySelector('#calculatorText');
inputText.value = '0';
inputText.addEventListener('keydown', (event) => {
    event.preventDefault();
    getInput(event.key);    
});

const calculatorContainer = document.querySelector('.calculatorButtons');
let calculatorButtons = [...calculatorContainer.querySelectorAll('button')];

calculatorButtons = calculatorButtons.filter(button => button.textContent !== 'CA');

calculatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        let input = button.textContent;
        if (input === 'x') {
            input = '*';
        } else if (input === '÷') {
            input = '/';
        }
        getInput(input);
    });
});

function getInput(input) {
    switch (true) {
        case !(allowedInputArray.includes(input)):
            return;

        case input === '.':
            handleDecimalInput();
            break;

        case !(isNaN(input)):
            handleNumberInput(input);
            break;
        
        case input === 'Backspace':
            handleBackspaceInput();
            break;

        case (input === 'Enter' || input === '='):
            operate();
            break;

        case input === '-' && operator === '':
            currentNumber = '-';
            updateDisplay(currentNumber);
            break;

        case input === 'π':
            input = '3.14159';
            updateDisplay(input);
            handleNumberInput(input);
            break;

        case input === '+/-':
            handleSignToggle();
            break;

        // Special case: apply unary operators immediately
        case input === '%':
        case input === 'R0':
        case input === 'R2':
        case input === '√X':
            operator = input;
            secondNumber = '0';
            operate();
            break;

        // Default case handles the standard four functions (+, -, *, /)
        default:
            if (secondNumber !== '') {
                operate();
            }
            operator = input;
            secondNumber = '';
            currentNumber = '';
            updateDisplay(firstNumber);
            break;
        }
}

function handleDecimalInput() {
    if (!currentNumber.includes('.')) {
        currentNumber = currentNumber === '' ? '0.' : currentNumber + '.';
    }

    updateDisplay(currentNumber);
}

function handleSignToggle() {
    if (currentNumber === '' && operator !== '') {
        currentNumber = firstNumber;
    } 

    currentNumber = (parseFloat(currentNumber) * -1).toString();

    if (operator === '') {
        firstNumber = currentNumber;
    } else {
        secondNumber = currentNumber;
    }

    updateDisplay(currentNumber);

    if (operator !== '') {
        secondNumber = '';
        firstNumber = currentNumber;
    }
}

function handleNumberInput(inputNumber) {
    if (operator === '' && currentNumber === '') {
        firstNumber = '';
    }

    currentNumber += inputNumber;

    if (operator === '') {
        firstNumber = currentNumber;
    } else {
        secondNumber = currentNumber;
    }

    updateDisplay(currentNumber);
}

function handleBackspaceInput() {
    if (currentNumber.length > 0) {
        currentNumber = currentNumber.slice(0, -1);
    }

    if (currentNumber === '' || currentNumber === '-') {
        currentNumber = '';
        updateDisplay('0');
    } else {
        updateDisplay(currentNumber);
    }

    if (operator === '') {
        firstNumber = currentNumber;
    } else {
        secondNumber = currentNumber;
    }
}

function operate() {
    if (secondNumber === '') return;

    let operationResult = calculatorFunctions[operator](firstNumber, secondNumber);

    firstNumber = String(operationResult);
    currentNumber = '';         
    secondNumber = '';      

    updateDisplay(firstNumber);

    if (typeof operationResult === 'string') {
        operator = '';
        firstNumber = '';
        currentNumber = '';
    }
}

function updateDisplay(value) {
    if (value === '' || value === '-') {
        inputText.value = '0';
        return;
    }

    const isNegative = value.startsWith('-');
    const numericPart = isNegative ? value.slice(1) : value;

    // Format number with commas and preserve decimals
    if (numericPart.includes('.')) {
        const [intPart, decPart] = numericPart.split('.');
        const formattedInt = Number(intPart).toLocaleString();
        inputText.value = `${isNegative ? '-' : ''}${formattedInt}.${decPart}`;
    } else {
        inputText.value = `${isNegative ? '-' : ''}${Number(numericPart).toLocaleString()}`;
    }
}

const clearAllButton = document.querySelector('.clearEntryOrAll');
clearAllButton.addEventListener('click', clearAll);
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') clearAll();
});

function clearAll() {
    currentNumber = '';
    firstNumber = '';
    operator = '';
    secondNumber = '';
    inputText.value = '0';
}
