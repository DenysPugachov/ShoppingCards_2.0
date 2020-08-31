const inputs = document.querySelectorAll(".panel input");
const renderBtn = document.querySelector(".renderBtn");
const editBtn = document.querySelector(".editBtn");
const clearBtn = document.querySelector(".clearBtn");
const cardPlaceHolder = document.querySelector(".cardPlaceHolder");
const overflowToggleCheckbox = document.querySelector("#overflowToggle");
const inputUrlArr = document.querySelectorAll("input.url");
const inputTextArr = document.querySelectorAll("input.text");

renderBtn.addEventListener("click", () => {
    renderCard(inputUrlArr, inputTextArr);
});

editBtn.addEventListener("click", () => {
    updateCard(document.querySelectorAll(".cardPlaceHolder img"), document.querySelectorAll(".cardPlaceHolder p"));
});
//clear inputs
clearBtn.addEventListener("click", () => {
    inputs.forEach(input => (input.value = ""));
});

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
    //select movable elements
    moveElement(document.querySelectorAll(".cardPlaceHolder>div"));
}

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
            // event.preventDefault();
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

function clearInputOnKeyDown(inputs) {
    inputs.forEach(input => {
        input.addEventListener("mousedown", e => (e.target.value = ""));
    });
}
clearInputOnKeyDown(inputs);

function updateCard(imgFieldArr, textFieldArr) {
    imgFieldArr.forEach((img, index) => {
        img.src = inputUrlArr[index].value;
    });
    textFieldArr.forEach((p, index) => {
        p.textContent = inputTextArr[index].value;
    });

}