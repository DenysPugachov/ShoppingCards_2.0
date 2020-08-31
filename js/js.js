const inputs = document.querySelectorAll(".panel input");
const renderBtn = document.querySelector(".renderBtn");
const editBtn = document.querySelector(".editBtn");
const clearBtn = document.querySelector(".clearBtn");
const cardPlaceHolder = document.querySelector(".cardPlaceHolder");

const overflowToggleCheckbox = document.querySelector("#overflowToggle");

renderBtn.addEventListener("click", () => {
    getInputsValue();
});


function getInputsValue() {
    const inputsDataArr = [];
    document.querySelectorAll('input[type="text"]').forEach(input => {
        inputsDataArr.push(input);
    });
    sortInputsType(inputsDataArr);
}

const urlDataArr = [];
const textDataArr = [];

function sortInputsType(inputsDataArr) {

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


// function setCardContent(urlDataArr, textDataArr) {
//     const cardImgArr = document.querySelectorAll(".cardPlaceHolder img");
//     const cardTextArr = document.querySelectorAll(".cardPlaceHolder p");

//     urlDataArr.forEach((elem, index) => {
//         cardImgArr[index].src = elem.value;
//     });

//     textDataArr.forEach((elem, index) => {
//         cardTextArr[index].textContent = elem.value;
//     });

// }

//make image movable inside container
function moveElement(element) {
    let mousePosition;
    let offset;
    let mouseIsDown = false;
    let scale = 1;

    element.forEach(elem => {

        elem.addEventListener("mousedown", e => {
            event.preventDefault();
            mouseIsDown = true;

            //get distance from left-up target conner
            offset = [
                e.target.offsetLeft - e.clientX,
                e.target.offsetTop - e.clientY
            ];
            move(mouseIsDown, offset, e.target, scale);
        }, true);
    });

    function move(mouseIsDown, offset, target, scale) {

        document.addEventListener('mousemove', event => {
            event.preventDefault();

            if (mouseIsDown) {
                mousePosition = {
                    x: event.clientX,
                    y: event.clientY
                };
                target.style.left = (mousePosition.x + offset[0]) + 'px';
                target.style.top = (mousePosition.y + offset[1]) + 'px';
            }
        }, true);

        document.addEventListener('wheel', function (event) {
            event.preventDefault();
            if (mouseIsDown) {
                if (event.deltaY < 0) {
                    // Zoom in
                    scale = scale + 0.01;
                }
                else {
                    // Zoom out
                    scale = scale - 0.01;
                }
                // Apply scale transform
                target.style.transform = `scale(${scale})`;
            }
        }, true);

        document.addEventListener('mouseup', () => {
            mouseIsDown = false;
        }, true);

    }
};


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

//change card content without rebooting page
// editBtn.addEventListener("click", () => {
//     console.log("edit");
//     setCardContent(urlDataArr, textDataArr);
// });