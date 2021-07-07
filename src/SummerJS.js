/*
 *
 * SummerJS - By mforoud86
 * Any and all donations/pull requests are appreciated.
 * SummerJS is lisenced under the MIT License.
 * 
 */

let SummerJS = (query, data) => {

    SummerJS.inject = (code, isHTML) => {
        /* If you are reading this, it either means that you are here to steal my source code, or to find out why your project is not loading on someone's computer. The answer is simple: Injection.
        SummerJS uses javascript code injections in order to function correctly, but don't worry. I'll override this and mark it as an issue later myself if it made a lot of problems. */

        if (isHTML) {
            let child = document.createElement("summerjs-injection");
            child.setAttribute("notice", "This might get depreciated in later versions. Please, always update to the latest version.");
            child.innerHTML = code;
            child.setAttribute("randomness", Math.floor(Math.random() * 10000));

            SummerJS.document.innerHTML += child.outerHTML;
        } else {
            let child = document.createElement("script");
            child.setAttribute("notice", "This might get depreciated in later versions. Please, always update to the latest version.");
            child.setAttribute("summerjs-injection", "");
            child.setAttribute("randomness", Math.floor(Math.random() * 10000));
            child.innerText = code;

            SummerJS.document.innerHTML += child.outerHTML;
        }
    };

    SummerJS.catchError = (error) => {
        if (SummerJS.initB) {
            SummerJS.document.innerHTML += `<h3 summerjs-error style="color: red; font-family: 'Monolisa';">${error}</h3>`;
        } else {
            console.log(error);
        }
    };

    if (SummerJS.initB) {
        return "SummerJS is already initialized.";
    }

    if (document.querySelector(query) == null) {
        SummerJS.catchError("Invalid query selector.");
    } else {
        SummerJS.initB = true;
        SummerJS.document = document.querySelector(query);
        console.log("SummerJS");
        console.log("Lisenced under the MIT lisence");
        console.log("Made by MinecraftPublisher");

        SummerJS.color = "#9c9c9c";
        SummerJS.position = "absolute";
        SummerJS.zIndex = "1001";
        SummerJS.callback = () => {
            // Empty callback.
        };

        SummerJS.getAnchorX = (base, attribute) => {
            let offset = document.body.offsetHeight / base;
            return Math.floor(attribute * offset);
        };

        SummerJS.getAnchorY = (base, attribute) => {
            let offset = document.body.offsetWidth / base;
            return Math.floor(attribute * offset);
        };

        SummerJS.loop = () => {
            document.querySelectorAll(".summer").forEach((summer) => {
                let x = summer.getAttribute("xPos");
                let y = summer.getAttribute("yPos");
                let xMain = summer.getAttribute("xMain");
                let yMain = summer.getAttribute("yMain");

                let newX = SummerJS.getAnchorX(xMain, x);
                let newY = SummerJS.getAnchorY(yMain, y);

                summer.style.top = newX - (summer.offsetHeight / 2);
                summer.style.left = newY - (summer.offsetWidth / 2);
            });

            setInterval(() => {
                document.querySelectorAll(".summer").forEach((summer) => {
                    let x = summer.getAttribute("xPos");
                    let y = summer.getAttribute("yPos");
                    let xMain = summer.getAttribute("xMain");
                    let yMain = summer.getAttribute("yMain");

                    let newX = SummerJS.getAnchorX(xMain, x);
                    let newY = SummerJS.getAnchorY(yMain, y);

                    summer.style.top = (newX - (summer.offsetHeight / 2)) + "px";
                    summer.style.left = (newY - (summer.offsetWidth / 2)) + "px";
                    console.log((newY - (summer.offsetWidth / 2)) + "px");
                });
            }, 10);
        }

        SummerJS.add = (type, attributes, data) => {

        };

        SummerJS.init = () => {
            let canvas = document.createElement("summerjs");
            canvas.setAttribute("style", `background-color: #9c9c9c; width: 100%; height: 100%; background-color: ${SummerJS.color}; position: ${SummerJS.position}; z-index: ${SummerJS.zIndex}; top: 0px; left: 0px;`);
            SummerJS.document.appendChild(canvas);
            SummerJS.document = canvas;

            SummerJS.inject(`<div class="summer" id="hello" xPos="50" yPos=50 xMain=100 yMain=100 style="width: 150px; height: 50px; background-color: crimson; padding-top: 10px; padding-left: 10px; padding-right: 10px;">Loading SummerJS...</div>`, true);
            SummerJS.loop();
            SummerJS.init = () => {
                return "Already initialized.";
            };
        };

        if (data == {} || data == null || data == undefined) {
            // Just run the init code.

            SummerJS.init();
        } else {
            // Client has some data to work with.

            if (data.color) {
                SummerJS.color = data.color;
            }
            if (data.callback) {
                SummerJS.callback = callback;
            }
            SummerJS.init();
        }
    }

    return SummerJS;
};

function makeDraggable(dragTarget) {
    let dragHandle = dragTarget;
    let dragObj = null; //object to be moved
    let xOffset = 0; //used to prevent dragged object jumping to mouse location
    let yOffset = 0;

    document.querySelector(dragHandle).style["touch-action"] = "none";
    document.querySelector(dragHandle).addEventListener("mousedown", startDrag, true);
    document.querySelector(dragHandle).addEventListener("touchstart", startDrag, true);

    /*sets offset parameters and starts listening for mouse-move*/
    function startDrag(e) {
        e.preventDefault();
        e.stopPropagation();
        dragObj = document.querySelector(dragTarget);
        dragObj.style.position = "absolute";
        let rect = dragObj.getBoundingClientRect();

        if (e.type == "mousedown") {
            xOffset = e.clientX - rect.left; //clientX and getBoundingClientRect() both use viewable area adjusted when scrolling aka 'viewport'
            yOffset = e.clientY - rect.top;
            window.addEventListener('mousemove', dragObject, true);
        } else if (e.type == "touchstart") {
            xOffset = e.targetTouches[0].clientX - rect.left;
            yOffset = e.targetTouches[0].clientY - rect.top;
            window.addEventListener('touchmove', dragObject, true);
        }
    }

    /*Drag object*/
    function dragObject(e) {
        e.preventDefault();
        e.stopPropagation();

        if (dragObj == null) {
            return; // if there is no object being dragged then do nothing
        } else if (e.type == "mousemove") {
            dragObj.style.left = e.clientX - xOffset + "px"; // adjust location of dragged object so doesn't jump to mouse position
            dragObj.style.top = e.clientY - yOffset + "px";
        } else if (e.type == "touchmove") {
            dragObj.style.left = e.targetTouches[0].clientX - xOffset + "px"; // adjust location of dragged object so doesn't jump to mouse position
            dragObj.style.top = e.targetTouches[0].clientY - yOffset + "px";
        }
    }

    /*End dragging*/
    document.onmouseup = function(e) {
        if (dragObj) {
            dragObj = null;
            window.removeEventListener('mousemove', dragObject, true);
            window.removeEventListener('touchmove', dragObject, true);
        }
    }
}