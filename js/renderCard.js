import moveElement from "./move.js";

const cardPlaceHolder = document.querySelector(".cardPlaceHolder");

function getInputsValue() {
    const inputsDataArr = [];
    document.querySelectorAll('input[type="text"]').forEach(input => {
        inputsDataArr.push(input);
    });
    sortInputsType(inputsDataArr);
}

function sortInputsType(inputsDataArr) {
    const urlDataArr = [];
    const textDataArr = [];

    inputsDataArr.forEach(elem => {
        //get url inputs
        if (elem.classList.contains("url")) { urlDataArr.push(elem); }
        //get text inputs
        else if (elem.classList.contains("text")) { textDataArr.push(elem); }
        else {
            console.error(elem, "has wrong class");
        }
    });
    renderCard(urlDataArr, textDataArr);
}

function renderCard(urlDataArr, textDataArr) {
    // clear previous card;
    cardPlaceHolder.innerHTML = "";

    //render img
    urlDataArr.forEach(elem => {
        const divItem = document.createElement("div");
        const img = document.createElement("img");
        divItem.className = elem.className;
        img.src = elem.value;
        divItem.append(img);
        cardPlaceHolder.append(divItem);
    });
    //render text
    textDataArr.forEach(elem => {
        const divItem = document.createElement("div");
        const textDiv = document.createElement("p");
        divItem.className = elem.className;
        textDiv.textContent = elem.value;
        divItem.append(textDiv);
        cardPlaceHolder.append(divItem);
    });

    moveElement(document.querySelectorAll(".cardPlaceHolder>div"));
}


export default getInputsValue;
