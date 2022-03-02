const table = document.querySelector("#table");
const button = document.querySelector("#button");
const input = document.getElementById("input");
const tBodyTable = document.querySelector("tbody");
const errorMessage = document.querySelector("#errorMessage");
const icon = document.querySelector("#icon");

let inputValue = "";
let inputValueLength = 0;
let inputString = "";
let result = 0;

const validateParenthesis = (string)=>{
    let i;
    let accountant = 0;
    for (i = 0; i < string.length; i++){
        if(string.substring(i,i+1) == '('){ //if there's a '(' => The variable 'accountant' increases in one.
            accountant++;
        }
        else if(string.substring(i,i+1) == ')'){ //if there's a ')' => The variable 'accountant' dicreases in one.
            accountant--;
        }        
        if (accountant < 0){ // if the user type ')' first
            return false;
        }
    }        
    return accountant == 0; // The function returns a boolean
}

button.addEventListener("click", (e) => {
    e.preventDefault();    
    table.style.opacity = "1";
    
    if(button.classList.contains("hover-button")){
        button.classList.remove("hover-button");
        button.classList.add("disabled-button");
    }        
    if(!button.hasAttribute("disabled")){
        button.setAttribute("disabled",true);
    }

    inputValue = input.value;
    inputValueLength = input.value.length;  

    let fragment = document.createDocumentFragment();
    
    for (let i = 0; i < inputValueLength; i++) {
        
        let array = [];
        
        if (isANumber(inputValue[i])) {
            let trElement = document.createElement("tr");
            array = validateNumbers(i, inputValue);
            i = array[0];                        
            let thElement1 = document.createElement("th");
            thElement1.innerHTML = array[1].toString();
            let thElement2 = document.createElement("th");
            thElement2.innerHTML = "Número";
            trElement.appendChild(thElement1);
            trElement.appendChild(thElement2);            
            fragment.appendChild(trElement);
        }
        if(isParenthesis(inputValue[i])) {                  
            let trElement = document.createElement("tr");      
            let thElement1 = document.createElement("th");
            thElement1.innerHTML = inputValue[i];
            let thElement2 = document.createElement("th");
            thElement2.innerHTML = "Paréntesis";
            trElement.appendChild(thElement1);
            trElement.appendChild(thElement2);            
            fragment.appendChild(trElement);
        } 
        if(isOperator(inputValue[i])) {                  
            let trElement = document.createElement("tr");      
            let thElement1 = document.createElement("th");
            thElement1.innerHTML = inputValue[i];
            let thElement2 = document.createElement("th");
            thElement2.innerHTML = "Operador";
            trElement.appendChild(thElement1);
            trElement.appendChild(thElement2);            
            fragment.appendChild(trElement);
        }        
    }
    let trElement = document.createElement("tr");
    let thElement1 = document.createElement("th");
    let thElement2 = document.createElement("th");

    thElement1.innerHTML = "Resultado"
    thElement2.innerHTML = result;

    if(result != 0){
        thElement1.style.backgroundColor = "#0F0";
        thElement2.style.backgroundColor = "#0F0";    
    }else{
        thElement1.style.backgroundColor = "#F00";
        thElement2.style.backgroundColor = "#F00";
    }
    

    trElement.appendChild(thElement1);      
    trElement.appendChild(thElement2);      
    fragment.appendChild(trElement);
    tBodyTable.appendChild(fragment);
});

let isValidated = false;

