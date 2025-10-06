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
    if(displayContent.textContent.length > 15){
        displayContent.textContent = displayContent.textContent.slice(1);
    }
    displayContent.textContent+=digit;
}

function storeValues(value){
    if(!op){
        if(num1.length < 15){
            num1+=value;
            return true;
        }
    }
    else{
        if(num2.length < 15){
            num2+=value;
            return true;
        } 
    }

    return false; 
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

        case "delete":
        displayContent.textContent = displayContent.textContent.slice(0,-1);
        
        if(op){
            num2 = num2.slice(0,-1);
        }
        else if(!op){
            num1 = num1.slice(0,-1);
        }
        
        // Now check: is the operator still in the display?
        if(op && !displayContent.textContent.includes(op)){
            op = "";  // Operator was deleted from display, so clear it
        }
        break;

        case "add":
        case "subtract":
        case "division":
        case "multiply":   
        if(!op){
            populateDisplay(target.textContent);
            op = target.textContent;
        }
        else if(op != "" && num2 != ""){
            var result = operate(Number(num1),Number(num2),op);
            displayContent.textContent = result;
            num1 = result;
            num2 = "";
            populateDisplay(target.textContent);
            op = target.textContent;
        }
        break;
        case "percentage":
            if(displayContent.textContent){
                if(num1 && op && num2){
                    populateDisplay(target.textContent);
                    num2 = (num2/100).toFixed(2);
                }
                else if(num1 && op == "" && num2 == ""){
                    populateDisplay(target.textContent);
                    num1 = (num1/100).toFixed(2);
                }
            }
        break;

        case "zero":
        case "one":
        case "two":
        case "three":
        case "four":
        case "five":
        case "six":
        case "seven":
        case "eight":
        case "nine":
            if(storeValues(target.textContent)){ // populate display only when it is stored this helps to cap the size limit to 15
                populateDisplay(target.textContent); 
            }
        break;

        case "dot":
        if(!displayContent.textContent.includes(".")){
            populateDisplay(target.textContent);
            storeValues(target.textContent);
        }
        break;

        case "equals": 
        var result = operate(Number(num1),Number(num2),op);
        // to check if a number is decimal or not
        // divide it by 1 if it's remainder is not 0 then it is decimal
        if(result%1 != 0){
            displayContent.textContent = result.toFixed(2);
        }
        else{
            displayContent.textContent = result;
        }
        num1 = result;
        op = "";
        num2 = "";
        break;
    }
});

document.addEventListener("keydown",(e)=>{
    e.preventDefault();
    switch(e.key){

        case "Backspace":
        displayContent.textContent = displayContent.textContent.slice(0,-1);
        
        if(op){
            num2 = num2.slice(0,-1);
        }
        else if(!op){
            num1 = num1.slice(0,-1);
        }
        
        // Now check: is the operator still in the display?
        if(op && !displayContent.textContent.includes(op)){
            op = "";  // Operator was deleted from display, so clear it
        }
        break;

        case "+":
        case "-":
        case "/":
        case "*":
        if(!op){
            populateDisplay(e.key);
            op = e.key;
        }
        else if(op != "" && num2 != ""){
            var result = operate(Number(num1),Number(num2),op);
            displayContent.textContent = result;
            num1 = result;
            num2 = "";
            populateDisplay(e.key);
            op = e.key;
        }
        break;
        

        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        if(storeValues(e.key)){ // populate display only when it is stored this helps to cap the size limit to 15
            populateDisplay(e.key);
            }
        break;

        case ".":
        if(!displayContent.textContent.includes(".")){
            populateDisplay(e.key);
            storeValues(e.key);
        }
        break;
        
        case "Enter": 
        var result = operate(Number(num1),Number(num2),op);
        // to check if a number is decimal or not
        // divide it by 1 if it's remainder is not 0 then it is decimal
        if(result%1 != 0){
            displayContent.textContent = result.toFixed(1);
        }
        else{
            displayContent.textContent = result;
        }
        num1 = result;
        op = "";
        num2 = "";
        break;
    }
});
