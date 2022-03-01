const table = document.querySelector("#table");
const button = document.querySelector("#button");
const input = document.querySelector("#input");
const tBodyTable = document.querySelector("tbody");
const errorMessage = document.querySelector("#errorMessage");
const icon = document.querySelector("#icon");

let inputValue = "";
let inputValueLength = 0;
let inputString = "";

const validateParenthesis = (string)=>{
    let i;
    let va = 0;
    for (i = 0; i < s.length; i++){
        if(s.substring(i,i+1) == '('){
            va++;
        }
        else if(s.substring(i,i+1) == ')'){
            va--;
        }        
        if (va < 0){
            return false;
        }
    }        
    return va == 0;
}

button.addEventListener("click", (e) => {
    // table.style.opacity = "1";
    e.preventDefault();    
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
    tBodyTable.appendChild(fragment);
});

input.addEventListener("keyup", (e) => {

    // Validation for characters
    if (isCharacter(e.key)) {
        input.value = " "
        errorMessage.textContent = "Error: El input no acepta letras.";
        errorMessage.style.opacity = "1";
    } else {
        errorMessage.style.opacity = "0";
    }


    // evaluateString(input.value);

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
    if (string == "Shift" || string == "Backspace") { return false; }
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

let rules = {
    "S": [
        ["The", "N", "V"]
    ],
    "N": [
        ["cat"],
        ["dog"]
    ],
    "V": [
        ["meows"],
        ["barks"]
    ]
};
const evaluateCFG = (start, expansion) => {
    if (rules[start]) {
        let rnd = Math.floor(Math.random() * rules[start].length);
        console.log("random", rnd)
        let pick = rules[start][rnd];
        console.log(pick);
        for (let i = 0; i < pick.length; i++) {
            evaluateCFG(pick[i], expansion);
        }
    } else {
        expansion.push(start);
    }
    return expansion.join(" ");
}

// console.table(rules)

// let start = "S";
// let expansion = [];
// let result = evaluateCFG(start, expansion);
// console.log(result)


const evaluateString = (INPUT_STRING) => {

    let string = INPUT_STRING;
    let initialState = 1;
    let finalState = 1;
    let currentState = initialState;

    let bool = true;
    let accountant = 0;

    while (bool) {
        if (accountant > string.length - 1) {
            bool = false;
            break;
        }
        if (currentState == 1) {
            if (string[accountant] == 1) {
                currentState = 1;
            }
            if (string[accountant] == 0) {
                currentState = 2;
            }
            accountant++;
            continue;
        }
        if (currentState == 2) {
            if (string[accountant] == 1) {
                currentState = 2;
            }
            if (string[accountant] == 0) {
                currentState = 1;
            }
            accountant++;
            continue;
        }
    }
    if (currentState == finalState) {
        if (input.classList.contains("bottom-wrong-input")) {
            input.classList.remove("bottom-wrong-input");
            input.classList.add("bottom-correct-input");
        } else {
            input.classList.add("bottom-correct-input");
        }
        icon.src = "images/correct.png";
    } else {
        if (input.classList.contains("bottom-correct-input")) {
            input.classList.remove("bottom-correct-input");
            input.classList.add("bottom-wrong-input");
        } else {
            input.classList.add("bottom-wrong-input");
        }
        icon.src = "images/remove.png";
    }
}


