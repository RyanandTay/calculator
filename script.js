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














 

 

 

