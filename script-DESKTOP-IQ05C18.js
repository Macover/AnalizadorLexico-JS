const table = document.querySelector("#table");
const button = document.querySelector("#button");
const input = document.querySelector("#input");
const tBodyTable = document.querySelector("tbody");
const errorMessage = document.querySelector("#errorMessage");
const icon = document.querySelector("#icon");

let inputValue = "";
let inputValueLength = 0;
let inputString = "";


button.addEventListener("click", (e) => {
    // table.style.opacity = "1";
    e.preventDefault();
    console.log("click")
    inputValue = input.value;
    inputValueLength = input.value.length;

    let numbers = "";

    for (let i = 0; i < inputValueLength; i++) {

        let stringTemp = "";
        let valueType = "";
        let array = [];


        if (isANumber(inputValue[i])) {
            console.log(i)
            array = validateNumbers(i, inputValue);
            i = array[0];
            stringTemp = array[1];
            valueType = "es numero";
        }



        console.log(numbers)

        if (isOperator(inputValue[i])) {
            stringTemp = inputValue[i];
            valueType = "es operador";
        }

        let HTML_CODE = `
    <tr>
        <th>${stringTemp}</th>
        <th>${valueType}</th>
    </tr>    
    `;
        tBodyTable.innerHTML += HTML_CODE;
    }

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

    evaluateString(input.value);

});

// VALIDATION FUNCTIONS

const validateNumbers = (i, inputValue) => {
    
    let accountant = i;
    let numbers = "";
   
    while (isANumber(inputValue[accountant])){
        if (accountant > inputValue.length - 1) {
            break;
        }
        numbers.concat(inputValue[accountant].toString());
        accountant++;
    }
    console.log(numbers)
    return [accountant, numbers];
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


