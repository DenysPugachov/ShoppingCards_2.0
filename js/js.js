const cartPlaceHolder = document.querySelector(".cartPlaceHolder");

const renderBtn = document.querySelectorAll(".renderBtn");
const clearBtn = document.querySelectorAll(".clearBtn");

const inputLogo = document.querySelectorAll(".logo");

const inputFoto_1 = document.querySelectorAll(".foto_1");
const inputFoto_2 = document.querySelectorAll(".foto_2");
const inputFoto_3 = document.querySelectorAll(".foto_3");

const inputPrice_old_1 = document.querySelectorAll(".price_old_1");
const inputPrice_new_1 = document.querySelectorAll(".price_new_1");
const inputPrice_old_2 = document.querySelectorAll(".price_old_2");
const inputPrice_new_2 = document.querySelectorAll(".price_new_2");

const inputText_1 = document.querySelector(".text_1");
const inputText_2 = document.querySelector(".text_2");


function generateHTML(
    templateIndex,
    logo,
    front,
    back,
    side,
    oldPrice,
    newPrice,
    oldPrice_2,
    newPrice_2,
    text
) {
    const t1 = `
    <div class="container first">
    <div class="items logo">
        <img src="${logo}"
            alt="logo" />
    </div>
    <div class="items front">
        <img src="${front}" alt="front" />
    </div>
    <div class="items back">
        <img src="${back}" alt="back" />
    </div>
<div class="items price">
<p>
<span class="price__old">${oldPrice}</span>
<br />
<span class="price__new">${newPrice}</span>
</p>
</div>
</div> `;

    const t2 = `
    <div class="container first_2">
    <div class="items logo">
        <img src="${logo}"
            alt="logo" />
    </div>
    <div class="items front">
        <img src="${front}" alt="front" />
    </div>
    <div class="items back">
        <img src="${back}" alt="back" />
    </div>
<div class="items price">
<p>
<span   id="first_2_old" class="price__old">${oldPrice}</span>
<br />
<span  id="first_2_new" class="price__new">${newPrice}</span>
<br />
<span id="first_2_text" class="price__text">${text}</span>
</p>
</div>
</div> `;

    const look = `
<div class="container look">
<div class="items logo">
<img src="${logo}"
alt=""
/>
</div>
<div class="items front">
<img
src="${front}"
alt=""
/>
</div>
<div class="items back">
<img
src="${back}"
alt=""
/>
</div>
<div class="items price price-1">
<p>
<span class="price__old">${oldPrice}</span> <br />
<span class="price__new">${newPrice}</span>
</p>
</div>
<div class="items price price-2">
<p>
<span class="price__old">${oldPrice_2}</span> <br />
<span class="price__new">${newPrice_2}</span>
</p>
</div>
</div>`;

    const third = `
<div class="container third">
        <div class="items logo">
            <img src="${logo}"
                alt="logo" />
        </div>
        <div class="items front">
            <img src="${front}" alt="front" />
        </div>
        <div class="items side">
            <img src="${side}"alt="side" />
        </div>
        <div class="items back">
            <img src="${back}" alt="back" />
        </div>
        <div class="items price">
            <p>
                <span class="price__old ">${oldPrice}</span> <br />
                <span class="price__new ">${newPrice}</span>
            </p>
        </div>
    </div>`;

    if (templateIndex === 0) {
        cartTempHtml.innerHTML = first;
    } else if (templateIndex === 1) {
        cartTempHtml.innerHTML = look;
    } else if (templateIndex === 2) {
        cartTempHtml.innerHTML = third;
    } else if (templateIndex === 3) {
        cartTempHtml.innerHTML = first_2;
    } else {
        console.log("templateIndex = ", templateIndex, "You don't have third template");
    }

    cartPlaceHolder.append(cartTempHtml);

    //make image movable inside container
    moveImage(document.querySelectorAll("img"));
}

//Tabs
function openTemplate(evt, templateName) {
    // Declare all variables
    let i, tabContent, tabLinks;

    // Get all elements with class="tabcontent" and hide them
    tabContent = document.querySelectorAll(".tabcontent");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tabLinks = document.querySelectorAll(".tablinks");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(templateName).style.display = "block";
    evt.currentTarget.classList.add("active");
    // evt.currentTarget.className += " active";
}

renderBtns.forEach((button, index) => {
    button.addEventListener("click", () => {
        generateHTML(
            index,
            inputLogos[index].value,
            inputFronts[index].value,
            inputBacks[index].value,

            //FIXME:only index
            inputSide.value,

            inputOld_prices[index].value,
            inputNew_prices[index].value,
            inputOld_price2.value,
            inputNew_price2.value,
            inputText.value,
        );
    });
});

//clear inputs
document.querySelector("#clearBtn").addEventListener("click", () => {
    inputs.forEach(input => (input.value = ""));
});

//clear input on keyDown
function clearInputOnKeyDown() {
    inputs.forEach(input => {
        input.addEventListener("mousedown", e => (e.target.value = ""));
    });
}
clearInputOnKeyDown();

//make image movable inside container
function moveImage(image) {
    let mousePosition;
    let offset;
    let isDown = false;
    let scale = 1;

    image.forEach(img => {

        img.addEventListener("mousedown", e => {
            // event.preventDefault();
            isDown = true;
            offset = [
                e.target.offsetLeft - e.clientX,
                e.target.offsetTop - e.clientY
            ];
            move(isDown, offset, e.target, scale);
        }, true);
    });

    function move(isDown, offset, target, scale) {
        document.addEventListener('mousemove', function (event) {
            event.preventDefault();
            if (isDown) {
                mousePosition = {
                    x: event.clientX,
                    y: event.clientY
                };
                target.style.left = (mousePosition.x + offset[0]) + 'px';
                target.style.top = (mousePosition.y + offset[1]) + 'px';
            }
        }, true);

        document.addEventListener('wheel', function (event) {
            if (isDown) {
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

        document.addEventListener('mouseup', function () {
            isDown = false;
        }, true);

    }
};
