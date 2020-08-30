import getInputsValue from "./renderCard.js";

const inputs = document.querySelectorAll(".panel input");
const renderBtn = document.querySelector(".renderBtn");
const clearBtn = document.querySelector(".clearBtn");

//inputs
renderBtn.addEventListener("click", () => {
    getInputsValue();
});



//clear inputs
clearBtn.addEventListener("click", () => {
    inputs.forEach(input => (input.value = ""));
});

function clearInputOnKeyDown(inputs) {
    inputs.forEach(input => {
        input.addEventListener("mousedown", e => (e.target.value = ""));
    });
}
clearInputOnKeyDown(inputs);
