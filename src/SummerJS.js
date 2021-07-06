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

            document.body.innerHTML += child.outerHTML;
        } else {
            let child = document.createElement("script");
            child.setAttribute("notice", "This might get depreciated in later versions. Please, always update to the latest version.");
            child.setAttribute("summerjs-injection", "");
            child.setAttribute("randomness", Math.floor(Math.random() * 10000));
            child.innerText = code;

            document.body.innerHTML += child.outerHTML;
        }
    };

    SummerJS.catchError = (error) => {
        if (SummerJS.init) {
            SummerJS.document.innerHTML += `<h3 summerjs-error style="color: red; font-family: 'Monolisa';">${error}</h3>`;
        } else {
            console.log(error);
        }
    };

    if (SummerJS.init) {
        return "SummerJS is already initialized.";
    }

    if (document.querySelector(query) == null) {
        SummerJS.catchError("Invalid query selector.");
    } else {
        SummerJS.init = true;
        SummerJS.document = document.querySelector(query);

        SummerJS.init = (width, height) => {
            let canvas = document.createElement("summerjs");
            canvas.style = `width: ${width}; height: ${height};`;


            SummerJS.document.appendChild(canvas);
            SummerJS.document = canvas;
            SummerJS.init = () => {
                return "Already initialized.";
            };
        };

        if (data == {} || data == null || data == undefined) {
            // Just run the init code.

            SummerJS.init();
        } else {
            // Client has some data to work with.

            SummerJS.init();
        }
    }

    return SummerJS;
};