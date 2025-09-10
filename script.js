function addition(array) {
    return array.reduce((total, current) => total + current, 0);
}

function subtraction(array) {
    return array.reduce((difference, current) => difference - current);
}

function division(array) {
    return array.reduce((quotient, current) => quotient / current);
}

function multiplication(array) {
    return array.reduce((product, current) => product * current, 1);
}

function exponent(base, power) {
    return Math.pow(base, power);
}

function squareRoot(radicand) {
    return Math.sqrt(radicand);
}

 function percentage(whole) {
    return whole / 100;
 }

 function roundZero(decimalNumber) {
    return Math.round(decimalNumber);
 }

 function roundTwo(decimalNumber) {
    return parseFloat(decimalNumber.toFixed(2));
 }

