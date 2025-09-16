

const calculatorFunctions = {
    // Addition
    '+'(firstNumber, secondNumber) {
        return +firstNumber + +secondNumber;
    },

    // Subtraction
    '-'(firstNumber, secondNumber) {
        return +firstNumber - +secondNumber;
    },

    // Division
    '/'(firstNumber, secondNumber) {
        if (secondNumber === "0") {
            return "Oops! Div 0"
        } else {
            return +firstNumber / +secondNumber;
        }
    },

    // Multiplication
    '*'(firstNumber, secondNumber) {
        return +firstNumber * +secondNumber;
    },

    // Exponent
    "xy"(firstNumber, secondNumber) {
        return Math.pow(+firstNumber, +secondNumber);
    },

    // Square root
    "√X"(firstNumber) {
        return Math.sqrt(+firstNumber);
    },

    // Percentage
    "%"(firstNumber) {
        return +firstNumber / 100;
    },

    // Round Zero
    "R0"(firstNumber) {
        return Math.round(+firstNumber);
    },
    
    // Round Two
    "R2"(firstNumber) {
        return parseFloat(Number(firstNumber).toFixed(2));
    },
};

let currentNumber ="";
let firstNumber ="0";
let operator ="";
let secondNumber ="";

const allowedInputArray = 
['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    '.', '+', '-', '/', '*', '=',
    "%", "√X", "π", "R0", "R2", "xy",
    "Backspace", "Escape", "Enter"
];

const inputText = document.querySelector("#calculatorText");
inputText.value = "0";
inputText.addEventListener("keydown", (event) => {
    event.preventDefault();
    getInput(event.key);    
});

const calculatorContainer = document.querySelector(".calculatorButtons");
let calculatorButtons = [...calculatorContainer.querySelectorAll("button")];

calculatorButtons = calculatorButtons.filter(button => button.textContent !== "CA");

calculatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        let input = button.textContent;
        if (input === "x") {
            input = "*";
        } else if (input === "÷") {
            input = ("/");
        }
        getInput(input);
    });
});

function getInput(input) {
    switch (true) {
        case !(allowedInputArray.includes(input)):
            return;

        case input === ".":
            handleDecimalInput();
            break;

        case !(isNaN(input)):
            handleNumberInput(input);
            break;
        
        case input === "Backspace":
            handleBackspaceInput();
            break;

        case (input === "Enter" || input === "="):
            operate();
            break;

        case input === "-" && currentNumber === "":
            currentNumber = "-";
            inputText.value = currentNumber;
            break;

        case input === "π":
            input = "3.14159";
            inputText.value = currentNumber;
            handleNumberInput(input);
            break;
        
        case input === "%":
        case input === "R0":
        case input === "R2":
        case input === "√X":
            operator = input;
            secondNumber = "0";
            operate();
            break;

        default:
            if (secondNumber !== "") {
                operate();
            }
            operator = input;
            secondNumber = "";
            currentNumber = "";
            inputText.value = firstNumber;
            break;
        }
}

function handleDecimalInput() {
    if (!(currentNumber.includes("."))) {
        if (currentNumber === "") {
            currentNumber += "0."
            inputText.value = currentNumber;
        } else {
            currentNumber += ".";
            formatDecimalNumber();
        }
    } else {
        formatDecimalNumber();
    }
}

function formatDecimalNumber() {
    const [integerPart, decimalPart] = currentNumber.split(".");
    const formattedInteger = Number(integerPart).toLocaleString();
    inputText.value = `${formattedInteger}.${decimalPart}`;
}

function handleNumberInput(inputNumber) {
    currentNumber += inputNumber;
    if (operator === "") {
        firstNumber = currentNumber;
    } else {
        secondNumber = currentNumber;
    }

    if ((currentNumber.includes("."))) {
        formatDecimalNumber(currentNumber);
    } else {
        inputText.value = Number(currentNumber).toLocaleString();
    }  
}

function handleBackspaceInput() {
    if (currentNumber.length > 0) {
        currentNumber = currentNumber.slice(0, -1);
    }

    if (currentNumber === "" || currentNumber === "-") {
        inputText.value = "0";
        currentNumber = "";
    } else {
        if (currentNumber.includes(".")) {
            formatDecimalNumber(currentNumber);
        } else {
            inputText.value = Number(currentNumber).toLocaleString();
        }
    }
}

function operate() {
    let operationResult = ""
    if (secondNumber === "") {
        return;
    } else {
        operationResult = calculatorFunctions[operator](firstNumber, secondNumber);
    }

    firstNumber = String(operationResult);

    if (typeof operationResult === "string") {
        inputText.value = firstNumber;
        currentNumber = "";
        firstNumber = "";
        operator = "";
    } else {
        inputText.value = Number(firstNumber).toLocaleString();
    }
}

const clearAllButton = document.querySelector(".clearEntryOrAll");
clearAllButton.addEventListener("click", clearAll);
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") clearAll();
});

function clearAll() {
    currentNumber ="";
    firstNumber = "0";
    operator = "";
    secondNumber = "";
    inputText.value = "0";
}
