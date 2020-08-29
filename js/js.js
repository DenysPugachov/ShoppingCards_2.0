const cartPlaceHolder = document.querySelector(".cartPlaceHolder");

const inputs = document.querySelectorAll(".panel input");

const renderBtn = document.querySelector(".renderBtn");
const clearBtn = document.querySelector(".clearBtn");

// const inputLogo = document.querySelectorAll(".logo");

// const inputFoto_1 = document.querySelector(".foto_1");
// const inputFoto_2 = document.querySelector(".foto_2");
// const inputFoto_3 = document.querySelector(".foto_3");
// const inputFoto_4 = document.querySelector(".foto_4");

// const inputPrice_old_1 = document.querySelector(".price_old_1");
// const inputPrice_new_1 = document.querySelector(".price_new_1");
// const inputPrice_old_2 = document.querySelector(".price_old_2");
// const inputPrice_new_2 = document.querySelector(".price_new_2");

// const inputText_1 = document.querySelector(".text_1");
// const inputText_2 = document.querySelector(".text_2");


//inputs
renderBtn.addEventListener("click", () => {
    getInputsValue();
});


function getInputsValue() {
    const inputsDataArr = [];
    document.querySelectorAll('input[type="text"]').forEach(input => {
        inputsDataArr.push(input);
    });
    // console.log(inputsDataArr);
    // return fields;
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

    //render img
    urlDataArr.forEach(elem => {
        let img = document.createElement("img");
        img.className = elem.className;
        img.scr = elem.value;
        cartPlaceHolder.append(img);
    });

    //render text
    textDataArr.forEach(elem => {
        let textDiv = document.createElement("div");
        textDiv.className = elem.className;
        textDiv.textContent = elem.value;
        cartPlaceHolder.append(textDiv);
    });
}



function generateHtml(
    logo,
    foto_1,
    foto_2,
    foto_3,
    foto_4,
    price_old_1,
    price_new_1,
    price_old_2,
    price_new_2,
    text_1,
    text_2,) {

    const card = document.createElement("div");
    let inputImage = document.createElement("img");
    let inputText = document.createElement("div");

    card.classList.add("card");



    cartPlaceHolder.append(card);


    //clear inputs
    clearBtn.addEventListener("click", () => {
        inputs.forEach(input => (input.value = ""));
    });

    //clear input on keyDown
    function clearInputOnKeyDown(inputs) {
        inputs.forEach(input => {
            input.addEventListener("mousedown", e => (e.target.value = ""));
        });
    }
    clearInputOnKeyDown(inputs);

}