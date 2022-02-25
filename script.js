const table = document.querySelector("#table");
const button = document.querySelector("#button");
const input = document.querySelector("#input");
const tBodyTable = document.querySelector("tbody");

let inputValueLength = 0;
let inputString = "";

button.addEventListener("click", () => {
    table.style.opacity = "1";
});

input.addEventListener("keyup", (e) => {
    // table.style.opacity = "0"; it shows up when a key is pressed    
    inputString = input.value;
    console.log(inputString)
    inputValueLength = input.value.length;

    console.log(inputValueLength)

    let HTML_CODE = `
        <tr>
            <th>${inputString[inputValueLength - 1]}</th>
            <th>simboloJS</th>
        </tr>    
        `;
    tBodyTable.innerHTML += HTML_CODE;

})



