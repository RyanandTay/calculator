

const calculatorFunctions = {
    addition(firstNumber, secondNumber) {
        return +firstNumber + +secondNumber;
    },

    subtraction(firstNumber, secondNumber) {
        return +firstNumber - +secondNumber;
    },

    division(firstNumber, secondNumber) {
        return +firstNumber / +secondNumber;
    },

    multiplication(firstNumber, secondNumber) {
        return +firstNumber * +secondNumber;
    },

    exponent(firstNumber, secondNumber) {
        return Math.pow(+firstNumber, +secondNumber);
    },

    squareRoot(firstNumber) {
        return Math.sqrt(+firstNumber);
    },

    percentage(firstNumber) {
        return +firstNumber / 100;
    },

    roundZero(firstNumber) {
        return Math.round(+firstNumber);
    },
        
    roundTwo(firstNumber) {
        return parseFloat(+firstNumber.toFixed(2));
    },
};

const inputText = document.querySelector("#calculatorText");
let firstNumber ="0";
const numberButtons = [...document.querySelectorAll(".numberButton")];
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        const clickedButton = button.textContent;
        handleInput(clickedButton);
    });
});

inputText.value = "0";

// will be a function called getFirstNumber
inputText.addEventListener("keydown", (event) => {

    switch (true) {
        case !(allowedInputArray.includes(event.key)):
            event.preventDefault();
            return;

        case event.key === ".":
            event.preventDefault();
            handleDecimalInput();
            break;

        case event.key === "-":
            event.preventDefault();
            handleMinusInput();
            break;

        case !(isNaN(event.key)):
            event.preventDefault();
            handleNumberInput(event.key);
            break;
        
        case event.key === "Backspace":
            event.preventDefault();
            handleBackspaceInput();
            break;

        default: 
            getOperator(event.key);
            break;
        }
    }
);

function handleDecimalInput() {
    if (!(firstNumber.includes("."))) {
        if (firstNumber === "") {
            firstNumber += "0."
            inputText.value = firstNumber;
        } else {
            firstNumber += ".";
            const [integerPart, decimalPart] = firstNumber.split(".");
            const formattedInteger = Number(integerPart).toLocaleString();
            inputText.value = `${formattedInteger}.${decimalPart}`;
        }
    } else return;
}

function handleMinusInput() {
    if (firstNumber === "0" || firstNumber === "") {
        firstNumber = "-";
        inputText.value = firstNumber;
    } else {
        operate();
    }
}

function handleNumberInput(inputNumber) {
    firstNumber += inputNumber;

    if ((firstNumber.includes("."))) {
        const [integerPart, decimalPart] = firstNumber.split(".");
        const formattedInteger = Number(integerPart).toLocaleString();
        inputText.value = `${formattedInteger}.${decimalPart}`;
    } else {
        inputText.value = Number(firstNumber).toLocaleString();
    }  
}

function handleBackspaceInput() {
    if (firstNumber.length > 0) {
        firstNumber = firstNumber.slice(0, -1);
    }

    if (firstNumber === "" || firstNumber === "-") {
        inputText.value = "0";
        firstNumber = "";
    } else {
        if (firstNumber.includes(".")) {
            const [integerPart, decimalPart] = firstNumber.split(".");
            const formattedInteger = Number(integerPart).toLocaleString();
            inputText.value = `${formattedInteger}.${decimalPart}`;
        } else {
            inputText.value = Number(firstNumber).toLocaleString();
        }
    }
}

function clearAll() {
    firstNumber ="0";
    inputText.value ="0";
}

const clearAllButton = document.querySelector(".clearEntryOrAll");
clearAllButton.addEventListener("click", clearAll);
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") clearAll();
});

const allowedInputArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    '.', '+', '-', '/', '*',
    "Backspace", "Enter", "Escape", "ArrowLeft", "ArrowRight"
];