input.addEventListener('input', function () {
    var error = true;
    try{        
        if (/^[\d-+/*()]+$/.test(input.value)) {                        
            result = eval(input.value);
            error = false;
            if (input.classList.contains("bottom-wrong-input")) {
                input.classList.remove("bottom-wrong-input");
                input.classList.add("bottom-correct-input");
            } else {
                input.classList.add("bottom-correct-input");
            }
            icon.src = "images/correct.png";
            if(button.classList.contains("disabled-button")){
                button.classList.remove("disabled-button");
                button.classList.add("hover-button");
            }
            if(button.hasAttribute("disabled")){                
                button.removeAttribute("disabled",false);
            }
        }
    } catch (err) { }
    if (error){
        result = 0;                
        if (input.classList.contains("bottom-correct-input")) {
            input.classList.remove("bottom-correct-input");
            input.classList.add("bottom-wrong-input");
        } else {
            input.classList.add("bottom-wrong-input");
        }
        icon.src = "images/remove.png";
        if(button.classList.contains("hover-button")){
            button.classList.remove("hover-button");
            button.classList.add("disabled-button");
        }        
        if(!button.hasAttribute("disabled")){
            button.setAttribute("disabled",true);
        }
    } 
});

input.addEventListener("keyup", (e) => {
    table.style.opacity = "0";    
    // Validation for characters
    if (isCharacter(e.key)) {
        input.value = "";
        errorMessage.textContent = "Error: El input no acepta letras.";
        errorMessage.style.opacity = "1";
    } else {
        errorMessage.style.opacity = "0";
    }
    tBodyTable.innerHTML = "";
});



// VALIDATION FUNCTIONS

const validateNumbers = (i, inputValue) => {
    let accountant = i;
    let numbers = "";  
    while (isANumber(inputValue[accountant])){        
        numbers += inputValue[accountant];
        if(accountant == inputValue.length - 1){
            break;
        }else{
            accountant++;
        }
    }    
    return [accountant, numbers];
}

const isParenthesis = (string) =>{
    let ascii = string.toUpperCase().charCodeAt(0);
    return ascii == 40 || ascii == 41;
}

const isCharacter = (string) => {
    if (string == "Shift" || string == "Backspace" || string == "ArrowLeft" || string == "ArrowRight" || string == "Home" || string == "End") { return false; }
    else { let ascii = string.toUpperCase().charCodeAt(0); return ascii > 64 && ascii < 91; }
}
const isANumber = (string) => {
    let ascii = string.toUpperCase().charCodeAt(0);
    return ascii > 47 && ascii < 58;
}
const isOperator = (string) => {
    let ascii = string.toUpperCase().charCodeAt(0);
    return (ascii > 41 && ascii < 44) || ascii == 47 || ascii == 45;
}

//Test functions

// let rules = {
//     "S": [
//         ["The", "N", "V"]
//     ],
//     "N": [
//         ["cat"],
//         ["dog"]
//     ],
//     "V": [
//         ["meows"],
//         ["barks"]
//     ]
// };
// const evaluateCFG = (start, expansion) => {
//     if (rules[start]) {
//         let rnd = Math.floor(Math.random() * rules[start].length);
//         console.log("random", rnd)
//         let pick = rules[start][rnd];
//         console.log(pick);
//         for (let i = 0; i < pick.length; i++) {
//             evaluateCFG(pick[i], expansion);
//         }
//     } else {
//         expansion.push(start);
//     }
//     return expansion.join(" ");
// }

// // console.table(rules)

// // let start = "S";
// // let expansion = [];
// // let result = evaluateCFG(start, expansion);
// // console.log(result)


// const evaluateString = (INPUT_STRING) => {

//     let string = INPUT_STRING;
//     let initialState = 1;
//     let finalState = 1;
//     let currentState = initialState;

//     let bool = true;
//     let accountant = 0;

//     while (bool) {
//         if (accountant > string.length - 1) {
//             bool = false;
//             break;
//         }
//         if (currentState == 1) {
//             if (string[accountant] == 1) {
//                 currentState = 1;
//             }
//             if (string[accountant] == 0) {
//                 currentState = 2;
//             }
//             accountant++;
//             continue;
//         }
//         if (currentState == 2) {
//             if (string[accountant] == 1) {
//                 currentState = 2;
//             }
//             if (string[accountant] == 0) {
//                 currentState = 1;
//             }
//             accountant++;
//             continue;
//         }
//     }
//     if (currentState == finalState) {
//         if (input.classList.contains("bottom-wrong-input")) {
//             input.classList.remove("bottom-wrong-input");
//             input.classList.add("bottom-correct-input");
//         } else {
//             input.classList.add("bottom-correct-input");
//         }
//         icon.src = "images/correct.png";
//     } else {
//         if (input.classList.contains("bottom-correct-input")) {
//             input.classList.remove("bottom-correct-input");
//             input.classList.add("bottom-wrong-input");
//         } else {
//             input.classList.add("bottom-wrong-input");
//         }
//         icon.src = "images/remove.png";
//     }
// }


