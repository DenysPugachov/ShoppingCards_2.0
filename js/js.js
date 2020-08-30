const cardPlaceHolder = document.querySelector(".cardPlaceHolder");
const inputs = document.querySelectorAll(".panel input");
const renderBtn = document.querySelector(".renderBtn");
const clearBtn = document.querySelector(".clearBtn");

//inputs
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
        let img = document.createElement("img");
        divItem.className = elem.className;
        img.src = elem.value;
        divItem.append(img);
        cardPlaceHolder.append(divItem);
    });

    //render text
    textDataArr.forEach(elem => {
        let textDiv = document.createElement("div");
        textDiv.className = elem.className;
        textDiv.textContent = elem.value;
        cardPlaceHolder.append(textDiv);
    });

    moveImage(document.querySelectorAll(".cardPlaceHolder>div"));
}

//make image movable inside container
function moveImage(element) {
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
                // console.log(event.clientX, event.clientY);
                mousePosition = {
                    x: event.clientX,
                    y: event.clientY
                };
                //style          =  mousePosition   + leftUp target
                console.log(target.offsetLeft, target.offsetTop,
                    mousePosition.x, offset[0], ";", mousePosition.y, offset[1]);

                target.style.left = (mousePosition.x + offset[0]) + 'px';
                target.style.top = (mousePosition.y + offset[1]) + 'px';
            }
        }, true);

        document.addEventListener('wheel', function (event) {
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

//clear input on keyDown
function clearInputOnKeyDown(inputs) {
    inputs.forEach(input => {
        input.addEventListener("mousedown", e => (e.target.value = ""));
    });
}
clearInputOnKeyDown(inputs);