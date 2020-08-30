
//make image movable inside container
export default function moveElement(element) {
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