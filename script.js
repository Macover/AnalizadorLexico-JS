const table = document.querySelector("#table");
const button = document.querySelector("#button");
const input = document.querySelector("#input");
const tBodyTable = document.querySelector("tbody");
const errorMessage = document.querySelector("#errorMessage");

let inputValue = "";
let inputValueLength = 0;
let inputString = "";

button.addEventListener("click", (e) => {
    // table.style.opacity = "1";
    e.preventDefault();    
    inputValue = input.value;
    inputValueLength = input.value.length;  

    for(let i=0; i<inputValueLength; i++){
        
    let stringTemp = "";
    let valueType = "";

    if(isANumber(inputValue[i])){
        stringTemp = inputValue[i];
        console.log("numero", inputString[i]);
        valueType = "es número"
    }
    if(isOperator(inputValue[i])){
        stringTemp = inputValue[i];
        console.log("operador", inputString[i]);
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

// VALIDATION FUNCTIONS

const isCharacter = (string)=>{
    if(string == "Shift" || string == "Backspace"){return false;}
    else{ let ascii = string.toUpperCase().charCodeAt(0); return ascii > 64 && ascii < 91;}  
}
const isANumber = (string)=>{
    let ascii = string.toUpperCase().charCodeAt(0);
    return ascii > 47 && ascii < 58;
}
const isOperator = (string)=>{
    let ascii = string.toUpperCase().charCodeAt(0);
    return (ascii > 41 && ascii < 44) || ascii == 47 || ascii == 45;
}


input.addEventListener("keyup", (e) => {
    // table.style.opacity = "0"; it shows up when a key is pressed    
    // inputString = input.value;
    // console.log(inputString)
    // inputValueLength = input.value.length;

    // console.log(inputValueLength)
    // console.log(e);
    // let stringType = "";
    // if(!isNaN(e.key)){
    //     stringType = "Número";
    // }else{
        
    // }
    // let HTML_CODE = `
    //     <tr>
    //         <th>${inputString[inputValueLength - 1]}</th>
    //         <th>${stringType}</th>
    //     </tr>    
    //     `;
    // tBodyTable.innerHTML += HTML_CODE;
    
    if(isCharacter(e.key)){
        input.value = " "
        errorMessage.textContent = "Error: El input no acepta letras.";
        errorMessage.style.opacity = "1";
    }else{
        errorMessage.style.opacity = "0";
    }

})



