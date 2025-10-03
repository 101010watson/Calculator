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

let num1= "";
let op= "";
let num2= "";


function populateDisplay(digit){
    displayContent.textContent+=digit;
}

function storeValues(value){
    if(!op){
        num1+=value;
    }
    else{
        num2+=value;
    }
}

const displayContent = document.querySelector(".display");
const buttons = document.querySelector(".buttonContainer");

buttons.addEventListener("click",(e)=>{
    let target = e.target;

    switch(target.id){
        case "clear":
        displayContent.textContent = "";
        num1 = "";
        num2 = "";
        op = "";
        break;

        case "add":
        case "subtract":
        case "division":
        case "multiply":
        populateDisplay(target.textContent);
        op = target.textContent;
        break;

        case "one":
        case "two":
        case "three":
        case "four":
        case "five":
        case "six":
        case "seven":
        case "eight":
        case "nine":
        populateDisplay(target.textContent);
        storeValues(target.textContent);
        break;

        case "equals": 
        let result = operate(Number(num1),Number(num2),op);
        displayContent.textContent = result;
        break;
        
    }
})

