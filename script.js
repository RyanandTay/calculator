const calculatorFunctions = {
    addition(array) {
        return array.reduce((total, current) => total + current, 0);
    },

    subtraction(array) {
        return array.reduce((difference, current) => difference - current);
    },

    division(array) {
        return array.reduce((quotient, current) => quotient / current);
    },

    multiplication(array) {
        return array.reduce((product, current) => product * current, 1);
    },

    exponent(base, power) {
        return Math.pow(base, power);
    },

    squareRoot(radicand) {
        return Math.sqrt(radicand);
    },

    percentage(whole) {
        return whole / 100;
    },

    roundZero(decimalNumber) {
        return Math.round(decimalNumber);
    },
        
    roundTwo(decimalNumber) {
        return parseFloat(decimalNumber.toFixed(2));
    },
};

const inputText = document.querySelector("#calculatorText");
let firstNumber ="";
const numberButtons = [...document.querySelectorAll(".numberButton")];
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        const clickedButton = button.textContent;
        firstNumber += clickedButton;
        inputText.value = firstNumber;
    });
});






// let operateInitiated = false;
// const calculatorText = document.querySelector("#calculatorText");
// const calculatorGrid = document.querySelectorAll("button");

// function handleFirstInput(input) {
//     if (!operateInitiated) {
//         operate(input);
//         operateInitiated = true;
//     }
// }

// calculatorGrid.forEach(button => {
//     button.addEventListener("click", operate);
// });

// calculatorText.addEventListener("keyup", event => {
//     if (event.key === "Enter") {
//         operate();
//     }
// });

// function operate(firstNumber){

//     const inputText = document.querySelector("#calculatorText");
//     inputText.value = firstNumber;

// }














 

 

 

