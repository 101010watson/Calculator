function add(num1,num2){
    return num1+num2;
}

function subtract(num1,num2){
    return num1-num2;
}

function multiply(num1,num2){
    return num1*num2;
}

function divide(num1,num2){
    if(num1 == 0) return 0;
    if(num2 == 0) return NaN;
    return num1/num2;
}

function operate(num1,num2,op){
    switch(op){
        case "+": return add(num1,num2);
        case "-": return subtract(num1,num2);
        case "*": return multiply(num1,num2);
        case "/": return divide(num1,num2);
        default: return NaN;
    }
}

let num1 = parseInt(prompt("enter the first operand"));
let op = prompt("enter the operation");
let num2 = parseInt(prompt("enter the second operand"));

alert(operate(num1,num2,op));

